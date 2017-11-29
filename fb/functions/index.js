const functions = require('firebase-functions');
const cors = require("cors");
const express = require("express")

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
const appExpress = express()
appExpress.use(cors({ origin: true }))
appExpress.get("*", (request, response) => {
  response.send("Hello from Express on Firebase with CORS!")
})

const apiExpress = functions.https.onRequest(appExpress)

module.exports = {
  apiExpress
}