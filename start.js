var http = require('http');
var express = require('express');
var app = express();
var router = express.Router();
var server = http.createServer(app);
var port = 4200;
var hostname = '127.0.0.1';
var middleware = require('./fb/functions/server/');

function redirectToSecure(req, res, next) {
  if (req.headers['x-forwarded-proto'] == 'http' || req.headers['x-forwarded-proto'] == null) {
      res.redirect('https://' + req.headers.host + req.path);
      return;
  } else {
    next();
  }
}

if (hostname === '127.0.0.1') {
  port = 4200;
} else {
  app.use(redirectToSecure);
}

app.use(express.static(__dirname + '/dist'));

middleware(app, router);

server.listen(port,hostname);

console.log('  • BigPolicy is listening on http://' + hostname + ':' + port);
