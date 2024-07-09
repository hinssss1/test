/*
[rewrite_local]
https://app.zhongyi108.com/api/(user/getUcenterData|course/getDetail|user/getUserInfoNew) url script-response-body https://raw.githubusercontent.com/hinssss1/test/master/3.js

[mitm]
hostname = app.zhongyi108.com
*/
if (typeof $response !== 'undefined' && $response.body) {
    let body = JSON.parse($response.body);

    function modifyObject(obj) {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (typeof obj[key] === 'object' && obj[key] !== null) {
                    modifyObject(obj[key]);
                } else {
                    switch (key) {
                        case 'is_vip':
                        case 'is_svip':
                        case 'is_buy':
                        case 'is_free':
                        case 'vip':
                        case 'is_boutique':
                        case 'is_try':
                        case 'is_cash_coupon':
                        case 'is_collect':
                        case 'is_can_sale':
                            obj[key] = 1;
                            break;
                        case 'vip_expire_time':
                        case 'expire_time':
                            obj[key] = '2099-09-09 09:09:09';
                            break;
                        case 'vip_grade':
                            obj[key] = 'vip';
                            break;
                        case 'user_level':
                        case 'level':
                            obj[key] = 9;
                            break;
                        case 'courseType':
                            obj[key] = 'free';
                            break;
                        case 'vip_price':
                        case 'price':
                        case 'seckill_price':
                        case 'line_price':
                            obj[key] = '0.00';
                            break;
                    }
                }
            }
        }
    }

    if (body.data) {
        modifyObject(body.data);

        // 特殊处理 play_log
        if (!body.data.play_log) {
            body.data.play_log = {
                is_finished: 1,
                progress: 100
            };
        }

        // 特殊处理 course_list
        if (body.data.course_list && Array.isArray(body.data.course_list)) {
            body.data.course_list.forEach(course => {
                course.is_try = 1;
            });
        }
    }

    $response.body = JSON.stringify(body);
}

$done({body: $response.body});
