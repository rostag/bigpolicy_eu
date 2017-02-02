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

  const url = require('url');

  function getParamsFromRequestData(req) {
    var d;
    // console.log('------------ body: ', req.body);
    for ( var item in req.body ) {
      d = JSON.parse(item);
    }

    // we use mongo ID here, to use it later as back reference for order_id in liqpay order status callback
    d.externalId = 'bpdon___id_' + d._id + '__amt_' + d.amount + '__from_' + d.donorId + '__to_' + d.targetId + '__type_' + d.targetType + '__t_' + Date.now();
    // console.log('getParamsFromRequestData. externalId = ', d.externalId);

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
      'result_url'    : d.result_url,
      'server_url'    : d.server_url + '/liqpay-api/post-donation-status'
    }
  }

  /**
    * Create a donation to the specified target in DB.
    * All params passed via req.
    */
  router.post('/create-donation', function (req, res) {
    var donationId = DB.createDonation(req.body);
    res.send(donationId);
  });

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
            // console.log('List donations:', target.donations);
            res.json(data)
          })
          .catch( err => res.json(err))
      })
      .catch( err => res.json(err))
  })


  router.post('/getsgndta', function (req, res) {
    var prm = getParamsFromRequestData(req);

    console.log('𝖄 • LiqPay::getsgndta::URL::', prm);

    var sgn = liqpay.cnb_signature(prm);
    // FIXME use Buffer.from instead
		var dta = new Buffer(JSON.stringify(liqpay.cnb_params(prm))).toString('base64');
    res.send( dta + '-BGPLCXX-' + sgn );
  });

  /**
   * Callback 3.0 public
   * https://www.liqpay.com/ru/doc/callback
   * Уведомление о смене статуса платежа server->server
   * После смены статуса платежа, если был указан параметр server_url, на API
   * будет отправлен POST запрос с двумя параметрами data и signature, где:
   *  data - результат функции base64_encode( $json_string )
   *  signature - результат функции base64_encode( sha1( $private_key . $data . $private_key, 1 ) )
   *
   **/

   /*
    Buffer.from('{"status": "success", "err_code": "0", "err_description": "errdesc", "version": "3", "order_id":"bpdon___id_58925e146b54fe5e678050df__amt_70__from_rostislav.siryk@gmail.com__to_58453220a9dd58cbb28f900d__type_leader__t_1485987348590"}').toString('base64')
   */
   router.post('/post-donation-status', function (req, res) {
    var dta = Buffer.from(req.body['data'], 'base64').toString();
    var sgn = Buffer.from(req.body['signature'], 'base64').toString();

    try {
      var jsn = JSON.parse(dta);
      var sts = jsn.status;
      var oid = jsn.order_id;
      var donatonId = oid.substring('bpdon___id_'.length, oid.indexOf('__amt_'));

      console.log('--> donatonId:', donatonId, sts);

      // Проверка Callback сигнатуры
      var sign = liqpay.str_to_sign(private_key + dta + private_key);

      // FIXME_SEC Check sign
      if ( true /* sign === sgn */ ) {
        // write proper value to DB
        DB.updateDonation(donatonId, {
          "status": sts
        });
      } else {
        console.error('signature is incorrect:', sgn);
      }

    } catch (e) {
      console.log('Errro:', e);
    }

    res.send('ok');
   });

  /**
   * TODO implement checking the transaction status.
   * action	yes	String	status
   * order_id	yes	String	Уникальный ID покупки в Вашем магазине.Максимальная длина 255 символов.
   * https://www.liqpay.com/ru/doc/status
   */
  // router.post('/check-donation-status', function (req, res) {
  //   var prm = getParamsFromRequestData(req);
  //   // console.log('𝖄 • LiqPay::check-status', prn.order_id);
  //
  //   liqpay.api("request", {
  //     "action"   : "status",
  //     "version"  : "3",
  //     "order_id" : prm.order_id
  //   }, function( json ){
  //     // console.log( json.status );
  //     // res.send( dta + '-BGPLCXX-' + sgn );
  //   });
  //
  // });

  // // FIXME UNUSED
  // router.post('/getliqform', function (req, res) {
  //   res.send(encodeURIComponent(liqpay.cnb_form(getParamsFromRequestData(req))));
  // });

  app.use('/liqpay-api', router);

  console.log('𝖄 • LiqPay connected.');
}
