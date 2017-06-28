<template>
    <div class="page_used">
        <!--扫码和遮罩-->
        <x-dialog v-model="showNoScroll" class="dialog-demo" :scroll="false">
            <div @click.stop class="couponCode">
                <p class="couponCode-title">付款时交给店员扫一扫</p>
                <img class="couponCode-img" :src="barcodeUrl+'?text='+currentCode" alt=""/>
                <!--<p class="couponCode-code">{{currentCode}}</p>-->
                <p class="couponCode-code"></p>
                <div @click="hide" class="couponCode-close"></div>
            </div>
        </x-dialog>
        <!--优惠券-->
        <no-data v-show="couponList.length==0"></no-data>
        <div class="couponCon" v-for="(coupon,index) in couponList" v-show="couponList.length!=0">
            <div class="couList">
                <div class="couList-img">
                    <p class="couList-imgText">
                        <span class="imgText-symbol">￥</span>
                        <span class="imgText-money">50</span>
                    </p>
                    <p class="couList-imgType">{{coupon.thqName}}</p>
                </div>
                <div class="couList-text">
                    <p style="margin:0;font-size: .7rem;color: #333333">券号：{{coupon.thqNO}}</p>
                    <p class="cou-type">{{coupon.scope}}</p>
                    <p style="margin:0;font-size: .6rem;color: #999999">有效期：{{coupon.startDate | date('YYYY-MM-DD')}}～{{coupon.endDate | date('YYYY-MM-DD')}}</p>
                    <div style="height: auto">
                        <p @click="explainShow(index+1)" class="couponExplain">礼券说明
                            <div v-if="explainList == index+1" class="arrow_down">></div>
                            <div v-if="explainList != index+1" class="couponRight">></div></p>
                        <p v-if="explainList == index+1" class="coupon-text">
                            <span v-if="coupon.msg">{{coupon.msg}}</span>
                            <span v-else>暂无说明</span>
                        </p>
                    </div>
                </div>
                <div v-show="isShow"  @click="showCode(coupon.thqNO)" class="couList-code"></div>
            </div>
        </div>
        <!--提示-->
        <toast v-model="showNoScroll2" type="text" :time="1000">{{warnText}}</toast>
    </div>
</template>
<script>
    import {XHeader, Scroller, XDialog, Toast} from 'vux'
    import noData from '../common/noData.vue'
    import {URL_getBarcode} from '../../services/index.js'
    export default {
        components: {
            XHeader, Scroller, XDialog, noData, Toast
        },
        props: {
            couponList:Array,
            isShow:Boolean
        },
        data () {
            return {
                explainList: '',
                index: null,
                showRight: true,
                showText: false,
                showNoScroll: false,
                showNoScroll2: false,
                currentCode:'',
                barcodeUrl:'',
                warnText:''
            }
        },
        mounted(){
        },
        watch: {},
        created(){
            this.barcodeUrl = URL_getBarcode;
        },
        methods: {
            showCode(code) {
                if(window.navigator.onLine==true){
                    this.showNoScroll = true;
                    this.currentCode = code;
                }else{
                    this.showNoScroll2 = true;
                    this.warnText = '网络超时，请重试'
                }
            },
            hide() {
                this.showNoScroll = false;
            },
            explainShow(index){
                if (this.explainList == index) {
                    this.explainList = null
                } else {
                    this.explainList = index
                }
            }
        },
        computed: {}
    }
</script>
<style lang="less" rel="stylesheet/less">
    .page_used {
        .weui-dialog {
            width: auto !important;
            max-width: none !important;
            top: 43% !important;
        }
        .couponCode {
            width: 12.5rem;
            height: 8rem;
            position: relative;
            background: white;
            .couponCode-title {
                width: 11rem;
                height: 2rem;
                line-height: 2rem;
                margin: .75rem auto;
                font-size: .6rem;
                text-align: center;
                color: #FF0018;
                border-bottom: 1px solid #CDBE86;
            }
            .couponCode-img {
                width: 10rem;
                height: 4.5rem;
            }
            .couponCode-code {
                font-size: .6rem;
            }
            .couponCode-close {
                position: absolute;
                width: .8rem;
                height: .8rem;
                background: url("../../assets/money_code3.png");
                background-size: cover;
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
                background-size: contain;
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
            .imgText-symbol {
                display: inline-block;
                font-size: .55rem;
            }
            .imgText-money {
                font-size: 1rem;
            }
            .couList-imgType {
                font-size: .75rem;
                color: #FFFFFF;
                margin-top: .65rem;
                transform: scale(.88);
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
                position: relative;
            }

            .couponRight {
                position: absolute;
                color: #F68B79;
                top: 3.8rem;
                right: 9rem;
            }
            .couponRight:before {
                position: absolute;
                content: '';
                height: 1px;
                width: 2.8rem;
                background: #F68B79;
                left: -2.6rem;
                bottom: -1px;
            }
            .arrow_down{
                position: relative;
                color: #F68B79;
                top: 3.8rem;
                right: 9rem;
            }

            div.arrow_down{
                position: absolute;
                transform:rotate(90deg);
                -ms-transform:rotate(90deg); /* IE 9 */
                -moz-transform:rotate(90deg); /* Firefox */
                -webkit-transform:rotate(90deg); /* Safari and Chrome */
                -o-transform:rotate(90deg); /* Opera */
            }
            .coupon-text {
                font-size: .6rem;
                margin-top: .35rem;
                width: 9.55rem;
                height: 1.6rem;
                color: #999999
            }
            .cou-type {
                margin: .2rem 0 .2rem 0;
                width: 3.5rem;
                height: 1rem;
                color: #FFFFFF;
                font-size: .6rem;
                line-height: 1rem;
                text-align: center;
                background: #F68B79;
            }
            .couList-code {
                width: 1.5rem;
                height: 1.5rem;
                position: absolute;
                top: 1.5rem;
                right: 0;
                background: url("../../assets/money_code2.png");
                background-size: cover;
            }
        }
    }
</style>
