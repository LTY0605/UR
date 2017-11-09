<template>
    <div class="page_consume">
        <div class="consumeTitle">
            <span :class="{active:titleTab==index}" v-for="(item, index) in titleList" @click="titleTab = index">
                {{item.name}}
            </span>
        </div>

        <div class="tabContain">
            <div class="tabItem" v-if="titleTab==0">
                <consumeList></consumeList>
                <returnBack></returnBack>
            </div>
            <div class="tabItem" v-if="titleTab==1">
                <consumeList></consumeList>
            </div>
            <div class="tabItem" v-if="titleTab==2">
                <returnBack></returnBack>
            </div>

        </div>


    </div>
</template>

<script>
    import sample from './sample.vue'
    import consumeList from './consumeList.vue'
    import returnBack from './returnBack.vue'
    import {XHeader, Scroller, Tab, TabItem, Swiper, SwiperItem, Calendar,CellFormPreview, Cell, Group, InlineCalendar} from 'vux'
    export default {
        components: {
            XHeader, Scroller, Tab, TabItem, Swiper, SwiperItem, Calendar, CellFormPreview,Cell, Group,returnBack,
          InlineCalendar,sample,consumeList
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

    }

</style>
