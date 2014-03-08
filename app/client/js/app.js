var App = (function () {

  var pub = {};

  pub.namespace = function (ns, fn) {
    var context = pub;
    var namespaces = ns.split('.');
    var last = namespaces.pop();
    for (var i = 0; i < namespaces.length; i++) {
      context[namespaces[i]] = context[namespaces[i]] || {};
      context = context[namespaces[i]];
    }
    context[last] = fn();
  };

  return pub;

}());
