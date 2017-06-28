/**
* Created by tanyichao on 2017/3/15.
*/
<template>
    <div class="page_query">
        <!--<x-header :left-options="{backText:''}">我的报表</x-header>-->
        <!--<span class="head_icon" @click="showSelect"></span>-->
        <!--<div class="headInput">-->
            <!--<input type="text" class="queryInput" placeholder="请选择" @focus="showSelect">-->
        <!--</div>-->
        <popup v-model="show2" height="100%">
            <x-header :left-options="{backText:''}" :right-options="{showMore: true}"
                      @on-click-more="show1 = true;show2 = false">
                我的报表</x-header>
            <div class="query-toast">
                日期：{{dateTime}}<br>
                地区：{{queryToast}}<br>
                系列：{{seriesToast}}<br>
                风格：{{styleToast}}<br>
                商品层：{{levelToast}}<br>
                品类：{{classToast}}
            </div>
        </popup>
        <popup v-model="show1" height="100%">
            <div class="popup1">
                <x-header :left-options="{backText:''}" :right-options="{showMore : true}"
                          @on-click-more="show1 = false;show2=true">
                    我的报表</x-header>
                <group class="dateBox">
                    <datetime
                        :min-year=1900
                        cancelText="取消"
                        confirmText="确定"
                        clear-text="今天"
                        @on-clear="setToday"
                       v-model="dateTime"
                        class="input input1 text textPadding"
                        title="选择日期"></datetime>
                </group>
                <div class="query_item">
                    <div class="query_item_title" @click="isActive=!isActive;isActive2=!isActive2">
                        地区
                        <span :class="[isActive ? 'activeClass' : 'noActclass', 'all']">
                            <span v-if="isActive2">全部</span><span v-if="isActive">收起</span></span>
                    </div>
                    <div class="query_icon" v-show="isActive">
                    <div v-for="(item,index) in areaData" :class="[item.isActive ? '' : 'activeMain', 'item_main']">
                        <div class="query_item_title titleItem" @click="item.isActive=!item.isActive">
                            {{item.conditionName}}
                            <span :class="[item.isActive ? 'activeClass' : 'noActclass', 'all']">全部</span>
                        </div>
                        <div class="box"  v-if="item.conditionId != ''">
                            <checker v-model="item.answers" type="radio" default-item-class="demo1-item"
                                     selected-item-class="demo1-item-selected">
                                <checker-item v-for="i in item.child"
                                              :value="i.id"
                                              v-if="item.conditionId == 'region'">
                                    <p @click="kk(item.conditionId,i.id,index,i.name)">{{i.name}}</p>
                                </checker-item>
                                <checker-item v-for="i in childData.child"
                                              :value="i.id"
                                              v-if="item.conditionId == 'subregion'">
                                    <p @click="aa(item.conditionId,i.id,index,i.name)">{{i.name}}</p>
                                </checker-item>
                                <checker-item v-for="i in cityData.child"
                                              :value="i.id"
                                              v-if="item.conditionId == 'city'">
                                    <p @click="getCity(item.conditionId,i.id,index,i.name)">{{i.name}}</p>
                                </checker-item>
                                <!--<checker-item v-for="i in childData.child"-->
                                              <!--:value="i.id"-->
                                              <!--v-if="item.conditionId == 'shop'">{{i.name}}</checker-item>-->
                                <!--<checker-item v-for="i in item.child" :value="i.REGION_NO" v-if="item.conditionId == 'region'">{{i.REGION_NAME}}</checker-item>-->
                            </checker>
                        </div>
                        <div class="box longBox" v-if="item.conditionId == 'shop'">
                            <checker v-model="demo4CheckboxMax" type="radio" default-item-class="demo1-item"
                                     selected-item-class="demo1-item-selected">
                                <checker-item v-for="i in shopData.child" :value="i.id"
                                              v-if="item.conditionId == 'shop'">
                                    <p @click="getShop(i.name)">{{i.name}}</p></checker-item>
                            </checker>
                        </div>
                    </div>
                    </div>
                </div>
                <!--<p class="deliver"></p>-->
                <div class="query_item">
                    <div class="query_item_title" @click="isActive1=!isActive1;isActive3=!isActive3">
                        风格
                        <span :class="[isActive1 ? 'activeClass' : 'noActclass', 'all']">
                            <span v-if="isActive3">全部</span><span v-if="isActive1">收起</span></span>
                        </span>
                    </div>
                    <div class="query_icon" v-show="isActive1">
                        <div v-for="(item,index) in styleData" :class="[item.isActive ? '' : 'activeMain', 'item_main']">
                            <div class="query_item_title titleItem" @click="item.isActive=!item.isActive">
                                {{item.conditionName}}
                                <span :class="[item.isActive ? 'activeClass' : 'noActclass', 'all']">全部</span>
                            </div>
                            <div class="box" >
                                <checker v-model="demo1CheckboxMax" type="checkbox" default-item-class="demo1-item"
                                         selected-item-class="demo1-item-selected">
                                    <checker-item v-for="(i,index) in item.child" :value="i.id"
                                                  v-if="item.conditionId == 'big_series'">
                                        <p @click="mm(i.name)">{{i.name}}</p></checker-item>
                                    <checker-item v-for="i in item.child" :value="i.id"
                                                  v-if="item.conditionId == 'style'">
                                        <p @click="mm1(i.name)">{{i.name}}</p></checker-item>
                                    <checker-item v-for="i in item.child" :value="i.id"
                                                  v-if="item.conditionId == 'goods_level'">
                                        <p @click="mm2(i.name)">{{i.name}}</p></checker-item>
                                    <checker-item v-for="i in item.child" :value="i.id"
                                                  v-if="item.conditionId == 'class'">
                                        <p @click="mm3(i.name)">{{i.name}}</p></checker-item>
                                </checker>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="operate">
                <span @click="clearSubmit">重置</span>
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
    import {XHeader, Scroller, Popup, Group, Datetime, Checker, CheckerItem, XDialog, Toast} from 'vux'
    export default {
        components: {
            XHeader, Scroller, Popup, Group, Datetime, Checker, CheckerItem, XDialog, Toast
        },
        mounted(){
        },
        data () {
            return {
                isActive:false,
                isActive1:false,
                isActive2:true,
                isActive3:true,
                id: '',
                show1: true,
                show2: true,
                dateTime: '',
                demo1CheckboxMax: '',
                demo2CheckboxMax: '',
                demo3CheckboxMax: '',
                demo4CheckboxMax:'',
                queryToast: '', //提交内容
                seriesToast: [],  //系列内容
                seriesToast2: [],
                styleToast: [], //风格内容
                levelToast: [], //商品车内容
                classToast: [], //品类内容
                areaData:[],//地区
                region:'',
                subregion:'',
                city:'',
                shop:'',
                styleData:[],//风格
                childData:[],   //子级所有数据
                cityData:[],    //城市数据
                shopData:[],
                conditionId:'', //条件项id
                conditionValue:'',  //条件项的数据
                showNoScroll:false,
                showNoScroll2:false,
                warnText:'',

            }
        },
        watch: {},
        created(){
           this.renderData();
        },
        methods: {
            clearSubmit(){
                this.dateTime = '';
                this.demo1CheckboxMax = '';
                this.demo4CheckboxMax = '';
                this.seriesToast = [];
                this.styleToast = [];
                this.levelToast = [];
                this.classToast = [];
            },
            setToday (value) {
                let now = new Date()
                let cmonth = now.getMonth() + 1
                let day = now.getDate()
                if (cmonth < 10) cmonth = '0' + cmonth
                if (day < 10) day = '0' + day
                this.dateTime = now.getFullYear() + '-' + cmonth + '-' + day
                console.log('set today ok')
            },
            mm(value){
                if(this.seriesToast.length <1){
                    this.seriesToast.push(value);
                } else {
                    let num = this.seriesToast.indexOf(value);
                        if(this.seriesToast[num] == value){
                            this.seriesToast.splice(num,1);
                        } else {
                            this.seriesToast.push(value);
                        }
//                    }
                }
//                for(let i=0;i<this.seriesToast.length;i++){
//                    if(this.seriesToast[i]==value){
//                        this.seriesToast.splice(i,1);
////                        alert('666')
//                    }
//                }

//                this.seriesToast.push(value);
//                for(let j=0;j<this.seriesToast.length;j++){
//                    if(this.seriesToast2.indexOf(this.seriesToast[j])===-1){
//                        this.seriesToast2.push(this.seriesToast[j]);
////                        this.seriesToast = this.seriesToast2;
//                    }
//                }
//                this.seriesToast = this.seriesToast2;
            },
            mm1(value){
                if(this.styleToast.length <1){
                    this.styleToast.push(value);
                } else {
                    let num = this.styleToast.indexOf(value);
                    if(this.styleToast[num] == value){
                        this.styleToast.splice(num,1);
                    } else {
                        this.styleToast.push(value);
                    }
//                    }
                }
            },
            mm2(value){
                if(this.levelToast.length <1){
                    this.levelToast.push(value);
                } else {
                    let num = this.levelToast.indexOf(value);
                    if(this.levelToast[num] == value){
                        this.levelToast.splice(num,1);
                    } else {
                        this.levelToast.push(value);
                    }
//                    }
                }
            },
            mm3(value){
                if(this.classToast.length <1){
                    this.classToast.push(value);
                } else {
                    let num = this.classToast.indexOf(value);
                    if(this.classToast[num] == value){
                        this.classToast.splice(num,1);
                    } else {
                        this.classToast.push(value);
                    }
//                    }
                }
            },
            getCity(condition,value,index,city){
                this.conditionId = condition;
                this.conditionValue = value;
                this.city = city;
                queryChildService().save({
                    modelId:1000,
                    conditionId:this.conditionId,
                    value:this.conditionValue
                }).then(res=>{
                    let body = res.body;
                    if(body.errmsg='ok'){
                        this.shopData = body.data[0];
                        console.log(this.shopData,'-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-');
                        console.log(body.data,'---------------------------------------')
                    } else{
                        console.log('666--------------------------')
                    }
                },res=>{
                })
            },
            getShop(shop){
                this.shop = shop
            },
            kk(condition,value,index,region){
//                alert('----'+condition+'---==='+value+'====');
//                this.cityData = '';
                this.shopData = '';
                this.conditionId = condition;
                this.conditionValue = value;
                this.region = region;
                this.renderChildData(index);
            },
            aa(condition,value,index,subregion){
//                alert('----'+condition+'---==='+value+'====');
                this.conditionId = condition;
                this.conditionValue = value;
                this.subregion = subregion;
                queryChildService().save({
                    modelId:1000,
                    conditionId:this.conditionId,
                    value:this.conditionValue
                }).then(res=>{
                    let body = res.body;
                    if(body.errmsg='ok'){
                        this.cityData = body.data[index-1];
                        this.shopData = body.data[index];
                        console.log(this.shopData,'000000000111111111111=================')
                        console.log(this.cityData,'-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-');
                        console.log(body.data,'---------------------------------------------')
                    } else{
                        console.log('666--------------------------')
                    }
                },res=>{
                })
            },
            renderData(){
                queryALLService().save({
                    modelId:1000
                }).then(res => {
                    let body = res.body;
                    if (body.data) {
                        this.areaData = body.data[0].conditions;
                        this.childData = body.data[0].conditions[1];
                        this.cityData = body.data[0].conditions[2];
                        this.shopData = body.data[0].conditions[3];
                        this.areaData.forEach(function (item,index) {
                                Vue.set(item, 'answers', '');
                                if(index == 0){
                                    Vue.set(item, 'isActive', true);
                                }else{
                                    Vue.set(item, 'isActive', false);
                                }
                        })
                        console.log(this.areaData,'----------');
                        console.log(this.shopData,'1111111111111-------------------------')
                        this.styleData = body.data[1].conditions;
//                        this.styleToast = this.styleData[0].child
                        this.styleData.forEach(function (item,index) {
                            Vue.set(item, 'answers', [])
                            Vue.set(item, 'isActive', false);
                        })
//                        console.log(this.styleToast,'======================================')
                    }
                }, res => {
                    this.showNoScroll = true;
                    this.warnText = '网络超时，请重试';
                })
            },
            renderChildData(index) {
                queryChildService().save({
                    modelId:1000,
                    conditionId:this.conditionId,
                    value:this.conditionValue
                }).then(res=>{
                    let body = res.body;
                    if(body.errmsg='ok'){
                        this.childData = body.data[index];
                        this.cityData = body.data[index+1];
                        this.shopData = body.data[index+2];
                        console.log(this.childData.child,'-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-');
                    } else{
                        console.log('666--------------------------')
                    }
                },res=>{
                })
            },
            showSelect() {
                this.show1 = true;
            },
            sureSubmit(){
                this.queryToast = this.region + '-' + this.subregion + '-' + this.city + '-' + this.shop;
                if(this.dateTime == ''){
                    this.showNoScroll = true;
                    this.warnText = '请选择日期';
                    return
                } else if(this.region == '' || this.subregion == '' || this.city == '' || this.shop == '' ){
                    this.showNoScroll = true;
                    this.warnText = '请选择地区，具体到店铺';
                    return
                } else if(this.seriesToast == ''){
                    this.showNoScroll = true;
                    this.warnText = '请选择系列';
                    return
                } else if(this.styleToast == ''){
                    this.showNoScroll = true;
                    this.warnText = '请选择风格';
                    return
                } else if(this.levelToast == ''){
                    this.showNoScroll = true;
                    this.warnText = '请选择商品层';
                    return
                } else if(this.classToast == ''){
                    this.showNoScroll = true;
                    this.warnText = '请选择品类';
                    return
                }
                this.show1 = false;
                this.show2 = true;
            }
        },
        computed: {}
    }
</script>
<style lang="less" rel="stylesheet/less">
    .page_query {
        .vux-header-more:after{
            color: #fff;
            font-size: .75rem !important;
        }
        .query-toast{
            width: 90%;
            margin: 1rem auto;
            padding: .5rem;
            font-size: .75rem;
            border: 1px solid #ab9236;
            border-radius: .2rem;
        }
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
                        height: 2rem;
                        line-height: 2rem;
                        overflow: hidden;
                        border-radius: .2rem;
                        /*padding: .5rem 0;*/
                        text-align: center;
                        font-size: .65rem;
                        margin-left: 4%;
                        background: #E5E5E5;
                        color: #999;
                        vertical-align: top;
                        margin-bottom: .5rem;
                        p{
                            height: 100%;
                            line-height: 2rem;
                        }
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
