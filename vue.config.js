const { defineConfig } = require("@vue/cli-service");
const { shallowReactive } = require("vue");
module.exports = defineConfig({
  publicPath: "/Strive/",
  transpileDependencies: ["vuetify"],
});
