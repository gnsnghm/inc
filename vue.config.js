const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  devServer: {
    allowedHosts: "all",
    host: "0.0.0.0",
    port: "8080",
  },
  transpileDependencies: true,
});
