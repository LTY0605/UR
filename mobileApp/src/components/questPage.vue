<template>
    <div class="page_questPage">
        <x-header :left-options="{backText:''}">UR问卷调研</x-header>
        <div class="quest_con" v-if="currentData.subjectType">
            <one :currentData="surveyData[currentIndex].option" v-if="currentData.subjectType=='combobox'"></one>
            <two :currentData="surveyData[currentIndex]" v-if="currentData.subjectType=='radio'"></two>
            <!--<three :currentData="surveyData[currentIndex].option" v-if="currentData.subjectType=='radio'"></three>-->
            <four :currentData="surveyData[currentIndex]" v-if="currentData.subjectType=='checkbox'"></four>
            <button class="quest-btn"
                    @click="next" v-show="currentIndex<length-1">继 续（{{currentIndex+1}}/{{length}}）</button>
            <button class="quest-btn" @click="next" v-show="currentIndex==length-1">提 交</button>
        </div>
        <toast v-model="showNoScroll" type="text" :time="1000">{{warnText}}</toast>
    </div>
</template>

<script>
    import { surveyServices,surveyCommit } from '../services/quest.js'
    import one from './quest/one.vue'
    import two from './quest/two.vue'
    import three from './quest/three.vue'
    import four from './quest/four.vue'
    import {XHeader, XButton, Toast} from 'vux'
    export default{
        components:{
            XHeader, XButton, Toast, one, two, three, four
        },
        data(){
            return{
                showNoScroll:false,
                warnText:'',
                num:'1',
                subjectCode:'',
                surveyType:'02',
                surveyCode:'wqdc',
                currentIndex:0,
                currentData:[],
                length:0,
            }
        },
        mounted(){
            this.getSurveyData();
        },
        methods:{
            getSurveyData(){
                surveyServices().get({
                    surveyType: this.surveyType,
                    surveyCode: this.surveyCode
                }).then(res=>{
                    let body =res.body;
                    if(body.errcode == 0){
                        this.surveyData = body.survey;
                        this.length = this.surveyData.length;
                        this.currentData = this.surveyData[this.currentIndex];
                    }else{
                        console.log(body.errmsg)
                    }
                },res=>{
                    console.log(res);
                })
            },
            saveSurveyData(){
                surveyCommit().save({
                    cardcode: window.localStorage.getItem("cardcode"),
//                    surveyCode
                }).then(res=>{

                },res=>{

                })
            },
            next(){
                this.currentIndex = this.currentIndex+1;
                this.currentData = this.surveyData[this.currentIndex]
                return
                let pro = document.getElementById('provinces');
                let city = document.getElementById('citys');
                let store = document.getElementById('stores');
                if(city.value == '' || pro.value == '' || store.value == ''){
                    this.showNoScroll = true;
                    this.warnText = '您有信息未填写'
                    return
                }
                let radios = document.getElementsByName('radio');
                let radioArr = [];
                for(let i=0;i<radios.length;i++){
                    (function () {
                        if(radios[i].checked == true){
                            radioArr.push(radios[i].checked)
                        }
                    })(i)
                }
                if(radioArr.length != 1){
                    this.showNoScroll = true;
                    this.warnText = '您有信息未填写'
                }
                let checboxs = document.getElementsByName('check');
                let checArr =[];
                for(let i=0;i<checboxs.length;i++){
                    (function () {
                        if(checboxs[i].checked == false){
                            checArr.push(checboxs[i].checked)
                        }
                    })(i)
                }
                if(checArr.length == checboxs.length){
                    this.showNoScroll = true;
                    this.warnText = '您有信息未填写'
                }
            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    .page_questPage{
        .vux-header {
            background-color: #AB9236 !important;
        }

        .vux-header .vux-header-title, .vux-header h1 {
            font-size: .85rem;
        }
        .weui-btn{
            font-size: .75rem;
            color: #FFFFFF;
            background: #AB9236;
        }
        .quest_con{
            padding: 1.25rem 1.75rem .7rem 1.75rem;
            font-size: 0;
            background: url("../assets/query_05.png") no-repeat;
            background-size: 15.5rem 9.85rem;
            background-position: 1.75rem 4.5rem;
            height: auto;
        }
        .quest-btn{
            margin-left: 0;
            width: 100%;
            height: 2rem;
            border: none;
            background: #ab9236;
            color: #FFFFFF;
        }
        button{
            outline: none;
        }
    }
</style>