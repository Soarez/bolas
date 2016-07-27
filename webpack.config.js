var pkg = require('./package.json');
var webpack = require('webpack');
var path = require('path');

var entry = {
  // https://github.com/webpack/webpack/issues/300
  bolas: ['./src/index.js'],
  demo: './demo/index.js'
};
var filename = '[name].js';

var plugins = [];

if (process.env.NODE_ENV === 'production') {
  filename = filename.replace('.js', '-' + pkg.version + '.min.js');
  plugins.push(new webpack.optimize.UglifyJsPlugin());
  delete entry.demo;
}

module.exports = {
  entry: entry,
  output: {
    filename: filename,
    path: path.join(__dirname, 'build'),
    library: 'Bolas'
  },
  plugins: plugins,
  devtool: 'source-map'
};
