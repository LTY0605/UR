<template>
    <div class="page_questPage">
        <x-header :left-options="{backText:''}">UR问卷调研</x-header>
        <div class="quest_con" v-if="currentData.subjectType">
            <one :surveyData="surveyData"
                 :currentIndex="currentIndex" v-if="currentData.subjectType=='combobox'"></one>
            <two :surveyData="surveyData"
                 :otherText="otherText"
                 @changText="changText"
                 :currentIndex="currentIndex" v-if="currentData.subjectType=='radio'"></two>
            <!--<three :currentData="surveyData[currentIndex].option" v-if="currentData.subjectType=='radio'"></three>-->
            <four :surveyData="surveyData" :currentIndex="currentIndex"
                  v-if="currentData.subjectType=='checkbox'"></four>
            <button class="quest-btn"
                    @click="next" v-show="currentIndex<length-1">继 续（{{currentIndex+1}}/{{length}}）</button>
            <button class="quest-btn" @click="submit" v-show="currentIndex==length-1">提 交</button>
        </div>
        <toast v-model="showNoScroll" type="text" :time="1000">{{warnText}}</toast>
    </div>
</template>

<script>
    import Vue from 'vue'
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
                otherText:'',
                surveyType:'02',
                surveyCode:'wqdc',
                currentIndex:0,
                currentData:[],
                submitCode:{},
                length:0,
            }
        },
        mounted(){
            this.getSurveyData();
        },
        methods:{
            getSurveyData(){
                surveyServices().get({
                    cardcode: window.localStorage.getItem("cardcode"),
                    surveyType: this.surveyType,
                    surveyCode: this.surveyCode
                }).then(res=>{
                    let body =res.body;
                    if(body.errcode == 0){
                        this.surveyData = body.survey;
                        this.surveyData.forEach(function (item,index) {
                            if (item.subjectType == "checkbox" || item.subjectType == "combobox") {
                                Vue.set(item, 'answers', [])
                            } else {
                                Vue.set(item, 'answers', "")
                            }
                        })
                        console.log(this.surveyData,'---------------')
                        this.length = this.surveyData.length;
                        this.currentData = this.surveyData[this.currentIndex];
                    }else{
                        console.log(body.errmsg)
                    }
                },res=>{
                    console.log(res);
                })
            },
            changText(val){
                this.otherText = val
            },
            saveSurveyData(){
                surveyCommit().save(
                    this.submitCode
                ).then(res=>{
                },res=>{
                })
            },
            submit(){
                let data = {};  //选择题的对象
                let other = {}; //其他选项的对象
                let name = [];  //其他选项的key
                let obj = {};   //修改好的选择题对象
                let obj2 = {};  //修改好的其他选项的对象
                let cardcode = window.localStorage.getItem("cardcode");
                obj.cardcode = cardcode;
                obj.surveyCode = this.surveyCode;
                //------------选项push到一个对象里--------------
                for(let i=0;i<this.length;i++){
                    //----------------部分多选的得遍历加前缀----------------
                    if(Array.isArray(this.surveyData[i].answers)){
                        let arrAnswer = [];
                        for(let j=0;j<(this.surveyData[i].answers).length;j++){
                            arrAnswer.push((this.surveyData[i].answers)[j])
                        }
                        this.surveyData[i].answers = arrAnswer
                    }else{
                        this.surveyData[i].answers = this.surveyData[i].answers
                    }
                    Array.prototype.push.call(data,this.surveyData[i].answers);
                    //---------------其他选项----------------
                    if(this.surveyData[i].otherOption[0]){
                        Array.prototype.push.call(other,this.surveyData[i].otherOption[0].value);
                        //---------------value的前缀---------------------
                        name.push(this.surveyData[i].otherOption[0].name);
                    }
                }
                //---------------用Object.keys配合forEach更改对象key的值------------------
                Object.keys(data).forEach(key=>obj[this.surveyData[key].subjectCode] = data[key]);
                Object.keys(other).forEach(key=>{obj2[name[key]] = other[key]});
                console.log(obj,'-------------------选项的对象-------------------');
                console.log(obj2,'---------------------其他选项的对象---------------------');
                this.submitCode = Object.assign(obj,obj2);
                console.log(this.submitCode,'=================POST的对象===================');
//                return
                this.saveSurveyData();

                this.$router.push({
                    path: '/'
                })
            },
            next(){
                //判断是否有选中
                if(Array.isArray(this.surveyData[this.currentIndex].answers)){
                    let len = (this.surveyData[this.currentIndex].answers).length;
                    for (let i=0;i<len;i++){
                        if((this.surveyData[this.currentIndex].answers)[i]==''){
                            this.showNoScroll = true;
                            this.warnText = '你有信息未填写';
                            return
                        }
                    }
                }
                if(this.surveyData[this.currentIndex].answers==''){
                    this.showNoScroll = true;
                    this.warnText = '你有信息未填写';
                    return
                }
                this.currentIndex = this.currentIndex+1;
                this.currentData = this.surveyData[this.currentIndex];
                return
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