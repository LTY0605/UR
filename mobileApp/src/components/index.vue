/**
* Created by tanyichao on 2017/3/15.
*/
<template>
    <div class="page_index">
        <!--主页头部-->
        <div class="head">
            <x-header :left-options="{backText:''}"></x-header>
            <p class="head-name">Sara Chen</p>
            <div class="head-img">
                <img src="../assets/header.png" alt=""/>
            </div>
            <router-link to="/personMain">
                <div class="edit"></div>
            </router-link>
            <div  @click="show" class="code"></div>
            <flexbox :gutter="0">
                <flexbox-item><div class="headTab vip">
                    <p class="vip-text">8urP18121300</p>
                    <p class="vip-title">银卡会员</p>
                </div></flexbox-item>
                <flexbox-item><div class="headTab integral">
                    <p class="vip-text">18800</p>
                    <p class="vip-title">积分</p>
                </div></flexbox-item>
            </flexbox>
        </div>
        <!--售前售后-->
        <div class="tab">
            <grid :rows="4">
                <grid-item>
                    <img class="tab-img" slot="icon" src="../assets/icon_index_book.png">
                    <p class="tab-text">所有订单</p>
                </grid-item>
                <grid-item>
                    <p class="tab-badge">{{badge}}</p>
                    <img class="tab-img" slot="icon" src="../assets/icon_book_on.png">
                    <p class="tab-text">待付款</p>
                </grid-item>
                <grid-item>
                    <img class="tab-img" slot="icon" src="../assets/icon_car.png">
                    <p class="tab-text">待发货</p>
                </grid-item>
                <grid-item>
                    <img class="tab-img money" slot="icon" src="../assets/icon_money.png">
                    <p class="tab-text">售后</p>
                </grid-item>
            </grid>
        </div>
        <!--钱包-->
        <div class="wallet">
            <group>
                <cell title="我的钱包" link="./wallet"></cell>
                <ul>
                    <li v-for="(wallet,index) in wallets">
                        <p class="wallet-num">{{wallet.num}}</p>
                        <p>{{wallet.name}}</p>
                    </li>
                </ul>
            </group>
        </div>
        <!--账单-->
        <div class="wallet">
            <group>
                <cell title="我的账单" link="./myBill"></cell>
                <cell class="bill" title="消费明细">
                    <img slot="icon" width="12" src="../assets/icon_sm.png"/>
                </cell>
                <cell class="bill detail" title="积分明细">
                    <img slot="icon" width="12" src="../assets/icon_list.png"/>
                </cell>
            </group>
        </div>
        <!--活动-->
        <div class="action">
            <group>
                <cell title="会员活动" link="./wallet"></cell>
                <ul>
                    <li v-for="(action,index) in actions">
                        <img width="24" :src="action.actionImg"></img>
                        <p class="action-text">{{action.actionText}}</p>
                    </li>
                </ul>
                <div class="action-img">
                    <img src="../assets/banner.png" alt=""/>
                </div>
            </group>
        </div>
        <!--二维码-->
        <div @click="hide">
            <x-dialog v-model="showNoScroll"  class="dialog-demo" :scroll="false">
                <div @click.stop class="couponCode">
                    <img class="couponCode-img" src="../assets/money_code2.png" alt=""/>
                </div>
            </x-dialog>
        </div>
    </div>

</template>
<script>
    import {XHeader, Flexbox, FlexboxItem, Grid, GridItem, Group, Cell, XDialog} from 'vux'
    export default {
        components: {
            XHeader, Flexbox, FlexboxItem, Grid, GridItem, Group, Cell, XDialog
        },
        data(){
            return{
                showNoScroll:false,
                badge: 3,
                wallets:[
                    {num:'2',name:'礼品卡'},
                    {num:'3',name:'优惠券'},
                    {num:'18800可兑换',name:'积分'}
                ],
                actions:[
                    {actionImg: require('../assets/icon_save.png'),actionText:'调查问卷'},
                    {actionImg: require('../assets/icon_dialog.png'),actionText:'时尚体验'}
                ]
            }
        },
        mounted(){
        },
        watch: {},
        created(){
        },
        methods:{
            show:function () {
                this.showNoScroll = true;
            },
            hide:function () {
                this.showNoScroll = false;
            }
        },
        computed: {}
    }
