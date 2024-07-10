/*
[rewrite_local]
https://app.zhongyi108.com/api/(user/getUcenterData|course/getDetail|user/getUserInfoNew) url script-response-body https://raw.githubusercontent.com/hinssss1/test/master/3.js
[mitm]
hostname = app.zhongyi108.com
*/

let obj = JSON.parse($response.body);

const userGetUcenterData = /\/api\/user\/getUcenterData/;
const courseGetDetail = /\/api\/course\/getDetail/;
const userGetUserInfoNew = /\/api\/user\/getUserInfoNew/;
const mtim = /\/api\/mtim\/index/;
const local = /\/api\/local\/index/;

if (userGetUcenterData.test($request.url)) {
    obj.data.is_svip = 1;
    obj.data.is_teacher = 1;
    obj.data.is_vip = 1;
} else if (courseGetDetail.test($request.url)) {
    // 处理课程详情
    obj.data.teacher.is_vip = 1;
    obj.data.teacher.user_level = 9;
    obj.data.teacher.is_follow = 1;
	obj.data.isboutique = 1
	obj.data.virtual_buyers = 1
	obj.data.is_list = 1
	obj.data.is_buy = 1
	obj.data.lock = 0
} else if (userGetUserInfoNew.test($request.url)) {
    obj.data.is_vip = 1;
    obj.data.is_svip = 1;
    obj.data.tui_bean = 9999;
    obj.data.end_vip_time = '2099-12-31 23:59:59';
    obj.data.end_svip_time = '2099-12-31 23:59:59';
} else if (mtim.test($request.url)) {
    // 处理MTIM相关数据
    if (obj.data) {
        obj.data.is_vip = 1;
        obj.data.vip_level = 9;
        obj.data.vip_expire_time = '2099-12-31 23:59:59';
    }
} else if (local.test($request.url)) {
    // 处理local相关数据
    if (obj.data) {
        obj.data.is_vip = 1;
        obj.data.vip_status = 1;
        obj.data.vip_expire_time = '2099-12-31 23:59:59';
    }
}

$done({ body: JSON.stringify(obj) });
