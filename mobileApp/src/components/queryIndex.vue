/**
* Created by tanyichao on 2017/3/15.
*/
<template>
    <div class="page_query">
        <x-header :left-options="{backText:''}">我的报表</x-header>
        <div class="headInput">
            <input type="text" class="queryInput" placeholder="请选择" @focus="showSelect">
        </div>
        <popup v-model="show1" height="100%">
            <div class="popup1">
                <x-header :left-options="{backText:''}">我的报表</x-header>
                <group class="dateBox">
                    <datetime
                        :min-year=1900
                        cancelText="取消"
                        confirmText="确定"
                        v-model="dateTime"
                        class="input input1 text textPadding"
                        title="选择日期"></datetime>
                </group>
                <div class="query_item">
                    <div class="query_item_title">
                        地区
                        <span class="all">全部</span>
                    </div>
                    <div class="item_main">
                        <div class="query_item_title titleItem">
                            大区
                            <!--<span class="all">全部</span>-->
                        </div>
                        <div class="box">
                            <checker v-model="demo1CheckboxMax" type="checkbox" default-item-class="demo1-item"
                                     selected-item-class="demo1-item-selected">
                                <checker-item value="1">东区</checker-item>
                                <checker-item value="2">西区</checker-item>
                                <checker-item value="3">南区</checker-item>
                                <checker-item value="4">北区</checker-item>
                            </checker>
                        </div>
                    </div>
                    <div class="item_main">
                        <div class="query_item_title titleItem">
                            小区
                            <span class="all">全部</span>
                        </div>
                        <div class="box">
                            <checker v-model="demo2CheckboxMax" type="checkbox" default-item-class="demo1-item"
                                     selected-item-class="demo1-item-selected">
                                <checker-item value="1">东区一区</checker-item>
                                <checker-item value="2">东区二区</checker-item>
                                <checker-item value="3">东区三区</checker-item>
                                <checker-item value="4">东区四区</checker-item>
                            </checker>
                        </div>
                    </div>
                    <div class="item_main">
                        <div class="query_item_title titleItem">
                            城市
                            <span class="all">全部</span>
                        </div>
                        <div class="box">
                            <checker v-model="demo3CheckboxMax" type="checkbox" default-item-class="demo1-item"
                                     selected-item-class="demo1-item-selected">
                                <checker-item value="1">上海</checker-item>
                                <checker-item value="2">扬州</checker-item>
                                <checker-item value="3">南京</checker-item>
                                <checker-item value="4">合肥</checker-item>
                            </checker>
                        </div>
                    </div>
                    <div class="item_main">
                        <div class="query_item_title titleItem">
                            门店
                            <span class="all">全部</span>
                        </div>
                        <div class="box longBox">
                            <checker v-model="demo4CheckboxMax" type="checkbox" default-item-class="demo1-item"
                                     selected-item-class="demo1-item-selected">
                                <checker-item value="1">北京世贸工三店</checker-item>
                                <checker-item value="2">北京朝阳大悦城店</checker-item>
                                <checker-item value="3">北京王府井APM店</checker-item>
                                <checker-item value="4">北京凯德精品购物中心</checker-item>
                            </checker>
                        </div>
                    </div>
                </div>
                <p class="deliver"></p>
                <div class="query_item">
                    <div class="query_item_title">
                        风格
                        <span class="all">全部</span>
                    </div>
                </div>
            </div>
            <div class="operate">
                <span>重置</span>
                <span @click="sureSubmit">确定</span>
            </div>
        </popup>
    </div>
</template>
<script>
    import {
        registerService,
    } from '../services/person.js'
    import {XHeader, Scroller, Popup, Group, Datetime, Checker, CheckerItem} from 'vux'
    export default {
        components: {
            XHeader, Scroller, Popup, Group, Datetime, Checker, CheckerItem
        },
        mounted(){
        },
        data () {
            return {
                id: '',
                show1: false,
                dateTime: '',
                demo1CheckboxMax: '',
                demo2CheckboxMax: '',
                demo3CheckboxMax: '',
                demo4CheckboxMax:'',
            }
        },
        watch: {},
        created(){

        },
        methods: {
            showSelect() {
                this.show1 = true;
            },
            sureSubmit(){
                this.show1 = false;
            }
        },
        computed: {}
    }
</script>
<style lang="less" rel="stylesheet/less">
    .page_query {
        .vux-popup-dialog{
            overflow-y: auto;
            padding-bottom: 3rem;
        }
        .deliver{
            width: 100%;
            height: .3rem;
            background: #E5E5E5;
        }
        .vux-header {
            background-color: #AB9236 !important;
        }

        .vux-header .vux-header-title, .vux-header h1 {
            font-size: .85rem;
        }
        .headInput {
            padding: .5rem;

            .queryInput {
                display: block;
                width: 100%;
                height: 1.5rem;
                line-height: 1.5rem;
                border-radius: .25rem;
                border: 1px solid #ddd;
                background: url("../assets/icon_search1.png") no-repeat .5rem center;
                background-size: .8rem;
                padding-left: 1.5rem;
                outline: none;
            }
        }
        .vux-popup-dialog {
            background: #fff;
        }
        .weui-cells {
            margin-top: 0 !important;
        }
        .dateBox {
            padding: .5rem 1rem 0;
            .weui-cell_access .weui-cell__ft:after {
                display: none;
            }
            .weui-cell {
                background: url("../assets/images/date.png") 98% center no-repeat;
                background-size: 1rem;
                padding: 7px 20px 7px 15px;
                p,.vux-datetime-value {
                    color: #999;
                    font-size: .75rem;
                }
            }
            .input1 {
                border-radius: 0.2rem;
                border: 0.02rem solid #D2D2D2;
            }
        }
        .query_item {
            padding: .5rem 1rem .75rem 1rem;
            .query_item_title {
                height: 1.95rem;
                line-height: 1.95rem;
                color: #333;
                font-size: .75rem;
                border-bottom: 1px solid #ddd;
                .all {
                    color: #999;
                    display: inline-block;
                    height: 1.95rem;
                    line-height: 1.95rem;
                    float: right;
                    padding-right: 1rem;
                    background: url("../assets/icon_down.png") no-repeat right center;
                    -webkit-background-size:;
                    background-size: .6rem;
                    font-size: .7rem;
                }
            }
            .item_main {
                width: 100%;
                height: auto;
                .titleItem {
                    height: 2.1rem;
                    line-height: 2.1rem;
                    border: 0;
                }
                .vux-checker-box {
                    font-size: 0;
                    .vux-checker-item {
                        width: 22%;
                        padding: .5rem 0;
                        text-align: center;
                        font-size: .65rem;
                        margin-left: 4%;
                        background: #E5E5E5;
                        color: #999;
                        vertical-align: top;
                        margin-bottom: .5rem;
                    }
                    .vux-checker-item:nth-child(4n+1) {
                        margin-left: 0;
                    }
                    .demo1-item-selected {
                        background: #CDBE86;
                        color: #fff;
                    }
                }
                .longBox {
                    .vux-checker-box {
                        .vux-checker-item {
                            width: 48%;
                        }
                        .vux-checker-item:nth-child(2n+1){
                            margin-left: 0;
                        }
                    }
                }
            }
        }
        .operate{
            width: 100%;
            height: 2rem;
            line-height: 2rem;
            background: #EEEEEE;
            font-size: 0;
            position: fixed;
            bottom: 0;
            left: 0;
            span{
                width: 50%;
                display: inline-block;
                font-size: .75rem;
                color: #666;
                text-align: center;
            }
            span:last-child{
                background: #F23030;
                color: #fff;
            }
        }
    }
</style>
