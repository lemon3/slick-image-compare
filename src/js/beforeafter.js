/* eslint-disable no-console */
import {
  wrap,
  passiveIfSupported,
  restrict,
  docReady,
  imageDimensions,
  getJSONData,
  createEl,
  getElements,
} from '@/js/utils';
import { defaults } from '@/js/defaults';

// const passive = passiveSupported ? { passive: true } : false;

let instances = [];
const allowedEvents = ['init', 'drag', 'update'];
const trigger = (elem, name, data) => {
  let funData = elem.getAttribute(`on + ${name}`);
  let func = new Function('e', `{${funData}}`);
  func.call(elem, data);
};

class BeforeAfter {
  constructor(element, options) {
    // TODO: if multiple: initialize with BeforeAfter.setup
    element = getElements(element, true);

    if (!element) {
      return {
        error: true,
      };
    }

    if (element.dataset.bainitialized) {
      // TODO: return stored instance
      return {
        error: true,
      };
    }
    element.dataset.bainitialized = true;
    instances.push(this);

    this.options = options;
    this.element = element;

    const data = getJSONData(element, 'beforeafter');
    this.settings = Object.assign({}, BeforeAfter.defaults, data, options);

    // no images are given
    // TODO: check options for firstImage and secondImage
    this.images = this.element.querySelectorAll('img');
    if (
      (!this.settings.beforeImage || !this.settings.afterImage) &&
      (!this.images || !this.images.length)
    ) {
      return {
        error: true,
      };
    }

    this.snapTimeout = null;
    // this.touchDuration = null;

    if (!this.element.classList.contains('beforeafter')) {
      this.element.classList.add('beforeafter');
    }

    this.deltaX = 0;
    this.deltaY = 0;

    this.dirDetected = false;
    this.eventFired = {};
    this._registeredEventListeners = [];

    if (this.settings.autoInit) {
      this.init();
    }
  }

  _getPos(e) {
    let t;
    if ('undefined' !== typeof e.pageX) {
      t = e;
    } else {
      t = e.touches[0] || e.changedTouches[0];
    }
    return {
      x: t.pageX,
      y: t.pageY,
    };
  }

