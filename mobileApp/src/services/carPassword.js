/**
 * Created by foreveross on 2017/7/31.
 */
import Vue from 'vue'
import {HTTP_REMOTE} from './index'
export function carPasswordServices() {
    return Vue.resource(HTTP_REMOTE + '/ur_crm/admin/sys/member/jdcard/password/edit')

}