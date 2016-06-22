var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var hostname = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.2';

function redirectToSecure(req, res, next) {
  if (req.headers['x-forwarded-proto'] == 'http' || req.headers['x-forwarded-proto'] == null) {
      res.redirect('https://' + req.headers.host + req.path);
      return;
  } else {
    next();
  }
}

if (hostname === '127.0.0.2') {
  port = 80;
} else {
  app.use(redirectToSecure);
}

app.use(express.static(__dirname + '/dist'));

server.listen(port,hostname);

console.log( 'BigPolicy Express web server listening on port ' + port + ' , host: ' + hostname);
