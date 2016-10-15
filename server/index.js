module.exports = function(app){

  const DB = require('./mongo/database');

  var leaderApi = require('./leader-api');
  var projectApi = require('./project-api');
  var taskApi = require('./task-api');
  var mailApi = require('./mail-api');
  var bodyParser = require('body-parser');

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  leaderApi(app, DB);
  projectApi(app, DB);
  taskApi(app, DB);
  mailApi(app, DB);

  // middleware for all requests
  // router.use(function(req, res, next) {
  //     // console.log('API was used');
  //     next(); // go to the next routes
  // });

  console.log('𝖄 • Middleware connected.');

  return DB;
}
