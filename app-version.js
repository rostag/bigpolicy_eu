// auto-increment app version using json file and output it
var jsonfile = require('jsonfile')

// version is stored here
var file = 'package.json'

var value = jsonfile.readFileSync(file);
// console.dir('Increasing version from:');
// console.dir(value['app-version']);

var v = value['version'].split('.');
var major = v[0];
var minor = v[1];
var build = v[2];

build ++;

var r = [major, minor, build].join('.');

value['app-version'] = r;

// console.dir('to:');
// console.dir(value['app-version']);

jsonfile.writeFileSync(file, value, {spaces: 2});

// output the value to be used by deploy script
process.stdout.write(value['app-version']);
