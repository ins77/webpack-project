const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const PATHS = require("./webpack.paths");

module.exports = {
  context: PATHS.src,
  entry: {
    main: ["@babel/polyfill", "./index.jsx"],
    analytics: "./analytics.ts",
  },
  output: {
    filename: "[name].[hash].js",
    chunkFilename: "chunks/[name].[hash].js",
    path: PATHS.build,
  },
  resolve: {
    extensions: [".js", ".json", ".png"],
    alias: {
      "@models": PATHS.models,
      "@": PATHS.src,
    },
    // plugins,
    // modules,
  },
  optimization: {
    runtimeChunk: "single", // separate manifest/runtime - описание какие файлы должен загрузить webpack
    splitChunks: {
      // minSize: 10000,
      // maxSize: 250000,
      // try plugins for chunks more control: AggressiveSplittingPlugin and AggressiveMergingPlugin
      chunks: "all",
      // cacheGroups: {
      //   commons: {
      //     test: /[\\/]node_modules[\\/]/,
      //     name: "vendor",
      //     chunks: "all",
      //   },
      // },
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: PATHS.favicon,
        to: PATHS.build,
      },
    ]),
    new webpack.ProvidePlugin({
      $: "jquery",
      _: "lodash",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "assets/[name].[hash].[ext]",
            },
          },
        ],
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "assets/[name].[hash].[ext]", // in file-loader hash=contenthash
            },
          },
        ],
      },
      {
        test: /\.xml$/,
        use: ["xml-loader"],
      },
      {
        test: /\.csv$/,
        use: ["csv-loader"],
      },
    ],
  },
};
