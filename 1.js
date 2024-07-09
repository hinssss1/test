[rewrite_local]
^https:\/\/miniapp\.guniuniu\.com\/api\/mini-app\/user$ url script-response-body https://raw.githubusercontent.com/hinssss1/test/master/1.js

[mitm]
hostname = miniapp.guniuniu.com


let obj = JSON.parse($response.body);
obj.data.nickName = "zkj测试";
obj.data.vipTime = "2099-09-09 02:20:13";
//obj.data.svipTime = "2099-09-09 02:20:13";
$done({

body: JSON.stringify(obj)
});