<template>
    <div class="page_myCoupon">
        <x-header :left-options="{backText: ''}">优惠券</x-header>
        <div class="tabTitle">
            <span :class="{active:titleTab==index}" v-for="(item, index) in titleList" @click="titleTab = index">{{item.name}}</span>
        </div>
        <div class="tabContain">
            <div class="tabItem tab-swiper" v-if="titleTab==0">
                <notused></notused>
            </div>
            <div class="tabItem" v-if="titleTab==1">
                <used></used>
            </div>
            <div class="tabItem" v-if="titleTab==2">
                <overdue></overdue>
            </div>
        </div>
    </div>
</template>
<script>
    import Notused from './coupon/notUsed.vue'
    import Used from './coupon/used.vue'
    import Overdue from './coupon/overdue.vue'
    import {XHeader, Scroller} from 'vux'
    export default {
        components: {
            XHeader, Scroller, Notused, Used, Overdue
        },
        data () {
            return {
                titleTab: 0,
                list2: ['未使用', '已使用', '过期'],
                index: 1,
                time: '',
                titleList: [
                    {
                        code: 0,
                        name: '未使用'
                    },
                    {
                        code: 1,
                        name: '已使用'
                    },
                    {
                        code: 2,
                        name: '过期'
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
    .page_myCoupon {
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