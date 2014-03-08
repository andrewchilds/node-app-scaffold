App.namespace('Ajax', function () {

  var pub = { active: 0 };

  pub.ajax = function (options) {
    var complete = options.complete;
    pub.active++;
    options.complete = function () {
      pub.active--;
      if (complete) {
        complete.apply(this, arguments);
      }
    };
    jQuery.ajax(options);
  };

  _.each(['get', 'post', 'put', 'delete'], function (name) {
    pub[name] = function (options) {
      options.type = name.toUpperCase();
      pub.ajax(options);
    };
  });

  return pub;

});
