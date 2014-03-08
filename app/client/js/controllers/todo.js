App.namespace('Controller.Todo', function () {

  var pub = {};

  pub.new = function () {
    var text = $('input', this).val();
    if (!text) {
      return false;
    }
    $('input', this).val('');
    App.Model.Todo.add({ text: text });

    return false;
  };

  pub.toggleState = function () {
    var todo = getTodoFromContext(this);
    todo.done = todo.done === 'on' ? '' : 'on';
    App.Model.Todo.update(todo);

    return false;
  };

  pub.update = function () {
    var todo = getTodoFromContext(this);
    App.Model.Todo.update(todo);

    return false;
  };

  pub.delete = function () {
    var todo = getTodoFromContext(this);
    App.Model.Todo.remove({ id: todo.id });

    return false;
  };

  function getTodoFromContext(context) {
    var element = $(context).closest('.todo');
    element.addClass('updating');
    return App.Utils.formData(element);
  }

  return pub;

});
