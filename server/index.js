import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { default as config } from '../webpack.config.babel';
import path from 'path';

const app = express();
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  noInfo:     true,
  publicPath: config.output.publicPath,
  stats:      { colors: true },
}));

app.use(webpackHotMiddleware(compiler));

const server = app.listen(3000, '0.0.0.0', err => {
  if (err) {
    console.log(err);
    return;
  }
  const { port } = server.address();
  console.log(`Listening at http://localhost:${port}`);
});
