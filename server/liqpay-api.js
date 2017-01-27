module.exports = function(app, DB){

  var express = require('express');
  var router = express.Router();

  var LiqPay = require('liqpay-sdk');

  // FIXME_SEC
  var public_key = 'i77061351482';
  var private_key = 'v26xvBR6w6h9JVxGKLCSDzHnHg6GpIEoQeECKhuG';

  var liqpay = new LiqPay(public_key, private_key);

  function getParamsFromRequestData(req) {
    var d;
    for ( var item in req.body ) {
      d = JSON.parse(item);
    }

    return {
      'action'        : 'pay',
      'amount'        : d.amount,
      'currency'      : 'UAH',
      'description'   : d.description,
      'order_id'      : d.externalId,
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
