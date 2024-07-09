/**

[rewrite_local]
^https?:\/\/yun\.feidee\.net\/(cab-periodic-activity-ws\/terminal\/v2\/monthly-card\/status|cab-vip-ws\/terminal\/v1\/vip-users=show-info) url script-response-body https://raw.githubusercontent.com/hinssss1/test/master/3.js

[mitm]
hostname = yun.feidee.net

*/

let obj = JSON.parse($response.body);

const vip1 = /cab-periodic-activity-ws\/terminal\/v2\/monthly-card\/status/;
const vip2 = /cab-vip-ws\/terminal\/v1\/vip-users=show-info/;


if(vip1.test($request.url)){
  obj.user.ststus = "1"
}

if(vip2.test($request.url)){
  obj.vip_ststus = "1"
}

$done({
body: JSON.stringify(obj)
});