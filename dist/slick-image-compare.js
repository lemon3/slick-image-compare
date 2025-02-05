/*!
* SlickImageCompare v0.4.7
* https://lemon3.github.io/slick-image-compare
*/
var q = Object.defineProperty;
var M = Object.getOwnPropertySymbols;
var G = Object.prototype.hasOwnProperty, X = Object.prototype.propertyIsEnumerable;
var C = (i, e, t) => e in i ? q(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t, A = (i, e) => {
  for (var t in e || (e = {}))
    G.call(e, t) && C(i, t, e[t]);
  if (M)
    for (var t of M(e))
      X.call(e, t) && C(i, t, e[t]);
  return i;
};
var f = (i, e, t) => C(i, typeof e != "symbol" ? e + "" : e, t);
const U = {
  // storage
  _s: /* @__PURE__ */ new WeakMap(),
  put(i, ...e) {
    this._s.has(i) || this._s.set(i, /* @__PURE__ */ new Map());
    let t = this._s.get(i);
    if (e.length > 1)
      return t.set(e[0], e[1]), this;
    if (typeof e[0] == "object")
      for (const s in e[0])
        t.set(s, e[0][s]);
    else
      t.set(e[0]);
    return this;
  },
  get(i, e) {
    return this._s.has(i) ? e ? this._s.get(i).get(e) : this._s.get(i) : !1;
  },
  has(i, e) {
    return this._s.has(i) && this._s.get(i).has(e);
  },
  // todo if no key given: remove all
  remove(i, e) {
    if (!this._s.has(i))
      return !1;
    let t = this._s.get(i).delete(e);
    return this._s.get(i).size === 0 && this._s.delete(i), t;
  }
}, z = (i) => i === !0 || i === "true" || i === 1 || i === "1", Y = (i) => new Promise((e, t) => {
  const s = new Image();
  s.onload = () => {
    const { naturalWidth: n, naturalHeight: a } = s, r = n / a;
    e({ width: n, height: a, ratio: r });
  }, s.onerror = () => {
    t("error");
  }, s.src = i;
}), Q = (i) => {
  if (!i.match(/[^\w]+/i)) return i;
  const e = {};
  return i = i.replace("{", "").replace("}", "").trim(), i.split(",").forEach((s) => {
    if (s === "")
      return;
    let [n, a] = s.split(":");
    n = n.trim().replaceAll("'", ""), a = a.trim().replaceAll("'", ""), e[n] = a;
  }), e;
}, J = (i, e) => i ? i.dataset[e] === void 0 ? i.dataset[e] : Q(i.dataset[e]) : !1;
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
} catch (i) {
  w = !1;
}
const x = (i, e, t) => Math.max(e, Math.min(i, t)), d = (i, e, t) => {
  if (i = parseFloat(i, 10), e = parseFloat(e, 10), t = parseFloat(t, 10), t < e) {
    let s = t;
    t = e, e = s;
  }
  return !isNaN(e) && i < e ? e : !isNaN(t) && i > t ? t : i;
}, Z = (i, e, t, s) => {
  if (e)
    for (let n in e)
      Object.prototype.hasOwnProperty.call(e, n) && i.setAttribute(n, e[n]);
  if (t)
    for (let n in t)
      Object.prototype.hasOwnProperty.call(t, n) && (i.style[n] = t[n]);
  return i;
}, c = (i, e, t, s) => Z(document.createElement(i), e, t), I = {
  // Pow: {},
  Quad: {
    easeOut: (i) => 1 - Math.pow(1 - i, 2)
  },
  Cubic: {
    easeOut: (i) => 1 - Math.pow(1 - i, 3)
  },
  Elastic: {
    easeOut: (i) => {
      const e = 2 * Math.PI / 3;
      return i === 0 || i === 1 ? i : Math.pow(2, -10 * i) * Math.sin((i * 10 - 0.75) * e) + 1;
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
  emit(e, t) {
    let s = this._eventCallbacks[e];
    const n = { bubbles: !1, cancelable: !1, detail: t }, a = new CustomEvent(e, n);
    s && s.forEach((r) => r.call(this, a)), this.element.dispatchEvent(a);
  }
  /**
   * Register an event handler
   *
   * @param {string} eventName the name of the eventlistener
   * @param {function} listener the handler function to be called if the event triggers
   * @returns
   */
  addEventListener(e, t) {
    return this.allowedEvents && this.allowedEvents.indexOf(e) < 0 || typeof t != "function" ? !1 : (this._eventCallbacks[e] || (this._eventCallbacks[e] = []), this._eventCallbacks[e].push(t), this);
  }
  /**
   * Remove previously register event handler
   *
   *
   * @param {[string]} eventName the name of the eventlistener
   * @param {[function]} listener the handler function
   * @returns
   */
  removeEventListener(e, t) {
    if (!this._eventCallbacks || arguments.length === 0)
      return this._eventCallbacks = {}, this;
    let s = this._eventCallbacks[e];
    return s ? arguments.length === 1 ? (delete this._eventCallbacks[e], this) : (this._eventCallbacks[e] = s.filter(
      (n) => n !== t
    ), this) : this;
  }
}
const y = "sic", tt = "data-" + y, E = "interacting", H = "init", k = "drag", R = "update", D = "viewchange", N = "beforeshown", $ = "aftershown", F = "interactionstart", W = "interactionend", T = "mousedown", P = "mouseup", st = "resize";
let m = [], L = !1;
const j = (i = !0, e = "#ffffff") => `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="${e}" stroke-width="2" stroke-linecap="round" stroke-linejoin="arcs"><path d="${i ? "m12 24 8-8-8-8" : "m20 8-8 8 8 8"}"/></svg>`;
class _ {
  constructor(e, t) {
    if (!e)
      return { error: !0 };
    if (e = typeof e == "string" ? document.querySelectorAll(e) : e, e === null || e.length === 0)
      return { error: !0 };
    if (e.length > 1) {
      const s = [];
      return e.forEach((n) => {
        const a = new B(n, t);
        s.push(a);
      }), s;
    }
    return e = e.length ? e[0] : e, new B(e, t);
  }
}
class B extends V {
  constructor(t, s) {
    super();
    f(this, "_dimensions", (t, s = !1, n = !this._horizontal) => {
      const a = this.element.getBoundingClientRect(), r = getComputedStyle(this.element), l = parseFloat(r.borderLeftWidth) + parseFloat(r.borderRightWidth), g = parseFloat(r.borderTopWidth) + parseFloat(r.borderBottomWidth);
      this.width = a.width - l, this.height = a.height - g;
      let h;
      if (this._horizontal) {
        const o = a.x;
        h = this._dragHandle.offsetWidth * 0.5, this._dim = this.width, this._offset = h - o, this._minPos = o + this.settings.handleMinDistance - h, this._maxPos = o + this.width - h - this.settings.handleMinDistance;
      } else {
        const o = this.element.offsetTop;
        h = this._dragHandle.offsetHeight * 0.5, this._dim = this.height, this._offset = h - o, this._minPos = o + this.settings.handleMinDistance - h, this._maxPos = o + this.height - h - this.settings.handleMinDistance;
      }
      !s && this._oldDim === this._dim || (this._oldDim = this._dim, n && this._usePicture && this._checkCurrentImageSource(this._firstImage), this._radians && (this._angleOffset = Math.tan(this._radians) * 0.5 * (this._horizontal ? this.height : this.width)), this._setPosition(this._percent, !0));
    });
    f(this, "_mouseOver", () => {
      this.stop(), this.element.classList.add(E);
    });
    f(this, "_mouseOut", () => {
      this.element.classList.remove(E), this.settings.snapToStart && this._snapToStart();
    });
    f(this, "_mouseMove", (t) => {
      this.stop(), this._setPosition(this._calcPercent(this._getPos(t)));
    });
    // if tapped on canvas
    f(this, "_tapstart", (t) => {
      t.stopPropagation(), this._endInteraction = !1, this.stop(), clearTimeout(this._snapTimeout), this._triggerEvent(F), t.type === "touchstart" ? (this.isTouch = !0, this._mouseStartEvents(!1)) : T === t.type && (this.isTouch = !1, this._touchStartEvent(!1));
      const s = this._calcPercent(this._getPos(t));
      this.settings.animateOnClick ? this._animateTo(s, this.settings.animateDuration) : this._setPosition(s);
    });
    f(this, "_dragStart", (t) => {
      t.stopPropagation(), this.startPos = this._getPos(t), this.element.classList.add(E), this._tapstart(t), t.type === "touchstart" ? (window.addEventListener("touchmove", this._drag, w), window.addEventListener("touchend", this._dragEnd, !1)) : T === t.type && (this.settings.followMouse || (window.addEventListener("mousemove", this._drag, !1), window.addEventListener(P, this._dragEnd, !1)));
    });
    // moving
    f(this, "_drag", (t) => {
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
      this._setPosition(n), this._triggerEvent(k);
    });
    f(this, "_dragEnd", (t) => {
      this._endInteraction = !0, t.type === "touchend" ? (this.isTouch = !0, window.removeEventListener("touchmove", this._drag, w), window.removeEventListener("touchend", this._dragEnd)) : P === t.type && (this.isTouch = !1, this.settings.followMouse || (window.removeEventListener("mousemove", this._drag, !1), window.removeEventListener(P, this._dragEnd, !1))), this._testInteractionEnd(), this._dirDetected = !1;
    });
    if (t.dataset.sicinitialized)
      return _.getInstance(t);
    t.dataset.sicinitialized = !0, this.allowedEvents = [
      H,
      k,
      R,
      N,
      $,
      F,
      W,
      D
    ], m.push(this), U.put(t, "instance", this), this.element = t, this.options = s || {};
    const n = Object.assign({}, _.defaults, s);
    if (n.combineDataset) {
      let a = J(t, y);
      this.settings = Object.assign({}, _.defaults, a, s);
    } else
      this.settings = n;
    if (this.images = this.element.querySelectorAll("img"), this.picture = this.element.querySelectorAll("picture"), (!this.settings.beforeImage || !this.settings.afterImage) && (!this.images || this.images.length !== 2) && (!this.picture || this.picture.length !== 2))
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
      ].reduce((b, p) => (b.push(
        c(
          "img",
          { draggable: !1, src: p },
          { width: "100%", display: "block" }
        )
      ), b), []), this.element.appendChild(n), r.appendChild(a), this.element.appendChild(r), this._createdEl.push(n);
    else {
      const [b, p] = this.picture && this.picture.length === 2 ? this.picture : this.images;
      n = b, a = p.cloneNode(!0), [n, a].forEach((S) => {
        S.setAttribute("draggable", !1), S.style.width = "100%", S.style.display = "block";
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
    );
    let g, h;
    this._angle && (g = {
      transform: `rotate(${this._angle}deg)`,
      transformOrigin: "bottom center"
    }, h = {
      transform: `rotate(${this._angle}deg)`,
      transformOrigin: "top center"
    }), this._line1 = c(s, { class: "sic-line sic-line-1" }, g), this._line2 = c(s, { class: "sic-line sic-line-2" }, h);
    const o = c(s, { class: "sic-arrows" }), v = c(s, { class: "sic-arrow sic-arrow-1" }), u = c(s, { class: "sic-arrow sic-arrow-2" }), O = c(s, { class: "sic-circle" });
    v.innerHTML = j(!1), u.innerHTML = j(), o.append(v, u), O.append(o), l.append(this._line1, this._line2, O), this.element.append(l), this._createdEl.push(l), t.beforeLabel !== "" && (this.info1 = c(s, { class: "sic-label sic-label-one" }), this.info1.innerHTML = decodeURIComponent(
      this._ltr ? t.beforeLabel : t.afterLabel
    ), this.element.append(this.info1), this._createdEl.push(this.info1)), t.afterLabel !== "" && (this.info2 = c(s, { class: "sic-label sic-label-two" }), this.info2.innerHTML = decodeURIComponent(
      this._ltr ? t.afterLabel : t.beforeLabel
    ), this.element.append(this.info2), this._createdEl.push(this.info2)), this.element.classList.add(
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
      this._dragEl[s](T, this._dragStart), n.onlyHandleDraggable && n.clickable && (this.element[s](T, this._tapstart, !1), this.element[s](P, this._dragEnd, !1));
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
  _renderLoop(t, s, n) {
    const a = () => {
      const r = Date.now();
      if (this._timingThen !== 0) {
        if (this._timingCurTime += r - this._timingThen, this.progress = this._timingCurTime / this._animationDuration, this.progress >= 1) {
          this.progress = 1, this._setPosition(s), this.stop(), this._testInteractionEnd(), console.log("RENDER END");
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
    if (t = x(+t, 0, 100), !s) {
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
    let s = setTimeout(() => {
      clearTimeout(s);
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
    let s = this._afterShown ? $ : N;
    this._triggerEvent(s), this._triggerEvent(D), this._oneTime = !1;
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
    this._clipEl.style.clipPath = this._getClip(n), this._dragHandle.style.transform = this._horizontal ? `translate(${n}px, 0)` : `translate(0, ${n}px)`, this.info2 && (this.info2.style.opacity = t < 50 ? 1 : (100 - t) / 50), this.info1 && (this.info1.style.opacity = t > 50 ? 1 : t / 50);
    let a = this._ltr ? !this._afterShown : this._afterShown;
    t > 70 && (this._oneTime || !a) ? this._changeStatus(!this._ltr) : t < 30 && (this._oneTime || a) && this._changeStatus(this._ltr), this._triggerEvent(R);
  }
  /**
   * convert pixel position to percent from left
   * @param  {Object} pos The position object { x, y }
   * @return {Number}         The left percent value
   */
  _calcPercent(t) {
    let s = this._horizontal ? t.x : t.y;
    return s = x(s, this._minPos, this._maxPos), (s + this._offset) * 100 / this._dim;
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
    this._initialized = !0, this._oneTime = !0, this._afterShown = !1, this._ltr = z(t.ltr), this._horizontal = z(t.horizontal), this._usePicture = this.picture && this.picture.length === 2, this._angle = d(t.handleAngle, -30, 30), this._getClip = this._getClipRect, this._angle && (this._radians = this._angle * Math.PI / 180, this._getClip = this._getClipPolygon), this._createGui(), this._dragEl = t.onlyHandleDraggable ? this._dragHandle : this.element, this._animationDuration = t.animateInDuration || 0, t.startPos = d(t.startPos, 0, 100), t.animateInStartPos = d(t.animateInStartPos, 0, 100), t.startPos || (t.startPos = 50), t.animateInStartPos || (t.animateInStartPos = 0), t.animateIn ? this._percent = this._animationDuration > 0 ? t.animateInStartPos : t.startPos : this._percent = t.startPos, this.element.style.opacity = 0, this.isTouch = "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch || navigator.maxTouchPoints > 0 || window.navigator.msMaxTouchPoints > 0, this.allowedEvents.forEach((s) => {
      t[s] && this.addEventListener(s, t[s]);
    }), this._firstImage = this._usePicture ? this.picture[0].querySelector("img") : this.images[0], this._firstImageSrc = this._firstImage.currentSrc || this._firstImage.src, Y(this._firstImageSrc).then(() => {
      this._dimensions(), this._setPosition(this._percent), this.element.style.opacity = 1, t.animateIn && this._animationDuration > 0 && this.settings.animateInStartPos !== this.settings.startPos && setTimeout(
        () => this._animateTo(
          this.settings.startPos,
          this._animationDuration,
          this.settings.animateInEasing
        ),
        this.settings.animateInDelay
      ), this._appEvents(), this._triggerEvent(H), this._triggerEvent(D);
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
    this.stop(), clearTimeout(this._snapTimeout), n = d(n, 250, 1e4), t = d(t, 0, 100);
    let r = this._percent, l = 100 - r, g = n / 100 * Math.abs(l), h = !0, o = 0;
    s <= 0 && (s = -1), this.progress = this._timingCurTime = this._timingThen = 0, this.easing = a || I.Quad.easeOut;
    const v = () => {
      let u = Date.now();
      if (this._timingCurTime += u - (this._timingThen || u), this.progress = this._timingCurTime / g, this.progress >= 1) {
        if (o === s) {
          this.element.classList.remove("playing");
          return;
        }
        g = n, h ? (r = 100, l = -100) : (r = 0, l = 100), h = !h, o++, o === s && (l = h ? t : t - 100, g = n / 100 * Math.abs(l)), this._setPosition(r), u = Date.now(), this._timingCurTime = 0;
      } else
        this._setPosition(r + l * this.easing(this.progress));
      this._timingThen = u, this._renderId = requestAnimationFrame(v);
    };
    this.element.classList.add("playing"), v();
  }
  animateTo(t, s = this.settings.animateDuration, n = this.settings.animateEasing) {
    return isNaN(t) || (t = d(+t, 0, 100), t === this._percent) ? !1 : (this.stop(), this._animateTo(t, s, n), this);
  }
  goto(t) {
    return isNaN(t) ? !1 : (t = d(+t, 0, 100), this.stop(), this._setPosition(t), this);
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
    this.element.removeAttribute("data-sicinitialized"), this._createdEl.forEach((t) => this.element.removeChild(t)), this._originalEl.forEach((t) => this.element.appendChild(t)), this._createdEl = [], this._originalEl = [], this._percent = this.startPos, this._appEvents(!1), this._initialized = !1;
  }
}
_.defaults = K;
_.init = () => L ? !1 : (L = !0, new _("[" + tt + "]"), m);
_.destroyAll = () => m.length ? (m.forEach((i) => {
  i.destroy();
}), L = !1, m = [], !0) : !1;
_.getInstances = () => m.length ? m : !1;
_.getInstance = (i) => {
  U.get(i, "instance");
};
_.getDefaults = () => _.defaults;
export {
  _ as default
};
