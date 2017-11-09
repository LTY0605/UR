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
        path: '/setUp',
        name: 'setUp',
        meta: {
            title: '设置'
        },
        component: resolve => require(['./components/setUp.vue'], resolve)
    },
    {
        path: '/personMain',
        name: 'personMain',
        meta: {
            title: '设置'
        },
        component: resolve => require(['./components/personMain.vue'], resolve)
    },
    {
        path: '/wallet',
        name: 'wallet',
        meta: {
            title: '钱包'
        },
        component: resolve => require(['./components/wallet.vue'], resolve)
    },
    {
        path: '/myBill',
            name: 'myBill',
        meta: {
        title: '我的账单'
    },
        component: resolve => require(['./components/myBill.vue'], resolve)
    },
    // {
    //     path: '/login',
    //     name: 'login',
    //     meta: {
    //         title: '注册'
    //     },
    //     component: resolve => require(['./components/login.vue'], resolve)
    // }
]

export default routes
