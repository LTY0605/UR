/**
 * Created by Jackie on 2017/2/14.
 */

const routes = [
    {
        path: '/',
        name: 'index',
        meta: {
            title: '主页'
        },
        component: resolve => require(['./components/index.vue'], resolve)
    },
    {
        path: '/pageDemo',
        name: 'pageDemo',
        meta: {
            title: '演示'
        },
        component: resolve => require(['./components/pageDemo.vue'], resolve)
    },
    {
        path: '/login',
        name: 'login',
        meta: {
            title: '注册'
        },
        component: resolve => require(['./components/login.vue'], resolve)
    }
]

export default routes
