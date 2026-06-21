import { test, expect } from '@playwright/test';

test.describe('Control Panel UI', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/index.html');
  });

  test('should load the control panel successfully', async ({ page }) => {
    // Assert title
    await expect(page).toHaveTitle(/لوحة تحكم/);
    
    // Assert header is visible
    await expect(page.locator('.app-header h1')).toBeVisible();
    await expect(page.locator('.app-header h1')).toContainText('لوحة تحكم');
  });

  test('should switch tabs', async ({ page }) => {
    // Click on the settings tab
    await page.locator('[data-tab="settings"]').click();
    
    // Verify that the settings panel becomes active
    await expect(page.locator('#panel-settings')).toHaveClass(/active/);
    await expect(page.locator('#panel-text')).not.toHaveClass(/active/);
  });

  test('should update preview when input changes', async ({ page }) => {
    // Type into the name input
    const nameInput = page.locator('#nameInput');
    await nameInput.fill('Playwright Tester');
    
    // The control panel debounce takes 100ms, wait slightly
    await page.waitForTimeout(200);

    // Check if the iframe preview received the update
    const iframe = page.locator('#previewFrame');
    const iframeName = iframe.contentFrame().locator('.lt-name');
    
    // In style1-emerald.html, it should update
    await expect(iframeName).toContainText('Playwright Tester');
  });
});
