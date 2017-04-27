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
   </div>
</template>

<script>
   export default{
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
               }]
           }
       },
       mounted(){
       },
       created(){
       }
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
   .Type {
      font-size: .9rem;
   }
   .Id {
      padding: .375rem 0rem;
   }
   .money {
      font-size: .9rem;
   }
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
      display: flex;
      justify-content: space-between;
      height: auto;
   }
   .Box1 {
      background-color: #CDBE86;
      color: #473A0C;
   }
   .Box2 {
      background-color: #CDBE86;
      color: #473A0C;
   }
   .Box3 {
      background-color: #CDBE86;
      color: #473A0C;
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
      width: 27.7%;
      margin-right:8.45%;
   }
   .Box6{
      background-color:#CDBE86;
      color:#473A0C;
      margin: 0rem;
      width: 27.7%;
      margin-right: 0;
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