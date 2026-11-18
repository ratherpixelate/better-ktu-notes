import { test, expect } from '@playwright/test';

test.describe('BetterKTUNotes E2E Suite', () => {

  test('1. Hub Page Loads and Renders Core Sections', async ({ page }) => {
    await page.goto('/');

    // Check Title
    await expect(page).toHaveTitle(/BetterKTUNotes/);

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

    // Check 4 Active Modules
    const activeCards = page.locator('.module-card:not(.locked)');
    await expect(activeCards).toHaveCount(4);

    // Capture screenshot
    await page.screenshot({ path: 'tests/screenshots/01-hub-page.png', fullPage: true });
  });

  test('2. Visual Theme Switcher (Light / Dark Mode)', async ({ page }) => {
    await page.goto('/');

    const html = page.locator('html');
    const toggleBtn = page.locator('.btn-icon.theme-toggle');

    // Click toggle to switch theme
    const initialTheme = await html.getAttribute('data-theme') || 'light';
    await toggleBtn.click();
    const newTheme = await html.getAttribute('data-theme');
    expect(newTheme).not.toBe(initialTheme);

    // Verify localStorage persistence
    const storedTheme = await page.evaluate(() => localStorage.getItem('bkn-theme'));
    expect(storedTheme).toBe(newTheme);

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

    // Press Escape to close
    await page.keyboard.press('Escape');
    await expect(page.locator('.search-modal-backdrop')).not.toBeVisible();
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

    // DBMS Module 1
    await page.goto('/notes/dbms-module-1/');
    await expect(page).toHaveTitle(/DBMS Module 1/);
    await expect(page.locator('.toc')).toBeVisible();

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

    // Capture screenshot of TOC sidebar (light mode)
    await toc.screenshot({ path: 'tests/screenshots/06-coa-toc-sidebar.png' });
    await page.screenshot({ path: 'tests/screenshots/07-coa-module-page.png', fullPage: false });

    // Switch to dark mode and verify
    const toggleBtn = page.locator('.btn-icon.theme-toggle');
    await toggleBtn.click();
    await toc.screenshot({ path: 'tests/screenshots/08-coa-toc-sidebar-dark.png' });
  });

});
