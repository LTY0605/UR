/**
* Created by liangtianyou on 2017/4/21.
*/
<template>
    <div class="page_contract">
        <x-header :left-options="{backText: ''}">UR用户使用协议</x-header>
        <scroller :height="-46+'px'" lock-x>
            <div>

            </div>
        </scroller>
    </div>
</template>
<script>
    import {XHeader, Scroller} from 'vux'
    export default {
        name: 'contract',
        data () {
            return {
                message: '协议'
            }
        },
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
    .page_contract{
        .vux-header{
            background-color: #AB9236 !important;
        }
    }
</style>
