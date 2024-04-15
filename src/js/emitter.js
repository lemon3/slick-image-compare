/**
 * helper to trigger inline events
 * e.g.:
 * <div ondatechange="foo()">bar</bla>
 * @param {Object} elem the html element
 * @param {String} name the event name
 * @param {Object} data event data
 */
export const trigger = (elem, name, data) => {
  let funData = elem.getAttribute('on' + name);
  let func = new Function(
    'e',
    // 'with(document) {' +
    // 'with(this)' +
    '{' + funData + '}'
    // + '}'
  );
  func.call(elem, data);
};

/**
 * The Emitter class
 */
export class Emitter {
  constructor() {
    this._eventCallbacks = this._eventCallbacks || {};
  }

  emit(eventName, detail) {
    let eventCallbacks = this._eventCallbacks[eventName];
    const eventData = { bubbles: false, cancelable: false, detail };
    const ce = new CustomEvent(eventName, eventData);

    // call all registered event handler
    if (eventCallbacks) {
      eventCallbacks.forEach((cb) => cb.call(this, ce));
    }

    if (this.element) {
      // trigger DOM event
      this.element.dispatchEvent(ce);

      // for inline events
      trigger(this.element, eventName, ce);
    }
  }

  // on
  addEventListener(eventName, listener) {
    if (
      (this.allowedEvents && this.allowedEvents.indexOf(eventName) < 0) ||
      'function' !== typeof listener
    ) {
      return false;
    }

    if (!this._eventCallbacks[eventName]) {
      this._eventCallbacks[eventName] = [];
    }
    this._eventCallbacks[eventName].push(listener);

    return this;
  }

  // off
  removeEventListener(eventName, listener) {
    // clear all
    if (!this._eventCallbacks || 0 === arguments.length) {
      this._eventCallbacks = {};
      return this;
    }

    // early exit, eventName not found
    let eventCallbacks = this._eventCallbacks[eventName];
    if (!eventCallbacks) {
      return this;
    }

    // remove handlers for a specific event
    if (1 === arguments.length) {
      delete this._eventCallbacks[eventName];
      return this;
    }

    // remove specific handler form array
    this._eventCallbacks[eventName] = eventCallbacks.filter(
      (cb) => cb !== listener
    );

    return this;
  }
}
