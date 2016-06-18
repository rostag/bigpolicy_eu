var express = require('express');
var app = express();

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.use(express.static('./dist'));

app.listen(server_port, server_ip_address, function () {
  console.log('Big Policy is listening on port ' + server_port);
});
