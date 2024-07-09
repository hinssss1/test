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
                        case 'is_teacher':
                        case 'is_follow':
                            obj[key] = 1;
                            break;
                        case 'end_vip_time':
                        case 'end_svip_time':
                            obj[key] = '2099-12-31 23:59:59';
                            break;
                        case 'tui_bean':
                            obj[key] = 9999;
                            break;
                        case 'user_level':
                            obj[key] = 9;
                            break;
                    }
                }
            }
        }
    }

    modifyObject(body);
    $response.body = JSON.stringify(body);
}

$done({ body: $response.body });
