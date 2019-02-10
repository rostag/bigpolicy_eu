var http = require('http');
var express = require('express');
var port = 4300;
var hostname = '127.0.0.1';
var middleware = require('./fbs/functions/server/');

var appExpress = express();
var router = express.Router();
var server = http.createServer(appExpress);

function redirectToSecure(req, res, next) {
  if (req.headers['x-forwarded-proto'] == 'http' || req.headers['x-forwarded-proto'] == null) {
    res.redirect(`https://${req.headers.host}${req.path}`);
    return;
  } else {
    next();
  }
}

if (!hostname === '127.0.0.1') {
  appExpress.use(redirectToSecure);
}

appExpress.use(express.static(__dirname + '/dist'));

middleware(appExpress, router);

server.listen(port, hostname);

console.log(`bigpolicy is listening on ${hostname}:${port}`);
