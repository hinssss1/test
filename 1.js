[rewrite_local]
^https:\/\/miniapp\.guniuniu\.com\/api\/mini-app\/user$ url script-response-body local-modifyResponse.js

[mitm]
hostname = miniapp.guniuniu.com


let obj = JSON.parse($response.body);
obj.data.nickName = "Baby";
obj.data.vipTime = "2099-09-09 02:20:13";
//obj.data.svipTime = "2099-09-09 02:20:13";
$done({

body: JSON.stringify(obj)
});