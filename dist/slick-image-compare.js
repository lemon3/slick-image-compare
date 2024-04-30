/*!
* SlickImageCompare v0.3.0
* https://lemon3.github.io/slick-image-compare
*/
var B = Object.defineProperty;
var z = Object.getOwnPropertySymbols;
var X = Object.prototype.hasOwnProperty, U = Object.prototype.propertyIsEnumerable;
var L = (e, i, t) => i in e ? B(e, i, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[i] = t, A = (e, i) => {
  for (var t in i || (i = {}))
    X.call(i, t) && L(e, t, i[t]);
  if (z)
    for (var t of z(i))
      U.call(i, t) && L(e, t, i[t]);
  return e;
};
var d = (e, i, t) => (L(e, typeof i != "symbol" ? i + "" : i, t), t);
const G = {
  // storage
  _s: /* @__PURE__ */ new WeakMap(),
  put(e, ...i) {
    this._s.has(e) || this._s.set(e, /* @__PURE__ */ new Map());
    let t = this._s.get(e);
    if (i.length > 1)
      return t.set(i[0], i[1]), this;
    if (typeof i[0] == "object")
      for (const s in i[0])
        t.set(s, i[0][s]);
    else
      t.set(i[0]);
    return this;
  },
  get(e, i) {
    return this._s.has(e) ? i ? this._s.get(e).get(i) : this._s.get(e) : !1;
  },
  has(e, i) {
    return this._s.has(e) && this._s.get(e).has(i);
  },
  // todo if no key given: remove all
  remove(e, i) {
    if (!this._s.has(e))
      return !1;
    let t = this._s.get(e).delete(i);
    return this._s.get(e).size === 0 && this._s.delete(e), t;
  }
}, k = (e) => e === !0 || e === "true" || e === 1 || e === "1", Y = (e) => {
  const i = "DOMContentLoaded";
  document.readyState === "complete" || document.readyState === "interactive" ? (e(), document.removeEventListener(i, e)) : document.addEventListener(i, e, !1);
}, J = (e) => new Promise((i, t) => {
  const s = new Image();
  s.onload = () => {
    const { naturalWidth: n, naturalHeight: a } = s, r = n / a;
    i({ width: n, height: a, ratio: r });
  }, s.onerror = () => {
    t("error");
  }, s.src = e;
}), Q = (e) => {
  if (!e.match(/[^\w]+/i))
    return e;
  e = e.replace(/[\\ \t\n\r'"]/gm, "").replace(/(\w+)/gi, '"$1"'), e[0] !== "{" && (e = `{${e}}`), e = e.replaceAll(",}", "}");
  try {
    return JSON.parse(e);
  } catch (i) {
    return !1;
  }
}, Z = (e, i) => e ? i === void 0 || typeof i == "undefined" ? e.dataset : e.dataset[i] === void 0 ? e.dataset[i] : Q(e.dataset[i]) : !1;
let w = !1;
try {
  window.addEventListener(
    "test",
    null,
    Object.defineProperty({}, "passive", {
      get: function() {
        return w = { passive: !1 }, !1;
      }
    })
  );
} catch (e) {
  w = !1;
}
const H = (e, i, t) => Math.max(i, Math.min(e, t)), T = (e, i, t) => {
  if (e = parseFloat(e, 10), i = parseFloat(i, 10), t = parseFloat(t, 10), t < i) {
    let s = t;
    t = i, i = s;
  }
  return !isNaN(i) && e < i ? i : !isNaN(t) && e > t ? t : e;
}, K = (e, i, t, s) => {
  if (i)
    for (let n in i)
      Object.prototype.hasOwnProperty.call(i, n) && e.setAttribute(n, i[n]);
  if (t)
    for (let n in t)
      Object.prototype.hasOwnProperty.call(t, n) && (e.style[n] = t[n]);
  return s && (e.innerHTML = s), e;
}, c = (e, i, t, s) => K(document.createElement(e), i, t, s), S = {
  Linear: (e) => e,
  // Pow: {},
  Quad: {
    easeIn: (e) => Math.pow(e, 2),
    easeOut: (e) => 1 - Math.pow(1 - e, 2)
  },
  Cubic: {
    easeIn: (e) => Math.pow(e, 3),
    easeOut: (e) => 1 - Math.pow(1 - e, 3)
  },
  Sine: {
    easeIn: (e) => 1 - Math.cos(e * Math.PI / 2),
    easeOut: (e) => Math.sin(e * Math.PI / 2)
  },
  Elastic: {
    easeOut: (e) => {
      const i = 2 * Math.PI / 3;
      return e === 0 || e === 1 ? e : Math.pow(2, -10 * e) * Math.sin((e * 10 - 0.75) * i) + 1;
    }
  }
}, V = {
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
  snapToStartEasing: S.Elastic.easeOut,
  // TODO: implement
  handleMinDistance: 0,
  // min distance to left and right border in px TODO: also %
  // animate in
  animateIn: !1,
  animateInDuration: 1250,
  // ms
  animateInEasing: S.Elastic.easeOut,
  animateInDelay: 100,
  // in ms
  animateInStartPos: 40,
  // % from left
  animateDuration: 250,
  // ms
  animateEasing: S.Cubic.easeOut,
  // showLabels: false,
  beforeLabel: "",
  // before Image
  afterLabel: ""
  // after Image
};
class tt {
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
    let s = this._eventCallbacks[i];
    const n = { bubbles: !1, cancelable: !1, detail: t }, a = new CustomEvent(i, n);
    s && s.forEach((r) => r.call(this, a)), this.element.dispatchEvent(a);
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
    let s = this._eventCallbacks[i];
    return s ? arguments.length === 1 ? (delete this._eventCallbacks[i], this) : (this._eventCallbacks[i] = s.filter(
      (n) => n !== t
    ), this) : this;
  }
}
const y = "sic", et = "data-" + y, E = "interacting", N = "init", R = "drag", x = "update", C = "viewchange", F = "beforeshown", W = "aftershown", $ = "interactionstart", q = "interactionend", b = "mousedown", st = "resize";
let I = [], M = !1;
const j = (e = !0, i = "#ffffff") => `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="${i}" stroke-width="2" stroke-linecap="round" stroke-linejoin="arcs"><path d="${e ? "m12 24 8-8-8-8" : "m20 8-8 8 8 8"}"/></svg>`;
class u extends tt {
  constructor(t, s) {
    if (!t)
      return { error: !0 };
    if (t = typeof t == "string" ? document.querySelector(t) : t, t === null || t.length === 0)
      return { error: !0 };
    super();
    d(this, "_dimensions", (t, s = !1, n = !this._horizontal) => {
      const a = this.element.getBoundingClientRect(), r = getComputedStyle(this.element), l = parseFloat(r.borderLeftWidth) + parseFloat(r.borderRightWidth), _ = parseFloat(r.borderTopWidth) + parseFloat(r.borderBottomWidth);
      this.width = a.width - l, this.height = a.height - _;
      let h;
      if (this._horizontal) {
        const o = a.x;
        h = this._dragHandle.offsetWidth * 0.5, this._dim = this.width, this._offset = h - o, this._minPos = o + this.settings.handleMinDistance - h, this._maxPos = o + this.width - h - this.settings.handleMinDistance;
      } else {
        const o = this.element.offsetTop;
        h = this._dragHandle.offsetHeight * 0.5, this._dim = this.height, this._offset = h - o, this._minPos = o + this.settings.handleMinDistance - h, this._maxPos = o + this.height - h - this.settings.handleMinDistance;
      }
      !s && this._oldDim === this._dim || (this._oldDim = this._dim, n && this._usePicture && this._checkCurrentImageSource(this._firstImage), this._setPosition(this._percent, !0));
    });
    d(this, "_mouseOver", () => {
      this.stop(), this.element.classList.add(E);
    });
    d(this, "_mouseOut", () => {
      this.element.classList.remove(E), this.settings.snapToStart && this._snapToStart();
    });
    d(this, "_mouseMove", (t) => {
      this.stop(), this._setPosition(this._calcPercent(this._getPos(t)));
    });
    // if tapped on canvas
    d(this, "_tapstart", (t) => {
      t.stopPropagation(), this._endInteraction = !1, this.stop(), clearTimeout(this._snapTimeout), this._triggerEvent($), t.type === "touchstart" ? (this.isTouch = !0, this._mouseStartEvents(!1)) : b === t.type && (this.isTouch = !1, this._touchStartEvent(!1));
      const s = this._calcPercent(this._getPos(t));
      this.settings.animateOnClick ? this._animateTo(s, this.settings.animateDuration) : this._setPosition(s);
    });
    d(this, "_dragStart", (t) => {
      t.stopPropagation(), this.startPos = this._getPos(t), this.element.classList.add(E), this._tapstart(t), t.type === "touchstart" ? (window.addEventListener("touchmove", this._drag, w), window.addEventListener("touchend", this._dragEnd, !1)) : b === t.type && (this.settings.followMouse || (window.addEventListener("mousemove", this._drag, !1), window.addEventListener("mouseup", this._dragEnd, !1)));
    });
    // moving
    d(this, "_drag", (t) => {
      this.stop();
      let s = this._getPos(t), n = this._calcPercent(s);
      if (this.isTouch) {
        t.preventDefault();
        const a = Math.abs(this.startPos.x - s.x), r = Math.abs(this.startPos.y - s.y);
        if (!this._dirDetected) {
          if (r > a) {
            this.element.classList.remove(E), window.removeEventListener(
              "touchmove",
              this._drag,
              w
            );
            return;
          }
          this.element.classList.add(E), this._dirDetected = !0;
        }
      }
      this._setPosition(n), this._triggerEvent(R);
    });
    d(this, "_dragEnd", (t) => {
      this._endInteraction = !0, t.type === "touchend" ? (this.isTouch = !0, window.removeEventListener("touchmove", this._drag, w), window.removeEventListener("touchend", this._dragEnd)) : t.type === "mouseup" && (this.isTouch = !1, this.settings.followMouse || (window.removeEventListener("mousemove", this._drag, !1), window.removeEventListener("mouseup", this._dragEnd, !1))), this._testInteractionEnd(), this._dirDetected = !1;
    });
    if (t.dataset.sicinitialized)
      return u.getInstance(t);
    t.dataset.sicinitialized = !0, this.allowedEvents = [
      N,
      R,
      x,
      F,
      W,
      $,
      q,
      C
    ], I.push(this), G.put(t, "instance", this), this.element = t;
    const n = Z(t, y);
    if (this.options = s || {}, this.settings = Object.assign({}, u.defaults, n, s), this.images = this.element.querySelectorAll("img"), this.picture = this.element.querySelectorAll("picture"), (!this.settings.beforeImage || !this.settings.afterImage) && (!this.images || !this.images.length) && (!this.picture || !this.picture.length))
      return {
        error: !0
      };
    this.element.classList.contains(y + "-main") || this.element.classList.add(y + "-main"), this._snapTimeout = null, this._dirDetected = !1, this.settings.autoInit && this.init();
  }
  _triggerEvent(t, s) {
    s = A({
      instance: this,
      horizontal: this._horizontal,
      ltr: this._ltr,
      percent: this._percent,
      afterShown: this._afterShown
    }, s), this.emit(t, s);
  }
  /**
   * Method to return the current position
   *
   * @param {Event} evt The current event used (e.g. touchmove)
   * @returns {Object} containing the x an y position
   */
  _getPos(t) {
    let s;
    return typeof t.pageX != "undefined" ? s = t : s = t.touches[0] || t.changedTouches[0], {
      x: s.pageX,
      y: s.pageY
    };
  }
  /**
   * Method to create the gui for this plugin
   */
  _createGui() {
    const t = this.settings;
    this._originalEl = [], this._createdEl = [];
    const s = "div";
    let n, a;
    const r = c(
      s,
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
      ].reduce((P, p) => (P.push(
        c(
          "img",
          { draggable: !1, src: p },
          { width: "100%", display: "block" }
        )
      ), P), []), this.element.appendChild(n), r.appendChild(a), this.element.appendChild(r), this._createdEl.push(n);
    else {
      const [P, p] = this.picture && this.picture.length === 2 ? this.picture : this.images;
      n = P, a = p.cloneNode(!0), [n, a].forEach((D) => {
        D.setAttribute("draggable", !1), D.style.width = "100%", D.style.display = "block";
      }), r.appendChild(a), p.parentNode.replaceChild(r, p), this._originalEl.push(p);
    }
    this._createdEl.push(r);
    const l = c(
      s,
      {
        class: "sic-handle"
      },
      {
        position: "absolute"
      }
    ), _ = c(s, { class: "sic-line sic-line-1" }), h = c(s, { class: "sic-line sic-line-2" }), o = c(s, { class: "sic-arrows" }), v = c(s, { class: "sic-arrow sic-arrow-1" }), f = c(s, { class: "sic-arrow sic-arrow-2" }), O = c(s, { class: "sic-circle" });
    v.innerHTML = j(!1), f.innerHTML = j(), o.append(v, f), O.append(o), l.append(_, h, O), this.element.append(l), this._createdEl.push(l);
    let g, m;
    t.beforeLabel !== "" && (g = c(s, { class: "sic-label sic-label-one" }), g.innerHTML = t.beforeLabel, this.element.append(g), this._createdEl.push(g)), t.afterLabel !== "" && (m = c(s, { class: "sic-label sic-label-two" }), m.innerHTML = t.afterLabel, this.element.append(m), this._createdEl.push(m)), this.info1 = t.ltr ? g : m, this.info2 = t.ltr ? m : g, this.element.classList.add(
      this._horizontal ? "sic-horizontal" : "sic-vertical"
    ), this.element.style.position = "relative", this.element.style.overflow = "hidden", this.element.style.visibility = "visible", this._dragHandle = l, this._clipEl = r;
  }
  /**m
   * Method to remove or add mouse events
   *
   * @param {Boolean} add true or false
   */
  _mouseStartEvents(t = !0) {
    const s = this._addRemove(t), n = this.settings;
    if (n.followMouse) {
      const a = this.element;
      a[s]("mouseenter", this._mouseOver, !1), a[s]("mouseleave", this._mouseOut, !1), a[s]("mousemove", this._mouseMove, !1);
    } else
      this._dragEl[s](b, this._dragStart), n.onlyHandleDraggable && n.clickable && (this.element[s](b, this._tapstart, !1), this.element[s]("mouseup", this._dragEnd, !1));
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
    const s = this._addRemove(t);
    this._dragEl[s]("touchstart", this._dragStart, w), this.settings.clickable && (this.element[s]("touchstart", this._tapstart, !1), this.element[s]("touchend", this._dragEnd, !1));
  }
  /**
   * method to add or remove events
   *
   * @param {Boolean} add
   */
  _appEvents(t = !0) {
    this._touchStartEvent(t), this._mouseStartEvents(t);
    const s = this._addRemove(t);
    window[s](st, this._dimensions);
  }
  /**
   * stop method
   */
  stop() {
    this._renderId && (cancelAnimationFrame(this._renderId), this.element.classList.contains("playing") && this.element.classList.remove("playing"), this._renderId = void 0);
  }
  _testInteractionEnd() {
    this._endInteraction && this._renderId === void 0 && (this._endInteraction = !1, this._interactionEnd(), this._triggerEvent(q));
  }
  /**
   *
   * @param {float} from the from percent value
   * @param {float} to the to percent value
   * @param {float} delta the delta percent value
   * @returns {boolean} true if stopped
   */
  _renderLoop(t, s, n) {
    const a = () => {
      const r = Date.now();
      if (this._timingThen !== 0) {
        if (this._timingCurTime += r - this._timingThen, this.progress = this._timingCurTime / this._animationDuration, this.progress >= 1) {
          this.progress = 1, this._setPosition(s), this.stop(), this._testInteractionEnd();
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
  _animateTo(t, s, n) {
    if (t = H(+t, 0, 100), !s) {
      this._setPosition(t);
      return;
    }
    const a = t - this._percent;
    this._animationDuration = s, this.easing = n || this.settings.animateEasing, this.progress = 0, this._timingThen = this._timingCurTime = 0, this._renderLoop(this._percent, t, a);
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
    this.element.classList.remove(E), this.isTouch ? this._mouseStartEvents() : this._touchStartEvent(), this.settings.snapToStart && this._snapToStart();
  }
  /**
   * helper for the picture element
   * @param {string} element the first image element
   */
  _checkCurrentImageSource(t) {
    clearTimeout(this._checkTo), this._checkTo = setTimeout(() => {
      const s = t.currentSrc;
      this._firstImageSrc !== s && (this._firstImageSrc = s, this._dimensions(null, !1, !1));
    }, 250);
  }
  _getClipRect(t) {
    return this._horizontal ? this._ltr ? `rect(0 ${t}px 100% 0)` : `rect(0 ${this.width}px 100% ${t}px)` : this._ltr ? `rect(0 100% ${t}px 0)` : `rect(${t}px 100% 100% 0)`;
  }
  _changeStatus(t) {
    this._afterShown = t;
    let s = this._afterShown ? W : F;
    this._triggerEvent(s), this._triggerEvent(C), this._oneTime = !1;
  }
  /**
   * set the handle to a defined position (in percent from left)
   * @param {Number} percent Percent of the new handle position from left
   */
  _setPosition(t, s = !1) {
    if (t === this._percent && !s)
      return !1;
    this._percent = t;
    const n = this._dim * 0.01 * t;
    this._clipEl.style.clipPath = this._getClipRect(n), this._dragHandle.style.transform = this._horizontal ? `translate(${n}px, 0)` : `translate(0, ${n}px)`, this.info1 && (this.info1.style.opacity = t < 50 ? 1 : (100 - t) / 50), this.info2 && (this.info2.style.opacity = t > 50 ? 1 : t / 50);
    let a = this._ltr ? this._afterShown : !this._afterShown;
    t > 70 && (this._oneTime || !a) ? this._changeStatus(this._ltr) : t < 30 && (this._oneTime || a) && this._changeStatus(!this._ltr), this._triggerEvent(x);
  }
  /**
   * convert pixel position to percent from left
   * @param  {Object} pos The position object { x, y }
   * @return {Number}         The left percent value
   */
  _calcPercent(t) {
    let s = this._horizontal ? t.x : t.y;
    return s = H(s, this._minPos, this._maxPos), (s + this._offset) * 100 / this._dim;
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
    this._initialized = !0, this._oneTime = !0, this._afterShown = !1, this._ltr = k(t.ltr), this._horizontal = k(t.horizontal), this._usePicture = this.picture && this.picture.length === 2, this._createGui(), this._dragEl = t.onlyHandleDraggable ? this._dragHandle : this.element, this._animationDuration = t.animateInDuration || 0, t.startPos = T(t.startPos, 0, 100), t.animateInStartPos = T(t.animateInStartPos, 0, 100), t.startPos || (t.startPos = 50), t.animateInStartPos || (t.animateInStartPos = 0), t.animateIn ? this._percent = this._animationDuration > 0 ? t.animateInStartPos : t.startPos : this._percent = t.startPos, this.element.style.opacity = 0, this.isTouch = "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch || navigator.maxTouchPoints > 0 || window.navigator.msMaxTouchPoints > 0, this.allowedEvents.forEach((s) => {
      t[s] && this.addEventListener(s, t[s]);
    }), this._firstImage = this._usePicture ? this.picture[0].querySelector("img") : this.images[0], this._firstImageSrc = this._firstImage.currentSrc || this._firstImage.src, J(this._firstImageSrc).then(() => {
      this._dimensions(), this._setPosition(this._percent), this.element.style.opacity = 1, t.animateIn && this._animationDuration > 0 && this.settings.animateInStartPos !== this.settings.startPos && setTimeout(
        () => this._animateTo(
          this.settings.startPos,
          this._animationDuration,
          this.settings.animateInEasing
        ),
        this.settings.animateInDelay
      ), this._appEvents(), this._triggerEvent(N), this._triggerEvent(C);
    });
  }
  /**
   *
   * @param {Integer} stopAt The Position (0-100) where it should stop
   * @param {Integer} repetitions How often should it bounce (0 means endless)
   * @param {Integer} duration The animation Duration form 0 - 100 in ms
   * @param {Function} easingFun An easing-function eg.: (p) => p (for linear);
   */
  play(t = this._percent, s = 2, n = 2e3, a) {
    this.stop(), clearTimeout(this._snapTimeout), n = T(n, 250, 1e4), t = T(t, 0, 100);
    let r = this._percent, l = 100 - r, _ = n / 100 * Math.abs(l), h = !0, o = 0;
    s <= 0 && (s = -1), this.progress = this._timingCurTime = this._timingThen = 0, this.easing = a || S.Quad.easeOut;
    const v = () => {
      let f = Date.now();
      if (this._timingCurTime += f - (this._timingThen || f), this.progress = this._timingCurTime / _, this.progress >= 1) {
        if (o === s) {
          this.element.classList.remove("playing");
          return;
        }
        _ = n, h ? (r = 100, l = -100) : (r = 0, l = 100), h = !h, o++, o === s && (l = h ? t : t - 100, _ = n / 100 * Math.abs(l)), this._setPosition(r), f = Date.now(), this._timingCurTime = 0;
      } else
        this._setPosition(r + l * this.easing(this.progress));
      this._timingThen = f, this._renderId = requestAnimationFrame(v);
    };
    this.element.classList.add("playing"), v();
  }
  goto(t, s, n) {
    return isNaN(t) || (t = T(+t, 0, 100), t === this._percent) ? !1 : (this.stop(), this._animateTo(t, s, n), this);
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
u.init = () => {
  if (M)
    return !0;
  M = !0;
  let e = document.querySelectorAll("[" + et + "]");
  return e.length === 0 ? !1 : (e.forEach((i) => {
    new u(i);
  }), I);
};
u.destroyAll = () => I.length ? (I.forEach((e) => {
  e.destroy();
}), M = !1, I = [], !0) : !1;
u.getInstance = (e) => G.get(e, "instance");
u.defaults = V;
Y(u.init);
export {
  u as default
};
