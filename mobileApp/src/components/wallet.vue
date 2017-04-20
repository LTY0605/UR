<template>
    <div class="page_wallet">
        <x-header :left-options="{backText: ''}">我的钱包</x-header>
        <div class="tabTitle">
            <span :class="{active:titleTab==index}" v-for="(item, index) in titleList" @click="titleTab = index">{{item.name}}</span>
        </div>
        <div class="tabContain">
            <div class="tabItem tab-swiper" v-if="titleTab==0">
                111
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
    import {XHeader, Scroller, Tab, TabItem, Swiper, SwiperItem, Calendar, Cell, Group, InlineCalendar} from 'vux'
    export default {
        components: {
            XHeader, Scroller, Tab, TabItem, Swiper, SwiperItem, Integral, Calendar, Cell, Group, InlineCalendar,
            Coupon
        },
        data () {
            return {
                titleTab: 0,
                list2: ['礼品卡', '优惠券', '积分'],
                index: 1,
                time: '',
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
        },
        computed: {}
    }
</script>
<style lang="less" rel="stylesheet/less">
    .vux-header {
        background-color: #AB9236 !important;
    }

    .vux-header .vux-header-title, .vux-header h1 {
        font-size: .85rem;
    }

    .page_wallet {
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
