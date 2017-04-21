/**
* Created by tanyichao on 2017/3/15.
*/
<template>
    <div>
        <x-header>This is the page title.</x-header>
        <scroller :height="-46+'px'" lock-x>
            <div>
               <button @click="submit">接口</button>
            </div>
        </scroller>
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
        watch: {},
        created(){
        },
        methods: {
            submit(){
                registerService().save({
                    customerName:this.name,
                    mobileTel:this.phone,
                }).then(res => {


                }, res => {

                })
            }
        },
        computed: {}
    }
</script>
<style lang="less" rel="stylesheet/less">

</style>
