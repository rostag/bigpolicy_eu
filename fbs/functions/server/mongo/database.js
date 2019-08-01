const mongoose = require('mongoose');

// Firebase environment adopted:
const functions = require('firebase-functions');
const admin = require('firebase-admin');
console.log('INIT DB:', process, process.env, process.env.FIREBASE_CONFIG, JSON.parse(process.env.FIREBASE_CONFIG));
console.log('INIT DB 2:', JSON.stringify(functions.config()));
admin.initializeApp(JSON.parse(process.env.FIREBASE_CONFIG));
// admin.initialize App();

const MONGO_URI = functions && functions.config() && functions.config().mongo && functions.config().mongo.uri ||
  'mongodb://localhost:27027/bigpolicy';

mongoose.Promise = global.Promise;

var options = {
  poolSize: 5,
  native_parser: true,
  useNewUrlParser: true
};

try {
  console.log('Mongo connected:' + MONGO_URI);
  mongoose.connect(MONGO_URI, options);
} catch (err) {
  console.error('Mongo connection failed: ', err);
}
