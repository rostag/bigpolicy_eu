var mongoose = require('mongoose');

// Use native promises
mongoose.Promise = global.Promise;

var app = require('./models/app');

// FIXME
var options = {
  server: { poolSize: 5 }
}

// for livereloading purposes
try{
  console.error('Establishing mongoose connection:');
    if(process.env.OPENSHIFT_MONGODB_DB_URL){
        console.error('On Openshift: ' + process.env.OPENSHIFT_MONGODB_DB_URL + process.env.OPENSHIFT_APP_NAME);
        options.user = 'admin';
        options.pass = app.qa;
        mongoose.connect(process.env.OPENSHIFT_MONGODB_DB_URL + process.env.OPENSHIFT_APP_NAME, options);
    }else{
        // localhost
        console.error('Locally: mongodb://localhost:27017/bigpolicy');
        mongoose.connect('mongodb://localhost:27017/bigpolicy', options);
    }
}catch(err){
    console.error('A Mongoose connection failed with error: ', err);
}
