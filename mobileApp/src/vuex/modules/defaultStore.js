/**
 * Created by tanyichao on 2017/3/17.
 */
const state = {
    isTitle:false
}
const mutations = {
    updateIsTitle (state, payload) {
        state.isTitle = payload.isTitle
    }
}
const actions = {
    updateIsTitle ({commit},isTitle) {
        commit({type: 'updateIsTitle', isTitle: isTitle})
    }
}

export default {
    state,
    actions,
    mutations
}