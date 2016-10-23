module.exports = function(app){

  var mailApi = require('./mail-api');
  var taskApi = require('./task-api');
  var leaderApi = require('./leader-api');
  var projectApi = require('./project-api');
  var bodyParser = require('body-parser');

  const DB = require('./mongo/database');

  app.use(bodyParser.urlencoded({'extended':'true'})); // parse application/x-www-form-urlencoded
  app.use(bodyParser.json());                          // parse application/json

  leaderApi(app, DB);
  projectApi(app, DB);
  taskApi(app, DB);
  mailApi(app, DB);

  // Send spa file if unmatched and then register it at the very end of the chain
  app.use(function (req,res) {
    res.sendFile('/dist/index.html', { root: '.' });
  });

  console.log('𝖄 • Middleware connected.');

  return DB;
}
