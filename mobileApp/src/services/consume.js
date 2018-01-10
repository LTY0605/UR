/**
 * Created by foreveross on 2018/1/8.
 */
import Vue from 'vue'
import {HTTP_REMOTE} from './index'
export function consumeService() {
    return Vue.resource(HTTP_REMOTE + '/ur_crm/admin/sys/member/consumption/detail')
}