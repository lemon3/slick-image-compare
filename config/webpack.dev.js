/* global require, module */
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = require('./paths');

module.exports = merge(common, {
  entry: {
    beforeafter: ['@/index.js'],
  },

  output: {
    filename: '[name].min.js',
    library: {
      name: 'BeforeAfter',
      type: 'umd',
      umdNamedDefine: true,
      export: 'default',
    },
    globalObject: 'this',
    clean: true,
  },

  target: 'web',
  mode: 'development',

  devtool: 'inline-source-map', // 'eval-cheap-source-map',

  devServer: {
    historyApiFallback: true,
    open: true,
    compress: true,
    hot: true,
    port: 8686,
    watchFiles: [paths.src],
    static: [
      {
        directory: paths.static,
        publicPath: '/static',
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),

    new HtmlWebpackPlugin({
      title: 'BeforeAfter',
      template: paths.src + '/template.html', // template file
      // inject: 'body',
      minify: true,
    }),
  ],
});
