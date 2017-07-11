/**
* Created by liangtianyou on 2017/4/24.
*/
<template>
    <div class="page_login">
        <x-header title="登 录" :left-options="{showBack: false}"></x-header>
        <div>
            <div class="header">
                <div class="imgBox">
                    <img class="logo" src="../assets/images/logo.png" alt="图片">
                </div>
            </div>
            <div class="loginContent">
                <div class="mobileBox">
                    <group>
                        <x-input
                            is-type="china-mobile"
                            class="input input1 text"
                            placeholder="手机号"
                            title="手机号码"
                            :max="11" :min="11"
                            v-model="phone">
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
                    <x-button
                        type="primary"
                        name="submit"
                        action-type="submit"
                        @click.native="login_submit">登 录
                    </x-button>
                </div>
                <div class="forgetBox" @click="goToLink('register')">
                    立即注册 <span class="toRight">》</span>
                </div>
                <!--<div class="agreementBox">-->
                <!--<router-link :to="{name:'contract'}">UR用户使用协议</router-link>-->
                <!--</div>-->
            </div>
        </div>
        <toast v-model="loginAlert" type="text" :time="1000">{{loginText}}</toast>
        <x-dialog v-model="showNoScroll" class="dialog-demo" :scroll="false">
            <p class="dialog-title">温馨提示</p>
            <div class="dialog-contain">
                {{warnText}}
            </div>
            <button class="vux-close" @click="goLink">确定</button>
        </x-dialog>
        <x-dialog v-model="showBind" class="dialog-demo">
            <p class="dialog-title">温馨提示</p>
            <div class="dialog-contain">
                {{warnText2}}
            </div>
            <span v-model="isbind" class="vux-close" @click="showIsbind()" style="margin-right: 2.2rem;">是</span>
            <span v-model="isbind2" class="vux-close" @click="showNoIsbind()">否</span>
        </x-dialog>
    </div>
