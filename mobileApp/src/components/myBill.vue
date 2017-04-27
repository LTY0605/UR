<template>
   <div class="page_myBill">
      <x-header :left-options="{backText:''}">我的账单</x-header>
      <!--<scroller :height="-46+'px'" lock-x>-->
      <div class="tabTitle">
         <span :class="{active:titleTab==index}" v-for="(item, index) in titleList" @click="titleTab = index">{{item.name}}</span>
      </div>
      <div class="tabContain">
         <div class="tabItem tab-swiper" v-if="titleTab==0">
            <consume></consume>
         </div>
         <div class="tabItem" v-if="titleTab==1">
            <integralBill></integralBill>
         </div>
      </div>
      <!--</scroller>-->
   </div>
</template>

<script>
  import consume from './myBill/consume.vue'
    import integralBill from './myBill/integralBill.vue'
    import {XHeader, Scroller, Tab, TabItem, Swiper, SwiperItem, Calendar, Cell, Group, InlineCalendar} from 'vux'
    export default {
      components: {
        XHeader, Scroller, Tab, TabItem, Swiper, SwiperItem,consume, Calendar, Cell, Group, InlineCalendar,integralBill
      },
      data () {
        return {
          titleTab: 0,
          index: 1,
          time: '',
          titleList: [
            {
              code: 0,
              name: '消费明细'
            },
            {
              code: 1,
              name: '积分明细'
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

   .page_myBill {
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
      width: 50%;
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
   .tabContain {
      width: 100%;
      height: auto;
   }

   }
</style>
