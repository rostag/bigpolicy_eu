var express = require('express');
var functions = require('firebase-functions');
var middleware = require('./server/');
var appExpress = express();
var router = express.Router();

middleware(appExpress, router);

exports.appExpress = functions.https.onRequest(appExpress);

/** For testing
  function registerFunction(req, res) {
    res.send('Registered');
  }
  function verifyFunction(req, res) {
    res.send('Verified');
  }
  router.get('/register', registerFunction);
  router.get('/verify', verifyFunction);

  Test it: 
  https://bigpolicy.eu/api/verify
  https://bigpolicy.eu/api/register
*/
