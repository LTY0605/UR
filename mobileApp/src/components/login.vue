/**
* Created by liangtianyou on 2017/4/24.
*/
<template>
    <div class="page_login">
        <x-header title="登 录" :left-options="{backText: ''}"></x-header>
        <div>
            <div class="header">
                <div class="imgBox">
                    <img src="../assets/images/logo.png" alt="">
                </div>
            </div>
            <div class="loginContent">
                <div class="mobileBox">
                    <group>
                        <x-input is-type="china-mobile" class="input input1 text" placeholder="手机号" title="手机号码" v-model="phone">
                            <img class="mobileW" slot="label" src="../assets/images/Mobile.png">
                        </x-input>
                    </group>
                </div>
                <div class="captcha">
                    <group class="codeBox">
                        <x-input class="input input1" placeholder="验证码" v-model="code">
                            <img class="" slot="label" src="../assets/images/code.png">
                        </x-input>
                    </group>
                    <span v-show="!showMin" class="countDown" @click="getCode">获取验证码</span>
                    <span v-show="showMin" class="countDown getCode">{{time}}<span cla>秒</span></span>
                </div>
                <div class="submitBox">
                    <x-button type="primary" name="submit" action-type="submit" @click.native="login_submit">登 录</x-button>
                    <alert v-model="loginAlert" title="确定登录吗？">{{loginText}}</alert>
                </div>
                <div class="forgetBox">
                    <router-link to="/register">立即注册 <span class="toRight">》</span></router-link>
                </div>
                <div class="agreementBox">
                    <router-link to="/contract">{{contractText}}</router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { Alert,XButton,XHeader,Scroller,Group,XInput  } from 'vux'
    export default {
        components: {
            XHeader,
            Scroller,
            Group,
            XInput,
            XButton,
            Alert,
        },
        data () {
            return {
                phone: '',
                loginText:'登录',
                loginAlert:false,
                contractText:'UR用户使用协议',
                time: 60,
                code:'',//验证码
                showMin:false,
            }

        },
        methods: {
            login_submit () {
                if(this.phone == ''||this.code == ''||this.showMin == false){
                    this.loginAlert = true;
                    this.loginText = '请完善表单信息'
                }

            },
            getCode(){
                this.showMin = true;
                this.finish();
            },
            finish:function(){
                this.time = this.time - 1;
                if (this.time > 0) {
                    setTimeout(() => {
                        this.finish();
                    }, 1000)
                } else {
                    this.showMin = false;
                    this.time = 60;
                }
            },
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
            padding: 1.25rem 0 1.75rem;
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
        .mobileBox input{
            padding-left: .4rem;
        }
        .mobileW{
            height: 0.8rem;
            width: 0.6rem;
            margin-bottom: -.12rem;
        }
        .weui-cells{
            margin-top: 0;
        }
        .submitBox{
            padding-top: 1.25rem;
            height:auto;
        }
        .submitBox .weui-btn{
            background-color: #AB9236 !important;
            padding: 0;
            height: 2rem;
        }
        .submitBox button{
            color: #fff;
        }
        button{
            padding: 0;
        }
        .weui-cells:before,.weui-cells:after,.vux-cell-box:before{
            border:0;
        }
        .agreementBox{
            text-align: center;
            padding: 5.1rem 0 1.55rem;
            height:auto;
        }
        .agreementBox a{
            font-size: 0.6rem;
            color: #999;
            text-decoration:underline;
        }
        .codeBox{
            width: 59.7%;
            float: left;
        }
        .captcha{
            padding-top: .6rem;
            overflow: auto;
        }
        .captcha img{
            width: .7rem;
            height: .75rem;
            margin-bottom: -.12rem;
        }
        .captcha input{
            padding-left: .25rem;
        }
        .countDown{
            font-size: .75rem;
            display: inline-block;
            width: 34%;
            height: 2rem;
            line-height: 2rem;
            background: #ec6941;
            color: #fff;
            text-align: center;
            float: right;
            border-radius: .2rem;
        }
        .getCode{
            background: #D2D2D2;
        }
        .forgetBox{
            padding-top: 1.5rem;
            text-align: center;
        }
        .forgetBox a{
            color: #999;
            font-size: .75rem;
        }
        .toRight{
            padding-left: .2rem;
            font-size: .88rem;
        }
    }
</style>

