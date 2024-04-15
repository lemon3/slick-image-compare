import { describe, test, expect } from 'vitest';
import BeforeAfter from '../src/index.js';

describe('testing class BeforeAfter', () => {
  test('BeforeAfter is Object', () => {
    expect(BeforeAfter).toBeTruthy();
    expect(typeof BeforeAfter).toBe('function');
  });

  test('new BeforeAfter() is Object', () => {
    const b = new BeforeAfter();
    expect(b).toBeTruthy();
    expect(typeof b).toBe('object');
  });

  test('BeforeAfter defaults -> is Object', () => {
    expect(BeforeAfter.defaults).toBeTruthy();
    expect(typeof BeforeAfter.defaults).toBe('object');
  });
});

describe('test static methods', () => {
  describe('- BeforeAfter.init', () => {
    test('should be a function', () => {
      expect(typeof BeforeAfter.init).toBe('function');
    });

    test('should return true', () => {
      const init = BeforeAfter.init();
      expect(init).toBeTruthy();
      expect(init).toBe(true);
    });
  });

  describe('- BeforeAfter.destroyAll', () => {
    test('should be a function', () => {
      expect(typeof BeforeAfter.destroyAll).toBe('function');
    });
    test('should return false', () => {
      const destroy = BeforeAfter.destroyAll();
      expect(destroy).toBe(false);
    });
  });
});

describe('test initialization', () => {
  test('no element given, should return error', () => {
    const ba = new BeforeAfter(null, null);
    expect(typeof ba).toBe('object');
    expect(ba instanceof BeforeAfter).toBe(false);
    expect(ba.error).toBe(true);
  });

  test('element given, but no images set, should return error', () => {
    const div = document.createElement('div');
    const ba = new BeforeAfter(div, null);
    expect(typeof ba).toBe('object');
    expect(ba instanceof BeforeAfter).toBe(false);
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

    const ba = new BeforeAfter(div);
    expect(typeof ba).toBe('object');
    expect(ba instanceof BeforeAfter).toBe(true);

    const ba2 = new BeforeAfter(div);
    expect(ba2 instanceof BeforeAfter).toBe(true);
  });
});

describe('test app', () => {
  test('test initialization', () => {
    document.body.innerHTML = `
    <div class="beaf" id="test" data-beforeafter="{}">
      <img src="../static/assets/03_after.jpg" alt="" />
      <img src="../static/assets/03_before.jpg" alt="" />
    </div>
    `;
    const el = document.querySelectorAll('#test')[0];
    const ba = new BeforeAfter(el);
    expect(el.dataset).toBeTruthy();
    expect(el.dataset.bainitialized).toBeTruthy();
  });
});
