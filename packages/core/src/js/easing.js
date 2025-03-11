/**
 * An Object with defined easing functions
 * https://easings.net/#easeOutSine
 *
 * @type {Object}
 */
export const easing = {
  Linear: (p) => p,
  // Pow: {},
  Quad: {
    easeIn: (p) => Math.pow(p, 2),
    easeOut: (p) => 1 - Math.pow(1 - p, 2),
  },
  Cubic: {
    easeIn: (p) => Math.pow(p, 3),
    easeOut: (p) => 1 - Math.pow(1 - p, 3),
  },
  Sine: {
    easeIn: (p) => 1 - Math.cos((p * Math.PI) / 2),
    easeOut: (p) => Math.sin((p * Math.PI) / 2),
  },
  Elastic: {
    easeOut: (p) => {
      const c4 = (2 * Math.PI) / 3;
      if (0 === p || 1 === p) {
        return p;
      }
      return Math.pow(2, -10 * p) * Math.sin((p * 10 - 0.75) * c4) + 1;
    },
  },
};
