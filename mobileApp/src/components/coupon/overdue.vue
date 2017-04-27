<template>
    <div class="page_overdue">
        <!--扫码和遮罩-->
        <div @click="hide">
            <x-dialog v-model="showNoScroll"  class="dialog-demo" :scroll="false">
                <div @click.stop class="couponCode">
                    <p class="couponCode-title">付款时交给店员扫一扫</p>
                    <img class="couponCode-img" src="../../assets/money_code.png" alt=""/>
                    <p class="couponCode-code">{{moneyCode}}</p>
                    <div @click="hide" class="couponCode-close"></div>
                </div>
            </x-dialog>
        </div>
        <!--优惠券-->
        <div class="couponCon" v-for="(coupon,index) in couponList">
            <div class="couList">
                <div class="couList-img">
                    <p class="couList-imgText">
                        <span class="imgText-symbol">￥</span>
                        <span class="imgText-money">{{coupon.money}}</span>
                    </p>
                    <p class="couList-imgType">{{coupon.type}}</p>
                </div>
                <div class="couList-text">
                    <p style="margin:0;font-size: .75rem;color: #333333">券号：{{coupon.number}}</p>
                    <p class="cou-type">{{coupon.shop}}</p>
                    <p style="margin:0;font-size: .6rem;color: #999999">有效期：{{coupon.startTime}}～{{coupon.endTime}}</p>
                    <div style="height: auto">
                        <p @click="explainList = index+1" class="couponExplain">礼券说明
                            <span v-if="explainList != index+1" class="couponRight">></span></p>
                        <p v-if="explainList == index+1" class="coupon-text">本券只限于购买正价商品，每个订单 限用一张。</p>
                    </div>
                </div>
                <div @click="show" class="couList-code"></div>
            </div>
        </div>
    </div>
</template>
<script>
    import {XHeader, Scroller, XDialog} from 'vux'
    export default {
        components: {
            XHeader, Scroller, XDialog
        },
        data () {
            return {
                moneyCode:'8999301128',
                explainList:'',
                index:null,
                showRight:true,
                showText:false,
                showNoScroll:false,
                couponList: [
                    {
                        money: '50', type: '生日礼券', number: '8999305128', shop:'线下门店',
                        startTime:'2017.04.12',endTime:'2017.04.30'
                    },
                    {
                        money: '130', type: '购物礼券', number: '8229305128', shop:'线上网店',
                        startTime:'2017.04.12',endTime:'2017.04.30'
                    }
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
            },
            hideRight:function () {
                this.showText = !this.showText;
                this.showRight = !this.showRight;
            }
        },
        computed: {}
    }
</script>
<style lang="less" rel="stylesheet/less">
    .page_overdue {
    .weui-dialog{
        width: auto !important;
        max-width: none !important;
        top: 43% !important;
    }
    .couponCode{
        width: 12.5rem;
        height: 8rem;
        position: relative;
        background: white;
    .couponCode-title{
        width: 11rem;
        height: 2rem;
        line-height: 2rem;
        margin: .75rem auto;
        font-size: .6rem;
        text-align: center;
        color: #FF0018;
        border-bottom: 1px solid #CDBE86;
    }
    .couponCode-img{
        width: 7.85rem;
        height: 2.2rem;
    }
    .couponCode-code{
        font-size: .6rem;
    }
    .couponCode-close{
        position: absolute;
        width: .8rem;
        height: .8rem;
        background: url("../../assets/money_code3.png");
        background-size: 100%;
        top: -.15rem;
        right: .6rem;
    }
    }
    .couponCon {
        width: 100%;
        height: auto;
        margin: 0 auto;
        border-bottom: .35rem solid #E5E5E5;
    .couList {
        display: flex;
        width: 89.6%;
        height: auto;
        margin: 0 auto 0 auto;
        position: relative;
    }
    .couList-img {
        width: 3.8rem;
        height: 4.56rem;
        margin: .62rem 0 .62rem 0;
        position: relative;
        background: url("../../assets/money_new.png");
        background-repeat: no-repeat;
        background-size: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        font-size: 0;
    }
    .couList-imgText {
        color: #C5B166;
        padding: 0;
        margin-top: 1.25rem;
    }
    .imgText-symbol{
        display: inline-block;
        font-size:.55rem;
    }
    .imgText-money{
        font-size: 1rem;
        font-weight: 600;
    }
    .couList-imgType {
        font-size: .45rem;
        color: #FFFFFF;
        margin-top: .65rem;
        transform: scale(.8);
        width: 120%;
        text-align: center;
    }
    .couList-text {
        margin-left: .6rem;
        margin-top: .75rem;
        height: auto;
        width: auto;
        padding-bottom: .85rem;
    }
    .couponExplain {
        color: #F68B79;
        font-size: .6rem;
        margin-top: .15rem;
    }
    .couponRight{
        position: relative;
    }
    .couponRight:before {
        content: '';
        position: absolute;
        height: 1px;
        width: 2.8rem;
        background: #F68B79;
        left: -2.6rem;
        bottom: -1px;
    }
    .coupon-text{
        font-size: .6rem;
        margin-top: .35rem;
        width: 9.55rem;
        height: 1.6rem;
        color: #999999
    }
    .cou-type {
        margin: .2rem 0 .2rem 0;
        width: 2.9rem;
        height: .95rem;
        color: #FFFFFF;
        font-size: .6rem;
        line-height: .95rem;
        text-align: center;
        background: #F68B79;
    }
    .couList-code {
        width: 1.5rem;
        height: 1.5rem;
        position: absolute;
        top: 1.8rem;
        right: 0;
        background: url("../../assets/money_code2.png");
        background-size: 100%;
    }
    }
    }
</style>