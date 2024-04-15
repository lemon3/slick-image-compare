import postcssPresetEnv from 'postcss-preset-env';
import postcssNested from 'postcss-nested';

export default {
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
