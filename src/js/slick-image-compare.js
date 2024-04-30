import {
  passiveIfSupported,
  restrict,
  restrictFast,
  docReady,
  imageDimensions,
  getJSONData,
  createEl,
  dataStorage,
  isTrue,
} from '@/js/utils';

import { easing } from './easing';
import { defaults } from '@/js/defaults';
import { Emitter } from '@/js/emitter';

// const names
const PLUGINNAME = 'sic';
const DATANAME = 'data-' + PLUGINNAME;
const INTERACTING = 'interacting'; // class name

// event names for emitting
const INIT = 'init';
const DRAG = 'drag';
const UPDATE = 'update';
const VIEWCHANGE = 'viewchange';
const BEFORESHOWN = 'beforeshown';
const AFTERSHOWN = 'aftershown';
const INTERACTIONSTART = 'interactionstart';
const INTERACTIONEND = 'interactionend';

// app event name
const MOUSEDOWN = 'mousedown';
const RESIZE = 'resize';

let instances = [];
let initialized = false;

const getArrow = (right = true, color = '#ffffff') =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="arcs"><path d="${right ? 'm12 24 8-8-8-8' : 'm20 8-8 8 8 8'}"/></svg>`;
class BeforeAfter extends Emitter {
  constructor(element, options) {
    if (!element) {
      return { error: true };
    }

    element =
      'string' === typeof element ? document.querySelector(element) : element;

    if (null === element || 0 === element.length) {
      return { error: true };
    }

    super();

    if (element.dataset.sicinitialized) {
      return BeforeAfter.getInstance(element);
    }
    element.dataset.sicinitialized = true;

    this.allowedEvents = [
      INIT,
      DRAG,
      UPDATE,
      BEFORESHOWN,
      AFTERSHOWN,
      INTERACTIONSTART,
      INTERACTIONEND,
      VIEWCHANGE,
    ];

    instances.push(this);
    dataStorage.put(element, 'instance', this);

    this.element = element;

    // from data api
    const data = getJSONData(element, PLUGINNAME);

    this.options = options || {}; // user options
    this.settings = Object.assign({}, BeforeAfter.defaults, data, options);

    // no images are given
    this.images = this.element.querySelectorAll('img');
    this.picture = this.element.querySelectorAll('picture');
    if (
      (!this.settings.beforeImage || !this.settings.afterImage) &&
      (!this.images || !this.images.length) &&
      (!this.picture || !this.picture.length)
    ) {
      return {
        error: true,
      };
    }

    if (!this.element.classList.contains(PLUGINNAME + '-main')) {
      this.element.classList.add(PLUGINNAME + '-main');
    }

    this._snapTimeout = null;
    this._dirDetected = false;

    if (this.settings.autoInit) {
      this.init();
    }
  }

  _triggerEvent(eventName, detail) {
    // default detail data
    detail = {
      instance: this,
      horizontal: this._horizontal,
      ltr: this._ltr,
      percent: this._percent,
      afterShown: this._afterShown,
      ...detail,
    };
    this.emit(eventName, detail);
  }

  /**
   * Method to return the current position
   *
   * @param {Event} evt The current event used (e.g. touchmove)
   * @returns {Object} containing the x an y position
   */
  _getPos(evt) {
    let t;
    if ('undefined' !== typeof evt.pageX) {
      t = evt;
    } else {
      t = evt.touches[0] || evt.changedTouches[0];
    }
    return {
      x: t.pageX,
      y: t.pageY,
    };
  }

  /**
   * Method to create the gui for this plugin
   */
  _createGui() {
    const s = this.settings;
    this._originalEl = []; // original elements
    this._createdEl = []; // created elements
    const div = 'div';
    let firstImg, secondImg;

    const clipEl = createEl(
      div,
      { class: 'sic-clip' },
      {
        position: 'absolute',
        left: 0,
        top: 0,
      }
    );

    if (s.beforeImage || s.afterImage) {
      this.images = [firstImg, secondImg] = [
        s.beforeImage,
        s.afterImage,
      ].reduce((arr, src) => {
        arr.push(
          createEl(
            'img',
            { draggable: false, src },
            { width: '100%', display: 'block' }
          )
        );
        return arr;
      }, []);

      this.element.appendChild(firstImg);
      clipEl.appendChild(secondImg);
      this.element.appendChild(clipEl);

      this._createdEl.push(firstImg);
    } else {
      const [first, second] =
        this.picture && 2 === this.picture.length ? this.picture : this.images;
      firstImg = first;
      secondImg = second.cloneNode(true);

      [firstImg, secondImg].forEach((img) => {
        img.setAttribute('draggable', false);
        img.style.width = '100%';
        img.style.display = 'block';
      });

      clipEl.appendChild(secondImg);
      second.parentNode.replaceChild(clipEl, second);
      this._originalEl.push(second);
    }

    this._createdEl.push(clipEl);

    // Create drag element
    const drag = createEl(
      div,
      {
        class: 'sic-handle',
      },
      {
        position: 'absolute',
      }
    );
    const line1 = createEl(div, { class: 'sic-line sic-line-1' });
    const line2 = createEl(div, { class: 'sic-line sic-line-2' });
    const arrows = createEl(div, { class: 'sic-arrows' });
    const arrow1 = createEl(div, { class: 'sic-arrow sic-arrow-1' });
    const arrow2 = createEl(div, { class: 'sic-arrow sic-arrow-2' });
    const dragHandle = createEl(div, { class: 'sic-circle' });

    arrow1.innerHTML = getArrow(false);
    arrow2.innerHTML = getArrow();

    arrows.append(arrow1, arrow2);
    dragHandle.append(arrows);
    drag.append(line1, line2, dragHandle);

    this.element.append(drag);
    this._createdEl.push(drag);

    // create labels
    let info1, info2;
    if ('' !== s.beforeLabel) {
      info1 = createEl(div, { class: 'sic-label sic-label-one' });
      info1.innerHTML = s.beforeLabel;
      this.element.append(info1);
      this._createdEl.push(info1);
    }

    if ('' !== s.afterLabel) {
      info2 = createEl(div, { class: 'sic-label sic-label-two' });
      info2.innerHTML = s.afterLabel;
      this.element.append(info2);
      this._createdEl.push(info2);
    }
    this.info1 = s.ltr ? info1 : info2;
    this.info2 = s.ltr ? info2 : info1;

    this.element.classList.add(
      this._horizontal ? 'sic-horizontal' : 'sic-vertical'
    );

    // add important style via js
    this.element.style.position = 'relative';
    this.element.style.overflow = 'hidden';
    this.element.style.visibility = 'visible';

    // global elements
    this._dragHandle = drag;
    this._clipEl = clipEl;
  }

  /**m
   * Method to remove or add mouse events
   *
   * @param {Boolean} add true or false
   */
  _mouseStartEvents(add = true) {
    const fun = this._addRemove(add);
    // console.log('_mouseStartEvents', fun);
    const s = this.settings;
    if (s.followMouse) {
      const c = this.element;
      c[fun]('mouseenter', this._mouseOver, false);
      c[fun]('mouseleave', this._mouseOut, false);
      c[fun]('mousemove', this._mouseMove, false);
    } else {
      this._dragEl[fun](MOUSEDOWN, this._dragStart);
      if (s.onlyHandleDraggable && s.clickable) {
        this.element[fun](MOUSEDOWN, this._tapstart, false);
        this.element[fun]('mouseup', this._dragEnd, false);
      }
    }
  }

  /**
   * Helper method.
   *
   * @param {Boolean} add true for addEventListener
   *                      false for removeEventListener
   * @returns String addEventListener or removeEventListener
   */
  _addRemove(add = true) {
    return (add ? 'add' : 'remove') + 'EventListener';
  }

  /**
   * Method to add or remove touch events
   *
   * @param {Boolean} add true or false
   */
  _touchStartEvent(add = true) {
    const fun = this._addRemove(add);
    // console.log('_touchStartEvent', fun);
    this._dragEl[fun]('touchstart', this._dragStart, passiveIfSupported);
    if (this.settings.clickable) {
      this.element[fun]('touchstart', this._tapstart, false);
      this.element[fun]('touchend', this._dragEnd, false);
    }
  }

  /**
   * method to add or remove events
   *
   * @param {Boolean} add
   */
  _appEvents(add = true) {
    this._touchStartEvent(add);
    this._mouseStartEvents(add);
    const fun = this._addRemove(add);
    window[fun](RESIZE, this._dimensions);
  }

  /**
   * stop method
   */
  stop() {
    // console.log('stop', this._renderId);
    if (this._renderId) {
      cancelAnimationFrame(this._renderId);
      if (this.element.classList.contains('playing')) {
        this.element.classList.remove('playing');
      }
      this._renderId = undefined;
      // this._timingThen = this._timingCurTime = 0;
    }
  }

  _testInteractionEnd() {
    if (this._endInteraction && undefined === this._renderId) {
      this._endInteraction = false;
      this._interactionEnd();
      this._triggerEvent(INTERACTIONEND);
    }
  }

  /**
   *
   * @param {float} from the from percent value
   * @param {float} to the to percent value
   * @param {float} delta the delta percent value
   * @returns {boolean} true if stopped
   */
  _renderLoop(from, to, delta) {
    const render = () => {
      const now = Date.now();

      if (0 !== this._timingThen) {
        this._timingCurTime += now - this._timingThen;
        this.progress = this._timingCurTime / this._animationDuration;

        if (this.progress >= 1) {
          this.progress = 1;
          this._setPosition(to);
          this.stop();
          this._testInteractionEnd();
          return;
        }

        // render
        this._setPosition(from + delta * this.easing(this.progress));
      } else {
        this.progress = 0;
        this._setPosition(from);
      }

      this._timingThen = now;
      this._renderId = requestAnimationFrame(render);
    };
    render();
  }

  /**
   * Method to animate to the given percentage
   *
   * @param {float} percent The (new) percentage to move to (0 - 100)
   * @param {int} duration The duration in ms (e.g. 250)
   * @param {Object} easing The the easing function
   * @returns
   */
  _animateTo(percent, duration, easing) {
    percent = restrictFast(+percent, 0, 100);
    // console.log('from:', this._percent, 'to:', percent, duration);

    if (!duration) {
      this._setPosition(percent);
      return;
    }

    const delta = percent - this._percent;

    // if (0 === delta) {
    //   return;
    // }

    this._animationDuration = duration;
    this.easing = easing || this.settings.animateEasing;
    this.progress = 0;
    this._timingThen = this._timingCurTime = 0;

    this._renderLoop(this._percent, percent, delta);
  }

  _snapToStart(delay = this.settings.snapToStartDelay) {
    this.stop();
    // TODO: check snapToStartDelay value
    this._snapTimeout = setTimeout(() => {
      this._animateTo(
        this.settings.startPos,
        this.settings.animateDuration,
        this.settings.animateEasing
      );
    }, delay);
  }

  _interactionEnd() {
    // console.log('isTouch:', this.isTouch);
    this.element.classList.remove(INTERACTING);

    if (this.isTouch) {
      // reenable mouse events
      this._mouseStartEvents();
    } else {
      this._touchStartEvent();
    }

    if (this.settings.snapToStart) {
      this._snapToStart();
    }
  }

  /**
   * helper for the picture element
   * @param {string} element the first image element
   */
  _checkCurrentImageSource(element) {
    clearTimeout(this._checkTo);
    this._checkTo = setTimeout(() => {
      const currentSrc = element.currentSrc;
      if (this._firstImageSrc !== currentSrc) {
        // console.log('image source changed', currentSrc);
        this._firstImageSrc = currentSrc;
        // TODO: if not playing
        this._dimensions(null, false, false);
      }
    }, 250);
  }

  _dimensions = (evt, force = false, check = !this._horizontal) => {
    const bounding = this.element.getBoundingClientRect();
    const cs = getComputedStyle(this.element);
    const borderX =
      parseFloat(cs.borderLeftWidth) + parseFloat(cs.borderRightWidth);
    const borderY =
      parseFloat(cs.borderTopWidth) + parseFloat(cs.borderBottomWidth);

    this.width = bounding.width - borderX;
    this.height = bounding.height - borderY;

    let dragHandleDim;
    if (this._horizontal) {
      const x = bounding.x;
      dragHandleDim = this._dragHandle.offsetWidth * 0.5;

      this._dim = this.width;
      this._offset = dragHandleDim - x;
      this._minPos = x + this.settings.handleMinDistance - dragHandleDim;
      this._maxPos =
        x + this.width - dragHandleDim - this.settings.handleMinDistance;
    } else {
      const y = this.element.offsetTop;
      dragHandleDim = this._dragHandle.offsetHeight * 0.5;

      this._dim = this.height;
      this._offset = dragHandleDim - y;
      this._minPos = y + this.settings.handleMinDistance - dragHandleDim;
      this._maxPos =
        y + this.height - dragHandleDim - this.settings.handleMinDistance;
    }

    if (!force && this._oldDim === this._dim) {
      return;
    }
    this._oldDim = this._dim;

    if (check && this._usePicture) {
      this._checkCurrentImageSource(this._firstImage);
    }

    this._setPosition(this._percent, true);
  };

  _mouseOver = () => {
    this.stop();
    this.element.classList.add(INTERACTING);
  };

  _mouseOut = () => {
    this.element.classList.remove(INTERACTING);
    if (this.settings.snapToStart) {
      this._snapToStart();
    }
  };

  _mouseMove = (e) => {
    this.stop();
    this._setPosition(this._calcPercent(this._getPos(e)));
  };

  // if tapped on canvas
  _tapstart = (e) => {
    e.stopPropagation();
    this._endInteraction = false;
    this.stop();
    clearTimeout(this._snapTimeout);
    this._triggerEvent(INTERACTIONSTART);

    if ('touchstart' === e.type) {
      this.isTouch = true;
      this._mouseStartEvents(false);
    } else if (MOUSEDOWN === e.type) {
      this.isTouch = false;
      this._touchStartEvent(false);
    }

    const percent = this._calcPercent(this._getPos(e));
    if (this.settings.animateOnClick) {
      this._animateTo(percent, this.settings.animateDuration);
    } else {
      this._setPosition(percent);
    }
  };

  _dragStart = (e) => {
    e.stopPropagation();
    // console.log('_dragStart', e.type);
    this.startPos = this._getPos(e);
    this.element.classList.add(INTERACTING);
    this._tapstart(e);

    if ('touchstart' === e.type) {
      window.addEventListener('touchmove', this._drag, passiveIfSupported);
      window.addEventListener('touchend', this._dragEnd, false);
    } else if (MOUSEDOWN === e.type) {
      if (!this.settings.followMouse) {
        window.addEventListener('mousemove', this._drag, false);
        window.addEventListener('mouseup', this._dragEnd, false);
      }
    }
  };

  // moving
  _drag = (e) => {
    // console.log('_drag', e.type);
    this.stop();

    let currentPos = this._getPos(e);
    let percent = this._calcPercent(currentPos);

    if (this.isTouch) {
      e.preventDefault();
      const deltaX = Math.abs(this.startPos.x - currentPos.x);
      const deltaY = Math.abs(this.startPos.y - currentPos.y);

      if (!this._dirDetected) {
        if (deltaY > deltaX) {
          // console.log('scroll down or up');
          this.element.classList.remove(INTERACTING);
          window.removeEventListener(
            'touchmove',
            this._drag,
            passiveIfSupported
          );
          return;
        }

        this.element.classList.add(INTERACTING);
        this._dirDetected = true;
      }
    }

    // this._smooth(percent);
    this._setPosition(percent);
    this._triggerEvent(DRAG);
  };

  _dragEnd = (e) => {
    // console.log('_dragEnd', e.type);
    this._endInteraction = true;

    if ('touchend' === e.type) {
      this.isTouch = true;
      window.removeEventListener('touchmove', this._drag, passiveIfSupported);
      window.removeEventListener('touchend', this._dragEnd);
    } else if ('mouseup' === e.type) {
      this.isTouch = false;
      if (!this.settings.followMouse) {
        window.removeEventListener('mousemove', this._drag, false);
        window.removeEventListener('mouseup', this._dragEnd, false);
      }
    }

    this._testInteractionEnd();
    this._dirDetected = false;
  };

  _getClipRect(pos) {
    if (this._horizontal) {
      if (this._ltr) {
        // return `rect(0 ${pos}px ${this.height}px 0)`;
        return `rect(0 ${pos}px 100% 0)`;
      }
      // return `rect(0 ${this.width}px ${this.height}px ${pos}px)`;
      return `rect(0 ${this.width}px 100% ${pos}px)`;
    }

    // vertical
    if (this._ltr) {
      // return `rect(0 ${this.width}px ${pos}px 0)`;
      return `rect(0 100% ${pos}px 0)`;
    }
    // return `rect(${pos}px ${this.width}px ${this.height}px 0)`;
    return `rect(${pos}px 100% 100% 0)`;
  }

  _changeStatus(status) {
    this._afterShown = status;
    let eventName = this._afterShown ? AFTERSHOWN : BEFORESHOWN;
    this._triggerEvent(eventName);
    this._triggerEvent(VIEWCHANGE);
    this._oneTime = false;
  }

  /**
   * set the handle to a defined position (in percent from left)
   * @param {Number} percent Percent of the new handle position from left
   */
  _setPosition(percent, resize = false) {
    if (percent === this._percent && !resize) {
      return false;
    }
    this._percent = percent;

    const pos = this._dim * 0.01 * percent; // this.width * percent * 0.01;
    this._clipEl.style.clipPath = this._getClipRect(pos);
    this._dragHandle.style.transform = this._horizontal
      ? `translate(${pos}px, 0)`
      : `translate(0, ${pos}px)`;

    if (this.info1) {
      this.info1.style.opacity = percent < 50 ? 1 : (100 - percent) / 50;
    }
    if (this.info2) {
      this.info2.style.opacity = percent > 50 ? 1 : percent / 50;
    }

    let test = this._ltr ? this._afterShown : !this._afterShown;
    if (percent > 70 && (this._oneTime || !test)) {
      this._changeStatus(this._ltr);
    } else if (percent < 30 && (this._oneTime || test)) {
      this._changeStatus(!this._ltr);
    }

    this._triggerEvent(UPDATE);
  }

  /**
   * convert pixel position to percent from left
   * @param  {Object} pos The position object { x, y }
   * @return {Number}         The left percent value
   */
  _calcPercent(pos) {
    let val = this._horizontal ? pos.x : pos.y;
    val = restrictFast(val, this._minPos, this._maxPos);
    return ((val + this._offset) * 100) / this._dim;
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

  _smooth(percent) {
    this._animateTo(percent, this.settings.smoothAmount);
  }

  // public user function
  init() {
    if (this._initialized) {
      return this;
    }
    const s = this.settings;

    this._initialized = true;
    this._oneTime = true;
    this._afterShown = false;

    this._ltr = isTrue(s.ltr);
    this._horizontal = isTrue(s.horizontal);
    this._usePicture = this.picture && 2 === this.picture.length;

    this._createGui();

    this._dragEl = s.onlyHandleDraggable ? this._dragHandle : this.element;
    this._animationDuration = s.animateInDuration || 0;

    s.startPos = restrict(s.startPos, 0, 100);
    s.animateInStartPos = restrict(s.animateInStartPos, 0, 100);

    if (!s.startPos) {
      s.startPos = 50;
    }
    if (!s.animateInStartPos) {
      s.animateInStartPos = 0;
    }

    if (!s.animateIn) {
      this._percent = s.startPos;
    } else {
      this._percent =
        this._animationDuration > 0 ? s.animateInStartPos : s.startPos;
    }

    this.element.style.opacity = 0;

    this.isTouch =
      'ontouchstart' in window ||
      (window.DocumentTouch && document instanceof window.DocumentTouch) ||
      navigator.maxTouchPoints > 0 ||
      window.navigator.msMaxTouchPoints > 0;

    this.allowedEvents.forEach((eventName) => {
      if (s[eventName]) {
        this.addEventListener(eventName, s[eventName]);
      }
    });

    // read the first image
    this._firstImage = this._usePicture
      ? this.picture[0].querySelector('img')
      : this.images[0];

    this._firstImageSrc = this._firstImage.currentSrc || this._firstImage.src;

    imageDimensions(this._firstImageSrc).then(() => {
      // this.image = dimensions;
      // console.log(dimensions);
      this._dimensions();
      this._setPosition(this._percent);
      this.element.style.opacity = 1;

      if (
        s.animateIn &&
        this._animationDuration > 0 &&
        this.settings.animateInStartPos !== this.settings.startPos
      ) {
        setTimeout(
          () =>
            this._animateTo(
              this.settings.startPos,
              this._animationDuration,
              this.settings.animateInEasing
            ),
          this.settings.animateInDelay
        );
      }

      this._appEvents();
      this._triggerEvent(INIT);
      this._triggerEvent(VIEWCHANGE);
    });
  }

  /**
   *
   * @param {Integer} stopAt The Position (0-100) where it should stop
   * @param {Integer} repetitions How often should it bounce (0 means endless)
   * @param {Integer} duration The animation Duration form 0 - 100 in ms
   * @param {Function} easingFun An easing-function eg.: (p) => p (for linear);
   */
  play(stopAt = this._percent, repetitions = 2, duration = 2000, easingFun) {
    this.stop();
    clearTimeout(this._snapTimeout);
    duration = restrict(duration, 250, 10000);
    stopAt = restrict(stopAt, 0, 100);

    let from = this._percent;
    let delta = 100 - from;
    let newDuration = (duration / 100) * Math.abs(delta);
    let first = true;
    let toRight = true;
    let count = 0;
    if (repetitions <= 0) {
      repetitions = -1;
    }

    this.progress = this._timingCurTime = this._timingThen = 0;
    this.easing = easingFun || easing.Quad.easeOut;

    const render = () => {
      let now = Date.now();
      this._timingCurTime += now - (this._timingThen || now);
      this.progress = this._timingCurTime / newDuration;

      if (this.progress >= 1) {
        if (count === repetitions) {
          this.element.classList.remove('playing');
          return;
        }
        if (first) newDuration = duration;
        if (toRight) {
          from = 100;
          delta = -100;
        } else {
          from = 0;
          delta = 100;
        }
        toRight = !toRight;
        count++;
        if (count === repetitions) {
          delta = toRight ? stopAt : stopAt - 100;
          newDuration = (duration / 100) * Math.abs(delta);
        }

        this._setPosition(from);
        now = Date.now();
        this._timingCurTime = 0;
      } else {
        this._setPosition(from + delta * this.easing(this.progress));
      }

      this._timingThen = now;
      this._renderId = requestAnimationFrame(render);
    };
    this.element.classList.add('playing');
    render();
  }

  goto(percent, duration, easing) {
    if (isNaN(percent)) {
      return !1;
    }
    // restrict and cast possible string to number
    percent = restrict(+percent, 0, 100);

    // early exit (same delta)
    if (percent === this._percent) {
      return !1;
    }
    this.stop();
    this._animateTo(percent, duration, easing);

    return this;
  }

  /**
   * ltr = true  (before, 0%) L -> R (after, 100%)
   * ltr = false (after, 0%)  R -> L (before, 100%)
   */
  changeDirection() {
    this._ltr = !this._ltr;
    let tmp;
    tmp = this.info1;
    this.info1 = this.info2;
    this.info2 = tmp;
    this._percent = 100 - this._percent;
    this._dimensions(null, true);
  }

  /**
   * horizontal or vertical slider
   */
  changeOrientation() {
    const prev = this._horizontal;
    this._horizontal = !prev;
    this.element.classList.remove(prev ? 'sic-horizontal' : 'sic-vertical');
    this.element.classList.add(
      this._horizontal ? 'sic-horizontal' : 'sic-vertical'
    );
    this._dimensions(null, true);
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
    this.stop();
    if (this._afterShown) {
      this.showBefore();
    } else {
      this.showAfter();
    }
  }

  destroy() {
    this.element.removeAttribute('data-sicinitialized');
    this._createdEl.forEach((el) => this.element.removeChild(el));
    this._originalEl.forEach((el) => this.element.appendChild(el));
    this._createdEl = [];
    this._originalEl = [];

    // remove all eventlistener
    this._percent = this.startPos;
    this._appEvents(false);
    this._initialized = false;
  }
}

BeforeAfter.init = () => {
  if (initialized) {
    return true;
  }
  initialized = true;
  let element = document.querySelectorAll('[' + DATANAME + ']');
  if (0 === element.length) {
    return false;
  }

  element.forEach((el) => {
    new BeforeAfter(el);
  });

  return instances;
};

BeforeAfter.destroyAll = () => {
  if (!instances.length) {
    return false;
  }

  instances.forEach((instance) => {
    instance.destroy();
  });

  initialized = false;
  instances = [];
  return true;
};

BeforeAfter.getInstance = (el) => dataStorage.get(el, 'instance');

BeforeAfter.defaults = defaults;

docReady(BeforeAfter.init);

export default BeforeAfter;
