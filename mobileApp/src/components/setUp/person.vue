<template>
    <div class="page_person">
        <div class="personTitle">
            <tab :line-width=2 active-color='#fff' v-model="index">
                <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in tablist"
                          @click="demo2 = item" :key="index">{{item}}
                </tab-item>
            </tab>
        </div>
        <swiper v-model="index" height="auto" :show-dots="false">
            <swiper-item key="0">
                <div class="tab-swiper vux-center">
                    1111
                </div>
            </swiper-item>
            <swiper-item key="1">
                <div class="tab-swiper vux-center">22 Container</div>
            </swiper-item>
        </swiper>
    </div>
</template>
<script>
    import {XHeader, Scroller,Tab,TabItem,Swiper,SwiperItem} from 'vux'
    export default {
        components: {
            XHeader,Scroller,Tab,TabItem,Swiper,SwiperItem
        },
        data () {
            return {
                demo2: '个人信息',
                tablist:['个人信息', '密码修改'],
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
.page_person{
    .personTitle{
        width: 11.2rem;
        height: 1.3rem;
        line-height:1.25rem;
        margin: .75rem auto;
    }
    .vux-tab .vux-tab-item{
        font-size: .6rem;
        line-height: 1.25rem;
        background: none;
        color: #EC6941;
        border-left: none !important;
    }
    .vux-tab .vux-tab-item:first-child{
        border:none !important;
    }
    .vux-tab{
        height: 1.25rem;
        line-height: 1.25rem;
        border: 1px solid #EC6941;
        border-radius: .2rem;
    }
    .vux-tab-ink-bar-transition-forward,.vux-tab-ink-bar{
        display: none !important;
    }
    .vux-tab-selected{
        border: none !important;
        background: #EC6941 !important;
        position: relative;
    }
    .vux-tab-selected:after{
        display: none;
    }
}
</style>
