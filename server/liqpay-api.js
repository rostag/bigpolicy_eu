module.exports = function(app, DB){

  /*
  HTML Example:
  <h5>В нас є можливість розвинути цю ідею. Спробуй пряму демократію, підтримавши нашу громадянську волю.</h5>
  <a href="https://www.liqpay.com/api/3/checkout?data=eyJ2ZXJzaW9uIjozLCJhY3Rpb24iOiJwYXlkb25hdGUiLCJwdWJsaWNfa2V5IjoiaTc3MDYxMzUxNDgyIiwiYW1vdW50IjoiMTAiLCJjdXJyZW5jeSI6IlVBSCIsImRlc2NyaXB0aW9uIjoi0K8g0LLRltGA0Y4g0LIg0YLQtdCx0LUhIiwidHlwZSI6ImRvbmF0ZSIsImxhbmd1YWdlIjoiZW4ifQ%3D%3D&signature=%2FA19v2A2ebDHGW71VxD5JDhaG70%3D"><button md-button color="primary" md-raised-button>Підтримай нас фінансово</button></a>
  */

  var express = require('express');
  var router = express.Router();

  // var LiqPay = require('liqpay');

  // FIXME_SEC
  var public_key = '77061351482';
  var private_key = 'v26xvBR6w6h9JVxGKLCSDzHnHg6GpIEoQeECKhuG';
  // var liqpay = new LiqPay(public_key, private_key);

  // Send a donation to the specified recipient.
  // All params passed via req.
  router.post('/donate', function (req, res) {

    // TODO
    // DB.createLeader(req.body)

    console.log('𝖄 • LiqPay::donate:', req, res);

    // var html = liqpay.cnb_form({
    //   'action'        : 'pay',
    //   'amount'        : '1',
    //   'currency'      : 'UAH',
    //   'description'   : 'Test transaction description',
    //   'order_id'      : 'test_order_id_1',
    //   'version'       : '3',
    //   'sandbox'       : '1'
    // });

    // console.log('𝖄 • LiqPay::html:', html);

  });

  app.use('/liqpay-api', router);

  console.log('𝖄 • LiqPay connected.');

}
