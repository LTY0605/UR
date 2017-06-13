<template>
   <div class="page_integralBill">
      <div class="integralTitle">
         <span :class="{active:titleTab==index}" v-for="(item, index) in titleList"
               @click="changeItem(index,item.code)">{{item.name}}</span>
      </div>
      <div class="tabContain">
         <div class="tabItem tab-swiper">
            <sample :dataList="dataList"></sample>
         </div>
      </div>
       <toast v-model="showNoScroll" type="text" :time="1000">{{warnText}}</toast>
   </div>
</template>

<script>
    import {
        integralService
    } from '../../services/integral.js'
    import sample from './sample.vue'
    import {XHeader, Toast} from 'vux'
    export default {
        components: {
            XHeader, sample, Toast
        },
        data () {
            return {
                titleTab: 0,
                index: 1,
                time: '',
                warnText:'',
                showNoScroll:false,
                currentCode:0,
                dataList:[],
                titleList: [
                    {
                        code: 0,
                        name: '全部'
                    },
                    {
                        code: 2,
                        name: '消费'
                    },
                    {
                        code: 1,
                        name: '赠送'
                    }
                ],

            }
        },
        mounted(){
        },
        watch: {},
        created(){
            this.renderData()
        },
        methods:{
            changeItem(index,code){
                this.titleTab = index;
                this.currentCode = code;
                this.renderData();
            },
            renderData(){
                integralService().save({
                    cardcode:window.localStorage.getItem('cardcode'),
                    integralType:this.currentCode
                }).then(res =>{
                    let body = res.body;
                    if(body.errcode == 0){
                        this.dataList = body.list;
                    } else{
                        this.showNoScroll = true;
                        this.warnText = body.errmsg;
                    }
                },res =>{
                    this.showNoScroll = true;
                    this.warnText = "网络超时，请重试";
                })
            },
        },
        computed: {}
    }

</script>
<style lang="less" rel="stylesheet/less">
   .page_integralBill {
   .integralTitle {
      width:auto;
      height: 1.3rem;
      line-height: 1.2rem;
      margin: 1rem 1rem 0rem 1rem;
      border: 1px solid #EC6941;
      border-radius: .2rem;
      font-size: 0;
   span {
      font-size: .7rem;
      text-align: center;
      color: #EC6941;
      display: inline-block;
      vertical-align: top;
      width: 33.33333%;
      height: 1.2rem;
      position: relative;
   }
   span:before {
      content: '';
      width: 1px;
      height: 100%;
      right: 0;
      display: block;
      background: #EC6941;
      position: absolute;
   }
   span:last-child:before{
      width: 0px !important;
   }
   span.active {
      background: #EC6941;
      color: #fff;
   }
   }

   }

</style>
