// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VueValidator from 'vue-validator'
import VueWechatTitle from 'vue-wechat-title'


import App from './App'
import Filters from './filters'
import routes from './router-map'
import store from './vuex/index'

Vue.use(Vuex)
Vue.use(VueValidator)
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(VueWechatTitle)


Vue.use(Filters)
Vue.http.options.emulateJSON = true
//config http request show loading
Vue.http.interceptors.push((request,next) => {
    //http before
    // const userToken = "token";
    // if (userToken) {
    //     Vue.http.headers.common['USER-TOKEN'] = userToken;
    // }
    store.commit('updateLoadingStatus',{isLoading:true})
    next(() => {
        // http after
        store.commit('updateLoadingStatus',{isLoading:false})
    })
})
const router = new VueRouter({
    routes
})

// simple history management
const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)

router.beforeEach(function (to, from, next) {

    store.commit('updateLoadingStatus', {isLoading: true})

    const toIndex = history.getItem(to.path)
    const fromIndex = history.getItem(from.path)
    if (toIndex) {
        if (toIndex > fromIndex || !fromIndex || (toIndex === '0' && fromIndex === '0')) {
            store.commit('updateDirection', {direction: 'forward'})
        } else {
            store.commit('updateDirection', {direction: 'reverse'})
        }
    } else {
        ++historyCount
        history.setItem('count', historyCount)
        to.path !== '/' && history.setItem(to.path, historyCount)
        store.commit('updateDirection', {direction: 'forward'})
    }

    if (/\/http/.test(to.path)) {
        let url = to.path.split('http')[1]
        window.location.href = `http${url}`
    } else {
        next()
    }
})

router.afterEach(function (to) {
    store.commit('updateLoadingStatus', {isLoading: false})
})


FastClick.attach(document.body)

/* eslint-disable no-new */
new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app');

// icely add
import  { LoadingPlugin } from 'vux'
Vue.use(LoadingPlugin);

// 或者umd方式
// 引入构建的js文件
Vue.use(LoadingPlugin);
