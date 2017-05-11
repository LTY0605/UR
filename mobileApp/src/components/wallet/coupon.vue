<template>
    <div class="page_coupon">
        <dropDown title="优惠券" :titleTab="1"></dropDown>
        <div class="couponTab">
            <span :class="{active:titleTab==index}" v-for="(item,index) in titleList" @click="changeItem(index,item.code)">
                {{item.name}}
            </span>
        </div>

        <div class="tabItem">
            <used :couponList="couponList"></used>
        </div>
        <!--<div v-if="titleTab==0">-->
            <!--<notUsed></notUsed>-->
        <!--</div>-->
        <!--<div class="tabItem" v-if="titleTab==2">-->
            <!--<overdue></overdue>-->
        <!--</div>-->
    </div>
</template>
<script>
    import dropDown from './dropDown.vue'
    import {
        couponListService
    } from '../../services/wallet.js'
    import NotUsed from '../coupon/notUsed.vue'
    import Used from '../coupon/used.vue'
    import Overdue from '../coupon/overdue.vue'
    import {XHeader, Scroller} from 'vux'
    export default {
        components: {
            XHeader, Scroller, NotUsed, Used, Overdue, dropDown
        },
        data () {
            return {
                titleTab: 0,
                currentCode:0,
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
                couponList: []
            }
        },
        mounted(){
        },
        watch: {},
        created(){
            this.renderData();
        },
        methods:{
            changeItem(index, code){
                this.currentCode = code;
                this.titleTab = index;
                this.renderData();
            },
            renderData(){
                couponListService().save({
                    cardcode: window.localStorage.getItem("cardcode"),
                    status:this.currentCode
                }).then(res => {
                    let body = res.body;
                    if (body.errcode == 0) {
                        this.couponList = body.list;
                    }else{
                        this.showNoScroll = true;
                        this.warnText = body.errmsg;
                    }

                }, res => {

                })
            },
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
                font-size: .7rem;
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
