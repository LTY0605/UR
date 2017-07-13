<template>
    <div class="page_transaction">
        <x-header :left-options="{backText: ''}">交易记录</x-header>
        <div class="tabTitle">
            <span :class="{active:titleTab==index,tabwidth:isTab}"
                  v-for="(item, index) in titleList" @click="changeItem(index,item.code)">{{item.name}}</span>
        </div>
        <div class="tabContain">
            <div class="tabItem">
                <consume :tranlists="tranlists"></consume>
            </div>

        </div>
    </div>
</template>
<script>
    import {transRecordService,giftCardService} from '../services/transRecord.js'
    import Consume from './transaction/consume.vue'
    import {XHeader, Scroller} from 'vux'
    export default {
        components: {
            XHeader, Scroller, Consume
        },

        data () {
            return {
                valueCardcode:this.$route.query.valueCardcode,
                cardName:this.$route.query.cardName,
                tranlists:[],
                titleTab: 0,
                list2: ['全部', '消费', '转赠'],
                index: 1,
                time: '',
                isTab: false,
                currentCode:0,
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
                        code: 3,
                        name: '转出'
                    }
                ],


            }
        },
        mounted(){
        },
        watch: {},
        created(){
            if(this.cardName=='礼品卡'){
                this.isTab = true;
                this.giftData();
                this.titleList=[
                    {
                        code: 0,
                        name: '全部'
                    },
                    {
                        code: 1,
                        name: '消费'
                    }
                ]
            } else {
                this.renderData();
            }
        },
        methods:{
            changeItem(index,code){
                this.tranlists = [];
                this.titleTab = index;
                this.currentCode = code;
                if(this.cardName=='礼品卡'){
                    this.giftData();
                } else {
                    this.renderData();
                }
            },
            renderData(){
                transRecordService().save({
                    valueCardcode:this.valueCardcode,
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
                    this.warnText = res.errmsg;
                })
            },
            giftData(){
                giftCardService().save({
                    valueCardcode:this.valueCardcode,
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
                    this.warnText = res.errmsg;
                })
            }
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
            .tabwidth{
                width: 50%;
            }
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
