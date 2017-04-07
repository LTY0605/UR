/**
 * Created by tanyichao on 2017/3/16.
 */
const state = {
    count: 1,
    demoScrollTop: 0,
    isLoading: false,
    direction: 'forward'
}
const mutations = {
    updateCountStatus (state, payload) {
        state.count = payload.count
    },
    updateDemoPosition (state, payload) {
        state.demoScrollTop = payload.top
    },
    updateLoadingStatus (state, payload) {
        state.isLoading = payload.isLoading
    },
    updateDirection (state, payload) {
        state.direction = payload.direction
    }
}
const actions = {
    updateCountStatus ({commit}) {
        var num = store.state.vux.count + 1
        commit({type: 'updateCountStatus', count: num})
    },
    updateDemoPosition ({commit}, top) {
        commit({type: 'updateDemoPosition', top: top})
    }
}

export default {
    state,
    actions,
    mutations
}
