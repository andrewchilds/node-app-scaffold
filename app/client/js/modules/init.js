App.module('Init', function (exports) {

  exports.firstRun = true;

  exports.init = function () {
    if (exports.firstRun) {
      $.fastbinder();
      exports.firstRun = false;
    }

    App.Render.layout();
    App.Model.Todo.load();
  };

  $(exports.init);

});
