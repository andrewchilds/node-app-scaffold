var _ = require('lodash');

// Simple in-memory data store.

exports.list = [
  { id: 4, text: 'Purchase two tickets to paradise', done: 'on' },
  { id: 3, text: 'Pay cable bill', done: '' },
  { id: 2, text: 'Set up bill autopay', done: '' },
  { id: 1, text: 'Join Facebook', done: '' }
];

exports.routes = function (app) {
  app.get('/todos', exports.getTodos);
  app.post('/todo', exports.createTodo);
  app.put('/todo/:id', exports.updateTodo);
  app.delete('/todo/:id', exports.deleteTodo);
};

exports.getTodos = function (req, res) {
  res.json(exports.list);
};

exports.createTodo = function (req, res) {
  exports.list.unshift(JSON.parse(req.body.json));
  res.json(exports.list);
};

exports.updateTodo = function (req, res) {
  var id = parseInt(req.param('id'), 10);
  var index = _.findIndex(exports.list, { id: id });
  exports.list[index] = JSON.parse(req.body.json);
  res.json(exports.list);
};

exports.deleteTodo = function (req, res) {
  var id = parseInt(req.param('id'), 10);
  exports.list = _.reject(exports.list, { id: id });
  res.json(exports.list);
};
