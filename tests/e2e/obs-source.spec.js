import { test, expect } from '@playwright/test';

test.describe('OBS Dynamic Source', () => {
  test('should load the default style initially', async ({ page }) => {
    // Navigate directly to obs.html
    await page.goto('/obs.html');
    
    const iframe = page.locator('#ltFrame');
    await expect(iframe).toBeVisible();
    
    // Check if the iframe src contains render.html and style=islamic-3d
    const src = await iframe.getAttribute('src');
    expect(src).toContain('render.html');
    expect(src).toContain('style=islamic-3d');
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
    
    // Simulate a message from another tab/control panel (sending to both API and BroadcastChannel)
    await page.evaluate(async () => {
      const cmd = {
        type: 'show',
        style: 'royal',
        name: 'Broadcast Name',
        title: 'Broadcast Title'
      };
      
      try {
        await fetch('/api/command', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(cmd)
        });
      } catch (err) {}

      const channel = new BroadcastChannel('lt-control');
      channel.postMessage(cmd);
      channel.close();
    });
    
    // Wait for the iframe's lower third to show up and have the text
    const iframeName = iframe.contentFrame().locator('.lt-name');
    await expect(iframeName).toContainText('Broadcast Title');
  });
});
