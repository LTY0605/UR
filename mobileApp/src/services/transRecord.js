/**
 * Created by foreveross on 2017/8/1.
 */
import Vue from 'vue'
import {HTTP_REMOTE} from './index'
export function transRecordService() {
    return Vue.resource(HTTP_REMOTE +'/ur_crm/admin/sys/member/jdcard/consumption/detail')
}