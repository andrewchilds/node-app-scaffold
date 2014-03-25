App.module('Controller.Todo', function (exports) {

  exports.render = function () {
    var html = Caveman.render('todoList', { todoList: App.Model.Todo.db });

    if (document.getElementById('todoList').innerHTML !== html) {
      document.getElementById('todoList').innerHTML = html;
    }
  };

  exports.new = function () {
    var text = $('input', this).val();
    if (!text) {
      return false;
    }
    $('input', this).val('');
    App.Model.Todo.add({ text: text });

    return false;
  };

  exports.toggleState = function () {
    var todo = getTodoFromContext(this);
    todo.done = todo.done === 'on' ? '' : 'on';
    App.Model.Todo.update(todo);

    return false;
  };

  exports.update = function () {
    var todo = getTodoFromContext(this);
    App.Model.Todo.update(todo);

    return false;
  };

  exports.delete = function () {
    var todo = getTodoFromContext(this);
    App.Model.Todo.remove({ id: todo.id });

    return false;
  };

  function getTodoFromContext(context) {
    var element = $(context).closest('.todo');
    element.addClass('updating');
    return App.Utils.formData(element);
  }

});
