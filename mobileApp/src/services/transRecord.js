/**
 * Created by foreveross on 2017/8/1.
 */
import Vue from 'vue'
import {HTTP_REMOTE} from './index'
//京东卡交易记录
export function transRecordService() {
    return Vue.resource(HTTP_REMOTE +'/ur_crm/admin/sys/member/jdcard/consumption/detail')
}

//礼品卡消费明细
export function giftCardService() {
    return Vue.resource(HTTP_REMOTE + '/ur_crm/admin/sys/member/giftcard/consumption/detail')
}

//京东转赠
export function giftAmountService() {
    return Vue.resource(HTTP_REMOTE + '/ur_crm/admin/sys/member/jdcard/giftAmount')
}
