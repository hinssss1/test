/**

[rewrite_local]
^https:\/\/apivip\.zuoyebang\.com\/viponline\/college url script-response-body https://raw.githubusercontent.com/hinssss1/test/master/2.js



[mitm]
hostname = apivip.zuoyebang.com

*/

let obj = JSON.parse($response.body);

const vip = /viponline\/college/;

if(vip.test($request.url)){
  obj.data.vipInfo = {
    "status" : 1,
    "startTime" : "2022-01-01 00:00:00",
    "stopTime" : "2099-12-31 23:59:59"
  };
}

$done({
body: JSON.stringify(obj)
});