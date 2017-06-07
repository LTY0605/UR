<template>
    <div class="page_questPage">
        <x-header :left-options="{backText:''}">UR问卷调研</x-header>
        <div class="quest_con">
            <one :surveyData="surveyData" v-if="one"></one>
            <two :sexData="sexData" v-if="two"></two>
            <three :channelData="channelData" v-if="three"></three>
            <four :feelData="feelData" v-if="four"></four>
            <button id="btnText" class="quest-btn" @click="next">继 续（{{num}} /4）</button>
        </div>
        <toast v-model="showNoScroll" type="text" :time="1000">{{warnText}}</toast>
    </div>
</template>

<script>
    import { mapMutations,mapGetters } from 'vuex'
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
                one:true,
                two:false,
                three:false,
                four:false,
                num:'1',
                surveyData:[],
                sexData:[],
                channelData:[],
                feelData:[],
                subjectCode:'',
                surveyType:'02',
                surveyCode:'wqdc',
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
                        this.surveyData = body.survey[0].option;
                        this.sexData = body.survey[1].option;
                        this.channelData = body.survey[5].option;
                        this.feelData = body.survey[3].option;
                        this.subjectCode = body.survey[0].subjectCode;
                        console.log(this.subjectCode);
//                        console.log(this.surveyData[0].option[0]);
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
                let pro = document.getElementById('provinces');
                let city = document.getElementById('citys');
                let store = document.getElementById('stores');
                let fBtn = document.getElementById('btnText');
                if(this.one == true){
                    if(city.value == '' || pro.value == '' || store.value == ''){
                        this.showNoScroll = true;
                        this.warnText = '您有信息未填写'
                    }
                    else{
                        this.one = false;
                        this.num=2;
                        this.two = true;
                    }
                }else if(this.two == true){
                    this.two = false;
                    this.num=3;
                    this.three = true;
                }else if(this.three == true){
                    /*if(this.selects < 0 || this.selects >4){
                        this.showNoScroll = true;
                        this.warnText = '您有信息未填写'
                    }else{
                        this.three = false;
                        this.num=4;
                        fBtn.innerHTML = '提交';
                        this.four = true;
                    }*/
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
                    }else {
                        this.three = false;
                        this.num=4;
                        fBtn.innerHTML = '提交';
                        this.four = true;
                    }
                }else if(this.four == true){
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
                    }else {
                        this.saveSurveyData();
                        console.log(checArr.length)
                    }
                }
            }
        },
        computed:{
            ...mapGetters([
                'selects'
            ])
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