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
        path: '/index',
        name: 'index',
        meta: {
            title: '主页'
        },
        component: resolve => require(['./components/index.vue'], resolve)
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
            title: '我的钱包'
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
    {
        path: '/integralS',
        name: 'integralS',
        meta: {
          title: '积分查询'
        },
        component: resolve => require(['./components/integralS.vue'], resolve)
    },
    {
        path: '/myCoupon',
        name: 'myCoupon',
        meta: {
            title: '优惠券'
        },
        component: resolve => require(['./components/myCoupon.vue'], resolve)
    },
    {
        path: '/transfer',
        name: 'transfer',
        meta: {
            title: '转赠'
        },
        component: resolve => require(['./components/transfer.vue'], resolve)
    },
    {
        path: '/transaction',
        name: 'transaction',
        meta: {
            title: '交易记录'
        },
        component: resolve => require(['./components/transaction.vue'], resolve)
    },
    {
        path: '/register',
        name: 'register',
        meta: {
            title: '注册'
        },
        component: resolve => require(['./components/register.vue'], resolve)
    },
    {
        path: '/newAddress',
        name: 'newAddress',
        meta: {
            title: '新增收货地址'
        },
        component: resolve => require(['./components/setUp/newAddress.vue'], resolve)
    },
    {
        path: '/reviseAddress',
        name: 'reviseAddress',
        meta: {
            title: '修改地址'
        },
        component: resolve => require(['./components/setUp/reviseAddress.vue'], resolve)
    },
    {
        path: '/questPage',
        name: 'questPage',
        meta: {
            title: '调查问卷页'
        },
        component: resolve => require(['./components/questPage.vue'], resolve)
    },
    {
        path: '/login',
        name: 'login',
        meta: {
            title: '登录'
        },
        component: resolve => require(['./components/login.vue'], resolve)
    },
    {
        path: '/queryIndex',
        name: 'queryIndex',
        meta: {
            title: '通用查询'
        },
        component: resolve => require(['./components/queryIndex.vue'], resolve)
    },
    {
        path: '/carPassword',
        name: 'carPassword',
        meta: {
            title: '修改密码'
        },
        component: resolve => require(['./components/wallet/carPassword.vue'], resolve)
    },
    {
        path: '/integral',
        name: 'integral',
        meta: {
            title: '积分'
        },
        component: resolve => require(['./components/wallet/integral.vue'], resolve)
    },
    {
        path: '/coupon',
        name: 'coupon',
        meta: {
            title: '优惠券'
        },
        component: resolve => require(['./components/wallet/coupon.vue'], resolve)
    },
    {
        path: '/giftCoupon',
        name: 'giftCoupon',
        meta: {
            title: '礼品卡'
        },
        component: resolve => require(['./components/wallet/giftCoupon.vue'], resolve)
    },
    {
        path: '/quest',
        name: 'quest',
        meta: {
            title: '调查问卷'
        },
        component: resolve => require(['./components/quest.vue'], resolve)
    }
]

export default routes
