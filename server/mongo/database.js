var app = require('./models/app');
var mongoose = require('mongoose');

// Use native promises
mongoose.Promise = global.Promise;

// FIXME
var options = {  server: { poolSize: 5 } };

// FIXME for livereloading purposes
try {
  console.log('𝖄 • Mongoose connection:');
    if (process.env.OPENSHIFT_MONGODB_DB_URL) {
        console.error('    Remote: ' + process.env.OPENSHIFT_MONGODB_DB_URL + process.env.OPENSHIFT_APP_NAME);
        // FIXME_SEC
        options.user = 'admin';
        options.pass = app.qa;
        mongoose.connect(process.env.OPENSHIFT_MONGODB_DB_URL + process.env.OPENSHIFT_APP_NAME, options);
    } else {
        // localhost
        console.error('    Local mongodb://localhost:27017/bigpolicy');
        mongoose.connect('mongodb://localhost:27017/bigpolicy', options);
    }
} catch (err) {
    console.error('A Mongoose connection failed with error: ', err);
}
