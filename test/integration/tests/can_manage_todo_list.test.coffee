steps = require('../step_definitions/core')()
steps = require('../step_definitions/todo')(steps)

todoText = 'My Todo ' + new Date().getTime()
editedTodoText = todoText + ' edit'

steps.start()

casper.test.begin 'Todo editing', (test) ->

  steps.describe 'I add a new todo', ->
    steps.addTodo(todoText)

    steps.it 'Should display the todo item in the list', ->
      foundText = steps.getFirstTodoText()
      test.assertEquals foundText, todoText,
        'Todo note "' + foundText + '" is "' + todoText + '"'

  steps.describe 'I mark my todo as done', ->
    steps.toggleFirstTodoState()

    steps.it 'Should display as done', ->
      test.assertTrue steps.firstTodoIsDone()

  steps.describe 'I update my todo', ->
    steps.updateFirstTodo(editedTodoText)

    steps.it 'Should display the updated todo', ->
      foundText = steps.getFirstTodoText()
      test.assertEquals foundText, editedTodoText,
        'Todo note "' + foundText + '" is "' + editedTodoText + '"'

  steps.describe 'I mark my todo as not done', ->
    steps.toggleFirstTodoState()

    steps.it 'Should display as not done', ->
      test.assertFalse steps.firstTodoIsDone()

  steps.describe 'I delete my todo', ->
    steps.deleteFirstTodo()

    steps.it 'Should no longer display the todo item in the list', ->
      foundText = steps.getFirstTodoText()
      test.assertNotEquals foundText, editedTodoText,
        'Todo note "' + foundText + '" is not "' + editedTodoText + '"'

  steps.done(test)
