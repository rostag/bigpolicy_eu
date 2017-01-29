// , DBLeader, DBProject, DBTask
module.exports = function(app, DB){
  // FIXME Rename to donate-api
  var express = require('express');
  var router = express.Router();
  var LiqPay = require('liqpay-sdk');
  // FIXME_SEC
  var public_key = 'i77061351482';
  var private_key = 'v26xvBR6w6h9JVxGKLCSDzHnHg6GpIEoQeECKhuG';
  var liqpay = new LiqPay(public_key, private_key);

  function getParamsFromRequestData(req) {
    var d;
    console.log('------------ body: ', req.body);
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
      'sandbox'       : '1', // FIXME DEV TEST
      'language'      : 'uk',
      'result_url'    : d.result_url
    }
  }

  /**
    * Create a donation to the specified target in DB.
    * All params passed via req.
    */
  router.post('/create-donation', function (req, res) {
    DB.createDonation(req.body);
  });

  // FIXME WIP
  /**
   * Gets all donations for the given target:
   *  /liqpay-api/target/leader/id
   *  /liqpay-api/target/project/id
   *  /liqpay-api/target/task/id
   */
  router.get('/target/:targetType/:targetId', function (req, res) {
    DB.getDonationTarget( req.params.targetId, req.params.targetType )
      .then( (target) => {
        DB.listDonations(target.donations)
          .then( data => {
            console.log('List donations:', target.donations);
            res.json(data)
          })
          .catch( err => res.json(err))
      })
      .catch( err => res.json(err))
  })


  /**
  * TODO server_url	no	String	URL API в Вашем магазине для уведомлений об изменении статуса платежа (сервер->сервер). Максимальная длина 510 символов. Подробнее
  * TODO result_url	no	String	URL в Вашем магазине на который покупатель будет переадресован после завершения покупки. Максимальная длина 510 символов.
  */

  router.post('/getsgndta', function (req, res) {
    var prm = getParamsFromRequestData(req);
    var sgn = liqpay.cnb_signature(prm);
		var dta = new Buffer(JSON.stringify(liqpay.cnb_params(prm))).toString('base64');
    console.log('𝖄 • LiqPay::getsgndta:: ', prm);
    res.send( dta + '-BGPLCXX-' + sgn );
  });

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
