const { defineConfig } = require("cypress");
require("./webpack.config.js");

module.exports = defineConfig({
    e2e: {
        baseUrl: "https://delliusalexander.com:4443",
        supportFile: "server/config.js",
        specPattern: "cypress/api/**/gpt3.{spec,cy}.{js,jsx,ts,tsx}"
    },
})