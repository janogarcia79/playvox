import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'https://simple-books-api.glitch.me/',
    responseTimeout: 30000,
    video: false,
    setupNodeEvents(on, config) {
      on('task', {
        log(message) {
          console.log(message)
  
          return null
        },
      })
    },
  },
});
