/**
 * Created by Administrator on 2017/6/2.
 */
const state = {
    selects:'5'
}

const getters = {
    selects: state=>state.selects
}

const mutations = {
    getSelect(state,select){
        state.selects = select
    }
}

export default {
    state,
    getters,
    mutations
}