export const dataStorage = {
  // storage
  _s: new WeakMap(),
  put(el, ...keyVal) {
    if (!this._s.has(el)) {
      this._s.set(el, new Map());
    }
    let storeEl = this._s.get(el);
    if (keyVal.length > 1) {
      storeEl.set(keyVal[0], keyVal[1]);
      return this;
    }
    if ('object' === typeof keyVal[0]) {
      for (const k in keyVal[0]) {
        storeEl.set(k, keyVal[0][k]);
      }
    } else {
      // just a key
      storeEl.set(keyVal[0]);
    }
    return this;
  },
  get(el, key) {
    if (!this._s.has(el)) {
      return false;
      // return new Map();
    }
    if (key) {
      return this._s.get(el).get(key);
    }
    return this._s.get(el);
  },
  has(el, key) {
    return this._s.has(el) && this._s.get(el).has(key);
  },
  // todo if no key given: remove all
  remove(el, key) {
    if (!this._s.has(el)) {
      return false;
    }
    let ret = this._s.get(el).delete(key);
    if (this._s.get(el).size === 0) {
      this._s.delete(el);
    }
    return ret;
  },
};

/**
 * a short document Ready Implementation
 * @param  {Function} cb - The Callback function
 * @return {void}
 */
export const docReady = (cb) => {
  const evt = 'DOMContentLoaded';
  if (
    'complete' === document.readyState ||
    'interactive' === document.readyState
  ) {
    cb();
    document.removeEventListener(evt, cb);
  } else {
    document.addEventListener(evt, cb, false);
  }
};

export const stringToBoolean = (string) => {
  switch (string.toLowerCase().trim()) {
    case 'true':
    case 'yes':
    case '1':
      return true;

    case 'false':
    case 'no':
    case '0':
    case null:
    case undefined:
      return false;

    default:
      return JSON.parse(string);
  }
};

export const imageDimensions = (filename) =>
  new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      const { naturalWidth: width, naturalHeight: height } = img;
      const ratio = width / height;
      resolve({ width, height, ratio });
    };

    img.onerror = () => {
      reject('error');
    };

    img.src = filename;
  });

export const parseData = (string) => {
  if (!string.match(/[^\w]+/i)) return string;
  string = string.replace(/[\\ \t\n\r'"]/gm, '').replace(/(\w+)/gi, '"$1"');
  if ('{' !== string[0]) string = `{${string}}`;
  string = string.replaceAll(',}', '}');
  try {
    return JSON.parse(string);
    // eslint-disable-next-line no-unused-vars
  } catch (e) {
    return false;
  }
};

/**
 * Helper function to get all dataset values for a given name
 *
 * @param  {Object} el The dom element, e.g. a selected div-element
 * @param  {String} name The name to look for
 * @return {mixed} Object with all collected data for the given element und name or false, if name was not found
 */
export const getJSONData = (el, name) => {
  if (!el) return false;
  if (undefined === name || 'undefined' === typeof name) {
    return el.dataset;
  } else if (undefined === el.dataset[name]) {
    return el.dataset[name];
  }
  return parseData(el.dataset[name]);
};

export const getElements = (element, first = false) => {
  if (!element) {
    return !1;
  }

  element =
    'string' === typeof element ? document.querySelectorAll(element) : element;

  if (0 === element.length) {
    return !1;
  }

  const one = undefined === element.length;
  if (first) {
    return one ? element : element[0];
  }

  return one ? [element] : element;
};

export let passiveIfSupported = false;
try {
  window.addEventListener(
    'test',
    null,
    Object.defineProperty({}, 'passive', {
      get: function () {
        passiveIfSupported = { passive: false };
        return false;
      },
    })
  );
  // eslint-disable-next-line no-unused-vars
} catch (e) {
  passiveIfSupported = false;
}

export const restrictFast = (value, min, max) =>
  Math.max(min, Math.min(value, max));

export const restrict = (value, min, max) => {
  value = parseFloat(value, 10);
  min = parseFloat(min, 10);
  max = parseFloat(max, 10);

  if (max < min) {
    let tmp = max;
    max = min;
    min = tmp;
  }
  if (!isNaN(min) && value < min) {
    return min;
  }
  if (!isNaN(max) && value > max) {
    return max;
  }

  return value;
};

/**
 * checks if the given parameter is a function
 * @param  {any} fun - The parameter to test.
 * @return {boolean} true if it is a function and false if not.
 */
export const isFunction = (fun) => !!fun && 'function' === typeof fun;

/**
 * wrap a given HTML object with another
 * @param  {object} el - HTML object to wrap
 * @param  {object} wrapper - HTML object that should wrap the el
 * @return {any} The wrapper object containing the el or false if there was an error
 */
export const wrap = (el, wrapper) => {
  if (!el || (!wrapper && !el)) {
    return false;
  }

  if (el && !wrapper) {
    return el;
  }

  // make array
  if (undefined === el[0]) {
    el = [el];
  }

  const first = el[0];
  // add element to dom
  const parent = first.parentNode;
  if (parent) {
    parent.insertBefore(wrapper, first);
  }

  el.forEach((elem) => {
    wrapper.appendChild(elem);
  });
  return wrapper;
};

/**
 * add properties and style attributes to a given HTML object
 * @param  {object} el - The HTML object to add properties and styles too.
 * @param  {object} properties - An object with valid HTML properties
 * @param  {object} style - An object with valid CSS styles
 * @return {object} HTML object with the applied properties and styles
 */
export const addProps = (el, properties, style, innerHTML) => {
  if (properties) {
    for (let prop in properties) {
      if (Object.prototype.hasOwnProperty.call(properties, prop)) {
        el.setAttribute(prop, properties[prop]);
      }
    }
  }
  if (style) {
    for (let s in style) {
      if (Object.prototype.hasOwnProperty.call(style, s)) {
        el.style[s] = style[s];
      }
    }
  }
  if (innerHTML) {
    el.innerHTML = innerHTML;
  }
  return el;
};

/**
 * Helper for creating an HTML object
 * @param  {string} el - The tag-name for an HTML object, eg.: 'div'
 * @param  {objet} properties - An Object with valid HTML properties
 * @param  {objet} style - An Object with valid style definitions
 * @return {object} The created element with applied properties and styles
 */
export const createEl = (el, properties, style, innerHTML) =>
  addProps(document.createElement(el), properties, style, innerHTML);
