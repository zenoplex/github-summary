const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-inline-eval-source-map',
  entry:   [
    'webpack-hot-middleware/client',
    './src/index',
  ],
  output:  {
    path:       '/',
    filename:   'bundle.js',
    publicPath: '',
    libraryTarget: 'umd',
    library: 'GithubSummary',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'template.html',
      inject:   'head',
    }),
  ],
  module:  {
    loaders: [
      {
        test:    /\.js$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src'),
      },
    ],
  },
  resolve: {
    extensions: ['', '.js'],
  },
};
