/**
* Created by tanyichao on 2017/3/15.
*/
<template>
    <div>
        <x-header>This is the page title.</x-header>
        <scroller :height="-46+'px'" lock-x>
            <div>

            </div>
        </scroller>
    </div>
</template>
<script>
    import {XHeader, Scroller} from 'vux'
    export default {
        components: {
            XHeader,
            Scroller
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
