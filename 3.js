/**

[rewrite_local]
^https?:\/\/(userapi|yun)\.feidee\.net\/(v1\/(profile\/basic_info|profile)|cab-periodic-activity-ws\/terminal\/v2\/monthly-card\/status|cab-vip-ws\/terminal\/v1\/vip-users=show-info) url script-response-body https://raw.githubusercontent.com/hinssss1/test/master/3.js

[mitm]
hostname = userapi.feidee.net, yun.feidee.net

*/

let obj = JSON.parse($response.body);

const vip1 = /cab-periodic-activity-ws\/terminal\/v2\/monthly-card\/status/;
const vip2 = /cab-vip-ws\/terminal\/v1\/vip-users=show-info/;
const vip3 = /v1\/profile\/basic_info/;
const vip4 = /v1\/profile/;

if (vip1.test($request.url)) {
  obj.user.status = "1";
} else if (vip2.test($request.url)) {
  obj.vip_status = "1";
} else if (vip3.test($request.url)) {
  obj.is_vip = true;
} else if (vip4.test($request.url)) {
    obj.is_vip = true;
}

$done({
  body: JSON.stringify(obj)
});
