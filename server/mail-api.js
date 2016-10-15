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

  // Send a message to the specified email address when you navigate to /submit/someaddr@email.com
  router.get('/submit/:mail', function (req, res) {

    console.log('/submit/:mail', api_key, domain, req.params.mail);

      //We pass the api_key and domain to the wrapper, or it won't be able to identify + send emails
      var mailgun = new Mailgun({apiKey: api_key, domain: domain});

      var data = {
        //Specify email data
        from: from_who,
        //The email to contact
        to: req.params.mail,
        //Subject and text data
        subject: 'Hello from Bigpolicy',
        html: 'Hello, This is not a plain-text email, I wanted to test some spicy Mailgun sauce in NodeJS! <a href="http://0.0.0.0:3030/validate?' + req.params.mail + '">Click here to add your email address to a mailing list</a>'
      }

      console.log('data:', data);
      console.log('mailgun:', mailgun);

      //Invokes the method to send emails given the above data with the helper library
      mailgun.messages().send(data, function (err, body) {
          //If there is an error, render the error page
          if (err) {
              // res.render('error', { error : err});
              console.log("Got an error while sending mail: ", err);
          }
          else {
              //res.render('submitted', { email : req.params.mail });
              console.log("Email sent", body);
          }
      })
      .then(function (data) {
        res.json(data);
      })
      .catch(function(err){
  	    res.json(err);
    	});

      console.log('/submit/:mail END');

  })

  .post('/validate/:mail', function(req,res) {
      var mailgun = new Mailgun({apiKey: api_key, domain: domain});

      var members = [
        {
          address: req.params.mail
        }
      ];
      //For the sake of this tutorial you need to create a mailing list on Mailgun.com/cp/lists and put its address below
      mailgun.lists('NAME@MAILINGLIST.COM').members().add({ members: members, subscribed: true }, function (err, body) {
        console.log(body);
        if (err) {
              res.send("Error - check console");
        }
        else {
          res.send("Added to mailing list");
        }
      });

  })

  .post('/invoice/:mail', function(req,res){
      //Which file to send? I made an empty invoice.txt file in the root directory
      //We required the path module here..to find the full path to attach the file!
      var path = require("path");
      var fp = path.join(__dirname, 'invoice.txt');
      //Settings
      var mailgun = new Mailgun({apiKey: api_key, domain: domain});

      var data = {
        from: from_who,
        to: req.params.mail,
        subject: 'An invoice from your friendly hackers',
        text: 'A fake invoice should be attached, it is just an empty text file after all',
        attachment: fp
      };


      //Sending the email with attachment
      mailgun.messages().send(data, function (error, body) {
          if (error) {
              res.render('error', {error: error});
          }
              else {
              res.send("Attachment is on its way");
              console.log("attachment sent", fp);
              }
          });
  })

  app.use('/mail-api', router);

  console.log('𝖄 • Mailgun loaded.');

}
