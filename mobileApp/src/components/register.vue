/**
* Created by liangtianyou on 2017/4/13.
*/
<template>
    <div class="page_register">
        <x-header title="注 册" :left-options="{backText: ''}"></x-header>
            <div>
                <div class="header">
                    <div class="imgBox">
                        <img src="../assets/images/logo.png" alt="">
                    </div>
                </div>
                <div class="registerContent">
                    <div class="nameBox">
                        <group>
                            <x-input
                                class="input input1 text"
                                title="姓名" name="username"
                                placeholder="用户名"
                                :is-type="zhengze_name"
                                v-model="user">
                                <img class="userW" slot="label" src="../assets/images/user.png">
                            </x-input>
                        </group>
                    </div>
                    <div class="mobileBox">
                        <group>
                            <x-input
                                is-type="china-mobile"
                                class="input input1 text"
                                placeholder="手机号"
                                title="手机号码"
                                :max="11" :min="11"
                                name="mobile"
                                v-model="phone">
                                <img class="mobileW" slot="label" src="../assets/images/Mobile.png">
                            </x-input>
                        </group>
                    </div>
                    <ul class="radioBox">
                        <li class="female">
                            <label class="text" for="feman">
                                <input
                                    id="feman"
                                    name="radio"
                                    type="radio"
                                    v-model="selected"
                                    value="1">
                                <span>女生</span>
                            </label>
                        </li>
                        <li class="male">
                            <label class="text checked" for="man">
                                <input
                                    id="man"
                                    name="radio"
                                    v-model="selected"
                                    type="radio"
                                    value="0">
                                <span>男生</span>
                            </label>
                        </li>
                    </ul>
                    <div class="datatimeBox">
                        <group class="dateBox">
                            <datetime
                                :min-year=1900
                                cancelText="取消"
                                confirmText="确定"
                                v-model="value2"
                                class="input input1 text textPadding"
                                title="出生日期"></datetime>
                        </group>
                    </div>
                    <div class="adressBox">
                        <group>
                            <x-address
                                v-model="attrValue"
                                class="input input1 text"
                                title="选择地区"
                                :list="addressData"></x-address>
                        </group>
                    </div>
                    <div class="submitBox">
                        <x-button
                            type="primary"
                            name="submit"
                            action-type="submit"
                            @click.native="onSubmit">{{submitText}}</x-button>
                    </div>
                    <!--<div class="agreementBox">-->
                        <!--<router-link :to="{name:'contract'}" class="text">{{contractText}}</router-link>-->
                    <!--</div>-->
                </div>
            </div>
        <toast v-model="show" type="text" :time="1000">{{text}}</toast>
        <x-dialog v-model="showNoScro" class="dialog-demo" :scroll="false">
            <p class="dialog-title">温馨提示</p>
            <div class="dialog-contain">
                {{warnText2}}
            </div>
            <span class="vux-close" @click="goLink">确定</span>
        </x-dialog>
    </div>
