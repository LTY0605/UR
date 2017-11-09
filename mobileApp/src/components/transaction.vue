<template>
    <div class="page_transaction">
        <x-header :left-options="{backText: ''}">交易记录</x-header>
        <div class="tabTitle">
            <span :class="{active:titleTab==index}" v-for="(item, index) in titleList" @click="titleTab = index">{{item.name}}</span>
        </div>
        <div class="tabContain">
            <div class="tab-swiper" v-if="titleTab==0">
                <consume></consume>
                <transfer></transfer>
            </div>
            <div class="tabItem" v-if="titleTab==1">
                <consume></consume>
            </div>
            <div class="tabItem" v-if="titleTab==2">
                <transfer></transfer>
            </div>
        </div>
    </div>
</template>
<script>
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
                titleTab: 0,
                list2: ['全部', '消费', '转赠'],
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
                        name: '转赠'
                    }
                ],
                tranlists:[
                    {
                        number: 'OS201704120289',
                        type: '消费',
                        time: '2017-04-12 15:30:28',
                        money: '-300.00'
                    },
                    {
                        number: 'OS201703021888',
                        type: '转出',
                        time: '2017-03-02 09:38:21',
                        money: '-150.00'
                    },
                    {
                        number: 'OS201609113466',
                        type: '获赠',
                        time: '2016-09-11 11:25:15',
                        money: '+100.00'
                    }
                ]

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