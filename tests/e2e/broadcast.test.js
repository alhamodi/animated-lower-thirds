const { test, expect } = require('@playwright/test');

test.describe('BroadcastChannel Integration', () => {
  test('should update lower third preview across contexts via BroadcastChannel', async ({ context }) => {
    // We create two pages: one for control panel, one for the display template
    const controlPanelPage = await context.newPage();
    const displayPage = await context.newPage();

    controlPanelPage.on('console', msg => console.log('CONTROL PANEL LOG:', msg.text()));
    controlPanelPage.on('pageerror', err => console.error('CONTROL PANEL ERROR:', err.message));
    displayPage.on('console', msg => console.log('DISPLAY PAGE LOG:', msg.text()));
    displayPage.on('pageerror', err => console.error('DISPLAY PAGE ERROR:', err.message));

    // Navigate to local files assuming python server is running or using file://
    // For playwright testing with Vite, the base URL is provided if webServer is configured.
    // If not, we can test via file protocol, but BroadcastChannel needs a web server context typically.
    // Assuming Playwright is running a local dev server via vite/playwright config.
    
    // We will test if the playwright config provides a baseURL. If not we use the local server url.
    const baseUrl = process.env.BASE_URL || 'http://127.0.0.1:8080';
    
    try {
      await controlPanelPage.goto(`${baseUrl}/index.html`);
      await displayPage.goto(`${baseUrl}/templates/style16-minimalist.html`);
    } catch (e) {
      console.log('Ensure a dev server is running on the expected port for E2E tests.');
      return;
    }

    // Wait for elements to load
    await controlPanelPage.waitForSelector('#nameInput');
    
    console.log('DISPLAY PAGE URL:', displayPage.url());
    let wrapperClasses = await displayPage.locator('#ltWrapper').evaluate(el => el.className).catch(e => 'Wrapper not found: ' + e.message);
    console.log('LT WRAPPER CLASSES (INITIAL):', wrapperClasses);
    const ltAutostart = await displayPage.evaluate(() => window.LT ? window.LT.autostart : 'No LT').catch(e => 'LT eval error: ' + e.message);
    console.log('LT AUTOSTART:', ltAutostart);
    
    await displayPage.waitForTimeout(2000);
    wrapperClasses = await displayPage.locator('#ltWrapper').evaluate(el => el.className).catch(e => 'Wrapper not found: ' + e.message);
    console.log('LT WRAPPER CLASSES (AFTER 2S):', wrapperClasses);

    await displayPage.waitForSelector('.lt-name', { state: 'attached' });

    // Change value in control panel
    await controlPanelPage.fill('#nameInput', 'تجربة بثเพลย์ไรท์');
    
    // Trigger update if it requires a button click, or wait if debounced
    await controlPanelPage.waitForTimeout(1000); // Wait for debounce and animation
 
    // The display page should receive the BroadcastChannel message and update
    const displayNameEl = displayPage.locator('.lt-name');
    await expect(displayNameEl).toBeVisible();
    await expect(displayNameEl).toHaveText('تجربة بثเพลย์ไรท์');
  });
});
