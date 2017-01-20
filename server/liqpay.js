/*
HTML Example:
 <h5>В нас є можливість розвинути цю ідею. Спробуй пряму демократію, підтримавши нашу громадянську волю.</h5>
<a href="https://www.liqpay.com/api/3/checkout?data=eyJ2ZXJzaW9uIjozLCJhY3Rpb24iOiJwYXlkb25hdGUiLCJwdWJsaWNfa2V5IjoiaTc3MDYxMzUxNDgyIiwiYW1vdW50IjoiMTAiLCJjdXJyZW5jeSI6IlVBSCIsImRlc2NyaXB0aW9uIjoi0K8g0LLRltGA0Y4g0LIg0YLQtdCx0LUhIiwidHlwZSI6ImRvbmF0ZSIsImxhbmd1YWdlIjoiZW4ifQ%3D%3D&signature=%2FA19v2A2ebDHGW71VxD5JDhaG70%3D"><button md-button color="primary" md-raised-button>Підтримай нас фінансово</button></a>
*/

var LiqPay = require('liqpay');
var liqpay = new LiqPay(public_key, private_key);
var html = liqpay.cnb_form({
'action'         : 'pay',
'amount'         : '1',
'currency'       : 'UAH',
'description'    : 'Test transaction description',
'order_id'       : 'test_order_id_1',
'version'        : '3'
})
