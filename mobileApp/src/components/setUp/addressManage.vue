<template>
    <div class="page_address">
        <div class="operate"><span class="plus">+</span>新增地址</div>

    </div>
</template>
<script>
    import {
        XHeader, Scroller, XInput, Group, Selector
    } from 'vux'
    export default {
        components: {
            XHeader, Scroller, XInput, Group, Selector
        },
        data () {
            return {

            }
        },
        mounted(){
        },
        methods: {

        },
        watch: {

        },
        created(){
        },
        computed: {}
    }
</script>
<style lang="less" rel="stylesheet/less">
.page_address{
.operate{
    margin: 1rem;
    .plus{
        font-size: 1.2rem;
        display: inline-block;
        vertical-align: top;
        margin-right: .25rem;
    }
}
}
</style>
