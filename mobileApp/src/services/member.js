/**
 * Created by liang on 2017/4/24.
 */

import Vue from 'vue'
import {HTTP_REMOTE} from './index'

// 注册接口
export function registerService() {
    return Vue.resource(HTTP_REMOTE + '/ur_crm/admin/sys/member/register')
}

