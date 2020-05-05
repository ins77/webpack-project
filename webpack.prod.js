const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const PurifyCssWebpackPlugin = require("purifycss-webpack");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const cssnano = require("cssnano");
const glob = require("glob");
const path = require("path");

const parts = require("./webpack.parts");
const commonConfig = require("./webpack.common");

module.exports = merge([
  commonConfig,
  {
    // performance: {
    //   hints: false,
    //   maxEntrypointSize: 512000,
    //   maxAssetSize: 512000
    // },
    mode: "production",
    optimization: {
      minimizer: [
        new OptimizeCssAssetsWebpackPlugin({
          cssProcessor: cssnano,
          cssProcessorOptions: {
            discardComments: {
              removeAll: true,
            },
            safe: true, // run cssnano in safe mode to avoid potentially unsafe transformations.
          },
          // canPrint: false, // for --json output
        }),
        new TerserWebpackPlugin(),
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
        minify: {
          collapseWhitespace: true,
        },
      }),
      new PurifyCssWebpackPlugin({
        paths: glob.sync(`${path.join(__dirname, "src")}/**/*.jsx`, {
          nodir: true,
        }),
      }),
      new BundleAnalyzerPlugin(),
    ],
  },
  parts.cssLoader({ ext: "scss", extraLoaders: "sass-loader" }),
  parts.cssLoader({ ext: "less", extraLoaders: "less-loader" }),
  parts.cssLoader({
    ext: "css",
    extraLoaders: parts.postCssLoader(),
  }),
  parts.jsLoader(),
  parts.jsLoader({ ext: "ts", presets: "@babel/preset-typescript" }),
  parts.jsLoader({ ext: "jsx", presets: "@babel/preset-react" }),
]);
