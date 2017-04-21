<template>
   <div class="page_integralBill">
      <div class="integralTitle">
         <span :class="{active:titleTab==index}" v-for="(item, index) in titleList" @click="titleTab = index">
            {{item.name}}
         </span>
      </div>
      <div class="tabContain">
         <div class="tabItem tab-swiper" v-if="titleTab==0">
            <sampleT></sampleT>
            <sample></sample>
         </div>
         <div class="tabItem" v-if="titleTab==1">
            <sampleT></sampleT>
         </div>
         <div class="tabItem" v-if="titleTab==2">
            <sample></sample>
         </div>

      </div>
   
   </div>
</template>

<script>
  import sample from './sample.vue'
  import sampleT from './sampleT.vue'
    import {XHeader, Scroller, Tab, TabItem, Swiper, SwiperItem, Calendar, Cell, Group, InlineCalendar} from 'vux'
    export default {
        components: {
            XHeader, Scroller, Tab, TabItem, Swiper, SwiperItem, Calendar, Cell, Group, InlineCalendar,sampleT,sample
        },
        data () {
            return {
                titleTab: 0,
                list2: ['全部', '消费', '兑换'],
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
        mounted(){
        },
        watch: {},
        created(){
        },
        computed: {}
    }

</script>
<style lang="less" rel="stylesheet/less">
   .page_integralBill {
   .integralTitle {
      width: 16.75rem;
      height: 1.3rem;
      line-height: 1.2rem;
      margin: 1rem 1rem 0rem 1rem;
      border: 1px solid #EC6941;
      border-radius: .2rem;
      font-size: 0;
   span {
      font-size: .6rem;
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