/*!
* BeforeAfter v0.2.3
* undefined
*/
var N = Object.defineProperty;
var y = Object.getOwnPropertySymbols;
var x = Object.prototype.hasOwnProperty, k = Object.prototype.propertyIsEnumerable;
var P = (s, i, t) => i in s ? N(s, i, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[i] = t, O = (s, i) => {
  for (var t in i || (i = {}))
    x.call(i, t) && P(s, t, i[t]);
  if (y)
    for (var t of y(i))
      k.call(i, t) && P(s, t, i[t]);
  return s;
};
var o = (s, i, t) => (P(s, typeof i != "symbol" ? i + "" : i, t), t);
const W = {
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
}, z = (s) => {
  const i = "DOMContentLoaded";
  document.readyState === "complete" || document.readyState === "interactive" ? (s(), document.removeEventListener(i, s)) : document.addEventListener(i, s, !1);
}, F = (s) => new Promise((i, t) => {
  const e = new Image();
  e.onload = () => {
    const { naturalWidth: n, naturalHeight: r } = e, a = n / r;
    i({ width: n, height: r, ratio: a });
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
  } catch (a) {
  }
  if (typeof e != "object") {
    e = s.dataset[i];
    const a = {};
    e = e.replace(/[\\ \t\n\r]/g, ""), e = e.replace(/{?([^{])}?/g, "$1");
    const h = e.split(",");
    h.length > 1 ? h.forEach((l) => {
      if (l) {
        let [d, c] = l.split(":");
        c = c.replace(/'/g, ""), c === "true" ? c = !0 : c === "false" && (c = !1), a[d.replace(/'/g, "")] = c;
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
let _ = !1;
try {
  window.addEventListener(
    "test",
    null,
    Object.defineProperty({}, "passive", {
      get: function() {
        return _ = { passive: !1 }, !1;
      }
    })
  );
} catch (s) {
  _ = !1;
}
const v = (s, i, t) => {
  if (s = parseFloat(s, 10), i = parseFloat(i, 10), t = parseFloat(t, 10), t < i) {
    let e = t;
    t = i, i = e;
  }
  return !isNaN(i) && s < i ? i : !isNaN(t) && s > t ? t : s;
}, R = (s, i, t, e) => {
  if (i)
    for (let n in i)
      Object.prototype.hasOwnProperty.call(i, n) && s.setAttribute(n, i[n]);
  if (t)
    for (let n in t)
      Object.prototype.hasOwnProperty.call(t, n) && (s.style[n] = t[n]);
  return e && (s.innerHTML = e), s;
}, g = (s, i, t, e) => R(document.createElement(s), i, t, e), C = {
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
}, $ = {
  autoInit: !0,
  beforeImage: null,
  afterImage: null,
  followMouse: !1,
  // mouse move interaction (desktop only)
  onlyHandleDraggable: !1,
  clickable: !1,
  // only works if onlyHandleDraggable is set to true
  snapToStart: !1,
  // after mouseout or drag stop handle jumps to start position
  snapToStartDelay: 250,
  // snapToStartDelayTap: 10, // todo
  ltr: !0,
  handleMinDistance: 0,
  // min distance to left and right border in px
  dragElementClass: "beforeafter-handle",
  dragCallback: null,
  // todo
  // animateIn: true,
  animateInDuration: 1250,
  // ms
  animateInEasing: C.Elastic.easeOut,
  animateInDelay: 100,
  // in ms
  animateStartPos: 40,
  // % from left
  startPos: 50,
  // % from left
  // clickAnimate: true,
  animateDuration: 250,
  // ms
  animateEasing: C.Cubic.easeOut,
  // showLabels: false,
  beforeLabel: "",
  // before Image
  afterLabel: "",
  // after Image
  beforeDescription: "",
  // before Image
  afterDescription: "",
  // after Image
  showToggleButton: !1,
  toggleBeforeText: "show before",
  toggleAfterText: "show after"
}, G = (s, i, t) => {
  let e = s.getAttribute("on" + i);
  new Function(
    "e",
    // 'with(document) {' +
    // 'with(this)' +
    "{" + e + "}"
    // + '}'
  ).call(s, t);
};
class B {
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
    e && e.forEach((a) => a.call(this, r)), this.element && (this.element.dispatchEvent(r), G(this.element, i, r));
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
const b = "beforeafter", q = "data-" + b, m = "interacting", A = "init", M = "drag", H = "update", L = "viewchanged", T = "beforeshown", I = "aftershown", S = "interactionend", w = "mousedown", U = "resize";
let p = [], D = !1;
class f extends B {
  constructor(t, e) {
    if (!t)
      return { error: !0 };
    if (t = typeof t == "string" ? document.querySelector(t) : t, t === null || t.length === 0)
      return { error: !0 };
    super();
    o(this, "_interactionEnd", () => {
      this.element.classList.remove(m), this.isTouch ? this._mouseStartEvents() : this._touchStartEvent(), this.settings.snapToStart && this._snapToStart();
    });
    o(this, "_dimensions", () => {
      this.elementWidth = this.element.offsetWidth, this.elementOffsetLeft = this.offsetElements.map((t) => t.offsetLeft).reduce((t, e) => t + e), this.dragHandleWidth = this.dragHandle.offsetWidth, this.minLeftPos = this.elementOffsetLeft + this.settings.handleMinDistance - this.dragHandleWidth / 2, this.maxLeftPos = this.elementOffsetLeft + this.elementWidth - this.dragHandleWidth / 2 - this.settings.handleMinDistance, this.elementHeight = this.element.offsetHeight, this.oldElementWidth !== this.elementWidth && (this.oldElementWidth = this.elementWidth, this._setPosition(this.currentPercent, !0));
    });
    o(this, "_mouseOver", () => {
      this._stopAni(), this.element.classList.add(m);
    });
    o(this, "_mouseOut", () => {
      this.element.classList.remove(m), this.settings.snapToStart && this._snapToStart();
    });
    o(this, "_mouseMove", (t) => {
      this._stopAni();
      let e = this._getPos(t), n = this._calcLeftPercent(e.x);
      this._setPosition(n);
    });
    // if tapped on canvas
    o(this, "_tapstart", (t) => {
      this._endInteraction = !1, this._stopAni(), clearTimeout(this.snapTimeout), t.type === "touchstart" ? (this.isTouch = !0, this._mouseStartEvents(!1)) : w === t.type && (this.isTouch = !1, this._touchStartEvent(!1));
      const e = this._calcLeftPercent(this._getPos(t).x);
      this._animateTo(e, this.settings.animateDuration);
    });
    o(this, "_dragStart", (t) => {
      t.stopPropagation(), this.startPos = this._getPos(t), this.element.classList.add(m), this._tapstart(t), t.type === "touchstart" ? (window.addEventListener("touchmove", this._drag, _), window.addEventListener("touchend", this._dragEnd, !1)) : w === t.type && (this.settings.followMouse || (window.addEventListener("mousemove", this._drag, !1), window.addEventListener("mouseup", this._dragEnd, !1)));
    });
    // moving
    o(this, "_drag", (t) => {
      this._stopAni();
      let e = this._getPos(t), n = this._calcLeftPercent(e.x);
      if (this.isTouch) {
        t.preventDefault();
        const r = Math.abs(this.startPos.x - e.x), a = Math.abs(this.startPos.y - e.y);
        if (!this.dirDetected) {
          if (a > r) {
            this.element.classList.remove(m), window.removeEventListener(
              "touchmove",
              this._drag,
              _
            );
            return;
          }
          this.element.classList.add(m), this.dirDetected = !0;
        }
      }
      this._setPosition(n), this._triggerEvent(M);
    });
    o(this, "_dragEnd", (t) => {
      this._endInteraction = !0, t.type === "touchend" ? (this.isTouch = !0, window.removeEventListener("touchmove", this._drag, _), window.removeEventListener("touchend", this._dragEnd)) : t.type === "mouseup" && (this.isTouch = !1, this.settings.followMouse || (window.removeEventListener("mousemove", this._drag, !1), window.removeEventListener("mouseup", this._dragEnd, !1))), this._testInteractionEnd(), this.dirDetected = !1;
    });
    if (t.dataset.bainitialized)
      return f.getInstance(t);
    t.dataset.bainitialized = !0, this.allowedEvents = [
      A,
      M,
      H,
      T,
      I,
      S,
      L
    ], p.push(this), W.put(t, "instance", this), this.element = t;
    const n = j(t, b);
    if (this.options = e || {}, this.settings = Object.assign({}, f.defaults, n, e), this.images = this.element.querySelectorAll("img"), (!this.settings.beforeImage || !this.settings.afterImage) && (!this.images || !this.images.length))
      return {
        error: !0
      };
    this.element.classList.contains(b) || this.element.classList.add(b), this.snapTimeout = null, this.dirDetected = !1, this.settings.autoInit && this.init();
  }
  _triggerEvent(t, e) {
    e = O({
      instance: this,
      percent: this.currentPercent,
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
    this.originalElements = [], this.createdElements = [];
    const e = "div";
    let n, r;
    const a = g(e, { class: "clipSlider" });
    if (t.beforeImage || t.afterImage)
      this.images = [n, r] = [
        t.beforeImage,
        t.afterImage
      ].reduce((E, u) => (E.push(g("img", { draggable: !1, src: u })), E), []), this.element.append(n), a.append(r), this.element.append(a), this.createdElements.push(n);
    else {
      const [E, u] = this.images;
      n = E, n.setAttribute("draggable", !1), r = u.cloneNode(!0), r.setAttribute("draggable", !1), a.append(r), u.parentNode.replaceChild(a, u), this.originalElements.push(u);
    }
    this.createdElements.push(a);
    let h, l;
    t.beforeLabel !== "" && (h = g(e, { class: "label label-one" }), h.innerHTML = t.beforeLabel, this.element.appendChild(h), this.createdElements.push(h)), t.afterLabel !== "" && (l = g(e, { class: "label label-two" }), l.innerHTML = t.afterLabel, this.element.appendChild(l), this.createdElements.push(l)), this.info1 = t.ltr ? h : l, this.info2 = t.ltr ? l : h;
    const d = g(e, { class: t.dragElementClass }, { zIndex: 5 }), c = g(e);
    d.appendChild(c), this.element.appendChild(d), this.createdElements.push(d), this.element.style.visibility = "visible", this.dragHandle = d, this.clippingElement = a;
  }
  /**
   * Method to remove or add mouse events
   *
   * @param {Boolean} add true or false
   */
  _mouseStartEvents(t = !0) {
    const e = (t ? "add" : "remove") + "EventListener", n = this.settings;
    if (n.followMouse) {
      const r = this.element;
      r[e]("mouseenter", this._mouseOver, !1), r[e]("mouseleave", this._mouseOut, !1), r[e]("mousemove", this._mouseMove, !1);
    } else
      this.dragElementTrigger[e](w, this._dragStart), n.onlyHandleDraggable && n.clickable && (this.element[e](w, this._tapstart, !1), this.element[e]("mouseup", this._dragEnd, !1));
  }
  /**
   * Method to remove or add touch events
   *
   * @param {Boolean} add true or false
   */
  _touchStartEvent(t = !0) {
    const e = (t ? "add" : "remove") + "EventListener";
    this.dragElementTrigger[e](
      "touchstart",
      this._dragStart,
      _
    ), this.settings.clickable && (this.element[e]("touchstart", this._tapstart, !1), this.element[e]("touchend", this._dragEnd, !1));
  }
  _appEvents(t) {
    const e = (t ? "add" : "remove") + "EventListener";
    this._touchStartEvent(t), this._mouseStartEvents(t), window[e](U, this._dimensions), this[e](S, this._interactionEnd);
  }
  // TODO: jumpToEnd parameter?
  _stopAni() {
    this._renderId && (window.cancelAnimationFrame(this._renderId), this._renderId = void 0, this.timing.then = this.timing.curTime = 0);
  }
  _testInteractionEnd() {
    this._endInteraction && this._renderId === void 0 && (this._endInteraction = !1, this._triggerEvent(S));
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
      const a = (/* @__PURE__ */ new Date()).getTime(), h = a - (this.timing.then || a);
      if (this.timing.curTime += h, this.progress = this.timing.curTime / this._animationDuration, this.progress >= 1) {
        this.progress = 1, this._setPosition(e), this._stopAni(), this._testInteractionEnd();
        return;
      }
      this._setPosition(t + n * this.easing(this.progress)), this.timing.then = a, this._renderId = window.requestAnimationFrame(r);
    };
    r();
  }
  /**
   * Method to animate to the given percentage
   *
   * @param {float} percent The percentage to move to (0 - 100)
   * @param {int} duration The duration in ms (e.g. 250)
   * @param {Object} easing The the easing function
   * @returns
   */
  _animateTo(t, e, n) {
    if (t = v(+t, 0, 100), this._delta = t - this.currentPercent, !e) {
      this._setPosition(t);
      return;
    }
    this._animationDuration = e, this.easing = n || this.settings.animateEasing, this.progress = 0, this.timing.then = this.timing.curTime = 0, this._renderLoop(this.currentPercent, t, this._delta);
  }
  _snapToStart(t = this.settings.snapToStartDelay) {
    this._stopAni(), this.snapTimeout = setTimeout(() => {
      this._animateTo(
        this.settings.startPos,
        this.settings.animateDuration,
        this.settings.animateEasing
      );
    }, t);
  }
  _getOffsetElements() {
    const t = [this.element];
    let e = this.element.offsetParent;
    if (!e)
      return t;
    do {
      if (t.push(e), !e.offsetParent)
        break;
      e = e.offsetParent;
    } while (e.nodeName !== "BODY");
    return t;
  }
  _changeStatus(t) {
    this._afterShown = t;
    let e = this._afterShown ? this.settings.ltr ? I : T : this.settings.ltr ? T : I;
    this._triggerEvent(e), this._triggerEvent(L), this._oneTime = !1;
  }
  /**
   * set the handle to a defined position (in percent from left)
   * @param {Number} percent Percent of the new handle position from left
   */
  _setPosition(t, e = !1) {
    if (t === this.currentPercent && !e)
      return !1;
    this.currentPercent = t;
    let n = this.elementWidth * t * 0.01, r = `rect(0 ${n}px ${this.elementHeight}px 0)`, a = `rect(0 ${this.elementWidth}px ${this.elementHeight}px ${n}px)`, h;
    this._clipFromLeft || (h = r, r = a, a = h), this.info1 && (this.info1.style.opacity = t < 50 ? 1 : (100 - t) / 50), this.info2 && (this.info2.style.opacity = t > 50 ? 1 : t / 50), this.clippingElement.style.clipPath = r, this.dragHandle.style.transform = `translate(${n}px, 0)`, t > 75 && (!this._afterShown || this._oneTime) ? this._changeStatus(!0) : t < 25 && (this._afterShown || this._oneTime) && this._changeStatus(!1), this._triggerEvent(H);
  }
  /**
   * convert pixel position to percent from left
   * @param  {Number} leftPos The left ('px') value
   * @return {Number}         The left percent value
   */
  _calcLeftPercent(t) {
    return t = v(t, this.minLeftPos, this.maxLeftPos), (t + this.dragHandleWidth * 0.5 - this.elementOffsetLeft) * 100 / this.elementWidth;
  }
  /**
   * convert percent to left pixel value
   * @param  {Number} leftPercent The left percent value
   * @return {Number}             The left ('px') value
   */
  _calcLeftValue(t) {
    return v(t, 0, 100) * 0.01 * this.elementWidth + this.elementOffsetLeft - this.dragHandleWidth * 0.5;
  }
  // public user function
  init() {
    if (this._initialized)
      return this;
    const t = this.settings;
    this._initialized = !0, this._oneTime = !0, this._afterShown = !1, this._clipFromLeft = !!t.ltr, this._createGui(), this.offsetElements = this._getOffsetElements(), this.timing = { time: 0, curTime: 0 }, this.dragElementTrigger = t.onlyHandleDraggable ? this.dragHandle : this.element, this._animationDuration = t.animateInDuration || 0, t.startPos || (t.startPos = 0), t.animateStartPos || (t.animateStartPos = 0), this.currentPercent = this._animationDuration > 0 ? t.animateStartPos : t.startPos, this.element.style.opacity = 0, this.isTouch = "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch || navigator.maxTouchPoints > 0 || window.navigator.msMaxTouchPoints > 0, F(this.images[0].src).then((e) => {
      this.imageDimensions = e, this._dimensions(), this._setPosition(this.currentPercent), this.element.style.opacity = 1, this._animationDuration > 0 && this.settings.animateStartPos !== this.settings.startPos && setTimeout(
        () => this._animateTo(
          this.settings.startPos,
          this._animationDuration,
          this.settings.animateInEasing
        ),
        this.settings.animateInDelay
      ), this._appEvents(), this._triggerEvent(A), this._triggerEvent(L);
    });
  }
  goto(t, e, n) {
    if (isNaN(t) || (t = v(+t, 0, 100), t === this.currentPercent))
      return !1;
    this._stopAni(), this._animateTo(t, e, n);
  }
  showAfter() {
    this._setPosition(100);
  }
  showBefore() {
    this._setPosition(0);
  }
  get elem() {
    return this.element;
  }
  toggle() {
    this._stopAni(), this._afterShown ? this.showBefore() : this.showAfter();
  }
  destroy() {
    this.element.removeAttribute("data-bainitialized"), this.createdElements.forEach((t) => this.element.removeChild(t)), this.originalElements.forEach((t) => this.element.appendChild(t)), this.createdElements = [], this.originalElements = [], this._appEvents(!1), this._initialized = !1;
  }
}
f.init = () => {
  if (D)
    return !0;
  D = !0;
  let s = document.querySelectorAll("[" + q + "]");
  return s.length === 0 ? !1 : (s.forEach((i) => {
    new f(i);
  }), p);
};
f.destroyAll = () => p.length ? (p.forEach((s) => {
  s.destroy();
}), D = !1, p = [], !0) : !1;
f.getInstance = (s) => W.get(s, "instance");
f.defaults = $;
z(f.init);
export {
  f as default
};
