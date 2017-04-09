var app = require('./models/app');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var options = {
  server: {
    poolSize: 5
  },
  db: {
    nativeParser: true
  }
};

// Accomodate custom MongoDB by icflorescu - https://github.com/icflorescu/openshift-cartridge-mongodb/
var MNG_URL = process.env.MONGODB_URL || process.env.OPENSHIFT_MONGODB_DB_URL;

try {
  console.log('  𝖄 Mongoose connection:');
  if (MNG_URL) {
    console.error('    Remote: ' + MNG_URL + process.env.OPENSHIFT_APP_NAME);
    // FIXME_SEC
    options.user = 'admin';
    options.pass = app.qa;
    mongoose.connect(MNG_URL + process.env.OPENSHIFT_APP_NAME, options);
  } else {
    // localhost
    console.error('    Local mongodb://localhost:27017/bigpolicy');
    mongoose.connect('mongodb://localhost:27017/bigpolicy', options);
  }
} catch (err) {
  console.error('A Mongoose connection failed with error: ', err);
}
