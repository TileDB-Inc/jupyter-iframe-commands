import { test, expect, Page } from '@playwright/test';

const waitForApp = async (page: Page) => {
  const iframe = page.locator('#jupyterlab').contentFrame();

  await iframe.locator('#jupyterlab-splash').waitFor({ state: 'detached' });
  await iframe.locator('#galaxy').waitFor({ state: 'detached' });
  await iframe.locator('#main-logo').waitFor({ state: 'detached' });
};

test.use({
  baseURL: 'http://localhost:8080',
  viewport: {
    width: 1024,
    height: 768
  }
});
/**
 * This test uses the raw Playwright since the host page does not expose window.jupyterapp
 */
test.describe('Commands from host should affect lab in iframe', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('index.html');

    const iframe = page.locator('#jupyterlab').contentFrame();

    await iframe.locator('.jp-LauncherCard-icon').first().waitFor();

    // Make sure left sidebar is hidden
    await iframe.getByText('View', { exact: true }).click();
    await iframe.getByText('Appearance').hover();
    await iframe
      .locator('#jp-mainmenu-view-appearance')
      .getByText('Show Left Sidebar')
      .waitFor();

    const leftSidebarOpen = await iframe
      .getByRole('menuitem', { name: 'Show Left Sidebar Ctrl+B' })
      .getByRole('img')
      .isVisible();

    if (leftSidebarOpen) {
      await iframe
        .locator('#jp-mainmenu-view-appearance')
        .getByText('Show Left Sidebar')
        .click();
    }

    await iframe.locator('#jp-MainLogo').click();

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

    await expect(page).toHaveScreenshot('light-theme.png', { timeout: 1500 });
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

    await expect(page).toHaveScreenshot('dark-theme.png', { timeout: 1500 });
  });

  test('Open a new notebook', async ({ page }) => {
    await page.getByPlaceholder('Enter a command').fill('notebook:create-new');
    await page.getByRole('button', { name: 'Submit' }).click();

    await waitForApp(page);

    const iframe = page.locator('#jupyterlab').contentFrame();
    await expect(iframe.getByText('Select KernelSelect kernel')).toBeVisible();

    await iframe.getByRole('button', { name: 'Select Kernel' }).click();
    await expect(iframe.getByLabel('Cells', { exact: true })).toBeVisible();

    // Close all tabs and wait for launcher
    await page
      .getByPlaceholder('Enter a command')
      .fill('application:close-all');
    await page.getByRole('button', { name: 'Submit' }).click();
    await iframe
      .getByRole('button', { name: 'Discard changes to file' })
      .click();
    await iframe.locator('.jp-LauncherCard-icon').first().waitFor();
  });
});
