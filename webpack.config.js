var path = require('path');

module.exports = {
  entry: './lib/runaway.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '')
  }
};
