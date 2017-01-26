module.exports = function(app, DB){

  /*
  HTML Example:
  <h5>В нас є можливість розвинути цю ідею. Спробуй пряму демократію, підтримавши нашу громадянську волю.</h5>
  <a href="https://www.liqpay.com/api/3/checkout?data=eyJ2ZXJzaW9uIjozLCJhY3Rpb24iOiJwYXlkb25hdGUiLCJwdWJsaWNfa2V5IjoiaTc3MDYxMzUxNDgyIiwiYW1vdW50IjoiMTAiLCJjdXJyZW5jeSI6IlVBSCIsImRlc2NyaXB0aW9uIjoi0K8g0LLRltGA0Y4g0LIg0YLQtdCx0LUhIiwidHlwZSI6ImRvbmF0ZSIsImxhbmd1YWdlIjoiZW4ifQ%3D%3D&signature=%2FA19v2A2ebDHGW71VxD5JDhaG70%3D"><button md-button color="primary" md-raised-button>Підтримай нас фінансово</button></a>
  */

  var express = require('express');
  var router = express.Router();

  var LiqPay = require('liqpay-sdk');

  // FIXME_SEC
  var public_key = 'i77061351482';
  var private_key = 'v26xvBR6w6h9JVxGKLCSDzHnHg6GpIEoQeECKhuG';

  var liqpay = new LiqPay(public_key, private_key);

  function getParamsFromRequestData(req) {
    var d;
    // FIXME Dirty workaround
    for ( var item in req.body ) {
      d = JSON.parse(item);
    }
    if(!d) d = {};

    var description = 'Test donation: ' + d.amount + ' from ' + d.donorId + ' to ' + d.targetId + ', type ' + d.targetType;

    return {
      'action'        : 'pay',
      'amount'        : d.amount,
      'currency'      : 'UAH',
      'description'   : description,
      'order_id'      : 'bp_donation_',
      'version'       : '3',
      'sandbox'       : '1',
      'language'      : 'ru'
    }
  }

  router.post('/getsgndta', function (req, res) {
    var prm = getParamsFromRequestData(req);
    var sgn = liqpay.cnb_signature(prm);
		var dta = new Buffer(JSON.stringify(liqpay.cnb_params(prm))).toString('base64');
    console.log('𝖄 • LiqPay::getsgndta', dta + '-BGPLCXX-' + sgn);
    res.send( dta + '-BGPLCXX-' + sgn );
  });

  router.post('/getform', function (req, res) {

    var params = getParamsFromRequestData(req);

    console.log('𝖄 • LiqPay::getform, params:', params);

    var form_html = liqpay.cnb_form(params);
    var enc_html = encodeURIComponent(form_html);

    console.log('𝖄 • LiqPay form html = ', form_html, '\n\n', enc_html);

    res.send( enc_html );
  });

  // Send a donation to the specified recipient.
  // All params passed via req.
  router.post('/donate', function (req, res) {

    console.log('𝖄 • LiqPay::donate', liqpay);

    // Write transaction to DB
    DB.createDonation(req.body);
  });

  app.use('/liqpay-api', router);

  console.log('𝖄 • LiqPay connected.');

}
