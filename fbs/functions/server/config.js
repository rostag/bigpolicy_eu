// server/config.js
module.exports = {
  AUTH0_DOMAIN: 'bigpolicy.eu.auth0.com',
  AUTH0_API_AUDIENCE: 'http://bigpolicy.eu/api/',
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27027/bigpolicy',
  NAMESPACE: 'https://bigpolicy.eu/roles'
};