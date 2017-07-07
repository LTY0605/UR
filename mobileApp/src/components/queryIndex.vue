/**
* Created by tanyichao on 2017/3/15.
*/
<template>
    <div class="page_query">
        <x-header :left-options="{backText:''}">我的报表</x-header>
        <span class="head_icon" @click="rightOption"></span>
        <!--提示框-->
        <x-dialog v-model="showNoScroll3" class="page_tran" :scroll="false">
            <div class="query-toast">
                日期：{{dateTime}}<br>
                <ul style="list-style: none" v-for="(result,resuilIndex) in resultData">
                    <li v-for="(rech,rechIndex) in result.conditions">
                        <p v-for="(res,resIndex) in rech.selectedItems">{{rech.conditionName}}:{{res.name}}</p>
                    </li>
                </ul>
                <div @click="showNoScroll3=false" class="giftCode-close"></div>
            </div>
        </x-dialog>
        <!--报表-->
        <popup v-model="show1" height="100%">
            <div class="popup1">
                <x-header :left-options="{showBack:false}">
                    <span class="head_back" @click="rightOption"></span>
                    我的报表</x-header>
                <span class="head_icon" @click="rightOption"></span>
                <!--日历-->
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
                <div v-for="(conditionGroup,indexI) in this.modelData" class="query_item">
                    <div class="query_item_title" @click="showActive(indexI,modelData)">
                        {{conditionGroup.group}}
                        <span :class="[conditionGroup.isActive ? 'activeClass' : 'noActclass', 'all']"></span>
                    </div>
                    <template>
                        <transition name="slide-fade">
                        <div class="query_icon" v-show="conditionGroup.isActive">
                            <div v-for="(condition,indexJ) in conditionGroup.conditions"
                                 :class="[condition.isActive ? '' : 'activeMain', 'item_main']">
                                <div class="query_item_title titleItem" @click="showActive(indexJ,conditionGroup.conditions)">
                                    {{condition.conditionName}}
                                    <span :class="[condition.isActive ? 'activeClass' : 'noActclass', 'all']"></span>
                                </div>
                                <div class="box">
                                    <template v-if="condition.conditionType == 'single'">
                                        <checker v-model="condition.selectedItems" type="radio" default-item-class="demo1-item"
                                                 selected-item-class="demo1-item-selected">
                                            <checker-item :class="{longItem:condition.child[0].name.length>5}"
                                                          v-for="(option,indexK) in condition.child" :value="option">
                                                <p style="width: 100%"
                                                   @click="getChildData(option,indexK,condition,indexJ,conditionGroup,indexI)">{{option.name}}</p>
                                            </checker-item>
                                        </checker>
                                    </template>
                                    <template v-else-if="condition.conditionType = 'multiple'">
                                        <checker v-model="condition.selectedItems" type="checkbox" default-item-class="demo1-item"
                                                 selected-item-class="demo1-item-selected">
                                            <checker-item :class="{longItem:condition.child[0].name.length>5}"
                                                          v-for="(option,indexK) in condition.child" :value="option">
                                                <p style="width: 100%"
                                                   @click="getChildData(option,indexK,condition,indexJ,conditionGroup,indexI,condition.selectedItems)">{{option.name}}</p>
                                            </checker-item>
                                        </checker>
                                    </template>
                                </div>
                            </div>
                        </div>
                        </transition>
                    </template>
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
                modelData:[], //渲染版数据
                resultData:[],//从modelData筛选出的结果集
                isActive:false,
                titleActive: false,
                show1: false,
                show2: false,
                dateTime: '',
                queryToast: '', //提交内容
                showNoScroll:false,
                showNoScroll2:false,
                showNoScroll3:false,
                warnText:'',
                isLong:'',
                modelId:'',//当前查询面板的模板Id
            }
        },
        watch: {},
        created(){
            this.getModelData();
        },
        methods: {
            rightOption(){
                this.modelData.forEach((item,index)=>{
                    item.isActive = false;
                })
                setTimeout(()=>{
                    this.show1 == false ? this.show1 = true : this.show1 = false;
                    this.show2 == true ? this.show2 = false : this.show2 = true;
                    this.clearSubmit();
                },400)
            },
            //根据设置的isActive来收缩展开
            showActive(index,data){
//                debugger
                data[index].isActive == true ? data[index].isActive = false : data[index].isActive = true;
            },
            //根据url传入的modelId展示对应的查询面板
            getUrlParams(urlName) {
                // var url = decodeURI(location.href);
                let url = location.href;
                let paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
                let returnValue;
                for (let i = 0; i < paraString.length; i++) {
                    let tempParas = paraString[i].split('=')[0];
                    let parasValue = paraString[i].split('=')[1];
                    if (tempParas === urlName)
                        returnValue = parasValue;
                }
                if (typeof(returnValue) == "undefined" || returnValue==null) {
                    return 1000;
                } else {
                    return returnValue;
                }
            },
            setToday (value) {
                let now = new Date()
                let cmonth = now.getMonth() + 1
                let day = now.getDate()
                if (cmonth < 10) cmonth = '0' + cmonth
                if (day < 10) day = '0' + day
                this.dateTime = now.getFullYear() + '-' + cmonth + '-' + day
            },
            //调用接口一获取查询条件
            getModelData(){
                let mId = this.getUrlParams('modelId');
                queryALLService().save({
                    modelId: mId
                }).then(res => {
                    let body = res.body;
                    if (body.data) {
                        this.modelData = body.data;
                        this.modelId=mId;
                        //给每个字段添加收缩条件
                        this.modelData.forEach(function (item,index) {
                            if(index == 0){
                                Vue.set(item, 'isActive', true);
                            }else{
                                Vue.set(item, 'isActive', true);
                            }
                        })
                        //展开后的每个列表收缩条件.
                        for(let k=0;k<this.modelData.length;k++){
                            this.modelData[k].conditions.forEach(function(item,index){
                                if(index == 0){
                                    Vue.set(item, 'isActive', false);
                                }else{
                                    Vue.set(item, 'isActive', false);
                                }
                            })
                        }
                        for (let i = 0; i < this.modelData.length; i++) {
                            this.modelData[i].conditions.forEach(function (item, index) {
                                Vue.set(item,'selectedItems',[]);
                            });
                        }
                        console.log(this.modelData)
                    } else{
                        this.showNoScroll = true;
                        this.warnText = body.errmsg;
                    }
                }, res => {
                    this.showNoScroll = true;
                    this.warnText = '网络超时，请重试';
                })
            },
            //点击级联节点时调用接口二获取下属所有节点
            getChildData(option,indexK,condition,indexJ,conditionGroup,indexI,selectedItems){
                //仅在模板为级联结构并且条件属于非叶子节点的情况下才响应点击事件
                if(conditionGroup.jilian==true && condition.isLeaf==false)
                {
                    let queryIds="";
                    //支持复选的情况，传入多个id
                    if(condition.conditionType=="multiple"){
                        //获取同级的复选元素
                        queryIds="'"+option.id+"'";
//                        console.log(option,condition.selectedItems,selectedItems,'--------------select-----------------');
                        for(let i=0;i<condition.selectedItems.length;i++){
                            queryIds+=","+"'"+condition.selectedItems[i].id+"'";
                        }
                    }else{
                        queryIds="'"+option.id+"'";
                    }
                    queryChildService().save({
                        modelId:this.modelId,
                        conditionId:condition.conditionId,
                        values:queryIds
                    }).then(res=>{
                        let body = res.body;
                        if(body.errmsg='ok' && body.data){
                            for(let i=0;i<body.data.length;i++){
                                for(let j=0;j<this.modelData[indexI].conditions.length;j++)
                                {
                                    if(this.modelData[indexI].conditions[j].conditionId==body.data[i].conditionId){
                                        Vue.set(this.modelData[indexI].conditions,j,body.data[i]);
                                        Vue.set(this.modelData[indexI].conditions[j],'isActive',false);
                                    }
                                }
                            }
                        } else{
                            this.showNoScroll = true;
                            this.warnText = body.errmsg;
                        }
                    },res=>{
                        this.warnText = '网络超时，请重试';
                    })
                }
                else if(conditionGroup.jilian==false){
                    return;//非级联条件组不响应点击事件
                }else{
                    return;//其他情况亦不响应点击事件
                }
            },
            showSelect() {
                this.show1 = true;
            },
            //重置选择.
            clearSubmit(){
                this.dateTime = '';
                for (let i = 0; i < this.modelData.length; i++) {
//                    debugger;
                    for (let j = 0; j < this.modelData[i].conditions.length; j++) {
                        this.modelData[i].conditions[j].selectedItems=[];
                    }
                }
                this.getModelData();
            },
            //点击确定
            sureSubmit(){
                this.resultData=[];
                let resultJson = [];
                //遍历modeldata的选中项给resultData赋值
                for (let i = 0; i < this.modelData.length; i++) {
                    this.resultData[i]={};
                    this.resultData[i].group=this.modelData[i].group;
                    this.resultData[i].jilian=this.modelData[i].jilian;
                    this.resultData[i].conditions=[];
                    for (let j = 0; j < this.modelData[i].conditions.length; j++) {
                        this.resultData[i].conditions[j]={};
                        this.resultData[i].conditions[j].conditionId=this.modelData[i].conditions[j].conditionId;
                        this.resultData[i].conditions[j].conditionName=this.modelData[i].conditions[j].conditionName;
                        this.resultData[i].conditions[j].conditionType=this.modelData[i].conditions[j].conditionType;
                        this.resultData[i].conditions[j].selectedItems =[];
                        this.resultData[i].conditions[j].isActive =false;
                        if(typeof(this.modelData[i].conditions[j].selectedItems) !='undefined') {
                            this.resultData[i].conditions[j].isActive = this.modelData[i].conditions[j].isActive;
                            if(this.resultData[i].conditions[j].conditionType=='single'){
                                this.resultData[i].conditions[j].selectedItems[0]=this.modelData[i].conditions[j].selectedItems;
                            }else if(this.resultData[i].conditions[j].conditionType=='multiple'){
                                for (let k = 0; k < this.modelData[i].conditions[j].selectedItems.length; k++) {
                                    this.resultData[i].conditions[j].selectedItems[k] = this.modelData[i].conditions[j].selectedItems[k];
                                }
                            }
                        }
                    }
                }
                this.showNoScroll3 = true;
                this.show2 = true;
                this.show1 = false;
                for(let i=0;i<this.resultData.length;i++){
                    for(let j=0;j<this.resultData[i].conditions.length;j++){
                        if(typeof (this.modelData[i].conditions[j].selectedItems)=='Array'){
                            for (let k = 0; k < this.modelData[i].conditions[j].selectedItems.length; k++) {
                                resultJson.push(this.resultData[i].conditions[j].selectedItems[k])
                            }
                        } else {
                            resultJson.push(this.resultData[i].conditions[j].selectedItems)
                        }
                    }
                }
                console.log(this.resultData);
                resultJson = JSON.stringify(resultJson)
                console.log(resultJson,'==============================123123===============')
            }
        },
        computed: {}
    }
