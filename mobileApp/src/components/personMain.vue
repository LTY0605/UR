<template>
    <div class="page_personMain">
        <x-header>设置</x-header>
        <div class="tabTitle">
            <span :class="{active:titleTab==index}" v-for="(item, index) in titleList" @click="tabChange(index)">{{item.name}}</span>
        </div>
        <div class="tabContain">
            <div class="tabItem tab-swiper" v-if="titleTab==0">
                <person></person>
            </div>
            <div class="tabItem" v-if="titleTab==1">
                <password></password>
            </div>
            <div class="tabItem" v-if="titleTab==2">
                <unbound></unbound>
            </div>
            <div class="tabItem" v-if="titleTab==3">
                <addressMange></addressMange>
            </div>
        </div>
    </div>
</template>
<script>
    import Person from './setUp/person.vue'
    import Password from './setUp/password.vue'
    import Unbound from './setUp/unbound.vue'
    import AddressMange from './setUp/addressManage.vue'
    import {XHeader, Scroller, Tab, TabItem, Swiper, SwiperItem, Calendar, Cell, Group, InlineCalendar} from 'vux'
    export default {
        components: {
            XHeader, Scroller, Tab, TabItem, Swiper, SwiperItem, Person,
            Calendar, Cell, Group, InlineCalendar, Password, Unbound, AddressMange
        },
        data () {
            return {
                titleTab: 0,
                index: 1,
                time: '',
                titleList: [
                    {
                        code: 0,
                        name: '个人信息'
                    },
                    {
                        code: 1,
                        name: '密码修改'
                    },
                    {
                        code: 2,
                        name: '微信解绑'
                    },
                    {
                        code: 3,
                        name: '地址管理'
                    }
                ],
            }
        },
        watch: {},
        mounted(){
        },
        created(){
            if (this.$route.query.tab) {
                this.titleTab = this.$route.query.tab;
            }
        },
        methods: {
            tabChange(index){
                this.titleTab = index;
                    this.$router.push({
                        name: 'personMain',
                        query: {tab: index},
                    });
            },
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

    .page_personMain {
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
                width: 25%;
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
