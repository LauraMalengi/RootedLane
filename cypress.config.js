const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: 'iddhc8',
  e2e: {
    baseUrl: 'http://localhost:5173', // Updated to Vite's default port
    viewportWidth: 1280,
    viewportHeight: 720,
    setupNodeEvents(on, config) {
      return config;
    },
  },
  env: {
    TEST_EMAIL: 'test@example.com',
    TEST_PASSWORD: 'password123'
  }
});