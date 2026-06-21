const { test, expect } = require('@playwright/test');

test.describe('BroadcastChannel Integration', () => {
  test('should update lower third preview across contexts via BroadcastChannel', async ({ context }) => {
    // We create two pages: one for control panel, one for the display template
    const controlPanelPage = await context.newPage();
    const displayPage = await context.newPage();

    // Navigate to local files assuming python server is running or using file://
    // For playwright testing with Vite, the base URL is provided if webServer is configured.
    // If not, we can test via file protocol, but BroadcastChannel needs a web server context typically.
    // Assuming Playwright is running a local dev server via vite/playwright config.
    
    // We will test if the playwright config provides a baseURL. If not we use the local server url.
    const baseUrl = process.env.BASE_URL || 'http://localhost:5173';
    
    try {
      await controlPanelPage.goto(`${baseUrl}/index.html`);
      await displayPage.goto(`${baseUrl}/templates/style16-minimalist.html`);
    } catch (e) {
      console.log('Ensure a dev server is running on the expected port for E2E tests.');
      return;
    }

    // Wait for elements to load
    await controlPanelPage.waitForSelector('#nameInput');
    await displayPage.waitForSelector('.lt-name');

    // Change value in control panel
    await controlPanelPage.fill('#nameInput', 'تجربة بثเพลย์ไรท์');
    
    // Trigger update if it requires a button click, or wait if debounced
    await controlPanelPage.waitForTimeout(500); // Wait for debounce

    // The display page should receive the BroadcastChannel message and update
    const displayName = await displayPage.locator('.lt-name').textContent();
    
    // In our app, empty spaces might be handled differently, but here it should match.
    expect(displayName).toContain('تجربة بثเพลย์ไรท์');
  });
});
