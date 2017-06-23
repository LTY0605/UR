<template>
    <div class="page_integral">
        <dropDown title="积分" :titleTab="2"></dropDown>
        <!--积分头部-->
        <div class="integralTop">
            <div class="integralTop-img">
                <h1 class="integralTop-h1">{{integralTotal}}</h1>
                <p class="integralTop-p">可用积分</p>
            </div>
            <router-link to="http://www.ur.cn/wap/member_role.html">
                <span class="integralTop-text">积分规则</span>
            </router-link>
        </div>
        <!--积分列表-->
        <group class="integralList">
            <div @click="show">
                <cell title="积分使用码">
                    <img class="listImg" slot="icon" width="16" src="../../assets/icon_gift.png">
                    <img class="listRight" @click="show" slot="icon" width="15" src="../../assets/icon_money_code.png">
                </cell>
            </div>
            <div @click="goLink">
                <cell title="积分商城">
                    <img class="listImg" slot="icon" width="16" src="../../assets/icon_home.png">
                    <img class="listRight" slot="icon" width="7" src="../../assets/icon_right_on.png">
                </cell>
            </div>
            <router-link to="/integralS">
                <cell title="积分查询">
                    <img class="listImg" slot="icon" width="16" alt="图片" src="../../assets/icon_search.png">
                    <img class="listRight" slot="icon" width="7" alt="图片" src="../../assets/icon_right_on.png">
                </cell>
            </router-link>
        </group>
        <!--积分使用码-->
        <x-dialog v-model="showNoScroll" class="dialog-demo" :scroll="false">
            <div @click.stop class="integralCode">
                <p class="integralCode-title">积分使用时交给店员扫一扫</p>
                <img class="integralCode-img" :src="barcode+'?text='+paymentCode" alt="图片"/>
                <div @click="hide" class="integralCode-close"></div>
            </div>
        </x-dialog>
        <!--温馨提示-->
        <toast v-model="showNoScroll2" type="text" :time="1000">{{warnText}}</toast>
        <!--<alert class="alert" v-model="showNoScroll3" title="积分规则">{{integralRule}}</alert>-->
    </div>
</template>
<script>
    import dropDown from './dropDown.vue'
    import {URL_getBarcode} from '../../services/index.js'
    import {paymentCode, integralCode} from '../../services/wallet.js'
    import {XHeader, XDialog, Scroller, Group, Cell, Alert, Toast} from 'vux'
    export default {
        components: {
            XHeader, Scroller, Group, Cell, XDialog, Alert, Toast, dropDown
        },
        data () {
            return {
                integralTotal: '',   //可用积分
                paymentCode: '',    //积分使用码
                barcode: '',
                warnText: '',
                showNoScroll: false,
                showNoScroll2: false,
//                integralRule:'',
//                showNoScroll3:false
            }
        },
        methods: {
            goLink(){
                this.showNoScroll2 = true;
                this.warnText = "敬请期待";
            },
            show(){
                this.showNoScroll = true;
            },
            hide(){
                this.showNoScroll = false;
            },
            codeData(){
                paymentCode().save({
                    cardcode: window.localStorage.getItem('cardcode')
                }).then(res => {
                    let body = res.body;
                    if (body.errcode == 0) {
                        this.paymentCode = body.paymentCode;
                    } else {
                        this.showNoScroll2 = true;
                        this.warnText = body.msg;
                    }
                }, res => {
                    this.showNoScroll2 = true;
                    this.warnText = "网络超时，请重试";
                })
            },
            integralData(){
                integralCode().save({
                    cardcode: window.localStorage.getItem('cardcode')
                }).then(res => {
                    let body = res.body;
                    if (body.errcode == 0) {
                        this.integralTotal = body.integralTotal;
                    } else {
                        this.showNoScroll2 = true;
                        this.warnText = body.errmsg;
                    }
                }, res => {
                    this.showNoScroll2 = true;
                    this.warnText = "网络超时，请重试";
                })
            }
        },
        mounted(){
        },
        watch: {},
        created(){
            this.codeData();
            this.integralData();
            this.barcode = URL_getBarcode;
        },
        computed: {}
    }
</script>
<style lang="less" rel="stylesheet/less">
    .page_integral {
        .vux-label {
            font-size: .75rem;
            color: #564712;
        }
        .weui-cells {
            margin-left: 1rem;
            margin-right: 1rem;
        }
        .weui-cells:before {
            top: -1px !important;
        }
        .weui-cell {
            padding: 10px 0 !important;
        }
        .weui-cell:before {
            left: 0 !important;
        }
        .weui-dialog {
            width: auto !important;
            max-width: none !important;
            top: 35% !important;
        }
        .alert {
            .weui-dialog {
                width: 80% !important;
            }
        }
        .integralCode {
            width: 12.5rem;
            height: 8rem;
            position: relative;
            background: white;
            .integralCode-title {
                width: 11rem;
                height: 2rem;
                line-height: 2rem;
                margin: .75rem auto;
                font-size: .6rem;
                text-align: center;
                color: #FF0018;
                border-bottom: 1px solid #CDBE86;
            }
            .integralCode-img {
                width: 7.85rem;
                height: 3.5rem;
            }
            .integralCode-code {
                font-size: .6rem;
            }
            .integralCode-close {
                position: absolute;
                width: .8rem;
                height: .8rem;
                background: url("../../assets/money_code3.png");
                background-size: cover;
                top: -.15rem;
                right: .6rem;
            }
        }
        .integralTop {
            position: relative;
            display: inline-block;
            width: 100%;
            height: 16rem;
            background: url("../../assets/background1.png");
            background-size: 100% 100%;
            background-repeat: no-repeat;
        }
        .integralTop-img {
            display: inline-block;
            width: 12rem;
            height: 14rem;
            background: url("../../assets/background2.png");
            background-size: 100% 100%;
            margin: .85rem auto 0 auto;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        .integralTop-h1 {
            margin-top: 1.2rem;
            margin-bottom: 0;
            font-size: 3rem;
            font-weight: 100;
            color: #AB9236;
        }
        .integralTop-p {
            margin-top: -.3rem;
            font-size: .75rem;
            color: #AB9236;
        }
        .integralTop-text {
            position: absolute;
            right: 1.05rem;
            bottom: .9rem;
            font-size: .75rem;
            color: #F67982;
        }
        .integralList {
            margin-top: -.62rem;
            .weui-cell {
                border-bottom: 1px solid #D9D9D9;
            }
            .weui-cell:before {
                border: none;
            }
            .weui-cells:after {
                border: none;
            }
            .listImg {
                display: inline-block;
                margin-right: .25rem;
                margin-top: .2rem;
            }
            .listRight {
                position: absolute;
                right: 0;
                top: .75rem;
            }
        }
    }
</style>
