/*
[rewrite_local]
^https:\/\/(mob|sfo)\.mddcloud\.com\.cn\/.* url script-response-body https://raw.githubusercontent.com/hinssss1/test/master/4.js
[mitm]
hostname = mob.mddcloud.com.cn, sfo.mddcloud.com.cn
*/

let obj = JSON.parse($response.body);

// 通用的修改规则，确保启用VIP状态
const modifyResponse = () => {
    obj.data = obj.data || {};
    obj.data.result = true;
    obj.status = true;
    obj.msg = "操作成功";
};

// 针对不同接口的特定修改
if (/\/api\/member\/getInfo\.action/.test($request.url)) {
    if (obj.data) {
        // 修改VIP等级
        obj.data.vipLevel = 9;
        obj.data.isVodVip = 1;
        obj.data.isPay = 1;
        obj.data.isOncePaid = 1;

        // 修改会员信息
        obj.data.lvInfo = {
            name: "至尊VIP会员",
            icon: "http://example.com/vip_icon.png",
            privilege: "享受所有特权",
            rule: "永久有效",
            uuid: "vip_uuid_9999",
            activity: "所有活动免费参与",
            experience: 99999,
            createTime: "2021-01-01 00:00:00",
            seq: 9999
        };

        // 设置VIP有效期
        obj.data.vipEffectiveDate = "2099-12-31 23:59:59";
        obj.data.vipEffectiveDifferenceDay = 99999;

        // 修改用户经验值和积分
        obj.data.experience = 99999;
        obj.data.score = 99999;

        // 修改平台等级信息
        obj.data.platformLevelVo = {
            height: 99,
            dayGainTotalExp: 9999,
            memberExp: 99999,
            title: "至尊会员",
            uuid: 9999,
            width: 999,
            level: 99,
            exp: 99999,
            isPossess: 1,
            levelImg: "http://example.com/vip_level_icon.png",
            dayGainExp: 999
        };

        // 移除下一级信息，因为已经是最高级
        delete obj.data.nextLvInfo;

        // 修改其他可能的VIP相关字段
        obj.data.allowModifyPost = 1;
        obj.data.whiteListEnable = true;
    }
} else {
    modifyResponse();
}

$done({ body: JSON.stringify(obj) });
