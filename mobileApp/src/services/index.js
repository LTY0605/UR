/**
 * Created by Jackie on 2017/2/21.
 */

import Vue from 'vue'
export const HTTP_REMOTE = 'http://nianhui.ur.com.cn'


//获取openid
export function openService() {
    return Vue.resource('https://open.weixin.qq.com/connect/oauth2/authorize')
}

