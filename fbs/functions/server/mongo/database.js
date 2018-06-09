const config = require('./../config');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var options = {
  poolSize: 5,
  native_parser: true
};

try {
  console.log('Mongo connected:' + config.MONGO_URI);
  mongoose.connect(config.MONGO_URI, options);
} catch (err) {
  console.error('Mongo connection failed: ', err);
}
