<template>
    <div class="page_unbound">
        <div class="materialItem">
            <ul class="edit_material">
                <li>
                    <group>
                        <x-input class="mobileTel" title="手机号" placeholder="手机号" :max="11" :min="11"
                                 keyboard="number" :is-type="beTel" v-model="mobileTel" required ref="kk" disabled></x-input>
                    </group>
                </li>
                <li class="code">
                    <group>
                        <x-input title="验证码" placeholder="请输入短信验证码" v-model="code"></x-input>
                    </group>
                    <span v-show="!showMin" class="getCode" @click="getCode">获取验证码</span>
                    <span v-show="showMin" class="getCode2">{{time}}秒</span>
                </li>
            </ul>
            <div class="operate" @click="boundSubmit">解绑</div>
        </div>
        <toast v-model="showNoScroll" type="text" :time="1000">{{warnText}}</toast>
    </div>
</template>
<script>
    import {
        XHeader, Scroller, XInput, Group, Selector,Toast
    } from 'vux'
    import {
        bindEditService,codeService
    } from '../../services/person.js'
    export default {
        components: {
            XHeader, Scroller, XInput, Group, Selector,Toast
        },
        data () {
            return {
                mobileTel:'',
                code:'',
                showMin:false,
                time:60,
                showNoScroll: false,
                warnText: '提示',
                beTel: function (value) {
                    return {
                        valid: /^(?=\d{11}$)^1(?:3\d|4[57]|5[^4\D]|7[^249\D]|8\d)\d{8}$/.test(value),
                        msg: ''
                    }
                },
            }
        },
        mounted(){
        },
        methods: {
            boundSubmit(){
                let _this = this;
//                debugger
//                let a = this.$refs.kk;
//                console.log(a.msg,'--------')
//                return
                if(this.mobileTel == ''  || this.code == ''){
                    this.showNoScroll = true;
                    this.warnText = '请输入验证码';
                    return
                }
                if(!this.beTel(this.mobileTel).valid){
                    this.showNoScroll = true;
                    this.warnText = '请输入正确的手机号'
                    return
                }
                bindEditService().save({
                    mobileTel:this.mobileTel,
                    code:this.code,
                    cardcode: window.localStorage.getItem("cardcode"),
                    wxOpenID: window.localStorage.getItem("wxOpenId"),
                }).then(res => {
                    let body = res.body;
                    if (body.errcode == 0) {
                        window.localStorage.setItem("mobileTel", '');
                        this.showNoScroll = true;
                        this.warnText = '解绑成功';
                        /*_this.$router.push({
                         name:'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5f165071859dd820&redirect_uri=http%3a%2f%2fnianhui.ur.com.cn%2fur_crm%2fadmin%2fsys%2foauth%2fredirect&response_type=code&scope=snsapi_base&state=http%3a%2f%2fnianhui.ur.com.cn%2fwx%2findex.html%23%2f%3f#wechat_redirect'
                         })*/
                        this.$router.push('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5f165071859dd820&redirect_uri=http%3a%2f%2fnianhui.ur.com.cn%2fur_crm%2fadmin%2fsys%2foauth%2fredirect&response_type=code&scope=snsapi_base&state=http%3a%2f%2fnianhui.ur.com.cn%2fwx%2findex.html%23%2f%3f#wechat_redirect');
//                        -webkit-this.$router.go('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5f165071859dd820&redirect_uri=http%3a%2f%2fnianhui.ur.com.cn%2fur_crm%2fadmin%2fsys%2foauth%2fredirect&response_type=code&scope=snsapi_base&state=http%3a%2f%2fnianhui.ur.com.cn%2fwx%2findex.html%23%2f%3f#wechat_redirect');
                        /*setTimeout(function () {
                            _this.$router.push({
                                name: 'login',
                            });
                        },300)*/
                    } else {
                        this.showNoScroll = true;
                        this.warnText = body.errmsg;
                    }

                }, res => {
                    this.showNoScroll = true;
                    this.warnText = '网络超时，请重试';
                })
            },
            getCode(){
                if(this.mobileTel == ''){
                    this.showNoScroll = true;
                    this.warnText = '请填写原手机号';
                    return
                }
                if(!this.beTel(this.mobileTel).valid){
                    this.showNoScroll = true;
                    this.warnText = '请输入正确的手机号'
                    return
                }
                codeService().save({
                    scope:'unbind',
                    mobileTel:this.mobileTel,
                }).then(res => {
                    let body = res.body;
                    if (body.errcode == 0) {
                        this.showNoScroll = true;
                        this.warnText = '验证码发送成功';
                        this.showMin = true;
                        this.finish();
                    } else {
                        this.showNoScroll = true;
                        this.warnText = '验证码发送失败，请稍后再试';
                    }

                }, res => {
                    this.showNoScroll = true;
                    this.warnText = '网络超时，请重试';
                })
            },
            finish() {
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
        watch: {

        },
        created(){
            this.mobileTel = window.localStorage.getItem("mobileTel");
        },
        computed: {}
    }
</script>
<style lang="less" rel="stylesheet/less">
    .page_unbound {
        .weui-cells:before, .weui-cells:after,
        .weui-cell_access .weui-cell__ft:after,
        .vux-cell-box:before {
            display: none;
        }
        .weui-cell,
        .weui-cell_access .weui-cell__ft,
        .vux-popup-picker-select span {
            padding: 0;
        }
        .vux-no-group-title {
            margin-top: 0;
            font-size: .7rem;
        }
        .weui-input {
            text-align: left;
            color: #999;
            -webkit-text-fill-color:#999; -webkit-opacity:1; opacity: 1;
        }

        .weui-label {
            color: #333;
        }
        .vux-selector.weui-cell_select-after {
            padding-left: 0;
            height: .95rem;
        }
        .weui-cell_select-after .weui-select {
            padding: 0;
            direction: rtl;
            color: #999;
        }
        .weui-cell_select .weui-cell__bd:after {
            display: none;
        }
        .personTitle {
            width: 11.2rem;
            height: 1.3rem;
            line-height: 1.25rem;
            margin: .75rem auto;
            border: 1px solid #EC6941;
            border-radius: .2rem;
            font-size: 0;
            span {
                font-size: .6rem;
                text-align: center;
                color: #EC6941;
                display: inline-block;
                vertical-align: top;
                width: 50%;
                height: 1.2rem;
            }
            span.active {
                background: #EC6941;
                color: #fff;
            }
        }
        .materialItem {
            width: 100%;
            height: auto;
            padding: .9rem 1rem 0 1rem;
        }
        .edit_material {
            height: auto;
            width: 100%;
            li {
                list-style: none;
                padding: 1rem 0;
                height: auto;
                border-bottom: 1px solid #D2D2D2;
                width: 100%;
                font-size: 0;
                position: relative;
                /*mobileTel{
                    -webkit-text-fill-color:#999; -webkit-opacity:1; opacity: 1;
                }*/
                div {
                    font-size: .7rem;
                }
                .material_item {
                    display: inline-block;
                    vertical-align: top;
                    font-size: .7rem;
                }
                .getCode{
                    font-size: .7rem;
                    position: absolute;
                    right: 0;
                    top: 50%;
                    margin-top: -.55rem;
                    border-bottom: 1px solid #EC6941;
                    color: #EC6941;
                    z-index: 100;
                }
                .getCode2{
                    font-size: .7rem;
                    position: absolute;
                    right: 0;
                    top: 50%;
                    margin-top: -.55rem;
                    color: #999;
                    z-index: 100;
                }
            }
        }
        .code{
            .weui-cell__ft{
                display: none;
            }
        }

    }
</style>
