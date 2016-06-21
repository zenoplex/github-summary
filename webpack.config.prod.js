const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry:   [
    './src/index',
  ],
  output:  {
    path:     path.join(__dirname, 'dist'),
    filename: 'github_summary.js',
    libraryTarget: 'umd',
    library: 'GithubSummary',
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings:     false,
        sequences:    true,
        dead_code:    true,
        conditionals: true,
        booleans:     true,
        unused:       true,
        if_return:    true,
        join_vars:    true,
        drop_console: true,
      },
      output:     {
        comments: false,
      },
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
    root: [path.resolve(__dirname, './src')],
  },
};
