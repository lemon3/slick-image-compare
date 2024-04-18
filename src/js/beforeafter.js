import {
  wrap,
  passiveIfSupported,
  restrict,
  docReady,
  imageDimensions,
  getJSONData,
  createEl,
  dataStorage,
} from '@/js/utils';

import { defaults } from '@/js/defaults';
import { Emitter } from '@/js/emitter';

// const names
const PLUGINNAME = 'beforeafter';
const DATANAME = 'data-' + PLUGINNAME;
const INTERACTING = 'interacting'; // classname

// event names for emitting
const INIT = 'init';
const DRAG = 'drag';
const UPDATE = 'update';
const BEFORESHOWN = 'beforeshown';
const AFTERSHOWN = 'aftershown';
const INTERACTIONEND = 'interactionend';

// app event name
const MOUSEDOWN = 'mousedown';
const RESIZE = 'resize';

let instances = [];
let initialized = false;

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

    if (element.dataset.bainitialized) {
      return BeforeAfter.getInstance(element);
    }
    element.dataset.bainitialized = true;

    this.allowedEvents = [
      INIT,
      DRAG,
      UPDATE,
      BEFORESHOWN,
      AFTERSHOWN,
      INTERACTIONEND,
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
    if (
      (!this.settings.beforeImage || !this.settings.afterImage) &&
      (!this.images || !this.images.length)
    ) {
      return {
        error: true,
      };
    }

    if (!this.element.classList.contains(PLUGINNAME)) {
      this.element.classList.add(PLUGINNAME);
    }

    this.snapTimeout = null;
    this.deltaX = 0;
    this.deltaY = 0;
    this.dirDetected = false;

    if (this.settings.autoInit) {
      this.init();
    }
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
    this.originalElements = [];
    this.createdElements = [];
    const div = 'div';

    const canvas = createEl(div, { class: 'canvas' });
    this.createdElements.push(canvas);

    // images
    let firstImg;
    let secondImg;
    let first, second;
    let createDomImage = false;

    if (s.beforeImage || s.afterImage) {
      createDomImage = true;
      firstImg = createEl('img', { draggable: false });
      firstImg.src = s.beforeImage;
      secondImg = createEl('img', { draggable: false });
      secondImg.src = s.afterImage;
    } else {
      [first, second] = this.originalElements = this.images;
      firstImg = first.cloneNode(true);
      firstImg.setAttribute('draggable', false);

      secondImg = second.cloneNode(true);
      secondImg.setAttribute('draggable', false);
    }

    const clippingElement = createEl(
      div,
      { class: 'clipSlider' },
      { zIndex: 2 }
    );

    const wrapper1 = document.createDocumentFragment();
    const wrapper2 = document.createDocumentFragment();

    wrapper1.appendChild(firstImg);
    wrapper2.appendChild(secondImg);

    let clip;
    if ('' !== s.beforeLabel) {
      const info1 = createEl(div, { class: 'label left' });
      info1.innerHTML = s.beforeLabel;
      clip = createEl(div, { class: 'clipSlider' });
      clip.append(info1);
      wrapper2.appendChild(clip);
    }

    if ('' !== s.afterLabel) {
      const info2 = createEl(div, { class: 'label right' });
      info2.innerHTML = s.afterLabel;
      wrapper1.appendChild(info2);
    }

    clippingElement.appendChild(wrapper1);

    if (createDomImage) {
      canvas.append(clippingElement);
      canvas.append(wrapper2);
      this.element.append(canvas);
    } else {
      first.parentNode.replaceChild(clippingElement, first);
      second.remove();
      wrap([clippingElement, wrapper2], canvas);
    }

    // Create drag element
    const drag = createEl(div, { class: s.dragElementClass }, { zIndex: 5 });
    // const overlay1 = createEl(div, { class: 'overlay' }, { zIndex: 4 });

    const dragHandle = createEl(div);
    drag.appendChild(dragHandle);

    // canvas.appendChild(overlay1);
    canvas.appendChild(drag);

    if ('' !== s.beforeDescription || '' !== s.afterDescription) {
      const description = createEl(div, {
        class: 'description',
      });

      description.innerHTML = s.beforeDescription;
      this.element.appendChild(description);
      this.createdElements.push(description);
      this.description = description;
    }

    if (s.showToggleButton) {
      const button = createEl(
        div,
        {
          class: 'toggleButton',
        },
        { zIndex: 5 }
      );
      button.innerHTML = this._buttonStartText;

      this.element.appendChild(button);
      this.createdElements.push(button);
      this.toggleBtn = button;
    }

    this.element.style.visibility = 'visible';

    // global elements
    this.wrapper1 = wrapper1;
    this.wrapper2 = wrapper2;
    this.dragHandle = drag;

    this.clip = clip;
    this.clippingElement = clippingElement;
    this.canvas = canvas;
  }

  /**
   * Method to remove or add mouse events
   *
   * @param {Boolean} add true or false
   */
  _mouseStartEvents(add = true) {
    const fun = (add ? 'add' : 'remove') + 'EventListener';
    // console.log('mouseevents', fun);
    const s = this.settings;
    if (s.followMouse) {
      const c = this.canvas;
      c[fun]('mouseenter', this._mouseOver, false);
      c[fun]('mouseleave', this._mouseOut, false);
      c[fun]('mousemove', this._mouseMove, false);
    } else {
      this.dragElementTrigger[fun](MOUSEDOWN, this._dragStart);
      if (s.onlyHandleDraggable && s.clickable) {
        this.canvas[fun](MOUSEDOWN, this._tapstart, false);
        this.canvas[fun]('mouseup', this._dragEnd, false);
      }
    }
  }

  /**
   * Method to remove or add touch events
   *
   * @param {Boolean} add true or false
   */
  _touchStartEvent(add = true) {
    const fun = (add ? 'add' : 'remove') + 'EventListener';
    // console.log('touchStartEvent', fun);
    this.dragElementTrigger[fun](
      'touchstart',
      this._dragStart,
      passiveIfSupported
    );
    if (this.settings.clickable) {
      this.canvas[fun]('touchstart', this._tapstart, false);
      this.canvas[fun]('touchend', this._dragEnd, false);
    }
  }

  _removeAllEvents() {
    this._mouseStartEvents(false);
    this._touchStartEvent(false);

    if (this.toggleBtn) {
      this.toggleBtn.removeEventListener('click', this.toggleBeforeAfter);
    }
    window.removeEventListener(RESIZE, this._dimensions);
    this.removeEventListener(INTERACTIONEND, this._interactionEnd);
  }

  _addEvents() {
    this._touchStartEvent();
    this._mouseStartEvents();

    if (this.toggleBtn) {
      this.toggleBtn.addEventListener('click', this.toggleBeforeAfter, false);
    }
    window.addEventListener(RESIZE, this._dimensions);
    this.addEventListener(INTERACTIONEND, this._interactionEnd);
  }

  // TODO: jumpToEnd
  _stopAni() {
    // console.log('_stopAni', this._renderId);
    if (this._renderId) {
      window.cancelAnimationFrame(this._renderId);
      this._renderId = undefined;
      this.timing.then = this.timing.curTime = 0;
    }
  }

  _testInteractionEnd() {
    if (this._endInteraction && undefined === this._renderId) {
      this._endInteraction = false;
      this.emit(INTERACTIONEND);
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
      const now = new Date().getTime();
      const dt = now - (this.timing.then || now);
      this.timing.curTime += dt;
      this.progress = this.timing.curTime / this._animationDuration;

      if (this.progress >= 1) {
        this.progress = 1;
        this._setPosition(to);
        this._stopAni();
        this._testInteractionEnd();
        return;
      }

      // render
      this._setPosition(from + delta * this.easing(this.progress));

      this.timing.then = now;
      this._renderId = window.requestAnimationFrame(render);
    };
    render();
  }

  _animateTo(percent, duration, easing) {
    percent = restrict(+percent, 0, 100);
    this._delta = percent - this.currentPercent;
    // console.log('from:', this.currentPercent, 'to:', percent, duration);

    if (Math.abs(this._delta) < 1) {
      return;
    }

    if (!duration) {
      this._setPosition(percent);
      return;
    }

    this._animationDuration = duration;
    this.easing = easing || this.settings.animateEasing;
    this.progress = 0;
    this.timing.then = this.timing.curTime = 0;

    this._renderLoop(this.currentPercent, percent, this._delta);
  }

  _snapToStart(delay = this.settings.snapToStartDelay) {
    this._stopAni();
    // TODO: check snapToStartDelay value
    this.snapTimeout = setTimeout(() => {
      this._animateTo(
        this.settings.startPos,
        this.settings.animateDuration,
        this.settings.animateEasing
      );
    }, delay);
  }

  _getOffsetElements() {
    const offsetElements = [this.element];
    let parent = this.element.offsetParent;
    if (!parent) {
      return offsetElements;
    }
    do {
      offsetElements.push(parent);
      if (!parent.offsetParent) {
        break;
      }
      parent = parent.offsetParent;
    } while ('BODY' !== parent.nodeName);
    return offsetElements;
  }

  _interactionEnd = () => {
    // console.log('isTouch:', this.isTouch);
    this.element.classList.remove(INTERACTING);

    // make it a little bit async
    // setTimeout(() => {
    if (this.isTouch) {
      // reenable mouse events
      this._mouseStartEvents();
    } else {
      this._touchStartEvent();
    }

    if (this.settings.snapToStart) {
      this._snapToStart();
    }
    // }, 1);
  };

  _dimensions = () => {
    this.elementWidth = this.canvas.offsetWidth;
    this.elementOffsetLeft = this.offsetElements
      .map((offsetEl) => offsetEl.offsetLeft)
      .reduce((prev, cur) => prev + cur);

    // TODO: is always 2
    this.dragHandleWidth = this.dragHandle.offsetWidth;

    this.minLeftPos =
      this.elementOffsetLeft +
      this.settings.handleMinDistance -
      this.dragHandleWidth / 2;

    this.maxLeftPos =
      this.elementOffsetLeft +
      this.elementWidth -
      this.dragHandleWidth / 2 -
      this.settings.handleMinDistance;

    this.elementHeight = this.canvas.offsetHeight;
    // Math.max(
    //   this.canvas.offsetHeight,
    //   this.canvas.offsetWidth / this.imageDimensions.ratio
    // );

    if (this.oldElementWidth === this.elementWidth) {
      return;
    }

    this.oldElementWidth = this.elementWidth;

    this._setPosition(this.currentPercent, true);
  };

  _mouseOver = () => {
    // console.log('_mouseOver');
    // this.canvas.addEventListener('mousemove', this._mouseMove);
    this._stopAni();
    this.element.classList.add(INTERACTING);
  };

  _mouseOut = () => {
    // console.log('_mouseOut');
    // this.canvas.removeEventListener('mousemove', this._mouseMove);
    this.element.classList.remove(INTERACTING);
    if (this.settings.snapToStart) {
      this._snapToStart();
    }
  };

  _mouseMove = (e) => {
    // console.log('_mouseMove');
    this._stopAni();
    let currentPos = this._getPos(e);
    let percent = this._calcLeftPercent(currentPos.x);
    this._setPosition(percent);
  };

  // if tapped on canvas
  _tapstart = (e) => {
    this._endInteraction = false;
    this._stopAni();
    clearTimeout(this.snapTimeout);

    if ('touchstart' === e.type) {
      this.isTouch = true;
      this._mouseStartEvents(false);
    } else if (MOUSEDOWN === e.type) {
      this.isTouch = false;
      this._touchStartEvent(false);
    }

    const percent = this._calcLeftPercent(this._getPos(e).x);
    this._animateTo(percent, this.settings.animateDuration);
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
    this._stopAni();
    let currentPos = this._getPos(e);
    let percent = this._calcLeftPercent(currentPos.x);

    if (this.isTouch) {
      e.preventDefault();
      this.deltaX = Math.abs(this.startPos.x - currentPos.x);
      this.deltaY = Math.abs(this.startPos.y - currentPos.y);

      if (!this.dirDetected) {
        if (this.deltaY > this.deltaX) {
          // console.log('scroll down');
          this.element.classList.remove(INTERACTING);
          window.removeEventListener(
            'touchmove',
            this._drag,
            passiveIfSupported
          );
          return;
        }

        this.element.classList.add(INTERACTING);
        this.dirDetected = true;
      }
    }

    this._setPosition(percent);
    this.emit(DRAG, { percent });
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

    this.dirDetected = false;
  };

  _setToggleValues(status, toggleText, text) {
    if (this.toggleBtn) {
      this.toggleBtn.innerHTML = toggleText;
    }
    if (this.description) {
      this.description.innerHTML = text;
    }
    this._afterShown = 1 === status ? true : false;
    this._oneTime = false;
  }

  /**
   * set the handle to a defined position (in percent from left)
   * @param {Number} percent Percent of the new handle position from left
   */
  _setPosition(percent, resize = false) {
    if (percent === this.currentPercent && !resize) {
      return false;
    }
    this.currentPercent = percent;

    let left = this.elementWidth * percent * 0.01;
    let clipL = `rect(0 ${left}px ${this.elementHeight}px 0)`;
    let clipR = `rect(0 ${this.elementWidth}px ${this.elementHeight}px ${left}px)`;
    let tmp;

    if (!this._clipFromLeft) {
      tmp = clipL;
      clipL = clipR;
      clipR = tmp;
    }

    if (this.clip) {
      this.clip.style.clipPath = clipR;
    }
    this.clippingElement.style.clipPath = clipL;
    this.dragHandle.style.transform = `translate(${left}px, 0)`;

    // console.log(this._afterShown);
    // change state and button text
    if (percent > 75 && (!this._afterShown || this._oneTime)) {
      this._setToggleValues(
        1,
        this.settings.toggleBeforeText,
        this.settings.afterDescription
      );
      this.emit(this.afterOnTheRight ? AFTERSHOWN : BEFORESHOWN);
    } else if (percent < 25 && (this._afterShown || this._oneTime)) {
      this._setToggleValues(
        0,
        this.settings.toggleAfterText,
        this.settings.beforeDescription
      );
      this.emit(this.afterOnTheRight ? BEFORESHOWN : AFTERSHOWN);
    }

    this.emit(UPDATE, { percent });
  }

  /**
   * convert pixel position to percent from left
   * @param  {Number} leftPos The left ('px') value
   * @return {Number}         The left percent value
   */
  _calcLeftPercent(leftPos) {
    leftPos = restrict(leftPos, this.minLeftPos, this.maxLeftPos);
    return (
      ((leftPos + this.dragHandleWidth * 0.5 - this.elementOffsetLeft) * 100) /
      this.elementWidth
    );
  }

  /**
   * convert percent to left pixel value
   * @param  {Number} leftPercent The left percent value
   * @return {Number}             The left ('px') value
   */
  _calcLeftValue(leftPercent) {
    const percent = restrict(leftPercent, 0, 100) * 0.01;
    return (
      percent * this.elementWidth +
      this.elementOffsetLeft -
      this.dragHandleWidth * 0.5
    );
  }

  // public user function
  init() {
    if (this._initialized) {
      return this;
    }
    this._initialized = true;
    this._oneTime = true;

    const s = this.settings;
    this._afterShown = false;

    // how to clip the image (from which side)
    this._clipFromLeft = true;
    this._buttonStartText = this.settings.toggleAfterText;

    // change texts
    if (!s.afterOnTheRight) {
      let afterDescription = s.afterDescription;
      s.afterDescription = s.beforeDescription;
      s.beforeDescription = afterDescription;

      let toggleAfterText = s.toggleAfterText;
      s.toggleAfterText = s.toggleBeforeText;
      s.toggleBeforeText = toggleAfterText;

      this._afterShown = true;
      this._buttonStartText = this.settings.toggleBeforeText;
      this._clipFromLeft = false;
    }

    this._createGui();
    this.offsetElements = this._getOffsetElements();
    this.timing = { time: 0, curTime: 0 };

    this.dragElementTrigger = s.onlyHandleDraggable
      ? this.dragHandle
      : this.canvas;
    this._animationDuration = s.animateInDuration || 0;

    if (!s.startPos) {
      s.startPos = 0;
    }
    if (!s.animateStartPos) {
      s.animateStartPos = 0;
    }

    this.currentPercent =
      this._animationDuration > 0 ? s.animateStartPos : s.startPos;
    this.element.style.opacity = 0;

    this.isTouch =
      'ontouchstart' in window ||
      (window.DocumentTouch && document instanceof window.DocumentTouch) ||
      navigator.maxTouchPoints > 0 ||
      window.navigator.msMaxTouchPoints > 0;

    // read the first image
    let file = this.settings.beforeImage || this.images[0].src;
    imageDimensions(file).then((dimensions) => {
      this.imageDimensions = dimensions;
      this._dimensions();
      this._setPosition(this.currentPercent);

      this.element.style.opacity = 1;

      if (
        this._animationDuration > 0 &&
        this.settings.animateStartPos !== this.settings.startPos
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

      this._addEvents();
      this.emit(INIT);
    });
  }

  goto(percent, duration, easing) {
    if (isNaN(percent)) {
      return !1;
    }
    // restrict and cast possible string to number
    percent = restrict(+percent, 0, 100);

    // early exit (same delta)
    if (percent === this.currentPercent) {
      return !1;
    }
    this._stopAni();
    this._animateTo(percent, duration, easing);
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

  toggleBeforeAfter = (evt) => {
    if (evt) {
      evt.stopPropagation();
    }
    this._stopAni();

    if (this._afterShown) {
      this.showBefore();
    } else {
      this.showAfter();
    }
  };

  destroy() {
    this.element.removeAttribute('data-bainitialized');

    if ('undefined' === typeof this.createdElements) {
      return false;
    }

    this.createdElements.forEach((el) => this.element.removeChild(el));
    this.originalElements.forEach((el) => this.element.appendChild(el));
    this.createdElements = [];
    this.originalElements = [];

    // remove all eventlistener
    this._removeAllEvents();
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
