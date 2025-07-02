var path = require('path');
var webpack = require('webpack');

module.exports = {
  mode: "development",
  entry: './src/index.jsx',
  devServer: {
    hot: true,
    static: {
      directory: path.join(__dirname, "dist"),
      publicPath: '/',
      watch: {
        aggregateTimeout: 300,
        poll: 1000,
        ignored: /node_modules/
      }
    },
    port: 9000,
    open: true,
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: path.resolve(__dirname, 'src')
      },
      {
        test: /\.s?css$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  }
};
