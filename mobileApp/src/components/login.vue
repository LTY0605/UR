/**
* Created by liangtianyou on 2017/4/13.
*/
<template>
    <div class="page_login">
        <x-header :left-options="{backText: ''}"></x-header>
            <div>
                <div class="header">
                    <div class="imgBox">
                        <img src="../assets/images/logo.png" alt="">
                    </div>
                    <p>注册</p>
                </div>
                <div class="loginContent">
                    <div class="nameBox">
                        <group>
                            <x-input class="input input1 text" title="姓名" name="username" placeholder="用户名" :is-type="zhengze_name" v-model="user">
                                <img class="userW" slot="label" src="../assets/images/user.png">
                            </x-input>
                        </group>
                    </div>
                    <div class="mobileBox">
                        <group>
                            <x-input is-type="china-mobile" class="input input1 text" placeholder="手机号" title="手机号码" name="mobile" v-model="phone">
                                <img class="mobileW" slot="label" src="../assets/images/Mobile.png">
                            </x-input>
                        </group>
                    </div>
                    <ul class="radioBox">
                        <li class="female">
                            <label class="text"><input name="radio" type="radio" v-model="selected" value="1"><span>女生</span></label>
                        </li>
                        <li class="male">
                            <label class="text checked"><input  name="radio" v-model="selected" type="radio" value="2"><span>男生</span></label>
                        </li>
                    </ul>
                    <div class="datatimeBox">
                        <group class="dateBox">
                            <datetime v-model="value2" clear-text="clear" @on-clear="clearValue" class="input input1 text textPadding" @on-change="change" title="出生日期"></datetime>
                        </group>
                    </div>
                    <div class="adressBox">
                        <group>
                            <x-address v-model="value3" class="input input1 text" title="选择地区" raw-value :list="addressData"></x-address>
                        </group>
                    </div>
                    <div class="submitBox">
                        <x-button type="primary" name="submit" action-type="submit" @click.native="onSubmit">提交注册</x-button>
                        <alert v-model="show" title="提交注册吗？">{{text}}</alert>
                    </div>
                    <div class="agreementBox">
                        <router-link to="/contract" class="text">UR用户使用协议</router-link>
                    </div>
                </div>
            </div>
    </div>
</template>
<script>
    import { Alert,XHeader,Scroller,XInput,Datetime,XAddress,XButton,Group,ChinaAddressData  } from 'vux'
    export default {
        components: {
            XHeader,
            Scroller,
            XInput,
            Datetime,
            XAddress,
            XButton,
            Group,
            Alert
        },
        data () {
            return {
                show: false,
                show1: false,
                phone:'',
                user:'',
                text:'',
                title: '默认为空',
                iconType: '',
                value2: '',
                addressData: ChinaAddressData,
                value3:[],
                selected: '',
                zhengze_name: function (value) {
                    console.log(value)
                    return {
                        valid: /^[A-Za-z0-9_\u4e00-\u9fa5]{4,16}$/.test(value),
                        msg: 'Must be 4-16个字母（区分大小写），数字，下划线和汉字的组合'
                    }
                },
                options:[
                    {"name":"feman"},
                    {"name":"man"}
                ]
            }

        },
        methods: {
            change (value) {
                console.log('change', value)
            },
            clearValue (value) {
                this.$data.value2 = ''
            },
            onSubmit () {
                if(this.user==''||this.phone==''||this.user==''||this.value2==''||this.value3==''||this.selected==''){
                  this.show =true;
                    this.text = '请完善表单信息'
                }else{
                    this.show =true;
                    this.text = '注册成功'
                }
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
    .page_login{
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
            padding-left: 1.3rem;
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
            padding-top: 1.25rem;
            height:auto;
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
        .weui-cells{
            margin-top: 0 !important;
        }
        .nameBox{
            padding-top: 0.75rem;
            height:auto;
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
            margin: 0 10px -2px 0;
        }
        .mobileBox{
            padding-top: 0.6rem;
            height:auto;
        }
        .mobileW{
            height: 0.8rem;
            width: 0.6rem;
            margin: 0 10px -2px 0;
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
             background-size: 8%;
         }
        .adressBox{
            padding-top: 0.6rem;
            height:auto;
        }
        .submitBox{
            padding-top: 1.25rem;
            height:auto;
        }
        .weui-btn{
            background-color: #AB9236 !important;
        }
        .weui-cells{
            margin-top: 0;
        }
        .weui-label{
            width: 3rem !important;
        }
        .weui-cell__ft{
            padding-right: 1.25rem !important;
        }
        .agreementBox{
            text-align: center;
            padding-top: 1.25rem;//todo  4.75
            padding: 1.25rem 0 1.2rem;
            height:auto;
        }
        .agreementBox a{
            font-size: 0.6rem;
            text-decoration:underline;
        }
        .weui-cell_access .weui-cell__ft:after{
            display: none !important;
        }
    }
</style>

