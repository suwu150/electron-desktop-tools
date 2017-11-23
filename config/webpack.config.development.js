/* eslint-disable max-len */
/**
 * Build config for development process that uses Hot-Module-Replacement
 * https://webpack.github.io/docs/hot-module-replacement-with-webpack.html
 */
import path from 'path';
import webpack from 'webpack';
// import validate from 'webpack-validator';
import merge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
// import formatter from 'eslint-formatter-pretty';
import baseConfig from './webpack.config.base';
import paths from './paths';

const port = process.env.PORT || 3009;

export default merge(baseConfig, {
  // debug: true,

  devtool: 'inline-source-map',

  entry: [
    `webpack-hot-middleware/client?path=http://localhost:${port}/__webpack_hmr`,
    'babel-polyfill',
    // './src/index',
    paths.appIndexJs,
  ],

  output: {
    publicPath: `http://localhost:${port}/dist/`
  },

  module: {
    // First, run the linter.
    // It's important to do this before Babel processes the JS.
    loaders: [
      {
          test: /\.(js|jsx)$/,
          loader: 'eslint-loader',
          // include: 'src',
          include: paths.appSrc,
      },
      {
        test: /\.less$/,
        exclude: path.resolve(__dirname, '../src/styles/views'),
        loader: 'style-loader!css-loader?sourceMap&importLoaders=2!less-loader'
      },
      {
        test: /\.less$/,
        include: path.resolve(__dirname, '../src/styles/views'),
        loader: 'style-loader!css-loader?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]&importLoaders=2!less'
      },

      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml' },
    ]
  },

  plugins: [
    // https://webpack.github.io/docs/hot-module-replacement-with-webpack.html
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
  }),
    // “If you are using the CLI, the webpack process will not exit with an error code by enabling this plugin.”
    // https://github.com/webpack/docs/wiki/list-of-plugins#noerrorsplugin
    new webpack.NoEmitOnErrorsPlugin(),

    // NODE_ENV should be production so that modules do not perform certain development checks
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.LoaderOptionsPlugin({
        debug: true
    })
  ],

  // https://github.com/chentsulin/webpack-target-electron-renderer#how-this-module-works
  target: 'electron-renderer',
  resolve: {
    extensions: ['.js', '.jsx']
  },
});
