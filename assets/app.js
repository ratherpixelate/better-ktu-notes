/* ==========================================================================
   MODERN STUDY STUDIO · GLOBAL PORTAL LOGIC
   Theme, Search (Ctrl+K), Progress Aggregation
   ========================================================================== */

(function () {
  'use strict';

  // 1. THEME ENGINE
  const THEME_KEY = 'study-portal-theme';

  function getPreferredTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    const icon = document.getElementById('theme-icon');
    if (icon) {
      icon.innerHTML = theme === 'dark' 
        ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
        : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    }
  }

  window.toggleTheme = function () {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  };

  applyTheme(getPreferredTheme());

  // Listen for system changes if user hasn't explicitly set preference
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    if (!localStorage.getItem(THEME_KEY)) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  // 2. REVISION PROGRESS AGGREGATOR
  const MODULES = [
    { key: 'coa-m1-revised', total: 18, id: 'prog-coa-m1', fillId: 'fill-coa-m1' },
    { key: 'coa-m2-revised', total: 12, id: 'prog-coa-m2', fillId: 'fill-coa-m2' },
    { key: 'ds-m1-revised', total: 16, id: 'prog-ds-m1', fillId: 'fill-ds-m1' }
  ];

  function getModuleCompleted(key) {
    try {
      const data = JSON.parse(localStorage.getItem(key) || '{}');
      return Object.values(data).filter(Boolean).length;
    } catch (e) {
      return 0;
    }
  }

  function updateDashboardProgress() {
    let totalCompleted = 0;
    let totalTopics = 0;

    MODULES.forEach(function (m) {
      const count = getModuleCompleted(m.key);
      totalCompleted += count;
      totalTopics += m.total;
      const pct = Math.round((count / m.total) * 100);

      const el = document.getElementById(m.id);
      if (el) {
        el.textContent = count + ' / ' + m.total + ' (' + pct + '%)';
      }

      const fill = document.getElementById(m.fillId);
      if (fill) {
        fill.style.width = pct + '%';
      }
    });

    const overallPct = totalTopics > 0 ? Math.round((totalCompleted / totalTopics) * 100) : 0;
    
    const fillEl = document.getElementById('overall-progress-fill');
    const scoreEl = document.getElementById('overall-progress-score');
    if (fillEl) fillEl.style.width = overallPct + '%';
    if (scoreEl) scoreEl.textContent = totalCompleted + ' of ' + totalTopics + ' Topics Revised (' + overallPct + '%)';
  }

  // 3. FUZZY SEARCH (Ctrl+K)
  let selectedIndex = 0;
  let currentResults = [];

  window.openSearch = function () {
    const backdrop = document.getElementById('search-modal-backdrop');
    const input = document.getElementById('search-input');
    if (backdrop && input) {
      backdrop.classList.add('open');
      input.value = '';
      renderSearchResults('');
      input.focus();
    }
  };

  window.closeSearch = function () {
    const backdrop = document.getElementById('search-modal-backdrop');
    if (backdrop) backdrop.classList.remove('open');
  };

  function escapeHtml(str) {
    return (str || '').replace(/[&<>"']/g, function (m) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m];
    });
  }

  function renderSearchResults(query) {
    const resultsContainer = document.getElementById('search-results');
    if (!resultsContainer) return;

    if (typeof SEARCH_INDEX === 'undefined') {
      resultsContainer.innerHTML = '<div class="search-empty">Loading search index...</div>';
      return;
    }

    const q = query.trim().toLowerCase();
    if (!q) {
      currentResults = SEARCH_INDEX.slice(0, 8);
    } else {
      currentResults = SEARCH_INDEX.filter(function (item) {
        return item.title.toLowerCase().includes(q) ||
               item.badge.toLowerCase().includes(q) ||
               (item.chips && item.chips.some(function (c) { return c.toLowerCase().includes(q); })) ||
               (item.keywords && item.keywords.toLowerCase().includes(q));
      }).slice(0, 15);
    }

    selectedIndex = 0;

    if (currentResults.length === 0) {
      resultsContainer.innerHTML = '<div class="search-empty">No matching exam topics found for "' + escapeHtml(query) + '"</div>';
      return;
    }

    resultsContainer.innerHTML = currentResults.map(function (item, idx) {
      const chipsHtml = (item.chips || []).slice(0, 3).map(function (c) {
        const is10M = c.toLowerCase().includes('10m') || c.toLowerCase().includes('essay');
        const is3M = c.toLowerCase().includes('3m') || c.toLowerCase().includes('short') || c.toLowerCase().includes('define');
        const cls = is10M ? 'chip-10m' : (is3M ? 'chip-3m' : '');
        return '<span class="result-chip ' + cls + '">' + escapeHtml(c) + '</span>';
      }).join('');

      return (
        '<a href="' + encodeURI(item.url) + '" class="search-result-item ' + (idx === 0 ? 'selected' : '') + '" data-idx="' + idx + '">' +
          '<div class="result-main">' +
            '<div class="result-title">' + escapeHtml(item.title) + '</div>' +
            '<div class="result-chips">' + chipsHtml + '</div>' +
          '</div>' +
          '<span class="result-badge">' + escapeHtml(item.badge) + '</span>' +
        '</a>'
      );
    }).join('');

    resultsContainer.querySelectorAll('.search-result-item').forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        resultsContainer.querySelectorAll('.search-result-item').forEach(function (r) { r.classList.remove('selected'); });
        el.classList.add('selected');
        selectedIndex = parseInt(el.getAttribute('data-idx'), 10);
      });
    });
  }

  function updateSelectedResult() {
    const items = document.querySelectorAll('.search-result-item');
    items.forEach(function (item, idx) {
      item.classList.toggle('selected', idx === selectedIndex);
      if (idx === selectedIndex) {
        item.scrollIntoView({ block: 'nearest' });
      }
    });
  }

  // Keyboard Navigation Listener
  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      const backdrop = document.getElementById('search-modal-backdrop');
      if (backdrop && backdrop.classList.contains('open')) {
        closeSearch();
      } else {
        openSearch();
      }
      return;
    }

    const backdrop = document.getElementById('search-modal-backdrop');
    if (!backdrop || !backdrop.classList.contains('open')) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      closeSearch();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (currentResults.length > 0) {
        selectedIndex = (selectedIndex + 1) % currentResults.length;
        updateSelectedResult();
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (currentResults.length > 0) {
        selectedIndex = (selectedIndex - 1 + currentResults.length) % currentResults.length;
        updateSelectedResult();
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (currentResults[selectedIndex]) {
        window.location.href = encodeURI(currentResults[selectedIndex].url);
      }
    }
  });

  // DOMContentLoaded
  document.addEventListener('DOMContentLoaded', function () {
    updateDashboardProgress();

    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('input', function (e) {
        renderSearchResults(e.target.value);
      });
    }

    const backdrop = document.getElementById('search-modal-backdrop');
    if (backdrop) {
      backdrop.addEventListener('click', function (e) {
        if (e.target === backdrop) closeSearch();
      });
    }
  });

  // Refresh progress whenever window gets focus
  window.addEventListener('focus', updateDashboardProgress);
})();
