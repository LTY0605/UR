/**
* Created by tanyichao on 2017/3/15.
*/
<template>
    <div class="page_index">
        <!--主页头部-->
        <div class="head">
            <x-header :left-options="{showBack: false}"></x-header>
            <p class="head-name">{{customerName}}</p>
            <div class="head-img">
                <img :src="headimgurl" alt=""/>
            </div>
            <router-link :to="{name:'personMain',query:{tab:0}}">
                <div class="edit"></div>
            </router-link>
            <div @click="show" class="code"></div>
            <flexbox :gutter="0">
                <flexbox-item>
                    <div class="headTab vip">
                        <p class="vip-text">{{cardcode}}</p>
                        <p class="vip-title">银卡会员</p>
                    </div>
                </flexbox-item>
                <flexbox-item>
                    <div class="headTab integral">
                        <p class="vip-text">{{integral}}</p>
                        <p class="vip-title">积分</p>
                    </div>
                </flexbox-item>
            </flexbox>
        </div>
        <!--售前售后-->
        <div class="tab">
            <grid :rows="4">
                <grid-item>
                    <img class="tab-img" slot="icon" src="../assets/icon_index_book.png" alt="图片">
                    <p class="tab-text">所有订单</p>
                </grid-item>
                <grid-item>
                    <p v-if="showUnpaid" class="tab-badge">{{unpaid}}</p>
                    <img class="tab-img" slot="icon" src="../assets/icon_book_on.png" alt="图片">
                    <p class="tab-text">待付款</p>
                </grid-item>
                <grid-item>
                    <img class="tab-img" slot="icon" src="../assets/icon_car.png" alt="图片">
                    <p class="tab-text">待发货</p>
                </grid-item>
                <grid-item>
                    <img class="tab-img money" slot="icon" src="../assets/icon_money.png" alt="图片">
                    <p class="tab-text">售后</p>
                </grid-item>
            </grid>
        </div>
        <!--钱包-->
        <div class="wallet">
            <group>
                <cell title="我的钱包" link="./integral"></cell>
                <ul>
                    <li class="li-card" @click="goToLink('giftCoupon')">
                        <p class="wallet-num">{{mycards}}</p>
                        <span class="color-style">礼品卡</span>
                    </li>
                    <li @click="goToLink('coupon')">
                        <p class="wallet-num">{{coupon}}</p>
                        <span class="color-style">优惠券</span>
                    </li>
                    <li class="li-integral" @click="goToLink('integral')">
                        <p class="wallet-num">{{integral}}可兑换</p>
                        <span class="color-style">积分</span>
                    </li>
                </ul>
            </group>
        </div>
        <!--账单-->
        <div class="wallet">
            <group>
                <cell title="我的账单" link="./myBill"></cell>
                <cell class="bill" title="消费明细" link="./myBill?tab=0">
                    <img slot="icon" width="12" src="../assets/icon_sm.png" alt="图片"/>
                </cell>
                <cell class="bill detail" title="积分明细" link="./myBill?tab=1">
                    <img slot="icon" width="12" src="../assets/icon_list.png" alt="图片"/>
                </cell>
                <cell class="bill detail" title="我的报表" link="./queryIndex">
                    <img slot="icon" width="12" src="../assets/icon_list.png" alt="图片"/>
                </cell>
            </group>
        </div>
        <!--活动-->
        <div class="action">
            <group>
                <cell title="会员活动"></cell>
                <ul>
                    <router-link to="quest">
                        <li>
                            <img width="24" src="../assets/icon_save.png" alt="图片"/>
                            <p class="action-text">调查问卷</p>
                        </li>
                    </router-link>
                    <li @click="goLink">
                        <img width="24" src="../assets/icon_dialog.png" alt="图片"/>
                        <p class="action-text">时尚体验</p>
                    </li>
                    <a href="http://weixin.ur.com.cn/app/index.php?i=2&c=mc&a=store&">
                        <li>
                            <img width="24" src="../assets/index_icon.png" alt="图片"/>
                            <p class="action-text">适用门店</p>
                        </li>
                    </a>
                </ul>
                <div class="action-img">
                    <img src="../assets/banner.png" alt="图片"/>
                </div>
            </group>
        </div>
        <!--二维码-->
        <!--<div @click="hide">-->
        <!--<x-dialog v-model="showNoScroll"  class="dialog-demo" :scroll="false">-->
        <!--<div @click.stop class="couponCode">-->
        <!--<img class="couponCode-img" :src="barcodeUrl+'?text='+cardcode+'&width=400&height=400'"  alt="图片">-->
        <!--<p class="couponCode-p">{{cardcode}}</p>-->
        <!--<div @click="hide" class="couponCode-close"></div>-->
        <!--</div>-->
        <!--</x-dialog>-->
        <!--</div>-->
        <x-dialog v-model="showNoScroll" class="dialog-demo" :scroll="false">
            <div @click.stop class="couponCode">
                <img class="couponCode-img" :src="barcodeUrl+'?text='+cardcode+'&width=400&height=400'" alt="图片">
                <p class="couponCode-p">{{cardcode}}</p>
                <div @click="hide" class="couponCode-close"></div>
            </div>
        </x-dialog>
        <!--提示-->
        <toast v-model="showNoScroll2" type="text" :time="1000">{{warnText}}</toast>
        <!--<alert class="alert" v-model="showNoScroll2" title="温馨提示">{{warnText}}</alert>-->
    </div>

