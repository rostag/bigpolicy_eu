// var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
// var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
var server_port = 4343;
var server_ip_address = '127.0.0.1';

ng serve -prod --port server_port --host server_ip_address

// server.listen(server_port, server_ip_address, function () {
// console.log( "Listening on " + server_ip_address + ", server_port " + port )
// });
