App.namespace('Init', function () {

  var pub = {};

  pub.firstRun = true;

  pub.init = function () {
    if (pub.firstRun) {
      $.fastbinder();
      App.Render.layout();
      App.Model.Todo.load();
      pub.firstRun = false;
    }
  };

  return pub;

});

$(App.Init.init);
