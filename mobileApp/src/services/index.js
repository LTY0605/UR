/**
 * Created by Jackie on 2017/2/21.
 */

import Vue from 'vue'
export const HTTP_REMOTE = 'http://nianhui.ur.com.cn'
const SERVER = 'http://mdzncf.testfoss.com/';
export function MockService() {
    return Vue.resource('/static/json/mock.json')
}
export function TestLoginService() {
    return Vue.resource(`${SERVER}/api/weixin/login/testapi`)
}

