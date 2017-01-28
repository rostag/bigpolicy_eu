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
    // FIXME SANDBOX
    return {
      'action'        : 'pay',
      'amount'        : d.amount,
      'currency'      : 'UAH',
      'description'   : d.description,
      'order_id'      : d.externalId,
      'version'       : '3',
      'sandbox'       : '1',
      'language'      : 'uk'
    }
  }

  /**
    * Create a donation to the specified target in DB.
    * All params passed via req.
    */
  router.post('/create-donation', function (req, res) {
    DB.createDonation(req.body);
  });

  router.post('/getsgndta', function (req, res) {
    var prm = getParamsFromRequestData(req);
    var sgn = liqpay.cnb_signature(prm);
		var dta = new Buffer(JSON.stringify(liqpay.cnb_params(prm))).toString('base64');
    // console.log('𝖄 • LiqPay::getsgndta', dta + '-BGPLCXX-' + sgn);
    res.send( dta + '-BGPLCXX-' + sgn );
  });

  /**
   * TODO server_url	no	String	URL API в Вашем магазине для уведомлений об изменении статуса платежа (сервер->сервер). Максимальная длина 510 символов. Подробнее
   * TODO result_url	no	String	URL в Вашем магазине на который покупатель будет переадресован после завершения покупки. Максимальная длина 510 символов.
   */

  /**
   * FIXME implement checking the transaction status.
   * action	yes	String	status
   * order_id	yes	String	Уникальный ID покупки в Вашем магазине.Максимальная длина 255 символов.
   * https://www.liqpay.com/ru/doc/status
   */
  router.post('/check-donation-status', function (req, res) {
    var prm = getParamsFromRequestData(req);
    // console.log('𝖄 • LiqPay::check-status', prn.order_id);

    liqpay.api("request", {
      "action"   : "status",
      "version"  : "3",
      "order_id" : prm.order_id
    }, function( json ){
      console.log( json.status );
      // res.send( dta + '-BGPLCXX-' + sgn );
    });

  });

  // FIXME UNUSED
  router.post('/getliqform', function (req, res) {
    res.send(encodeURIComponent(liqpay.cnb_form(getParamsFromRequestData(req))));
  });

  app.use('/liqpay-api', router);

  console.log('𝖄 • LiqPay connected.');
}
