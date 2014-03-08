module.exports = (steps) ->
  steps = steps || {}

  steps.waitForAjax = ->
    casper.waitFor ->
      casper.evaluate ->
        App.Ajax.active is 0

  steps.getFirstTodoText = ->
    casper.evaluate ->
      jQuery('#todoList .todo').eq(0).find('.todo-text input').val()

  steps.firstTodoIsDone = ->
    casper.evaluate ->
      jQuery('#todoList .todo').eq(0).hasClass('done')

  steps.toggleFirstTodoState = ->
    casper.click('.todo .todo-checkbox')
    steps.waitForAjax()

  steps.deleteFirstTodo = ->
    casper.click('.todo .delete-todo')
    steps.waitForAjax()

  steps.jQuerySubmitForm = (selector) ->
    casper.evaluate (selector) ->
      jQuery(selector).submit()
    , selector

  steps.addTodo = (text) ->
    casper.click('#new-todo')
    steps.setValue('#new-todo', text)
    steps.jQuerySubmitForm('#new-todo-form')
    steps.waitForAjax()

  steps.updateFirstTodo = (text) ->
    casper.click('.todo .todo-text input')
    steps.setValue('.todo .todo-text input', text)
    casper.evaluate (text) ->
      input = jQuery('#todoList .todo').eq(0).find('.todo-text input')
      input.hover()
      input.val(text)
      input.blur()
    , text
    steps.waitForAjax()

  steps
