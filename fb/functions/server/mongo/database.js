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

var prod = true;
var MNG_URL = 'mongodb://bpqa:bpqa81@ds119436.mlab.com:19436/bpqa';
// var MNG_URL = 'mongodb://localhost:27017/bigpolicy';

try {
  console.log('  𝖄 Mongoose connection:');
  if (prod) {
    console.log('    Remote mongodb: ' + MNG_URL);
    // FIXME_SEC
    // options.user = 'admin';
    // options.pass = app.qa;
    // options.useMongoClient = true;
    mongoose.connect(MNG_URL, options);
  } else {
    // localhost
    options.useMongoClient = true;
    console.log('    Local mongodb://localhost:27017/bigpolicy');
    mongoose.connect('mongodb://localhost:27017/bigpolicy', options);
  }
} catch (err) {
  console.error('A Mongoose connection failed with error: ', err);
}
