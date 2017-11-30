var functions = require('firebase-functions');
var express = require('express');
var middleware = require('./server/');

var appExpress = express();
var router = express.Router();

middleware(appExpress, router);

function registerFunction(req, res) {
  res.send('Registered');
}

function verifyFunction(req, res) {
  res.send('Verified');
}

router.get('/register', registerFunction);
router.get('/verify', verifyFunction);
router.get("*", (request, response) => {
  response.send("Hello from Express on Firebase with CORS!")
});


appExpress.use('/api', router);

exports.appExpress = functions.https.onRequest(appExpress);

/**
 * Test it: 
 * https://bigpolicy.eu/api/ping
 * https://bigpolicy.eu/api/verify
 * https://bigpolicy.eu/api/register
 */


// const functions = require('firebase-functions');
// const cors = require("cors");
// const express = require("express")

// exports.helloWorld = functions.https.onRequest((request, response) => {
//     response.send("Hello from Firebase!");
// });

// exports.bigben = functions.https.onRequest((req, res) => {
//     const hours = (new Date().getHours() % 12) + 1 // london is UTC + 1hr;
//     res.status(200).send(`<!doctype html>
//       <head>
//         <title>Time</title>
//       </head>
//       <body>
//         ${'BONG '.repeat(hours)}
//       </body>
//     </html>`);
// });

/* Express with CORS */
// const appExpress = express()
// appExpress.use(cors({ origin: true }))
// appExpress.get("*", (request, response) => {
//   response.send("Hello from Express on Firebase with CORS!")
// })

// const apiExpress = functions.https.onRequest(appExpress)

// module.exports = {
//   apiExpress
// }