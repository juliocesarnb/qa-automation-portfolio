const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.E2E_BASE_URL || 'https://www.saucedemo.com',
    specPattern: ['cypress/e2e/**/*.cy.js', 'cypress/smoke/**/*.cy.js'],
    supportFile: 'cypress/support/e2e.js',
    viewportWidth: 1440,
    viewportHeight: 900,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 20000,
    setupNodeEvents(on, config) {
      return config;
    }
  },
  chromeWebSecurity: false,
  reporter: 'spec',
  retries: {
    runMode: 1,
    openMode: 0
  },
  screenshotOnRunFailure: true,
  video: true
});
