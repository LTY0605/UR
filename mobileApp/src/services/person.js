/**
 * Created by xyc on 2017/4/21.
 */

import Vue from 'vue'
import {HTTP_REMOTE} from './index'

export function registerService() {
    return Vue.resource(HTTP_REMOTE + '/ur_crm/admin/sys/member/register')
}


