/*
[rewrite_local]
https://mob.mddcloud.com.cn/payBizApi/memberVodVipWhitelist/check.action url script-response-body https://raw.githubusercontent.com/hinssss1/test/master/4.js
[mitm]
hostname = mob.mddcloud.com.cn
*/

let obj = JSON.parse($response.body);

const vipCheckUrl = /\/payBizApi\/memberVodVipWhitelist\/check\.action/;

if (vipCheckUrl.test($request.url)) {
    // 修改状态为VIP，表示VIP状态已激活
    obj.status = true;
    obj.msg = "VIP状态已激活";

    // 确保可以观看VIP视频
    if (obj.data) {
        obj.data.result = true;
    }

    // 可以添加其他需要修改的字段，例如：
    // obj.data.newField = "new value";

    // 修改VIP有效期和其他相关信息
    obj.vipEffectiveDate = "2099-12-31 23:59:59";
    obj.vipLevel = "至尊VIP";
}

$done({ body: JSON.stringify(obj) });
