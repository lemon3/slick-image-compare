import { describe, test, expect } from 'vitest';
import SlickImageCompare from '../src/index.js';

describe('testing class SlickImageCompare', () => {
  test('SlickImageCompare is Object', () => {
    expect(SlickImageCompare).toBeTruthy();
    expect(typeof SlickImageCompare).toBe('function');
  });

  test('new SlickImageCompare() is Object', () => {
    const b = new SlickImageCompare();
    expect(b).toBeTruthy();
    expect(typeof b).toBe('object');
  });

  test('SlickImageCompare defaults -> is Object', () => {
    expect(SlickImageCompare.defaults).toBeTruthy();
    expect(typeof SlickImageCompare.defaults).toBe('object');
  });
});

describe('test static methods', () => {
  describe('- SlickImageCompare.init', () => {
    test('should be a function', () => {
      expect(typeof SlickImageCompare.init).toBe('function');
    });

    // initialize it
    SlickImageCompare.init();

    test('should return false', () => {
      const init = SlickImageCompare.init();
      console.log(init);
      expect(init).toBe(false);
    });
  });

  describe('- SlickImageCompare.destroyAll', () => {
    test('should be a function', () => {
      expect(typeof SlickImageCompare.destroyAll).toBe('function');
    });
    test('should return false', () => {
      const destroy = SlickImageCompare.destroyAll();
      expect(destroy).toBe(false);
    });
  });
});

describe('test initialization', () => {
  test('no element given, should return error', () => {
    const sic = new SlickImageCompare(null, null);
    expect(typeof sic).toBe('object');
    expect(sic instanceof SlickImageCompare).toBe(false);
    expect(sic.error).toBe(true);
  });

  test('element given, but no images set, should return error', () => {
    const div = document.createElement('div');
    const sic = new SlickImageCompare(div, null);
    expect(typeof sic).toBe('object');
    expect(sic instanceof SlickImageCompare).toBe(false);
    expect(sic.error).toBe(true);
  });

  test('element is already initialized should return true', () => {
    const div = document.createElement('div');
    ['03_after.jpg', '03_before.jpg'].forEach((img) => {
      const el = document.createElement('img');
      el.src = `../static/assets/${img}`;
      el.alt = '';
      div.append(el);
    });

    const sic = new SlickImageCompare(div);
    expect(typeof sic).toBe('object');
    expect(sic instanceof SlickImageCompare).toBe(false);

    const sic2 = new SlickImageCompare(div);
    expect(sic2 instanceof SlickImageCompare).toBe(false);
  });
});

describe('test app', () => {
  test('test initialization', () => {
    document.body.innerHTML = `
    <div class="sic-main" id="test" data-sic="{}">
      <img src="../static/assets/03_after.jpg" alt="" />
      <img src="../static/assets/03_before.jpg" alt="" />
    </div>
    `;
    const el = document.querySelectorAll('#test')[0];
    const sic = new SlickImageCompare(el);
    expect(el.dataset).toBeTruthy();
    expect(el.dataset.sicinitialized).toBeTruthy();
  });
});
