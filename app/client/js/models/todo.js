App.module('Model.Todo', function (exports) {

  exports = Collectionize('TodoList');

  exports.handleResponse = function (todoList) {
    exports.flush(todoList);
    App.Controller.Todo.render();
  };

  exports.load = function () {
    App.Ajax.get({
      url: '/todos',
      success: exports.handleResponse
    });
  };

  exports.on('beforeAdd', function (todo) {
    todo.id = (_.max(exports.db, 'id').id || 0) + 1;
    todo.done = '';
  });

  exports.on('added', function (todo) {
    App.Ajax.post({
      url: '/todo',
      data: { json: JSON.stringify(todo) },
      success: exports.handleResponse
    });
  });

  exports.on('updated', function (todo) {
    App.Ajax.put({
      url: '/todo/' + todo.id,
      data: { json: JSON.stringify(todo) },
      success: exports.handleResponse
    });
  });

  exports.on('deleted', function (todo) {
    App.Ajax.delete({
      url: '/todo/' + todo.id,
      success: exports.handleResponse
    });
  });

  return exports;

});
