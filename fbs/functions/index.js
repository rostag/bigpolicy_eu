// bp/fbs/functions/index.js

var express = require('express');
var functions = require('firebase-functions');
var middleware = require('./server/');
var appExpress = express();
var router = express.Router();

middleware(appExpress, router);

exports.appExpress = functions.https.onRequest(appExpress);
