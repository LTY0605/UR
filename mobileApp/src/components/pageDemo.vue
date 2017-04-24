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
                    customerName:'小玉',
                    mobileTel:'15018580911',
                    brithday:'1996-05-05',
                    wxOpenID:window.localStorage.getItem("wxOpenId"),
                    sex:1
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
