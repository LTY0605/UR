/**
 * Created by xyc on 2017/4/21.
 */

import Vue from 'vue'
import {HTTP_REMOTE} from './index'

//注册接口
export function registerService() {
    return Vue.resource(HTTP_REMOTE + '/ur_crm/admin/sys/member/register')
}
//获取会员信息接口
export function memberInfoService() {
    return Vue.resource(HTTP_REMOTE + '/ur_crm/admin/sys/member/info')
}
//修改会员信息接口
export function infoEditService() {
    return Vue.resource(HTTP_REMOTE + '/ur_crm/admin/sys/member/edit')
}


