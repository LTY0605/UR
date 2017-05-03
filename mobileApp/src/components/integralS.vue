<template>
    <div class="page_integralS">
        <x-header :left-options="{backText:''}">积分查询</x-header>
        <!--<scroller :height="-46+'px'" lock-x>-->
        <div class="tabTitle">
            <span :class="{active:titleTab==index}" v-for="(item, index) in titleList"
                  @click="changeItem(index,item.code)">{{item.name}}</span>
        </div>
        <div class="tabContain">
            <div class="tabItem tab-swiper">
                <!--{{time1 | date('YYYY-MM-DD HH:mm:ss')}}-->
                <sample :dataList="dataList"></sample>
            </div>
            <!--<div class="tabItem" v-if="titleTab==1">-->
            <!--<sample></sample>-->
            <!--</div>-->
            <!--<div class="tabItem" v-if="titleTab==2">-->
            <!--<sample></sample>-->
            <!--</div>-->
        </div>
        <!--</scroller>-->
        <alert v-model="showNoScroll" title="温馨提示">{{warnText}}</alert>
    </div>
</template>

<script>
    import {
        integralService
    } from '../services/integral.js'
    import sample from './myBill/sample.vue'
    import sampleT from './myBill/sampleT.vue'
    import {XHeader, Scroller, Tab, TabItem, Swiper, SwiperItem, Calendar,
        Cell, Group, InlineCalendar,Alert} from 'vux'
    export default {
        components: {
            XHeader, Scroller, Tab, TabItem, Swiper, SwiperItem, Calendar, Cell, Group,
            InlineCalendar, sampleT, sample,Alert
        },
        data () {
            return {
                time1:'2017-05-02T06:58:52.223Z',
                showNoScroll:false,
                warnText:'',
                titleTab: 0,
                index: 1,
                time: '',
                currentCode: 0,
                dataList: [
                    {
                        integralBillNO: 'OS201704120289',
                        integralTypeName: '消费',
                        integralType: "2",
                        integralDate: '2017-04-12 15:30:28',
                        integral: '300.00'
                    },
                    {
                        integralDate: "2016-05-26T07:37:58.413Z",
                        integralTypeName: "兑换",
                        integralType: "7",
                        integral: -1000,
                    }
                ],
                titleList: [
                    {
                        code: 0,
                        name: '全部'
                    },
                    {
                        code: 2,
                        name: '消费'
                    },
                    {
                        code: 6,
                        name: '兑换'
                    }
                ],
            }
        },
        mounted(){
        },
        created(){
            this.renderData();
        },
        methods: {
            changeItem(index, code){
                this.currentCode = code;
                this.titleTab = index;
                this.renderData();
            },
            renderData(){
                integralService().save({
                    cardcode: window.localStorage.getItem("cardcode"),
                    integralType:this.currentCode
                }).then(res => {
                    let body = res.body;
                    if (body.errcode == 0) {
                        this.dataList = body.list;
                    }else{
                        this.showNoScroll = true;
                        this.warnText = body.errmsg;
                    }

                }, res => {

                })
            },
        },
        watch: {},
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
