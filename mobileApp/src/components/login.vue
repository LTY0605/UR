/**
* Created by liangtianyou on 2017/4/24.
*/
<template>
    <div class="page_login">
        <x-header :left-options="{backText: ''}"></x-header>
        <div>
            <div class="header">
                <div class="imgBox">
                    <img src="../assets/images/logo.png" alt="">
                </div>
                <p>{{headerTit}}</p>
            </div>
            <div class="loginContent">
                <div class="mobileBox">
                    <group>
                        <x-input is-type="china-mobile" class="input input1 text" placeholder="手机号" title="手机号码" v-model="phone">
                            <img class="mobileW" slot="label" src="../assets/images/Mobile.png">
                        </x-input>
                    </group>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { XHeader,Scroller,Group,XInput  } from 'vux'
    export default {
        components: {
            XHeader,
            Scroller,
            Group,
            XInput
        },
        data () {
            return {
                headerTit:'登录',
                phone: '',
            }

        },
        methods: {

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
    .page_login{
        .vux-header {
            background-color: #AB9236 !important;
        }
        .header{
            background-color: #AB9236;
            padding-top: 1.25rem;
            height:auto;
            margin-top: -.04rem;
        }
        .imgBox{
            width: 4.55rem;
            height: 4.55rem;
            border: 0.2rem solid #cdbe86;
            border-radius: 50%;
            overflow: hidden;
            margin: auto;
        }
        .imgBox img{
            width: 4.2rem;
            height: 4.2rem;
        }
        .header p{
            font-family: "PingFang-SC-Medium";
            font-size: .8rem;
            text-align: center;
            color: #fff;
            padding: 0.4rem 0 0.65rem;
        }
        .loginContent{
            padding: 0 9.6%;
            background: #fff;
            height:auto;
        }
        .input{
            height: 2rem;
        }
        .input1{
            border-radius: 0.2rem;
            border: 0.02rem solid #D2D2D2;
        }
        .mobileBox{
            padding-top: 1.25rem;
        }
        .mobileW{
            height: 0.8rem;
            width: 0.6rem;
            margin: 0 10px -2px 0;
        }
        .weui-cells{
            margin-top: 0;
        }
    }
</style>

