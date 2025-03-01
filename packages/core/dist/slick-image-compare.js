/*!
* SlickImageCompare v0.4.10
* https://lemon3.github.io/slick-image-compare
*/
var q = Object.defineProperty;
var M = Object.getOwnPropertySymbols;
var G = Object.prototype.hasOwnProperty, X = Object.prototype.propertyIsEnumerable;
var C = (i, s, t) => s in i ? q(i, s, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[s] = t, A = (i, s) => {
  for (var t in s || (s = {}))
    G.call(s, t) && C(i, t, s[t]);
  if (M)
    for (var t of M(s))
      X.call(s, t) && C(i, t, s[t]);
  return i;
};
var u = (i, s, t) => C(i, typeof s != "symbol" ? s + "" : s, t);
const U = {
  // storage
  _s: /* @__PURE__ */ new WeakMap(),
  put(i, ...s) {
    this._s.has(i) || this._s.set(i, /* @__PURE__ */ new Map());
    let t = this._s.get(i);
    if (s.length > 1)
      return t.set(s[0], s[1]), this;
    if (typeof s[0] == "object")
      for (const e in s[0])
        t.set(e, s[0][e]);
    else
      t.set(s[0]);
    return this;
  },
  get(i, s) {
    return this._s.has(i) ? s ? this._s.get(i).get(s) : this._s.get(i) : !1;
  },
  has(i, s) {
    return this._s.has(i) && this._s.get(i).has(s);
  },
  // todo if no key given: remove all
  remove(i, s) {
    if (!this._s.has(i))
      return !1;
    let t = this._s.get(i).delete(s);
    return this._s.get(i).size === 0 && this._s.delete(i), t;
  }
}, z = (i) => i === !0 || i === "true" || i === 1 || i === "1", Y = (i) => new Promise((s, t) => {
  const e = new Image();
  e.onload = () => {
    const { naturalWidth: n, naturalHeight: a } = e, r = n / a;
    s({ width: n, height: a, ratio: r });
  }, e.onerror = () => {
    t(`The image source (${i}) was not found!`);
  }, e.src = i;
}), Q = (i) => {
  if (!i.match(/[^\w]+/i)) return i;
  const s = {};
  return i = i.replace("{", "").replace("}", "").trim(), i.split(",").forEach((e) => {
    if (e === "")
      return;
    let [n, a] = e.split(":");
    n = n.trim().replaceAll("'", ""), a = a.trim().replaceAll("'", ""), s[n] = a;
  }), s;
}, J = (i, s) => i ? i.dataset[s] === void 0 ? i.dataset[s] : Q(i.dataset[s]) : !1;
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
} catch (i) {
  v = !1;
}
const x = (i, s, t) => Math.max(s, Math.min(i, t)), m = (i, s, t) => {
  if (i = parseFloat(i, 10), s = parseFloat(s, 10), t = parseFloat(t, 10), t < s) {
    let e = t;
    t = s, s = e;
  }
  return !isNaN(s) && i < s ? s : !isNaN(t) && i > t ? t : i;
}, Z = (i, s, t, e) => {
  if (s)
    for (let n in s)
      Object.prototype.hasOwnProperty.call(s, n) && i.setAttribute(n, s[n]);
  if (t)
    for (let n in t)
      Object.prototype.hasOwnProperty.call(t, n) && (i.style[n] = t[n]);
  return i;
}, _ = (i, s, t, e) => Z(document.createElement(i), s, t), I = {
  // Pow: {},
  Quad: {
    easeOut: (i) => 1 - Math.pow(1 - i, 2)
  },
  Cubic: {
    easeOut: (i) => 1 - Math.pow(1 - i, 3)
  },
  Elastic: {
    easeOut: (i) => {
      const s = 2 * Math.PI / 3;
      return i === 0 || i === 1 ? i : Math.pow(2, -10 * i) * Math.sin((i * 10 - 0.75) * s) + 1;
    }
  }
}, K = {
  combineDataset: !0,
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
  snapToStartEasing: I.Elastic.easeOut,
  // TODO: implement
  handleMinDistance: 0,
  // min distance to left and right border in px TODO: also %
  handleAngle: 0,
  // angle of the parting line
  // animate in
  animateIn: !1,
  animateInDuration: 1250,
  // ms
  animateInEasing: I.Elastic.easeOut,
  animateInDelay: 100,
  // in ms
  animateInStartPos: 40,
  // % from left
  animateDuration: 250,
  // ms
  animateEasing: I.Cubic.easeOut,
  // showLabels: false,
  beforeLabel: "",
  // before Image
  afterLabel: ""
  // after Image
};
class V {
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
  emit(s, t) {
    let e = this._eventCallbacks[s];
    const n = { bubbles: !1, cancelable: !1, detail: t }, a = new CustomEvent(s, n);
    e && e.forEach((r) => r.call(this, a)), this.element.dispatchEvent(a);
  }
  /**
   * Register an event handler
   *
   * @param {string} eventName the name of the eventlistener
   * @param {function} listener the handler function to be called if the event triggers
   * @returns
   */
  addEventListener(s, t) {
    return this.allowedEvents && this.allowedEvents.indexOf(s) < 0 || typeof t != "function" ? !1 : (this._eventCallbacks[s] || (this._eventCallbacks[s] = []), this._eventCallbacks[s].push(t), this);
  }
  /**
   * Remove previously register event handler
   *
   *
   * @param {[string]} eventName the name of the eventlistener
   * @param {[function]} listener the handler function
   * @returns
   */
  removeEventListener(s, t) {
    if (!this._eventCallbacks || arguments.length === 0)
      return this._eventCallbacks = {}, this;
    let e = this._eventCallbacks[s];
    return e ? arguments.length === 1 ? (delete this._eventCallbacks[s], this) : (this._eventCallbacks[s] = e.filter(
      (n) => n !== t
    ), this) : this;
  }
}
const P = "sic", tt = "data-" + P, w = "interacting", H = "init", k = "drag", $ = "update", D = "viewchange", R = "beforeshown", N = "aftershown", F = "interactionstart", W = "interactionend", T = "mousedown", b = "mouseup", et = "resize";
let p = [], L = !1;
const j = (i = !0, s = "#ffffff") => `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="${s}" stroke-width="2" stroke-linecap="round" stroke-linejoin="arcs"><path d="${i ? "m12 24 8-8-8-8" : "m20 8-8 8 8 8"}"/></svg>`;
class f {
  constructor(s, t) {
    if (!s)
      return { error: !0 };
    if (s = typeof s == "string" ? document.querySelectorAll(s) : s, s === null || s.length === 0)
      return { error: !0 };
    if (s.length > 1) {
      const e = [];
      return s.forEach((n) => {
        const a = new B(n, t);
        e.push(a);
      }), e;
    }
    return s = s.length ? s[0] : s, new B(s, t);
  }
}
class B extends V {
  constructor(t, e) {
    super();
    /**
     * Helper method.
     *
     * @param {Boolean} add true for addEventListener
     *                      false for removeEventListener
     * @returns String addEventListener or removeEventListener
     */
    u(this, "_addRemove", (t = !0) => (t ? "add" : "remove") + "EventListener");
    u(this, "_dimensions", (t, e = !1, n = !this._horizontal) => {
      const { width: a, height: r, x: h } = this.element.getBoundingClientRect(), l = getComputedStyle(this.element), d = parseFloat(l.borderLeftWidth) + parseFloat(l.borderRightWidth), g = parseFloat(l.borderTopWidth) + parseFloat(l.borderBottomWidth);
      this.width = a - d, this.height = r - g;
      let o;
      if (this._horizontal)
        o = this._dragHandle.offsetWidth * 0.5, this._dim = this.width, this._offset = o - h, this._minPos = h + this.settings.handleMinDistance - o, this._maxPos = h + this.width - o - this.settings.handleMinDistance;
      else {
        const c = this.element.offsetTop;
        o = this._dragHandle.offsetHeight * 0.5, this._dim = this.height, this._offset = o - c, this._minPos = c + this.settings.handleMinDistance - o, this._maxPos = c + this.height - o - this.settings.handleMinDistance;
      }
      !e && this._oldDim === this._dim || (this._oldDim = this._dim, n && this._usePicture && this._checkCurrentImageSource(this._firstImage), this._radians && (this._angleOffset = Math.tan(this._radians) * 0.5 * (this._horizontal ? this.height : this.width)), this._setPosition(this._percent, !0));
    });
    u(this, "_mouseOver", () => {
      this.stop(), this.element.classList.add(w);
    });
    u(this, "_mouseOut", () => {
      this.element.classList.remove(w), this.settings.snapToStart && this._snapToStart();
    });
    u(this, "_mouseMove", (t) => {
      this.stop(), this._setPosition(this._calcPercent(this._getPos(t)));
    });
    // if tapped on canvas
    u(this, "_tapstart", (t) => {
      t.stopPropagation(), this._endInteraction = !1, this.stop(), clearTimeout(this._snapTimeout), this._triggerEvent(F), t.type === "touchstart" ? (this.isTouch = !0, this._mouseStartEvents(!1)) : T === t.type && (this.isTouch = !1, this._touchStartEvent(!1));
      const e = this._calcPercent(this._getPos(t));
      this.settings.animateOnClick ? this._animateTo(e, this.settings.animateDuration) : this._setPosition(e);
    });
    u(this, "_dragStart", (t) => {
      t.stopPropagation(), this.startPos = this._getPos(t), this.element.classList.add(w), this._tapstart(t), t.type === "touchstart" ? (window.addEventListener("touchmove", this._drag, v), window.addEventListener("touchend", this._dragEnd, !1)) : T === t.type && (this.settings.followMouse || (window.addEventListener("mousemove", this._drag, !1), window.addEventListener(b, this._dragEnd, !1)));
    });
    // moving
    u(this, "_drag", (t) => {
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
      this._setPosition(n), this._triggerEvent(k);
    });
    u(this, "_dragEnd", (t) => {
      this._endInteraction = !0, t.type === "touchend" ? (this.isTouch = !0, window.removeEventListener("touchmove", this._drag, v), window.removeEventListener("touchend", this._dragEnd)) : b === t.type && (this.isTouch = !1, this.settings.followMouse || (window.removeEventListener("mousemove", this._drag, !1), window.removeEventListener(b, this._dragEnd, !1))), this._testInteractionEnd(), this._dirDetected = !1;
    });
    if (t.dataset.sicinitialized)
      return f.getInstance(t);
    if (t.dataset.sicinitialized = !0, this.allowedEvents = [
      H,
      k,
      $,
      R,
      N,
      F,
      W,
      D
    ], this.element = t, this.settings = this._createSettings(t, e), this.settings.autoInit)
      return this.init();
  }
  _triggerEvent(t, e) {
    e = A({
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
    const r = _(
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
      ].reduce(
        (y, E) => [
          ...y,
          _(
            "img",
            { draggable: !1, src: E },
            { width: "100%", display: "block" }
          )
        ],
        []
      ), this.element.appendChild(n), r.appendChild(a), this.element.appendChild(r), this._createdEl.push(n);
    else {
      const [y, E] = this.picture && this.picture.length === 2 ? this.picture : this.images;
      n = y, a = E.cloneNode(!0), [n, a].forEach((S) => {
        S.setAttribute("draggable", !1), S.style.width = "100%", S.style.display = "block";
      }), r.appendChild(a), E.parentNode.replaceChild(r, E), this._originalEl.push(E);
    }
    this._createdEl.push(r);
    const h = _(
      e,
      {
        class: "sic-handle"
      },
      {
        position: "absolute"
      }
    );
    let l, d;
    this._angle && (l = {
      transform: `rotate(${this._angle}deg)`,
      transformOrigin: "bottom center"
    }, d = {
      transform: `rotate(${this._angle}deg)`,
      transformOrigin: "top center"
    }), this._line1 = _(e, { class: "sic-line sic-line-1" }, l), this._line2 = _(e, { class: "sic-line sic-line-2" }, d);
    const g = _(e, { class: "sic-arrows" }), o = _(e, { class: "sic-arrow sic-arrow-1" }), c = _(e, { class: "sic-arrow sic-arrow-2" }), O = _(e, { class: "sic-circle" });
    o.innerHTML = j(!1), c.innerHTML = j(), g.append(o, c), O.append(g), h.append(this._line1, this._line2, O), this.element.append(h), this._createdEl.push(h), t.beforeLabel !== "" && (this.info1 = _(e, { class: "sic-label sic-label-one" }), this.info1.innerHTML = decodeURIComponent(
      this._ltr ? t.beforeLabel : t.afterLabel
    ), this.element.append(this.info1), this._createdEl.push(this.info1)), t.afterLabel !== "" && (this.info2 = _(e, { class: "sic-label sic-label-two" }), this.info2.innerHTML = decodeURIComponent(
      this._ltr ? t.afterLabel : t.beforeLabel
    ), this.element.append(this.info2), this._createdEl.push(this.info2)), this.element.classList.add(
      this._horizontal ? "sic-horizontal" : "sic-vertical"
    ), this.element.style.position = "relative", this.element.style.overflow = "hidden", this.element.style.visibility = "visible", this._dragHandle = h, this._clipEl = r;
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
      this._dragEl[e](T, this._dragStart), n.onlyHandleDraggable && n.clickable && (this.element[e](T, this._tapstart, !1), this.element[e](b, this._dragEnd, !1));
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
    window[e](et, this._dimensions);
  }
  /**
   * stop method
   */
  stop() {
    this._renderId && (cancelAnimationFrame(this._renderId), this.element.classList.contains("playing") && this.element.classList.remove("playing"), this._renderId = void 0);
  }
  /**
   * test if an interaction is ended
   */
  _testInteractionEnd() {
    this._endInteraction && this._renderId === void 0 && (this._endInteraction = !1, this._interactionEnd(), this._triggerEvent(W));
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
    if (t = x(+t, 0, 100), !e) {
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
    let e = setTimeout(() => {
      clearTimeout(e);
      const n = t.currentSrc;
      this._firstImageSrc !== n && (this._firstImageSrc = n, this._dimensions(null, !1, !1));
    }, 250);
  }
  _getClipPolygon(t) {
    return this._horizontal ? this._ltr ? `polygon(${t + this._angleOffset}px 0, 100% 0, 100% 100%, ${t - this._angleOffset}px 100%)` : `polygon(0 0, ${t + this._angleOffset}px 0, ${t - this._angleOffset}px 100%, 0 100%)` : this._ltr ? `polygon(0 ${t - this._angleOffset}px, 100% ${t + this._angleOffset}px, 100% 100%, 0 100%)` : `polygon(0 0, 100% 0, 100% ${t + this._angleOffset}px, 0 ${t - this._angleOffset}px)`;
  }
  /**
   *
   * @param {number} pos the pixel value from the left position
   * @returns
   */
  _getClipRect(t) {
    return this._horizontal ? this._ltr ? `rect(0 ${this.width}px 100% ${t}px)` : `rect(0 ${t}px 100% 0)` : this._ltr ? `rect(${t}px 100% 100% 0)` : `rect(0 100% ${t}px 0)`;
  }
  _changeStatus(t) {
    this._afterShown = t;
    let e = this._afterShown ? N : R;
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
    this._clipEl.style.clipPath = this._getClip(n), this._dragHandle.style.transform = this._horizontal ? `translate(${n}px, 0)` : `translate(0, ${n}px)`, this.info2 && (this.info2.style.opacity = // percent < 50 ? 1 : Math.max(0, (95 - percent) / 50);
    Math.min(1, Math.max(0, (95 - t) / 45))), this.info1 && (this.info1.style.opacity = // this.info1.style.opacity = percent > 50 ? 1 : percent / 50;
    Math.min(1, Math.max(0, (t - 5) / 45)));
    let a = this._ltr ? !this._afterShown : this._afterShown;
    t > 55 && (this._oneTime || !a) ? this._changeStatus(!this._ltr) : t < 45 && (this._oneTime || a) && this._changeStatus(this._ltr), this._triggerEvent($);
  }
  /**
   * convert pixel position to percent from left
   * @param  {Object} pos The position object { x, y }
   * @return {Number}         The left percent value
   */
  _calcPercent(t) {
    let e = this._horizontal ? t.x : t.y;
    return e = x(e, this._minPos, this._maxPos), (e + this._offset) * 100 / this._dim;
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
  _createSettings(t, e = {}) {
    let n;
    const a = Object.assign({}, f.defaults, e);
    if (a.combineDataset) {
      let r = J(this.element, P);
      n = Object.assign({}, f.defaults, r, e);
    } else
      n = a;
    return n;
  }
  // public user function
  init(t = null) {
    if (this._initialized)
      return this;
    t && (this.settings = this._createSettings(this.element, t)), this.options = t;
    const e = this.settings;
    if (this.images = this.element.querySelectorAll("img"), this.picture = this.element.querySelectorAll("picture"), (!e.beforeImage || !e.afterImage) && (!this.images || this.images.length !== 2) && (!this.picture || this.picture.length !== 2))
      return {
        error: !0
      };
    p.push(this), U.put(this.element, "instance", this), this.element.classList.contains(P + "-main") || this.element.classList.add(P + "-main"), this._snapTimeout = null, this._dirDetected = !1, this._initialized = !0, this._oneTime = !0, this._afterShown = !1, this._ltr = z(e.ltr), this._horizontal = z(e.horizontal), this._usePicture = this.picture && this.picture.length === 2, this._angle = m(e.handleAngle, -30, 30), this._getClip = this._getClipRect, this._angle && (this._radians = this._angle * Math.PI / 180, this._getClip = this._getClipPolygon), this._createGui(), this._dragEl = e.onlyHandleDraggable ? this._dragHandle : this.element, this._animationDuration = e.animateInDuration || 0, e.startPos = m(e.startPos, 0, 100), e.animateInStartPos = m(e.animateInStartPos, 0, 100), e.startPos || (e.startPos = 50), e.animateInStartPos || (e.animateInStartPos = 0), e.animateIn ? this._percent = this._animationDuration > 0 ? e.animateInStartPos : e.startPos : this._percent = e.startPos, this.element.style.opacity = 0, this.isTouch = "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch || navigator.maxTouchPoints > 0 || window.navigator.msMaxTouchPoints > 0, this.allowedEvents.forEach((n) => {
      e[n] && this.addEventListener(n, e[n]);
    }), this._firstImage = this._usePicture ? this.picture[0].querySelector("img") : this.images[0], this._firstImageSrc = this._firstImage.currentSrc || this._firstImage.src, Y(this._firstImageSrc).then(() => {
      this._dimensions(null, !0), this.element.style.opacity = 1, e.animateIn && this._animationDuration > 0 && e.animateInStartPos !== e.startPos && (this._snapTimeout = setTimeout(
        () => this._animateTo(
          e.startPos,
          this._animationDuration,
          e.animateInEasing
        ),
        e.animateInDelay
      )), this._appEvents(), this._triggerEvent(H), this._triggerEvent(D);
    }).catch((n) => {
      console.error(n);
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
    this.stop(), clearTimeout(this._snapTimeout), n = m(n, 250, 1e4), t = m(t, 0, 100);
    let r = this._percent, h = 100 - r, l = n / 100 * Math.abs(h), d = !0, g = 0;
    e <= 0 && (e = -1), this.progress = this._timingCurTime = this._timingThen = 0, this.easing = a || I.Quad.easeOut;
    const o = () => {
      let c = Date.now();
      if (this._timingCurTime += c - (this._timingThen || c), this.progress = this._timingCurTime / l, this.progress >= 1) {
        if (g === e) {
          this.element.classList.remove("playing");
          return;
        }
        l = n, d ? (r = 100, h = -100) : (r = 0, h = 100), d = !d, g++, g === e && (h = d ? t : t - 100, l = n / 100 * Math.abs(h)), this._setPosition(r), c = Date.now(), this._timingCurTime = 0;
      } else
        this._setPosition(r + h * this.easing(this.progress));
      this._timingThen = c, this._renderId = requestAnimationFrame(o);
    };
    this.element.classList.add("playing"), o();
  }
  animateTo(t, e = this.settings.animateDuration, n = this.settings.animateEasing) {
    return isNaN(t) || (t = m(+t, 0, 100), t === this._percent) ? !1 : (this.stop(), this._animateTo(t, e, n), this);
  }
  goto(t) {
    return isNaN(t) ? !1 : (t = m(+t, 0, 100), this.stop(), this._setPosition(t), this);
  }
  setAngle(t) {
    t = +t, this._angle = t, this._angle === 0 ? (this._getClip = this._getClipRect, this._line1.removeAttribute("style"), this._line2.removeAttribute("style"), this._radians = null) : (this._getClip = this._getClipPolygon, this._radians = this._angle * Math.PI / 180, this._line1.style.transform = `rotate(${this._angle}deg)`, this._line2.style.transform = `rotate(${this._angle}deg)`, this._horizontal ? (this._line1.style.transformOrigin = "bottom center", this._line2.style.transformOrigin = "top center") : (this._line1.style.transformOrigin = "right bottom", this._line2.style.transformOrigin = "left bottom")), this._dimensions(null, !0);
  }
  /**
   * ltr = true  (before, 0%) L -> R (after, 100%)
   * ltr = false (after, 0%)  R -> L (before, 100%)
   */
  changeDirection() {
    this._ltr = !this._ltr;
    let t = this.info1.innerHTML;
    this.info1.innerHTML = this.info2.innerHTML, this.info2.innerHTML = t, this._percent = 100 - this._percent, this._dimensions(null, !0);
  }
  /**
   * horizontal or vertical slider
   */
  changeOrientation() {
    const t = this._horizontal;
    this._horizontal = !t, this.element.classList.remove(t ? "sic-horizontal" : "sic-vertical"), this.element.classList.add(
      this._horizontal ? "sic-horizontal" : "sic-vertical"
    ), this.setAngle(this._angle);
  }
  showAfter() {
    this._setPosition(this._ltr ? 0 : 100);
  }
  showBefore() {
    this._setPosition(this._ltr ? 100 : 0);
  }
  get elem() {
    return this.element;
  }
  toggleView() {
    this.stop(), this._afterShown ? this.showBefore() : this.showAfter();
  }
  destroy() {
    this.element.removeAttribute("data-sicinitialized"), this._createdEl.forEach((t) => this.element.removeChild(t)), this._originalEl.forEach((t) => this.element.appendChild(t)), this._createdEl = this._originalEl = [], this.stop(), this.progress = this._timingCurTime = this._timingThen = 0, this._snapTimeout = null, this._oneTime = !1, this._appEvents(!1), this._initialized = !1;
  }
}
f.defaults = K;
f.init = () => L ? !1 : (L = !0, new f("[" + tt + "]"), p);
f.destroyAll = () => p.length ? (p.forEach((i) => {
  i.destroy();
}), L = !1, p = [], !0) : !1;
f.getInstances = () => p.length ? p : !1;
f.getInstance = (i) => {
  U.get(i, "instance");
};
f.getDefaults = () => f.defaults;
export {
  f as default
};
