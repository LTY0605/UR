/**
* Created by liangtianyou on 2017/4/13.
*/
<template>
    <div>
        <x-header :left-options="{backText: ''}"></x-header>
        <scroller :height="-46+'px'" lock-x>
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
                            <x-input class="input input1 text" title="姓名" name="username" placeholder="用户名" :is-type="china_name">
                                <img class="userW" slot="label" src="../assets/images/user.png">
                            </x-input>
                        </group>
                    </div>
                    <div class="mobileBox">
                        <group>
                            <x-input is-type="china-mobile" class="input input1 text" placeholder="手机号" title="手机号码" name="mobile">
                                <img class="mobileW" slot="label" src="../assets/images/Mobile.png">
                            </x-input>
                        </group>
                    </div>
                    <ul class="radioBox">
                        <li class="female">
                            <label class="text"><input name="radio" type="radio"><span>女生</span></label>
                        </li>
                        <li class="male">
                            <label class="text checked"><input  name="radio" type="radio"><span>男生</span></label>
                        </li>
                    </ul>
                    <div class="datatimeBox">
                        <group class="dateBox">
                            <datetime v-model="value2" clear-text="clear" @on-clear="clearValue" class="input input1 text textPadding" @on-change="change" title="出生日期"></datetime>
                            <img @on-change="change" class="dateClass" src="../assets/images/date.png" alt="">
                        </group>
                    </div>
                    <div class="adressBox">
                        <group>
                            <x-address class="input input1 text" title="选择地区" raw-value :list="addressData"></x-address>
                        </group>
                    </div>
                    <div class="submitBox">
                        <x-button type="primary" action-type="button">提交注册</x-button>
                    </div>
                    <div class="agreementBox">
                        <a href="#" class="text">UR用户使用协议</a>
                    </div>
                </div>
            </div>
        </scroller>
    </div>
</template>
<script>
    import {XHeader, Scroller,XInput,Datetime,XAddress,XButton,Group,ChinaAddressData  } from 'vux'
    export default {
        components: {
            XHeader,
            Scroller,
            XInput,
            Datetime,
            XAddress,
            XButton,
            Group
        },
        data () {
            return {
                title: '默认为空',
                iconType: '',
                value2: '',
                addressData: ChinaAddressData,
                value1:[],
                china_name: function (value) {
                    console.log(value)
                    return {
                        valid: /^[a-zA-Z]\w{5,17}$/.test(value),
                        msg: 'Must be 5-17个字的组合'
                    }
                }
            }
        },
        methods: {
            change (value) {
                console.log('change', value)
            },
            passwInvalid () {
                alert('只能输入2-4个字的汉字组合');
            },
            clearValue (value) {
                this.$data.value2 = ''
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
        background-size: 1rem 1rem;
        padding-left: 1.3rem;
    }
    input[type="radio"]:checked + span{
        background: url(../assets/images/circle_a.png) left center no-repeat;
        background-size: 1rem 1rem;
    }
    .vux-header {
        background-color: #AB9236 !important;
    }
    .header{
        background-color: #AB9236;
        padding-top: 1.25rem;
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
    }
    .weui-cells{
        margin-top: 0 !important;
    }
    .nameBox{
        padding-top: 0.75rem;
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
    }
    .mobileW{
        height: 0.8rem;
        width: 0.6rem;
        margin: 0 10px -2px 0;
    }
    .radioBox{
        padding: 0.95rem 0 1rem;
    }
    .vux-x-icon {
        fill: #AB9236;
    }
    .dateBox{
        position: relative;
    }
    .dateBox img{
        position: absolute;
        top: 0.45rem;
        right: 0.45rem;
    }
    .dateClass{
        width: 1.1rem;
    }
    .adressBox{
        padding-top: 0.6rem;
    }
    .submitBox{
        padding-top: 1.25rem;
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
        padding-top: 3.75rem;//todo  4.75
        padding: 3.75rem 0 1.2rem;
    }
    .agreementBox a{
        font-size: 0.6rem;
        text-decoration:underline;
    }
    .weui-cell_access .weui-cell__ft:after{
        display: none !important;
    }
</style>

