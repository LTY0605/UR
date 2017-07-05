/**
 * Created by Administrator on 2017/5/31.
 */
import Vue from 'vue'
import {HTTP_REMOTE} from './index'

//调研信息
export function surveyServices() {
    return Vue.resource(HTTP_REMOTE + '/ur_crm/admin/sys/member/survey/info')
}

//提交问卷
export  function surveyCommit() {
    return Vue.resource(HTTP_REMOTE + '/ur_crm/admin/sys/member/survey/save')
}