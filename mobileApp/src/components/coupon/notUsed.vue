<template>
    <div class="page_notUsed">
        <couponlist></couponlist>
    </div>
</template>
<script>
    import Couponlist from '../coupon/couponList.vue'
    import {XHeader, Scroller, Group,Cell} from 'vux'
    export default {
        components: {
            XHeader, Scroller, Group,Cell,Couponlist
        },
        data () {
            return {
            }
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
    .page_notUsed {

    }
</style>