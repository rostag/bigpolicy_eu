module.exports = function(app){

  var mailApi = require('./mail-api');
  var taskApi = require('./task-api');
  var leaderApi = require('./leader-api');
  var projectApi = require('./project-api');
  var bodyParser = require('body-parser');
  var jwt = require('express-jwt');
  var DB = require('./mongo/database');

  // FIXME_SEC
  var jwtCheck = jwt({
    secret: 'ldrtNSJ_YB97SBoRJvTQtKMqCGoo79LHQvo2H7t28pyrIw5awS6P0FFKCNxMTx80',
    audience: 'IgrxIDG6iBnAlS0HLpPW2m3hWb1LRH1J'
  });

  app.use(bodyParser.urlencoded({'extended':'true'})); // parse application/x-www-form-urlencoded
  app.use(bodyParser.json());                          // parse application/json

  // FIXME
  // app.use('/leader-api', jwtCheck);
  // app.use('/project-api', jwtCheck);

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