</template>
<script>
    import {indexService} from '../services/wallet.js'
    import {URL_getQRCode} from '../services/index.js'
    import {XHeader, Flexbox, FlexboxItem, Grid, GridItem, Group, Cell, XDialog, Alert, Toast} from 'vux'
    export default {
        components: {
            XHeader, Flexbox, FlexboxItem, Grid, GridItem, Group, Cell, XDialog, Alert, Toast
        },
        data(){
            return {
                barcodeUrl: '',
                integral: '',    //积分
                mycards: '',    //礼品卡
                coupon: '',     //优惠券
                unpaid: '',     //待付款
                cardcode: '',    //会员卡号
                customerName: '',    //会员姓名
                headimgurl: require('../assets/header.png'),  //头像地址
                warnText: '',
                customerName: '',
                showUnpaid: true,
                showNoScroll: false,
                showNoScroll2: false,
                /*  actions:[
                 {actionImg: require('../assets/icon_save.png'),actionText:'调查问卷'},
                 {actionImg: require('../assets/icon_dialog.png'),actionText:'时尚体验'}
                 ]*/
            }
        },
        watch: {},
        created(){
            //获取wxopenId
            this.renderOpen();

            this.personData();
            this.renderData();
            //待付款没有时不显示红点数字1
            this.payment();
            this.barcodeUrl = URL_getQRCode;
        },
        mounted(){
        },
        methods: {
            //获取wxopenId
            renderOpen(){
                let wxOpenId = this.getParams("wxOpenId");
                //let wxOpenId = 'odaBLwEfMOFDB5ATyqZwQco5Aaxo';
                if (wxOpenId && wxOpenId != '') {
                    window.localStorage.setItem("wxOpenId", wxOpenId);
                }
                //如果缓存中没有mobileTel，就重新登录
                if (window.localStorage.getItem("mobileTel") == "") {
                    this.$router.push({
                        name: 'login',
                    });
                } else {
                    this.putLocal();
                }
            },
            getParams(paras) {
//                let url = decodeURI(location.href);
                let url = 'http://nianhui.ur.com.cn/front/#/personMain?wxOpenId=odaBLwI5ERI1Da5HXf6Kt3cIulPY';
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

            goStore(){
                this.$router.push({name: 'http://weixin.ur.com.cn/app/index.php?i=2&c=mc&a=store&'})
            },
            goToLink(url){
                this.$router.push({
                    name: url,
                });
            },
            goLink(){
                this.showNoScroll2 = true;
                this.warnText = '敬请期待'
            },
            personData(){
                if (window.localStorage.getItem('headimgurl') && window.localStorage.getItem('headimgurl') != '') {
                    this.headimgurl = window.localStorage.getItem('headimgurl');
                }
                this.customerName = window.localStorage.getItem('customerName');
                this.cardcode = window.localStorage.getItem('cardcode');
            },
            show() {
                if (window.navigator.onLine == true) {
                    this.showNoScroll = true;
                    this.currentCode = code;
                } else {
                    this.showNoScroll2 = true;
                    this.warnText = '网络超时，请重试'
                }
            },
            hide() {
                this.showNoScroll = false;
            },
            payment(){
                if (this.unpaid == null || this.unpaid == 0 || this.unpaid == '') {
                    this.showUnpaid = false;
                }
            },
            renderData(){
                var bool = true;
                pushHistory();
                function pushHistory() {
                    var state = {title: "title", url: "#"};
                    window.history.pushState(state, "title", "#");
                };
                window.onload = function () {
                    setTimeout(function () {
                        window.addEventListener('popstate', function () {
                            if (bool == true) {
                                this.window.opener = null;
                                window.close();
                            }
                        });
                    }, 0);
                };
                indexService().save({
                    cardcode: window.localStorage.getItem('cardcode')
                }).then(res => {
                    let body = res.body;
                    if (body.errcode == 0) {
                        this.integral = body.integral;
                        this.mycards = body.mycards;
                        this.unpaid = body.unpaid;
                        this.coupon = body.coupon;
                    } else {
                        this.showNoScroll2 = true;
                        this.warnText = body.errmsg;
                    }
                }, res => {
                    this.showNoScroll2 = true;
                    this.warnText = '请求错误';
                })
            }
        },
        computed: {}
    }
</script>
<style lang="less" rel="stylesheet/less">
    .page_index {
        .vux-header {
            background-color: rgba(0, 0, 0, 0) !important;
            width: 100%;
            padding: 0;
            a {
                content: "";
                position: absolute;
                width: 12px;
                height: 12px;
                border: 1px solid #fff;
                border-width: 1px 0 0 1px;
                -webkit-transform: rotate(315deg);
                -ms-transform: rotate(315deg);
                transform: rotate(315deg);
                top: .2rem;
                left: .2rem;
            }
        }
        .vux-header .vux-header-title, .vux-header h1 {
            font-size: .85rem;
        }
        .vux-header .vux-header-left .left-arrow:before {
            border: 1px solid #FFFFFF;
            border-width: 1px 0 0 1px;
        }
        .alert {
            .weui-dialog {
                width: 80% !important;
            }
        }
        .head {
            width: 100%;
            height: auto;
            background: radial-gradient(rgba(171, 146, 54, 0.6), rgba(171, 146, 54, 1));
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            .head-img {
                width: 4.75rem;
                height: 4.75rem;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                margin-bottom: 1.5rem;
                padding: 2px;
                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
            }
            .head-name {
                font-size: .9rem;
                color: #FFFFFF;
                margin-bottom: .75rem;
            }
            .edit {
                position: absolute;
                width: 1rem;
                height: 1rem;
                background: url("../assets/icon_index_edit.png");
                background-size: 100%;
                background-repeat: no-repeat;
                bottom: 3.3rem;
                left: 1rem;
            }
            .code {
                position: absolute;
                width: 1.15rem;
                height: .85rem;
                background: url("../assets/icon_index_code.png");
                background-size: 100%;
                background-repeat: no-repeat;
                bottom: 3.3rem;
                right: 1rem;
            }
            .headTab {
                width: 100%;
                height: 2.75rem;
                padding: .5rem 0 .5rem 0;
                border-top: 1px solid #C9B774;
                border-left: 1px solid #C9B774;
            }
            .vip {
                border-left: none;
                display: flex;
                flex-direction: column;
                align-items: center;
                .vip-text {
                    font-size: .75rem;
                    color: #FFFFFF;
                }
                .vip-title {
                    font-size: .6rem;
                    color: #564712;
                }
            }
            .integral {
                display: flex;
                flex-direction: column;
                align-items: center;
                .vip-text {
                    font-size: .75rem;
                    color: #FFFFFF;
                }
                .vip-title {
                    font-size: .6rem;
                    color: #564712;
                }
            }
        }
        .tab {
            .vux-badge {
                background: rgba(255, 255, 255, 1);
                border: 1px solid #FF0000;
                color: #FF0000;
                font-size: .65rem;
                height: .8rem;
                line-height: .65rem;
                border-radius: 50%;
            }
            .weui-grids {
                border-bottom: .35rem solid #E5E5E5;
            }
            .weui-grids:before {
                border: none;
            }
            .weui-grid {
                padding: .9rem;
            }
            .weui-grid:before {
                border: none !important;
            }
            .weui-grid:after {
                border: none !important;
            }
            .weui-grid__icon {
                height: 1.5rem;
            }
            .weui-grid__icon img {
                margin: 0 auto;
            }
            .tab-img {
                height: 1rem;
                width: 1.25rem;
            }
            .money {
                width: 1rem;
                text-align: center;
            }
            .tab-text {
                font-size: .6rem;
                color: #333333;
                text-align: center;
            }
            .tab-badge {
                position: absolute;
                color: #FF0000;
                width: .75rem;
                height: .75rem;
                font-size: .6rem;
                line-height: .65rem;
                border: 1px solid #FF0000;
                border-radius: 50%;
                background: #FFFFFF;
                text-align: center;
                top: .6rem;
                right: 1.4rem;
            }
        }
        .wallet {
            border-bottom: .35rem solid #E5E5E5;
            .li-integral {
                margin-right: 0 !important;
            }
            ul {
                list-style: none;
                font-size: 0;
                height: 3rem;
                margin: 0;
                padding: 0;
            }
            li {
                display: inline-block;
                width: 25%;
                padding: 0;
                font-size: .6rem;
                margin-top: .4rem;
                margin-right: 12%;
                text-align: center;
                color: #333333;
                .color-style {
                    color: #333333;
                }
            }
            .vux-label {
                font-size: .75rem;
                color: #333333;
            }
            .weui-cells {
                margin-top: 0 !important;
                padding: 0 1rem;
            }
            .weui-cell {
                padding: .6rem 0 .5rem 0;
                border-bottom: 1px solid #D2D2D2;
            }
            .weui-cell:before {
                left: .75rem !important;
                right: .75rem !important;
                border: none;
            }
            .weui-cells:after {
                border-bottom: 3px solid white;
            }
            .wallet-num {
                color: #FF0000;
                margin-bottom: .25rem;
            }
            .weui-cells .bill .weui-cell__ft:after {
                display: none;
            }
        }
        .bill {
            padding: .3rem 0 !important;
            .vux-label {
                font-size: .65rem;
                color: #333333;
                margin-left: .2rem;
            }
        }
        .detail {
            .weui-cell__hd {
                img {
                    margin-bottom: .1rem;
                }
            }
        }
        .action {
            .vux-label {
                font-size: .75rem;
                color: #333333;
            }
            .weui-cells {
                margin-top: 0 !important;
                padding: 0 1rem;
            }
            .weui-cell {
                padding: .6rem 0 .5rem 0;
                border-bottom: 1px solid #D2D2D2;
            }
            .weui-cell:before {
                left: .75rem !important;
                right: .75rem !important;
                border: none;
            }
            .weui-cells:after {
                border: none !important;
            }
            ul {
                list-style: none;
                font-size: 0;
            }
            li {
                display: inline-block;
                width: 25%;
                margin: 0;
                padding: 0;
                font-size: .6rem;
                padding: .6rem 0 1rem 0;
                text-align: center;
                color: #333333;
            }
            .action-text {
                margin-top: .4rem;
                color: #333333;
            }
        }
        .action-img {
            width: 100%;
            height: 5rem;
            margin-bottom: 1rem;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .weui-dialog {
            width: auto !important;
            max-width: none !important;
            top: 43% !important;
        }
        .couponCode {
            width: auto;
            height: auto;
            position: relative;
            background: white;
            .couponCode-img {
                width: 10rem;
                height: 10rem;
            }
            .couponCode-p {
                font-size: .75rem;
                margin-top: -1rem;
                margin-bottom: 1rem;
            }
            .couponCode-close {
                position: absolute;
                width: .8rem;
                height: .8rem;
                background: url("../assets/money_code3.png");
                background-size: 100%;
                top: .6rem;
                right: .6rem;
            }
        }
    }
</style>
