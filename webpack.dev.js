const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const parts = require("./webpack.parts");
const commonConfig = require("./webpack.common");

module.exports = merge([
  commonConfig,
  {
    mode: "development",
    devtool: "inline-source-map",
    // webpack-dev-server running in-memory, support hmr, uses only for development
    devServer: {
      stats: "errors-only",
      port: 4200,
      hot: true,
      overlay: true,
      // proxy,
      // open: true,
      // host: process.env.HOST, // defaults localhost
      // port: process.env.PORT, // defaults 8080 => PORT=3000 npm start
      // contentBase
      // headers
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
      }),
    ],
  },
  parts.cssLoader({
    ext: "scss",
    extraLoaders: "sass-loader",
    options: { hmr: true, reloadAll: true },
  }),
  parts.cssLoader({
    ext: "less",
    extraLoaders: "less-loader",
    options: { hmr: true, reloadAll: true },
  }),
  parts.cssLoader({
    ext: "css",
    options: { hmr: true, reloadAll: true },
    extraLoaders: parts.postCssLoader(),
  }),
  parts.jsLoader({ extraLoaders: "eslint-loader" }),
  parts.jsLoader({
    ext: "ts",
    presets: "@babel/preset-typescript",
    extraLoaders: "eslint-loader",
  }),
  parts.jsLoader({
    ext: "jsx",
    presets: "@babel/preset-react",
    extraLoaders: "eslint-loader",
  }),
]);
