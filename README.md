Other plugins:
favicons-webpack-plugin
preload-webpack-plugin
webpack-cdn-plugin

?critical-css?

raw-loader
svg-inline-loader
svg-sprite-loader
svg-url-loader
react-svg-loader

image-webpack-loader
svgo-loader
imagemin-loader

image-trace-loader
lqip-loader
image-size-loader
babel-plugin-transform-react-jsx-img-import

awesome-typescript-loader

react-async-component
loadable-components
react suspense

img-loader
imagemin-webpack
imagemin-webpack-plugin

prepack-webpack-plugin
val-loader
babel-plugin-preval

html-loader
posthtml-loader
posthtml-minifier
clean-css-loader

inline-manifest-webpack-plugin
html-webpack-inline-chunk-plugin
assets-webpack-plugin
chunk-manifest-webpack-plugin
webpack-manifest-plugin

HappyPack
parallel-webpack
speed-measure-webpack-plugin

hard-source-webpack-plugin
cache-loader
thread-loader

directory-named-webpack-plugin
babel-resolve-short-path-plugin
webpack-resolve-short-path-plugin
html-webpack-cdn-plugin

// for remove locales from moment or else
ContentReplacementPlugin
webpack.IgnorePlugin

react-hot-loader
devServer: { hot: true } => new webpack.HotModuleReplacementPlugin() => enable hmr in plugins (MiniCssExtractPlugin etc.)

new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 })

chunk-types: entry(runtime/manifest), normal(dynamic imports), initial(main, vendor)

dotenv for manage env variables

