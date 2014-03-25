App.module('Utils', function (exports) {

  exports.formData = function (el) {
    var data = {};
    $('input, select, textarea', el).each(function () {
      data[exports.attr(this, 'name')] = exports.convertNumber($(this).val());
    });
    return data;
  };

  // Much faster than jQuery.data
  exports.data = function (el, name, val) {
    return exports.attr(el, 'data-' + name, val);
  };

  exports.attr = function (el, name, val) {
    if (el && el.jquery) {
      el = el[0];
    }
    // getAttribute/setAttribute = IE 9+
    if (el && el.getAttribute) {
      if (typeof val !== 'undefined') {
        el.setAttribute(name, val);
      } else {
        var attr = el.getAttribute(name);
        return exports.convertNumber(attr);
      }
    }
  };

  exports.convertNumber = function (str) {
    return (str === '' || isNaN(str)) ? str : parseFloat(str);
  };

});
