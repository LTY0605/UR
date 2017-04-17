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
