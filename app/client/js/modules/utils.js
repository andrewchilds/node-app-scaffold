App.namespace('Utils', function () {

  var pub = {};

  pub.formData = function (el) {
    var data = {};
    $('input, select, textarea', el).each(function () {
      data[pub.attr(this, 'name')] = pub.convertNumber($(this).val());
    });
    return data;
  };

  // Much faster than jQuery.data
  pub.data = function (el, name, val) {
    return pub.attr(el, 'data-' + name, val);
  };

  pub.attr = function (el, name, val) {
    if (el && el.jquery) {
      el = el[0];
    }
    // getAttribute/setAttribute = IE 9+
    if (el && el.getAttribute) {
      if (typeof val !== 'undefined') {
        el.setAttribute(name, val);
      } else {
        var attr = el.getAttribute(name);
        return pub.convertNumber(attr);
      }
    }
  };

  pub.convertNumber = function (str) {
    return (str === '' || isNaN(str)) ? str : parseFloat(str);
  };

  return pub;

});
