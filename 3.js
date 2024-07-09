/**

[rewrite_local]
^https?:\/\/app\.zhongyi108\.com\/api\/user\/getUserInfoNew url script-response-body https://raw.githubusercontent.com/hinssss1/test/master/3.js

[mitm]
hostname = app.zhongyi108.com

*/

var chxm1023 = JSON.parse($response.body);

chxm1023.data = {
  "end_vip_time": "2099-12-31 23:59:59",
  "is_svip": 1,
  "tui_bean": 99999,
  "user_level": 9,
  "save_money": 88888,
  "end_svip_time": "2099-12-31 23:59:59",
  "is_vip": 1,
  "is_teacher": 1
};

$done({body : JSON.stringify(chxm1023)});