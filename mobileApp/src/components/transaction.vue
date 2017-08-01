<template>
    <div class="page_transaction">
        <x-header :left-options="{backText: ''}">交易记录</x-header>
        <div class="tabTitle">
            <span :class="{active:titleTab==index}" v-for="(item, index) in titleList" @click="changeItem(index,item.code)">{{item.name}}</span>
        </div>
        <div class="tabContain">
            <!--<div class="tab-swiper" v-if="titleTab==0">-->
                <!--<consume></consume>-->
                <!--<transfer></transfer>-->
            <!--</div>-->
            <!--<div class="tabItem" v-if="titleTab==1">-->
                <!--<consume></consume>-->
            <!--</div>-->
            <!--<div class="tabItem" v-if="titleTab==2">-->
                <!--<transfer></transfer>-->
            <!--</div>-->
            <div class="tabItem">
                <consume :tranlists="tranlists"></consume>
            </div>

        </div>
        <!--<toast v-model="showNoScroll" type="text" :time="1000">{{warnText}}</toast>-->
    </div>
</template>
<script>
    //import {transRecordService} from '../../services/transRecord.js'
    import Whole from './transaction/whole.vue'
    import Consume from './transaction/consume.vue'
    import Transfer from './transaction/transfer.vue'
    import {XHeader, Scroller} from 'vux'
    export default {
        components: {
            XHeader, Scroller, Whole, Consume, Transfer
        },
        data () {
            return {
                tranlists:[],
                titleTab: 0,
                list2: ['全部', '消费', '转赠'],
                index: 1,
                time: '',
                currentCode:'',
                valueCardcode: this.$route.query.valueCardcode,
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
                        name: '转赠'
                    }
                ],
//                tranlists:[
//                    {
//                        number: 'OS201704120289',
//                        type: '消费',
//                        time: '2017-04-12 15:30:28',
//                        money: '-300.00'
//                    },
//                    {
//                        number: 'OS201703021888',
//                        type: '转出',
//                        time: '2017-03-02 09:38:21',
//                        money: '-150.00'
//                    },
//                    {
//                        number: 'OS201609113466',
//                        type: '获赠',
//                        time: '2016-09-11 11:25:15',
//                        money: '+100.00'
//                    }
//                ]

            }
        },
        mounted(){
        },
        watch: {},
        created(){
            //this.renderData()
            //this.transRecordService()
        },
        methods:{
            changeItem(index,code){
                this.titleTab = index;
                this.currentCode = code;
                //this.renderData();
            },
            /*renderData(){
                transRecordService().save({
//                    cardcode:'8urp0070227',
                    //cardcode:window.localStorage.getItem('cardcode'),
                    operTypeName:this.operTypeName,
                    operType:this.currentCode
                }).then(res =>{
                    let body = res.body;
                    if(body.errcode == 0){
                        this.tranlists = body.list;
                    } else{
                        this.showNoScroll = true;
                        this.warnText = body.errmsg;
                    }
                },res =>{
                    this.showNoScroll = true;
                    this.warnText = "网络超时，请重试";
                })
            },*/
        },
        computed: {}
    }
</script>
<style lang="less" rel="stylesheet/less">
    .page_transaction {
        .vux-header {
            background-color: #AB9236 !important;
        }

        .vux-header .vux-header-title, .vux-header h1 {
            font-size: .85rem;
        }
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
                width: 33.33%;
                background: #F2EDDA;
                color: #CDBE86;
                border-left: 1px solid rgb(227,218,184);
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
                left: 48%;
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