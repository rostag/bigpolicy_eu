const K = require('./bp-app-config');

module.exports = function (app, router, DB) {
  const LiqPay = require('liqpay-sdk');
  const public_key = K.liq.public_key;
  const private_key = K.liq.private_key;
  const liqpay = new LiqPay(public_key, private_key);

  require('url');

  function getParamsFromRequestData(req) {
    let d;
    for (var item in req.body) {
      d = JSON.parse(item);
    }

    // we use mongo _id here, to use it later as back reference for order_id in liqpay order status callback
    d.externalId = K.liq.donationPrefix + d._id + '__amt_' + d.amount + '__from_' + d.donorId + '__to_' + d.targetId + '__type_' + d.targetType + '__t_' + Date.now();

    return {
      'action': 'pay',
      'amount': d.amount,
      'currency': 'UAH',
      'description': d.description,
      'order_id': d.externalId,
      'version': '3',
      'sandbox': '1',
      'language': 'uk',
      'result_url': d.result_url,
      'server_url': d.server_url + '/donation-api/post-donation-status'
    }
  }

  /**
   * Create a donation to the specified target in DB.
   * All params passed via req.
   */
  router.post('/donation-api/create-donation', function (req, res) {
    const donationId = DB.createDonation(req.body);
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

    const p = req.params;
    DB.getDonationTarget(p.targetType, p.targetId)
      .then((target) => {
        DB.getPageOfDonations(target.donations, p.page, p.limit, decodeURIComponent(p.dbQuery))
          .then(data => res.json(data))
          .catch(err => res.json(err))
      })
      .catch(err => res.json(err))
  });

  router.post('/donation-api/getsgndta', function (req, res) {
    const prm = getParamsFromRequestData(req);

    console.log('  • LiqPay::getsgndta::URL::', prm);

    const sgn = liqpay.cnb_signature(prm);
    const dta = new Buffer(JSON.stringify(liqpay.cnb_params(prm))).toString('base64');
    res.send(dta + K.liq.dataSeparator + sgn);
  });

  /**
   * Callback 3.0 public
   * https://www.liqpay.com/ru/doc/callback
   * Уведомление о смене статуса платежа server->server
   * После смены статуса платежа, если был указан параметр server_url, на API
   * будет отправлен POST запрос с двумя параметрами data и signature, где:
   *  data - результат функции base64_encode( $json_string )
   *  signature - результат функции base64_encode( sha1( $private_key . $data . $private_key, 1 ) )
   **/
  router.post('/donation-api/post-donation-status', function (req, res) {
    const dta = Buffer.from(req.body['data'], 'base64').toString();
    const sgn = Buffer.from(req.body['signature'], 'base64').toString();

    try {
      const jsn = JSON.parse(dta);
      const sts = jsn.status;
      const oid = jsn.order_id;
      const donatonId = oid.substring(K.liq.donationPrefix.length, oid.indexOf('__amt_'));

      // Check Callback signature
      const sign = liqpay.str_to_sign(private_key + dta + private_key);

      if (sign === sgn) {
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

  console.log('  • LiqPay connected.');

  /**
   * TODO implement checking the transaction status.
   * action  yes  String  status
   * order_id  yes  String  Уникальный ID покупки в Вашем магазине. Максимальная длина 255 символов.
   * https://www.liqpay.com/ru/doc/status
   */
  // router.post('/check-donation-status', function (req, res) {
  //   const prm = getParamsFromRequestData(req);
  //
  //   liqpay.api("request", {
  //     "action"   : "status",
  //     "version"  : "3",
  //     "order_id" : prm.order_id
  //   }, function( json ){
  //     // res.send( dta + K.liq.dataSeparator + sgn );
  //   });
  //
  // });
};
