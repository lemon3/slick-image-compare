/*!
* BeforeAfter v0.2.1
* undefined
*/
var W = Object.defineProperty;
var N = (s, i, t) => i in s ? W(s, i, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[i] = t;
var c = (s, i, t) => (N(s, typeof i != "symbol" ? i + "" : i, t), t);
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
}, k = (s) => {
  const i = "DOMContentLoaded";
  document.readyState === "complete" || document.readyState === "interactive" ? (s(), document.removeEventListener(i, s)) : document.addEventListener(i, s, !1);
}, F = (s) => new Promise((i, t) => {
  const e = new Image();
  e.onload = () => {
    const { naturalWidth: n, naturalHeight: a } = e, r = n / a;
    i({ width: n, height: a, ratio: r });
  }, e.onerror = () => {
    t("error");
  }, e.src = s;
}), z = (s, i, t = null) => {
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
    const o = e.split(",");
    o.length > 1 ? o.forEach((g) => {
      if (g) {
        let [E, l] = g.split(":");
        l = l.replace(/'/g, ""), l === "true" ? l = !0 : l === "false" && (l = !1), r[E.replace(/'/g, "")] = l;
      }
    }) : r[i] = e, e = r;
  }
  let n = {}, a = i.length;
  return Object.entries(s.dataset).forEach((r) => {
    if (r[0].toLowerCase().indexOf(i) >= 0 && r[0].length > a) {
      let o = r[0][a].toLowerCase() + r[0].substring(a + 1);
      (t === null || t && t[o] !== void 0) && (n[o] = r[1]);
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
const w = (s, i, t) => {
  if (s = parseFloat(s, 10), i = parseFloat(i, 10), t = parseFloat(t, 10), t < i) {
    let e = t;
    t = i, i = e;
  }
  return !isNaN(i) && s < i ? i : !isNaN(t) && s > t ? t : s;
}, R = (s, i) => {
  if (!s || !i && !s)
    return !1;
  if (s && !i)
    return s;
  s[0] === void 0 && (s = [s]);
  const t = s[0], e = t.parentNode;
  return e && e.insertBefore(i, t), s.forEach((n) => {
    i.appendChild(n);
  }), i;
}, j = (s, i, t, e) => {
  if (i)
    for (let n in i)
      Object.prototype.hasOwnProperty.call(i, n) && s.setAttribute(n, i[n]);
  if (t)
    for (let n in t)
      Object.prototype.hasOwnProperty.call(t, n) && (s.style[n] = t[n]);
  return e && (s.innerHTML = e), s;
}, f = (s, i, t, e) => j(document.createElement(s), i, t, e), y = {
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
  afterOnTheRight: !1,
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
  // showInfo: false,
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
const P = "beforeafter", Y = "data-" + P, u = "interacting", A = "init", C = "drag", M = "update", I = "beforeshown", S = "aftershown", T = "interactionend", L = "mousedown", x = "resize";
let _ = [], O = !1;
class d extends X {
  constructor(t, e) {
    if (!t)
      return { error: !0 };
    if (t = typeof t == "string" ? document.querySelector(t) : t, t === null || t.length === 0)
      return { error: !0 };
    super();
    c(this, "_interactionEnd", () => {
      this.element.classList.remove(u), this.isTouch ? this._mouseStartEvents() : this._touchStartEvent(), this.settings.snapToStart && this._snapToStart();
    });
    c(this, "_dimensions", () => {
      this.elementWidth = this.canvas.offsetWidth, this.elementOffsetLeft = this.offsetElements.map((t) => t.offsetLeft).reduce((t, e) => t + e), this.dragHandleWidth = this.dragHandle.offsetWidth, this.minLeftPos = this.elementOffsetLeft + this.settings.handleMinDistance - this.dragHandleWidth / 2, this.maxLeftPos = this.elementOffsetLeft + this.elementWidth - this.dragHandleWidth / 2 - this.settings.handleMinDistance, this.elementHeight = this.canvas.offsetHeight, this.oldElementWidth !== this.elementWidth && (this.oldElementWidth = this.elementWidth, this._setPosition(this.currentPercent, !0));
    });
    c(this, "_mouseOver", () => {
      this._stopAni(), this.element.classList.add(u);
    });
    c(this, "_mouseOut", () => {
      this.element.classList.remove(u), this.settings.snapToStart && this._snapToStart();
    });
    c(this, "_mouseMove", (t) => {
      this._stopAni();
      let e = this._getPos(t), n = this._calcLeftPercent(e.x);
      this._setPosition(n);
    });
    // if tapped on canvas
    c(this, "_tapstart", (t) => {
      this._endInteraction = !1, this._stopAni(), clearTimeout(this.snapTimeout), t.type === "touchstart" ? (this.isTouch = !0, this._mouseStartEvents(!1)) : L === t.type && (this.isTouch = !1, this._touchStartEvent(!1));
      const e = this._calcLeftPercent(this._getPos(t).x);
      this._animateTo(e, this.settings.animateDuration);
    });
    c(this, "_dragStart", (t) => {
      t.stopPropagation(), this.startPos = this._getPos(t), this.element.classList.add(u), this._tapstart(t), t.type === "touchstart" ? (window.addEventListener("touchmove", this._drag, m), window.addEventListener("touchend", this._dragEnd, !1)) : L === t.type && (this.settings.followMouse || (window.addEventListener("mousemove", this._drag, !1), window.addEventListener("mouseup", this._dragEnd, !1)));
    });
    // moving
    c(this, "_drag", (t) => {
      this._stopAni();
      let e = this._getPos(t), n = this._calcLeftPercent(e.x);
      if (this.isTouch && (t.preventDefault(), this.deltaX = Math.abs(this.startPos.x - e.x), this.deltaY = Math.abs(this.startPos.y - e.y), !this.dirDetected)) {
        if (this.deltaY > this.deltaX) {
          this.element.classList.remove(u), window.removeEventListener(
            "touchmove",
            this._drag,
            m
          );
          return;
        }
        this.element.classList.add(u), this.dirDetected = !0;
      }
      this._setPosition(n), this.emit(C, { percent: n });
    });
    c(this, "_dragEnd", (t) => {
      this._endInteraction = !0, t.type === "touchend" ? (this.isTouch = !0, window.removeEventListener("touchmove", this._drag, m), window.removeEventListener("touchend", this._dragEnd)) : t.type === "mouseup" && (this.isTouch = !1, this.settings.followMouse || (window.removeEventListener("mousemove", this._drag, !1), window.removeEventListener("mouseup", this._dragEnd, !1))), this._testInteractionEnd(), this.dirDetected = !1;
    });
    c(this, "toggleBeforeAfter", (t) => {
      t && t.stopPropagation(), this._stopAni(), this._afterShown ? this.showBefore() : this.showAfter();
    });
    if (t.dataset.bainitialized)
      return d.getInstance(t);
    t.dataset.bainitialized = !0, this.allowedEvents = [
      A,
      C,
      M,
      I,
      S,
      T
    ], _.push(this), H.put(t, "instance", this), this.element = t;
    const n = z(t, P);
    if (this.options = e || {}, this.settings = Object.assign({}, d.defaults, n, e), this.images = this.element.querySelectorAll("img"), (!this.settings.beforeImage || !this.settings.afterImage) && (!this.images || !this.images.length))
      return {
        error: !0
      };
    this.element.classList.contains(P) || this.element.classList.add(P), this.snapTimeout = null, this.deltaX = 0, this.deltaY = 0, this.dirDetected = !1, this.settings.autoInit && this.init();
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
    const e = "div", n = f(e, { class: "canvas" });
    this.createdElements.push(n);
    let a, r, o, g, E = !1;
    t.beforeImage || t.afterImage ? (E = !0, a = f("img", { draggable: !1 }), a.src = t.beforeImage, r = f("img", { draggable: !1 }), r.src = t.afterImage) : ([o, g] = this.originalElements = this.images, a = o.cloneNode(!0), a.setAttribute("draggable", !1), r = g.cloneNode(!0), r.setAttribute("draggable", !1));
    const l = f(
      e,
      { class: "clipSlider" },
      { zIndex: 2 }
    ), v = document.createDocumentFragment(), p = document.createDocumentFragment();
    v.appendChild(a), p.appendChild(r);
    let b;
    if (t.beforeLabel !== "") {
      const h = f(e, { class: "label left" });
      h.innerHTML = t.beforeLabel, b = f(e, { class: "clipSlider" }), b.append(h), p.appendChild(b);
    }
    if (t.afterLabel !== "") {
      const h = f(e, { class: "label right" });
      h.innerHTML = t.afterLabel, v.appendChild(h);
    }
    l.appendChild(v), E ? (n.append(l), n.append(p), this.element.append(n)) : (o.parentNode.replaceChild(l, o), g.remove(), R([l, p], n));
    const D = f(e, { class: t.dragElementClass }, { zIndex: 5 }), B = f(e);
    if (D.appendChild(B), n.appendChild(D), t.beforeDescription !== "" || t.afterDescription !== "") {
      const h = f(e, {
        class: "description"
      });
      h.innerHTML = t.beforeDescription, this.element.appendChild(h), this.createdElements.push(h), this.description = h;
    }
    if (t.showToggleButton) {
      const h = f(
        e,
        {
          class: "toggleButton"
        },
        { zIndex: 5 }
      );
      h.innerHTML = this._buttonStartText, this.element.appendChild(h), this.createdElements.push(h), this.toggleBtn = h;
    }
    this.element.style.visibility = "visible", this.wrapper1 = v, this.wrapper2 = p, this.dragHandle = D, this.clip = b, this.clippingElement = l, this.canvas = n;
  }
  /**
   * Method to remove or add mouse events
   *
   * @param {Boolean} add true or false
   */
  _mouseStartEvents(t = !0) {
    const e = (t ? "add" : "remove") + "EventListener", n = this.settings;
    if (n.followMouse) {
      const a = this.canvas;
      a[e]("mouseenter", this._mouseOver, !1), a[e]("mouseleave", this._mouseOut, !1), a[e]("mousemove", this._mouseMove, !1);
    } else
      this.dragElementTrigger[e](L, this._dragStart), n.onlyHandleDraggable && n.clickable && (this.canvas[e](L, this._tapstart, !1), this.canvas[e]("mouseup", this._dragEnd, !1));
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
      m
    ), this.settings.clickable && (this.canvas[e]("touchstart", this._tapstart, !1), this.canvas[e]("touchend", this._dragEnd, !1));
  }
  _removeAllEvents() {
    this._mouseStartEvents(!1), this._touchStartEvent(!1), this.toggleBtn && this.toggleBtn.removeEventListener("click", this.toggleBeforeAfter), window.removeEventListener(x, this._dimensions), this.removeEventListener(T, this._interactionEnd);
  }
  _addEvents() {
    this._touchStartEvent(), this._mouseStartEvents(), this.toggleBtn && this.toggleBtn.addEventListener("click", this.toggleBeforeAfter, !1), window.addEventListener(x, this._dimensions), this.addEventListener(T, this._interactionEnd);
  }
  // TODO: jumpToEnd
  _stopAni() {
    this._renderId && (window.cancelAnimationFrame(this._renderId), this._renderId = void 0, this.timing.then = this.timing.curTime = 0);
  }
  _testInteractionEnd() {
    this._endInteraction && this._renderId === void 0 && (this._endInteraction = !1, this.emit(T));
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
      const r = (/* @__PURE__ */ new Date()).getTime(), o = r - (this.timing.then || r);
      if (this.timing.curTime += o, this.progress = this.timing.curTime / this._animationDuration, this.progress >= 1) {
        this.progress = 1, this._setPosition(e), this._stopAni(), this._testInteractionEnd();
        return;
      }
      this._setPosition(t + n * this.easing(this.progress)), this.timing.then = r, this._renderId = window.requestAnimationFrame(a);
    };
    a();
  }
  _animateTo(t, e, n) {
    if (t = w(+t, 0, 100), this._delta = t - this.currentPercent, !(Math.abs(this._delta) < 1)) {
      if (!e) {
        this._setPosition(t);
        return;
      }
      this._animationDuration = e, this.easing = n || this.settings.animateEasing, this.progress = 0, this.timing.then = this.timing.curTime = 0, this._renderLoop(this.currentPercent, t, this._delta);
    }
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
  _setToggleValues(t, e, n) {
    this.toggleBtn && (this.toggleBtn.innerHTML = e), this.description && (this.description.innerHTML = n), this._afterShown = t === 1, this._oneTime = !1;
  }
  /**
   * set the handle to a defined position (in percent from left)
   * @param {Number} percent Percent of the new handle position from left
   */
  _setPosition(t, e = !1) {
    if (t === this.currentPercent && !e)
      return !1;
    this.currentPercent = t;
    let n = this.elementWidth * t * 0.01, a = `rect(0 ${n}px ${this.elementHeight}px 0)`, r = `rect(0 ${this.elementWidth}px ${this.elementHeight}px ${n}px)`, o;
    this._clipFromLeft || (o = a, a = r, r = o), this.clip && (this.clip.style.clipPath = r), this.clippingElement.style.clipPath = a, this.dragHandle.style.transform = `translate(${n}px, 0)`, t > 75 && (!this._afterShown || this._oneTime) ? (this._setToggleValues(
      1,
      this.settings.toggleBeforeText,
      this.settings.afterDescription
    ), this.emit(this.afterOnTheRight ? S : I)) : t < 25 && (this._afterShown || this._oneTime) && (this._setToggleValues(
      0,
      this.settings.toggleAfterText,
      this.settings.beforeDescription
    ), this.emit(this.afterOnTheRight ? I : S)), this.emit(M, { percent: t });
  }
  /**
   * convert pixel position to percent from left
   * @param  {Number} leftPos The left ('px') value
   * @return {Number}         The left percent value
   */
  _calcLeftPercent(t) {
    return t = w(t, this.minLeftPos, this.maxLeftPos), (t + this.dragHandleWidth * 0.5 - this.elementOffsetLeft) * 100 / this.elementWidth;
  }
  /**
   * convert percent to left pixel value
   * @param  {Number} leftPercent The left percent value
   * @return {Number}             The left ('px') value
   */
  _calcLeftValue(t) {
    return w(t, 0, 100) * 0.01 * this.elementWidth + this.elementOffsetLeft - this.dragHandleWidth * 0.5;
  }
  // public user function
  init() {
    if (this._initialized)
      return this;
    this._initialized = !0, this._oneTime = !0;
    const t = this.settings;
    if (this._afterShown = !1, this._clipFromLeft = !0, this._buttonStartText = this.settings.toggleAfterText, !t.afterOnTheRight) {
      let n = t.afterDescription;
      t.afterDescription = t.beforeDescription, t.beforeDescription = n;
      let a = t.toggleAfterText;
      t.toggleAfterText = t.toggleBeforeText, t.toggleBeforeText = a, this._afterShown = !0, this._buttonStartText = this.settings.toggleBeforeText, this._clipFromLeft = !1;
    }
    this._createGui(), this.offsetElements = this._getOffsetElements(), this.timing = { time: 0, curTime: 0 }, this.dragElementTrigger = t.onlyHandleDraggable ? this.dragHandle : this.canvas, this._animationDuration = t.animateInDuration || 0, t.startPos || (t.startPos = 0), t.animateStartPos || (t.animateStartPos = 0), this.currentPercent = this._animationDuration > 0 ? t.animateStartPos : t.startPos, this.element.style.opacity = 0, this.isTouch = "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch || navigator.maxTouchPoints > 0 || window.navigator.msMaxTouchPoints > 0;
    let e = this.settings.beforeImage || this.images[0].src;
    F(e).then((n) => {
      this.imageDimensions = n, this._dimensions(), this._setPosition(this.currentPercent), this.element.style.opacity = 1, this._animationDuration > 0 && this.settings.animateStartPos !== this.settings.startPos && setTimeout(
        () => this._animateTo(
          this.settings.startPos,
          this._animationDuration,
          this.settings.animateInEasing
        ),
        this.settings.animateInDelay
      ), this._addEvents(), this.emit(A);
    });
  }
  goto(t, e, n) {
    if (isNaN(t) || (t = w(+t, 0, 100), t === this.currentPercent))
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
  destroy() {
    if (this.element.removeAttribute("data-bainitialized"), typeof this.createdElements == "undefined")
      return !1;
    this.createdElements.forEach((t) => this.element.removeChild(t)), this.originalElements.forEach((t) => this.element.appendChild(t)), this.createdElements = [], this.originalElements = [], this._removeAllEvents(), this._initialized = !1;
  }
}
d.init = () => {
  if (O)
    return !0;
  O = !0;
  let s = document.querySelectorAll("[" + Y + "]");
  return s.length === 0 ? !1 : (s.forEach((i) => {
    new d(i);
  }), _);
};
d.destroyAll = () => _.length ? (_.forEach((s) => {
  s.destroy();
}), O = !1, _ = [], !0) : !1;
d.getInstance = (s) => H.get(s, "instance");
d.defaults = $;
k(d.init);
export {
  d as default
};
