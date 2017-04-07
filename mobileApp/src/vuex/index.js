/**
 * Created by tanyichao on 2017/3/15.
 */
import Vue from 'vue'
import Vuex from 'vuex'
// import * as actions from './actions'
// import * as getters from './getters'

import vuxStatus from './modules/vuxStore'

import defaultStore from './modules/defaultStore'

// import createLogger from '../../../src/plugins/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({})

store.registerModule('vux', vuxStatus)

store.registerModule('default',defaultStore)

export default store;