/**
* Created by tanyichao on 2017/3/15.
*/
<template>
    <div class="page_query">
        <x-header :left-options="{backText:''}" :right-options="{showMore: true}"
                  @on-click-more="show1 = true">我的报表</x-header>
        <!--<span class="head_icon" @click="showSelect"></span>-->
        <!--<div class="headInput">-->
        <!--<input type="text" class="queryInput" placeholder="请选择" @focus="showSelect">-->
        <!--</div>-->
        <!--<popup v-model="show2" height="100%">-->
        <!--<x-header :left-options="{backText:''}" :right-options="{showMore: true}"-->
        <!--@on-click-more="show1 = true;show2 = false">-->
        <!--我的报表</x-header>-->
        <!--<div class="query-toast">-->
        <!--日期：{{dateTime}}<br>-->
        <!--大区：{{region}}<br>-->
        <!--小区：{{subregion}}<br>-->
        <!--城市：{{city}}<br>-->
        <!--店铺：{{shop}}<br>-->
        <!--系列：{{seriesToast}}<br>-->
        <!--风格：{{styleToast}}<br>-->
        <!--商品层：{{levelToast}}<br>-->
        <!--品类：{{classToast}}-->
        <!--</div>-->
        <!--</popup>-->
        <x-dialog v-model="showNoScroll3" class="page_tran" :scroll="false">
            <div class="query-toast">
                日期：{{dateTime}}<br>
                大区：{{region}}<br>
                小区：{{subregion}}<br>
                城市：{{city}}<br>
                店铺：{{shop}}<br>
                系列：{{seriesToast}}<br>
                风格：{{styleToast}}<br>
                商品层：{{levelToast}}<br>
                品类：{{classToast}}
                <div @click="showNoScroll3=false" class="giftCode-close"></div>
            </div>
        </x-dialog>
        <popup v-model="show1" height="100%">
            <div class="popup1">
                <x-header :left-options="{backText:''}" :right-options="{showMore : true}"
                          @on-click-more="show1 = false;">
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
                            title=""
                            placeholder="选择日期"></datetime>
                </group>
                <!--<div v-for="item in allData" class="query_item">-->
                <!--<div class="query_item_title" @click="isActive=!isActive">-->
                <!--{{item.group}}-->
                <!--<span :class="[isActive ? 'activeClass' : 'noActclass', 'all']"></span>-->
                <!--</div>-->
                <!--<template v-if="item.jilian = 'true'">-->
                <!--<div class="query_icon" v-show="isActive">-->
                <!--<div v-for="(i,index) in item.conditions"-->
                <!--:class="[item.isActive ? '' : 'activeMain', 'item_main']">-->
                <!--<div class="query_item_title titleItem" @click="item.isActive=!item.isActive">-->
                <!--{{i.conditionName}}-->
                <!--<span :class="[item.isActive ? 'activeClass' : 'noActclass', 'all']"></span>-->
                <!--</div>-->
                <!--<div class="box" >-->
                <!--<template v-if="i.conditionType = 'single'">-->
                <!--<checker v-model="item.answers" type="radio" default-item-class="demo1-item"-->
                <!--selected-item-class="demo1-item-selected">-->
                <!--<checker-item v-for="(a,index) in i.child" :value="a.name">-->
                <!--<span>{{a.name}}</span>-->
                <!--</checker-item>-->
                <!--</checker>-->
                <!--</template>-->
                <!--&lt;!&ndash;<template v-else-if="i.conditionType = 'multiple'">&ndash;&gt;-->
                <!--&lt;!&ndash;<checker v-model="a.conditionName" type="checkbox"&ndash;&gt;-->
                <!--&lt;!&ndash;default-item-class="demo1-item"&ndash;&gt;-->
                <!--&lt;!&ndash;selected-item-class="demo1-item-selected">&ndash;&gt;-->
                <!--&lt;!&ndash;<checker-item v-for="a in i.child" :value="a.conditionName">&ndash;&gt;-->
                <!--&lt;!&ndash;{{a.conditionName}}&ndash;&gt;-->
                <!--&lt;!&ndash;</checker-item>&ndash;&gt;-->
                <!--&lt;!&ndash;</checker>&ndash;&gt;-->
                <!--&lt;!&ndash;</template>&ndash;&gt;-->
                <!--</div>-->
                <!--</div>-->
                <!--</div>-->
                <!--</template>-->
                <!--</div>-->
                <div class="query_item">
                    <div class="query_item_title" @click="isActive=!isActive">
                        地区查询
                        <span :class="[isActive ? 'activeClass' : 'noActclass', 'all']"></span>
                    </div>
                    <div class="query_icon" v-show="isActive">
                        <div v-for="(item,index) in areaData" :class="[item.isActive ? '' : 'activeMain', 'item_main']">
                            <div class="query_item_title titleItem" @click="item.isActive=!item.isActive">
                                {{item.conditionName}}
                                <span v-if="item.conditionId!= 'region'"
                                      :class="[item.isActive ? 'activeClass' : 'noActclass', 'all']"></span>
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
                    <div class="query_item_title" @click="isActive1=!isActive1">
                        风格查询
                        <span :class="[isActive1 ? 'activeClass' : 'noActclass', 'all']"></span>
                        </span>
                    </div>
                    <div class="query_icon" v-show="isActive1">
                        <div v-for="(item,index) in styleData" :class="[item.isActive ? '' : 'activeMain', 'item_main']">
                            <div class="query_item_title titleItem" @click="item.isActive=!item.isActive">
                                {{item.conditionName}}
                                <span :class="[item.isActive ? 'activeClass' : 'noActclass', 'all']"></span>
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
                <!--<checker v-model="demo1"-->
                <!--type="isRadio1"-->
                <!--default-item-class="demo1-item" selected-item-class="demo1-item-selected">-->
                <!--<checker-item :value="item" v-for="(item, index) in items1" :key="index">{{item.value}}</checker-item>-->
                <!--</checker>-->
                <!--<p>{{demo1}}</p>-->
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
                allData:[],
                isActive:false,
                isActive1:false,
                id: '',
                show1: false,
                show2: false,
                dateTime: '',
                demo1CheckboxMax: '',
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
                testStr:'',
                testArr:[],
                testArr2:[],
                styleData:[],//风格
                childData:[],   //子级所有数据
                cityData:[],    //城市数据
                shopData:[],
                conditionId:'', //条件项id
                conditionValue:'',  //条件项的数据
                showNoScroll:false,
                showNoScroll2:false,
                showNoScroll3:false,
                warnText:'',
                modelId:'',

            }
        },
        watch: {},
        created(){
            this.renderData();
        },
        methods: {
            getUrlParams(urlName) {
                // var url = decodeURI(location.href);
                var url = location.href;
                var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
                var returnValue;
                for (var i = 0; i < paraString.length; i++) {
                    var tempParas = paraString[i].split('=')[0];
                    var parasValue = paraString[i].split('=')[1];
                    if (tempParas === urlName)
                        returnValue = parasValue;
                }
                if (typeof(returnValue) == "undefined") {
                    return "";
                } else {
                    return returnValue;
                }
            },
            isRadio(){
                this.isRadio1 = 'radio'
            },
            clearSubmit(){
                this.dateTime = '';
                this.demo1CheckboxMax = '';
                this.demo4CheckboxMax = '';
                this.seriesToast = [];
                this.styleToast = [];
                this.levelToast = [];
                this.classToast = [];
                this.region = '';
                this.subregion = '';
                this.city = '';
                this.shop = '';
                this.areaData.forEach(item=>{
                    item.answers='';
                })
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
                        this.seriesToast.push('value');
                    }
//                    }
                }
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
                this.shop = '';
                this.conditionId = condition;
                this.conditionValue = value;
                this.testStr = "'"+value+"'";
                this.city = city;
                queryChildService().save({
                    modelId:1000,
                    conditionId:this.conditionId,
                    values:this.conditionValue
                }).then(res=>{
                    let body = res.body;
                    if(body.errmsg='ok'){
                        this.shopData = body.data[0];
                    }
                },res=>{
                })
            },
            getShop(shop){
                this.shop = shop
            },
            kk(condition,value,index,region){
                this.subregion = '';this.city = '';this.shop = '';
                this.areaData.forEach(item=>{
                    item.answers='';
                })
                this.demo4CheckboxMax = '';
                this.conditionId = condition;
                this.conditionValue = value;
                this.testStr = "'"+value+"'"
                this.testArr.push(value);
//                for(let i=0;i<this.testArr.length;i++){
//                    this.testArr[i] = "'"+this.testArr[i]+"'"
//                }
                this.region = region;
                this.renderChildData(index);
            },
            aa(condition,value,index,subregion){
//                alert('----'+condition+'---==='+value+'====');
                this.city = '';
                this.shop = '';
                this.demo4CheckboxMax = '';
                this.conditionId = condition;
                this.conditionValue = value;
                this.testStr = "'"+value+"'";
                this.subregion = subregion;
                queryChildService().save({
                    modelId:1000,
                    conditionId:this.conditionId,
                    values:this.testStr
                }).then(res=>{
                    let body = res.body;
                    if(body.errmsg='ok'){
                        this.cityData = body.data[index-1];
                        this.shopData = body.data[index];
                    } else{
                    }
                },res=>{
                })
            },
            renderData(){
                //url输入对应参数
                let modelId = this.getUrlParams('modelId');
                queryALLService().save({
                    //modelId: modelId
                    modelId: 1000
                }).then(res => {
                    let body = res.body;
                    if (body.data) {
                        this.allData = body.data;
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
                        console.log(this.allData);
                        this.styleData = body.data[1].conditions;
//                        this.styleToast = this.styleData[0].child
                        this.styleData.forEach(function (item,index) {
                            Vue.set(item, 'answers', [])
                            Vue.set(item, 'isActive', false);
                        })
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
                    values:this.testStr
                }).then(res=>{
                    let body = res.body;
                    if(body.errmsg='ok'){
                        this.childData = body.data[index];
                        this.cityData = body.data[index+1];
                        this.shopData = body.data[index+2];
                    } else{
                    }
                },res=>{
                })
            },
            showSelect() {
                this.show1 = true;
            },
            sureSubmit(){
//                if(this.dateTime == ''){
//                    this.showNoScroll = true;
//                    this.warnText = '请选择日期';
//                    return
//                } else if(this.region == '' || this.subregion == '' || this.city == '' || this.shop == '' ){
//                    this.showNoScroll = true;
//                    this.warnText = '请选择地区，具体到店铺';
//                    return
//                } else if(this.seriesToast == ''){
//                    this.showNoScroll = true;
//                    this.warnText = '请选择系列';
//                    return
//                } else if(this.styleToast == ''){
//                    this.showNoScroll = true;
//                    this.warnText = '请选择风格';
//                    return
//                } else if(this.levelToast == ''){
//                    this.showNoScroll = true;
//                    this.warnText = '请选择商品层';
//                    return
//                } else if(this.classToast == ''){
//                    this.showNoScroll = true;
//                    this.warnText = '请选择品类';
//                    return
//                }
                this.queryToast = this.region + '-' + this.subregion + '-' + this.city + '-' + this.shop;
                this.show1 = false;
                this.showNoScroll3 = true;
            }
        },
        computed: {}
    }
