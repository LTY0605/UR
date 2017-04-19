<template>
    <div class="page_setUp">
        <x-header>设置</x-header>
        <div>
            <tab :line-width=2 active-color='#fff' v-model="index">
                <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list2"
                          @click="demo2 = item" :key="index">{{item}}
                </tab-item>
            </tab>
            <swiper v-model="index" height="100px" :show-dots="false">
                <swiper-item key="0">
                    <div class="tab-swiper vux-center">
                        <person></person>
                    </div>
                </swiper-item>
                <swiper-item key="1">
                    <div class="tab-swiper vux-center">1 Container</div>
                </swiper-item>
                <swiper-item key="2">
                    <div class="tab-swiper vux-center">2 Container</div>
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
</template>
<script>
    import Person from './setUp/person.vue'
    import {XHeader, Scroller,Tab,TabItem,Swiper,SwiperItem} from 'vux'
    export default {
        components: {
            XHeader,Scroller,Tab,TabItem,Swiper,SwiperItem,Person
        },
        data () {
            return {
                demo2: '个人信息',
                list2:['个人信息', '密码修改', '微信解绑', '地址管理'],
                index: 0,

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
            top: 22px;
            left: 36px;
            display: block;
        }

    }
</style>
