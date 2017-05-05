/**
* Created by tanyichao on 2017/3/15.
*/
<template>
    <div class="page_query">
        <x-header>通用查询</x-header>

    </div>
</template>
<script>
    import {
        registerService,
    } from '../services/person.js'
    import {XHeader, Scroller} from 'vux'
    export default {
        components: {
            XHeader,
            Scroller
        },
        mounted(){
        },
        data () {
            return{
                id:'',
            }
        },
        watch: {},
        created(){

        },
        methods: {

        },
        computed: {}
    }
</script>
<style lang="less" rel="stylesheet/less">
.page_query{

}
</style>
