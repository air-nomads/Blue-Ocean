var path = require('path');
var DIST_DIR = path.join(__dirname, '/client/public');
var SRC_DIR = path.join(__dirname, '/client/src');

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
  module: {
    rules: [
      {
        test: [/\.jsx$/],
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
};
