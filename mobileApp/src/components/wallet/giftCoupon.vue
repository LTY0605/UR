<template>
   <div class="page_giftC">
      <div class="gift1" >
         <div class="massege1">
            <ul class="massegel1List">
               <li v-for="list in massege1List" class="list">
                  <p class="Type">{{list.type}}</p>
                  <p class="Id">{{list.Id}}</p>
                  <p class="money">余额：{{list.money}}</p>
               </li>
            </ul>
         </div>
         <div class="imgbox">
            <p class="picture">
               <img width="100%" src="../../assets/icon_money_code.png">
            </p>
         </div>
         <div class="buttonBox">
            <button class="Box1">扫码支付</button>
            <button class="Box2">修改密码</button>
            <button class="Box3">交易记录</button>
         </div>
      </div>
      <div class="gift2">
         <div class="massege2">
            <ul class="massegel2List1">
               <li v-for="list1 in massege2List1" class="list1">
                  <p class="Type">{{list1.type}}</p>
                  <p class="number">{{list1.number}}</p>
                  <p class="money">余额：{{list1.money}}</p>
               </li>
            </ul>
         </div>
         <div class="imgbox1">
            <p class="picture1">
               <img  width="100%" src="../../assets/icon_money_code.png">
            </p>
         </div>
         <div class="buttonBox1">
            <div class="btnUp">
               <button class="Box4">扫码支付</button>
               <button class="Box5">转赠</button>
               <button class="Box6">获取转赠</button>
            </div>
            <div class="btnDown">
               <button class="Box7">修改密码</button>
               <button class="Box8">交易记录</button>
            </div>
         </div>
      </div>
      <div  class="page_pay">
         <!--<x-dialog v-model="showNoScroll"  class="dialog-demo" :scroll="false">-->
            <div  class="payCode">
               <div class="tabTitle">
                  <span :class="{active:titleTab==index}" v-for="(item, index) in titleList" @click="titleTab = index">{{item.name}}</span>
               </div>
               <div class="tabContain">
                  <div class="tabItem tab-swiper" v-if="titleTab==0">
                     <div >
                        <!--<x-dialog v-model="showNoScroll"  class="dialog-demo" :scroll="false">-->
                           <div  class="scanPay">
                              <p class="scanPay-title">京东储值卡</p>
                              <div class="pay-box">
                                 <img class="scanPay-img1" src="../../assets/money_code.png" alt=""/>
                              </div>
                              <p class="scanPay-number">URV00000018</p>
                              <div class="pay-box">
                                 <img class="scanPay-img2" src="../../assets/money_code.png" alt=""/>
                              </div>
                              <p class="scanPay-massege">如不能扫描请刮开密码</p>
                              <div class="scanPay-close"></div>
                           </div>
                        <!--</x-dialog>-->
                     </div>
                  </div>
                  <div class="tabItem" v-if="titleTab==1">
                     <img class="pay-img" src="../../assets/money_code2.png" alt=""/>
                     <p class="pay-text"><a href="#">返 回</a></p>
                  </div>
               </div>
            </div>
         <!--</x-dialog>-->
      </div>
   </div>
</template>

<script>
    import {XHeader, Scroller} from 'vux'
   export default{
       components: {
           XHeader, Scroller
       },
       data(){
           return{
               massege1List:[{
                   type: '礼品卡',
                   Id: '7165 1560 1084 4001',
                   money:'￥1000.00'
               }
               ],
               massege2List1:[{
                   type:'UR投资人专属卡',
                   number:'URV00000018',
                   money:'￥10000.00'
               }],
               titleTab: 0,
               list2: ['扫扫支付', '付款码'],
               index: 1,
               time: '',
               titleList: [
                   {
                       code: 0,
                       name: '扫扫支付'
                   },
                   {
                       code: 1,
                       name: '付款码'
                   },

               ]

           }
       },
       mounted(){
       },
       created(){
       },
       computed: {}
   }

