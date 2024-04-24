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

    test('should return true', () => {
      const init = SlickImageCompare.init();
      expect(init).toBeTruthy();
      expect(init).toBe(true);
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
    const ba = new SlickImageCompare(null, null);
    expect(typeof ba).toBe('object');
    expect(ba instanceof SlickImageCompare).toBe(false);
    expect(ba.error).toBe(true);
  });

  test('element given, but no images set, should return error', () => {
    const div = document.createElement('div');
    const ba = new SlickImageCompare(div, null);
    expect(typeof ba).toBe('object');
    expect(ba instanceof SlickImageCompare).toBe(false);
    expect(ba.error).toBe(true);
  });

  test('element is already initialized should return true', () => {
    const div = document.createElement('div');
    ['03_after.jpg', '03_before.jpg'].forEach((img) => {
      const el = document.createElement('img');
      el.src = `../static/assets/${img}`;
      el.alt = '';
      div.append(el);
    });

    const ba = new SlickImageCompare(div);
    expect(typeof ba).toBe('object');
    expect(ba instanceof SlickImageCompare).toBe(true);

    const ba2 = new SlickImageCompare(div);
    expect(ba2 instanceof SlickImageCompare).toBe(true);
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
    const ba = new SlickImageCompare(el);
    expect(el.dataset).toBeTruthy();
    expect(el.dataset.bainitialized).toBeTruthy();
  });
});
