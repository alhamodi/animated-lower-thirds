import { test, expect } from '@playwright/test';

test.describe('OBS Dynamic Source', () => {
  test('should load the default style initially', async ({ page }) => {
    // Navigate directly to obs.html
    await page.goto('/obs.html');
    
    const iframe = page.locator('#ltFrame');
    await expect(iframe).toBeVisible();
    
    // Check if the iframe src contains style1-emerald
    const src = await iframe.getAttribute('src');
    expect(src).toContain('style1-emerald.html');
  });

  test('should parse URL parameters and apply them to iframe', async ({ page }) => {
    await page.goto('/obs.html?styleFile=style3-modern.html&name=Integration%20Test');
    
    const iframe = page.locator('#ltFrame');
    const src = await iframe.getAttribute('src');
    
    expect(src).toContain('style3-modern.html');
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
        styleFile: 'style2-royal.html',
        name: 'Broadcast Name',
        title: 'Broadcast Title'
      });
      channel.close();
    });
    
    // Give it a moment to process the message and change src
    await page.waitForTimeout(200);
    
    const newSrc = await iframe.getAttribute('src');
    expect(newSrc).toContain('style2-royal.html');
    expect(newSrc).toContain('name=Broadcast+Name');
  });
});
