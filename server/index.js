module.exports = function(app){

  const DB = require('./mongo/database');

  var leaderApi = require('./leader');
  var projectApi = require('./project');
  var taskApi = require('./task');

  var bodyParser = require('body-parser');

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  leaderApi(app, DB);
  projectApi(app, DB);
  taskApi(app, DB);

  console.log('𝖄  middleware connected  𝖄');

  return DB;
}