</script>
<style lang="less" rel="stylesheet/less">
   .page_giftC {
   .gift1 {
      margin: 1.2rem 1rem;
      padding: .7rem 1rem;
      width: 16.8rem;
      height: auto;
      font-family: PingFang-SC-Medium;
      font-size: .8rem;
      color: #ffffff;
      background-image: url("../../assets/giftBack1.png");
      background-repeat: no-repeat;
      background-size: 100%;
      position: relative;
   }
   .massege1 {
      display: inline-block;
      margin-bottom: .5rem;
   }
   .list {
      list-style: none;
      font-family: PingFang-SC-Medium;
   }

   .Type {
      font-size: .9rem;
   }
   .Id {
      padding: .375rem 0rem;
   }
   .money {
      font-size: .9rem;
   }

   .picture {
      width: 1.3rem;
      height: 1.3rem;
      right: 1rem;
      top: 2.7rem;
      position: absolute;
   }
   .buttonBox {
      font-size: 0;
      /*display: flex;*/
      /*justify-content: space-between;*/
      margin: auto 0;
      height: auto;
   }
   .Box1 ,.Box2 ,.Box3{
      background-color: #CDBE86;
      color: #473A0C;
      margin: 0rem;
      padding: 0rem;
      width: 27.7%;
      height: 1.6rem;
      margin-right:8.45%;
   }
   .Box3 {
      margin-right: 0;
      padding: 0rem;
   }
   .page_pay{
      display: flex;
      justify-content: center;

   }
   .payCode{
      width: 12.55rem;
      height: auto;
      font-family:PingFang-SC-Medium;
      margin: 0;
      padding: 0;

   }
   .pay-text{
      text-align: center;
      font-size: .6rem;
      margin-bottom: .9rem;
      a{
         list-style: none;
         color: #F68B79;
         text-decoration: underline;

      }
   }

   .tabTitle{
      width: 100%;
      height: auto;
      font-size: 0;
      span{
         font-size: .75rem;
         display: inline-block;
         width: 50%;
         background: #ffffff;
         color: #000000;
         border-left: 1px solid #CDBE86;
         height: 2.5rem;
         text-align: center;
         padding-top: .25rem;

      }

   }
   .pay-img{
      width: 7.5rem;
      height: 7.5rem;
      margin:2.75rem 2.5rem 1.2rem ;


   }
   .scanPay{
      width: 12.5rem;
      height:15.1rem;
      position: relative;
      background: white;
      font-size: 0;

   .scanPay-title{
      font-size: .7rem;
      text-align: center;
      color: #000000;
      margin: .5rem 4.5rem;

   }
   .pay-box{
      display: flex;
      justify-content: center;
   }
   .scanPay-massege{
      width:auto;
      font-size: .6rem;
      text-align: center;
      color: #FF0018;
   }
   .scanPay-img1,.scanPay-img2{
      width: 7.85rem;
      height: 2.2rem;

   }
   .scanPay-img2{
      margin: .6rem auto;
   }
   .scanPay-number{
      text-align: center;
      font-size: .6rem;
      padding: .2rem 0rem .5rem;
      border-bottom: 1px solid #CDBE86;
   }
   .scanPay-close{
      position: absolute;
      width: .8rem;
      height: .8rem;
      background-size: 100%;
      top: -.15rem;
      right: .6rem;
   }
   }
   .gift2 {
      margin: 1.2rem 1rem;
      padding: .7rem 1rem;
      width: 16.8rem;
      height: auto;
      font-family: PingFang-SC-Medium;
      font-size: .8rem;
      color: #ffffff;
      background-image: url("../../assets/giftBack2.png");
      background-repeat: no-repeat;
      background-size: 100%;
      position: relative;
   }
   .list1 {
      list-style: none;
   }
   .Type{
      font-size: .9rem;
   }
   .number{
      padding: .375rem 0rem;
   }
   .money{
      font-size: .9rem;
   }
   .picture1{
      width: 1.3rem;
      height: 1.3rem;
      right: 1rem;
      top: 2.8rem;
      position: absolute;
   }
   .buttonBox1{
      height:auto;
      margin: auto 0;
   }
   .Box4,.Box5,.Box7,.Box8{
      background-color:#CDBE86;
      color:#473A0C;
      margin: 0rem;
      padding: 0rem;
      width: 27.7%;
      height: 1.6rem;
      margin-right:8.45%;
   }
   .Box6{
      background-color:#CDBE86;
      color:#473A0C;
      margin: 0rem;
      width: 27.7%;
      margin-right: 0;
      padding: 0rem;
   }
   .btnUp{
      margin: .5rem 0;
      font-size: 0;

   }
   .btnDown{
      font-size: 0;
   }

   }


</style>