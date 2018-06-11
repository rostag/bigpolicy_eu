const mongoose = require('mongoose');

// Firebase environment adopted:
const functions = require('firebase-functions');
const MONGO_URI = functions.config().mongo.uri || 'mongodb://localhost:27027/bigpolicy';

mongoose.Promise = global.Promise;

var options = {
  poolSize: 5,
  native_parser: true
};

try {
  console.log('Mongo connected:' + MONGO_URI);
  mongoose.connect(MONGO_URI, options);
} catch (err) {
  console.error('Mongo connection failed: ', err);
}
