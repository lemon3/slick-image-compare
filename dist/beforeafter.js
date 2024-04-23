/*!
* BeforeAfter v0.2.9
* undefined
*/
var W = Object.defineProperty;
var M = Object.getOwnPropertySymbols;
var j = Object.prototype.hasOwnProperty, G = Object.prototype.propertyIsEnumerable;
var S = (s, i, t) => i in s ? W(s, i, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[i] = t, O = (s, i) => {
  for (var t in i || (i = {}))
    j.call(i, t) && S(s, t, i[t]);
  if (M)
    for (var t of M(i))
      G.call(i, t) && S(s, t, i[t]);
  return s;
};
var _ = (s, i, t) => (S(s, typeof i != "symbol" ? i + "" : i, t), t);
const F = {
  // storage
  _s: /* @__PURE__ */ new WeakMap(),
  put(s, ...i) {
    this._s.has(s) || this._s.set(s, /* @__PURE__ */ new Map());
    let t = this._s.get(s);
    if (i.length > 1)
      return t.set(i[0], i[1]), this;
    if (typeof i[0] == "object")
      for (const e in i[0])
        t.set(e, i[0][e]);
    else
      t.set(i[0]);
    return this;
  },
  get(s, i) {
    return this._s.has(s) ? i ? this._s.get(s).get(i) : this._s.get(s) : !1;
  },
  has(s, i) {
    return this._s.has(s) && this._s.get(s).has(i);
  },
  // todo if no key given: remove all
  remove(s, i) {
    if (!this._s.has(s))
      return !1;
    let t = this._s.get(s).delete(i);
    return this._s.get(s).size === 0 && this._s.delete(s), t;
  }
}, q = (s) => {
  const i = "DOMContentLoaded";
  document.readyState === "complete" || document.readyState === "interactive" ? (s(), document.removeEventListener(i, s)) : document.addEventListener(i, s, !1);
}, B = (s) => new Promise((i, t) => {
  const e = new Image();
  e.onload = () => {
    const { naturalWidth: n, naturalHeight: r } = e, a = n / r;
    i({ width: n, height: r, ratio: a });
  }, e.onerror = () => {
    t("error");
  }, e.src = s;
}), X = (s, i, t = null) => {
  if (!s)
    return !1;
  if (i === void 0 || s.dataset[i] === void 0)
    return s.dataset;
  let e;
  try {
    e = JSON.parse(s.dataset[i].replace(/'/g, '"'));
  } catch (a) {
  }
  if (typeof e != "object") {
    e = s.dataset[i];
    const a = {};
    e = e.replace(/[\\ \t\n\r]/g, ""), e = e.replace(/{?([^{])}?/g, "$1");
    const h = e.split(",");
    h.length > 1 ? h.forEach((o) => {
      if (o) {
        let [l, c] = o.split(":");
        c = c.replace(/'/g, ""), c === "true" ? c = !0 : c === "false" && (c = !1), a[l.replace(/'/g, "")] = c;
      }
    }) : a[i] = e, e = a;
  }
  let n = {}, r = i.length;
  return Object.entries(s.dataset).forEach((a) => {
    if (a[0].toLowerCase().indexOf(i) >= 0 && a[0].length > r) {
      let h = a[0][r].toLowerCase() + a[0].substring(r + 1);
      (t === null || t && t[h] !== void 0) && (n[h] = a[1]);
    }
  }), Object.assign(e, n);
};
let p = !1;
try {
  window.addEventListener(
    "test",
    null,
    Object.defineProperty({}, "passive", {
      get: function() {
        return p = { passive: !1 }, !1;
      }
    })
  );
} catch (s) {
  p = !1;
}
const A = (s, i, t) => Math.max(i, Math.min(s, t)), C = (s, i, t) => {
  if (s = parseFloat(s, 10), i = parseFloat(i, 10), t = parseFloat(t, 10), t < i) {
    let e = t;
    t = i, i = e;
  }
  return !isNaN(i) && s < i ? i : !isNaN(t) && s > t ? t : s;
}, U = (s, i, t, e) => {
  if (i)
    for (let n in i)
      Object.prototype.hasOwnProperty.call(i, n) && s.setAttribute(n, i[n]);
  if (t)
    for (let n in t)
      Object.prototype.hasOwnProperty.call(t, n) && (s.style[n] = t[n]);
  return e && (s.innerHTML = e), s;
}, d = (s, i, t, e) => U(document.createElement(s), i, t, e), T = {
  Linear: (s) => s,
  // Pow: {},
  Quad: {
    easeIn: (s) => Math.pow(s, 2),
    easeOut: (s) => 1 - Math.pow(1 - s, 2)
  },
  Cubic: {
    easeIn: (s) => Math.pow(s, 3),
    easeOut: (s) => 1 - Math.pow(1 - s, 3)
  },
  Sine: {
    easeIn: (s) => 1 - Math.cos(s * Math.PI / 2),
    easeOut: (s) => Math.sin(s * Math.PI / 2)
  },
  Elastic: {
    easeOut: (s) => {
      const i = 2 * Math.PI / 3;
      return s === 0 || s === 1 ? s : Math.pow(2, -10 * s) * Math.sin((s * 10 - 0.75) * i) + 1;
    }
  }
}, Y = {
  autoInit: !0,
  startPos: 50,
  // % from left
  beforeImage: null,
  afterImage: null,
  horizontal: !0,
  // true is the default, if false vertical
  ltr: !0,
  smooth: !0,
  smoothAmount: 250,
  animateOnClick: !0,
  followMouse: !1,
  // mouse move interaction (desktop only)
  onlyHandleDraggable: !1,
  clickable: !1,
  // only works if onlyHandleDraggable is set to true
  snapToStart: !1,
  // after mouse out or drag stop handle jumps to start position
  snapToStartDelay: 1e3,
  snapToStartDuration: 1250,
  // ms TODO: implement
  snapToStartEasing: T.Elastic.easeOut,
  // TODO: implement
  handleMinDistance: 0,
  // min distance to left and right border in px TODO: also %
  // animate in
  animateIn: !1,
  animateInDuration: 1250,
  // ms
  animateInEasing: T.Elastic.easeOut,
  animateInDelay: 100,
  // in ms
  animateInStartPos: 40,
  // % from left
  animateDuration: 250,
  // ms
  animateEasing: T.Cubic.easeOut,
  // showLabels: false,
  beforeLabel: "",
  // before Image
  afterLabel: ""
  // after Image
};
class J {
  /**
   * class constructor
   */
  constructor() {
    this._eventCallbacks = this._eventCallbacks || {};
  }
  /**
   * Method to emit specific events
   *
   * @param {string} eventName the name of the event to be triggered
   * @param {Object} detail additional event data
   */
  emit(i, t) {
    let e = this._eventCallbacks[i];
    const n = { bubbles: !1, cancelable: !1, detail: t }, r = new CustomEvent(i, n);
    e && e.forEach((a) => a.call(this, r)), this.element.dispatchEvent(r);
  }
  /**
   * Register an event handler
   *
   * @param {string} eventName the name of the eventlistener
   * @param {function} listener the handler function to be called if the event triggers
   * @returns
   */
  addEventListener(i, t) {
    return this.allowedEvents && this.allowedEvents.indexOf(i) < 0 || typeof t != "function" ? !1 : (this._eventCallbacks[i] || (this._eventCallbacks[i] = []), this._eventCallbacks[i].push(t), this);
  }
  /**
   * Remove previously register event handler
   *
   *
   * @param {[string]} eventName the name of the eventlistener
   * @param {[function]} listener the handler function
   * @returns
   */
  removeEventListener(i, t) {
    if (!this._eventCallbacks || arguments.length === 0)
      return this._eventCallbacks = {}, this;
    let e = this._eventCallbacks[i];
    return e ? arguments.length === 1 ? (delete this._eventCallbacks[i], this) : (this._eventCallbacks[i] = e.filter(
      (n) => n !== t
    ), this) : this;
  }
}
const P = "beforeafter", Q = "data-" + P, m = "interacting", z = "init", x = "drag", H = "update", D = "viewchanged", k = "beforeshown", N = "aftershown", R = "interactionend", b = "mousedown", Z = "resize";
let E = [], y = !1;
const $ = (s = !0, i = "#ffffff") => `<svg xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    stroke="${i}"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="arcs">
    <path d="${s ? "m12 24 8-8-8-8" : "m20 8-8 8 8 8"}"/>
  </svg>`;
class u extends J {
  constructor(t, e) {
    if (!t)
      return { error: !0 };
    if (t = typeof t == "string" ? document.querySelector(t) : t, t === null || t.length === 0)
      return { error: !0 };
    super();
    _(this, "_dimensions", (t) => {
      const e = this.element.getBoundingClientRect(), n = getComputedStyle(this.element), r = parseFloat(n.borderLeftWidth) + parseFloat(n.borderRightWidth), a = parseFloat(n.borderTopWidth) + parseFloat(n.borderBottomWidth);
      this.width = e.width - r, this.height = e.height - a;
      let h;
      if (this._horizontal) {
        const o = e.x;
        h = this._dragHandle.offsetWidth * 0.5, this._dim = this.width, this._offset = h - o, this._minPos = o + this.settings.handleMinDistance - h, this._maxPos = o + this.width - h - this.settings.handleMinDistance;
      } else {
        const o = this.element.offsetTop;
        h = this._dragHandle.offsetHeight * 0.5, this._dim = this.height, this._offset = h - o, this._minPos = o + this.settings.handleMinDistance - h, this._maxPos = o + this.height - h - this.settings.handleMinDistance;
      }
      !t && this._oldDim === this._dim || (this._oldDim = this._dim, this._setPosition(this._percent, !0));
    });
    _(this, "_mouseOver", () => {
      this._stopAni(), this.element.classList.add(m);
    });
    _(this, "_mouseOut", () => {
      this.element.classList.remove(m), this.settings.snapToStart && this._snapToStart();
    });
    _(this, "_mouseMove", (t) => {
      this._stopAni(), this._setPosition(this._calcPercent(this._getPos(t)));
    });
    // if tapped on canvas
    _(this, "_tapstart", (t) => {
      this._endInteraction = !1, this._stopAni(), clearTimeout(this._snapTimeout), t.type === "touchstart" ? (this.isTouch = !0, this._mouseStartEvents(!1)) : b === t.type && (this.isTouch = !1, this._touchStartEvent(!1));
      const e = this._calcPercent(this._getPos(t));
      this.settings.animateOnClick ? this._animateTo(e, this.settings.animateDuration) : this._setPosition(e);
    });
    _(this, "_dragStart", (t) => {
      t.stopPropagation(), this.startPos = this._getPos(t), this.element.classList.add(m), this._tapstart(t), t.type === "touchstart" ? (window.addEventListener("touchmove", this._drag, p), window.addEventListener("touchend", this._dragEnd, !1)) : b === t.type && (this.settings.followMouse || (window.addEventListener("mousemove", this._drag, !1), window.addEventListener("mouseup", this._dragEnd, !1)));
    });
    // moving
    _(this, "_drag", (t) => {
      this._stopAni();
      let e = this._getPos(t), n = this._calcPercent(e);
      if (this.isTouch) {
        t.preventDefault();
        const r = Math.abs(this.startPos.x - e.x), a = Math.abs(this.startPos.y - e.y);
        if (!this._dirDetected) {
          if (a > r) {
            this.element.classList.remove(m), window.removeEventListener(
              "touchmove",
              this._drag,
              p
            );
            return;
          }
          this.element.classList.add(m), this._dirDetected = !0;
        }
      }
      this._setPosition(n), this._triggerEvent(x);
    });
    _(this, "_dragEnd", (t) => {
      this._endInteraction = !0, t.type === "touchend" ? (this.isTouch = !0, window.removeEventListener("touchmove", this._drag, p), window.removeEventListener("touchend", this._dragEnd)) : t.type === "mouseup" && (this.isTouch = !1, this.settings.followMouse || (window.removeEventListener("mousemove", this._drag, !1), window.removeEventListener("mouseup", this._dragEnd, !1))), this._testInteractionEnd(), this._dirDetected = !1;
    });
    if (t.dataset.bainitialized)
      return u.getInstance(t);
    t.dataset.bainitialized = !0, this.allowedEvents = [
      z,
      x,
      H,
      k,
      N,
      R,
      D
    ], E.push(this), F.put(t, "instance", this), this.element = t;
    const n = X(t, P);
    if (this.options = e || {}, this.settings = Object.assign({}, u.defaults, n, e), this.images = this.element.querySelectorAll("img"), (!this.settings.beforeImage || !this.settings.afterImage) && (!this.images || !this.images.length))
      return {
        error: !0
      };
    this.element.classList.contains(P) || this.element.classList.add(P), this._snapTimeout = null, this._dirDetected = !1, this.settings.autoInit && this.init();
  }
  _triggerEvent(t, e) {
    e = O({
      instance: this,
      horizontal: this._horizontal,
      ltr: this._ltr,
      percent: this._percent,
      afterShown: this._afterShown
    }, e), this.emit(t, e);
  }
  /**
   * Method to return the current position
   *
   * @param {Event} evt The current event used (e.g. touchmove)
   * @returns {Object} containing the x an y position
   */
  _getPos(t) {
    let e;
    return typeof t.pageX != "undefined" ? e = t : e = t.touches[0] || t.changedTouches[0], {
      x: e.pageX,
      y: e.pageY
    };
  }
  /**
   * Method to create the gui for this plugin
   */
  _createGui() {
    const t = this.settings;
    this._originalEl = [], this._createdEl = [];
    const e = "div";
    let n, r;
    const a = d(e, { class: "ba-clip" });
    if (t.beforeImage || t.afterImage)
      this.images = [n, r] = [
        t.beforeImage,
        t.afterImage
      ].reduce((v, g) => (v.push(d("img", { draggable: !1, src: g })), v), []), this.element.appendChild(n), a.appendChild(r), this.element.appendChild(a), this._createdEl.push(n);
    else {
      const [v, g] = this.images;
      n = v, n.setAttribute("draggable", !1), r = g.cloneNode(!0), r.setAttribute("draggable", !1), a.appendChild(r), g.parentNode.replaceChild(a, g), this._originalEl.push(g);
    }
    this._createdEl.push(a);
    let h, o;
    t.beforeLabel !== "" && (h = d(e, { class: "ba-label ba-label-one" }), h.innerHTML = t.beforeLabel, this.element.appendChild(h), this._createdEl.push(h)), t.afterLabel !== "" && (o = d(e, { class: "ba-label ba-label-two" }), o.innerHTML = t.afterLabel, this.element.appendChild(o), this._createdEl.push(o)), this.info1 = t.ltr ? h : o, this.info2 = t.ltr ? o : h;
    const l = d(
      e,
      {
        class: "ba-handle " + (this._horizontal ? "horizontal" : "vertical")
      },
      { zIndex: 5 }
    ), c = d(e, { class: "ba-line ba-line-1" }), w = d(e, { class: "ba-line ba-line-2" }), f = d(e, { class: "ba-arrow ba-arrow-1" }), L = d(e, { class: "ba-arrow ba-arrow-2" }), I = d(e, { class: "ba-circle" });
    f.innerHTML = $(!1), L.innerHTML = $(), I.appendChild(f), I.appendChild(L), l.appendChild(c), l.appendChild(w), l.appendChild(I), this.element.appendChild(l), this._createdEl.push(l), this.element.style.visibility = "visible", this._dragHandle = l, this._clipEl = a;
  }
  /**
   * Method to remove or add mouse events
   *
   * @param {Boolean} add true or false
   */
  _mouseStartEvents(t = !0) {
    const e = this._addRemove(t), n = this.settings;
    if (n.followMouse) {
      const r = this.element;
      r[e]("mouseenter", this._mouseOver, !1), r[e]("mouseleave", this._mouseOut, !1), r[e]("mousemove", this._mouseMove, !1);
    } else
      this._dragEl[e](b, this._dragStart), n.onlyHandleDraggable && n.clickable && (this.element[e](b, this._tapstart, !1), this.element[e]("mouseup", this._dragEnd, !1));
  }
  /**
   * Helper method.
   *
   * @param {Boolean} add true for addEventListener
   *                      false for removeEventListener
   * @returns
   */
  _addRemove(t = !0) {
    return (t ? "add" : "remove") + "EventListener";
  }
  /**
   * Method to remove or add touch events
   *
   * @param {Boolean} add true or false
   */
  _touchStartEvent(t = !0) {
    const e = this._addRemove(t);
    this._dragEl[e]("touchstart", this._dragStart, p), this.settings.clickable && (this.element[e]("touchstart", this._tapstart, !1), this.element[e]("touchend", this._dragEnd, !1));
  }
  _appEvents(t = !0) {
    this._touchStartEvent(t), this._mouseStartEvents(t);
    const e = this._addRemove(t);
    window[e](Z, this._dimensions);
  }
  // TODO: jumpToEnd parameter?
  _stopAni() {
    this._renderId && (cancelAnimationFrame(this._renderId), this._renderId = void 0);
  }
  _testInteractionEnd() {
    this._endInteraction && this._renderId === void 0 && (this._endInteraction = !1, this._interactionEnd(), this._triggerEvent(R));
  }
  /**
   *
   * @param {float} from the from percent value
   * @param {float} to the to percent value
   * @param {float} delta the delta percent value
   * @returns {boolean} true if stopped
   */
  _renderLoop(t, e, n) {
    const r = () => {
      const a = Date.now();
      if (this._timingThen !== 0) {
        if (this._timingCurTime += a - this._timingThen, this.progress = this._timingCurTime / this._animationDuration, this.progress >= 1) {
          this.progress = 1, this._setPosition(e), this._stopAni(), this._testInteractionEnd();
          return;
        }
        this._setPosition(t + n * this.easing(this.progress));
      } else
        this.progress = 0, this._setPosition(t);
      this._timingThen = a, this._renderId = requestAnimationFrame(r);
    };
    r();
  }
  /**
   * Method to animate to the given percentage
   *
   * @param {float} percent The (new) percentage to move to (0 - 100)
   * @param {int} duration The duration in ms (e.g. 250)
   * @param {Object} easing The the easing function
   * @returns
   */
  _animateTo(t, e, n) {
    if (t = A(+t, 0, 100), !e) {
      this._setPosition(t);
      return;
    }
    const r = t - this._percent;
    this._animationDuration = e, this.easing = n || this.settings.animateEasing, this.progress = 0, this._timingThen = this._timingCurTime = 0, this._renderLoop(this._percent, t, r);
  }
  _snapToStart(t = this.settings.snapToStartDelay) {
    this._stopAni(), this._snapTimeout = setTimeout(() => {
      this._animateTo(
        this.settings.startPos,
        this.settings.animateDuration,
        this.settings.animateEasing
      );
    }, t);
  }
  _interactionEnd() {
    this.element.classList.remove(m), this.isTouch ? this._mouseStartEvents() : this._touchStartEvent(), this.settings.snapToStart && this._snapToStart();
  }
  _getClipRect(t) {
    return this._horizontal ? this._ltr ? `rect(0 ${t}px ${this.height}px 0)` : `rect(0 ${this.width}px ${this.height}px ${t}px)` : this._ltr ? `rect(0 ${this.width}px ${t}px 0)` : `rect(${t}px ${this.width}px ${this.height}px 0)`;
  }
  _changeStatus(t) {
    this._afterShown = t;
    let e = this._afterShown ? N : k;
    this._triggerEvent(e), this._triggerEvent(D), this._oneTime = !1;
  }
  /**
   * set the handle to a defined position (in percent from left)
   * @param {Number} percent Percent of the new handle position from left
   */
  _setPosition(t, e = !1) {
    if (t === this._percent && !e)
      return !1;
    this._percent = t;
    const n = this._dim * 0.01 * t;
    this._clipEl.style.clipPath = this._getClipRect(n), this._dragHandle.style.transform = this._horizontal ? `translate(${n}px, 0)` : `translate(0, ${n}px)`, this.info1 && (this.info1.style.opacity = t < 50 ? 1 : (100 - t) / 50), this.info2 && (this.info2.style.opacity = t > 50 ? 1 : t / 50);
    let r = this._ltr ? this._afterShown : !this._afterShown;
    t > 75 && (this._oneTime || !r) ? this._changeStatus(this._ltr) : t < 25 && (this._oneTime || r) && this._changeStatus(!this._ltr), this._triggerEvent(H);
  }
  /**
   * convert pixel position to percent from left
   * @param  {Object} pos The position object { x, y }
   * @return {Number}         The left percent value
   */
  _calcPercent(t) {
    let e = this._horizontal ? t.x : t.y;
    return e = A(e, this._minPos, this._maxPos), (e + this._offset) * 100 / this._dim;
  }
  // /**
  //  * convert percent to left pixel value
  //  * @param  {Number} leftPercent The left percent value
  //  * @return {Number}             The left ('px') value
  //  */
  // _calcLeftValue(leftPercent) {
  //   const percent = restrict(leftPercent, 0, 100) * 0.01;
  //   return (
  //     percent * this.width + this.elementX - this._dragHandleDim * 0.5
  //   );
  // }
  _smooth(t) {
    this._animateTo(t, this.settings.smoothAmount);
  }
  // public user function
  init() {
    if (this._initialized)
      return this;
    const t = this.settings;
    this._initialized = !0, this._oneTime = !0, this._afterShown = !1, this._ltr = !!t.ltr, this._horizontal = t.horizontal, this._createGui(), this._timing = { time: 0, curTime: 0 }, this._dragEl = t.onlyHandleDraggable ? this._dragHandle : this.element, this._animationDuration = t.animateInDuration || 0, t.startPos || (t.startPos = 0), t.animateInStartPos || (t.animateInStartPos = 0), t.animateIn ? this._percent = this._animationDuration > 0 ? t.animateInStartPos : t.startPos : this._percent = t.startPos, this.element.style.opacity = 0, this.isTouch = "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch || navigator.maxTouchPoints > 0 || window.navigator.msMaxTouchPoints > 0, this.allowedEvents.forEach((e) => {
      t[e] && this.addEventListener(e, t[e]);
    }), B(this.images[0].src).then(() => {
      this._dimensions(), this._setPosition(this._percent), this.element.style.opacity = 1, t.animateIn && this._animationDuration > 0 && this.settings.animateInStartPos !== this.settings.startPos && setTimeout(
        () => this._animateTo(
          this.settings.startPos,
          this._animationDuration,
          this.settings.animateInEasing
        ),
        this.settings.animateInDelay
      ), this._appEvents(), this._triggerEvent(z), this._triggerEvent(D);
    });
  }
  /**
   *
   * @param {Integer} stopAt The Position (0-100) where it should stop
   * @param {Integer} repetitions How often should it bounce (0 means endless)
   * @param {Integer} duration The animation Duration form 0 - 100 in ms
   * @param {Function} easingFun An easing-function eg.: (p) => p (for linear);
   */
  play(t = this._percent, e = 2, n = 2e3, r) {
    this._stopAni(), clearTimeout(this._snapTimeout), n = C(n, 250, 1e4), t = C(t, 0, 100);
    let a = this._percent, h = 100 - a, o = n / 100 * Math.abs(h), l = !0, c = 0;
    e <= 0 && (e = -1), this.progress = this._timingCurTime = this._timingThen = 0, this.easing = r || T.Quad.easeOut;
    const w = () => {
      let f = Date.now();
      if (this._timingCurTime += f - (this._timingThen || f), this.progress = this._timingCurTime / o, this.progress >= 1) {
        if (c === e)
          return;
        o = n, l ? (a = 100, h = -100) : (a = 0, h = 100), l = !l, c++, c === e && (h = l ? t : t - 100, o = n / 100 * Math.abs(h)), this._setPosition(a), f = Date.now(), this._timingCurTime = 0;
      } else
        this._setPosition(a + h * this.easing(this.progress));
      this._timingThen = f, this._renderId = requestAnimationFrame(w);
    };
    w();
  }
  goto(t, e, n) {
    return isNaN(t) || (t = C(+t, 0, 100), t === this._percent) ? !1 : (this._stopAni(), this._animateTo(t, e, n), this);
  }
  /**
   * ltr = true  (before, 0%) L -> R (after, 100%)
   * ltr = false (after, 0%)  R -> L (before, 100%)
   */
  changeDirection() {
    this._ltr = !this._ltr;
    let t;
    t = this.info1, this.info1 = this.info2, this.info2 = t, this._percent = 100 - this._percent, this._dimensions(!0);
  }
  /**
   * horizontal or vertical slider
   */
  changeOrientation() {
    const t = this._horizontal;
    this._horizontal = !t, this._dragHandle.classList.remove(t ? "horizontal" : "vertical"), this._dragHandle.classList.add(
      this._horizontal ? "horizontal" : "vertical"
    ), this._dimensions(!0);
  }
  showAfter() {
    this._setPosition(this._ltr ? 100 : 0);
  }
  showBefore() {
    this._setPosition(this._ltr ? 0 : 100);
  }
  get elem() {
    return this.element;
  }
  toggle() {
    this._stopAni(), this._afterShown ? this.showBefore() : this.showAfter();
  }
  destroy() {
    this.element.removeAttribute("data-bainitialized"), this._createdEl.forEach((t) => this.element.removeChild(t)), this._originalEl.forEach((t) => this.element.appendChild(t)), this._createdEl = [], this._originalEl = [], this._percent = this.startPos, this._appEvents(!1), this._initialized = !1;
  }
}
u.init = () => {
  if (y)
    return !0;
  y = !0;
  let s = document.querySelectorAll("[" + Q + "]");
  return s.length === 0 ? !1 : (s.forEach((i) => {
    new u(i);
  }), E);
};
u.destroyAll = () => E.length ? (E.forEach((s) => {
  s.destroy();
}), y = !1, E = [], !0) : !1;
u.getInstance = (s) => F.get(s, "instance");
u.defaults = Y;
q(u.init);
export {
  u as default
};
