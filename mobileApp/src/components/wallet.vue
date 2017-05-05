<template>
    <div class="page_wallet">
        <x-header :left-options="{backText: ''}">我的钱包</x-header>
        <div class="tabDown">
            <cell style="background: #f2edda" is-link :border-intent="false" :arrow-direction="show ? 'up' : 'down'" @click.native="show = !show">
                <p>{{titleList[titleTab].name}}</p>
            </cell>

            <div class="slide" :class="show?'animate':''">
                <div class="slide-div">
                    <span :class="{active:titleTab==index}" v-for="(item, index) in titleList" @click="tabChange(index)">{{item.name}}</span>
                </div>
            </div>
        </div>

        <div class="tabContain">
            <div class="tabItem tab-swiper" v-if="titleTab==0">
                <giftCoupon></giftCoupon>
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
    import giftCoupon from './wallet/giftCoupon.vue'
    import {XHeader, Scroller, Cell} from 'vux'
    export default {
        components: {
            XHeader, Scroller, Integral, Coupon, giftCoupon, Cell
        },
        data () {
            return {
                show: false,
                titleTab: 0,
                index: 1,
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
        watch: {},
        created(){
            if (this.$route.query.tab) {
                this.titleTab = this.$route.query.tab;
            }
        },
        methods:{
            tabChange(index){
                this.titleTab = index;
//                this.$router.push({
//                    name:'wallet',
//                    query:{tab: index},
//                })
                this.show=false;
            }
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
                    color: #ab9236 !important;
                }
            }
            .weui-cell__ft:after{
                border-color: #ab9236;
            }
            .slide {
                padding: 0 1rem;
                width: 100%;
                overflow: hidden;
                max-height: 0;
                position: absolute;
                z-index: 1000;
                background: #FFFFFF;
                transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
                .slide-div{
                    padding-top: 1rem;
                    padding-bottom: .5rem;
                    font-size: 0;
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    justify-content: space-between;
                    span{
                        display: inline-block;
                        width: 4.2rem;
                        height: 1.6rem;
                        line-height: 1.5rem;
                        text-align: center;
                        border-radius: .15rem;
                        font-size: .75rem;
                        margin: 0 0 .5rem 0;
                        border: 1px solid #CDBE86;
                        background: #FFFFFF;
                        color: #999999;
                    }
                    span.active {
                        background: #CDBE86;
                        color: #fff;
                    }
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
