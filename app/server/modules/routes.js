var fs = require('fs');
var todo = require('./todo.js');
var config = require('../../config');

module.exports = function (app) {
  app.get('/', function (req, res) {
    renderPageWithFingerprint(res, 'index');
  });

  todo.routes(app);
};

function renderPageWithFingerprint(res, template) {
  fs.readFile(__dirname + '/../../../fingerprint', function (err, data) {
    if (err) {
      console.log('Fingerprint file not found, using current timestamp instead.');
    }
    res.render(template, {
      timestamp: data || new Date().getTime(),
      environment: config.environment
    });
  });
}
