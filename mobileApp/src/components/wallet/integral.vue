<template>
    <div class="page_integral">
        <div class="integralTop">
            <div class="integralTop-img">
                <h1 class="integralTop-h1">{{integral}}</h1>
                <p class="integralTop-p">可用积分</p>
            </div>
            <span class="integralTop-text">积分规则</span>
        </div>
        <group class="integralList">
            <cell title="积分使用码">
                <img class="listImg" slot="icon" width="16" src="../../assets/icon_gift.png">
                <img class="listRight" @click="show" slot="icon" width="15" src="../../assets/icon_money_code.png">
            </cell>
            <cell title="积分商城">
                <img class="listImg" slot="icon" width="16" src="../../assets/icon_home.png">
                <img class="listRight" slot="icon" width="7" src="../../assets/icon_right_on.png">
            </cell>
            <cell title="积分查询">
                <img class="listImg" slot="icon" width="16" src="../../assets/icon_search.png">
                <img class="listRight" slot="icon" width="7" src="../../assets/icon_right_on.png">
            </cell>
        </group>
        <div @click="hide">
            <x-dialog v-model="showNoScroll"  class="dialog-demo" :scroll="false">
                <div @click.stop class="integralCode">
                    <p class="integralCode-title">积分使用时交给店员扫一扫</p>
                    <img class="integralCode-img" src="../../assets/money_code.png" alt=""/>
                    <p class="integralCode-code">111039</p>
                    <div @click="hide" class="integralCode-close"></div>
                </div>
            </x-dialog>
        </div>
    </div>
</template>
<script>
    import {XHeader,XDialog, Scroller, Group, Cell} from 'vux'
    export default {
        components: {
            XHeader, Scroller, Group, Cell,XDialog
        },
        data () {
            return {
                integral: '18800',
                code: '111039',
                showNoScroll:false,
            }
        },
        methods:{
            show:function () {
                this.showNoScroll = true;
            },
            hide:function () {
                this.showNoScroll = false;
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
    .page_integral{
        .vux-label{
            font-size: .75rem;
            color: #564712;
        }
        .weui-cells{
            margin-left: 1rem;
            margin-right: 1rem;
        }
        .weui-cells:before{
            top: -1px !important;
        }
        .weui-cell{
            padding: 10px 0 !important;
        }
        .weui-cell:before{
            left: 0 !important;
        }
        .weui-dialog{
            width: auto !important;
            max-width: none !important;
            top: 35% !important;
        }
        .integralCode{
            width: 12.5rem;
            height: 8rem;
            position: relative;
            background: white;
            .integralCode-title{
                width: 11rem;
                height: 2rem;
                line-height: 2rem;
                margin: .75rem auto;
                font-size: .6rem;
                text-align: center;
                color: #FF0018;
                border-bottom: 1px solid #CDBE86;
            }
            .integralCode-img{
                width: 7.85rem;
                height: 2.2rem;
            }
            .integralCode-code{
                font-size: .6rem;
            }
            .integralCode-close{
                position: absolute;
                width: .8rem;
                height: .8rem;
                background: url("../../assets/money_code3.png");
                background-size: 100%;
                top: -.15rem;
                right: .6rem;
            }
        }
        .integralTop{
            position: relative;
            display: inline-block;
            width: 100%;
            height: 16rem;
            background: url("../../assets/background1.png");
            background-size: 100%;
        }
        .integralTop-img{
            display: inline-block;
            width: 12rem;
            height: 14rem;
            background: url("../../assets/background2.png");
            background-size: 100%;
            margin: .85rem auto 0 auto;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        .integralTop-h1{
            margin-top: 1.2rem;
            margin-bottom: 0;
            font-size: 3rem;
            font-weight: 100;
            color: #AB9236;
        }
        .integralTop-p{
            margin-top: -.3rem;
            font-size: .75rem;
            color: #AB9236;
        }
        .integralTop-text{
            position: absolute;
            right: 1.05rem;
            bottom: .9rem;
            font-size: .75rem;
            color: #F67982;
        }
        .integralList{
            margin-top: -1rem;
            .listImg{
                display:inline-block;margin-right:.25rem;margin-top: .2rem;
            }
            .listRight{
                position: absolute; right: 0;top:.75rem;
            }
        }
    }
</style>