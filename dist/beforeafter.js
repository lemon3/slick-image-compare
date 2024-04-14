(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("BeforeAfter", [], factory);
	else if(typeof exports === 'object')
		exports["BeforeAfter"] = factory();
	else
		root["BeforeAfter"] = factory();
})(this, function() {
return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ beforeafter; }
});

;// CONCATENATED MODULE: ./src/js/utils.js
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
/**
 * a short document Ready Implementation
 * @param  {Function} cb - The Callback function
 * @return {void}
 */
var docReady = function docReady(cb) {
  var evt = 'DOMContentLoaded';
  if ('complete' === document.readyState || 'interactive' === document.readyState) {
    cb();
    document.removeEventListener(evt, cb);
  } else {
    document.addEventListener(evt, cb, false);
  }
};
var stringToBoolean = function stringToBoolean(string) {
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
var imageDimensions = function imageDimensions(filename) {
  return new Promise(function (resolve, reject) {
    var img = new Image();
    img.onload = function () {
      var width = img.naturalWidth,
        height = img.naturalHeight;
      resolve({
        width: width,
        height: height
      });
    };
    img.onerror = function () {
      reject('error');
    };
    img.src = filename;
  });
};

/**
 * Helper funtion to get all dataset values for a given name
 *
 * @param  {Object} el The dom element, e.g. a selected div-element
 * @param  {String} name The name to look for
 * @param  {Object} defaults An Object with default (allowed) values
 * @return {mixed} Object with all collected data for the given element und name or false, if name was not found
 */
var getJSONData = function getJSONData(el, name) {
  var defaults = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  if (!el) {
    return false;
  }

  // get all
  if (undefined === name || undefined === el.dataset[name]) {
    return el.dataset;
  }
  var data;
  try {
    // eslint-disable-next-line quotes
    data = JSON.parse(el.dataset[name].replace(/'/g, '"'));
    // eslint-disable-next-line no-empty
  } catch (e) {}
  if ('object' !== _typeof(data)) {
    data = el.dataset[name];
    var newData = {};
    data = data.replace(/[\\ \t\n\r]/g, '');
    data = data.replace(/{?([^{])}?/g, '$1');
    var split = data.split(',');
    if (split.length > 1) {
      split.forEach(function (item) {
        if (item) {
          var _item$split = item.split(':'),
            _item$split2 = _slicedToArray(_item$split, 2),
            key = _item$split2[0],
            value = _item$split2[1];
          value = value.replace(/'/g, '');
          if ('true' === value) {
            value = true;
          } else if ('false' === value) {
            value = false;
          }
          newData[key.replace(/'/g, '')] = value;
        }
      });
    } else {
      newData[name] = data;
    }
    data = newData;
  }
  var obj = {};
  var len = name.length;
  Object.entries(el.dataset).forEach(function (item) {
    if (item[0].toLowerCase().indexOf(name) >= 0 && item[0].length > len) {
      var key = item[0][len].toLowerCase() + item[0].substring(len + 1);
      if (null === defaults || defaults && undefined !== defaults[key]) {
        obj[key] = item[1];
      }
    }
  });
  return Object.assign(data, obj);
};
var getElements = function getElements(element) {
  var first = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  if (!element) {
    return !1;
  }
  element = 'string' === typeof element ? document.querySelectorAll(element) : element;
  if (0 === element.length) {
    return !1;
  }
  var one = undefined === element.length;
  if (first) {
    return one ? element : element[0];
  }
  return one ? [element] : element;
};
var passiveIfSupported = false;
try {
  window.addEventListener('test', null, Object.defineProperty({}, 'passive', {
    get: function get() {
      passiveIfSupported = {
        passive: false
      };
      return false;
    }
  }));
} catch (err) {
  passiveIfSupported = false;
}
var restrict = function restrict(value, min, max) {
  value = parseFloat(value, 10);
  min = parseFloat(min, 10);
  max = parseFloat(max, 10);
  if (max < min) {
    var tmp = max;
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
var isFunction = function isFunction(fun) {
  return !!fun && 'function' === typeof fun;
};

/**
 * wrap a given HTML object with another
 * @param  {object} el - HTML object to wrap
 * @param  {object} wrapper - HTML object that should wrap the el
 * @return {any} The wrapper object containing the el or false if there was an error
 */
var wrap = function wrap(el, wrapper) {
  if (!el || !wrapper && !el) {
    return false;
  }
  if (el && !wrapper) {
    return el;
  }

  // make array
  if (undefined === el[0]) {
    el = [el];
  }
  var first = el[0];
  // add element to dom
  var parent = first.parentNode;
  if (parent) {
    parent.insertBefore(wrapper, first);
  }
  el.forEach(function (elem) {
    wrapper.appendChild(elem);
  });
  return wrapper;
};

/**
 * add properties and style attributes to a given HTML object
 * @param  {object} el - The HTML object to add properties and styles too.
 * @param  {object} properties - An object with vaild HTML properties
 * @param  {object} style - An object with valid CSS styles
 * @return {object} HTML object with the applied properties and styles
 */
var addProps = function addProps(el, properties, style, innerHTML) {
  if (properties) {
    for (var prop in properties) {
      if (Object.prototype.hasOwnProperty.call(properties, prop)) {
        el.setAttribute(prop, properties[prop]);
      }
    }
  }
  if (style) {
    for (var s in style) {
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
var createEl = function createEl(el, properties, style, innerHTML) {
  return addProps(document.createElement(el), properties, style, innerHTML);
};
;// CONCATENATED MODULE: ./src/js/easing.js
/**
 * An Object with defined easing funtions
 * https://easings.net/#easeOutSine
 *
 * @type {Object}
 */
var easing = {
  // Linear: {},
  // Pow: {},
  Quad: {
    easeIn: function easeIn(p) {
      return Math.pow(p, 2);
    },
    easeOut: function easeOut(p) {
      return 1 - Math.pow(1 - p, 2);
    }
  },
  Cubic: {
    easeIn: function easeIn(p) {
      return Math.pow(p, 3);
    },
    easeOut: function easeOut(p) {
      return 1 - Math.pow(1 - p, 3);
    }
  },
  Sine: {
    easeIn: function easeIn(p) {
      return 1 - Math.cos(p * Math.PI / 2);
    },
    easeOut: function easeOut(p) {
      return Math.sin(p * Math.PI / 2);
    }
  },
  Elastic: {
    easeOut: function easeOut(p) {
      var c4 = 2 * Math.PI / 3;
      if (0 === p || 1 === p) {
        return p;
      }
      return Math.pow(2, -10 * p) * Math.sin((p * 10 - 0.75) * c4) + 1;
    }
  }
};
/* harmony default export */ var js_easing = (easing);
;// CONCATENATED MODULE: ./src/js/defaults.js

var defaults = {
  autoInit: true,
  // silder: true, // show slider true, false

  beforeImage: null,
  afterImage: null,
  followMouse: false,
  // mouse move interaction instead of drag (on desktop)

  // todo: if onlyHandleDraggable and clickable = true => same as if both are false
  onlyHandleDraggable: false,
  clickable: false,
  // only works if onlyHandleDraggable is set to true

  // todo: desktop and mobile snap values(!!!)
  snapToStart: false,
  // after moveout or dragfinish handle jumps to start position
  snapToStartDelay: 250,
  // snapToStartDelayTap: 10, // todo

  afterOnTheRight: false,
  handleMinDistance: 0,
  // min distance to left and right border in px
  dragElementClass: 'beforeafter-handle',
  dragCallback: null,
  // todo

  // animateIn: true,
  animateInDuration: 1250,
  // ms
  animateInEasing: js_easing.Elastic.easeOut,
  animateInDelay: 100,
  // in ms
  animateStartPos: 40,
  // % from left
  startPos: 50,
  // % from left

  // clickAnimate: true,
  animateDuration: 250,
  // ms
  animateEasing: js_easing.Cubic.easeOut,
  // showInfo: false,
  beforeLabel: '',
  // before Image
  afterLabel: '',
  // after Image

  beforeDescription: '',
  // before Image
  afterDescription: '',
  // after Image

  showToggleButton: false,
  toggleBeforeText: 'show before',
  toggleAfterText: 'show after'
};
;// CONCATENATED MODULE: ./src/js/beforeafter.js
function beforeafter_typeof(o) { "@babel/helpers - typeof"; return beforeafter_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, beforeafter_typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == beforeafter_typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(beforeafter_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function beforeafter_slicedToArray(arr, i) { return beforeafter_arrayWithHoles(arr) || beforeafter_iterableToArrayLimit(arr, i) || beforeafter_unsupportedIterableToArray(arr, i) || beforeafter_nonIterableRest(); }
function beforeafter_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function beforeafter_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return beforeafter_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return beforeafter_arrayLikeToArray(o, minLen); }
function beforeafter_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function beforeafter_iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function beforeafter_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == beforeafter_typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != beforeafter_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != beforeafter_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/* eslint-disable no-console */



// const passive = passiveSupported ? { passive: true } : false;

var instances = [];
var allowedEvents = ['init', 'drag', 'update'];
var trigger = function trigger(elem, name, data) {
  var funData = elem.getAttribute("on + ".concat(name));
  var func = new Function('e', "{".concat(funData, "}"));
  func.call(elem, data);
};
var BeforeAfter = /*#__PURE__*/function () {
  function BeforeAfter(element, options) {
    var _this = this;
    _classCallCheck(this, BeforeAfter);
    _defineProperty(this, "_dimensions", function () {
      _this.elementWidth = _this.canvas.offsetWidth;
      _this.elementOffsetLeft = _this.offsetElements.map(function (offsetEl) {
        return offsetEl.offsetLeft;
      }).reduce(function (prev, cur) {
        return prev + cur;
      });
      _this.dragHandleWidth = _this.dragHandle.offsetWidth;
      _this.minLeftPos = _this.elementOffsetLeft + _this.settings.handleMinDistance - _this.dragHandleWidth / 2;
      _this.maxLeftPos = _this.elementOffsetLeft + _this.elementWidth - _this.dragHandleWidth / 2 - _this.settings.handleMinDistance;
      if (_this.oldElementWidth === _this.elementWidth) {
        return;
      }
      _this.oldElementWidth = _this.elementWidth;

      // this.wrapper1.style.width = `${this.elementWidth}px`;
      // this.wrapper2.style.width = `${this.elementWidth}px`;

      _this.elementHeight = _this.canvas.offsetHeight;

      // update leftPos too
      // this.currentPos =
      //   this.minLeftPos + (this.currentPercent * this.elementWidth) / 100;
      // this.currentPercent = this._calcLeftPercent(this.currentPos);

      _this._setPosition(_this.currentPercent, true);
    });
    _defineProperty(this, "_onMouseOver", function (e) {
      // console.log('_onMouseOver');
      // this.canvas.addEventListener('mousemove', this._onMouseMove);
      e.stopPropagation();
      _this._stopAni();
      _this.element.classList.add('interacting');
    });
    _defineProperty(this, "_onMouseOut", function (e) {
      // console.log('_onMouseOut');
      // this.canvas.removeEventListener('mousemove', this._onMouseMove);
      e.stopPropagation();
      _this.element.classList.remove('interacting');
      if (_this.settings.snapToStart) {
        _this._snapToStart();
      }
    });
    _defineProperty(this, "_onMouseMove", function (e) {
      _this._stopAni();
      // console.log('_onMouseMove');
      var currentPos = _this._getPos(e);
      var percent = _this._calcLeftPercent(currentPos.x);
      percent = restrict(percent, 0, 100);
      _this.oldPercent = _this.currentPercent;
      _this._setPosition(percent);
    });
    _defineProperty(this, "_onDragStart", function (e) {
      // console.log('_onDragStart', e.type);
      // this.touchDuration = new Date().getTime();
      _this.startPos = _this._getPos(e);
      _this.element.classList.add('interacting');
      clearTimeout(_this.snapTimeout);
      _this._tapped(e);
      if ('touchstart' === e.type) {
        window.addEventListener('touchmove', _this._onDrag, passiveIfSupported);
        window.addEventListener('touchend', _this._onDragEnd);
        if (_this.settings.followMouse) {
          _this._removeFollowMouseEvents();
        } else {
          _this.dragElementTrigger.removeEventListener('mousedown', _this._onDragStart);
        }
      } else if ('mousedown' === e.type) {
        if (!_this.settings.followMouse) {
          window.addEventListener('mousemove', _this._onDrag, false);
          window.addEventListener('mouseup', _this._onDragEnd, false);
        }
        _this.dragElementTrigger.removeEventListener('touchstart', _this._onDragStart);
      }
    });
    // _onDragMouse = (e) => {
    //   console.log('_onDragMouse', e.type);
    //   this._stopAni();
    //   this.currentPos = this._getPos(e);
    //   let percent = this._calcLeftPercent(this.currentPos.x);
    //   this.oldPercent = this.currentPercent;
    //   this._setPosition(percent);
    // };
    // moving
    _defineProperty(this, "_onDrag", function (e) {
      // console.log('_onDrag', e.type);
      var currentPos = _this._getPos(e);
      var percent = _this._calcLeftPercent(currentPos.x);
      _this._stopAni();
      _this.oldPercent = _this.currentPercent;
      _this._moved = true;
      if ('mousemove' !== e.type) {
        e.preventDefault();
        _this.deltaX = Math.abs(_this.startPos.x - currentPos.x);
        _this.deltaY = Math.abs(_this.startPos.y - currentPos.y);
        if (!_this.dirDetected) {
          if (Math.abs(_this.deltaY) > Math.abs(_this.deltaX)) {
            _this.element.classList.remove('interacting');
            window.removeEventListener('touchmove', _this._onDrag, passiveIfSupported);
            return;
          }
          _this.element.classList.add('interacting');
          _this.dirDetected = true;
        }
      }
      _this._setPosition(percent);
      _this._triggerEvent(allowedEvents[1], {
        percent: percent
      });
    });
    _defineProperty(this, "_onDragEnd", function (e) {
      // console.log('_onDragEnd', e.type);
      _this.element.classList.remove('interacting');
      if ('touchend' === e.type) {
        window.removeEventListener('touchmove', _this._onDrag, passiveIfSupported);
        window.removeEventListener('touchend', _this._onDragEnd);
        setTimeout(function () {
          if (_this.settings.followMouse) {
            _this._addFollowMouseEvents();
          } else {
            _this.dragElementTrigger.addEventListener('mousedown', _this._onDragStart);
          }
        }, 1);
      } else if ('mouseup' === e.type) {
        window.removeEventListener('mousemove', _this._onDrag, false);
        window.removeEventListener('mouseup', _this._onDragEnd, false);
        _this.dragElementTrigger.addEventListener('touchstart', _this._onDragStart, passiveIfSupported);
      }
      if (_this.settings.snapToStart) {
        var percent = _this._calcLeftPercent(_this._getPos(e).x);
        var delta = Math.abs(percent - _this.currentPercent);

        // clearTimeout(this.snapTimeout);
        if (_this._moved || 0.5 > delta) {
          _this._snapToStart();
        } else {
          // this._stopAni();
          // this._animateTo(percent, this.settings.animateDuration);
          _this.snapTimeout = setTimeout(function () {
            _this.oldPercent = percent;
            _this._snapToStart();
          }, _this.settings.animateDuration + 1);
        }
      }
      _this._moved = false;
      _this.dirDetected = false;
    });
    // if tapped on canvas
    _defineProperty(this, "_tapped", function (e) {
      var percent = _this._calcLeftPercent(_this._getPos(e).x);
      _this._stopAni();
      _this.oldPercent = _this.currentPercent;
      _this._animateTo(percent, _this.settings.animateDuration);
    });
    _defineProperty(this, "toggleBeforeAfter", function (evt) {
      if (evt) {
        evt.stopPropagation();
      }
      _this._stopAni();
      if (_this._afterShown) {
        _this.showBefore();
      } else {
        _this.showAfter();
      }
    });
    // TODO: if multiple: initialize with BeforeAfter.setup
    element = getElements(element, true);
    if (!element) {
      return {
        error: true
      };
    }
    if (element.dataset.bainitialized) {
      // TODO: return stored instance
      return {
        error: true
      };
    }
    element.dataset.bainitialized = true;
    instances.push(this);
    this.options = options;
    this.element = element;
    var data = getJSONData(element, 'beforeafter');
    this.settings = Object.assign({}, BeforeAfter.defaults, data, options);

    // no images are given
    // TODO: check options for firstImage and secondImage
    this.images = this.element.querySelectorAll('img');
    if ((!this.settings.beforeImage || !this.settings.afterImage) && (!this.images || !this.images.length)) {
      return {
        error: true
      };
    }
    this.snapTimeout = null;
    // this.touchDuration = null;

    if (!this.element.classList.contains('beforeafter')) {
      this.element.classList.add('beforeafter');
    }
    this.deltaX = 0;
    this.deltaY = 0;
    this.dirDetected = false;
    this.eventFired = {};
    this._registeredEventListeners = [];
    if (this.settings.autoInit) {
      this.init();
    }
  }
  _createClass(BeforeAfter, [{
    key: "_getPos",
    value: function _getPos(e) {
      var t;
      if ('undefined' !== typeof e.pageX) {
        t = e;
      } else {
        t = e.touches[0] || e.changedTouches[0];
      }
      return {
        x: t.pageX,
        y: t.pageY
      };
    }
  }, {
    key: "_createGui",
    value: function _createGui() {
      var s = this.settings;
      this.createdElements = [];
      var div = 'div';
      var canvas = createEl(div, {
        class: 'canvas'
      });
      this.createdElements.push(canvas);

      // images
      var firstImg;
      var secondImg;
      var first, second;
      var createDomImage = false;
      if (s.beforeImage || s.afterImage) {
        createDomImage = true;
        firstImg = createEl('img', {
          draggable: false
        });
        firstImg.src = s.beforeImage;
        secondImg = createEl('img', {
          draggable: false
        });
        secondImg.src = s.afterImage;
      } else {
        var _this$originalElement = this.originalElements = this.images;
        var _this$originalElement2 = beforeafter_slicedToArray(_this$originalElement, 2);
        first = _this$originalElement2[0];
        second = _this$originalElement2[1];
        firstImg = first.cloneNode(true);
        firstImg.setAttribute('draggable', false);
        secondImg = second.cloneNode(true);
        secondImg.setAttribute('draggable', false);
      }
      var clippingElement = createEl(div, {
        class: 'clipSlider'
      }, {
        zIndex: 2
      });
      // const wrapper1 = createEl(
      //   div,
      //   {
      //     class: 'imageWrapper',
      //   },
      //   { zIndex: 1 }
      // );
      // const wrapper2 = createEl(
      //   div,
      //   {
      //     class: 'imageWrapper',
      //   },
      //   { zIndex: 0 }
      // );

      var wrapper1 = document.createDocumentFragment();
      var wrapper2 = document.createDocumentFragment();
      wrapper1.appendChild(firstImg);
      wrapper2.appendChild(secondImg);
      var clip;
      if ('' !== s.beforeLabel) {
        var info1 = createEl(div, {
          class: 'info-box left'
        });
        info1.innerHTML = s.beforeLabel;
        clip = createEl(div, {
          class: 'clipSlider'
        });
        clip.append(info1);
        wrapper2.appendChild(clip);
      }
      if ('' !== s.afterLabel) {
        var info2 = createEl(div, {
          class: 'info-box right'
        });
        info2.innerHTML = s.afterLabel;
        wrapper1.appendChild(info2);
      }
      clippingElement.appendChild(wrapper1);
      if (createDomImage) {
        canvas.append(clippingElement);
        canvas.append(wrapper2);
        this.element.append(canvas);
      } else {
        first.parentNode.replaceChild(clippingElement, first);
        // second.parentNode.replaceChild(wrapper2, second);
        second.remove();
        wrap([clippingElement, wrapper2], canvas);
      }

      // Create drag element
      var drag = createEl(div, {
        class: s.dragElementClass
      }, {
        zIndex: 5
        //   touchAction: 'none',
      });
      var overlay1 = createEl(div, {
        class: 'overlay'
      }, {
        zIndex: 4
      });
      var dragHandle = createEl(div);
      drag.appendChild(dragHandle);
      canvas.appendChild(overlay1);
      canvas.appendChild(drag);

      // this.element.appendChild(canvas);

      if ('' !== s.beforeDescription || '' !== s.afterDescription) {
        var description = createEl(div, {
          class: 'description'
        });
        description.innerHTML = s.beforeDescription;
        this.element.appendChild(description);
        this.createdElements.push(description);
        this.description = description;
      }
      if (s.showToggleButton) {
        var button = createEl(div, {
          class: 'toggleButton'
        }, {
          zIndex: 5
        });
        button.innerHTML = this._buttonStartText;
        this.element.appendChild(button);
        this.createdElements.push(button);
        this.toggleBtn = button;
      }
      this.element.style.visibility = 'visible';

      // global elements
      this.wrapper1 = wrapper1;
      this.wrapper2 = wrapper2;
      this.dragHandle = drag;
      this.clip = clip;
      this.clippingElement = clippingElement;
      this.canvas = canvas;
    }
  }, {
    key: "_removeAllEvents",
    value: function _removeAllEvents() {
      this.dragElementTrigger.removeEventListener('mousedown', this._onDragStart);
      this.dragElementTrigger.removeEventListener('touchstart', this._onDragStart, passiveIfSupported);
      if (this.toggleBtn) {
        this.toggleBtn.removeEventListener('click', this.toggleBeforeAfter);
      }
      window.removeEventListener('resize', this._dimensions);
    }
  }, {
    key: "_addFollowMouseEvents",
    value: function _addFollowMouseEvents() {
      this.canvas.addEventListener('mouseenter', this._onMouseOver);
      this.canvas.addEventListener('mouseleave', this._onMouseOut);
      this.canvas.addEventListener('mousemove', this._onMouseMove);
    }
  }, {
    key: "_removeFollowMouseEvents",
    value: function _removeFollowMouseEvents() {
      this.canvas.removeEventListener('mouseenter', this._onMouseOver);
      this.canvas.removeEventListener('mouseleave', this._onMouseOut);
      this.canvas.removeEventListener('mousemove', this._onMouseMove);
    }
  }, {
    key: "_addEventListeners",
    value: function _addEventListeners() {
      if (this.settings.followMouse) {
        // no touch device
        this._addFollowMouseEvents();

        // touch device
        this.dragElementTrigger.addEventListener('touchstart', this._onDragStart, passiveIfSupported);
      } else {
        this.dragElementTrigger.addEventListener('mousedown', this._onDragStart);
        this.dragElementTrigger.addEventListener('touchstart', this._onDragStart, passiveIfSupported);
      }
      if (this.toggleBtn) {
        this.toggleBtn.addEventListener('click', this.toggleBeforeAfter);
      }
      window.addEventListener('resize', this._dimensions);
    }

    // TODO: jumpToEnd
  }, {
    key: "_stopAni",
    value: function _stopAni() {
      if (this.requestId) {
        window.cancelAnimationFrame(this.requestId);
        this.requestId = undefined;
      }
      this.timing.then = 0;
      this.timing.curTime = 0;
    }
  }, {
    key: "_renderLoop",
    value: function _renderLoop() {
      var now, dt;
      now = new Date().getTime();
      dt = now - (this.timing.then || now);
      this.timing.curTime += dt;
      this.progress = this.timing.curTime / this._animationDuration;
      if (this.progress > 1) {
        this.progress = 1;
      }

      // render
      var ease = this.easing(this.progress);
      this._setPosition(this.oldPercent + this._delta * ease);
      this.timing.then = now;
      if (this.progress < 1) {
        this.requestId = window.requestAnimationFrame(this._renderLoop.bind(this));
      } else {
        // finished
        this.oldPercent = this.currentPercent;
      }
    }
  }, {
    key: "_animateTo",
    value: function _animateTo(percent, duration, easing) {
      percent = restrict(+percent, 0, 100);
      this._delta = percent - this.oldPercent;
      if (Math.abs(this._delta) < 1) {
        return;
      }
      if (!duration) {
        this._setPosition(percent);
        return;
      }
      this._animationDuration = duration;
      this.easing = easing || this.settings.animateEasing;
      this.progress = 0;
      this.timing.curTime = 0;

      // start render loop
      this._renderLoop();
    }
  }, {
    key: "_snapToStart",
    value: function _snapToStart() {
      var _this2 = this;
      var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.settings.snapToStartDelay;
      this._stopAni();
      // TODO: check snapToStartDelay value
      this.snapTimeout = setTimeout(function () {
        _this2._animateTo(_this2.settings.startPos, _this2.settings.animateDuration, _this2.settings.animateEasing);
      }, delay);
    }
  }, {
    key: "_getOffsetElements",
    value: function _getOffsetElements() {
      var offsetElements = [this.element];
      var parent = this.element.offsetParent;
      if (!parent) {
        return offsetElements;
      }
      do {
        offsetElements.push(parent);
        if (!parent.offsetParent) {
          break;
        }
        parent = parent.offsetParent;
      } while ('BODY' !== parent.nodeName);
      return offsetElements;
    }
  }, {
    key: "_setToggleValues",
    value:
    // _onTapEnd = (e) => {
    //   this._stopAni();
    //   console.log('_onTapEnd', e.type);
    //   this.oldPercent = this.currentPercent;

    //   document.removeEventListener('mouseup', this._onTapEnd);
    //   document.removeEventListener('touchend', this._onTapEnd);

    //   // this.element.classList.remove('interacting');
    //   this._snapToStart();
    // };

    // _onTap = (e) => {
    //   console.log('_onTap', e.type);
    //   // e.preventDefault();
    //   // e.stopPropagation();
    //   // this.element.classList.add('interacting');
    //   this._tapped(e);

    //   if (this.settings.snapToStart) {
    //     document.addEventListener('mouseup', this._onTapEnd);
    //     document.addEventListener('touchend', this._onTapEnd);
    //   }
    // };

    function _setToggleValues(status, toggleText, text) {
      // console.log('change', status);
      if (this.toggleBtn) {
        this.toggleBtn.innerHTML = toggleText;
        // this.toggleBtn.dataset.status = status;
      }
      if (this.description) {
        this.description.innerHTML = text;
      }
      this._afterShown = 1 === status ? true : false;
    }

    /**
     * set the handle to a defined position (in percent from left)
     * @param {Number} percent Percent of the new handle position from left
     */
  }, {
    key: "_setPosition",
    value: function _setPosition(percent) {
      var resize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (percent === this.currentPercent && !resize) {
        return false;
      }
      this.currentPercent = percent;
      var left = this.elementWidth * percent * 0.01;
      var clipL = "rect(0 ".concat(left, "px ").concat(this.elementHeight, "px 0)");
      var clipR = "rect(0 ".concat(this.elementWidth, "px ").concat(this.elementHeight, "px ").concat(left, "px)");
      var tmp;
      if (!this._clipFromLeft) {
        tmp = clipL;
        clipL = clipR;
        clipR = tmp;
      }
      if (this.clip) {
        this.clip.style.clipPath = clipR;
      }
      this.clippingElement.style.clipPath = clipL;
      this.dragHandle.style.transform = "translate(".concat(left, "px, 0)");

      // change state and button text
      if (percent > 75 && !this._afterShown) {
        this._setToggleValues(1, this.settings.toggleBeforeText, this.settings.afterDescription);
      } else if (percent < 25 && this._afterShown) {
        this._setToggleValues(0, this.settings.toggleAfterText, this.settings.beforeDescription);
      }
      this._triggerEvent(allowedEvents[2], {
        percent: percent
      });
    }

    /**
     * convert pixel position to percent from left
     * @param  {Number} leftPos The left ('px') value
     * @return {Number}         The left percent value
     */
  }, {
    key: "_calcLeftPercent",
    value: function _calcLeftPercent(leftPos) {
      leftPos = restrict(leftPos, this.minLeftPos, this.maxLeftPos);
      return (leftPos + this.dragHandleWidth * 0.5 - this.elementOffsetLeft) * 100 / this.elementWidth;
    }

    /**
     * convert percent to left pixel value
     * @param  {Number} leftPercent The left percent value
     * @return {Number}             The left ('px') value
     */
  }, {
    key: "_calcLeftValue",
    value: function _calcLeftValue(leftPercent) {
      var percent = restrict(leftPercent, 0, 100) * 0.01;
      return percent * this.elementWidth + this.elementOffsetLeft - this.dragHandleWidth * 0.5;
    }
  }, {
    key: "_triggerEvent",
    value: function _triggerEvent(eventName, data) {
      var eventData = {
        detail: _objectSpread({
          instance: this
        }, data)
      };
      var ce = new CustomEvent(eventName, eventData);
      this.element.dispatchEvent(ce);
      this.eventFired[eventName] = ce;

      // for inline events
      trigger(this.element, eventName, ce);
    }

    // public user function
  }, {
    key: "init",
    value: function () {
      var _init = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var _this3 = this;
        var s, afterDescription, toggleAfterText, file;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (!this._initialized) {
                _context.next = 2;
                break;
              }
              return _context.abrupt("return", this);
            case 2:
              this._initialized = true;
              s = this.settings;
              this._afterShown = false;

              // how to clip the image (from which side)
              this._clipFromLeft = true;
              this._buttonStartText = this.settings.toggleAfterText;

              // change texts
              if (!s.afterOnTheRight) {
                afterDescription = s.afterDescription;
                s.afterDescription = s.beforeDescription;
                s.beforeDescription = afterDescription;
                toggleAfterText = s.toggleAfterText;
                s.toggleAfterText = s.toggleBeforeText;
                s.toggleBeforeText = toggleAfterText;

                // let afterLabel = s.afterLabel;
                // s.afterLabel = s.beforeLabel;
                // s.beforeLabel = afterLabel;

                this._afterShown = true;
                this._buttonStartText = this.settings.toggleBeforeText;
                this._clipFromLeft = false;
              }
              this._createGui();
              this.offsetElements = this._getOffsetElements();

              // get offset left element
              // if (this.element.offsetParent.nodeName !== 'BODY') {
              //   this.offsetElement = this.element.offsetParent;
              // } else {
              //   this.offsetElement = this.element;
              // }

              this.timing = {
                time: 0,
                curTime: 0
              };
              this.dragElementTrigger = this.canvas;
              if (s.onlyHandleDraggable) {
                this.dragElementTrigger = this.dragHandle;
                if (s.clickable) {
                  this.canvas.addEventListener('mousedown', this._tapped);
                  this.canvas.addEventListener('touchstart', this._tapped);
                }
              }
              // this.canvas.classList.add('touch');
              this._animationDuration = s.animateInDuration || 0;
              if (!s.startPos) {
                s.startPos = 0;
              }
              if (!s.animateStartPos) {
                s.animateStartPos = 0;
              }
              this.currentPercent = this._animationDuration > 0 ? s.animateStartPos : s.startPos;
              this.oldPercent = this.currentPercent;
              // this.currentPos = {
              //   x: this._calcLeftValue(this.currentPercent),
              //   y: 0,
              // };

              this.element.style.opacity = 0;
              this._moved = false;

              // read the first image
              file = this.settings.beforeImage || this.images[0].src;
              _context.next = 23;
              return imageDimensions(file);
            case 23:
              this.imageDimensions = _context.sent;
              this._dimensions();
              this._setPosition(this.currentPercent);
              this.element.style.opacity = 1;
              if (this._animationDuration > 0 && this.settings.animateStartPos !== this.settings.startPos) {
                setTimeout(function () {
                  return _this3._animateTo(_this3.settings.startPos, _this3._animationDuration, _this3.settings.animateInEasing);
                }, this.settings.animateInDelay);
              }
              this._addEventListeners();
              this._triggerEvent(allowedEvents[0]);
            case 30:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function init() {
        return _init.apply(this, arguments);
      }
      return init;
    }()
  }, {
    key: "addEventListener",
    value: function addEventListener(eventName, listener, option) {
      if (allowedEvents.indexOf(eventName) < 0 || 'function' !== typeof listener) {
        return false;
      }
      this.element.addEventListener(eventName, listener, option);
      this._registeredEventListeners.push({
        eventName: eventName,
        listener: listener,
        option: option
      });

      // already fired
      if (this.eventFired[eventName]) {
        listener.call(this.element, this.eventFired[eventName]);
      }
    }
  }, {
    key: "removeEventListener",
    value: function removeEventListener(eventName, listener, option) {
      this.element.removeEventListener(eventName, listener, option);
    }
  }, {
    key: "goto",
    value: function goto(percent, duration, easing) {
      if (isNaN(percent)) {
        return !1;
      }
      // restrict and cast possible string to number
      percent = restrict(+percent, 0, 100);

      // early exit (same delta)
      if (percent === this.currentPercent) {
        return !1;
      }
      this.oldPercent = this.currentPercent;
      this._stopAni();
      this._animateTo(percent, duration, easing);
    }
  }, {
    key: "showAfter",
    value: function showAfter() {
      // console.log('showAfter');
      // this._stopAni();
      this.oldPercent = 100;
      this._setPosition(100);
      // this.toggleBtn.innerHTML = this.settings.toggleBeforeText;
      // this._afterShown = true;
    }
  }, {
    key: "showBefore",
    value: function showBefore() {
      // console.log('showBefore');
      // this._stopAni();
      this.oldPercent = 0;
      this._setPosition(0);
      // this.toggleBtn.innerHTML = this.settings.toggleAfterText;
      // this._afterShown = false;
    }
  }, {
    key: "elem",
    get: function get() {
      return this.element;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.element.removeAttribute('data-bainitialized');
      if ('undefined' === typeof this.createdElements) {
        return false;
      }
      var i;
      // remove elements
      if (this.createdElements) {
        for (i = 0; i < this.createdElements.length; i++) {
          // console.log(this.createdElements[i]);
          this.element.removeChild(this.createdElements[i]);
        }
      }

      // add original elements
      if (this.originalElements) {
        for (i = 0; i < this.originalElements.length; i++) {
          this.element.appendChild(this.originalElements[i]);
        }
      }
      this.createdElements = this.originalElements = [];

      // remove all eventlisteners
      this._removeAllEvents();
    }
  }]);
  return BeforeAfter;
}();
BeforeAfter.init = function () {
  if (initialized) {
    return true;
  }
  initialized = true;
  BeforeAfter.setupAll('[data-beforeafter]');
  return true;
};

// helper for multiple
BeforeAfter.setupAll = function (element, options) {
  element = getElements(element);
  if (!element) {
    return !1;
  }
  element.forEach(function (el) {
    if (el.dataset.bainitialized) {
      return false;
    }
    new BeforeAfter(el, options);
    // if (!ba.error) {
    //   instances.push(ba);
    // }
  });
  return instances;
};
var initialized = false;

/**
 * static bestroy
 * @param  {Object} id the before initialized Object
 * @return {[type]}    [description]
 */
BeforeAfter.destroy = function () {
  var len = instances.length;
  instances.forEach(function (inst) {
    inst.destroy();
  });
  initialized = false;
  instances = [];
  return len;
};

/**
 * static defaults settings
 * @type {Object}
 */
BeforeAfter.defaults = defaults;
docReady(BeforeAfter.init);
/* harmony default export */ var beforeafter = (BeforeAfter);
__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});