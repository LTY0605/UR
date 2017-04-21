<template>
   <div class="page_returnBack" >
      <div class="detail">
         <!--<span class="price">-800</span>-->
         <!--<ul>-->
         <!--<li class="number">单号:<a href="#">#VHB56646</a></li>-->
         <!--<li class="itype">类型:<a href="#">消费</a></li>-->
         <!--<li class="time">日期:<a href="#"></a></li>-->
         <!--</ul>-->
         <ul class="returnBacklist">
            <li v-for="list in returnBacklists" class="list">
               <p>单号：<span class="list-number">{{list.number}}</span></p>
               <p class="list-mar">类型：{{list.type}}</p>
               <p>日期：{{list.time}}</p>
               <p class="list-money red">{{list.money}}</p>
            </li>
         </ul>

      </div>
   </div>
   </div>

</template>

<script>
  export default {
    components: {
    },
    data () {
      return {
        returnBacklists:[
          {
            number: 'TB201704156987',
            type: '退货',
            time: '2017-04-12 15:30:28',
            money: '+200.00'
          },
          {
            number: 'JH201703048746',
            type: '退货',
            time: '2017-03-02 09:38:21',
            money: '+850.00'
          }
        ]

      }
    },
    mounted(){
    },
    watch: {},
    created(){
    },
    computed: {}
  }
</script>
<style lang="less" rel="stylesheet/less">
   .page_returnBack{
   .detail{
   .returnBacklist{
      list-style: none;
   .list{
      font-size: .6rem;
      color: #666666;
      border-bottom: 1px solid #D2D2D2;
      width: auto;
      height: auto;
      padding: .9rem 0 1rem 1rem;
      position: relative;
   .list-number{
      font-size: .75rem;
      color: #333333 !important;
   }
   .list-mar{
      margin:.35rem auto .4rem auto;
   }
   .list-money{
      position: absolute;
      right: 1rem;
      bottom: 2rem;
      font-size: 1rem;
      color: #333333;
      font-weight: 100;
   }
   .red{
      color: #F67982;
   }
   }
   }
   }
   }
</style>