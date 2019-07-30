const express = require('express');
const expressApp = express();
const expressRouter = express.Router();
require('./server/')(expressApp, expressRouter);

const expressHttpServer = require('firebase-functions').https.onRequest(expressApp);

const admin = require('firebase-admin');
admin.initializeApp();

exports.appExpress = expressHttpServer;
