import { test, expect } from '@playwright/test';

test.use({ baseURL: 'http://localhost:8080' });
/**
 * This test uses the raw Playwright since the host page does not expose window.jupyterapp
 */
test.describe('Commands from host should affect lab in iframe', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('index.html');
  });

  test('Swich to light theme', async ({ page }) => {
    await page
      .getByPlaceholder('Enter a command')
      .fill('apputils:change-theme');
    await page
      .getByPlaceholder('Enter args (optional)')
      .fill(" { 'theme': 'JupyterLab Light' }");
    await page.getByRole('button', { name: 'Submit' }).click();

    await page
      .frameLocator('#jupyterlab')
      .locator('#jupyterlab-splash')
      .waitFor({ state: 'detached' });

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

    await page
      .frameLocator('#jupyterlab')
      .locator('#jupyterlab-splash')
      .waitFor({ state: 'detached' });

    expect(await page.screenshot()).toMatchSnapshot('dark-theme.png');
  });
});
