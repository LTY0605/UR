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
        data () {
            return{
            id:'',
            }
        },
        watch: {},
        created(){
//            this.id = this.$route.query.id;
//            alert(this.id);
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
                    let body = res.body;
                    if (body.errcode == 0) {
//                        this.showNoScro = true;
//                        this.warnText2 = '保存成功';
                    }

                }, res => {

                })
            },
        },
        computed: {}
    }
</script>
<style lang="less" rel="stylesheet/less">

</style>