</template>
<script>
    import {loginService, codeService,infoByMobileTelService} from '../services/member.js'
    import {Toast, XButton, XHeader, Scroller, Group, XInput, XDialog} from 'vux'
    export default {
        components: {
            XHeader,
            Scroller,
            Group,
            XInput,
            XButton,
            Toast,
            XDialog
        },
        data () {
            return {
                isbind: '',
                isbind2: '',
                warnText2: '',
                showBind: false,
                showNoScroll: false,
                warnText: '',
                phone: '',
                loginText: '登录',
                loginAlert: false,
                time: 60,
                code: '',//验证码
                showMin: false,
                beTel: function (value) {
                    return {
                        valid: /^(?=\d{11}$)^1(?:3\d|4[57]|5[^4\D]|7[^249\D]|8\d)\d{8}$/.test(value),
                        msg: ''
                    }
                }
            }

        },
        methods: {
            renderOpen(){
                let wxOpenId = this.getParams("wxOpenId");
                //let wxOpenId = 'odaBLwEfMOFDB5ATyqZwQco5Aaxo';
                if (wxOpenId && wxOpenId != '') {
                    window.localStorage.setItem("wxOpenId", wxOpenId);
                }
//                alert(window.localStorage.getItem("wxOpenId"))

            },
            getParams(paras) {
                let url = decodeURI(location.href);
//                let url = 'http://nianhui.ur.com.cn/front/#/personMain?wxOpenId=odaBLwI5ERI1Da5HXf6Kt3cIulPY';
                let paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
                let returnValue;
                for (let i = 0; i < paraString.length; i++) {
                    let tempParas = paraString[i].split('=')[0];
                    let parasValue = paraString[i].split('=')[1];
                    if (tempParas === paras)
                        returnValue = parasValue;
                }
                if (typeof(returnValue) == "undefined") {
                    return "";
                } else {
                    return returnValue;
                }
            },

            /*多余的函数*/
            isMenber(){
                let _this = this;
                if (window.localStorage.getItem("isbind") == 0) {
                    this.showBind = false;
                    loginService().save({
                        wxOpenID: window.localStorage.getItem("wxOpenId"),
                        code: this.code,
                        mobileTel: this.phone,
                        isbind: this.isbind
                    }).then(res => {
                        let body = res.body;
                        if (body.errcode == 0) {
                            this.showNoScroll = false;
                            this.warnText = '登录成功';
                            window.localStorage.setItem("wxOpenId", body.wxOpenId);
                            window.localStorage.setItem("isbind", this.isbind);
                            setTimeout(function () {
                                _this.$router.push({
                                    name: 'index'
                                })
                            }, 500)
                        } else {
                            this.loginAlert = true;
                            this.loginText = body.errmsg;
                        }
                    }, res => {
                        this.loginAlert = true;
                        this.loginText = "网络超时，请重试";
                    })
                } else {
                    this.showBind = true;
                    this.warnText2 = '是否绑定此微信';
                }
            },
            showIsbind(){
                let _this = this;
                this.showBind = false;
                this.isbind = 0;
                let data = {
                    wxOpenID: window.localStorage.getItem("wxOpenId"),
                    code: this.code,
                    mobileTel: this.phone,
                    isbind: this.isbind
                }
                console.log(data)
                loginService().save({
                    wxOpenID: window.localStorage.getItem("wxOpenId"),
                    code: this.code,
                    mobileTel: this.phone,
                    isbind: this.isbind
                }).then(res => {
                    let body = res.body;
                    if (body.errcode == 0) {
                        this.showNoScroll = false;
                        this.warnText = '登录成功';
                        //window.localStorage.setItem("wxOpenId", window.localStorage.getItem("wxOpenId"));
                        window.localStorage.setItem("isbind", this.isbind);
                        window.localStorage.setItem("wxOpenId", window.localStorage.getItem("wxOpenId"));
                        setTimeout(function () {
                            _this.$router.push({
                                name: 'index'
                            })
                        }, 500)

                    } else {
                        this.loginAlert = true;
                        this.loginText = body.errmsg;
                    }

                }, res => {
                    this.loginAlert = true;
                    this.loginText = "网络超时，请重试";
                })

            },
            showNoIsbind(){
                let _this = this;
                this.showBind = false;
                this.isbind2 = 1;
                let data = {
                    wxOpenID: window.localStorage.getItem("wxOpenId"),
                    code: this.code,
                    mobileTel: this.phone,
                    isbind: this.isbind2
                }
                console.log(data)
                loginService().save({
                    wxOpenID: window.localStorage.getItem("wxOpenId"),
                    code: this.code,
                    mobileTel: this.phone,
                    isbind: this.isbind2
                }).then(res => {
                    let body = res.body;
                    if (body.errcode == 0) {
                        this.showNoScroll = false;
                        this.warnText = '登录成功';
//                        window.localStorage.setItem("wxOpenId", body.wxOpenId);
//                        window.localStorage.setItem("isbind", window.localStorage.getItem("isbind"));
                        window.localStorage.setItem("isbind", this.isbind2);
                        setTimeout(function () {
                            _this.$router.push({
                                name: 'index'
                            })
                        }, 500)
                    } else {
                        this.loginAlert = true;
                        this.loginText = body.errmsg;
                    }
                }, res => {
                    this.loginAlert = true;
                    this.loginText = "网络超时，请重试";
                })

            },
            goToLink(url){
                this.$router.push({
                    name: url,
                });
            },
            goLink(){
                this.showNoScroll = false;
                this.$router.push({
                    name: 'index',
                });
            },
            login_submit () {
//                alert(location.href)
                let asd = {
                    wxOpenId: window.localStorage.getItem("wxOpenId"),
                    cardcode: window.localStorage.getItem("cardcode"),
                    sex: window.localStorage.getItem("sex"),
                    provice: window.localStorage.getItem("provice"),
                    brithday: window.localStorage.getItem("brithday"),
                    customerName: window.localStorage.getItem("customerName"),
                    district: window.localStorage.getItem("district"),
                    city: window.localStorage.getItem("city"),
                    mobileTel: window.localStorage.getItem("mobileTel"),
                    headimgurl: window.localStorage.getItem("headimgurl"),
                    isbind: window.localStorage.getItem("isbind"),
                }
                console.log(asd);


                let _this = this;
                if (this.phone == '' || this.code == '') {
                    this.loginAlert = true;
                    this.loginText = '请输入手机号或者验证码'
                    return
                }
                if (!this.beTel(this.phone).valid) {
                    this.loginAlert = true;
                    this.loginText = '请输入正确的手机号';
                    return
                }
                /*如果wxOpenId为空*/
                if(window.localStorage.getItem("wxOpenId")){
                    /*获取会员信息*/
                    infoByMobileTelService().get({
                        mobileTel: this.phone
                    }).then(res => {
                        let body = res.body;
                        if (body.errcode == 0) {
                            window.localStorage.setItem("cardcode", body.cardcode);
                            window.localStorage.setItem("sex", body.sex);
                            window.localStorage.setItem("provice", body.provice);
                            window.localStorage.setItem("brithday", body.brithday);
                            window.localStorage.setItem("customerName", body.customerName);
                            window.localStorage.setItem("district", body.district);
                            window.localStorage.setItem("city", body.city);
                            window.localStorage.setItem("mobileTel", body.mobileTel);
                            window.localStorage.setItem("headimgurl", body.headimgurl);
//                            this.isMenber();
                            this.showBind = true;
                            this.warnText2 = '是否绑定此微信';
                        } else {
                            this.loginAlert = true;
                            this.loginText = '该手机号账户不存在，请先去注册';

                        }
                    }, res => {

                    })
                } else {
                    /*获取wxOpenId*/
                    this.renderOpen();
                }





                /*if (window.localStorage.getItem("isbind") == 1 || window.localStorage.getItem("isbind") == undefined) {
                 this.showBind = true;
                 this.warnText2 = '是否绑定此微信';
                 } else {
                 this.showBind = false;
                 loginService().save({
                 wxOpenID: window.localStorage.getItem("wxOpenId"),
                 code: this.code,
                 mobileTel: this.phone,
                 isbind: 0
                 }).then(res => {
                 let body = res.body;
                 if (body.errcode == 0) {
                 this.showNoScroll = false;
                 this.warnText = '登录成功';
                 window.localStorage.setItem("wxOpenId", window.localStorage.getItem("wxOpenId"));
                 window.localStorage.setItem("cardcode", window.localStorage.getItem("cardcode"));
                 window.localStorage.setItem("sex", window.localStorage.getItem("sex"));
                 window.localStorage.setItem("provice", window.localStorage.getItem("provice"));
                 window.localStorage.setItem("brithday", window.localStorage.getItem("brithday"));
                 window.localStorage.setItem("customerName", window.localStorage.getItem("customerName"));
                 window.localStorage.setItem("district", window.localStorage.getItem("district"));
                 window.localStorage.setItem("city", window.localStorage.getItem("city"));
                 window.localStorage.setItem("mobileTel", window.localStorage.getItem("mobileTel"));
                 window.localStorage.setItem("headimgurl", window.localStorage.getItem("headimgurl"));
                 window.localStorage.setItem("isbind", 0);
                 setTimeout(function () {
                 _this.$router.push({
                 name: 'index'
                 })
                 }, 500)
                 } else {
                 this.loginAlert = true;
                 this.loginText = body.errmsg;
                 }
                 }, res => {
                 this.loginAlert = true;
                 this.loginText = "网络超时，请重试";
                 })
                 }*/

                /*loginService().save({
                 wxOpenID: window.localStorage.getItem("wxOpenId"),
                 code: this.code,
                 mobileTel: this.phone,
                 }).then(res => {
                 let body = res.body;
                 if (body.errcode == 0) {
                 this.showNoScroll = false;
                 this.warnText = '登录成功';
                 //window.localStorage.setItem("wxOpenId", body.wxOpenId);
                 window.localStorage.setItem("cardcode", body.cardcode);
                 window.localStorage.setItem("sex", body.sex);
                 window.localStorage.setItem("provice", body.provice);
                 window.localStorage.setItem("brithday", body.brithday);
                 window.localStorage.setItem("customerName", body.customerName);
                 window.localStorage.setItem("district", body.district);
                 window.localStorage.setItem("city", body.city);
                 window.localStorage.setItem("mobileTel", body.mobileTel);
                 window.localStorage.setItem("headimgurl", body.headimgurl);
                 setTimeout(function () {
                 _this.$router.push({
                 name: 'index'
                 })
                 }, 500)
                 } else {
                 this.loginAlert = true;
                 this.loginText = body.errmsg;
                 }

                 }, res => {
                 this.loginAlert = true;
                 this.loginText = "网络超时，请重试";
                 })*/
            },
            getCode(){
                if (this.phone == '') {
                    this.loginAlert = true;
                    this.loginText = '请输入手机号';
                    return
                }
                if (!this.beTel(this.phone).valid) {
                    this.loginAlert = true;
                    this.loginText = '请输入正确的手机号';
                    return
                }
                codeService().save({
                    scope: 'login',
                    mobileTel: this.phone
                }).then(res => {
                    let body = res.body;
                    if (body.errcode == 0) {
                        this.loginAlert = true;
                        this.loginText = '验证码发送成功';
                        this.showMin = true;
                        this.finish();
                    } else if (body.errcode == 3002) {
                        this.loginAlert = true;
                        this.loginText = '该手机号未注册，请先注册';
                    } else {
                        this.loginAlert = true;
                        this.loginText = body.errmsg;
                    }
                }, res => {
                    this.loginAlert = true;
                    this.loginText = "网络超时，请重试";
                })
            },
            finish: function () {
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
    .page_login {
        .dialog-demo {
            font-size: .9rem;
            .dialog-title {
                font-size: 1rem;
                height: 2.2rem;
                line-height: 2.2rem;
            }
            .dialog-contain {
                width: 100%;
                padding: .5rem 0 1rem 0;
                border-bottom: 1px solid #ddd;
                color: #999999;
            }
            .vux-close {
                height: 2rem;
                line-height: 2rem;
                color: #0BB20C;
                background: none;
            }
        }
        .vux-header {
            background-color: #AB9236 !important;
        }
        .header {
            background-color: #AB9236;
            padding: 1.25rem 0 1.75rem;
            height: auto;
            margin-top: -.04rem;
            .imgBox {
                background-color: #ffffff;
                width: 4.55rem;
                height: 4.55rem;
                border: 0.2rem solid #cdbe86;
                border-radius: 50%;
                overflow: hidden;
                margin: auto;

                .logo {
                    width: 100%;
                    margin-top: 16%;
                    padding-left: .5rem;
                    padding-right: .5rem;

                }
            }
        }

        .loginContent {
            padding: 0 9.6%;
            background: #fff;
            height: auto;
        }
        .input {
            height: 2rem;
        }
        .input1 {
            border-radius: 0.2rem;
            border: 0.02rem solid #D2D2D2;
        }
        .mobileBox {
            padding-top: 1.25rem;
            input {
                padding-left: .4rem;
                font-size: .75rem;
                color: #999;
            }
        }
        .mobileW {
            height: 0.8rem;
            width: 0.6rem;
            margin-bottom: -.12rem;
        }
        .weui-cells {
            margin-top: 0;
        }
        .submitBox {
            margin-top: 1.25rem;
            height: auto;
            button {
                color: #fff;
                line-height: 2rem;
                font-size: .75rem;
            }
        }
        .submitBox .weui-btn {
            background-color: #AB9236 !important;
            padding: 0;
            height: 2rem;
        }
        button {
            padding: 0;
        }
        .weui-cells:before, .weui-cells:after, .vux-cell-box:before {
            border: 0;
        }
        .agreementBox {
            text-align: center;
            padding: 8.81rem 0 1.55rem;
            height: auto;
            a {
                font-size: 0.6rem;
                color: #999;
                text-decoration: underline;
            }
        }
        .codeBox {
            width: 59.7%;
            float: left;
        }
        .captcha {
            padding-top: .6rem;
            overflow: auto;
            img {
                width: .7rem;
                height: .75rem;
                margin-bottom: -.12rem;
            }
            input {
                padding-left: .25rem;
                font-size: .75rem;
                color: #999;
            }
        }
        .countDown {
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
        .getCode {
            background: #D2D2D2;
        }
        .forgetBox {
            text-align: center;
            color: #999;
            font-size: .75rem;
            height: 1rem;
            line-height: 1rem;
            width: 5rem;
            margin: 1.5rem auto 0;
        }
        .toRight {
            padding-left: .2rem;
            font-size: .75rem;
        }
    }
</style>

