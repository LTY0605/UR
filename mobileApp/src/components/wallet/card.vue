<template>
    <div class="page_card">
        <ul>
            <li class="card-list">
                <div>
                    <p class="title">礼品1卡</p>
                    <p class="num">7165 1560 1084 4001</p>
                    <p class="title">余额：￥1000.00</p>
                </div>
                <div class="hide">
                    <div style="display: flex;justify-content: space-between;margin-bottom: .75rem">
                        <x-button>扫码支付</x-button>
                        <x-button>转赠</x-button>
                        <x-button>获取转赠</x-button>
                    </div>
                    <div style="display: flex">
                        <x-button>修改密码</x-button>
                        <x-button class="last-btn" style="display: flex;justify-content: center">交易记录</x-button>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import {XButton} from 'vux'
    export default{
        components:{
            XButton
        },
        data(){
            return{

            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    .page_card{
        padding: 1.2rem 1rem;
    ul{
        list-style: none;
    .card-list{
        position: relative;
        background:  #585656;
        border-radius: .2rem;
        width: auto;
        height: auto;
        padding: .65rem .9rem .65rem .9rem;
    .title{
        font-size: .9rem;
        color: #FFFFFF;
    }
    .num{
        font-size: .8rem;
        color: #FFFFFF;
        margin: .5rem 0;
    }
    .hide{
        margin-top: .75rem;
        font-size: 0;
        .weui-btn{
            margin-left: 0 !important;
            margin-right: 0 !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
            width: 4.1rem;
            font-size: .75rem;
            border-radius: .1rem !important;
            line-height: 1.6rem !important;
        }
        .weui-btn_default{
            color: #473A0C;
            background-color: #CDBE86;
        }
        .weui-btn + .weui-btn{
            margin: 0;
        }
        .last-btn{
            display: inline-block;
            margin-left: 1.35rem !important;
        }
    }
    }
    .card-list:after{
        content: '';
        position: absolute;
        border-style: solid;
        border-width: .35rem;
        border-color: transparent transparent #fff transparent;
        left: 48%;
    }
    }
    }
</style>