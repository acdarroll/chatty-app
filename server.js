var path = require('path');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

const server = new WebpackDevServer(config.devServer, webpack(config))

server.startCallback(err => {
  if (err) {
    console.log(err);
  }

  console.log('Running at http://localhost:9000');
})
