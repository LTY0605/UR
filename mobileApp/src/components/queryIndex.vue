/**
* Created by tanyichao on 2017/3/15.
*/
<template>
    <div class="page_query">
        <x-header :left-options="{backText:''}" :right-options="{showMore: true}"
                  @on-click-more="show1 = true">我的报表</x-header>
        <!--弹窗-->
        <x-dialog v-model="showNoScroll3" class="page_tran" :scroll="false">
            <div class="query-toast">
                日期：{{dateTime}}<br>
                <ul style="list-style: none">
                    <li v-for="item in cData3">{{item}}</li>
                    <li v-for="item in cData2">{{item}}</li>
                </ul>
                <div @click="showNoScroll3=false" class="giftCode-close"></div>
            </div>
        </x-dialog>
        <!--报表-->
        <popup v-model="show1" height="100%">
            <div class="popup1">
                <x-header :left-options="{backText:''}" :right-options="{showMore : true}"
                          @on-click-more="show1 = false;show2=true">
                    我的报表</x-header>
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
                <div v-for="(item,index) in allData" class="query_item">
                    <div class="query_item_title" @click="showJlian(index,allData)">
                        {{item.group}}
                        <span :class="[item.isActive ? 'noActclass' : 'activeClass', 'all']"></span>
                    </div>
                    <!--jilian为true时加载的模板-->
                    <template v-if="item.jilian == true">
                        <div class="query_icon" v-show="item.isActive">
                            <div v-for="(i,index1) in cData"
                                 :class="[i.isActive ? '' : 'activeMain', 'item_main']">
                                <div class="query_item_title titleItem" @click="shoelistActive(index1,cData)">
                                    {{i.conditionName}}
                                    <span v-if="i.conditionId!= 'region'"
                                          :class="[i.isActive ? 'activeClass' : 'noActclass', 'all']"></span>
                                </div>
                                <div class="box" >
                                    <!--<template v-if="i.conditionType == 'single'">-->
                                        <!--<checker v-model="item.color" type="radio" default-item-class="demo1-item"-->
                                                 <!--selected-item-class="demo1-item-selected">-->
                                            <!--<checker-item v-for="(a,index) in i.child" :value="a.name">-->
                                                <!--<p style="width: 100%"-->
                                                   <!--@click="getChild(i.conditionId,a.id,index,index1,a.name,i.conditionName)">{{a.name}}</p>-->
                                            <!--</checker-item>-->
                                            <!--&lt;!&ndash;<checker-item v-if="index != 0" v-for="(b,index) in i.child"&ndash;&gt;-->
                                                          <!--&lt;!&ndash;:value="b">&ndash;&gt;-->
                                                <!--&lt;!&ndash;<p style="width: 100%" @click="getChild(i.conditionId,a.id,index)">{{b.name}}</p>&ndash;&gt;-->
                                            <!--&lt;!&ndash;</checker-item>&ndash;&gt;-->
                                        <!--</checker>-->
                                    <!--</template>-->
                                    <template v-if="i.conditionType == 'single'">
                                        <checker v-model="item.answers" type="radio" default-item-class="demo1-item"
                                                 selected-item-class="demo1-item-selected">
                                            <checker-item v-for="(a,index) in i.child" :value="a">
                                                <p style="width: 100%"
                                                   @click="getChild(i.conditionId,a.id,index,index1,a.name,i.conditionName)">{{a.name}}</p>
                                            </checker-item>
                                        </checker>
                                    </template>
                                    <template v-else-if="i.conditionType =='multiple'">
                                        <div class="box longBox">
                                            <checker v-model="childData2" type="checkbox"
                                                     default-item-class="demo1-item"
                                                     selected-item-class="demo1-item-selected">
                                                <checker-item v-for="(a,index) in i.child" :value="a.name">
                                                    <p style="width: 100%">{{a.name}}</p>
                                                </checker-item>
                                            </checker>
                                        </div>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </template>
                    <template v-if="item.jilian == false">
                        <div class="query_icon" v-show="item.isActive">
                            <div v-for="(i,conIndex) in item.conditions"
                                 :class="[i.isActive ? '' : 'activeMain', 'item_main']">
                                <div class="query_item_title titleItem" @click="shoelistActive(conIndex,item.conditions)">
                                    {{i.conditionName}}
                                    <span :class="[i.isActive ? 'activeClass' : 'noActclass', 'all']"></span>
                                </div>
                                <template v-if="i.conditionType == 'single'">
                                    <div class="box" >
                                        <checker v-model="item.answers" type="radio" default-item-class="demo1-item"
                                                 selected-item-class="demo1-item-selected">
                                            <checker-item v-for="(a,childIndex) in i.child" :value="a.name">
                                                <span>{{a.name}}</span>
                                            </checker-item>
                                        </checker>
                                    </div>
                                </template>
                                <template v-if="i.conditionType == 'multiple'">
                                    <div class="box">
                                        <checker v-model="childData3" type="checkbox" default-item-class="demo1-item"
                                                 selected-item-class="demo1-item-selected">
                                            <checker-item v-for="(a,childIndex) in i.child" :value="a.name">
                                                <p style="width: 100%"
                                                   @click="getChecboxData(conIndex,index,a.name,i.conditionName)">{{a.name}}</p>
                                            </checker-item>
                                        </checker>
                                    </div>
                                </template>
                            </div>
                        </div>
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
                allData:[], //渲染版数据
                childData1:[],//子级数据
                childData2:[],
                childData3:[],
                cData:[],
                cData1:[],
                cData2:[],
                cData3:[],
                cData4:[],
                cData5:[],
                obj1:{},
                jilianActive:false,
                isActive:false,
                isActive1:false,
                id: '',
                show1: false,
                show2: false,
                dateTime: '',
                region:'',
                subregion:'',
                city:'',
                shop:'',
                testStr:'',
                childData:[],   //子级所有数据
                conditionId:'', //条件项id
                conditionValue:'',  //条件项的数据
                showNoScroll:false,
                showNoScroll2:false,
                showNoScroll3:false,
                warnText:'',
                modelId:'',
                checkObj:{}

            }
        },
        watch: {},
        created(){
            this.renderData();
        },
        methods: {
            shoelistActive(index,data){
                if(data[index].isActive==true){
                    data[index].isActive = false;
                } else {
                    data[index].isActive = true;
                }
                console.log(index);
                console.log(data[index]);
            },
            getChecboxData(index,conIndex,value,conditionName){
                this.checkObj = {
                    cengji:index,
                    value:value,
                    type:conditionName
                }
//                this.cData4.push(this.checkObj)
                if(this.cData4.length < 1){
                    this.cData4.push(this.checkObj);
                    this.cData5.push(value);
                } else {
                    var num = this.cData5.indexOf(value);
                    if(this.cData5[num] == value){
                        this.cData4.splice(num,1);
                        this.cData5.splice(num,1);
                    } else {
                        this.cData4.push(this.checkObj);
                        this.cData5.push(value);
                    }
                }
                setTimeout(()=>{
                    this.allData[conIndex].conditions[index].fuck=[];
                    for(let i=0;i<this.cData4.length;i++){
                        if(this.cData4[i].cengji == index){
                            this.allData[conIndex].conditions[index].fuck.push(this.cData4[i].value);
                        }
                    }
                    console.log(index,conIndex,this.allData[conIndex].conditions);
                },500)
                console.log(this.cData4,num,'---------------checkObj----------------')
            },
            getChild(conditionId,id,index,index1,value,typeName){
                this.testStr = "'"+id+"'";
                this.renderChildData(conditionId,index);
                this.cData[index1].answers = value;
                this.cData[index1].selectId = index;
                this.obj={
                    id:index,
                    value:this.cData[index1].answers,
                    type:typeName
                }
//                alert(this.cData[index].answers = value)
                setTimeout(()=>{
                    //调用接口二加载数据替换本来循环遍历的数据cData
                    for(let i=0;i<this.childData1.length;i++){
//                        this.cData[i+index1+1] = this.childData1[i];
                        Vue.set(this.cData,i+index1+1,this.childData1[i])

                    }
                },300);
//                alert(this.obj)
                console.log(this.cData,'--------------------cData------------------------')
            },
            showJlian(index,data){
//                if(this.jilianActive == value){
//                    this.jilianActive = 9999;
//                } else {
//                    this.jilianActive = value;
//                    console.log(this.jilianActive);
//                }
                if(data[index].isActive==true){
                    data[index].isActive = false;
                } else {
                    data[index].isActive = true;
                }
            },
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
            clearSubmit(){
//                alert(this.cData3)
                this.cData3 = [];
                for(let i=0;i<this.cData.length;i++){
                    this.cData3.push(this.cData[i].conditionName+':'+this.cData[i].answers);
                }
                console.log(this.cData3)
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
            renderData(){
                //url输入对应参数
                let modelId = this.getUrlParams('modelId');
                modelId = modelId?modelId:'1000';
                queryALLService().save({
                    modelId: modelId
//                    modelId: 1000
                }).then(res => {
                    let body = res.body;
                    if (body.data) {
                        this.allData = body.data;
                        for(let i=0;i<this.allData.length;i++){
                            if(this.allData[i].jilian == true){
                                this.cData = this.allData[i].conditions;
                            }
                        }
                        for(let j=0;j<this.allData.length;j++){
                            this.allData[j].conditions.forEach(function(item){
                                Vue.set(item,'fuck',[]);
                            });
                        }
                        this.allData.forEach(function (item,index) {
                            Vue.set(item, 'answers', '');
                            Vue.set(item, 'color', '');
                            if(index == 0){
                                Vue.set(item, 'isActive', true);
                            }else{
                                Vue.set(item, 'isActive', false);
                            }
                        })
                        for(let k=0;k<this.allData.length;k++){
                            this.allData[k].conditions.forEach(function(item,index){
                                if(index == 0){
                                    Vue.set(item, 'isActive', true);
                                }else{
                                    Vue.set(item, 'isActive', false);
                                }
                            })
                        }
                        console.log(this.allData);
                    }
                }, res => {
                    this.showNoScroll = true;
                    this.warnText = '网络超时，请重试';
                })
            },
            renderChildData(conditionId,index) {
                queryChildService().save({
                    modelId:1000,
                    conditionId:conditionId,
                    values:this.testStr
                }).then(res=>{
                    let body = res.body;
                    if(body.errmsg='ok'){
                        this.childData1 = body.data;
                    } else{
                    }
                },res=>{
                })
            },
            sureSubmit(){
                this.cData3 = [];
                this.cData2 = [];
                this.childData3 = this.childData2.join(',');
                for(let i=0;i<this.cData.length;i++){
                    if(this.cData[i].conditionType == 'single'){
                        this.cData3.push(this.cData[i].conditionName+':'+this.cData[i].answers);
                    } else if (this.cData[i].conditionType == 'multiple'){
                        this.cData3.push(this.cData[i].conditionName+':'+this.childData3);
                    }
                }
                for(let k=0;k<this.allData.length;k++){
                    if(this.allData[k].jilian == false){
                        for(let j=0;j<this.allData[k].conditions.length;j++){
                            this.cData2.push(this.allData[k].conditions[j].conditionName+':'+this.allData[k].conditions[j].fuck);
                        }
                    }
                }
                console.log(this.cData2,'================------------------=========')
                console.log(this.cData3)
                this.show1 = false;
                this.showNoScroll3 = true;
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
    .weui-dialog{
        text-align: left;
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
