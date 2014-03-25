App.module('Render', function (exports) {

  exports.layout = function () {
    var html = Caveman.render('layout');
    document.getElementById('content').innerHTML = html;
  };

});
