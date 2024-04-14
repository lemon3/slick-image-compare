/**
 * @jest-environment jsdom
 */

/* global afterEach, jest, describe, test, expect */
import {
  addProps,
  getJSONData,
  createEl,
  docReady,
  restrict,
  wrap,
} from '@/js/utils.js';

// setup
document.body.innerHTML += `
  <div id="helper-data1"></div>
  <div id="helper-data2" data-super="123"></div>
  <div id="helper-data3"
    data-heels="true"
    data-heels-height="12"
    data-heels-color="red"
  ></div>
  <div id="helper-data4"
    data-heels="{'height':'12'}"
    data-heels-size="39"
    data-heels-color="green"
  ></div>
  <div id="helper-data5"
    data-heels="{'color':'red'}"
  ></div>
  <div id="helper-data6"
    data-heels="'color':'red',height:10,size:39"
  ></div>
  <div id="helper-data7" class="beaf"
    data-beaf="{
      followMouse: true,
      'showToggleButton': true
    }">
    <img src="../static/assets/01_after.jpg" alt="" />
    <img src="../static/assets/01_before.jpg" alt="" />
  </div>
`;

afterEach(() => {
  jest.clearAllMocks();
  // only for spyOn mocked Equivalent to .mockRestore()
  jest.restoreAllMocks();
});

describe('test addProps function', () => {
  // props should be added to DOM element
  test('with properties, style, innerHTML', () => {
    let a = document.createElement('div');
    addProps(a, { height: 1, width: 1 }, { display: 'none' }, 'super');
    expect(a.innerHTML).toBe('super');
    expect(a.style.display).toBe('none');
    expect(a.getAttribute('height')).toBe('1');
  });
  test('with style', () => {
    let a = document.createElement('div');
    addProps(a, null, { display: 'flex', zIndex: 10 });
    expect(a.style.display).toBe('flex');
    expect(a.style.zIndex).toBe('10');
  });
  test('with properties', () => {
    let a = document.createElement('div');
    addProps(a, { display: 'flex', test: null });
    expect(a.style.display).not.toBe('flex');
    expect(a.getAttribute('test')).toBe('null');
  });
});

describe('test createEl function', () => {
  test('element should be created correctly', () => {
    let a = createEl('div');
    expect(a).toBeTruthy();
    expect(typeof a).toBe('object');
    expect(a.nodeType).toBe(1);
    expect(a.nodeName.toLowerCase()).toBe('div');
  });
});

describe('test wrap function', () => {
  let el = document.createElement('span');
  let wrappingEl = document.createElement('div');

  describe('no element given, should return false', () => {
    const result = wrap(null, wrappingEl);
    expect(result).toBe(false);
  });

  describe('element given but no wrapper, should return element', () => {
    el.id = '12345';
    const result = wrap(el, null);
    expect(result.id).toBe(el.id);
  });

  describe('element & wrappingEl given, should return html obj.', () => {
    const el1 = document.createElement('span');
    const result = wrap(el1, wrappingEl);
    expect(result.outerHTML).toBe('<div><span></span></div>');
  });

  describe('element & wrappingEl given, should return html obj.', () => {
    const el1 = document.createElement('span');
    el1.id='id1';
    const el2 = document.createElement('span');
    el2.id='id2';
    wrappingEl = document.createElement('div');
    const result = wrap([el1, el2], wrappingEl);
    expect(result.outerHTML).toBe('<div><span id="id1"></span><span id="id2"></span></div>');
  });

});

