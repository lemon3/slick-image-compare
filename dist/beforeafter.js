/*!
* BeforeAfter v0.2.0
* undefined
*/
var A = Object.defineProperty;
var H = (s, i, t) => i in s ? A(s, i, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[i] = t;
var f = (s, i, t) => (H(s, typeof i != "symbol" ? i + "" : i, t), t);
var T = (s, i, t) => new Promise((e, n) => {
  var r = (l) => {
    try {
      o(t.next(l));
    } catch (u) {
      n(u);
    }
  }, a = (l) => {
    try {
      o(t.throw(l));
    } catch (u) {
      n(u);
    }
  }, o = (l) => l.done ? e(l.value) : Promise.resolve(l.value).then(r, a);
  o((t = t.apply(s, i)).next());
});
const C = {
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
}, B = (s) => {
  const i = "DOMContentLoaded";
  document.readyState === "complete" || document.readyState === "interactive" ? (s(), document.removeEventListener(i, s)) : document.addEventListener(i, s, !1);
}, W = (s) => new Promise((i, t) => {
  const e = new Image();
  e.onload = () => {
    const { naturalWidth: n, naturalHeight: r } = e;
    i({ width: n, height: r });
  }, e.onerror = () => {
    t("error");
  }, e.src = s;
}), k = (s, i, t = null) => {
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
    const o = e.split(",");
    o.length > 1 ? o.forEach((l) => {
      if (l) {
        let [u, c] = l.split(":");
        c = c.replace(/'/g, ""), c === "true" ? c = !0 : c === "false" && (c = !1), a[u.replace(/'/g, "")] = c;
      }
    }) : a[i] = e, e = a;
  }
  let n = {}, r = i.length;
  return Object.entries(s.dataset).forEach((a) => {
    if (a[0].toLowerCase().indexOf(i) >= 0 && a[0].length > r) {
      let o = a[0][r].toLowerCase() + a[0].substring(r + 1);
      (t === null || t && t[o] !== void 0) && (n[o] = a[1]);
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
const _ = (s, i, t) => {
  if (s = parseFloat(s, 10), i = parseFloat(i, 10), t = parseFloat(t, 10), t < i) {
    let e = t;
    t = i, i = e;
  }
  return !isNaN(i) && s < i ? i : !isNaN(t) && s > t ? t : s;
}, z = (s, i) => {
  if (!s || !i && !s)
    return !1;
  if (s && !i)
    return s;
  s[0] === void 0 && (s = [s]);
  const t = s[0], e = t.parentNode;
  return e && e.insertBefore(i, t), s.forEach((n) => {
    i.appendChild(n);
  }), i;
}, F = (s, i, t, e) => {
  if (i)
    for (let n in i)
      Object.prototype.hasOwnProperty.call(i, n) && s.setAttribute(n, i[n]);
  if (t)
    for (let n in t)
      Object.prototype.hasOwnProperty.call(t, n) && (s.style[n] = t[n]);
  return e && (s.innerHTML = e), s;
}, d = (s, i, t, e) => F(document.createElement(s), i, t, e), S = {
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
}, N = {
  autoInit: !0,
  // silder: true, // show slider true, false
  beforeImage: null,
  afterImage: null,
  followMouse: !1,
  // mouse move interaction instead of drag (on desktop)
  // todo: if onlyHandleDraggable and clickable = true => same as if both are false
  onlyHandleDraggable: !1,
  clickable: !1,
  // only works if onlyHandleDraggable is set to true
  // todo: desktop and mobile snap values(!!!)
  snapToStart: !1,
  // after moveout or dragfinish handle jumps to start position
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
  animateInEasing: S.Elastic.easeOut,
  animateInDelay: 100,
  // in ms
  animateStartPos: 40,
  // % from left
  startPos: 50,
  // % from left
  // clickAnimate: true,
  animateDuration: 250,
  // ms
  animateEasing: S.Cubic.easeOut,
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
}, j = (s, i, t) => {
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
  constructor() {
    this._eventCallbacks = this._eventCallbacks || {};
  }
  emit(i, t) {
    let e = this._eventCallbacks[i];
    const n = { bubbles: !1, cancelable: !1, detail: t }, r = new CustomEvent(i, n);
    e && e.forEach((a) => a.call(this, r)), this.element && (this.element.dispatchEvent(r), j(this.element, i, r));
  }
  // on
  addEventListener(i, t) {
    return this.allowedEvents && this.allowedEvents.indexOf(i) < 0 || typeof t != "function" ? !1 : (this._eventCallbacks[i] || (this._eventCallbacks[i] = []), this._eventCallbacks[i].push(t), this);
  }
  // off
  removeEventListener(i, t) {
    if (!this._eventCallbacks || arguments.length === 0)
      return this._eventCallbacks = {}, this;
    let e = this._eventCallbacks[i];
    return e ? arguments.length === 1 ? (delete this._eventCallbacks[i], this) : (this._eventCallbacks[i] = e.filter(
      (n) => n !== t
    ), this) : this;
  }
}
const w = "beforeafter", $ = "data-" + w, y = "init", M = "drag", I = "update", P = "mousedown";
let v = [], D = !1;
class g extends q {
  constructor(t, e) {
    if (!t)
      return { error: !0 };
    if (t = typeof t == "string" ? document.querySelector(t) : t, t === null || t.length === 0)
      return { error: !0 };
    super();
    f(this, "_dimensions", () => {
      this.elementWidth = this.canvas.offsetWidth, this.elementOffsetLeft = this.offsetElements.map((t) => t.offsetLeft).reduce((t, e) => t + e), this.dragHandleWidth = this.dragHandle.offsetWidth, this.minLeftPos = this.elementOffsetLeft + this.settings.handleMinDistance - this.dragHandleWidth / 2, this.maxLeftPos = this.elementOffsetLeft + this.elementWidth - this.dragHandleWidth / 2 - this.settings.handleMinDistance, this.oldElementWidth !== this.elementWidth && (this.oldElementWidth = this.elementWidth, this.elementHeight = this.canvas.offsetHeight, this._setPosition(this.currentPercent, !0));
    });
    f(this, "_onMouseOver", (t) => {
      t.stopPropagation(), this._stopAni(), this.element.classList.add("interacting");
    });
    f(this, "_onMouseOut", (t) => {
      t.stopPropagation(), this.element.classList.remove("interacting"), this.settings.snapToStart && this._snapToStart();
    });
    f(this, "_onMouseMove", (t) => {
      this._stopAni();
      let e = this._getPos(t), n = this._calcLeftPercent(e.x);
      n = _(n, 0, 100), this.oldPercent = this.currentPercent, this._setPosition(n);
    });
    f(this, "_onDragStart", (t) => {
      this.startPos = this._getPos(t), this.element.classList.add("interacting"), clearTimeout(this.snapTimeout), this._tapped(t), t.type === "touchstart" ? (window.addEventListener("touchmove", this._onDrag, m), window.addEventListener("touchend", this._onDragEnd), this._mouseStartEvents(!1)) : P === t.type && (this.settings.followMouse || (window.addEventListener("mousemove", this._onDrag, !1), window.addEventListener("mouseup", this._onDragEnd, !1)), this._touchStartEvent(!1));
    });
    // moving
    f(this, "_onDrag", (t) => {
      let e = this._getPos(t), n = this._calcLeftPercent(e.x);
      if (this._stopAni(), this.oldPercent = this.currentPercent, this._moved = !0, t.type !== "mousemove" && (t.preventDefault(), this.deltaX = Math.abs(this.startPos.x - e.x), this.deltaY = Math.abs(this.startPos.y - e.y), !this.dirDetected)) {
        if (Math.abs(this.deltaY) > Math.abs(this.deltaX)) {
          this.element.classList.remove("interacting"), window.removeEventListener(
            "touchmove",
            this._onDrag,
            m
          );
          return;
        }
        this.element.classList.add("interacting"), this.dirDetected = !0;
      }
      this._setPosition(n), this.emit(M, { percent: n });
    });
    f(this, "_onDragEnd", (t) => {
      if (this.element.classList.remove("interacting"), t.type === "touchend" ? (window.removeEventListener("touchmove", this._onDrag, m), window.removeEventListener("touchend", this._onDragEnd), setTimeout(() => {
        this._mouseStartEvents();
      }, 1)) : t.type === "mouseup" && (window.removeEventListener("mousemove", this._onDrag, !1), window.removeEventListener("mouseup", this._onDragEnd, !1), this._touchStartEvent()), this.settings.snapToStart) {
        let e = this._calcLeftPercent(this._getPos(t).x), n = Math.abs(e - this.currentPercent);
        this._moved || 0.5 > n ? this._snapToStart() : this.snapTimeout = setTimeout(() => {
          this.oldPercent = e, this._snapToStart();
        }, this.settings.animateDuration + 1);
      }
      this._moved = !1, this.dirDetected = !1;
    });
    // if tapped on canvas
    f(this, "_tapped", (t) => {
      let e = this._calcLeftPercent(this._getPos(t).x);
      this._stopAni(), this.oldPercent = this.currentPercent, this._animateTo(e, this.settings.animateDuration);
    });
    f(this, "toggleBeforeAfter", (t) => {
      t && t.stopPropagation(), this._stopAni(), this._afterShown ? this.showBefore() : this.showAfter();
    });
    if (t.dataset.bainitialized)
      return g.getInstance(t);
    t.dataset.bainitialized = !0, this.allowedEvents = [y, M, I], v.push(this), C.put(t, "instance", this), this.element = t;
    const n = k(t, w);
    if (this.options = e || {}, this.settings = Object.assign({}, g.defaults, n, e), this.images = this.element.querySelectorAll("img"), (!this.settings.beforeImage || !this.settings.afterImage) && (!this.images || !this.images.length))
      return {
        error: !0
      };
    this.snapTimeout = null, this.element.classList.contains(w) || this.element.classList.add(w), this.deltaX = 0, this.deltaY = 0, this.dirDetected = !1, this.eventFired = {}, this._registeredEventListeners = [], this.settings.autoInit && this.init();
  }
  _getPos(t) {
    let e;
    return typeof t.pageX != "undefined" ? e = t : e = t.touches[0] || t.changedTouches[0], {
      x: e.pageX,
      y: e.pageY
    };
  }
  _createGui() {
    const t = this.settings;
    this.createdElements = [];
    const e = "div", n = d(e, { class: "canvas" });
    this.createdElements.push(n);
    let r, a, o, l, u = !1;
    t.beforeImage || t.afterImage ? (u = !0, r = d("img", { draggable: !1 }), r.src = t.beforeImage, a = d("img", { draggable: !1 }), a.src = t.afterImage) : ([o, l] = this.originalElements = this.images, r = o.cloneNode(!0), r.setAttribute("draggable", !1), a = l.cloneNode(!0), a.setAttribute("draggable", !1));
    const c = d(
      e,
      { class: "clipSlider" },
      { zIndex: 2 }
    ), E = document.createDocumentFragment(), p = document.createDocumentFragment();
    E.appendChild(r), p.appendChild(a);
    let b;
    if (t.beforeLabel !== "") {
      const h = d(e, { class: "info-box left" });
      h.innerHTML = t.beforeLabel, b = d(e, { class: "clipSlider" }), b.append(h), p.appendChild(b);
    }
    if (t.afterLabel !== "") {
      const h = d(e, { class: "info-box right" });
      h.innerHTML = t.afterLabel, E.appendChild(h);
    }
    c.appendChild(E), u ? (n.append(c), n.append(p), this.element.append(n)) : (o.parentNode.replaceChild(c, o), l.remove(), z([c, p], n));
    const L = d(e, { class: t.dragElementClass }, { zIndex: 5 }), O = d(e, { class: "overlay" }, { zIndex: 4 }), x = d(e);
    if (L.appendChild(x), n.appendChild(O), n.appendChild(L), t.beforeDescription !== "" || t.afterDescription !== "") {
      const h = d(e, {
        class: "description"
      });
      h.innerHTML = t.beforeDescription, this.element.appendChild(h), this.createdElements.push(h), this.description = h;
    }
    if (t.showToggleButton) {
      const h = d(
        e,
        {
          class: "toggleButton"
        },
        { zIndex: 5 }
      );
      h.innerHTML = this._buttonStartText, this.element.appendChild(h), this.createdElements.push(h), this.toggleBtn = h;
    }
    this.element.style.visibility = "visible", this.wrapper1 = E, this.wrapper2 = p, this.dragHandle = L, this.clip = b, this.clippingElement = c, this.canvas = n;
  }
  _removeAllEvents() {
    this.dragElementTrigger.removeEventListener(P, this._onDragStart), this.dragElementTrigger.removeEventListener(
      "touchstart",
      this._onDragStart,
      m
    ), this.toggleBtn && this.toggleBtn.removeEventListener("click", this.toggleBeforeAfter), window.removeEventListener("resize", this._dimensions);
  }
  /**
   * to remove or add mouse events
   *
   * @param {Boolean} add true or false
   */
  _mouseStartEvents(t = !0) {
    const e = (t ? "add" : "remove") + "EventListener", n = this.canvas;
    this.settings.followMouse ? (n[e]("mouseenter", this._onMouseOver), n[e]("mouseleave", this._onMouseOut), n[e]("mousemove", this._onMouseMove)) : this.dragElementTrigger[e](P, this._onDragStart);
  }
  /**
   * to remove or add touch events
   *
   * @param {Boolean} add true or false
   */
  _touchStartEvent(t = !0) {
    const e = (t ? "add" : "remove") + "EventListener";
    this.dragElementTrigger[e](
      "touchstart",
      this._onDragStart,
      m
    );
  }
  _addEvents() {
    this._mouseStartEvents(), this._touchStartEvent(), this.toggleBtn && this.toggleBtn.addEventListener("click", this.toggleBeforeAfter), window.addEventListener("resize", this._dimensions);
  }
  // TODO: jumpToEnd
  _stopAni() {
    this.requestId && (window.cancelAnimationFrame(this.requestId), this.requestId = void 0), this.timing.then = this.timing.curTime = 0;
  }
  _renderLoop() {
    let t, e;
    t = (/* @__PURE__ */ new Date()).getTime(), e = t - (this.timing.then || t), this.timing.curTime += e, this.progress = this.timing.curTime / this._animationDuration, this.progress > 1 && (this.progress = 1);
    const n = this.easing(this.progress);
    this._setPosition(this.oldPercent + this._delta * n), this.timing.then = t, this.progress < 1 ? this.requestId = window.requestAnimationFrame(
      this._renderLoop.bind(this)
    ) : this.oldPercent = this.currentPercent;
  }
  _animateTo(t, e, n) {
    if (t = _(+t, 0, 100), this._delta = t - this.oldPercent, !(Math.abs(this._delta) < 1)) {
      if (!e) {
        this._setPosition(t);
        return;
      }
      this._animationDuration = e, this.easing = n || this.settings.animateEasing, this.progress = 0, this.timing.curTime = 0, this._renderLoop();
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
    this.toggleBtn && (this.toggleBtn.innerHTML = e), this.description && (this.description.innerHTML = n), this._afterShown = t === 1;
  }
  /**
   * set the handle to a defined position (in percent from left)
   * @param {Number} percent Percent of the new handle position from left
   */
  _setPosition(t, e = !1) {
    if (t === this.currentPercent && !e)
      return !1;
    this.currentPercent = t;
    let n = this.elementWidth * t * 0.01, r = `rect(0 ${n}px ${this.elementHeight}px 0)`, a = `rect(0 ${this.elementWidth}px ${this.elementHeight}px ${n}px)`, o;
    this._clipFromLeft || (o = r, r = a, a = o), this.clip && (this.clip.style.clipPath = a), this.clippingElement.style.clipPath = r, this.dragHandle.style.transform = `translate(${n}px, 0)`, t > 75 && !this._afterShown ? this._setToggleValues(
      1,
      this.settings.toggleBeforeText,
      this.settings.afterDescription
    ) : t < 25 && this._afterShown && this._setToggleValues(
      0,
      this.settings.toggleAfterText,
      this.settings.beforeDescription
    ), this.emit(I, { percent: t });
  }
  /**
   * convert pixel position to percent from left
   * @param  {Number} leftPos The left ('px') value
   * @return {Number}         The left percent value
   */
  _calcLeftPercent(t) {
    return t = _(t, this.minLeftPos, this.maxLeftPos), (t + this.dragHandleWidth * 0.5 - this.elementOffsetLeft) * 100 / this.elementWidth;
  }
  /**
   * convert percent to left pixel value
   * @param  {Number} leftPercent The left percent value
   * @return {Number}             The left ('px') value
   */
  _calcLeftValue(t) {
    return _(t, 0, 100) * 0.01 * this.elementWidth + this.elementOffsetLeft - this.dragHandleWidth * 0.5;
  }
  // public user function
  init() {
    return T(this, null, function* () {
      if (this._initialized)
        return this;
      this._initialized = !0;
      const t = this.settings;
      if (this._afterShown = !1, this._clipFromLeft = !0, this._buttonStartText = this.settings.toggleAfterText, !t.afterOnTheRight) {
        let n = t.afterDescription;
        t.afterDescription = t.beforeDescription, t.beforeDescription = n;
        let r = t.toggleAfterText;
        t.toggleAfterText = t.toggleBeforeText, t.toggleBeforeText = r, this._afterShown = !0, this._buttonStartText = this.settings.toggleBeforeText, this._clipFromLeft = !1;
      }
      this._createGui(), this.offsetElements = this._getOffsetElements(), this.timing = {
        time: 0,
        curTime: 0
      }, this.dragElementTrigger = this.canvas, t.onlyHandleDraggable && (this.dragElementTrigger = this.dragHandle, t.clickable && (this.canvas.addEventListener(P, this._tapped), this.canvas.addEventListener("touchstart", this._tapped))), this._animationDuration = t.animateInDuration || 0, t.startPos || (t.startPos = 0), t.animateStartPos || (t.animateStartPos = 0), this.currentPercent = this._animationDuration > 0 ? t.animateStartPos : t.startPos, this.oldPercent = this.currentPercent, this.element.style.opacity = 0, this._moved = !1;
      let e = this.settings.beforeImage || this.images[0].src;
      this.imageDimensions = yield W(e), this._dimensions(), this._setPosition(this.currentPercent), this.element.style.opacity = 1, this._animationDuration > 0 && this.settings.animateStartPos !== this.settings.startPos && setTimeout(
        () => this._animateTo(
          this.settings.startPos,
          this._animationDuration,
          this.settings.animateInEasing
        ),
        this.settings.animateInDelay
      ), this._addEvents(), this.emit(y);
    });
  }
  goto(t, e, n) {
    if (isNaN(t) || (t = _(+t, 0, 100), t === this.currentPercent))
      return !1;
    this.oldPercent = this.currentPercent, this._stopAni(), this._animateTo(t, e, n);
  }
  showAfter() {
    this.oldPercent = 100, this._setPosition(100);
  }
  showBefore() {
    this.oldPercent = 0, this._setPosition(0);
  }
  get elem() {
    return this.element;
  }
  destroy() {
    if (this.element.removeAttribute("data-bainitialized"), typeof this.createdElements == "undefined")
      return !1;
    let t;
    if (this.createdElements)
      for (t = 0; t < this.createdElements.length; t++)
        this.element.removeChild(this.createdElements[t]);
    if (this.originalElements)
      for (t = 0; t < this.originalElements.length; t++)
        this.element.appendChild(this.originalElements[t]);
    this.createdElements = this.originalElements = [], this._removeAllEvents();
  }
}
g.init = () => {
  if (D)
    return !0;
  D = !0;
  let s = document.querySelectorAll("[" + $ + "]");
  return s.length === 0 ? !1 : (s.forEach((i) => {
    new g(i);
  }), v);
};
g.destroyAll = () => v.length ? (v.forEach((s) => {
  s.destroy();
}), D = !1, v = [], !0) : !1;
g.getInstance = (s) => C.get(s, "instance");
g.defaults = N;
B(g.init);
export {
  g as default
};
