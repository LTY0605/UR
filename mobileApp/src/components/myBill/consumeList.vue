<template>
   <div class="page_consumeList">
      <div class="detail">
         <no-data v-show="consumeListlists.length==0"></no-data>
         <ul class="consumeListlist" v-show="consumeListlists.length!=0">
            <li v-for="item in consumeListlists" class="list">
               <p>单号：<span class="list-number">{{item.billNO}}</span></p>
               <p class="list-mar">类型：{{item.saleTypeName}}</p>
               <p>日期：{{item.billDate}}</p>
               <template v-if="item.saleType == 0 || item.saleType == 3">
                  <p class="list-money red">+{{item.payAmount}}</p>
               </template>
               <template v-else>
                  <p class="list-money">{{item.payAmount}}</p>
               </template>
            </li>
         </ul>
      </div>
   </div>
</template>

<script>
    import noData from '../common/noData.vue'
  export default {
    components: {noData},
      props: {
          consumeListlists:Array,
      },
    data () {
      return {


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
   .page_consumeList{
   .detail{
   .consumeListlist{
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
      color:#F67982;
   }
   }
   }
   }
   }
</style>