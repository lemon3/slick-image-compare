/*!
* SlickImageCompare v0.4.0
* https://lemon3.github.io/slick-image-compare
*/
var Y = Object.defineProperty;
var R = Object.getOwnPropertySymbols;
var Q = Object.prototype.hasOwnProperty, J = Object.prototype.propertyIsEnumerable;
var L = (s, i, t) => i in s ? Y(s, i, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[i] = t, x = (s, i) => {
  for (var t in i || (i = {}))
    Q.call(i, t) && L(s, t, i[t]);
  if (R)
    for (var t of R(i))
      J.call(i, t) && L(s, t, i[t]);
  return s;
};
var d = (s, i, t) => (L(s, typeof i != "symbol" ? i + "" : i, t), t);
const X = {
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
}, H = (s) => s === !0 || s === "true" || s === 1 || s === "1", Z = (s) => {
  const i = "DOMContentLoaded";
  document.readyState === "complete" || document.readyState === "interactive" ? (s(), document.removeEventListener(i, s)) : document.addEventListener(i, s, !1);
}, K = (s) => new Promise((i, t) => {
  const e = new Image();
  e.onload = () => {
    const { naturalWidth: n, naturalHeight: a } = e, r = n / a;
    i({ width: n, height: a, ratio: r });
  }, e.onerror = () => {
    t("error");
  }, e.src = s;
}), V = (s) => {
  if (!s.match(/[^\w]+/i))
    return s;
  const i = {};
  return s = s.replace("{", "").replace("}", "").trim(), s.split(",").forEach((e) => {
    if (e === "")
      return;
    let [n, a] = e.split(":");
    n = n.trim().replaceAll("'", ""), a = a.trim().replaceAll("'", ""), i[n] = a;
  }), i;
}, tt = (s, i) => s ? i === void 0 || typeof i == "undefined" ? s.dataset : s.dataset[i] === void 0 ? s.dataset[i] : V(s.dataset[i]) : !1;
let v = !1;
try {
  window.addEventListener(
    "test",
    null,
    Object.defineProperty({}, "passive", {
      get: function() {
        return v = { passive: !1 }, !1;
      }
    })
  );
} catch (s) {
  v = !1;
}
const N = (s, i, t) => Math.max(i, Math.min(s, t)), E = (s, i, t) => {
  if (s = parseFloat(s, 10), i = parseFloat(i, 10), t = parseFloat(t, 10), t < i) {
    let e = t;
    t = i, i = e;
  }
  return !isNaN(i) && s < i ? i : !isNaN(t) && s > t ? t : s;
}, et = (s, i, t, e) => {
  if (i)
    for (let n in i)
      Object.prototype.hasOwnProperty.call(i, n) && s.setAttribute(n, i[n]);
  if (t)
    for (let n in t)
      Object.prototype.hasOwnProperty.call(t, n) && (s.style[n] = t[n]);
  return e && (s.innerHTML = e), s;
}, c = (s, i, t, e) => et(document.createElement(s), i, t, e), T = {
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
}, st = {
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
  handleAngle: 0,
  // angle of the parting line
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
class it {
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
    e && e.forEach((r) => r.call(this, a)), this.element.dispatchEvent(a);
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
const C = "sic", nt = "data-" + C, w = "interacting", F = "init", $ = "drag", W = "update", M = "viewchange", j = "beforeshown", q = "aftershown", U = "interactionstart", G = "interactionend", S = "mousedown", y = "mouseup", at = "resize";
let I = [], O = !1;
const B = (s = !0, i = "#ffffff") => `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="${i}" stroke-width="2" stroke-linecap="round" stroke-linejoin="arcs"><path d="${s ? "m12 24 8-8-8-8" : "m20 8-8 8 8 8"}"/></svg>`;
class _ extends it {
  constructor(t, e) {
    if (!t)
      return { error: !0 };
    if (t = typeof t == "string" ? document.querySelector(t) : t, t === null || t.length === 0)
      return { error: !0 };
    super();
    d(this, "_dimensions", (t, e = !1, n = !this._horizontal) => {
      const a = this.element.getBoundingClientRect(), r = getComputedStyle(this.element), o = parseFloat(r.borderLeftWidth) + parseFloat(r.borderRightWidth), u = parseFloat(r.borderTopWidth) + parseFloat(r.borderBottomWidth);
      this.width = a.width - o, this.height = a.height - u;
      let h;
      if (this._horizontal) {
        const l = a.x;
        h = this._dragHandle.offsetWidth * 0.5, this._dim = this.width, this._offset = h - l, this._minPos = l + this.settings.handleMinDistance - h, this._maxPos = l + this.width - h - this.settings.handleMinDistance;
      } else {
        const l = this.element.offsetTop;
        h = this._dragHandle.offsetHeight * 0.5, this._dim = this.height, this._offset = h - l, this._minPos = l + this.settings.handleMinDistance - h, this._maxPos = l + this.height - h - this.settings.handleMinDistance;
      }
      !e && this._oldDim === this._dim || (this._oldDim = this._dim, n && this._usePicture && this._checkCurrentImageSource(this._firstImage), this._radians && (this._angleOffset = Math.tan(this._radians) * this.height / 2), this._setPosition(this._percent, !0));
    });
    d(this, "_mouseOver", () => {
      this.stop(), this.element.classList.add(w);
    });
    d(this, "_mouseOut", () => {
      this.element.classList.remove(w), this.settings.snapToStart && this._snapToStart();
    });
    d(this, "_mouseMove", (t) => {
      this.stop(), this._setPosition(this._calcPercent(this._getPos(t)));
    });
    // if tapped on canvas
    d(this, "_tapstart", (t) => {
      t.stopPropagation(), this._endInteraction = !1, this.stop(), clearTimeout(this._snapTimeout), this._triggerEvent(U), t.type === "touchstart" ? (this.isTouch = !0, this._mouseStartEvents(!1)) : S === t.type && (this.isTouch = !1, this._touchStartEvent(!1));
      const e = this._calcPercent(this._getPos(t));
      this.settings.animateOnClick ? this._animateTo(e, this.settings.animateDuration) : this._setPosition(e);
    });
    d(this, "_dragStart", (t) => {
      t.stopPropagation(), this.startPos = this._getPos(t), this.element.classList.add(w), this._tapstart(t), t.type === "touchstart" ? (window.addEventListener("touchmove", this._drag, v), window.addEventListener("touchend", this._dragEnd, !1)) : S === t.type && (this.settings.followMouse || (window.addEventListener("mousemove", this._drag, !1), window.addEventListener(y, this._dragEnd, !1)));
    });
    // moving
    d(this, "_drag", (t) => {
      this.stop();
      let e = this._getPos(t), n = this._calcPercent(e);
      if (this.isTouch) {
        t.preventDefault();
        const a = Math.abs(this.startPos.x - e.x), r = Math.abs(this.startPos.y - e.y);
        if (!this._dirDetected) {
          if (r > a) {
            this.element.classList.remove(w), window.removeEventListener(
              "touchmove",
              this._drag,
              v
            );
            return;
          }
          this.element.classList.add(w), this._dirDetected = !0;
        }
      }
      this._setPosition(n), this._triggerEvent($);
    });
    d(this, "_dragEnd", (t) => {
      this._endInteraction = !0, t.type === "touchend" ? (this.isTouch = !0, window.removeEventListener("touchmove", this._drag, v), window.removeEventListener("touchend", this._dragEnd)) : y === t.type && (this.isTouch = !1, this.settings.followMouse || (window.removeEventListener("mousemove", this._drag, !1), window.removeEventListener(y, this._dragEnd, !1))), this._testInteractionEnd(), this._dirDetected = !1;
    });
    if (t.dataset.sicinitialized)
      return _.getInstance(t);
    t.dataset.sicinitialized = !0, this.allowedEvents = [
      F,
      $,
      W,
      j,
      q,
      U,
      G,
      M
    ], I.push(this), X.put(t, "instance", this), this.element = t;
    const n = tt(t, C);
    if (this.options = e || {}, this.settings = Object.assign({}, _.defaults, n, e), this.images = this.element.querySelectorAll("img"), this.picture = this.element.querySelectorAll("picture"), (!this.settings.beforeImage || !this.settings.afterImage) && (!this.images || !this.images.length) && (!this.picture || !this.picture.length))
      return {
        error: !0
      };
    this.element.classList.contains(C + "-main") || this.element.classList.add(C + "-main"), this._snapTimeout = null, this._dirDetected = !1, this.settings.autoInit && this.init();
  }
  _triggerEvent(t, e) {
    e = x({
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
    const r = c(
      e,
      { class: "sic-clip" },
      {
        position: "absolute",
        left: 0,
        top: 0
      }
    );
    if (t.beforeImage || t.afterImage)
      this.images = [n, a] = [
        t.beforeImage,
        t.afterImage
      ].reduce((b, p) => (b.push(
        c(
          "img",
          { draggable: !1, src: p },
          { width: "100%", display: "block" }
        )
      ), b), []), this.element.appendChild(n), r.appendChild(a), this.element.appendChild(r), this._createdEl.push(n);
    else {
      const [b, p] = this.picture && this.picture.length === 2 ? this.picture : this.images;
      n = b, a = p.cloneNode(!0), [n, a].forEach((D) => {
        D.setAttribute("draggable", !1), D.style.width = "100%", D.style.display = "block";
      }), r.appendChild(a), p.parentNode.replaceChild(r, p), this._originalEl.push(p);
    }
    this._createdEl.push(r);
    const o = c(
      e,
      {
        class: "sic-handle"
      },
      {
        position: "absolute"
      }
    );
    let u, h;
    this._angle && (u = {
      transform: `rotate(${this._angle}deg)`,
      transformOrigin: "bottom center"
    }, h = {
      transform: `rotate(${this._angle}deg)`,
      transformOrigin: "top center"
    });
    const l = c(e, { class: "sic-line sic-line-1" }, u), P = c(e, { class: "sic-line sic-line-2" }, h), f = c(e, { class: "sic-arrows" }), A = c(e, { class: "sic-arrow sic-arrow-1" }), z = c(e, { class: "sic-arrow sic-arrow-2" }), k = c(e, { class: "sic-circle" });
    A.innerHTML = B(!1), z.innerHTML = B(), f.append(A, z), k.append(f), o.append(l, P, k), this.element.append(o), this._createdEl.push(o);
    let g, m;
    t.beforeLabel !== "" && (g = c(e, { class: "sic-label sic-label-one" }), g.innerHTML = decodeURIComponent(t.beforeLabel), this.element.append(g), this._createdEl.push(g)), t.afterLabel !== "" && (m = c(e, { class: "sic-label sic-label-two" }), m.innerHTML = decodeURIComponent(t.afterLabel), this.element.append(m), this._createdEl.push(m)), this.info1 = t.ltr ? g : m, this.info2 = t.ltr ? m : g, this.element.classList.add(
      this._horizontal ? "sic-horizontal" : "sic-vertical"
    ), this.element.style.position = "relative", this.element.style.overflow = "hidden", this.element.style.visibility = "visible", this._dragHandle = o, this._clipEl = r;
  }
  /**m
   * Method to remove or add mouse events
   *
   * @param {Boolean} add true or false
   */
  _mouseStartEvents(t = !0) {
    const e = this._addRemove(t), n = this.settings;
    if (n.followMouse) {
      const a = this.element;
      a[e]("mouseenter", this._mouseOver, !1), a[e]("mouseleave", this._mouseOut, !1), a[e]("mousemove", this._mouseMove, !1);
    } else
      this._dragEl[e](S, this._dragStart), n.onlyHandleDraggable && n.clickable && (this.element[e](S, this._tapstart, !1), this.element[e](y, this._dragEnd, !1));
  }
  /**
   * Helper method.
   *
   * @param {Boolean} add true for addEventListener
   *                      false for removeEventListener
   * @returns String addEventListener or removeEventListener
   */
  _addRemove(t = !0) {
    return (t ? "add" : "remove") + "EventListener";
  }
  /**
   * Method to add or remove touch events
   *
   * @param {Boolean} add true or false
   */
  _touchStartEvent(t = !0) {
    const e = this._addRemove(t);
    this._dragEl[e]("touchstart", this._dragStart, v), this.settings.clickable && (this.element[e]("touchstart", this._tapstart, !1), this.element[e]("touchend", this._dragEnd, !1));
  }
  /**
   * method to add or remove events
   *
   * @param {Boolean} add
   */
  _appEvents(t = !0) {
    this._touchStartEvent(t), this._mouseStartEvents(t);
    const e = this._addRemove(t);
    window[e](at, this._dimensions);
  }
  /**
   * stop method
   */
  stop() {
    this._renderId && (cancelAnimationFrame(this._renderId), this.element.classList.contains("playing") && this.element.classList.remove("playing"), this._renderId = void 0);
  }
  _testInteractionEnd() {
    this._endInteraction && this._renderId === void 0 && (this._endInteraction = !1, this._interactionEnd(), this._triggerEvent(G));
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
      const r = Date.now();
      if (this._timingThen !== 0) {
        if (this._timingCurTime += r - this._timingThen, this.progress = this._timingCurTime / this._animationDuration, this.progress >= 1) {
          this.progress = 1, this._setPosition(e), this.stop(), this._testInteractionEnd();
          return;
        }
        this._setPosition(t + n * this.easing(this.progress));
      } else
        this.progress = 0, this._setPosition(t);
      this._timingThen = r, this._renderId = requestAnimationFrame(a);
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
    if (t = N(+t, 0, 100), !e) {
      this._setPosition(t);
      return;
    }
    const a = t - this._percent;
    this._animationDuration = e, this.easing = n || this.settings.animateEasing, this.progress = 0, this._timingThen = this._timingCurTime = 0, this._renderLoop(this._percent, t, a);
  }
  _snapToStart(t = this.settings.snapToStartDelay) {
    this.stop(), this._snapTimeout = setTimeout(() => {
      this._animateTo(
        this.settings.startPos,
        this.settings.animateDuration,
        this.settings.animateEasing
      );
    }, t);
  }
  _interactionEnd() {
    this.element.classList.remove(w), this.isTouch ? this._mouseStartEvents() : this._touchStartEvent(), this.settings.snapToStart && this._snapToStart();
  }
  /**
   * helper for the picture element
   * @param {string} element the first image element
   */
  _checkCurrentImageSource(t) {
    clearTimeout(this._checkTo), this._checkTo = setTimeout(() => {
      const e = t.currentSrc;
      this._firstImageSrc !== e && (this._firstImageSrc = e, this._dimensions(null, !1, !1));
    }, 250);
  }
  _getClipPolygon(t) {
    return `polygon(0 0, ${t + this._angleOffset}px 0, ${t - this._angleOffset}px 100%, 0 100%)`;
  }
  /**
   *
   * @param {number} pos the pixel value from the left position
   * @returns
   */
  _getClipRect(t) {
    return this._horizontal ? this._ltr ? `rect(0 ${t}px 100% 0)` : `rect(0 ${this.width}px 100% ${t}px)` : this._ltr ? `rect(0 100% ${t}px 0)` : `rect(${t}px 100% 100% 0)`;
  }
  _changeStatus(t) {
    this._afterShown = t;
    let e = this._afterShown ? q : j;
    this._triggerEvent(e), this._triggerEvent(M), this._oneTime = !1;
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
    this._clipEl.style.clipPath = this._getClip(n), this._dragHandle.style.transform = this._horizontal ? `translate(${n}px, 0)` : `translate(0, ${n}px)`, this.info1 && (this.info1.style.opacity = t < 50 ? 1 : (100 - t) / 50), this.info2 && (this.info2.style.opacity = t > 50 ? 1 : t / 50);
    let a = this._ltr ? this._afterShown : !this._afterShown;
    t > 70 && (this._oneTime || !a) ? this._changeStatus(this._ltr) : t < 30 && (this._oneTime || a) && this._changeStatus(!this._ltr), this._triggerEvent(W);
  }
  /**
   * convert pixel position to percent from left
   * @param  {Object} pos The position object { x, y }
   * @return {Number}         The left percent value
   */
  _calcPercent(t) {
    let e = this._horizontal ? t.x : t.y;
    return e = N(e, this._minPos, this._maxPos), (e + this._offset) * 100 / this._dim;
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
    this._initialized = !0, this._oneTime = !0, this._afterShown = !1, this._ltr = H(t.ltr), this._horizontal = H(t.horizontal), this._usePicture = this.picture && this.picture.length === 2, this._angle = E(t.handleAngle, -30, 30), this._getClip = this._getClipRect, this._angle && (this._radians = this._angle * Math.PI / 180, this._getClip = this._getClipPolygon), this._createGui(), this._dragEl = t.onlyHandleDraggable ? this._dragHandle : this.element, this._animationDuration = t.animateInDuration || 0, t.startPos = E(t.startPos, 0, 100), t.animateInStartPos = E(t.animateInStartPos, 0, 100), t.startPos || (t.startPos = 50), t.animateInStartPos || (t.animateInStartPos = 0), t.animateIn ? this._percent = this._animationDuration > 0 ? t.animateInStartPos : t.startPos : this._percent = t.startPos, this.element.style.opacity = 0, this.isTouch = "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch || navigator.maxTouchPoints > 0 || window.navigator.msMaxTouchPoints > 0, this.allowedEvents.forEach((e) => {
      t[e] && this.addEventListener(e, t[e]);
    }), this._firstImage = this._usePicture ? this.picture[0].querySelector("img") : this.images[0], this._firstImageSrc = this._firstImage.currentSrc || this._firstImage.src, K(this._firstImageSrc).then(() => {
      this._dimensions(), this._setPosition(this._percent), this.element.style.opacity = 1, t.animateIn && this._animationDuration > 0 && this.settings.animateInStartPos !== this.settings.startPos && setTimeout(
        () => this._animateTo(
          this.settings.startPos,
          this._animationDuration,
          this.settings.animateInEasing
        ),
        this.settings.animateInDelay
      ), this._appEvents(), this._triggerEvent(F), this._triggerEvent(M);
    });
  }
  /**
   *
   * @param {Integer} stopAt The Position (0-100) where it should stop
   * @param {Integer} repetitions How often should it bounce (0 means endless)
   * @param {Integer} duration The animation Duration form 0 - 100 in ms
   * @param {Function} easingFun An easing-function eg.: (p) => p (for linear);
   */
  play(t = this._percent, e = 2, n = 2e3, a) {
    this.stop(), clearTimeout(this._snapTimeout), n = E(n, 250, 1e4), t = E(t, 0, 100);
    let r = this._percent, o = 100 - r, u = n / 100 * Math.abs(o), h = !0, l = 0;
    e <= 0 && (e = -1), this.progress = this._timingCurTime = this._timingThen = 0, this.easing = a || T.Quad.easeOut;
    const P = () => {
      let f = Date.now();
      if (this._timingCurTime += f - (this._timingThen || f), this.progress = this._timingCurTime / u, this.progress >= 1) {
        if (l === e) {
          this.element.classList.remove("playing");
          return;
        }
        u = n, h ? (r = 100, o = -100) : (r = 0, o = 100), h = !h, l++, l === e && (o = h ? t : t - 100, u = n / 100 * Math.abs(o)), this._setPosition(r), f = Date.now(), this._timingCurTime = 0;
      } else
        this._setPosition(r + o * this.easing(this.progress));
      this._timingThen = f, this._renderId = requestAnimationFrame(P);
    };
    this.element.classList.add("playing"), P();
  }
  animateTo(t, e = this.settings.animateDuration) {
    return this.goto(t, e, T);
  }
  goto(t, e, n) {
    return isNaN(t) || (t = E(+t, 0, 100), t === this._percent) ? !1 : (this.stop(), this._animateTo(t, e, n), this);
  }
  /**
   * ltr = true  (before, 0%) L -> R (after, 100%)
   * ltr = false (after, 0%)  R -> L (before, 100%)
   */
  changeDirection() {
    this._ltr = !this._ltr;
    let t;
    t = this.info1, this.info1 = this.info2, this.info2 = t, this._percent = 100 - this._percent, this._dimensions(null, !0);
  }
  /**
   * horizontal or vertical slider
   */
  changeOrientation() {
    const t = this._horizontal;
    this._horizontal = !t, this.element.classList.remove(t ? "sic-horizontal" : "sic-vertical"), this.element.classList.add(
      this._horizontal ? "sic-horizontal" : "sic-vertical"
    ), this._dimensions(null, !0);
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
  toggleView() {
    this.stop(), this._afterShown ? this.showBefore() : this.showAfter();
  }
  destroy() {
    this.element.removeAttribute("data-sicinitialized"), this._createdEl.forEach((t) => this.element.removeChild(t)), this._originalEl.forEach((t) => this.element.appendChild(t)), this._createdEl = [], this._originalEl = [], this._percent = this.startPos, this._appEvents(!1), this._initialized = !1;
  }
}
_.init = () => {
  if (O)
    return !0;
  O = !0;
  let s = document.querySelectorAll("[" + nt + "]");
  return s.length === 0 ? !1 : (s.forEach((i) => {
    new _(i);
  }), I);
};
_.destroyAll = () => I.length ? (I.forEach((s) => {
  s.destroy();
}), O = !1, I = [], !0) : !1;
_.getInstance = (s) => X.get(s, "instance");
_.defaults = st;
Z(_.init);
export {
  _ as default
};