</script>
<style lang="less" rel="stylesheet/less">
    .page_index{
        .vux-header {
            background-color: rgba(0,0,0,0) !important;
            width: 100%;
            padding: 0;
        }
        .vux-header .vux-header-title, .vux-header h1 {
            font-size: .85rem;
        }
        .vux-header .vux-header-left .left-arrow:before{
            border: 1px solid #FFFFFF;
            border-width: 1px 0 0 1px;
        }
        .head{
            width: 100%;
            height: auto;
            background: radial-gradient(rgba(171,146,54,0.6),rgba(171,146,54,1));
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            .head-img{
                width: 4.75rem;
                height: 4.75rem;
                border-radius: 50%;
                background: rgba(255,255,255,0.5);
                margin-bottom: 1.5rem;
                padding: 2px;
                img{
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
            }
            .head-name{
                font-size: .9rem;
                color: #FFFFFF;
                margin-bottom: .75rem;
            }
            .edit{
                position: absolute;
                width: 1rem;
                height: 1rem;
                background: url("../assets/icon_index_edit.png");
                background-size: 100%;
                background-repeat: no-repeat;
                bottom: 3.3rem;
                left: 1rem;
            }
            .code{
                position: absolute;
                width: 1.15rem;
                height: .85rem;
                background: url("../assets/icon_index_code.png");
                background-size: 100%;
                background-repeat: no-repeat;
                bottom: 3.3rem;
                right: 1rem;
            }
            .headTab{
                width: 100%;
                height: auto;
                padding: .5rem 0 .5rem 0;
                border-top: 1px solid #C9B774;
                border-left: 1px solid #C9B774;
            }
            .vip{
                border-left: none;
                display: flex;
                flex-direction: column;
                align-items: center;
                .vip-text{
                    font-size: .75rem;
                    color: #FFFFFF;
                }
                .vip-title{
                    font-size: .6rem;
                    color: #564712;
                }
            }
            .integral{
                display: flex;
                flex-direction: column;
                align-items: center;
                .vip-text{
                    font-size: .75rem;
                    color: #FFFFFF;
                }
                .vip-title{
                    font-size: .6rem;
                    color: #564712;
                }
            }
        }
        .tab{
            .vux-badge{
                background: rgba(255,255,255,1);
                border: 1px solid #FF0000;
                color: #FF0000;
                font-size: .65rem;
                height: .8rem;
                line-height: .65rem;
                border-radius: 50%;
            }
            .weui-grids{
                border-bottom: .35rem solid #E5E5E5;
            }
            .weui-grids:before{
                border: none;
            }
            .weui-grid{
                padding: .9rem;
            }
            .weui-grid:before{
                border: none !important;
            }
            .weui-grid:after{
                border: none !important;
            }
            .weui-grid__icon{
                height: 1.5rem;
            }
            .weui-grid__icon img{
                margin: 0 auto;
            }
            .tab-img{
                height: 1rem;
                width: 1.25rem;
            }
            .money{
                width: 1rem ;
                text-align: center;
            }
            .tab-text{
                font-size: .6rem;
                color: #333333;
                text-align: center;
            }
            .tab-badge{
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
        .wallet{
            border-bottom: .35rem solid #E5E5E5;
            ul{
                list-style: none;
                font-size: 0;
            }
            li{
                display: inline-block;
                width: 33.33%;
                margin: 0;
                padding: 0;
                font-size: .6rem;
                padding: .5rem 0 .9rem 0;
                text-align: center;
                color: #333333;
            }
            .vux-label{
                font-size: .75rem;
                color: #333333;
            }
            .weui-cells{
                margin-top: 0 !important;
                padding: 0 1rem;
            }
            .weui-cell{
                padding: .6rem 0 .5rem 0;
                border-bottom: 1px solid #D2D2D2;
            }
            .weui-cell:before{
                left: .75rem !important;
                right: .75rem !important;
                border: none;
            }
            .weui-cells:after{
                border-bottom: 3px solid white;
            }
            .wallet-num{
                color: #FF0000;
                margin-bottom: .4rem;
            }
        }
        .bill{
            padding: .3rem 0 !important;
            .vux-label{
                font-size: .65rem;
                color: #333333;
                margin-left: .2rem;
            }
        }
        .detail{
            .weui-cell__hd{
                img{
                    margin-bottom: .1rem;
                }
            }
        }
        .action{
            .vux-label{
                font-size: .75rem;
                color: #333333;
            }
            .weui-cells{
                margin-top: 0 !important;
                padding: 0 1rem;
            }
            .weui-cell{
                padding: .6rem 0 .5rem 0;
                border-bottom: 1px solid #D2D2D2;
            }
            .weui-cell:before{
                left: .75rem !important;
                right: .75rem !important;
                border: none;
            }
            .weui-cells:after{
                border: none !important;
            }
            ul{
                list-style: none;
                font-size: 0;
            }
            li{
                display: inline-block;
                width: 25%;
                margin: 0;
                padding: 0;
                font-size: .6rem;
                padding: .6rem 0 1rem 0;
                text-align: center;
                color: #333333;
            }
            .action-text{
                margin-top: .4rem;
                color: #333333;
            }
        }
        .action-img{
            width: 100%;
            height: 5rem;
            margin-bottom: 1rem;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .weui-dialog{
            width: auto !important;
            max-width: none !important;
            top: 43% !important;
        }
        .couponCode{
            width: auto;
            height: auto;
            position: relative;
            background: white;
            .couponCode-img{
                margin: 2rem 2rem 1.75rem 2rem;
                width: 8rem;
                height: 8rem;
            }
        }
    }
</style>
