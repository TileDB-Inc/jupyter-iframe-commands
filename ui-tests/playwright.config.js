/**
 * Configuration for Playwright using default from @jupyterlab/galata
 */
const baseConfig = require('@jupyterlab/galata/lib/playwright-config');

module.exports = {
  ...baseConfig,
  webServer: [
    {
      command: 'jlpm start:lab',
      url: 'http://localhost:8888/lab',
      timeout: 120 * 1000,
      reuseExistingServer: !process.env.CI
    },
    {
      command: 'jlpm start:server',
      url: 'http://localhost:8080',
      timeout: 120 * 1000,
      reuseExistingServer: !process.env.CI
    }
  ]
};
