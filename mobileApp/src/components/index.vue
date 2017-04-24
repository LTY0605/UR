/**
* Created by tanyichao on 2017/3/15.
*/
<template>
    <div>
        <router-link to="pageDemo">
            <cell title="Go to hello with router index" value="click me" is-link></cell>
        </router-link>
        <router-link to="login">
            <cell title="注册" value="click me" is-link></cell>
        </router-link>
        <router-link to="personMain">
            <cell title="设置" value="click me" is-link></cell>
        </router-link>
        <router-link to="wallet">
            <cell title="我的钱包" value="click me" is-link></cell>
        </router-link>
        <router-link to="myBill">
            <cell title="我的账单" value="click me" is-link></cell>
        </router-link>
        <router-link to="integralS">
            <cell title="积分查询" value="click me" is-link></cell>
        </router-link>
        <router-link to="myCoupon">
            <cell title="优惠券" value="click me" is-link></cell>
        </router-link>
        <router-link to="transfer">
            <cell title="转赠" value="click me" is-link></cell>
        </router-link>
        <router-link to="transaction">
            <cell title="交易记录" value="click me" is-link></cell>
        </router-link>
        <router-link to="contract">
            <cell title="协议" value="click me" is-link></cell>
        </router-link>
    </div>

</template>
<script>
    import {Group, Cell, Confirm, XHeader} from 'vux'
    export default {
        components: {
            Group,
            Cell,
            Confirm,
            XHeader
        },
        mounted(){
        },
        watch: {},
        created(){
        },
        computed: {}
    }
</script>
<style lang="less" rel="stylesheet/less">

</style>
