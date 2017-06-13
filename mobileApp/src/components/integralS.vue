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
        </div>
        <!--</scroller>-->
        <toast v-model="showNoScroll" type="text" :time="1000">{{warnText}}</toast>
        <!--<alert v-model="showNoScroll" title="温馨提示">{{warnText}}</alert>-->
    </div>
</template>

<script>
    import {
        integralService
    } from '../services/integral.js'
    import sample from './myBill/sample.vue'
    import {XHeader,Alert,Toast} from 'vux'
    export default {
        components: {
            XHeader, sample, Alert, Toast
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
                dataList: [],
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
                        code: 1,
                        name: '赠送'
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
    .vux-header .vux-header-left .left-arrow:before{
        border: 1px solid #fff !important;
        border-width: 1px 0 0 1px !important;
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