/* global __dirname, require, module */
const path = require('path');

module.exports = {
  src: path.resolve(__dirname, '../src'),

  build: path.resolve(__dirname, '../dist'),
  example: path.resolve(__dirname, '../example'),
  public: path.resolve(__dirname, '../public'),
  static: path.resolve(__dirname, '../static'),
}
