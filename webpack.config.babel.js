import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
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
};
