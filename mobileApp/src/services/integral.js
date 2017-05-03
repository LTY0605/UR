/**
 * Created by xyc on 2017/4/21.
 */

import Vue from 'vue'
import {HTTP_REMOTE} from './index'

//积分列表接口
export function integralService() {
    return Vue.resource(HTTP_REMOTE + '/ur_crm/admin/sys/member/integral/detail')
}
