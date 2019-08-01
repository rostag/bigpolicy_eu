const mongoose = require('mongoose');

// FIXME
const firebase = require('firebase/app');
const admin = require('firebase-admin');
// Initialize Firebase
console.log('Firebase config:', process, process.env, process.env.FIREBASE_CONFIG, JSON.parse(process.env.FIREBASE_CONFIG));
firebase.initializeApp(JSON.parse(process.env.FIREBASE_CONFIG));
// END FIXME

// Firebase environment adopted:
const functions = require('firebase-functions');
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
