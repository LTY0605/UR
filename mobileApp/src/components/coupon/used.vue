<template>
    <div class="page_used">
        <couponlist></couponlist>
    </div>
</template>
<script>
    import Couponlist from '../coupon/couponList.vue'
    import {XHeader, Scroller} from 'vux'
    export default {
        components: {
            XHeader, Scroller, Couponlist
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
    .page_used {

    }
</style>