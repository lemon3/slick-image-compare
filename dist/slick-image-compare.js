/*!
* SlickImageCompare v0.4.3
* https://lemon3.github.io/slick-image-compare
*/
var Q = Object.defineProperty;
var k = Object.getOwnPropertySymbols;
var J = Object.prototype.hasOwnProperty, Z = Object.prototype.propertyIsEnumerable;
var D = (i, s, t) => s in i ? Q(i, s, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[s] = t, x = (i, s) => {
  for (var t in s || (s = {}))
    J.call(s, t) && D(i, t, s[t]);
  if (k)
    for (var t of k(s))
      Z.call(s, t) && D(i, t, s[t]);
  return i;
};
var _ = (i, s, t) => D(i, typeof s != "symbol" ? s + "" : s, t);
const G = {
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
}, H = (i) => i === !0 || i === "true" || i === 1 || i === "1", K = (i) => new Promise((s, t) => {
  const e = new Image();
  e.onload = () => {
    const { naturalWidth: n, naturalHeight: a } = e, r = n / a;
    s({ width: n, height: a, ratio: r });
  }, e.onerror = () => {
    t("error");
  }, e.src = i;
}), V = (i) => {
  if (!i.match(/[^\w]+/i)) return i;
  const s = {};
  return i = i.replace("{", "").replace("}", "").trim(), i.split(",").forEach((e) => {
    if (e === "")
      return;
    let [n, a] = e.split(":");
    n = n.trim().replaceAll("'", ""), a = a.trim().replaceAll("'", ""), s[n] = a;
  }), s;
}, tt = (i, s) => i ? i.dataset[s] === void 0 ? i.dataset[s] : V(i.dataset[s]) : !1;
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
const $ = (i, s, t) => Math.max(s, Math.min(i, t)), E = (i, s, t) => {
  if (i = parseFloat(i, 10), s = parseFloat(s, 10), t = parseFloat(t, 10), t < s) {
    let e = t;
    t = s, s = e;
  }
  return !isNaN(s) && i < s ? s : !isNaN(t) && i > t ? t : i;
}, et = (i, s, t, e) => {
  if (s)
    for (let n in s)
      Object.prototype.hasOwnProperty.call(s, n) && i.setAttribute(n, s[n]);
  if (t)
    for (let n in t)
      Object.prototype.hasOwnProperty.call(t, n) && (i.style[n] = t[n]);
  return i;
}, c = (i, s, t, e) => et(document.createElement(i), s, t), T = {
  Linear: (i) => i,
  // Pow: {},
  Quad: {
    easeIn: (i) => Math.pow(i, 2),
    easeOut: (i) => 1 - Math.pow(1 - i, 2)
  },
  Cubic: {
    easeIn: (i) => Math.pow(i, 3),
    easeOut: (i) => 1 - Math.pow(1 - i, 3)
  },
  Sine: {
    easeIn: (i) => 1 - Math.cos(i * Math.PI / 2),
    easeOut: (i) => Math.sin(i * Math.PI / 2)
  },
  Elastic: {
    easeOut: (i) => {
      const s = 2 * Math.PI / 3;
      return i === 0 || i === 1 ? i : Math.pow(2, -10 * i) * Math.sin((i * 10 - 0.75) * s) + 1;
    }
  }
}, st = {
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
const L = "sic", nt = "data-" + L, w = "interacting", R = "init", N = "drag", F = "update", M = "viewchange", W = "beforeshown", j = "aftershown", q = "interactionstart", B = "interactionend", y = "mousedown", S = "mouseup", at = "resize";
let I = [], O = !1;
const U = (i = !0, s = "#ffffff") => `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="${s}" stroke-width="2" stroke-linecap="round" stroke-linejoin="arcs"><path d="${i ? "m12 24 8-8-8-8" : "m20 8-8 8 8 8"}"/></svg>`;
class d {
  constructor(s, t) {
    if (!s)
      return { error: !0 };
    if (s = typeof s == "string" ? document.querySelectorAll(s) : s, s === null || s.length === 0)
      return { error: !0 };
    if (s.length > 1) {
      const e = [];
      return console.log(s), s.forEach((n) => {
        const a = new A(n, t);
        e.push(a);
      }), e;
    }
    return s = s.length ? s[0] : s, new A(s, t);
  }
}
class A extends it {
  constructor(t, e) {
    if (!t)
      return { error: !0 };
    if (t = typeof t == "string" ? document.querySelector(t) : t, t === null || t.length === 0)
      return { error: !0 };
    super();
    _(this, "_dimensions", (t, e = !1, n = !this._horizontal) => {
      const a = this.element.getBoundingClientRect(), r = getComputedStyle(this.element), l = parseFloat(r.borderLeftWidth) + parseFloat(r.borderRightWidth), f = parseFloat(r.borderTopWidth) + parseFloat(r.borderBottomWidth);
      this.width = a.width - l, this.height = a.height - f;
      let h;
      if (this._horizontal) {
        const o = a.x;
        h = this._dragHandle.offsetWidth * 0.5, this._dim = this.width, this._offset = h - o, this._minPos = o + this.settings.handleMinDistance - h, this._maxPos = o + this.width - h - this.settings.handleMinDistance;
      } else {
        const o = this.element.offsetTop;
        h = this._dragHandle.offsetHeight * 0.5, this._dim = this.height, this._offset = h - o, this._minPos = o + this.settings.handleMinDistance - h, this._maxPos = o + this.height - h - this.settings.handleMinDistance;
      }
      !e && this._oldDim === this._dim || (this._oldDim = this._dim, n && this._usePicture && this._checkCurrentImageSource(this._firstImage), this._radians && (this._angleOffset = Math.tan(this._radians) * 0.5 * (this._horizontal ? this.height : this.width)), this._setPosition(this._percent, !0));
    });
    _(this, "_mouseOver", () => {
      this.stop(), this.element.classList.add(w);
    });
    _(this, "_mouseOut", () => {
      this.element.classList.remove(w), this.settings.snapToStart && this._snapToStart();
    });
    _(this, "_mouseMove", (t) => {
      this.stop(), this._setPosition(this._calcPercent(this._getPos(t)));
    });
    // if tapped on canvas
    _(this, "_tapstart", (t) => {
      t.stopPropagation(), this._endInteraction = !1, this.stop(), clearTimeout(this._snapTimeout), this._triggerEvent(q), t.type === "touchstart" ? (this.isTouch = !0, this._mouseStartEvents(!1)) : y === t.type && (this.isTouch = !1, this._touchStartEvent(!1));
      const e = this._calcPercent(this._getPos(t));
      this.settings.animateOnClick ? this._animateTo(e, this.settings.animateDuration) : this._setPosition(e);
    });
    _(this, "_dragStart", (t) => {
      t.stopPropagation(), this.startPos = this._getPos(t), this.element.classList.add(w), this._tapstart(t), t.type === "touchstart" ? (window.addEventListener("touchmove", this._drag, v), window.addEventListener("touchend", this._dragEnd, !1)) : y === t.type && (this.settings.followMouse || (window.addEventListener("mousemove", this._drag, !1), window.addEventListener(S, this._dragEnd, !1)));
    });
    // moving
    _(this, "_drag", (t) => {
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
      this._setPosition(n), this._triggerEvent(N);
    });
    _(this, "_dragEnd", (t) => {
      this._endInteraction = !0, t.type === "touchend" ? (this.isTouch = !0, window.removeEventListener("touchmove", this._drag, v), window.removeEventListener("touchend", this._dragEnd)) : S === t.type && (this.isTouch = !1, this.settings.followMouse || (window.removeEventListener("mousemove", this._drag, !1), window.removeEventListener(S, this._dragEnd, !1))), this._testInteractionEnd(), this._dirDetected = !1;
    });
    if (t.dataset.sicinitialized)
      return d.getInstance(t);
    t.dataset.sicinitialized = !0, this.allowedEvents = [
      R,
      N,
      F,
      W,
      j,
      q,
      B,
      M
    ], I.push(this), G.put(t, "instance", this), this.element = t, this.options = e || {};
    const n = Object.assign({}, d.defaults, e);
    if (n.combineDataset) {
      let a = tt(t, L);
      this.settings = Object.assign({}, d.defaults, a, e);
    } else
      this.settings = n;
    if (this.images = this.element.querySelectorAll("img"), this.picture = this.element.querySelectorAll("picture"), (!this.settings.beforeImage || !this.settings.afterImage) && (!this.images || !this.images.length) && (!this.picture || !this.picture.length))
      return {
        error: !0
      };
    this.element.classList.contains(L + "-main") || this.element.classList.add(L + "-main"), this._snapTimeout = null, this._dirDetected = !1, this.settings.autoInit && this.init();
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
      ].reduce((P, p) => (P.push(
        c(
          "img",
          { draggable: !1, src: p },
          { width: "100%", display: "block" }
        )
      ), P), []), this.element.appendChild(n), r.appendChild(a), this.element.appendChild(r), this._createdEl.push(n);
    else {
      const [P, p] = this.picture && this.picture.length === 2 ? this.picture : this.images;
      n = P, a = p.cloneNode(!0), [n, a].forEach((C) => {
        C.setAttribute("draggable", !1), C.style.width = "100%", C.style.display = "block";
      }), r.appendChild(a), p.parentNode.replaceChild(r, p), this._originalEl.push(p);
    }
    this._createdEl.push(r);
    const l = c(
      e,
      {
        class: "sic-handle"
      },
      {
        position: "absolute"
      }
    );
    let f, h;
    this._angle && (f = {
      transform: `rotate(${this._angle}deg)`,
      transformOrigin: "bottom center"
    }, h = {
      transform: `rotate(${this._angle}deg)`,
      transformOrigin: "top center"
    }), this.line1 = c(e, { class: "sic-line sic-line-1" }, f), this.line2 = c(e, { class: "sic-line sic-line-2" }, h);
    const o = c(e, { class: "sic-arrows" }), b = c(e, { class: "sic-arrow sic-arrow-1" }), u = c(e, { class: "sic-arrow sic-arrow-2" }), z = c(e, { class: "sic-circle" });
    b.innerHTML = U(!1), u.innerHTML = U(), o.append(b, u), z.append(o), l.append(this.line1, this.line2, z), this.element.append(l), this._createdEl.push(l);
    let g, m;
    const X = decodeURIComponent(
      this._ltr ? t.beforeLabel : t.afterLabel
    ), Y = decodeURIComponent(
      this._ltr ? t.afterLabel : t.beforeLabel
    );
    t.beforeLabel !== "" && (g = c(e, { class: "sic-label sic-label-one" }), g.innerHTML = X, this.element.append(g), this._createdEl.push(g)), t.afterLabel !== "" && (m = c(e, { class: "sic-label sic-label-two" }), m.innerHTML = Y, this.element.append(m), this._createdEl.push(m)), this.info1 = this._ltr ? m : g, this.info2 = this._ltr ? g : m, this.element.classList.add(
      this._horizontal ? "sic-horizontal" : "sic-vertical"
    ), this.element.style.position = "relative", this.element.style.overflow = "hidden", this.element.style.visibility = "visible", this._dragHandle = l, this._clipEl = r;
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
      this._dragEl[e](y, this._dragStart), n.onlyHandleDraggable && n.clickable && (this.element[e](y, this._tapstart, !1), this.element[e](S, this._dragEnd, !1));
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
    this._endInteraction && this._renderId === void 0 && (this._endInteraction = !1, this._interactionEnd(), this._triggerEvent(B));
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
    if (t = $(+t, 0, 100), !e) {
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
    let e = this._afterShown ? j : W;
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
    let a = this._ltr ? !this._afterShown : this._afterShown;
    t > 70 && (this._oneTime || !a) ? this._changeStatus(!this._ltr) : t < 30 && (this._oneTime || a) && this._changeStatus(this._ltr), this._triggerEvent(F);
  }
  /**
   * convert pixel position to percent from left
   * @param  {Object} pos The position object { x, y }
   * @return {Number}         The left percent value
   */
  _calcPercent(t) {
    let e = this._horizontal ? t.x : t.y;
    return e = $(e, this._minPos, this._maxPos), (e + this._offset) * 100 / this._dim;
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
      ), this._appEvents(), this._triggerEvent(R), this._triggerEvent(M);
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
    let r = this._percent, l = 100 - r, f = n / 100 * Math.abs(l), h = !0, o = 0;
    e <= 0 && (e = -1), this.progress = this._timingCurTime = this._timingThen = 0, this.easing = a || T.Quad.easeOut;
    const b = () => {
      let u = Date.now();
      if (this._timingCurTime += u - (this._timingThen || u), this.progress = this._timingCurTime / f, this.progress >= 1) {
        if (o === e) {
          this.element.classList.remove("playing");
          return;
        }
        f = n, h ? (r = 100, l = -100) : (r = 0, l = 100), h = !h, o++, o === e && (l = h ? t : t - 100, f = n / 100 * Math.abs(l)), this._setPosition(r), u = Date.now(), this._timingCurTime = 0;
      } else
        this._setPosition(r + l * this.easing(this.progress));
      this._timingThen = u, this._renderId = requestAnimationFrame(b);
    };
    this.element.classList.add("playing"), b();
  }
  animateTo(t, e = this.settings.animateDuration) {
    return this.goto(t, e, T);
  }
  goto(t, e, n) {
    return isNaN(t) || (t = E(+t, 0, 100), t === this._percent) ? !1 : (this.stop(), this._animateTo(t, e, n), this);
  }
  setAngle(t) {
    t = +t, this._angle = t, this._angle === 0 ? (this._getClip = this._getClipRect, this.line1.removeAttribute("style"), this.line2.removeAttribute("style"), this._radians = null) : (this._getClip = this._getClipPolygon, this._radians = this._angle * Math.PI / 180, this.line1.style.transform = `rotate(${this._angle}deg)`, this.line2.style.transform = `rotate(${this._angle}deg)`, this._horizontal ? (this.line1.style.transformOrigin = "bottom center", this.line2.style.transformOrigin = "top center") : (this.line1.style.transformOrigin = "right bottom", this.line2.style.transformOrigin = "left bottom")), this._dimensions(null, !0);
  }
  /**
   * ltr = true  (before, 0%) L -> R (after, 100%)
   * ltr = false (after, 0%)  R -> L (before, 100%)
   */
  changeDirection() {
    this._ltr = !this._ltr;
    let t;
    t = this.info1.innerHTML, this.info1.innerHTML = this.info2.innerHTML, this.info2.innerHTML = t, this._percent = 100 - this._percent, this._dimensions(null, !0);
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
d.init = () => {
  if (O)
    return !0;
  O = !0;
  let i = document.querySelectorAll("[" + nt + "]");
  return i.length === 0 ? !1 : (i.forEach((s) => {
    new A(s);
  }), I);
};
d.destroyAll = () => I.length ? (I.forEach((i) => {
  i.destroy();
}), O = !1, I = [], !0) : !1;
d.getInstance = (i) => G.get(i, "instance");
d.defaults = st;
export {
  d as default
};
