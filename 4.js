/*
[rewrite_local]
https://api.hcreator.cn/wapsPay/goods/language/get.do url script-response-body https://raw.githubusercontent.com/hinssss1/test/master/4.js
[mitm]
hostname = api.hcreator.cn
*/

let obj = JSON.parse($response.body);

const getLanguage = /\/wapsPay\/goods\/language\/get\.do/;

if (getLanguage.test($request.url)) {
    if (obj.data) {
        // 修改商品价格为 0.01
        obj.data.goodsPrice = 0.01;
		obj.data.goodsPoint = 1
        
        // 修改折扣为最大折扣（1 表示无折扣，所以我们设置一个很小的值）
        obj.data.discount = 0.01;
        obj.data.vipDiscount = 0.01;
        
        // 添加 VIP 状态（假设这些字段存在或需要被添加）
        obj.data.isVIP = true;
        obj.data.vipStatus = "active";
        obj.data.vipExpireDate = "2099-12-31";
        
        // 修改商品描述
        obj.data.goodsDes = "终身VIP会员";
    }
}

$done({ body: JSON.stringify(obj) });
