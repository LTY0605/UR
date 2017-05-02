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
               <img @click="showNoScroll=!showNoScroll" width="100%" src="../../assets/icon_money_code.png">
            </p>
         </div>
         <div class="buttonBox">
            <button @click="payCard" class="Box1">扫码支付</button>
             <router-link :to="{name:'personMain',query:{tab:1}}">
                 <button class="Box7">修改密码</button>
             </router-link>
             <router-link to="transaction"><button class="Box3">交易记录</button></router-link>
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
               <img @click="showNoScroll=!showNoScroll" width="100%" src="../../assets/icon_money_code.png">
            </p>
         </div>
         <div class="buttonBox1">
            <div class="btnUp">
               <button @click="payCard" class="Box4">扫码支付</button>
               <router-link to="transfer"><button class="Box5">转赠</button></router-link>
               <button @click="showNoScroll2=true" class="Box6">获取转赠</button>
            </div>
            <div class="btnDown">
                <router-link :to="{name:'personMain',query:{tab:1}}">
                    <button class="Box7">修改密码</button>
                </router-link>
                <router-link to="transaction"><button class="Box8">交易记录</button></router-link>
            </div>
         </div>
      </div>
      <div @click="showNoScroll=false" class="page_pay">
         <x-dialog v-model="showNoScroll"  class="dialog-demo" :scroll="false">
            <div @click.stop class="payCode">
               <div class="tabTitle">
                  <span :class="{active:titleTab==index}" v-for="(item, index) in titleList" @click="titleTab = index">{{item.name}}</span>
               </div>
               <div class="tabContain">
                  <div class="tabItem tab-swiper" v-if="titleTab==0">
                     <div >
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
                            <div id="scratch">
                                <div id="card">￥5000000元</div>
                            </div>
                            <p class="pay-text"><a href="javascript:void(0)" @click="showNoScroll=false">返 回</a></p>
                        </div>
                     </div>
                  </div>
                  <div class="tabItem" v-if="titleTab==1">
                     <img class="pay-img" src="../../assets/money_code2.png" alt=""/>
                      <p class="pay-text"><a href="javascript:void(0)" @click="showNoScroll=false">返 回</a></p>
                  </div>
               </div>
            </div>
         </x-dialog>
      </div>
       <div @click="showNoScroll2=false" class="page_tran">
           <div @click="hide2">
               <x-dialog v-model="showNoScroll2"  class="dialog-demo" :scroll="false">
                   <div @click.stop class="giftCode">
                       <div class="giftCode-img"></div>
                       <p class="giftCode-text">暂无转赠信息</p>
                       <div @click="hide2" class="giftCode-close"></div>
                   </div>
               </x-dialog>
           </div>
       </div>
   </div>
</template>

<script>
    import {XHeader, Scroller, XDialog} from 'vux'
    import LuckyCard from "../../tools/luckyCar/lucky-card.min";
   export default{
       components: {
           XHeader, Scroller, XDialog
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
               showNoScroll:false,
               showNoScroll2:false,
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
       methods:{
           payCard(){
               this.showNoScroll = true;
               setTimeout(function () {
                   LuckyCard.case({
                       ratio: .9,
                   }, function() {
                       this.clearCover();
                   });
               },300)
           },
           show() {
               this.showNoScroll2 = true;
           },
           hide2() {
               this.showNoScroll2 = false;
           },
       },
       computed: {}
   }

</script>
<style lang="less" rel="stylesheet/less">
    @import "../../tools/luckyCar/lucky-card.css";
   .page_giftC {
   #scratch{
       width: 65%;
       height: 2.2rem;
       font-size: .75rem;
       /* line-height: 2.2rem; */
       margin: .5rem auto;
       #card {
           width: 100%;
           height: 2.2rem;
           line-height: 2.2rem;
           font-size: .75rem;
           text-align: center;
           background: #FAFAFA;
       }
       #cover{
           width: 100%;
           height: 100%;
       }
   }
   .page_tran{
       .weui-dialog{
           width: 12.5rem !important;
           max-width: none !important;
       }
       .giftCode{
           display: flex;
           flex-direction: column;
           align-items: center;
           width: 12.5rem;
           height: auto;
           position: relative;
           padding: 2.2rem;
           background: white;
           .giftCode-img{
               width: 3rem;
               height: 3rem;
               background: url("../../assets/warn.png");
               background-size: 100% 100%;
           }
           .giftCode-text{
               font-size: .9rem;
               margin-top: 1rem;
               color: #ec6941;
           }
           .giftCode-close{
               position: absolute;
               width: .8rem;
               height: .8rem;
               background: url("../../assets/money_code3.png");
               background-size: cover;
               top: .6rem;
               right: .6rem;
           }
       }
   }
   .gift1 {
      margin: 1.2rem 1rem;
      padding: .65rem 1rem;
      height: auto;
      font-family: PingFang-SC-Medium;
      font-size: .8rem;
      color: #ffffff;
      background-image: url("../../assets/giftBack1.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;

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
   .Box1,.Box2,.Box3{
       font-size: .75rem;
      background-color: #CDBE86;
      color: #473A0C;
      margin: 0rem;
      padding: 0rem;
      width: 27.7%;
      height: 1.6rem;
      margin-right:8.45%;
   }

   .Box3 {
       font-size: .75rem;
      margin-right: 0;
      padding: 0rem;
   }
   .page_pay{
      display: flex;
      justify-content: center;
      .weui-dialog{
          width: auto;
          max-width:none;
      }

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
       position: relative;
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
      .close{
          border-left:0;
          width: .8rem;
          height: .8rem;
          background: url("../../assets/money_code3.png");
          background-size: 100%;
          top: 0.3rem;
          right:0.3rem;
          position: absolute;

      }

   }
   .pay-img{
      width: 7.5rem;
      height: 7.5rem;
      margin:2.75rem 2.5rem 1.2rem ;


   }
   .scanPay{
      width: 12.5rem;
      height:auto;
      position: relative;
      background: white;
      font-size: 0;

   .scanPay-title{
      font-size: .7rem;
      text-align: center;
      color: #000000;
       margin: .5rem auto;
       width: 80%;

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
      /*width: 16.8rem;*/
      height: auto;
      font-family: PingFang-SC-Medium;
      font-size: .8rem;
      color: #ffffff;
      background-image: url("../../assets/giftBack2.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
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
       font-size: .75rem;
      background-color:#CDBE86;
      color:#473A0C;
      margin: 0rem;
      padding: 0rem;
      width: 27.7%;
      height: 1.6rem;
      margin-right:8.45%;
   }
   .Box6{
       font-size: .75rem;
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
