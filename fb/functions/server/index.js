module.exports = function(app, router){

  var pingApi = require('./ping-api');
  var taskApi = require('./task-api');
  var leaderApi = require('./leader-api');
  var projectApi = require('./project-api');
  var mailApi = require('./mail-api');
  var liqpayApi = require('./donation-api');
  var bodyParser = require('body-parser');

  const DB = require('./mongo/database');
  const DBLeader = require('./mongo/db-leader');
  const DBProject = require('./mongo/db-project');
  const DBTask = require('./mongo/db-task');
  const DBDonation = require('./mongo/db-donation');

  app.use(bodyParser.urlencoded({'extended':'true'})); // parse application/x-www-form-urlencoded
  app.use(bodyParser.json());                          // parse application/json

  // FIXME_SEC
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "OPTIONS, PUT, DELETE, POST, GET");
    next();
  });

  pingApi(app, router);
  leaderApi(app, router, DBLeader);
  projectApi(app, router, DBProject, DBLeader);
  taskApi(app, router, DBTask, DBProject);
  mailApi(app, router, DB);
  liqpayApi(app, router, DBDonation, DBLeader, DBProject, DBTask);

  app.use('/api', router);

  console.log('  • Middleware connected.');

  return DB;
}