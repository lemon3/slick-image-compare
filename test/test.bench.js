import { bench, describe } from 'vitest';
import BeforeAfter from '../src/index';
import { restrict } from '@/js/utils';

import img01 from '../public/01_after.png';
import img02 from '../public/01_after.png';

// testing other function
BeforeAfter.prototype._calcPercent2 = function (pos) {
  let val = this._horizontal ? pos.x : pos.y;
  val = restrict(val, this._minPos, this._maxPos);
  return ((val + this._offset) * 100) / this._dim;
};

BeforeAfter.prototype._renderLoop1 = function (from, to, delta) {
  const render = () => {
    const now = new Date().getTime();
    const dt = now - (this._timingThen || now);
    this._timingCurTime += dt;
    this.progress = this._timingCurTime / this._animationDuration;

    if (this.progress >= 1) {
      this.progress = 1;
      this._setPosition(to);
      this._stopAni();
      this._testInteractionEnd();
      return;
    }

    // render
    this._setPosition(from + delta * this.easing(this.progress));

    this._timingThen = now;
    this._renderId = window.requestAnimationFrame(render);
  };
  render();
};

BeforeAfter.prototype._renderLoop2 = function (from, to, delta) {
  const render = () => {
    const now = Date.now();

    if (0 !== this._timingThen) {
      this._timingCurTime += now - this._timingThen;
      this.progress = this._timingCurTime / this._animationDuration;

      if (this.progress >= 1) {
        this.progress = 1;
        this._setPosition(to);
        this._stopAni();
        this._testInteractionEnd();
        return;
      }

      // render
      this._setPosition(from + delta * this.easing(this.progress));
    } else {
      this.progress = 0;
      this._setPosition(from);
    }

    this._timingThen = now;
    this._renderId = window.requestAnimationFrame(render);
  };
  render();
};

const div = document.createElement('div');
const ba = new BeforeAfter(div, {
  beforeImage: img01,
  afterImage: img02,
});

describe('calc', () => {
  bench('calcPercent 1', () => {
    ba._calcPercent(10);
  });

  bench('calcPercent 2', () => {
    ba._calcPercent2(10);
  });
});

describe('get date', () => {
  bench('new Date().getTime()', () => {
    new Date().getTime();
  });

  bench('Date.now()', () => {
    Date.now();
  });
});

const setValues = () => {
  ba._timing.then = 0;
  ba._timingCurTime = 0;
  ba.progress = 0;
  ba._animationDuration = 250;
  ba.easing = ba.settings.animateEasing;
};

describe.only('render loop', () => {
  bench('version 1', () => {
    setValues();
    ba._renderLoop1(10, 70, 60);
  });

  bench('version 2', () => {
    setValues();
    ba._renderLoop2(10, 70, 60);
  });
});
