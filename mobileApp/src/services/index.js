/**
 * Created by Jackie on 2017/2/21.
 */

import Vue from 'vue'
// export const HTTP_REMOTE = 'http://nianhui.ur.com.cn'
export const HTTP_REMOTE = window.location.origin;

//获取openid
export function openService() {
    return Vue.resource('https://open.weixin.qq.com/connect/oauth2/authorize')
}
//条形码地址
export const URL_getBarcode= `${HTTP_REMOTE}/ur_crm/admin/sys/barcode/getBarcode`
//二维码地址
export const URL_getQRCode= `${HTTP_REMOTE}/ur_crm/admin/sys/qrcode/getQRCode`

//获取会员信息
export function infoService() {
    return Vue.resource(HTTP_REMOTE + '/ur_crm/admin/sys/member/info')
}

