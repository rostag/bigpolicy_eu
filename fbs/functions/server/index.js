module.exports = function (app, router) {

  require('path');
  const bodyParser = require('body-parser');
  const methodOverride = require('method-override');
  const cors = require('cors');

  // Config
  const config = require('./config');

  const pingApi = require('./ping-api');
  const taskApi = require('./task-api');
  const leaderApi = require('./leader-api');
  const projectApi = require('./project-api');
  const mailApi = require('./mail-api');
  const liqpayApi = require('./donation-api');

  const DB = require('./mongo/database');
  const DBLeader = require('./mongo/db-leader');
  const DBProject = require('./mongo/db-project');
  const DBTask = require('./mongo/db-task');
  const DBDonation = require('./mongo/db-donation');

  app.use(bodyParser.urlencoded({'extended': true})); // parse application/x-www-form-urlencoded
  app.use(bodyParser.json());                          // parse application/json
  app.use(methodOverride('X-HTTP-Method-Override'));
  app.use(cors());

  // FIXME_SEC
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "OPTIONS, PUT, DELETE, POST, GET");
    next();
  });

  // Pass routing to Angular app
  // Don't run in dev
  // if (process.env.NODE_ENV !== 'dev') {
  // app.get('*', function(req, res) {
  //   res.sendFile(path.join(__dirname, '/dist/index.html'));
  // });

  const jwt = require('express-jwt');
  const jwks = require('jwks-rsa');

  // Authentication middleware
  const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${config.AUTH0_DOMAIN}/.well-known/jwks.json`
    }),
    audience: config.AUTH0_API_AUDIENCE,
    issuer: `https://${config.AUTH0_DOMAIN}/`,
    algorithm: 'RS256'
  });

  // Check for an authenticated admin user
  const adminCheck = (req, res, next) => {
    const roles = req.user[config.NAMESPACE] || [];
    console.log('Roles:', roles, req.user);

    if (roles.indexOf('admin') > -1) {
      next();
    } else {
      res.status(401).send({message: 'Not authorized for admin access'});
    }
  };

  /*
  |--------------------------------------
  | API Routes
  |--------------------------------------
  */

  pingApi(app, router);
  leaderApi(app, router, DBLeader, jwtCheck, adminCheck);
  projectApi(app, router, DBProject, DBLeader);
  taskApi(app, router, DBTask, DBProject);
  mailApi(app, router, DB);
  liqpayApi(app, router, DBDonation, DBLeader, DBProject, DBTask);

  app.use('/api', router);

  app.use(function (req, res) {
    res.sendFile('dist/index.html', {root: '.'});
  });

  console.log('  • Middleware connected.');

  return DB;
};
