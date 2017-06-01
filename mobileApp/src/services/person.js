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
//添加会员地址接口
export function addAddressService() {
    return Vue.resource(HTTP_REMOTE + '/ur_crm/admin/sys/member/address/add')
}
//会员地址列表接口
export function addressListService() {
    return Vue.resource(HTTP_REMOTE + '/ur_crm/admin/sys/member/address/list')
}
//会员地址列表删除接口
export function removeService() {
    return Vue.resource(HTTP_REMOTE + '/ur_crm/admin/sys/member/address/del')
}
//会员地址详情接口
export function detailService() {
    return Vue.resource(HTTP_REMOTE + '/ur_crm/admin/sys/member/address/find')
}
//会员地址修改接口
export function editAttrService() {
    return Vue.resource(HTTP_REMOTE + '/ur_crm/admin/sys/member/address/edit')
}
//会员修改手机号接口
export function mobileEditService() {
    return Vue.resource(HTTP_REMOTE + '/ur_crm/admin/sys/member/mobile/edit')
}
//会员修改密码接口
export function bindEditService() {
    return Vue.resource(HTTP_REMOTE + '/ur_crm/admin/sys/member/wx/unbind')
}
//会员地址设为默认接口
export function attrDefalutService() {
    return Vue.resource(HTTP_REMOTE + '/ur_crm/admin/sys/member/address/default')
}
//验证码接口
export function codeService() {
    return Vue.resource(HTTP_REMOTE + '/ur_crm/admin/sys/wx/verification_code')
}
//密码修改接口
export function passwordService() {
    return Vue.resource(HTTP_REMOTE + '/ur_crm/admin/sys/member/password/edit')
}

