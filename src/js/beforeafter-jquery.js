// Test import of a JavaScript module
import BeforeAfter from '@/js/beforeafter.js';

// for use with jQuery
(($, BeforeAfter) => {
  if (!$ || !BeforeAfter) {
    return;
  }

  const pluginName = 'beforeafter';

  // $.fn.BeforeAfter = function(options) {
  //   function init(int, el) {
  //     if ($(this).data(pluginName)) {
  //       return $(this).data(pluginName);
  //     }
  //     let $settings = $.extend({}, BeforeAfter.defaults, options);
  //     b = new BeforeAfter.ba(this, $settings);
  //     $(this).data(pluginName, b);
  //     return b
  //   }
  //   return this.each(init);
  // };

  $.fn.BeforeAfter = function (params) {
    if (!this.length) return this;

    let method = params,
      _this = this,
      plugin,
      args = Array.prototype.slice.call(arguments, 1);

    this.each(function (ind, el) {
      let $el = $(el),
        pluginMethod,
        returnVal;

      if (!$el.data(pluginName)) {
        let $settings = $.extend({}, BeforeAfter.defaults, params);
        // console.log($settings);
        plugin = new BeforeAfter.ba(el, $settings);
        $el.data(pluginName, plugin);
      } else {
        // setter getter
        plugin = $el.data(pluginName);
        // console.log(plugin);
        pluginMethod = plugin[method];

        if (undefined !== pluginMethod && 'init' !== method) {
          if ('function' === typeof pluginMethod) {
            returnVal = pluginMethod.apply(el, args);
          }
          // else if (typeof pluginMethod === 'object') {
          //     returnVal = pluginMethod;
          // }
          else {
            returnVal = pluginMethod;
          }

          // other return value for the getter
          if (!args.length) {
            _this = returnVal;
          }
        }
      }
    });

    return _this;
  };
})(window.jQuery, window.BeforeAfter);

export default BeforeAfter;
