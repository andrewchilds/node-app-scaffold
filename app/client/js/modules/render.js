App.namespace('Render', function () {

  var pub = {};

  pub.layout = function () {
    var html = Caveman.render('layout');
    document.getElementById('content').innerHTML = html;
  };

  pub.todoList = function () {
    var html = Caveman.render('todoList', { todoList: App.Model.Todo.db });

    if (document.getElementById('todoList').innerHTML !== html) {
      document.getElementById('todoList').innerHTML = html;
    }
  };

  return pub;

});
