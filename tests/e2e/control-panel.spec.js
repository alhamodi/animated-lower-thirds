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
    // Type into the title input (speaker name) which maps to .lt-name
    const titleInput = page.locator('#titleInput');
    await titleInput.fill('Playwright Tester');
    
    // The control panel debounce takes 100ms, wait slightly
    await page.waitForTimeout(200);

    // Check if the iframe preview received the update
    const iframe = page.locator('#previewFrame');
    const iframeTitle = iframe.contentFrame().locator('.lt-title');
    
    // In style1-emerald.html, it should update
    await expect(iframeTitle).toContainText('Playwright Tester');
  });

  test('should persist input data across page reloads', async ({ page }) => {
    // Fill in inputs
    const titleInput = page.locator('#titleInput');
    const nameInput = page.locator('#nameInput');
    
    await titleInput.fill('E2E Persistent Name');
    await nameInput.fill('E2E Persistent Title');
    
    // Wait for debounced save to complete (100ms debounce + margin)
    await page.waitForTimeout(300);
    
    // Reload the page
    await page.reload();
    
    // Verify inputs have the persisted values
    await expect(page.locator('#titleInput')).toHaveValue('E2E Persistent Name');
    await expect(page.locator('#nameInput')).toHaveValue('E2E Persistent Title');
  });
});
