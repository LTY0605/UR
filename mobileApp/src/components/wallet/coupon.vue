<template>
    <div class="page_coupon">
        <div class="couponTab">
            <span :class="{active:titleTab==index}" v-for="(item,index) in titleList" @click="titleTab = index">
                {{item.name}}
            </span>
        </div>
        <div v-if="titleTab==0">
            <couponlist></couponlist>
        </div>
        <div class="tabItem" v-if="titleTab==1">
            <couponlist></couponlist>
        </div>
        <div class="tabItem" v-if="titleTab==2">
            <couponlist></couponlist>
        </div>
    </div>
</template>
<script>
    import Couponlist from '../coupon/couponList.vue'
    import {XHeader, Scroller} from 'vux'
    export default {
        components: {
            XHeader, Scroller, Couponlist
        },
        data () {
            return {
                titleTab: 0,
                list2: ['礼品卡', '优惠券', '积分'],
                index: 1,
                time: '',
//                show: true,
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
                couponList: [
                    {
                        money: '50', type: '生日礼券', number: '8999305128', shop:'线下门店',
                        startTime:'2017.04.12',endTime:'2017.04.30'
                    },
                    {
                        money: '30', type: '购物礼券', number: '8229305128', shop:'线上网店',
                        startTime:'2017.04.12',endTime:'2017.04.30'
                    },
                    {
                        money: '50', type: '生日礼券', number: '8999305128', shop:'线下门店',
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
        computed: {}
    }
</script>
<style lang="less" rel="stylesheet/less">
    .left-arrow:before{
        border: 1px solid #FFFFFF !important;
        border-width: 1px 0 0 1px !important;
    }
    .page_coupon {
        .couponTab {
            width: 89.6%;
            height: 1.25rem;
            font-size: 0;
            margin: 1rem auto .45rem auto;
            span {
                font-size: .6rem;
                display: inline-block;
                height: 1.25rem;
                line-height: 1.15rem;
                vertical-align: top;
                text-align: center;
                width: 33.33%;
                background: #FFFFFF;
                color: #EC6941;
                border-top: 1px solid #EC6941;
                border-bottom: 1px solid #EC6941;
                position: relative;
            }
            span:before {
                content: '';
                position: absolute;
                right: 0;
                width: 1px;
                height: 100%;
                background: #EC6941;
            }
            span:last-child:before {
                width: 0px !important;
            }
            span:first-child {
                border-left: 1px solid #EC6941;
                border-top-left-radius: 3px;
                border-bottom-left-radius: 3px;
            }
            span:last-child {
                border-right: 1px solid #EC6941;
                border-top-right-radius: 3px;
                border-bottom-right-radius: 3px;
            }
            span.active {
                background: #EC6941;
                color: #FFFFFF;
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
                margin: 0 auto 0 auto;
                position: relative;
            }
            .couList-img {
                width: 3.8rem;
                height: 4.56rem;
                margin: .62rem 0 .62rem 0;
                position: relative;
            }
            .couList-img > p {
                position: absolute;
                top: .9rem;
                left: .75rem;
                color: #C5B166;
                padding: 0;
                margin: 0;
            }
            .couList-img > span {
                position: absolute;
                display: block;
                font-size: .45rem;
                bottom: 1.35rem;
                left: .77rem;
                color: #C5B166
            }
            .couList-text {
                margin-left: .6rem;
                margin-top: .75rem;
                height: 4rem;
                width: auto;
            }
            .couList-text > a {
                color: #F68B79;
                font-size: .6rem;
                display: block;
                margin-top: .15rem;
                position: relative;
            }
            .couList-text > a:before {
                content: '';
                position: absolute;
                height: 1px;
                width: 2.8rem;
                background: #F68B79;
                bottom: -1px;
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
                bottom: 2.5rem;
                right: 0;
            }
            .couList-code > img {
                width: 100%;
            }
        }
    }
</style>