</script>
<style lang="less" rel="stylesheet/less">
    .page_query {
    .mask{
        position: fixed;
        z-index: 1000;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.6);
    }
    .query-toast{
        width: auto;
        height: auto;
        margin: 1.2rem;
        padding: .5rem;
        font-size: .75rem;
        border: 1px solid #ab9236;
        position: relative;
        border-radius: .2rem;
        z-index:9999;
    .giftCode-close {
        position: absolute;
        width: .8rem;
        height: .8rem;
        background: url("../assets/money_code3.png");
        background-size: cover;
        top: .6rem;
        right: .6rem;
    }
    }
    .weui-dialog {
        width: 12.5rem !important;
        max-width: none !important;
        text-align: left;
    }
    .vux-header-more:after{
        color: #fff;
        font-size: .75rem !important;
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
        text-align: left;
    }
    }
    .input1 {
        border-radius: 0.2rem;
        border: 0.02rem solid #D2D2D2;
    }
    }
    .query_item {
        padding: 0rem 1rem 0 1rem;
        background: #fff;
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
        position: relative;
    }
    .noActclass:after{
        content: '全部';
        position: absolute;
        display: block;
        top: 0;
        left: -1.4rem;
    }
    .activeClass{
        background: url("../assets/icon_up.png") no-repeat right center;
        -webkit-background-size:.6rem;
        background-size: .6rem;
        position: relative;
    }
    .activeClass:after{
        content: '收起';
        position: absolute;
        display: block;
        top: 0;
        left: -1.4rem;
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
        height: 2.5rem;
        line-height: 2.5rem;
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