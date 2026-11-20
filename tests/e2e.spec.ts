import { test, expect } from '@playwright/test';

test.describe('BetterKTUNotes E2E Suite', () => {

  test('1. Hub Page Loads and Renders Core Sections', async ({ page }) => {
    await page.goto('/');

    // Check Title
    await expect(page).toHaveTitle(/BetterKTUNotes/);

    // Check Integrated <logo B>etterKTUNotes Brand Lockup
    const brandWrap = page.locator('.brand-wrap');
    await expect(brandWrap).toHaveAttribute('aria-label', 'BetterKTUNotes Home');
    await expect(brandWrap.locator('.brand-logo')).toHaveText('B');
    await expect(brandWrap.locator('.brand-title')).toHaveText('etterKTUNotes');
    await expect(brandWrap.locator('.brand-subtitle')).not.toBeAttached();
    await expect(brandWrap).not.toContainText(['2024 Scheme', 'S3 Studio']);

    // Check Hero
    await expect(page.locator('.hero-title')).toHaveText('BetterKTUNotes');
    await expect(page.locator('.hero-lead')).toBeVisible();

    // Check Progress Tracker
    await expect(page.locator('.progress-card')).toBeVisible();
    await expect(page.locator('.progress-title')).toHaveText('Your Exam Revision Progress');

    // Check 3 Subjects are rendered
    await expect(page.locator('#pcitt302')).toBeVisible();
    await expect(page.locator('#pcitt303')).toBeVisible();
    await expect(page.locator('#pbitt304')).toBeVisible();

    // Check 7 Active Modules (COA M1, COA M2, COA M3, COA M4, DS M1, DBMS M1, DBMS M2)
    const activeCards = page.locator('.module-card:not(.locked)');
    await expect(activeCards).toHaveCount(7);

    // Verify Active Module Card shows "0/17 completed" and NO green status dot
    const coaM1Card = activeCards.first();
    await expect(coaM1Card.locator('.card-status')).toHaveText('0/17 completed');
    await expect(coaM1Card.locator('.status-dot')).not.toBeAttached();
    await expect(page.locator('.module-card:not(.locked)')).not.toContainText(['Complete Syllabus']);

    // Check Favicon links in document head
    const faviconSvg = page.locator('link[rel="icon"][type="image/svg+xml"]');
    await expect(faviconSvg).toBeAttached();
    const faviconIco = page.locator('link[rel="icon"][sizes="32x32"]');
    await expect(faviconIco).toBeAttached();
    const appleTouchIcon = page.locator('link[rel="apple-touch-icon"]');
    await expect(appleTouchIcon).toBeAttached();

    // Capture screenshot
    await page.screenshot({ path: 'tests/screenshots/01-hub-page.png', fullPage: true });
  });

  test('2. Visual Theme Switcher (Light / Dark Mode)', async ({ page }) => {
    await page.goto('/');

    const html = page.locator('html');
    const toggleBtn = page.locator('.btn-icon.theme-toggle');
    const sunIcon = toggleBtn.locator('.theme-icon-sun');
    const moonIcon = toggleBtn.locator('.theme-icon-moon');

    // Both icons must exist in the DOM for smooth zero-hydration rotational cross-fade
    await expect(sunIcon).toBeAttached();
    await expect(moonIcon).toBeAttached();

    // Click toggle to switch theme
    const initialTheme = await html.getAttribute('data-theme') || 'light';
    await toggleBtn.click();
    const newTheme = await html.getAttribute('data-theme');
    expect(newTheme).not.toBe(initialTheme);

    // Verify localStorage persistence
    const storedTheme = await page.evaluate(() => localStorage.getItem('bkn-theme'));
    expect(storedTheme).toBe(newTheme);

    // Verify icon opacity matching theme after transition settles
    if (newTheme === 'dark') {
      await expect(sunIcon).toHaveCSS('opacity', '1');
      await expect(moonIcon).toHaveCSS('opacity', '0');
    } else {
      await expect(moonIcon).toHaveCSS('opacity', '1');
      await expect(sunIcon).toHaveCSS('opacity', '0');
    }

    // Capture screenshot in dark mode
    if (newTheme !== 'dark') {
      await toggleBtn.click();
    }
    await page.screenshot({ path: 'tests/screenshots/02-hub-dark-mode.png', fullPage: true });
  });

  test('3. Quick Search Modal (Ctrl+K and Fuzzy Search)', async ({ page }) => {
    await page.goto('/');

    // Click search trigger
    await page.locator('.search-trigger').click();
    await expect(page.locator('.search-modal-backdrop')).toBeVisible();

    const searchInput = page.locator('.search-input');
    await searchInput.fill('asymptotic');

    // Verify search results appear
    const results = page.locator('.search-result-item');
    await expect(results.first()).toBeVisible();
    await expect(results.first()).toContainText('Asymptotic notations');

    // Capture screenshot of search modal
    await page.screenshot({ path: 'tests/screenshots/03-search-modal.png' });

    // Click the first search result ("Asymptotic notations")
    await results.first().click();

    // Verify modal closes and page navigates to target topic
    await expect(page.locator('.search-modal-backdrop')).not.toBeVisible();
    await expect(page).toHaveURL(/notes\/ds-module-1\/#t-asym/);
    await expect(page.locator('#t-asym')).toBeVisible();

    // Now test in-page search navigation (within same note page)
    await page.keyboard.press('Control+k');
    await expect(page.locator('.search-modal-backdrop')).toBeVisible();

    await page.locator('.search-input').fill('sparse');
    const sparseResult = page.locator('.search-result-item').first();
    await expect(sparseResult).toContainText('Sparse matrix');
    await page.keyboard.press('Enter');

    // Verify URL updated to sparse matrix on same page
    await expect(page.locator('.search-modal-backdrop')).not.toBeVisible();
    await expect(page).toHaveURL(/#t-sparse/);
    await expect(page.locator('#t-sparse')).toBeVisible();
  });

  test('4. DS Module 1 Notes & SVG Graph Integrity', async ({ page }) => {
    await page.goto('/notes/ds-module-1/');

    // Check title and TOC
    await expect(page).toHaveTitle(/DS Module 1/);
    await expect(page.locator('.toc')).toBeVisible();

    // Verify the SVG Time Complexity Graph
    const graphSvg = page.locator('.fig svg').first();
    await expect(graphSvg).toBeVisible();

    // Check that curves have fill="none" (NO solid black polygons)
    const expCurve = graphSvg.locator('path.g-exp');
    await expect(expCurve).toBeVisible();
    const fillAttr = await expCurve.getAttribute('fill');
    expect(fillAttr).toBe('none');

    const cubCurve = graphSvg.locator('path.g-cub');
    expect(await cubCurve.getAttribute('fill')).toBe('none');

    // Verify computed style fill is not black
    const computedFill = await expCurve.evaluate((el) => window.getComputedStyle(el).fill);
    expect(computedFill).toBe('none');

    // Test Revision Checkbox
    const firstCheckbox = page.locator('input.rev').first();
    const isInitiallyChecked = await firstCheckbox.isChecked();
    await firstCheckbox.click();
    expect(await firstCheckbox.isChecked()).toBe(!isInitiallyChecked);

    // Verify progress text increments
    await expect(page.locator('.toc .progress')).toContainText('sections revised');

    // Capture screenshot of the graph
    await graphSvg.screenshot({ path: 'tests/screenshots/04-ds-graph.png' });
    await page.screenshot({ path: 'tests/screenshots/05-ds-module-page.png', fullPage: false });
  });

  test('5. COA & DBMS Notes and Question Accordions', async ({ page }) => {
    // COA Module 2
    await page.goto('/notes/coa-module-2/');
    await expect(page).toHaveTitle(/COA Module 2/);
    await expect(page.locator('.fig svg').first()).toBeVisible();

    // Test question accordion
    const firstQuestion = page.locator('details.q').first();
    await expect(firstQuestion).toBeVisible();
    expect(await firstQuestion.getAttribute('open')).toBeNull();
    await firstQuestion.locator('summary').click();
    expect(await firstQuestion.getAttribute('open')).not.toBeNull();

    // Verify question accordion expansion animation
    const firstAns = firstQuestion.locator('.ans');
    await expect(firstAns).toBeVisible();
    const animName = await firstAns.evaluate((el) => window.getComputedStyle(el).animationName);
    expect(animName).toContain('ansIn');

    // Test footer navigation links in COA Module 2
    const nextLink = page.locator('.notes-footer-nav a:has-text("Next: COA Module 3")');
    await expect(nextLink).toBeVisible();
    await nextLink.click();
    await expect(page).toHaveURL(/localhost:3000\/notes\/coa-module-3\/?$/);
    await expect(page).toHaveTitle(/COA Module 3/);

    // Verify COA Module 3 TOC, Checkboxes & SVG Diagrams
    await expect(page.locator('.toc')).toBeVisible();
    await expect(page.locator('.toc a')).toHaveCount(16);
    await expect(page.locator('input.rev')).toHaveCount(14);
    await expect(page.locator('#t-sheet .rev')).not.toBeAttached();
    await expect(page.locator('#t-qa .rev')).not.toBeAttached();
    await expect(page.locator('.fig svg').first()).toBeVisible();

    // Test forward navigation to COA Module 4
    const nextToM4Link = page.locator('.notes-footer-nav a:has-text("Next: COA Module 4")');
    await expect(nextToM4Link).toBeVisible();
    await nextToM4Link.click();
    await expect(page).toHaveURL(/localhost:3000\/notes\/coa-module-4\/?$/);
    await expect(page).toHaveTitle(/COA Module 4/);

    // Verify COA Module 4 TOC, Checkboxes & Multithreading Diagrams
    await expect(page.locator('.toc')).toBeVisible();
    await expect(page.locator('.toc a')).toHaveCount(9);
    await expect(page.locator('input.rev')).toHaveCount(7);
    await expect(page.locator('#t-sheet .rev')).not.toBeAttached();
    await expect(page.locator('#t-qa .rev')).not.toBeAttached();
    await expect(page.locator('.fig svg').first()).toBeVisible();

    // Navigate back to COA Module 3
    const prevToM3Link = page.locator('.notes-footer-nav a:has-text("Previous: COA Module 3")');
    await expect(prevToM3Link).toBeVisible();
    await prevToM3Link.click();
    await expect(page).toHaveURL(/localhost:3000\/notes\/coa-module-3\/?$/);

    // Navigate back to COA Module 2
    const prevToM2Link = page.locator('.notes-footer-nav a:has-text("Previous: COA Module 2")');
    await expect(prevToM2Link).toBeVisible();
    await prevToM2Link.click();
    await expect(page).toHaveURL(/localhost:3000\/notes\/coa-module-2\/?$/);

    const prevLink = page.locator('.notes-footer-nav a:has-text("Previous: COA Module 1")');
    await expect(prevLink).toBeVisible();
    await prevLink.click();
    await expect(page).toHaveURL(/localhost:3000\/notes\/coa-module-1\/?$/);
    await expect(page).toHaveTitle(/COA Module 1/);

    // Test All Subjects link in COA Module 1 footer
    const allSubjectsLink = page.locator('.notes-footer-nav a:has-text("All Subjects")');
    await expect(allSubjectsLink).toBeVisible();
    await allSubjectsLink.click();
    await expect(page).toHaveURL(/localhost:3000\/?$/);

    // DBMS Module 1
    await page.goto('/notes/dbms-module-1/');
    await expect(page).toHaveTitle(/DBMS Module 1/);
    await expect(page.locator('.toc')).toBeVisible();

    // DBMS Module 2
    await page.goto('/notes/dbms-module-2/');
    await expect(page).toHaveTitle(/DBMS Module 2/);
    await expect(page.locator('.toc')).toBeVisible();
    await expect(page.locator('.toc a')).toHaveCount(14);
    await expect(page.locator('.fig svg').first()).toBeVisible();

    // Click All Modules back link
    await page.locator('.nav-back-link').click();
    await expect(page).toHaveURL(/localhost:3000\/?$/);
  });

  test('6. COA Module 1 TOC Selection Padding & Entity Parity', async ({ page }) => {
    await page.goto('/notes/coa-module-1/');
    await expect(page).toHaveTitle(/COA Module 1/);

    const toc = page.locator('.toc');
    await expect(toc).toBeVisible();

    // Verify entity decoding (NO &amp;)
    await expect(toc).toContainText('ISA & RISC');
    await expect(toc).not.toContainText('&amp;');

    // Verify active selection outline padding and border-radius
    const activeLink = toc.locator('a.on');
    await expect(activeLink).toBeVisible();
    await expect(activeLink).toContainText('Organization vs architecture');

    const paddingLeft = await activeLink.evaluate((el) => window.getComputedStyle(el).paddingLeft);
    expect(parseInt(paddingLeft, 10)).toBeGreaterThanOrEqual(10);

    const borderRadius = await activeLink.evaluate((el) => window.getComputedStyle(el).borderRadius);
    expect(parseInt(borderRadius, 10)).toBeGreaterThanOrEqual(4);

    // Verify note page content entrance bridge animation
    const mainContent = page.locator('main.notes-main');
    await expect(mainContent).toBeVisible();
    const enterAnim = await mainContent.evaluate((el) => window.getComputedStyle(el).animationName);
    expect(enterAnim).toContain('noteEnter');

    // Verify One-page cheat sheet has NO revised checkbox
    await expect(page.locator('#t-sheet .rev')).not.toBeAttached();
    await expect(page.locator('#t-sheet input[type="checkbox"]')).not.toBeAttached();

    // Capture screenshot of TOC sidebar (light mode)
    await toc.screenshot({ path: 'tests/screenshots/06-coa-toc-sidebar.png' });
    await page.screenshot({ path: 'tests/screenshots/07-coa-module-page.png', fullPage: false });

    // Switch to dark mode and verify
    const toggleBtn = page.locator('.btn-icon.theme-toggle');
    await toggleBtn.click();
    await toc.screenshot({ path: 'tests/screenshots/08-coa-toc-sidebar-dark.png' });
  });

  test('7. Zero Flash Dark Mode Initialization (Stored & System Preferences)', async ({ browser }) => {
    // Sub-test A: Stored 'dark' in localStorage loads directly into dark mode without light flash
    const contextWithDarkStorage = await browser.newContext();
    const pageA = await contextWithDarkStorage.newPage();

    // Seed localStorage BEFORE page navigation
    await pageA.addInitScript(() => {
      localStorage.setItem('bkn-theme', 'dark');
    });

    await pageA.goto('/notes/coa-module-1/', { waitUntil: 'domcontentloaded' });

    // Assert data-theme is 'dark' on frame 0
    const htmlThemeA = await pageA.locator('html').getAttribute('data-theme');
    expect(htmlThemeA).toBe('dark');

    // Assert body background is pure dark (#0C0C0D = rgb(12, 12, 13)), NEVER white
    const bgA = await pageA.evaluate(() => window.getComputedStyle(document.body).backgroundColor);
    expect(bgA).toBe('rgb(12, 12, 13)');

    await pageA.close();
    await contextWithDarkStorage.close();

    // Sub-test B: OS prefers-color-scheme: dark with empty localStorage loads directly into dark mode
    const contextDarkOS = await browser.newContext({
      colorScheme: 'dark',
    });
    const pageB = await contextDarkOS.newPage();

    await pageB.goto('/', { waitUntil: 'domcontentloaded' });

    const htmlThemeB = await pageB.locator('html').getAttribute('data-theme');
    expect(htmlThemeB).toBe('dark');

    const bgB = await pageB.evaluate(() => window.getComputedStyle(document.body).backgroundColor);
    expect(bgB).toBe('rgb(12, 12, 13)');

    await pageB.close();
    await contextDarkOS.close();
  });

});
