<template>
   <div class="page_integralS">
      <x-header>积分查询</x-header>
      <!--<scroller :height="-46+'px'" lock-x>-->
      <div class="tabTitle">
         <span :class="{active:titleTab==index}" v-for="(item, index) in titleList" @click="titleTab = index">{{item.name}}</span>
      </div>
      <div class="tabContain">
         <div class="tabItem tab-swiper" v-if="titleTab==0">
            <sample></sample>
            <sampleT></sampleT>
         </div>
         <div class="tabItem" v-if="titleTab==1">
            <sampleT></sampleT>
         </div>
         <div class="tabItem" v-if="titleTab==2">
            <sample></sample>
         </div>
      </div>
      <!--</scroller>-->
   </div>
</template>

<script>
//  import Consume from './transaction/consume.vue'
  import sample from './myBill/sample.vue'
   import sampleT from './myBill/sampleT.vue'
  import {XHeader, Scroller, Tab, TabItem, Swiper, SwiperItem, Calendar, Cell, Group, InlineCalendar} from 'vux'
  export default {
    components: {
      XHeader, Scroller, Tab, TabItem, Swiper, SwiperItem, Calendar, Cell, Group, InlineCalendar,sampleT,sample
    },
    data () {
      return {
        titleTab: 0,
        index: 1,
        time: '',
        titleList: [
          {
            code: 0,
            name: '全部'
          },
          {
            code: 1,
            name: '消费'
          },
          {
            code: 2,
            name: '兑换'
          }
        ],
      }
    },
    watch: {

    },
    mounted(){
    },
    created(){
    },
    computed: {}
  }
</script>
<style lang="less" rel="stylesheet/less">
   .vux-header {
      background-color: #AB9236 !important;
   }

   .vux-header .vux-header-title, .vux-header h1 {
      font-size: .85rem;
   }

   .page_integralS {
   .tabTitle {
      width: 100%;
      height: 1.85rem;
      line-height: 1.85rem;
      font-size: 0;
   span {
      font-size: .75rem;
      display: inline-block;
      vertical-align: top;
      text-align: center;
      width: 33.3333%;
      background: #F2EDDA;
      color: #CDBE86;
      border-left: 1px solid #CDBE86;
      position: relative;
   }
   span:first-child {
      border: none;
   }
   span.active {
      background: #CDBE86;
      color: #fff;
   }
   span.active:after {
      content: '';
      border-style: solid;
      border-width: .35rem;
      border-color: transparent transparent #fff transparent;
      position: absolute;
      bottom: -1px;
      left: 50%;
      margin-left: -0.175rem;
      display: block;
   }
   }
   }
</style>