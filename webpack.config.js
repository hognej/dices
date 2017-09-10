var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'src/client/public');
var APP_DIR = path.resolve(__dirname, 'src/client');

var config = {
  entry: APP_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {
    loaders : [{
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['transform-decorators-legacy'],
        }
      }, {
        test : /\.s?css$/,
        loaders : ["style", "css", "sass"],
        include : APP_DIR,
      }, {
        test : /\.png$/,
        loader : "url",
        include : APP_DIR,
      }]
  }
};

module.exports = config;