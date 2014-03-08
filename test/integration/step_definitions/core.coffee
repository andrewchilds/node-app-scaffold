fs = require('fs')

SCREENSHOT_DIR = 'test/log'

module.exports = (steps) ->
  steps = steps || {}

  steps.init = ->
    casper.startTime = new Date().getTime()

    casper.options.waitTimeout = 30000

    casper.test.on 'fail', () ->
      steps.debug('failure')

    casper.on 'remote.message', (msg) ->
      casper.echo('remote message: ' + msg)

    # casper.options.verbose = true
    # casper.options.logLevel = 'debug'

  steps.describe = (description, fn) ->
    casper.then ->
      console.log steps.padRight(steps.yellow(description), 88), steps.benchmark()
      fn()

  steps.it = (description, fn) ->
    casper.then ->
      console.log steps.padRight(steps.yellow('[] ' + description), 88), steps.benchmark()
      fn()

  steps.xdescribe = steps.xit = (description, fn) ->
    casper.then ->
      console.log steps.padRight(steps.cyan(' [Skipping] ' + description), 88), steps.benchmark()

  steps.debug = (type) ->
    steps.screenshot(type)
    steps.dumpHTML(type)

  steps.screenshot = (type) ->
    type = type || 'debug'
    timestamp = new Date().getTime()
    filename = 'casper-' + type + '-' + timestamp + '.png'
    console.log('Screenshot saved to ' + SCREENSHOT_DIR + '/' + filename)
    casper.capture(SCREENSHOT_DIR + '/' + filename)

  steps.dumpHTML = (type) ->
    type = type || 'debug'
    timestamp = new Date().getTime()
    html = casper.evaluate -> document.documentElement.innerHTML
    filename = 'casper-' + type + '-' + timestamp + '.html'
    console.log('HTML dump saved to ' + SCREENSHOT_DIR + '/' + filename)
    f = fs.open(SCREENSHOT_DIR + '/' + filename, 'w')
    f.write(html)
    f.close()

  steps.start = ->
    steps.init()
    casper.start 'http://localhost:4000'
    casper.then ->
      casper.viewport(1200, 900)
      casper.evaluate ->
        window.errors = []
        window.onerror = (e) ->
          window.errors.push(e)

  steps.done = (test) ->
    steps.describe 'No exceptions should be thrown', ->
      errors = casper.evaluate -> window.errors

      if errors.length
        casper.test.comment(JSON.stringify(errors))
        test.fail('One or more exceptions were thrown')
      else
        test.pass('No exceptions were thrown')

    casper.run ->
      test.done()

  steps.setValue = (selector, value) ->
    casper.evaluate (selector, value) ->
      document.querySelector(selector).value = value
    , selector, value

  steps.triggerEvent = (selector, eventName) ->
    casper.evaluate (selector, eventName) ->
      e = document.createEvent('Event')
      e.initEvent(eventName, false, false)
      document.querySelector(selector).dispatchEvent(e)
    , selector, eventName

  steps.getSelectorData = (selector, name) ->
    casper.evaluate (selector, name) ->
      document.querySelector(selector).getAttribute('data-' + name)
    , selector, name

  steps.benchmark = ->
    casper.lastBenchmarkTime = casper.lastBenchmarkTime || casper.startTime

    now = new Date().getTime()
    sinceLastTime = now - casper.lastBenchmarkTime
    casper.lastBenchmarkTime = now

    color = if sinceLastTime > 500 then 'red' else 'cyan'
    steps[color]('+' + sinceLastTime + 'ms')

  steps.cyan = (str) ->
    casper.getColorizer().colorize(str, 'PARAMETER')

  steps.yellow = (str) ->
    casper.getColorizer().colorize(str, 'COMMENT')

  steps.red = (str) ->
    casper.getColorizer().colorize(str, 'WARNING')

  steps.padRight = (str, pad) ->
    pad = pad || 80
    if (str.length < pad)
      str += new Array(pad - str.length + 1).join(' ')
    str

  steps
