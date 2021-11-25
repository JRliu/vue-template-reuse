const compiler = require("vue-template-compiler");

module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .tap((options) => {
        options.compiler = require("../index.js")(compiler);

        return options;
      });
  },
};
