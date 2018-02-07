// server/config.js
module.exports = {
  AUTH0_DOMAIN: 'bigpolicy.eu.auth0.com', // e.g., kmaida.auth0.com
  AUTH0_API_AUDIENCE: 'https://bigpolicy.eu.auth0.com/api/v2/', // http://localhost:4300/ - e.g., 'http://localhost:8083/api/'
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27027/bigpolicy',
  NAMESPACE: 'https://bigpolicy.eu/roles'
};