</template>
<script>
    import { registerService  } from '../services/member.js'
    import { XDialog,Toast,XHeader,Scroller,XInput,Datetime,XAddress,XButton,Group,ChinaAddressData,
        Value2nameFilter as value2name, Name2valueFilter as name2value} from 'vux'
    export default {
        components: {
            XDialog,
            XHeader,
            Scroller,
            XInput,
            Datetime,
            XAddress,
            XButton,
            Group,
            Toast
        },
        data () {
            return {
                showNoScro: false,
                warnText2: '',
                submitText: '提交注册',
                contractText: 'UR用户使用协议',
                show: false,
                phone:'',
                user:'',
                text:'',
                title: '默认为空',
                iconType: '',
                value2: '',
                addressData: ChinaAddressData,
                attrValue:[],
                selected: 1,
                zhengze_name: function (value) {
                    return {
                        valid: /^[A-Za-z0-9_\u4e00-\u9fa5]{4,16}$/.test(value),
                        msg: '字体长度不能超过20'
                    }
                }
            }

        },

        methods: {
            onSubmit () {
                if(this.user == ''|| this.phone=='' || this.value2=='' || this.attrValue.length == 0){
                  this.show =true;
                    this.text = '请完善表单信息'
                    return
                }
                var attress = value2name(this.attrValue, ChinaAddressData);
                var pro = attress.split(" ");
                //console.log(pro,'9999')
                registerService().save({
                    customerName:this.user,
                    mobileTel:this.phone,
                    brithday:this.value2,
                    sex:this.selected,
                    wxOpenID:window.localStorage.getItem("wxOpenId"),
                    provice: pro[0],
                    city: pro[1],
                    district: pro[2]
                }).then(res => {
                    let body = res.body;
                    //console.log(body)
                    if(body.errcode == 0){
                        this.showNoScro =true;
                        this.warnText2 = '注册成功';
                    }else{
                        this.showNoScro =true;
                        this.warnText2 = '注册不成功';
                    }
                    //console.log(res);
                }, res => {

                })
            },
            goLink(){
                this.showNoScro = false;
                this.$router.push({
                    name: 'login',
                });
            }
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
    .page_register{
        ul{
            list-style: none;
        }
        .text{
            font-size: 0.75rem;
            color: #999 !important;
            font-family: 'PingFang-SC-Medium';
        }
        .female{
            float: left;
            width: 50%;
            padding-left: .8rem;
        }
        input[type="radio"]{
            display: none;
        }
        input[type="radio"] + span{
            width: .85rem;
            height: .85rem;
            line-height: .85rem;
            background: url(../assets/images/circle.png) left center no-repeat;
            background-size: .85rem .85rem;
            padding-left: 1.2rem;
            font-size: .75rem;
        }
        input[type="radio"]:checked + span{
            background: url(../assets/images/circle_a.png) left center no-repeat;
            background-size: .85rem .85rem;
        }
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
            img{
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }
        }
        .registerContent{
            padding: 0 9.6%;
            background: #fff;
            height:auto;
        }
        .vux-datetime p,.weui-label,.weui-input{
            font-size: 0.75rem;
            font-family: 'PingFang-SC-Medium';
            color: #999;
        }
        .weui-btn:after{
            font-size: 0.75rem;
            font-family: 'PingFang-SC-Medium';
            color: #999;
        }
        .weui-cells:before,.weui-cells:after,.vux-cell-box:before{
            border:0;
        }
        .weui-cells{
            margin-top: 0 !important;
        }
        .weui-cell{
            height: 2rem;
        }
        .nameBox{
            padding-top: 1.25rem;
            height:auto;
            input{
                padding-left: .25rem;
                font-size: .75rem;
                color: #999;
            }
        }
        .input{
            height: 2rem;
        }
        .input1{
            border-radius: 0.2rem;
            border: 0.02rem solid #D2D2D2;
        }
        .userW{
            width: 0.75rem;
            height: 0.8rem;
            margin-bottom: -.12rem;
        }
        .mobileBox{
            padding-top: 0.6rem;
            height:auto;
            input{
                padding-left: 0.4rem;
            }
        }
        .mobileW{
            height: 0.8rem;
            width: 0.6rem;
            margin-bottom: -.12rem;
        }
        .radioBox{
            padding: 0.95rem 0 1rem;
            height:auto;
        }
        .vux-x-icon {
            fill: #AB9236;
        }
         .datatimeBox .weui-cell{
             background: url("../assets/images/date.png") 98% center no-repeat;
             background-size: 6% 50%;
         }
        .adressBox{
            padding-top: 0.6rem;
            .weui-cell__ft{
                display: none;
            }
        }
        .submitBox{
            padding-top: 1.25rem;
            height:auto;
            button{
                line-height: 2rem;
                font-size: .75rem;
            }
        }
        .weui-btn{
            background-color: #AB9236 !important;
            padding: 0;
        }
        button{
            padding: 0;
            height: 2rem;
        }
        .weui-cells{
            margin-top: 0;
        }
        .weui-label{
            width: 3rem !important;
        }
        .weui-cell__ft{
            padding-right: 10% !important;
        }
        .agreementBox{
            text-align: center;
            padding: 3.76rem 0 1.55rem;
            height:auto;
            a{
                font-size: 0.6rem;
                color: #999;
                text-decoration:underline;
            }
        }
        .weui-cell_access .weui-cell__ft:after{
            display: none !important;
        }
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
        .vux-popup-picker-select span{
            padding-right: 0;
        }
        .vux-popup-picker-value{
            font-size: .7rem;
        }
    }
</style>

