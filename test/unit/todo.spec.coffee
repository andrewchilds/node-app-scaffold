todo = require('../../app/server/modules/todo')

newTodoJSON = '{ "id": 5, "text": "New Todo", "done": "" }'
updatedTodoJSON = '{ "id": 3, "text": "Pay cable bill", "done": "on" }'
req = {}
res = {}

beforeEach ->
  res = {
    json: jasmine.createSpy('res.json')
  }

describe 'getTodos', ->
  subject = todo.getTodos

  beforeEach ->
    req = {}

  it 'should return the todo list', ->
    subject(req, res)
    expect(res.json).toHaveBeenCalledWith todo.list

describe 'createTodo', ->
  subject = todo.createTodo

  beforeEach ->
    req = {
      body: {
        json: newTodoJSON
      }
    }

  it 'should add the todo to the beginning of the array and return the updated todo list', ->
    subject(req, res)
    expect(todo.list[0]).toEqual JSON.parse(newTodoJSON)
    expect(res.json).toHaveBeenCalledWith todo.list

describe 'updateTodo', ->
  subject = todo.updateTodo

  beforeEach ->
    req = {
      param: -> 3
      body: {
        json: updatedTodoJSON
      }
    }

  it 'should update the todo and return the updated todo list', ->
    subject(req, res)
    expect(todo.list[2]).toEqual JSON.parse(updatedTodoJSON)
    expect(res.json).toHaveBeenCalledWith todo.list

describe 'deleteTodo', ->
  subject = todo.deleteTodo

  beforeEach ->
    req = {
      param: -> 5
    }

  it 'should update the todo and return the updated todo list', ->
    subject(req, res)
    expect(todo.list.length).toBe 4
    expect(res.json).toHaveBeenCalledWith todo.list
