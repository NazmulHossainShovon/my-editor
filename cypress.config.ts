import { defineConfig } from 'cypress';
import path from 'node:path';
import vitePreprocessor from 'cypress-vite';

export default defineConfig({
  env: {
    NODE_ENV: 'test',
  },
  fixturesFolder: 'test/cypress/fixtures',
  screenshotsFolder: 'test/cypress/screenshots',
  video: false,
  videosFolder: 'test/cypress/videos',
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      on('file:preprocessor', vitePreprocessor({
        configFile: path.resolve(__dirname, './vite.config.test.js'),
      }));

      /**
       * Plugin for cypress that adds better terminal output for easier debugging.
       * Prints cy commands, browser console logs, cy.request and cy.intercept data. Great for your pipelines.
       * https://github.com/archfz/cypress-terminal-report
       */
      require('cypress-terminal-report/src/installLogsPrinter')(on);

      require('@cypress/code-coverage/task')(on, config);
    },
    specPattern: 'test/cypress/tests/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'test/cypress/support/index.ts',
  },
  'retries': {
    // Configure retry attempts for `cypress run`
    'runMode': 2,
    // Configure retry attempts for `cypress open`
    'openMode': 0,
  },
});
