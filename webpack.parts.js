const MiniCssExtractPlugin = require("mini-css-extract-plugin");

exports.jsLoader = ({ ext = "js", presets = [], extraLoaders = [] } = {}) => {
  return {
    module: {
      rules: [
        {
          test: new RegExp(`\\.${ext}$`),
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: [
                  "@babel/preset-env",
                  // {
                  //   modules: false, // for tree-shaking babel doesn't need to transpile es2015 modules
                  // },
                ].concat(presets),
                plugins: [
                  "@babel/plugin-proposal-class-properties",
                  "@babel/plugin-syntax-dynamic-import",
                ],
                // env: {
                //   // see process.env.BABEL_ENV = mode;
                //   development: {
                //     plugins: ["annotate-console-log"],
                //   },
                // },
              },
            },
          ].concat(extraLoaders),
        },
      ],
    },
  };
};

exports.cssLoader = ({ ext, options = {}, extraLoaders = [] } = {}) => {
  return {
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].[contenthash].css",
      }),
    ],
    module: {
      rules: [
        {
          test: new RegExp(`\\.${ext}$`),
          use: [
            {
              loader: MiniCssExtractPlugin.loader, // instead of style-loader
              options,
            },
            "css-loader",
          ].concat(extraLoaders),
        },
      ],
    },
  };
};

exports.postCssLoader = () => {
  return {
    loader: "postcss-loader",
    options: {
      plugins: () => [
        require("postcss-import"),
        require("precss"),
        require("postcss-cssnext"), // includes autoprefixer
      ],
    },
  };
};

// exports.loadImages = ({ include, exclude, options } = {}) => ({
//   module: {
//     rules: [
//       {
//         test: /\.(png|jpg)$/,
//         include,
//         exclude,
//         use: {
//           // includes file-loader under the hood when used with limit option (все, что ниже limit - добавляется как base64 в чанк)
//           loader: "url-loader",
//           options, // { limit: 15000, name: "[name].[hash].[ext]" },
//         },
//       },
//     ],
//   },
// });

// Лоадеры
// {
//   test,
//   include,
//   exclude,
//   use: {
//     loader,
//     options,
//     resource,
//     issuer,
//     resourcePath,
//     resourceQuery,
//     enforce
//     oneOf,
//     not,
//     and,
//     or,
//   },
// }

// module: {
//   rules: [ // лоадеры читаются справа-налеву и сверху-вниз, можно использовать на уровне импортов
//     "style-loader", // adding styles into <head />
//     // doesn't cache CSS, use mini-css-plugin and get flash of unstyled content
//     "css-loader", // needs for resolve imports, doesn't touch absolute imports (url("/static/img/demo.png")), use copy-webpack-plugin or resolve-url-loader if you nedd to do this
//   ];
// }
