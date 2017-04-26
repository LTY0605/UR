<template>
    <div class="page_wallet">
        <x-header :left-options="{backText: ''}">我的钱包</x-header>
        <div class="tabDown">
            <cell style="background: #C5B166" :border-intent="false" :arrow-direction="showContent004 ? 'up' : 'down'"
                    @click.native="showContent004 = !showContent004" is-link>
                <p>礼品卡</p>
            </cell>

            <div class="slide" :class="showContent004?'animate':''">
                <div style="padding-top: .5rem;padding-bottom: .1rem;font-size: 0">
                    <span :class="{active:titleTab==index}" v-for="(item, index) in titleList" @click="titleTab = index;showContent004=false">{{item.name}}</span>
                </div>
            </div>
        </div>

        <div class="tabContain">
            <div class="tabItem tab-swiper" v-if="titleTab==0">
                <card></card>
            </div>
            <div class="tabItem" v-if="titleTab==1">
                <coupon></coupon>
            </div>
            <div class="tabItem" v-if="titleTab==2">
                <integral></integral>
            </div>
        </div>
    </div>
</template>
<script>
    import Integral from './wallet/integral.vue'
    import Coupon from './wallet/coupon.vue'
    import Card from './wallet/card.vue'
    import {XHeader, Scroller, Cell} from 'vux'
    export default {
        components: {
            XHeader, Scroller, Integral, Coupon, Card, Cell
        },
        data () {
            return {
                showContent004: false,
                titleTab: 0,
                list2: ['礼品卡', '优惠券', '积分'],
                index: 1,
                time: '',
                tabTitle: '礼品卡',
                titleList: [
                    {
                        code: 0,
                        name: '礼品卡'
                    },
                    {
                        code: 1,
                        name: '优惠券'
                    },
                    {
                        code: 2,
                        name: '积分'
                    }
                ],

            }
        },
        mounted(){
        },
        methods:{
            downTab:function () {
                this.showContent004 = false;
            }
        },
        watch: {},
        created(){
        },
        computed: {}
    }
</script>
<style lang="less" rel="stylesheet/less">
    .page_wallet {
        .tabDown{
            .vux-label{
                text-align: center;
            }
            .weui-cell__ft{
                padding: 0 !important;
                width: 100%;
                text-align: center;
                p{
                    font-size: .75rem !important;
                    color: #FFFFFF !important;
                }
            }
            .weui-cell__ft:after{
                border-color: #FFFFFF !important;
            }
            .slide {
                border-top: 1px solid #F2EDDA;
                padding: 0 1rem;
                width: 100%;
                overflow: hidden;
                max-height: 0;
                position: absolute;
                z-index: 1000;
                background: rgba(200,185,120,1);
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
            span{
                display: inline-block;
                width: 3.7rem;
                height: 1.5rem;
                line-height: 1.5rem;
                text-align: center;
                border-radius: .3rem;
                font-size: .75rem;
                margin: 0 .24rem .5rem .24rem;
                background: #F2EDDA;
                color: #CDBE86;
            }
            span.active {
                 background: #CDBE86;
                 color: #fff;
                border: 1px solid #F2EDDA;
            }
        }
    .animate {
        max-height: 9999px;
        transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
        transition-delay: 0s;
    }
        }
        .vux-header {
            background-color: #AB9236 !important;
        }

        .vux-header .vux-header-title, .vux-header h1 {
            font-size: .85rem;
        }
        .tabTitle {
            width: 100%;
            height: 1.85rem;
            line-height: 1.85rem;
            font-size: 0;
            span {
                font-size: .75rem;
                display: inline-block;
                vertical-align: top;
                text-align: center;
                width: 33.33%;
                background: #F2EDDA;
                color: #CDBE86;
                border-left: 1px solid rgb(227,218,184);
                position: relative;
            }
            span:first-child {
                border: none;
            }
            span.active {
                background: #CDBE86;
                color: #fff;
            }
            span.active:after {
                content: '';
                border-style: solid;
                border-width: .35rem;
                border-color: transparent transparent #fff transparent;
                position: absolute;
                bottom: -1px;
                left: 48%;
                margin-left: -0.175rem;
                display: block;
            }
        }
        .tabContain {
            width: 100%;
            height: auto;
        }

    }
</style>
