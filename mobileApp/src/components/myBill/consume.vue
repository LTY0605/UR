<template>
    <div class="page_consume">
        <div class="consumeTitle">
            <span :class="{active:titleTab==index}" v-for="(item, index) in titleList" @click="titleTab = index">
                {{item.name}}
            </span>
        </div>

        <div class="tabContain">
            <div class="tabItem" v-if="titleTab==0">
                <sample></sample>
            </div>
            <div class="tabItem" v-if="titleTab==1">
                <sample></sample>
            </div>
            <div class="tabItem" v-if="titleTab==2">
                <sampleT></sampleT>
            </div>

        </div>


    </div>
</template>

<script>
    import sample from './sample.vue'
    import sampleT from './sampleT.vue'
    import {XHeader, Scroller, Tab, TabItem, Swiper, SwiperItem, Calendar,CellFormPreview, Cell, Group, InlineCalendar} from 'vux'
    export default {
        components: {
            XHeader, Scroller, Tab, TabItem, Swiper, SwiperItem, Calendar, CellFormPreview,Cell, Group,
          InlineCalendar,sample,sampleT
        },
        data () {
            return {
                titleTab: 0,
                list2: ['全部', '消费', '退货'],
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
                        name: '退货'
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
    .page_consume {
    .consumeTitle {
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
    /*.detail {*/
        /*position: relative;*/
        /*margin: .8rem auto;*/
        /*padding-left: 1rem;*/
        /*border-bottom: 1px solid #D2D2D2;*/
    /*.price{*/
        /*font-size: 1rem;*/
        /*color: #333;*/
        /*top: .9rem;*/
        /*right: 1rem;*/
        /*position: absolute;*/

    /*}*/
    /*ul{*/
        /*list-style: none;*/
        /*height: 4.3rem;*/
        /*width: 100%;*/
        /*font-size: .6rem;*/
        /*color: #666;*/

        /*!*display: inline-block;*!*/

    /*}*/

    /*.number{*/
        /*height: auto;*/
        /*width: 8.25rem;*/
    /*}*/
    /*a{*/
        /*list-style: none;*/
        /*color: #666;*/
        /*padding-left: .5rem;*/
    /*}*/
    /*.number a{*/
        /*font-size: .75rem !important;*/
        /*color: #333 !important;*/
    /*}*/
    /*.itype{*/
        /*height: auto;*/
        /*width: 4.92rem;*/
        /*padding: .3rem 0rem .3rem 0rem;*/
        /*!*padding: .45rem 0rem .4rem 0rem;*!*/
    /*}*/


    /*.time{*/
        /*height: auto;*/
        /*width: 8rem;*/
        /*!*margin-top: .5rem;*!*/
        /*!*padding-top: .4rem;*!*/
    /*}*/
    /*}*/

    }

</style>
