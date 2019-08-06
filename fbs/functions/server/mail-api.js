const K = require('./bp-app-config');

module.exports = function(app, router){

  // Mailgun-js wrapper
  const Mailgun = require('mailgun-js');
  const mailgun_api_key = K.mailgun.apiKey;
  const mailgun_domain = K.mailgun.domain;

  // Send a message to the specified email address. All params passed via req
  router.post('/mail-api/share', function (req, res) {

    // Pass the mailgun_api_key and mailgun_domain to the wrapper, or it won't be able to identify & send emails
    const mailgun = new Mailgun({
      apiKey: mailgun_api_key,
      domain: mailgun_domain
    });

    let data = req.body;
    for ( const item in req.body ) {
      data = JSON.parse(item);
    }

    console.log('Mail API got project to share:\n', data );

    // FIXME un-hardcode to's
    data.to = Object.keys(data.toEmails)[0];

    // FIXME
    mailgun.messages().send(data, function (err) {
      if (err) {
        console.log('Got an error whilst sending mail: ', err);
      }
      else {
        console.log('  • Email sent to', data.to);
      }
    })
    .then(function (data) {
      res.json(data);
    })
    .catch(function(err){
	    res.json(err);
  	});
  });

  // app.use('/mail-api', router);

  console.log('  • Mailgun loaded.');
};
