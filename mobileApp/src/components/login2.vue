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
                <div class="nameBox">
                    <group>
                        <x-input
                            class="input input1 text"
                            placeholder="用户名"
                            is-type="china-name">
                            <img class="userW" slot="label" src="../assets/images/user.png">
                        </x-input>
                    </group>
                </div>
                <div class="mobileBox">
                    <group>
                        <x-input
                            class="input input1 text"
                            placeholder="手机号"
                            is-type="china-mobile">
                            <img class="mobileW" slot="label" src="../assets/images/Mobile.png">
                        </x-input>
                    </group>
                </div>
                <div class="radioBox">
                    <label class="text"><input type="radio">女生</label>
                    <label class="text"><input type="radio">男生</label>
                </div>
                <div class="datatimeBox">
                    <group class="dateBox">
                        <datetime
                            v-model="value2"
                            class="input input1 text textPadding"
                            @on-change="change"
                            title="出生日期"
                            clear-text="clear"
                            @on-clear="clearValue"></datetime>
                        <img class="dateClass" src="../assets/images/date.png" alt="">
                    </group>
                </div>
                <div class="adressBox">
                    <group>
                        <x-address
                            class="input input1 text"
                            title="选择地区"
                            raw-value :list="addressData"></x-address>
                    </group>
                </div>
                <div class="submitBox">
                    <x-button type="primary" action-type="button">提交注册</x-button>
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
                addressData: ChinaAddressData,
                value1:[]
            }
        },
        methods: {
            clearValue (value) {
                this.$data.value2 = ''
            },
            change (value) {
                console.log('change', value)
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
    .text{
        font-size: 0.75rem;
        color: #999 !important;
    }
    .vux-header {
        background-color: #AB9236 !important;
    }
    .header{
        background-color: #AB9236;
        padding-top: 1.55rem;
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
        font-size: 16px;
        text-align: center;
        color: #fff;
        padding: 0.4rem 0 0.65rem;
    }
    .nameBox{
        /*padding-top: 1.25rem;*/
    }
    .input{
        margin: 0 9.6%;
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
    .mobileW{
        height: 0.8rem;
        width: 0.6rem;
        margin: 0 10px -2px 0;
    }
    .mobileBox{
        padding-top: 0.6rem;
    }
    .radioBox{
        padding: 1rem 9.6% 0;
    }
    .datatimeBox{
        padding-top: 1rem;
    }
    .textPadding{

    }
    .weui-cell__ft{

    }
    .dateClass{
        width: 1.1rem;
    }
    .adressBox{
        padding-top: 0.6rem;
    }
    .submitBox{
        padding-top: 1.25rem;
        margin: 0 9.6%;
    }
    .weui-btn{
        background-color: #AB9236 !important;
    }
</style>

