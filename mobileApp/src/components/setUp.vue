<template>
    <div class="page_setUp">
        <x-header>设置</x-header>
        <div>
            <tab :line-width=2 active-color='#fff' v-model="index">
                <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list2"
                          @click="demo2 = item" :key="index">{{item}}
                </tab-item>
            </tab>
            <div class="a" style="height: 200px">
                <swiper v-model="index" height="swiperHeight" :show-dots="false">
                    <swiper-item key="0">
                        <div class="tab-swiper vux-center">
                            <person></person>
                        </div>
                    </swiper-item>
                    <swiper-item key="1">
                        <div class="tab-swiper vux-center">1 Container{{time}}
                            <group>
                                <inline-calendar
                                    v-model="time"
                                ></inline-calendar>
                            </group>
                        </div>
                    </swiper-item>
                    <swiper-item key="2">
                        <div class="tab-swiper vux-center">2 Container
                            <group>
                                <calendar v-model="time" title="出生日期"></calendar>
                            </group>
                        </div>
                    </swiper-item>
                    <swiper-item key="3">
                        <div class="tab-swiper vux-center">3 Container</div>
                    </swiper-item>
                    <!--<swiper-item v-for="(item, index) in list2" :key="index">
                        <div class="tab-swiper vux-center">{{item}} Container</div>
                    </swiper-item>-->
                </swiper>
            </div>

        </div>
    </div>
</template>
<script>
    import Person from './setUp/person.vue'
    import {XHeader, Scroller,Tab,TabItem,Swiper,SwiperItem,Calendar,Cell,Group,InlineCalendar} from 'vux'
    export default {
        components: {
            XHeader,Scroller,Tab,TabItem,Swiper,SwiperItem,Person,Calendar,Cell,Group,InlineCalendar
        },
        data () {
            return {
                demo2: '个人信息',
                list2:['个人信息', '密码修改', '微信解绑', '地址管理'],
                index: 0,
                time:'',

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
    .vux-header {
        background-color: #AB9236 !important;
    }

    .vux-header .vux-header-title, .vux-header h1 {
        font-size: .85rem;
    }
    .page_setUp{
        .vux-tab .vux-tab-item{
            font-size: .75rem;
            line-height: 1.85rem;
            background: #F2EDDA;
            color: #CDBE86;
            border-left: 1px solid #CDBE86 !important;
        }
        .vux-tab .vux-tab-item:first-child{
            border:none !important;
        }
        .vux-tab{
            height: 1.85rem;
            line-height: 1.85rem;
        }
        .vux-tab-ink-bar-transition-forward,.vux-tab-ink-bar{
            display: none !important;
        }
        .vux-tab-selected{
            border: none !important;
            background: #C5B166 !important;
            position: relative;
        }
        .vux-tab-selected:after{
            content: '';
            border-style: solid;
            border-width: .35rem;
            border-color: transparent transparent #fff transparent;
            position: absolute;
            bottom:-1px;
            left: 50%;
            margin-left: -0.175rem;
            display: block;
        }

    }
</style>
