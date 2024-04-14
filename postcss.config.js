const postcssPresetEnv = require('postcss-preset-env');
const postcssNested = require('postcss-nested');
// const postcssColorFunction = require('@csstools/postcss-color-function');

/* global module, require */
module.exports = {
  plugins: [
    postcssPresetEnv({
      stage: 1,
      // preserve: true,
      features: {
        // 'nesting-rules': true,
        // 'color-function': {},
        // 'custom-media-queries': {},
        // 'custom-selectors': {},
      },
    }),
    postcssNested({}),
    // includes in precentEnv see color-function
    // postcssColorFunction({
    //   preserve: true,
    // }),
  ],
};
