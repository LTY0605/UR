<template>
    <div class="page_newAddress">
        <x-header :left-options="{backText: ''}">新增收货地址
            <a slot="right">保存</a>
        </x-header>
        <div class="address-con">
            <group>
                <x-input class="consignee" title="收货人姓名"></x-input>
                <x-input title="联系电话"></x-input>
                <x-address class="address-select" placeholder="请选择" title="所在地区" v-model="addressValue" raw-value
                           :list="addressData"
                           value-text-align="left"></x-address>
                <x-textarea class="address-text" placeholder="详细地址"></x-textarea>
            </group>
        </div>
        <div class="address-foot">
            <checklist class="checkAddress" :options="commonList" v-model="checklist" @on-change="change"></checklist>
            <x-button><span class="add-btn">保 存</span></x-button>
        </div>
    </div>
</template>
<script>
    import {XHeader, Scroller, Group, XInput, ChinaAddressData, XAddress, XTextarea, Checklist, XButton} from 'vux'
    export default {
        components: {
            XHeader, Scroller, Group, XInput, XAddress, XTextarea, Checklist, XButton
        },
        data () {
            return {
                addressData: ChinaAddressData,
                addressValue: [],
                error: '',
                commonList: [ '设为默认地址' ],
                checklist: []
            }
        },
        mounted(){
        },
        watch: {},
        created(){
        },
        methods:{
            change (val) {
                console.log('change', val)
            }
        },
        computed: {}
    }
</script>
<style lang="less" rel="stylesheet/less">
    .vux-header .vux-header-left .left-arrow:before{
        border: 1px solid #FFFFFF;
        border-width: 1px 0 0 1px;
    }
    .vux-header-right a{
        color: #FFFFFF !important;
    }
    .page_newAddress {
        .weui-cells .vux-no-group-title:after{
            border: none !important;
        }
        .vux-header {
            background-color: #AB9236 !important;
        }
        .vux-header .vux-header-title, .vux-header h1 {
            font-size: .85rem;
        }
        .weui-btn_default{
            background: #AB9236 !important;
            color: #FFFFFF !important;
            height: 2rem;
        }
        .address-con{
            padding: 0 1rem;
            border-bottom: .35rem solid #E5E5E5;
            .weui-cells{
                margin-top: .25rem !important;
            }
            .weui-cells:before{
                border: none;
            }
            .weui-cells:after{
                border: 3px solid #FFFFFF;
            }
            .weui-cell{
                padding: .5rem 0 !important;
                border-bottom: 1px solid #D2D2D2;
            }
            .weui-cell:before{
                border: none;
            }
            .weui-label{
                font-size: .75rem;
                color: #333333;
                height: .8rem;
                line-height: .8rem;
                margin-right: .5rem;
            }
            .consignee{
                .weui-label{
                    border-right: 1px solid #d2d2d2;
                }
            }
            .address-select{
                .vux-cell-box:before{
                    border: none;
                }
                .weui-cell{
                    padding: 1rem 0 !important;
                }
                .vux-popup-picker-select{
                    text-align: right !important;
                    height: .85rem;
                    line-height: .85rem;
                }
                .vux-popup-picker-select span{
                    font-size: .75rem;
                    color: #999999;
                }
            }
            .address-text{
                padding: 1rem 0 .5rem 0 !important;
                .weui-textarea{
                    font-size: .75rem;
                    font-family: inherit;
                    height: 5.2rem;
                }
            }
        }
        .checkAddress{
            .weui-cell{
                padding: .4rem 0 1rem 0;
            }
            .weui-cells:after{
                border: none !important;
            }
            i{
                transform:scale(0.7);
            }
            .weui-cells_checkbox > label > * {
                 font-size: .6rem;
                 margin-left: -.3rem;
            }
            .weui-cell__bd > p{
                margin-bottom: .2rem;
            }
        }
        .address-foot{
            padding: 0 1rem;
            .weui-cells:before{
                border: none;
            }
            .add-btn{
                font-size: .75rem;
                display: block;
            }
        }
    }
</style>