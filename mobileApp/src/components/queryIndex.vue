/**
* Created by tanyichao on 2017/3/15.
*/
<template>
    <div class="page_query">
        <x-header :left-options="{backText:''}">我的报表</x-header>
        <span class="head_icon" @click="showSelect"></span>
        <!--<div class="headInput">-->
            <!--<input type="text" class="queryInput" placeholder="请选择" @focus="showSelect">-->
        <!--</div>-->
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
                    <div class="query_item_title" @click="isActive=!isActive">
                        地区
                        <span :class="[isActive ? 'activeClass' : 'noActclass', 'all']">全部</span>
                    </div>
                    <div class="query_icon" v-show="isActive">
                    <div v-for="(item,index) in areaData" :class="[item.isActive ? '' : 'activeMain', 'item_main']">
                        <div class="query_item_title titleItem" @click="item.isActive=!item.isActive">
                            {{item.conditionName}}
                            <span v-if="item.conditionId!= 'region'" :class="[item.isActive ? 'activeClass' : 'noActclass', 'all']"
                                >全部</span>
                        </div>
                        <div class="box"  v-if="item.conditionId != 'shop'">
                            <checker v-model="item.answers" type="radio" default-item-class="demo1-item"
                                     selected-item-class="demo1-item-selected">
                                <checker-item v-for="i in item.child" :value="i.id"
                                              v-if="item.conditionId == 'region'">{{i.name}}</checker-item>
                                <checker-item v-for="i in item.child"
                                              :value="i.id"
                                              v-if="item.conditionId != 'region' && areaData[index-1].answers==i.parentId">{{i.name}}</checker-item>
                                <!--<checker-item v-for="i in item.child" :value="i.REGION_NO" v-if="item.conditionId == 'region'">{{i.REGION_NAME}}</checker-item>-->
                            </checker>
                        </div>
                        <div class="box longBox" v-if="item.conditionId == 'shop'">
                            <checker v-model="demo4CheckboxMax" type="radio" default-item-class="demo1-item"
                                     selected-item-class="demo1-item-selected">
                                <checker-item v-for="i in item.child" :value="i.id" v-if="areaData[index-1].answers==i.parentId">{{i.name}}</checker-item>
                            </checker>
                        </div>
                    </div>
                    </div>
                </div>
                <!--<p class="deliver"></p>-->
                <div class="query_item">
                    <div class="query_item_title" @click="isActive1=!isActive1">
                        风格
                        <span :class="[isActive1 ? 'activeClass' : 'noActclass', 'all']">全部</span>
                    </div>
                    <div class="query_icon" v-show="isActive1">
                        <div v-for="(item,index) in styleData" :class="[item.isActive ? '' : 'activeMain', 'item_main']">
                            <div class="query_item_title titleItem" @click="item.isActive=!item.isActive">
                                {{item.conditionName}}
                                <span v-if="item.conditionId!= 'big_series'" :class="[item.isActive ? 'activeClass' : 'noActclass', 'all']"
                                >全部</span>
                            </div>
                            <div class="box" >
                                <checker v-model="item.answers" type="checkbox" default-item-class="demo1-item"
                                         selected-item-class="demo1-item-selected">
                                    <checker-item v-for="i in item.child" :value="i.id"
                                                  v-if="item.conditionId == 'big_series'">{{i.name}}</checker-item>
                                    <checker-item v-for="i in item.child" :value="i.id"
                                                  v-if="item.conditionId == 'style'">{{i.name}}</checker-item>
                                    <checker-item v-for="i in item.child" :value="i.id"
                                                  v-if="item.conditionId == 'goods_level'">{{i.name}}</checker-item>
                                    <checker-item v-for="i in item.child" :value="i.id"
                                                  v-if="item.conditionId == 'class'">{{i.name}}</checker-item>
                                </checker>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="operate">
                <span>重置</span>
                <span @click="sureSubmit">确定</span>
            </div>
        </popup>
        <toast v-model="showNoScroll" type="text" :time="1000">{{warnText}}</toast>
    </div>
</template>
<script>
    import Vue from 'vue'
    import {
        queryService,queryALLService,queryChildService
    } from '../services/person.js'
    import {XHeader, Scroller, Popup, Group, Datetime, Checker, CheckerItem,Toast} from 'vux'
    export default {
        components: {
            XHeader, Scroller, Popup, Group, Datetime, Checker, CheckerItem,Toast
        },
        mounted(){
        },
        data () {
            return {
                isActive:true,
                isActive1:false,
                id: '',
                show1: false,
                dateTime: '',
                demo1CheckboxMax: '',
                demo2CheckboxMax: '',
                demo3CheckboxMax: '',
                demo4CheckboxMax:'',
                areaData:[],//地区
                styleData:[],//风格
                conditionId:'',
                conditionValue:'',
                showNoScroll:false,
                warnText:'',

            }
        },
        watch: {},
        created(){
           this.renderData();
        },
        methods: {
            renderData(){
                queryALLService().save({
                    modelId:1000
                }).then(res => {
                    let body = res.body;
                    if (body.data) {
                        this.areaData = body.data[0].conditions;
                        this.areaData.forEach(function (item,index) {
                                Vue.set(item, 'answers', '');
                                if(index == 0){
                                    Vue.set(item, 'isActive', true);
                                }else{
                                    Vue.set(item, 'isActive', false);
                                }
                        })
                        console.log(this.areaData,'----------')
                        console.log('666,-----===============================-----------')
                        this.styleData = body.data[1].conditions;
                        this.styleData.forEach(function (item,index) {
                            Vue.set(item, 'answers', [])
                            Vue.set(item, 'isActive', false);
                        })
                    }
                    console.log('666,-------------------------------------------')
                }, res => {
                    this.showNoScroll = true;
                    this.warnText = '网络超时，请重试';
                })
            },
            renderChildData() {
                queryChildService().save({
                    modelId:1000
                })
            },
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
        .popup1{
            background: #f1f1f1;
        }
        .head_icon{
            display: inline-block;
            height: 2.3rem;
            position: absolute;
            top: 0;
            right: 0;
            width: 2rem;
            background: url("../assets/icon_circle.png") no-repeat center center;
            background-size: 1rem;
        }
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
            background: #fff;
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
            background: #fff;
            margin-bottom: .3rem;
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

                    font-size: .7rem;
                }
                .noActclass{
                    background: url("../assets/icon_down.png") no-repeat right center;
                    -webkit-background-size:.6rem;
                    background-size: .6rem;
                }
                .activeClass{
                    background: url("../assets/icon_up.png") no-repeat right center;
                    -webkit-background-size:.6rem;
                    background-size: .6rem;
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
                            margin-left: 0 !important;
                        }
                    }
                }
            }
            .activeMain{
                height: 6.5rem;
                overflow: hidden;
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
