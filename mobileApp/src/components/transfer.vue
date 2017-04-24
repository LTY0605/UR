<template>
    <div class="page_transfer">
        <x-header :left-options="{backText: ''}">转 赠</x-header>
        <div class="transferCon">
            <p class="tran-money">余额：￥800</p>
            <group>
                <x-input name="transfer_phone" v-model="phone" :is-type="isNumber" placeholder="转赠人手机"></x-input>
            </group>
            <group>
                <x-input name="transfer_money" v-model="money" :is-type="isMoney" placeholder="转赠金额"></x-input>
            </group>
            <p class="tran-remind"><span>*</span> 转赠金额需大于50</p>
            <div @click="onSumbit">
                <x-button><span class="btn-text">提 交</span></x-button>
            </div>
        </div>
        <!--遮罩和密码框-->
        <div @click="hide">
            <x-dialog v-model="showNoScroll"  class="dialog-demo" :scroll="false">
                <div @click.stop class="transferCode">
                    <p class="transferCode-title">请输入密码</p>
                    <x-input class="transferCode-input"></x-input>
                    <x-button><span class="transferCode-text">确 定</span></x-button>
                </div>
            </x-dialog>
        </div>
    </div>
</template>

<script>
    import {XHeader,Group,XInput,XButton,XDialog} from 'vux'
    export default{
        components:{
            XHeader,Group,XInput,XButton,XDialog
        },
        data(){
            return{
                showNoScroll:false,
                phone:'',
                money:'',
                isNumber:function (value) {
                    return{
                        valid: /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(value),
                        msg: '必须是数字'
                    }
                },
                isMoney:function (value) {
                    return{
                        valid: /^[1-9][0-9]*$/.test(value),
                        msg: '请输入正常的金额'
                    }
                }
            }
        },
        methods:{
            onSumbit:function () {
                if(this.phone=='' || this.money==''){
                    console.log('请输入手机号和金额')
                }else{
                    this.showNoScroll=true;
                }
            },
            hide:function () {
                this.showNoScroll = false;
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
        .weui-dialog{
            width: auto !important;
            max-width: none !important;
            top: 43% !important;
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
            .vux-x-input .vux-input-icon{
                font-size: .7rem;
            }
            .vux-input-icon.weui-icon-warn:before, .vux-input-icon.weui-icon-success:before{
                font-size: .7rem !important;
            }
            .weui-cell_warn{
                color: #000000 !important;
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
        .transferCode{
            width: 12.5rem;
            height: auto;
            padding: 1rem;
            position: relative;
            background: white;
            .weui-cell{
                border: 1px solid #D2D2D2;
                border-radius: 4px;
                height: 2rem;
            }
            .weui-cell:before{
                border-top: none ;
            }
            .weui-cell:after{
                border: none ;
            }
            .weui-input{
                font-size: .75rem;
                height: 2rem;
                line-height: 2rem;
            }
            [class^="weui-icon-"]:before{
                margin-bottom: .3rem;
            }
            .weui-btn:after{
                border: none;
                height: 2rem;
            }
            .weui-btn_default{
                margin-top: 1rem;
                background: #AB9236;
                height: 2rem;
            }
            .transferCode-title{
                font-size: .75rem;
                color: #AB9236;
                margin-bottom: 1.5rem;
            }
            .transferCode-text{
                font-size: .75rem;
                color: #FFFFFF;
                display: block;
            }
        }
    }
</style>