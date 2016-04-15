# Websocket-Rails-Node

[![wercker status](https://app.wercker.com/status/600638ff8906a97fbd7eb3e8d29cdbc4/s "wercker status")](https://app.wercker.com/project/bykey/600638ff8906a97fbd7eb3e8d29cdbc4)

Unofficial JavaSript implemention of the [Websocket-Rails](https://github.com/websocket-rails/websocket-rails) JavaScript client.

## WARNING: use at your own risk!

Code is based from official 0.7.0 release.
All scripts are ported into ES6.
Tests are not optimized and is (almost) kept as it is in the official release.

## Getting Started

```bash
npm i webpack-rails-node -S
```

## Usage

Usage should be same as the official release of 0.7.0.
see [offiial doc](https://github.com/websocket-rails/websocket-rails/wiki/Using-the-JavaScript-Client) for detail.

```js
var WebSocketRails = require('websocket-rails-node');
var dispatcher = new WebSocketRails('localhost:3000/websocket');

dispatcher.bind('client_connected', data => {
  console.log('client connected', data);
});
```
