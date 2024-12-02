import { test, expect, Page } from '@playwright/test';

const waitForApp = async (page: Page) => {
  await page
    .locator('#jupyterlab')
    .contentFrame()
    .locator('#jupyterlab-splash')
    .waitFor({ state: 'detached' });

  await page
    .locator('#jupyterlab')
    .contentFrame()
    .locator('#galaxy')
    .waitFor({ state: 'detached' });

  await page
    .locator('#jupyterlab')
    .contentFrame()
    .locator('#main-logo')
    .waitFor({ state: 'detached' });

  await page
    .locator('#jupyterlab')
    .contentFrame()
    .locator('.jp-LauncherCard-icon')
    .first()
    .waitFor();
};

test.use({ baseURL: 'http://localhost:8080' });
/**
 * This test uses the raw Playwright since the host page does not expose window.jupyterapp
 */
test.describe('Commands from host should affect lab in iframe', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('index.html');

    // Make sure left sidebar is hidden
    await page
      .locator('#jupyterlab')
      .contentFrame()
      .getByText('View', { exact: true })
      .click();

    await page
      .locator('#jupyterlab')
      .contentFrame()
      .getByText('Appearance')
      .hover();

    await page
      .locator('#jupyterlab')
      .contentFrame()
      .locator('#jp-mainmenu-view-appearance')
      .getByText('Show Left Sidebar')
      .waitFor();

    const leftSidebarOpen = await page
      .locator('#jupyterlab')
      .contentFrame()
      .getByRole('menuitem', { name: 'Show Left Sidebar Ctrl+B' })
      .getByRole('img')
      .isVisible();

    if (leftSidebarOpen) {
      await page
        .locator('#jupyterlab')
        .contentFrame()
        .locator('#jp-mainmenu-view-appearance')
        .getByText('Show Left Sidebar')
        .click();
    }

    await page
      .locator('#jupyterlab')
      .contentFrame()
      .locator('#jp-MainLogo')
      .click();

    await waitForApp(page);
  });

  test('Swich to light theme', async ({ page }) => {
    await page
      .getByPlaceholder('Enter a command')
      .fill('apputils:change-theme');
    await page
      .getByPlaceholder('Enter args (optional)')
      .fill(" { 'theme': 'JupyterLab Light' }");
    await page.getByRole('button', { name: 'Submit' }).click();

    await waitForApp(page);

    expect(await page.screenshot()).toMatchSnapshot('light-theme.png');
  });

  test('Swich to dark theme', async ({ page }) => {
    await page
      .getByPlaceholder('Enter a command')
      .fill('apputils:change-theme');
    await page
      .getByPlaceholder('Enter args (optional)')
      .fill(" { 'theme': 'JupyterLab Dark' }");
    await page.getByRole('button', { name: 'Submit' }).click();

    await waitForApp(page);

    expect(await page.screenshot()).toMatchSnapshot('dark-theme.png');
  });
});
