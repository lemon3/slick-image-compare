/*!
* BeforeAfter v0.2.3
* undefined
*/
var N = Object.defineProperty;
var I = Object.getOwnPropertySymbols;
var F = Object.prototype.hasOwnProperty, k = Object.prototype.propertyIsEnumerable;
var P = (s, i, t) => i in s ? N(s, i, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[i] = t, D = (s, i) => {
  for (var t in i || (i = {}))
    F.call(i, t) && P(s, t, i[t]);
  if (I)
    for (var t of I(i))
      k.call(i, t) && P(s, t, i[t]);
  return s;
};
var o = (s, i, t) => (P(s, typeof i != "symbol" ? i + "" : i, t), t);
const H = {
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
}, $ = (s) => {
  const i = "DOMContentLoaded";
  document.readyState === "complete" || document.readyState === "interactive" ? (s(), document.removeEventListener(i, s)) : document.addEventListener(i, s, !1);
}, R = (s) => new Promise((i, t) => {
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
    h.length > 1 ? h.forEach((l) => {
      if (l) {
        let [u, c] = l.split(":");
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
}, X = (s, i, t, e) => {
  if (i)
    for (let n in i)
      Object.prototype.hasOwnProperty.call(i, n) && s.setAttribute(n, i[n]);
  if (t)
    for (let n in t)
      Object.prototype.hasOwnProperty.call(t, n) && (s.style[n] = t[n]);
  return e && (s.innerHTML = e), s;
}, f = (s, i, t, e) => X(document.createElement(s), i, t, e), y = {
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
}, B = {
  autoInit: !0,
  beforeImage: null,
  afterImage: null,
  followMouse: !1,
  // mouse move interaction (desktop only)
  onlyHandleDraggable: !1,
  clickable: !1,
  // only works if onlyHandleDraggable is set to true
  snapToStart: !1,
  // after mouse out or drag stop handle jumps to start position
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
  animateInEasing: y.Elastic.easeOut,
  animateInDelay: 100,
  // in ms
  animateStartPos: 40,
  // % from left
  startPos: 50,
  // % from left
  // clickAnimate: true,
  animateDuration: 250,
  // ms
  animateEasing: y.Cubic.easeOut,
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
class q {
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
    e && e.forEach((r) => r.call(this, a)), this.element && (this.element.dispatchEvent(a), G(this.element, i, a));
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
const b = "beforeafter", U = "data-" + b, m = "interacting", C = "init", A = "drag", M = "update", T = "viewchanged", O = "beforeshown", W = "aftershown", L = "interactionend", w = "mousedown", Y = "resize";
let p = [], S = !1;
class d extends q {
  constructor(t, e) {
    if (!t)
      return { error: !0 };
    if (t = typeof t == "string" ? document.querySelector(t) : t, t === null || t.length === 0)
      return { error: !0 };
    super();
    o(this, "_interactionEnd", () => {
      this.element.classList.remove(m), this.isTouch ? this._mouseStartEvents() : this._touchStartEvent(), this.settings.snapToStart && this._snapToStart();
    });
    o(this, "_dimensions", (t) => {
      const e = this.element.getBoundingClientRect(), n = getComputedStyle(this.element), a = parseFloat(n.borderLeftWidth) + parseFloat(n.borderRightWidth), r = parseFloat(n.borderTopWidth) + parseFloat(n.borderBottomWidth);
      this.elementWidth = e.width - a, this.elementHeight = e.height - r, this.elementX = e.x, this.elementDim = (this._horizontal ? this.elementWidth : this.elementHeight) * 0.01, this.dragHandleWidth = this.dragHandle.offsetWidth, this.minLeftPos = this.elementX + this.settings.handleMinDistance - this.dragHandleWidth / 2, this.maxLeftPos = this.elementX + this.elementWidth - this.dragHandleWidth / 2 - this.settings.handleMinDistance, !(!t && this.oldElementWidth === this.elementWidth) && (this.oldElementWidth = this.elementWidth, this._setPosition(this.currentPercent, !0));
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
        const a = Math.abs(this.startPos.x - e.x), r = Math.abs(this.startPos.y - e.y);
        if (!this.dirDetected) {
          if (r > a) {
            console.log("scroll down or up"), this.element.classList.remove(m), window.removeEventListener(
              "touchmove",
              this._drag,
              _
            );
            return;
          }
          this.element.classList.add(m), this.dirDetected = !0;
        }
      }
      this._setPosition(n), this._triggerEvent(A);
    });
    o(this, "_dragEnd", (t) => {
      this._endInteraction = !0, t.type === "touchend" ? (this.isTouch = !0, window.removeEventListener("touchmove", this._drag, _), window.removeEventListener("touchend", this._dragEnd)) : t.type === "mouseup" && (this.isTouch = !1, this.settings.followMouse || (window.removeEventListener("mousemove", this._drag, !1), window.removeEventListener("mouseup", this._dragEnd, !1))), this._testInteractionEnd(), this.dirDetected = !1;
    });
    if (t.dataset.bainitialized)
      return d.getInstance(t);
    t.dataset.bainitialized = !0, this.allowedEvents = [
      C,
      A,
      M,
      O,
      W,
      L,
      T
    ], p.push(this), H.put(t, "instance", this), this.element = t;
    const n = j(t, b);
    if (this.options = e || {}, this.settings = Object.assign({}, d.defaults, n, e), this.images = this.element.querySelectorAll("img"), (!this.settings.beforeImage || !this.settings.afterImage) && (!this.images || !this.images.length))
      return {
        error: !0
      };
    this.element.classList.contains(b) || this.element.classList.add(b), this.snapTimeout = null, this.dirDetected = !1, this.settings.autoInit && this.init();
  }
  _triggerEvent(t, e) {
    e = D({
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
    let n, a;
    const r = f(e, { class: "clipSlider" });
    if (t.beforeImage || t.afterImage)
      this.images = [n, a] = [
        t.beforeImage,
        t.afterImage
      ].reduce((E, g) => (E.push(f("img", { draggable: !1, src: g })), E), []), this.element.appendChild(n), r.appendChild(a), this.element.appendChild(r), this.createdElements.push(n);
    else {
      const [E, g] = this.images;
      n = E, n.setAttribute("draggable", !1), a = g.cloneNode(!0), a.setAttribute("draggable", !1), r.appendChild(a), g.parentNode.replaceChild(r, g), this.originalElements.push(g);
    }
    this.createdElements.push(r);
    let h, l;
    t.beforeLabel !== "" && (h = f(e, { class: "label label-one" }), h.innerHTML = t.beforeLabel, this.element.appendChild(h), this.createdElements.push(h)), t.afterLabel !== "" && (l = f(e, { class: "label label-two" }), l.innerHTML = t.afterLabel, this.element.appendChild(l), this.createdElements.push(l)), this.info1 = t.ltr ? h : l, this.info2 = t.ltr ? l : h;
    const u = f(
      e,
      {
        class: t.dragElementClass + " " + (this._horizontal ? "horizontal" : "vertical")
      },
      { zIndex: 5 }
    ), c = f(e, { class: "line line-1" }), x = f(e, { class: "line line-2" }), z = f(e, { class: "circle" });
    u.appendChild(c), u.appendChild(x), u.appendChild(z), this.element.appendChild(u), this.createdElements.push(u), this.element.style.visibility = "visible", this.dragHandle = u, this.clippingElement = r;
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
  _appEvents(t = !0) {
    const e = (t ? "add" : "remove") + "EventListener";
    this._touchStartEvent(t), this._mouseStartEvents(t), window[e](Y, this._dimensions), this[e](L, this._interactionEnd);
  }
  // TODO: jumpToEnd parameter?
  _stopAni() {
    this._renderId && (window.cancelAnimationFrame(this._renderId), this._renderId = void 0, this.timing.then = this.timing.curTime = 0);
  }
  _testInteractionEnd() {
    this._endInteraction && this._renderId === void 0 && (this._endInteraction = !1, this._triggerEvent(L));
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
      const r = (/* @__PURE__ */ new Date()).getTime(), h = r - (this.timing.then || r);
      if (this.timing.curTime += h, this.progress = this.timing.curTime / this._animationDuration, this.progress >= 1) {
        this.progress = 1, this._setPosition(e), this._stopAni(), this._testInteractionEnd();
        return;
      }
      this._setPosition(t + n * this.easing(this.progress)), this.timing.then = r, this._renderId = window.requestAnimationFrame(a);
    };
    a();
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
  _getClipRect(t) {
    return this._horizontal ? this._clipFromLeft ? `rect(0 ${t}px ${this.elementHeight}px 0)` : `rect(0 ${this.elementWidth}px ${this.elementHeight}px ${t}px)` : this._clipFromLeft ? `rect(0 ${this.elementWidth}px ${t}px 0)` : `rect(${t}px ${this.elementWidth}px ${this.elementHeight}px 0)`;
  }
  _changeStatus(t) {
    this._afterShown = t;
    let e = this._afterShown ? W : O;
    this._triggerEvent(e), this._triggerEvent(T), this._oneTime = !1;
  }
  /**
   * set the handle to a defined position (in percent from left)
   * @param {Number} percent Percent of the new handle position from left
   */
  _setPosition(t, e = !1) {
    if (t === this.currentPercent && !e)
      return !1;
    this.currentPercent = t;
    const n = this.elementDim * t;
    this.clippingElement.style.clipPath = this._getClipRect(n), this.dragHandle.style.transform = this._horizontal ? `translate(${n}px, 0)` : `translate(0, ${n}px)`, this.info1 && (this.info1.style.opacity = t < 50 ? 1 : (100 - t) / 50), this.info2 && (this.info2.style.opacity = t > 50 ? 1 : t / 50);
    let a = this.settings.ltr ? this._afterShown : !this._afterShown;
    t > 75 && (this._oneTime || !a) ? this._changeStatus(this.settings.ltr) : t < 25 && (this._oneTime || a) && this._changeStatus(!this.settings.ltr), this._triggerEvent(M);
  }
  /**
   * convert pixel position to percent from left
   * @param  {Number} leftPos The left ('px') value
   * @return {Number}         The left percent value
   */
  _calcLeftPercent(t) {
    return t = v(t, this.minLeftPos, this.maxLeftPos), (t + this.dragHandleWidth * 0.5 - this.elementX) * 100 / this.elementWidth;
  }
  /**
   * convert percent to left pixel value
   * @param  {Number} leftPercent The left percent value
   * @return {Number}             The left ('px') value
   */
  _calcLeftValue(t) {
    return v(t, 0, 100) * 0.01 * this.elementWidth + this.elementX - this.dragHandleWidth * 0.5;
  }
  // public user function
  init() {
    if (this._initialized)
      return this;
    const t = this.settings;
    this._initialized = !0, this._oneTime = !0, this._afterShown = !1, this._clipFromLeft = !!t.ltr, this._horizontal = t.horizontal, this._createGui(), this.timing = { time: 0, curTime: 0 }, this.dragElementTrigger = t.onlyHandleDraggable ? this.dragHandle : this.element, this._animationDuration = t.animateInDuration || 0, t.startPos || (t.startPos = 0), t.animateStartPos || (t.animateStartPos = 0), this.currentPercent = this._animationDuration > 0 ? t.animateStartPos : t.startPos, this.element.style.opacity = 0, this.isTouch = "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch || navigator.maxTouchPoints > 0 || window.navigator.msMaxTouchPoints > 0, R(this.images[0].src).then((e) => {
      this.imageDimensions = e, this._dimensions(), this._setPosition(this.currentPercent), this.element.style.opacity = 1, this._animationDuration > 0 && this.settings.animateStartPos !== this.settings.startPos && setTimeout(
        () => this._animateTo(
          this.settings.startPos,
          this._animationDuration,
          this.settings.animateInEasing
        ),
        this.settings.animateInDelay
      ), this._appEvents(), this._triggerEvent(C), this._triggerEvent(T);
    });
  }
  goto(t, e, n) {
    if (isNaN(t) || (t = v(+t, 0, 100), t === this.currentPercent))
      return !1;
    this._stopAni(), this._animateTo(t, e, n);
  }
  changeDirection() {
    const t = this._horizontal;
    this._horizontal = !t, this.dragHandle.classList.remove(t ? "horizontal" : "vertical"), this.dragHandle.classList.add(this._horizontal ? "horizontal" : "vertical"), this._dimensions(!0);
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
d.init = () => {
  if (S)
    return !0;
  S = !0;
  let s = document.querySelectorAll("[" + U + "]");
  return s.length === 0 ? !1 : (s.forEach((i) => {
    new d(i);
  }), p);
};
d.destroyAll = () => p.length ? (p.forEach((s) => {
  s.destroy();
}), S = !1, p = [], !0) : !1;
d.getInstance = (s) => H.get(s, "instance");
d.defaults = B;
$(d.init);
export {
  d as default
};
