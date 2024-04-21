/*!
* BeforeAfter v0.2.7
* undefined
*/
var k = Object.defineProperty;
var y = Object.getOwnPropertySymbols;
var $ = Object.prototype.hasOwnProperty, F = Object.prototype.propertyIsEnumerable;
var b = (s, i, t) => i in s ? k(s, i, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[i] = t, L = (s, i) => {
  for (var t in i || (i = {}))
    $.call(i, t) && b(s, t, i[t]);
  if (y)
    for (var t of y(i))
      F.call(i, t) && b(s, t, i[t]);
  return s;
};
var l = (s, i, t) => (b(s, typeof i != "symbol" ? i + "" : i, t), t);
const x = {
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
}, R = (s) => {
  const i = "DOMContentLoaded";
  document.readyState === "complete" || document.readyState === "interactive" ? (s(), document.removeEventListener(i, s)) : document.addEventListener(i, s, !1);
}, W = (s) => new Promise((i, t) => {
  const e = new Image();
  e.onload = () => {
    const { naturalWidth: n, naturalHeight: a } = e, r = n / a;
    i({ width: n, height: a, ratio: r });
  }, e.onerror = () => {
    t("error");
  }, e.src = s;
}), j = (s, i, t = null) => {
  if (!s)
    return !1;
  if (i === void 0 || s.dataset[i] === void 0)
    return s.dataset;
  let e;
  try {
    e = JSON.parse(s.dataset[i].replace(/'/g, '"'));
  } catch (r) {
  }
  if (typeof e != "object") {
    e = s.dataset[i];
    const r = {};
    e = e.replace(/[\\ \t\n\r]/g, ""), e = e.replace(/{?([^{])}?/g, "$1");
    const h = e.split(",");
    h.length > 1 ? h.forEach((o) => {
      if (o) {
        let [u, c] = o.split(":");
        c = c.replace(/'/g, ""), c === "true" ? c = !0 : c === "false" && (c = !1), r[u.replace(/'/g, "")] = c;
      }
    }) : r[i] = e, e = r;
  }
  let n = {}, a = i.length;
  return Object.entries(s.dataset).forEach((r) => {
    if (r[0].toLowerCase().indexOf(i) >= 0 && r[0].length > a) {
      let h = r[0][a].toLowerCase() + r[0].substring(a + 1);
      (t === null || t && t[h] !== void 0) && (n[h] = r[1]);
    }
  }), Object.assign(e, n);
};
let m = !1;
try {
  window.addEventListener(
    "test",
    null,
    Object.defineProperty({}, "passive", {
      get: function() {
        return m = { passive: !1 }, !1;
      }
    })
  );
} catch (s) {
  m = !1;
}
const P = (s, i, t) => {
  if (s = parseFloat(s, 10), i = parseFloat(i, 10), t = parseFloat(t, 10), t < i) {
    let e = t;
    t = i, i = e;
  }
  return !isNaN(i) && s < i ? i : !isNaN(t) && s > t ? t : s;
}, G = (s, i, t, e) => {
  if (i)
    for (let n in i)
      Object.prototype.hasOwnProperty.call(i, n) && s.setAttribute(n, i[n]);
  if (t)
    for (let n in t)
      Object.prototype.hasOwnProperty.call(t, n) && (s.style[n] = t[n]);
  return e && (s.innerHTML = e), s;
}, _ = (s, i, t, e) => G(document.createElement(s), i, t, e), T = {
  // Linear: {},
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
}, q = {
  autoInit: !0,
  horizontal: !0,
  // true is the default, if false vertical
  ltr: !0,
  beforeImage: null,
  afterImage: null,
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
  // min distance to left and right border in px
  dragElementClass: "ba-handle",
  // animateIn: true,
  animateInDuration: 1250,
  // ms
  animateInEasing: T.Elastic.easeOut,
  animateInDelay: 100,
  // in ms
  animateStartPos: 40,
  // % from left
  startPos: 50,
  // % from left
  // clickAnimate: true,
  animateDuration: 250,
  // ms
  animateEasing: T.Cubic.easeOut,
  // showLabels: false,
  beforeLabel: "",
  // before Image
  afterLabel: ""
  // after Image
}, B = (s, i, t) => {
  let e = s.getAttribute("on" + i);
  new Function(
    "e",
    // 'with(document) {' +
    // 'with(this)' +
    "{" + e + "}"
    // + '}'
  ).call(s, t);
};
class X {
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
    const n = { bubbles: !1, cancelable: !1, detail: t }, a = new CustomEvent(i, n);
    e && e.forEach((r) => r.call(this, a)), this.element && (this.element.dispatchEvent(a), B(this.element, i, a));
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
const w = "beforeafter", U = "data-" + w, g = "interacting", C = "init", M = "drag", O = "update", S = "viewchanged", A = "beforeshown", z = "aftershown", I = "interactionend", v = "mousedown", Y = "resize";
let p = [], D = !1;
class d extends X {
  constructor(t, e) {
    if (!t)
      return { error: !0 };
    if (t = typeof t == "string" ? document.querySelector(t) : t, t === null || t.length === 0)
      return { error: !0 };
    super();
    l(this, "_interactionEnd", () => {
      this.element.classList.remove(g), this.isTouch ? this._mouseStartEvents() : this._touchStartEvent(), this.settings.snapToStart && this._snapToStart();
    });
    l(this, "_dimensions", (t) => {
      const e = this.element.getBoundingClientRect(), n = getComputedStyle(this.element), a = parseFloat(n.borderLeftWidth) + parseFloat(n.borderRightWidth), r = parseFloat(n.borderTopWidth) + parseFloat(n.borderBottomWidth);
      this.width = e.width - a, this.height = e.height - r;
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
    l(this, "_mouseOver", () => {
      this._stopAni(), this.element.classList.add(g);
    });
    l(this, "_mouseOut", () => {
      this.element.classList.remove(g), this.settings.snapToStart && this._snapToStart();
    });
    l(this, "_mouseMove", (t) => {
      this._stopAni();
      let e = this._getPos(t), n = this._calcPercent(e);
      this._setPosition(n);
    });
    // if tapped on canvas
    l(this, "_tapstart", (t) => {
      this._endInteraction = !1, this._stopAni(), clearTimeout(this._snapTimeout), t.type === "touchstart" ? (this.isTouch = !0, this._mouseStartEvents(!1)) : v === t.type && (this.isTouch = !1, this._touchStartEvent(!1));
      const e = this._calcPercent(this._getPos(t));
      this._animateTo(e, this.settings.animateDuration);
    });
    l(this, "_dragStart", (t) => {
      t.stopPropagation(), this.startPos = this._getPos(t), this.element.classList.add(g), this._tapstart(t), t.type === "touchstart" ? (window.addEventListener("touchmove", this._drag, m), window.addEventListener("touchend", this._dragEnd, !1)) : v === t.type && (this.settings.followMouse || (window.addEventListener("mousemove", this._drag, !1), window.addEventListener("mouseup", this._dragEnd, !1)));
    });
    // moving
    l(this, "_drag", (t) => {
      this._stopAni();
      let e = this._getPos(t), n = this._calcPercent(e);
      if (this.isTouch) {
        t.preventDefault();
        const a = Math.abs(this.startPos.x - e.x), r = Math.abs(this.startPos.y - e.y);
        if (!this._dirDetected) {
          if (r > a) {
            this.element.classList.remove(g), window.removeEventListener(
              "touchmove",
              this._drag,
              m
            );
            return;
          }
          this.element.classList.add(g), this._dirDetected = !0;
        }
      }
      this._setPosition(n), this._triggerEvent(M);
    });
    l(this, "_dragEnd", (t) => {
      this._endInteraction = !0, t.type === "touchend" ? (this.isTouch = !0, window.removeEventListener("touchmove", this._drag, m), window.removeEventListener("touchend", this._dragEnd)) : t.type === "mouseup" && (this.isTouch = !1, this.settings.followMouse || (window.removeEventListener("mousemove", this._drag, !1), window.removeEventListener("mouseup", this._dragEnd, !1))), this._testInteractionEnd(), this._dirDetected = !1;
    });
    if (t.dataset.bainitialized)
      return d.getInstance(t);
    t.dataset.bainitialized = !0, this.allowedEvents = [
      C,
      M,
      O,
      A,
      z,
      I,
      S
    ], p.push(this), x.put(t, "instance", this), this.element = t;
    const n = j(t, w);
    if (this.options = e || {}, this.settings = Object.assign({}, d.defaults, n, e), this.images = this.element.querySelectorAll("img"), (!this.settings.beforeImage || !this.settings.afterImage) && (!this.images || !this.images.length))
      return {
        error: !0
      };
    this.element.classList.contains(w) || this.element.classList.add(w), this._snapTimeout = null, this._dirDetected = !1, this.settings.autoInit && this.init();
  }
  _triggerEvent(t, e) {
    e = L({
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
    let n, a;
    const r = _(e, { class: "clipSlider" });
    if (t.beforeImage || t.afterImage)
      this.images = [n, a] = [
        t.beforeImage,
        t.afterImage
      ].reduce((E, f) => (E.push(_("img", { draggable: !1, src: f })), E), []), this.element.appendChild(n), r.appendChild(a), this.element.appendChild(r), this._createdEl.push(n);
    else {
      const [E, f] = this.images;
      n = E, n.setAttribute("draggable", !1), a = f.cloneNode(!0), a.setAttribute("draggable", !1), r.appendChild(a), f.parentNode.replaceChild(r, f), this._originalEl.push(f);
    }
    this._createdEl.push(r);
    let h, o;
    t.beforeLabel !== "" && (h = _(e, { class: "ba-label ba-label-one" }), h.innerHTML = t.beforeLabel, this.element.appendChild(h), this._createdEl.push(h)), t.afterLabel !== "" && (o = _(e, { class: "ba-label ba-label-two" }), o.innerHTML = t.afterLabel, this.element.appendChild(o), this._createdEl.push(o)), this.info1 = t.ltr ? h : o, this.info2 = t.ltr ? o : h;
    const u = _(
      e,
      {
        class: t.dragElementClass + " " + (this._horizontal ? "horizontal" : "vertical")
      },
      { zIndex: 5 }
    ), c = _(e, { class: "ba-line ba-line-1" }), H = _(e, { class: "ba-line ba-line-2" }), N = _(e, { class: "ba-circle" });
    u.appendChild(c), u.appendChild(H), u.appendChild(N), this.element.appendChild(u), this._createdEl.push(u), this.element.style.visibility = "visible", this._dragHandle = u, this._clipEl = r;
  }
  /**
   * Method to remove or add mouse events
   *
   * @param {Boolean} add true or false
   */
  _mouseStartEvents(t = !0) {
    const e = (t ? "add" : "remove") + "EventListener", n = this.settings;
    if (n.followMouse) {
      const a = this.element;
      a[e]("mouseenter", this._mouseOver, !1), a[e]("mouseleave", this._mouseOut, !1), a[e]("mousemove", this._mouseMove, !1);
    } else
      this._dragEl[e](v, this._dragStart), n.onlyHandleDraggable && n.clickable && (this.element[e](v, this._tapstart, !1), this.element[e]("mouseup", this._dragEnd, !1));
  }
  /**
   * Method to remove or add touch events
   *
   * @param {Boolean} add true or false
   */
  _touchStartEvent(t = !0) {
    const e = (t ? "add" : "remove") + "EventListener";
    this._dragEl[e]("touchstart", this._dragStart, m), this.settings.clickable && (this.element[e]("touchstart", this._tapstart, !1), this.element[e]("touchend", this._dragEnd, !1));
  }
  _appEvents(t = !0) {
    const e = (t ? "add" : "remove") + "EventListener";
    this._touchStartEvent(t), this._mouseStartEvents(t), window[e](Y, this._dimensions), this[e](I, this._interactionEnd);
  }
  // TODO: jumpToEnd parameter?
  _stopAni() {
    this._renderId && (window.cancelAnimationFrame(this._renderId), this._renderId = void 0, this._timing.then = this._timing.curTime = 0);
  }
  _testInteractionEnd() {
    this._endInteraction && this._renderId === void 0 && (this._endInteraction = !1, this._triggerEvent(I));
  }
  /**
   *
   * @param {float} from the from percent value
   * @param {float} to the to percent value
   * @param {float} delta the delta percent value
   * @returns {boolean} true if stopped
   */
  _renderLoop(t, e, n) {
    const a = () => {
      const r = (/* @__PURE__ */ new Date()).getTime(), h = r - (this._timing.then || r);
      if (this._timing.curTime += h, this.progress = this._timing.curTime / this._animationDuration, this.progress >= 1) {
        this.progress = 1, this._setPosition(e), this._stopAni(), this._testInteractionEnd();
        return;
      }
      this._setPosition(t + n * this.easing(this.progress)), this._timing.then = r, this._renderId = window.requestAnimationFrame(a);
    };
    a();
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
    t = P(+t, 0, 100);
    const a = t - this._percent;
    if (!e) {
      this._setPosition(t);
      return;
    }
    this._animationDuration = e, this.easing = n || this.settings.animateEasing, this.progress = 0, this._timing.then = this._timing.curTime = 0, this._renderLoop(this._percent, t, a);
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
  _getClipRect(t) {
    return this._horizontal ? this._ltr ? `rect(0 ${t}px ${this.height}px 0)` : `rect(0 ${this.width}px ${this.height}px ${t}px)` : this._ltr ? `rect(0 ${this.width}px ${t}px 0)` : `rect(${t}px ${this.width}px ${this.height}px 0)`;
  }
  _changeStatus(t) {
    this._afterShown = t;
    let e = this._afterShown ? z : A;
    this._triggerEvent(e), this._triggerEvent(S), this._oneTime = !1;
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
    let a = this._ltr ? this._afterShown : !this._afterShown;
    t > 75 && (this._oneTime || !a) ? this._changeStatus(this._ltr) : t < 25 && (this._oneTime || a) && this._changeStatus(!this._ltr), this._triggerEvent(O);
  }
  /**
   * convert pixel position to percent from left
   * @param  {Object} pos The position object { x, y }
   * @return {Number}         The left percent value
   */
  _calcPercent(t) {
    let e = this._horizontal ? t.x : t.y;
    return e = P(e, this._minPos, this._maxPos), (e + this._offset) * 100 / this._dim;
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
  // public user function
  init() {
    if (this._initialized)
      return this;
    const t = this.settings;
    this._initialized = !0, this._oneTime = !0, this._afterShown = !1, this._ltr = !!t.ltr, this._horizontal = t.horizontal, this._createGui(), this._timing = { time: 0, curTime: 0 }, this._dragEl = t.onlyHandleDraggable ? this._dragHandle : this.element, this._animationDuration = t.animateInDuration || 0, t.startPos || (t.startPos = 0), t.animateStartPos || (t.animateStartPos = 0), this._percent = this._animationDuration > 0 ? t.animateStartPos : t.startPos, this.element.style.opacity = 0, this.isTouch = "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch || navigator.maxTouchPoints > 0 || window.navigator.msMaxTouchPoints > 0, this.allowedEvents.forEach((e) => {
      t[e] && this.addEventListener(e, t[e]);
    }), W(this.images[0].src).then(() => {
      this._dimensions(), this._setPosition(this._percent), this.element.style.opacity = 1, this._animationDuration > 0 && this.settings.animateStartPos !== this.settings.startPos && setTimeout(
        () => this._animateTo(
          this.settings.startPos,
          this._animationDuration,
          this.settings.animateInEasing
        ),
        this.settings.animateInDelay
      ), this._appEvents(), this._triggerEvent(C), this._triggerEvent(S);
    });
  }
  goto(t, e, n) {
    if (isNaN(t) || (t = P(+t, 0, 100), t === this._percent))
      return !1;
    this._stopAni(), this._animateTo(t, e, n);
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
d.init = () => {
  if (D)
    return !0;
  D = !0;
  let s = document.querySelectorAll("[" + U + "]");
  return s.length === 0 ? !1 : (s.forEach((i) => {
    new d(i);
  }), p);
};
d.destroyAll = () => p.length ? (p.forEach((s) => {
  s.destroy();
}), D = !1, p = [], !0) : !1;
d.getInstance = (s) => x.get(s, "instance");
d.defaults = q;
R(d.init);
export {
  d as default
};