describe('test getJSONData function', () => {
  let nothing = document.getElementById('nothing');
  test('element not found or null', () => {
    expect(getJSONData(nothing)).toBe(false);
    expect(getJSONData()).toBe(false);
    expect(getJSONData(false)).toBe(false);
    expect(getJSONData('')).toBe(false);
    expect(getJSONData(null)).toBe(false);
    expect(getJSONData(undefined)).toBe(false);
  });

  let helperData1 = document.getElementById('helper-data1');
  test('element has no data attribute', () => {
    expect(getJSONData(helperData1)).toMatchObject({});
  });

  let helperData2 = document.getElementById('helper-data2');
  test('element with data attribute', () => {
    let data = getJSONData(helperData2);
    expect(data).toMatchObject({ super: '123' });
  });

  let helperData3 = document.getElementById('helper-data3');
  test('element with multiple data attributes', () => {
    let data = getJSONData(helperData3, 'heels');
    expect(data).toEqual({
      heels: 'true',
      color: 'red',
      height: '12',
    });
  });

  let helperData4 = document.getElementById('helper-data4');
  test('element with multiple data, and JSON-string', () => {
    let data = getJSONData(helperData4, 'heels');
    expect(data).toMatchObject({
      height: '12',
      size: '39',
      color: 'green',
    });
  });

  let helperData5 = document.getElementById('helper-data5');
  test('element JSON-string', () => {
    let data = getJSONData(helperData5, 'heels');
    expect(data).toEqual({
      color: 'red',
    });
  });

  test('element settings-string', () => {
    let helperData6 = document.getElementById('helper-data6');
    let data = getJSONData(helperData6, 'heels');
    expect(data).toEqual({
      color: 'red',
      height: '10',
      size: '39',
    });
  });

  test('element settings-string', () => {
    let helperData7 = document.getElementById('helper-data7');
    let data = getJSONData(helperData7, 'beaf');
    expect(data.followMouse).toBe(true);
    expect(data.showToggleButton).toBe(true);
  });

  test('JSON-string data', () => {
    const div = document.createElement('div');
    // eslint-disable-next-line quotes
    div.dataset.test = "{'foo':'bar'}";
    let result = getJSONData(div, 'test');
    let exp = { foo: 'bar' };
    expect(result).toEqual(exp);
  });

  test('with undefined string value', () => {
    const div = document.createElement('div');
    div.dataset.test = 'undefined';
    let result = getJSONData(div, 'test');
    expect(result).toEqual({ test: 'undefined' });
  });

  test('with default values', () => {
    const div = document.createElement('div');
    div.dataset.test = 'name123';
    div.dataset.testNew = 'new123';
    div.dataset.testOld = 'old123';
    const defaults = {
      old: 'old123',
    };
    let result = getJSONData(div, 'test', defaults);
    expect(result).toEqual({ test: 'name123', old: 'old123' });
  });
});

describe('test restrict function', () => {
  test('restrict value in between', () => {
    expect(restrict(10, 0, 20)).toBe(10);
    expect(restrict('10', '0', '20')).toBe(10);
    expect(restrict(-8, -10, -2)).toBe(-8);
    expect(restrict(0, -1, 2)).toBe(0);
    expect(restrict(-9, -3, -10)).toBe(-9);
    expect(restrict(-5, -10, 0)).toBe(-5);
    expect(restrict(0.01, 0, 1)).toBe(0.01);
    expect(restrict(-0.01, -0, -1)).toBe(-0.01);
  });
  test('restrict value less or equal than min', () => {
    expect(restrict(10, 10, 20)).toBe(10);
    expect(restrict(10, 10)).toBe(10);
    expect(restrict(-9, 10)).toBe(10);
    expect(restrict(-9, 10, 20)).toBe(10);
  });
  test('restrict value greater or equal than max', () => {
    expect(restrict(10, 0, 10)).toBe(10);
    expect(restrict(10, '', 10)).toBe(10);
    expect(restrict(10, null, 10)).toBe(10);
    expect(restrict(13, null, 10)).toBe(10);
    expect(restrict(-5, null, -6)).toBe(-6);
    expect(restrict(-5, -10, -6)).toBe(-6);
  });
});

describe('test docReady function', () => {
  test('function should be fired', () => {
    const hmm = jest.fn();
    docReady(hmm);
    expect(hmm).toHaveBeenCalled();
  });

  test('callback should change global var value', async () => {
    let val = false;
    const test = () => {
      val = true;
    };
    try {
      await docReady(test);
      expect(val).toBe(true);
    } catch (e) {
      expect(e).toMatch('error');
    }
  });

  test('docReady callback called via addEventListener', () => {
    const cb = jest.fn();
    // fake states
    Object.defineProperty(document, 'readyState', {
      get() {
        return 'loading';
      },
    });

    document.addEventListener = jest
      .fn()
      .mockImplementationOnce((event, callback) => {
        callback();
      });
    const mockedDocReady = jest.mocked(docReady);
    mockedDocReady(cb);

    expect(document.addEventListener).toBeCalledWith(
      'DOMContentLoaded',
      cb, // expect.any(Function)
      expect.any(Boolean)
    );
    expect(cb).toHaveBeenCalledTimes(1);
  });
});
