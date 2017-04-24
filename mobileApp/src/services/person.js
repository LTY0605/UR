/**
 * Created by xyc on 2017/4/21.
 */

import Vue from 'vue'
import {HTTP_REMOTE} from './index'

//注册接口
export function registerService() {
    return Vue.resource(HTTP_REMOTE + '/ur_crm/admin/sys/member/register')
}
//会员信息接口
export function memberInfoService() {
    return Vue.resource(HTTP_REMOTE + '/ur_crm/admin/sys/member/info')
}


