/* global require, module */
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const styleAndDefault = merge(common, {
  entry: {
    beforeafter: ['@/styles/main.css', '@/js/beforeafter.js'],
    // 'beforeafter.jquery': ['@/js/beforeafter-jquery.js'],
  },

  mode: 'production',
  devtool: false,

  output: {
    filename: '[name].min.js',
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].min.css',
    }),
  ],

  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), '...'],
    // runtimeChunk: {
    //   name: 'runtime',
    // },
  },

  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
});

const prod = merge(common, {
  entry: {
    beforeafter: ['@/js/beforeafter.js'],
  },
  mode: 'production',
  optimization: {
    minimize: true,
    // mangleExports: 'size',
  },

  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
});

const builds = {
  umd: merge(prod, {
    output: {
      filename: '[name].min.js',
      library: {
        name: 'BeforeAfter',
        type: 'umd',
        umdNamedDefine: true,
        export: 'default',
      },
      globalObject: 'this',
      // clean: true,
    },
  }),
  esm: merge(prod, {
    output: {
      filename: '[name].esm.min.js',
      library: {
        type: 'module',
      },
      globalObject: 'this',
    },
    experiments: {
      outputModule: true,
    },
  }),
};

module.exports = [
  styleAndDefault,

  // umd (minified)
  builds.umd,

  // umd
  merge(builds.umd, {
    output: { filename: '[name].js' },
    optimization: { minimize: false },
  }),

  // esm (minified)
  builds.esm,

  // esm
  merge(builds.esm, {
    output: { filename: '[name].esm.js' },
    optimization: { minimize: false },
  }),
];