  _createGui() {
    const s = this.settings;
    this.createdElements = [];
    const div = 'div';

    const canvas = createEl(div, {
      class: 'canvas',
    });
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
    // const wrapper1 = createEl(
    //   div,
    //   {
    //     class: 'imageWrapper',
    //   },
    //   { zIndex: 1 }
    // );
    // const wrapper2 = createEl(
    //   div,
    //   {
    //     class: 'imageWrapper',
    //   },
    //   { zIndex: 0 }
    // );

    const wrapper1 = document.createDocumentFragment();
    const wrapper2 = document.createDocumentFragment();

    wrapper1.appendChild(firstImg);
    wrapper2.appendChild(secondImg);

    let clip;
    if ('' !== s.beforeLabel) {
      const info1 = createEl(div, {
        class: 'info-box left',
      });
      info1.innerHTML = s.beforeLabel;
      clip = createEl(div, {
        class: 'clipSlider',
      });
      clip.append(info1);
      wrapper2.appendChild(clip);
    }

    if ('' !== s.afterLabel) {
      const info2 = createEl(div, {
        class: 'info-box right',
      });
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
      // second.parentNode.replaceChild(wrapper2, second);
      second.remove();
      wrap([clippingElement, wrapper2], canvas);
    }

    // Create drag element
    const drag = createEl(
      div,
      {
        class: s.dragElementClass,
      },
      {
        zIndex: 5,
        //   touchAction: 'none',
      }
    );
    const overlay1 = createEl(div, { class: 'overlay' }, { zIndex: 4 });

    const dragHandle = createEl(div);
    drag.appendChild(dragHandle);

    canvas.appendChild(overlay1);
    canvas.appendChild(drag);

    // this.element.appendChild(canvas);

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

  _removeAllEvents() {
    this.dragElementTrigger.removeEventListener('mousedown', this._onDragStart);
    this.dragElementTrigger.removeEventListener(
      'touchstart',
      this._onDragStart,
      passiveIfSupported
    );
    if (this.toggleBtn) {
      this.toggleBtn.removeEventListener('click', this.toggleBeforeAfter);
    }
    window.removeEventListener('resize', this._dimensions);
  }

  _addFollowMouseEvents() {
    this.canvas.addEventListener('mouseenter', this._onMouseOver);
    this.canvas.addEventListener('mouseleave', this._onMouseOut);
    this.canvas.addEventListener('mousemove', this._onMouseMove);
  }

  _removeFollowMouseEvents() {
    this.canvas.removeEventListener('mouseenter', this._onMouseOver);
    this.canvas.removeEventListener('mouseleave', this._onMouseOut);
    this.canvas.removeEventListener('mousemove', this._onMouseMove);
  }

  _addEventListeners() {
    if (this.settings.followMouse) {
      // no touch device
      this._addFollowMouseEvents();

      // touch device
      this.dragElementTrigger.addEventListener(
        'touchstart',
        this._onDragStart,
        passiveIfSupported
      );
    } else {
      this.dragElementTrigger.addEventListener('mousedown', this._onDragStart);
      this.dragElementTrigger.addEventListener(
        'touchstart',
        this._onDragStart,
        passiveIfSupported
      );
    }

    if (this.toggleBtn) {
      this.toggleBtn.addEventListener('click', this.toggleBeforeAfter);
    }

    window.addEventListener('resize', this._dimensions);
  }

  // TODO: jumpToEnd
  _stopAni() {
    if (this.requestId) {
      window.cancelAnimationFrame(this.requestId);
      this.requestId = undefined;
    }
    this.timing.then = 0;
    this.timing.curTime = 0;
  }

  _renderLoop() {
    let now, dt;
    now = new Date().getTime();
    dt = now - (this.timing.then || now);
    this.timing.curTime += dt;
    this.progress = this.timing.curTime / this._animationDuration;

    if (this.progress > 1) {
      this.progress = 1;
    }

    // render
    const ease = this.easing(this.progress);
    this._setPosition(this.oldPercent + this._delta * ease);

    this.timing.then = now;

    if (this.progress < 1) {
      this.requestId = window.requestAnimationFrame(
        this._renderLoop.bind(this)
      );
    } else {
      // finished
      this.oldPercent = this.currentPercent;
    }
  }

  _animateTo(percent, duration, easing) {
    percent = restrict(+percent, 0, 100);
    this._delta = percent - this.oldPercent;

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
    this.timing.curTime = 0;

    // start render loop
    this._renderLoop();
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

  _dimensions = () => {
    this.elementWidth = this.canvas.offsetWidth;
    this.elementOffsetLeft = this.offsetElements
      .map((offsetEl) => offsetEl.offsetLeft)
      .reduce((prev, cur) => prev + cur);

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

    if (this.oldElementWidth === this.elementWidth) {
      return;
    }

    this.oldElementWidth = this.elementWidth;

    // this.wrapper1.style.width = `${this.elementWidth}px`;
    // this.wrapper2.style.width = `${this.elementWidth}px`;

    this.elementHeight = this.canvas.offsetHeight;

    // update leftPos too
    // this.currentPos =
    //   this.minLeftPos + (this.currentPercent * this.elementWidth) / 100;
    // this.currentPercent = this._calcLeftPercent(this.currentPos);

    this._setPosition(this.currentPercent, true);
  };

  _onMouseOver = (e) => {
    // console.log('_onMouseOver');
    // this.canvas.addEventListener('mousemove', this._onMouseMove);
    e.stopPropagation();
    this._stopAni();
    this.element.classList.add('interacting');
  };

  _onMouseOut = (e) => {
    // console.log('_onMouseOut');
    // this.canvas.removeEventListener('mousemove', this._onMouseMove);
    e.stopPropagation();
    this.element.classList.remove('interacting');
    if (this.settings.snapToStart) {
      this._snapToStart();
    }
  };

  _onMouseMove = (e) => {
    this._stopAni();
    // console.log('_onMouseMove');
    let currentPos = this._getPos(e);
    let percent = this._calcLeftPercent(currentPos.x);
    percent = restrict(percent, 0, 100);
    this.oldPercent = this.currentPercent;
    this._setPosition(percent);
  };

  _onDragStart = (e) => {
    // console.log('_onDragStart', e.type);
    // this.touchDuration = new Date().getTime();
    this.startPos = this._getPos(e);
    this.element.classList.add('interacting');

    clearTimeout(this.snapTimeout);
    this._tapped(e);

    if ('touchstart' === e.type) {
      window.addEventListener('touchmove', this._onDrag, passiveIfSupported);
      window.addEventListener('touchend', this._onDragEnd);

      if (this.settings.followMouse) {
        this._removeFollowMouseEvents();
      } else {
        this.dragElementTrigger.removeEventListener(
          'mousedown',
          this._onDragStart
        );
      }
    } else if ('mousedown' === e.type) {
      if (!this.settings.followMouse) {
        window.addEventListener('mousemove', this._onDrag, false);
        window.addEventListener('mouseup', this._onDragEnd, false);
      }

      this.dragElementTrigger.removeEventListener(
        'touchstart',
        this._onDragStart
      );
    }
  };

  // _onDragMouse = (e) => {
  //   console.log('_onDragMouse', e.type);

  //   this._stopAni();
  //   this.currentPos = this._getPos(e);

  //   let percent = this._calcLeftPercent(this.currentPos.x);
  //   this.oldPercent = this.currentPercent;
  //   this._setPosition(percent);
  // };

  // moving
  _onDrag = (e) => {
    // console.log('_onDrag', e.type);
    let currentPos = this._getPos(e);
    let percent = this._calcLeftPercent(currentPos.x);

    this._stopAni();
    this.oldPercent = this.currentPercent;
    this._moved = true;

    if ('mousemove' !== e.type) {
      e.preventDefault();
      this.deltaX = Math.abs(this.startPos.x - currentPos.x);
      this.deltaY = Math.abs(this.startPos.y - currentPos.y);

      if (!this.dirDetected) {
        if (Math.abs(this.deltaY) > Math.abs(this.deltaX)) {
          this.element.classList.remove('interacting');
          window.removeEventListener(
            'touchmove',
            this._onDrag,
            passiveIfSupported
          );
          return;
        }

        this.element.classList.add('interacting');
        this.dirDetected = true;
      }
    }

    this._setPosition(percent);
    this._triggerEvent(allowedEvents[1], { percent });
  };

  _onDragEnd = (e) => {
    // console.log('_onDragEnd', e.type);
    this.element.classList.remove('interacting');

    if ('touchend' === e.type) {
      window.removeEventListener('touchmove', this._onDrag, passiveIfSupported);
      window.removeEventListener('touchend', this._onDragEnd);

      setTimeout(() => {
        if (this.settings.followMouse) {
          this._addFollowMouseEvents();
        } else {
          this.dragElementTrigger.addEventListener(
            'mousedown',
            this._onDragStart
          );
        }
      }, 1);
    } else if ('mouseup' === e.type) {
      window.removeEventListener('mousemove', this._onDrag, false);
      window.removeEventListener('mouseup', this._onDragEnd, false);

      this.dragElementTrigger.addEventListener(
        'touchstart',
        this._onDragStart,
        passiveIfSupported
      );
    }

    if (this.settings.snapToStart) {
      let percent = this._calcLeftPercent(this._getPos(e).x);
      let delta = Math.abs(percent - this.currentPercent);

      // clearTimeout(this.snapTimeout);
      if (this._moved || 0.5 > delta) {
        this._snapToStart();
      } else {
        // this._stopAni();
        // this._animateTo(percent, this.settings.animateDuration);
        this.snapTimeout = setTimeout(() => {
          this.oldPercent = percent;
          this._snapToStart();
        }, this.settings.animateDuration + 1);
      }
    }

    this._moved = false;
    this.dirDetected = false;
  };

  // if tapped on canvas
  _tapped = (e) => {
    let percent = this._calcLeftPercent(this._getPos(e).x);
    this._stopAni();
    this.oldPercent = this.currentPercent;
    this._animateTo(percent, this.settings.animateDuration);
  };

  // _onTapEnd = (e) => {
  //   this._stopAni();
  //   console.log('_onTapEnd', e.type);
  //   this.oldPercent = this.currentPercent;

  //   document.removeEventListener('mouseup', this._onTapEnd);
  //   document.removeEventListener('touchend', this._onTapEnd);

  //   // this.element.classList.remove('interacting');
  //   this._snapToStart();
  // };

  // _onTap = (e) => {
  //   console.log('_onTap', e.type);
  //   // e.preventDefault();
  //   // e.stopPropagation();
  //   // this.element.classList.add('interacting');
  //   this._tapped(e);

  //   if (this.settings.snapToStart) {
  //     document.addEventListener('mouseup', this._onTapEnd);
  //     document.addEventListener('touchend', this._onTapEnd);
  //   }
  // };

  _setToggleValues(status, toggleText, text) {
    // console.log('change', status);
    if (this.toggleBtn) {
      this.toggleBtn.innerHTML = toggleText;
      // this.toggleBtn.dataset.status = status;
    }
    if (this.description) {
      this.description.innerHTML = text;
    }
    this._afterShown = 1 === status ? true : false;
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

    // change state and button text
    if (percent > 75 && !this._afterShown) {
      this._setToggleValues(
        1,
        this.settings.toggleBeforeText,
        this.settings.afterDescription
      );
    } else if (percent < 25 && this._afterShown) {
      this._setToggleValues(
        0,
        this.settings.toggleAfterText,
        this.settings.beforeDescription
      );
    }

    this._triggerEvent(allowedEvents[2], { percent });
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

  _triggerEvent(eventName, data) {
    let eventData = {
      detail: {
        instance: this,
        ...data,
      },
    };
    let ce = new CustomEvent(eventName, eventData);
    this.element.dispatchEvent(ce);
    this.eventFired[eventName] = ce;

    // for inline events
    trigger(this.element, eventName, ce);
  }

  // public user function
  async init() {
    if (this._initialized) {
      return this;
    }
    this._initialized = true;

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

      // let afterLabel = s.afterLabel;
      // s.afterLabel = s.beforeLabel;
      // s.beforeLabel = afterLabel;

      this._afterShown = true;
      this._buttonStartText = this.settings.toggleBeforeText;
      this._clipFromLeft = false;
    }

    this._createGui();
    this.offsetElements = this._getOffsetElements();

    // get offset left element
    // if (this.element.offsetParent.nodeName !== 'BODY') {
    //   this.offsetElement = this.element.offsetParent;
    // } else {
    //   this.offsetElement = this.element;
    // }

    this.timing = {
      time: 0,
      curTime: 0,
    };

    this.dragElementTrigger = this.canvas;

    if (s.onlyHandleDraggable) {
      this.dragElementTrigger = this.dragHandle;
      if (s.clickable) {
        this.canvas.addEventListener('mousedown', this._tapped);
        this.canvas.addEventListener('touchstart', this._tapped);
      }
    }
    // this.canvas.classList.add('touch');
    this._animationDuration = s.animateInDuration || 0;

    if (!s.startPos) {
      s.startPos = 0;
    }
    if (!s.animateStartPos) {
      s.animateStartPos = 0;
    }

    this.currentPercent =
      this._animationDuration > 0 ? s.animateStartPos : s.startPos;
    this.oldPercent = this.currentPercent;
    // this.currentPos = {
    //   x: this._calcLeftValue(this.currentPercent),
    //   y: 0,
    // };

    this.element.style.opacity = 0;
    this._moved = false;

    // read the first image
    let file = this.settings.beforeImage || this.images[0].src;
    this.imageDimensions = await imageDimensions(file);
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

    this._addEventListeners();
    this._triggerEvent(allowedEvents[0]);
  }

  addEventListener(eventName, listener, option) {
    if (
      allowedEvents.indexOf(eventName) < 0 ||
      'function' !== typeof listener
    ) {
      return false;
    }

    this.element.addEventListener(eventName, listener, option);
    this._registeredEventListeners.push({ eventName, listener, option });

    // already fired
    if (this.eventFired[eventName]) {
      listener.call(this.element, this.eventFired[eventName]);
    }
  }

  removeEventListener(eventName, listener, option) {
    this.element.removeEventListener(eventName, listener, option);
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
    this.oldPercent = this.currentPercent;
    this._stopAni();
    this._animateTo(percent, duration, easing);
  }

  showAfter() {
    // console.log('showAfter');
    // this._stopAni();
    this.oldPercent = 100;
    this._setPosition(100);
    // this.toggleBtn.innerHTML = this.settings.toggleBeforeText;
    // this._afterShown = true;
  }

  showBefore() {
    // console.log('showBefore');
    // this._stopAni();
    this.oldPercent = 0;
    this._setPosition(0);
    // this.toggleBtn.innerHTML = this.settings.toggleAfterText;
    // this._afterShown = false;
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

    let i;
    // remove elements
    if (this.createdElements) {
      for (i = 0; i < this.createdElements.length; i++) {
        // console.log(this.createdElements[i]);
        this.element.removeChild(this.createdElements[i]);
      }
    }

    // add original elements
    if (this.originalElements) {
      for (i = 0; i < this.originalElements.length; i++) {
        this.element.appendChild(this.originalElements[i]);
      }
    }

    this.createdElements = this.originalElements = [];

    // remove all eventlisteners
    this._removeAllEvents();
  }
}

BeforeAfter.init = () => {
  if (initialized) {
    return true;
  }
  initialized = true;
  BeforeAfter.setupAll('[data-beforeafter]');
  return true;
};

// helper for multiple
BeforeAfter.setupAll = (element, options) => {
  element = getElements(element);
  if (!element) {
    return !1;
  }

  element.forEach((el) => {
    if (el.dataset.bainitialized) {
      return false;
    }
    new BeforeAfter(el, options);
    // if (!ba.error) {
    //   instances.push(ba);
    // }
  });

  return instances;
};

let initialized = false;

/**
 * static bestroy
 * @param  {Object} id the before initialized Object
 * @return {[type]}    [description]
 */
BeforeAfter.destroy = () => {
  const len = instances.length;
  instances.forEach((inst) => {
    inst.destroy();
  });
  initialized = false;
  instances = [];
  return len;
};

/**
 * static defaults settings
 * @type {Object}
 */
BeforeAfter.defaults = defaults;

docReady(BeforeAfter.init);

export default BeforeAfter;
