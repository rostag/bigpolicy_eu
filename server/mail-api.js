module.exports = function(app, DB){

  // Mailgun-js wrapper
  var Mailgun = require('mailgun-js');
  var express = require('express');

  var router = express.Router();

  // api key for Mailgun
  var api_key = 'key-fbb7eae260ccda81270645824316856a';
  // domain for Mailgun
  var domain = 'bigpolicy.eu';
  // whos sends the message
  // FIXME no hardcode, please -- will use user's email
  var from_who = 'test@bigpolicy.eu';
  var to_who = 'rostyslav.siryk@gmail.com';

  // Send a message to the specified email address when you navigate to /submit/someaddr@email.com
  router.post('/share', function (req, res) {

    var dataObj = req.body;
    var data = dataObj;

    for ( var item in dataObj ) {
      data = JSON.parse(item);
    }

    // var data = JSON.parse(dataStr);
    console.log('Share project: ', data)

    if(!data) data = {};
    const model = new Object({
      _id: data._id,
      title: data.title,
      description: data.description,
      managerName: data.managerName,
      managerId: data.managerId,
      iconURL: data.iconURL,
      cost: data.cost
    });

    // FIXME - add audience support
    model.to = to_who;

    //We pass the api_key and domain to the wrapper, or it won't be able to identify + send emails
    var mailgun = new Mailgun({apiKey: api_key, domain: domain});

    var data = {
      //Specify email data
      from: model.managerId,
      //The email to contact
      to: model.to,
      //Subject and text data
      subject: 'Ping from ' + model.managerName,
      html: '<h1>' + model.title + '</h1><p>' + model.description + '<p><br><br><a href="http://bigpolicy.eu/project/' + model._id + '">Ось мій проект</a>'
    }

    console.log('data:', data);
    // console.log('mailgun:', mailgun);

    // Send emails given the above data
    mailgun.messages().send(data, function (err, body) {
      if (err) {
        console.log("Got an error while sending mail: ", err);
      }
      else {
        console.log('𝖄 • Email sent to', model.to);
      }
    })
    .then(function (data) {
      res.json(data);
    })
    .catch(function(err){
	    res.json(err);
  	});
  })

  app.use('/mail-api', router);

  console.log('𝖄 • Mailgun loaded.');

}
