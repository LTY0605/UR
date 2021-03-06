/**
 * Created by Administrator on 2017/5/2.
 */

import Vue from 'vue'
import {HTTP_REMOTE} from './index'

//主页
export function indexService() {
    return Vue.resource(HTTP_REMOTE + '/ur_crm/admin/sys/member/homepage/info')
}
//积分使用码
export function paymentCode() {
    return Vue.resource(HTTP_REMOTE + '/ur_crm/admin/sys/member/integral/paymentCode')
}
//可用积分
export function integralCode(){
    return Vue.resource(HTTP_REMOTE + '/ur_crm/admin/sys/member//integral/total')
}
//优惠券明细
export function couponListService(){
    return Vue.resource(HTTP_REMOTE + '/ur_crm/admin/sys/member/coupon/list')
}
//京东存值卡明细
export function jdCardInfoService(){
    return Vue.resource(HTTP_REMOTE + '/ur_crm/admin/sys/member/jdcard/info')
}
//会员绑定的卡列表
export function cardListService(){
    return Vue.resource(HTTP_REMOTE + '/ur_crm/admin/sys/member/card/list')
}
//获取京东转赠功能
export function getAmountService() {
    return Vue.resource(HTTP_REMOTE + '/ur_crm/admin/sys/member/jdcard/getAmount')
}