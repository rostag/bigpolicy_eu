const express = require('express');
require('./server/')(express(), express.Router());
exports
  .appExpress = require('firebase-functions')
  .https
  .onRequest(appExpress);
