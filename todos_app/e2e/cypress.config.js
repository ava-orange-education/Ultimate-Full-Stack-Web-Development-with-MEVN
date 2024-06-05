const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
    specPattern: 'cypress/integration/dashboard/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: false
  },
})
