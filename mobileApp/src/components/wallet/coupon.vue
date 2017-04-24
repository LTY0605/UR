<template>
    <div class="page_coupon">
        <div class="couponTab">
            <span :class="{active:titleTab==index}" v-for="(item,index) in titleList" @click="titleTab = index">
                {{item.name}}
            </span>
        </div>
        <div v-if="titleTab==0">
            <notUsed></notUsed>
        </div>
        <div class="tabItem" v-if="titleTab==1">
            <used></used>
        </div>
        <div class="tabItem" v-if="titleTab==2">
            <overdue></overdue>
        </div>
    </div>
</template>
<script>
    import NotUsed from '../coupon/notUsed.vue'
    import Used from '../coupon/Used.vue'
    import Overdue from '../coupon/Overdue.vue'
    import {XHeader, Scroller} from 'vux'
    export default {
        components: {
            XHeader, Scroller, NotUsed, Used, Overdue
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
    }
</style>