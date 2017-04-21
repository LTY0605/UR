<template>
    <div class="page_transfer">
        <x-header :left-options="{backText: ''}">转 赠</x-header>
        <div class="transferCon">
            <p class="tran-money">余额：￥800</p>
            <group>
                <x-input placeholder="转赠人手机"></x-input>
            </group>
            <group>
                <x-input placeholder="转赠金额"></x-input>
            </group>
            <p class="tran-remind"><span>*</span> 转赠金额需大于50</p>
            <x-button><span class="btn-text">提 交</span></x-button>
        </div>
    </div>
</template>

<script>
    import {XHeader,Group,XInput,XButton} from 'vux'
    export default{
        components:{
            XHeader,Group,XInput,XButton
        },
        data(){
            return{

            }
        }
    }
</script>

<style lang="less" rel="stylesheet">
    .page_transfer{
        .vux-header {
            background-color: #AB9236 !important;
        }

        .vux-header .vux-header-title, .vux-header h1 {
            font-size: .85rem;
        }
        .transferCon{
            padding: 1rem 1.75rem 0 1.75rem;
            .weui-cells{
                border: 1px solid #D2D2D2;
                border-radius: 4px;
                line-height: .75rem;
                font-size: .75rem;
                margin-top: .65rem;
            }
            .weui-cell{
                padding: .65rem;
            }
            .weui-input{
                height: .85rem;
                line-height: .85rem;
                font-size: .75rem;
            }
            .weui-cells:before{
                border: none;
            }
            .weui-cells:after{
                border: none;
            }
            .weui-btn:after{
                border: none;
                height: 2rem;
            }
            .weui-btn_default{
                background: #AB9236;
            }
            .tran-money{
                color: #333333;
                font-size: .75rem;
                margin-left: .5rem;
            }
            .tran-remind{
                margin-top: .15rem;
                margin-bottom: 1.1rem;
                margin-left: -.6rem;
                font-size: .5rem;
                transform:scale(0.875);
                color: #F67982;
                span{
                    display: inline-block;
                    vertical-align: middle;
                }
            }
            .btn-text{
                font-size: .75rem;
                color: #FFFFFF;
            }
        }
    }
</style>