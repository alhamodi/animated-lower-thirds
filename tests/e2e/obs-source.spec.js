import { test, expect } from '@playwright/test';

test.describe('OBS Dynamic Source', () => {
  test('should load the default style initially', async ({ page }) => {
    // Navigate directly to obs.html
    await page.goto('/obs.html');
    
    const iframe = page.locator('#ltFrame');
    await expect(iframe).toBeVisible();
    
    // Check if the iframe src contains render.html and style=emerald
    const src = await iframe.getAttribute('src');
    expect(src).toContain('render.html');
    expect(src).toContain('style=emerald');
  });

  test('should parse URL parameters and apply them to iframe', async ({ page }) => {
    await page.goto('/obs.html?style=modern&name=Integration%20Test');
    
    const iframe = page.locator('#ltFrame');
    const src = await iframe.getAttribute('src');
    
    expect(src).toContain('render.html');
    expect(src).toContain('style=modern');
    expect(src).toContain('name=Integration+Test');
  });

  test('should react to BroadcastChannel messages', async ({ page }) => {
    await page.goto('/obs.html');
    
    const iframe = page.locator('#ltFrame');
    
    // Simulate a message from another tab/control panel
    await page.evaluate(() => {
      const channel = new BroadcastChannel('lt-control');
      channel.postMessage({
        type: 'update',
        style: 'royal',
        name: 'Broadcast Name',
        title: 'Broadcast Title'
      });
      channel.close();
    });
    
    // Give it a moment to process the message and hot-swap
    await page.waitForTimeout(300);
    
    const currentTheme = await iframe.evaluate((el) => el.contentWindow.themeRouter.currentTheme);
    expect(currentTheme).toBe('royal');

    const iframeName = iframe.contentFrame().locator('.lt-name');
    await expect(iframeName).toContainText('Broadcast Name');
  });
});
