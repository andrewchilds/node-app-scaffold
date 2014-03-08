App.namespace('Model.Todo', function () {

  var pub = Collectionize('TodoList');

  pub.handleResponse = function (todoList) {
    pub.flush(todoList);
    App.Render.todoList();
  };

  pub.load = function () {
    App.Ajax.get({
      url: '/todos',
      success: pub.handleResponse
    });
  };

  pub.on('beforeAdd', function (todo) {
    todo.id = (_.max(pub.db, 'id').id || 0) + 1;
    todo.done = '';
  });

  pub.on('added', function (todo) {
    App.Ajax.post({
      url: '/todo',
      data: { json: JSON.stringify(todo) },
      success: pub.handleResponse
    });
  });

  pub.on('updated', function (todo) {
    App.Ajax.put({
      url: '/todo/' + todo.id,
      data: { json: JSON.stringify(todo) },
      success: pub.handleResponse
    });
  });

  pub.on('deleted', function (todo) {
    App.Ajax.delete({
      url: '/todo/' + todo.id,
      success: pub.handleResponse
    });
  });

  return pub;

});
