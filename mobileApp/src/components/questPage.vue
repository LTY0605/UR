<template>
    <div class="page_questPage">
        <x-header :left-options="{backText:''}">UR问卷调研</x-header>
        <div class="quest_con">
            <one :surveyData="surveyData" v-if="one"></one>
            <two :sexData="sexData" v-if="two"></two>
            <three :channelData="channelData" v-if="three"></three>
            <four :feelData="feelData" v-if="four"></four>
            <button id="btnText" class="quest-btn" @click="next">继 续（{{num}} /10）</button>
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
                surveyData:[
                    {
                    title:"请选择你惠临的店",
                    orderNumber:"1",
                    subjectCode:"wqdc_1",
                    subjectType:"combobox",
                    otherOption:[],
                    option:[{
                        id:"1",
                        value:"广东省",
                        parentID:"0",
                    },{
                        id:"2",
                        value:"广州市",
                        parentID:"1",
                    },{
                        id:"3",
                        value:"正佳店",
                        parentID:"2",
                    },{
                        id:"4",
                        value:"福建省",
                        parentID:"0",
                    },{
                        id:"5",
                        value:"福州市",
                        parentID:"4",
                    },{
                        id:"6",
                        value:"SM店",
                        parentID:"5",
                    }]
                },
                    {
                    title:"你的性别",
                    orderNumber:"2",
                    subjectCode:"wqdc_2",
                    subjectType:"radio",
                    otherOption:[],
                    option:[{
                        id:"4",
                        value:"男",
                        parentID:"",
                    },{
                        id:"5",
                        value:"女",
                        parentID:"",
                    }]


                },
                    {
                    title:"您从哪些渠道关注UR品牌?(多线)",
                    orderNumber:"3",
                    subjectCode:"wqdc_3",
                    subjectType:"checkbox",
                    otherOption:[],
                    option:[{
                        id:"6",
                        value:"A.UR店内",
                        parentID:"",
                    },{
                        id:"7",
                        value:"B.官方",
                        parentID:"",
                    },{
                        id:"8",
                        value:"C.明星街拍",
                        parentID:"",
                    },{
                        id:"9",
                        value:"D.朋友推荐",
                        parentID:"",
                    }]},
                    {
                        title:"您对门店形象的整体感觉与以下哪项最符合",
                        orderNumber:"4",
                        subjectCode:"wqdc_4",
                        subjectType:"checkbox",
                        minOption:1,
                        maxOption:2,
                        otherOption:[{
                            name:"wqdc_4_memo",
                            type:"input",
                            value:"PGlucHV0IHR5cGU9InVybCIgbmFtZT0id3FkY180X21lbW8iIC8+"
                        }],
                        option:[{
                            id:"10",
                            value:"A.橱窗奢华大气，整体布局整齐有序",
                            parentID:"",
                        },{
                            id:"11",
                            value:"B.店面设计一般，没有深刻印象",
                            parentID:"",
                        },{
                            id:"12",
                            value:"C.门店设计风格不吸引，环境一般",
                            parentID:"",
                        },{
                            id:"13",
                            value:"D.其他（请注明:[wqdc_4_memo]）",
                            parentID:"",
                        }]


                    }],
                sexData:[],
                channelData:[],
                feelData:[],
                surveryType:'02',
                surveyCode:'wqdc',
            }
        },
        mounted(){
//            this.getSurveyData();
//            this.testSurveyData();
        },
        methods:{
//            testSurveyData(){
//                let testData = JSON.stringify(this.surveyData[0].option,['value']);
//                console.log(testData);
//            },
            getSurveyData(){
                surveyServices().get({
                    surveyType: this.surveyType,
                    surveryCode: this.surveyCode
                }).then(res=>{
                    let body =res.body;
                    if(body.errcode == 0){
                        this.surveyData = body.survey[0];
                        this.sexData = body.survey[1];
                        this.channelData = body.survey[2];
                        this.feelData = body.survey[3];
                        console.log(this.surveyData);
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