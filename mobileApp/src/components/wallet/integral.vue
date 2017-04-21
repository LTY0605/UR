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
                <img class="listRight" @click="show=!show" slot="icon" width="15" src="../../assets/icon_money_code.png">
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
        <!--弹窗-->
        <!--<div v-if="show" @click="show=!show/" v-transfer-dom>
            <x-dialog class="dialog-demo">
                <div class="img-box">
                    <img src="../../assets/money_code2.png" style="max-width:100%">
                </div>
            </x-dialog>
        </div>-->
        <transition name="mask-animative">
            <div v-if="show" @click="show=!show" class="integral-mask">
                <div id="integralMask" @click="stopPropagation" class="integral-code">
                    <div class="integralCode-div">积分使用时交给店员扫一扫</div>
                    <img class="integralCode-img" src="../../assets/money_code.png" alt=""/>
                    <p class="integralCode-p">{{code}}</p>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
    import {XHeader, Scroller, Group, Cell} from 'vux'
    export default {
        /*directives: {
            TransferDom
        },*/
        components: {
            XHeader, Scroller, Group, Cell
        },
        data () {
            return {
                integral: '18800',
                show: false,
                code: '111039'
            }
        },
        methods:{
            //阻止冒泡
            stopPropagation:function (e) {
                e = e||window.event;
                if(e.stopPropagation){
                    e.stopPropagation();
                } else{
                    e.cancelBubble = true;
                }
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
<style lang="less"  rel="stylesheet/less">
    /*.weui-mask{
        display: block !important;
    }
    .weui-dialog{
        border-radius: 8px;
        padding-bottom: 8px;
        display: block !important;
    }*/
    .page_integral{

        /*.dialog-demo {
        .dialog-title {
            line-height: 30px;
            color: #666;
        }
        .img-box {
            height: 350px;
            overflow: hidden;
        }
        .vux-close {
            margin-top: 8px;
            margin-bottom: 8px;
        }
    }*/
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
        .integral-mask{
            position:absolute;
            top: 0;
            height: 100%;
            width: 100%;
            background: rgba(0,0,0,0.5);
        }
        .integral-code{
            margin: 8.25rem auto 0 auto;
            width: 12.55rem;
            height: 8.05rem;
            background: white;
            border-radius: 2px;
            display: flex;
            flex-direction: column;
        }
        .integralCode-div{
            width: 11.05rem;
            height: 2.1rem;
            line-height: 2.1rem;
            text-align: center;
            font-size: .6rem;
            color: #FF0018;
            border-bottom: 1px solid rgb(205,190,134);
            box-sizing: border-box;
            margin: .75rem auto .75rem auto;
        }
        .integralCode-img{
            width: 7.85rem;
            margin: 0 auto;
        }
        .integralCode-p{
            font-size: .6rem;
            margin: .15rem auto 0 auto;
        }
        .mask-animative-enter-active, .mask-animative-leave-active{
            transition: all .3s ease;
        }
        .mask-animative-enter, .mask-animative-leave-active {
            opacity: 0;
        }
    }
</style>