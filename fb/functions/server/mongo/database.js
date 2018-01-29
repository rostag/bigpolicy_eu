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

//  Local : 'mongodb://localhost:27027/bigpolicy'
//  Remote: 'mongodb://bpqa:bpqa81@ds119436.mlab.com:19436/bpqa'
var MNG_URL = 'mongodb://localhost:27027/bigpolicy';

try {
  console.log('  𝖄 Mongoose connection:' + MNG_URL);
  mongoose.connect(MNG_URL, options);
} catch (err) {
  console.error('A Mongoose connection failed with error: ', err);
}