</script>
<style lang="less" rel="stylesheet/less">
    .page_query {
    .slide-fade-enter-active, .slide-fade-leave-active {
        transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active for <2.1.8 */ {
        opacity: 0;
    }
    .vux-header-more:after{
        color: #fff;
        font-size: .75rem !important;
    }
    .weui-dialog{
        text-align: left;
    }
    .vux-popup{
        overflow-y: auto;
        padding-bottom: 2.6rem;
        background: #fff !important;
    }
    .giftCode-close {
        position: absolute;
        width: .8rem;
        height: .8rem;
        background: url("../assets/money_code3.png");
        background-size: cover;
        top: .4rem;
        right: .4rem;
    }
    .query-toast{
        margin: 1.3rem 1rem;
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
    .head_back{
        display: inline-block;
        height: 2.3rem;
        position: absolute;
        top: .9rem;
        left: 1rem;
        width: 12px;
        height: 12px;
        border: 1px solid #fff;
        border-width: 1px 0 0 1px;
        -webkit-transform: rotate(315deg);
        -ms-transform: rotate(315deg);
        transform: rotate(315deg);
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
        padding: .5rem 1rem .5rem;
        background: #fff;
        border-bottom: 1px solid #ddd;
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
        background: #fff;
    .query_item_title {
        height: 2.5rem;
        line-height: 2.5rem;
        color: #333;
        font-size: .75rem;
        padding: 0 1rem;
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
        height: 2.5rem;
        line-height: 2.5rem;
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
        height: 2.5rem;
        line-height: 2.5rem;
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
        height: 2.5rem;
        line-height: 2.5rem;
        border: 0;
    }
    .vux-checker-box {
        padding: 0 1rem;
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
    .longItem {
        width: 48% !important;
    }
    .longItem:nth-child(2n+1){
        margin-left: 0 !important;
    }
    }
    .activeMain{
        height: 7rem;
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
