module.exports = function(app, DB){

  // Mailgun-js wrapper
  var Mailgun = require('mailgun-js');
  var express = require('express');
  var router = express.Router();

  var mailgun_api_key = 'key-fbb7eae260ccda81270645824316856a';
  var mailgun_domain = 'bigpolicy.eu';
  // fallback values
  var from_who = 'test@bigpolicy.eu';
  var to_who = 'rostyslav.siryk@gmail.com';

  // Send a message to the specified email address. All params passed via req
  router.post('/share', function (req, res) {

    var data = req.body;
    console.log('share project: ', data )

    // var c1, c2, c3, c4;
    // var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}

    for ( var item in req.body ) {
      data = JSON.parse(decodeURIComponent(item));
      // console.log('item: ', item )
    }

    data.to = to_who;

    //We pass the mailgun_api_key and mailgunDomain to the wrapper, or it won't be able to identify + send emails
    var mailgun = new Mailgun({apiKey: mailgun_api_key, domain: mailgun_domain});

    var data = {
      //Specify email data
      from: data.email.from,
      //The email to contact
      // FIXME un-hardcode
      to: Object.keys(data.email.toEmails)[0],
      //Subject and text data
      subject: data.email.subject,
      html: data.email.html
    }

    console.log('Sharing data:', data);

    // Send emails given the above data
    mailgun.messages().send(data, function (err, body) {
      if (err) {
        console.log("Got an error while sending mail: ", err);
      }
      else {
        console.log('𝖄 • Email sent to', data.to);
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
