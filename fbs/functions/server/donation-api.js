module.exports = function(app, router, DB){
  var LiqPay = require('liqpay-sdk');
  // FIXME_SEC
  var public_key = 'i77061351482';
  var private_key = 'v26xvBR6w6h9JVxGKLCSDzHnHg6GpIEoQeECKhuG';
  var liqpay = new LiqPay(public_key, private_key);

  const url = require('url');

  function getParamsFromRequestData(req) {
    var d;
    for ( var item in req.body ) {
      d = JSON.parse(item);
    }

    // we use mongo _id here, to use it later as back reference for order_id in liqpay order status callback
    d.externalId = 'bpdon___id_' + d._id + '__amt_' + d.amount + '__from_' + d.donorId + '__to_' + d.targetId + '__type_' + d.targetType + '__t_' + Date.now();

    return {
      'action'        : 'pay',
      'amount'        : d.amount,
      'currency'      : 'UAH',
      'description'   : d.description,
      'order_id'      : d.externalId,
      'version'       : '3',
      'sandbox'       : '1', // FIXME SANDBOX - DEV TEST
      'language'      : 'uk',
      'result_url'    : d.result_url,
      'server_url'    : d.server_url + '/donation-api/post-donation-status'
    }
  }

  /**
    * Create a donation to the specified target in DB.
    * All params passed via req.
    */
  router.post('/donation-api/create-donation', function (req, res) {
    var donationId = DB.createDonation(req.body);
    res.send(donationId);
  });

  /**
   * Gets donations page for the given target:
   *    donation-api/target/leader/id/1/10/q/{}
   *    donation-api/target/project/id/1/10/q/{}
   *    donation-api/target/task/id/1/10/q/{}
   * @param dbQuery is mongo query like (in HTML code): dbQuery='{ "$where": "this.taskIds.length > 0" }'
   **/
  router.get('/donation-api/target/:targetType/:targetId/page/:page/:limit/q/:dbQuery', function (req, res) {

    var p = req.params;
    DB.getDonationTarget( p.targetType, p.targetId )
      .then( (target) => {
        DB.getPageOfDonations(target.donations, p.page, p.limit, decodeURIComponent(p.dbQuery))
          .then( data => res.json(data))
          .catch( err => res.json(err))
      })
      .catch( err => res.json(err))
  })

  router.post('/donation-api/getsgndta', function (req, res) {
    var prm = getParamsFromRequestData(req);

    console.log('  • LiqPay::getsgndta::URL::', prm);

    var sgn = liqpay.cnb_signature(prm);
    // TODO use Buffer.from instead
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
   router.post('/donation-api/post-donation-status', function (req, res) {
    var dta = Buffer.from(req.body['data'], 'base64').toString();
    var sgn = Buffer.from(req.body['signature'], 'base64').toString();

    try {
      var jsn = JSON.parse(dta);
      var sts = jsn.status;
      var oid = jsn.order_id;
      var donatonId = oid.substring('bpdon___id_'.length, oid.indexOf('__amt_'));

      // Check Callback signature
      var sign = liqpay.str_to_sign(private_key + dta + private_key);

      // FIXME_SEC Check sign
      if ( sign === sgn ) {
        // write proper value to DB
        DB.updateDonationStatus(donatonId, {
          "status": sts
        });
      } else {
        console.error('signature is incorrect:', sgn);
      }

    } catch (e) {
      console.log('Error:', e);
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
  //
  //   liqpay.api("request", {
  //     "action"   : "status",
  //     "version"  : "3",
  //     "order_id" : prm.order_id
  //   }, function( json ){
  //     // res.send( dta + '-BGPLCXX-' + sgn );
  //   });
  //
  // });

  console.log('  • LiqPay connected.');
}
