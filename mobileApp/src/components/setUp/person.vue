<template>
    <div class="page_person">
        <div class="personTitle">
            <span :class="{ active:!isPhone}" @click="isPhone = false">修改资料</span>
            <span :class="{ active:isPhone}" @click="isPhone = true">修改手机</span>
        </div>
        <div class="materialItem" v-if="!isPhone">
            <ul class="edit_material">
                <!--<li>-->
                <!--<span class="material_item material_item_name">用户名</span>-->
                <!--<span class="material_item material_item_code"></span>-->
                <!--</li>-->
                <li>
                    <group>
                        <x-input title="用户名" placeholder="请输入"></x-input>
                    </group>
                </li>
                <li>
                    <group>
                        <selector v-model="sex" title="性别" :options="sexList"></selector>
                    </group>
                </li>
                <li>
                    <group>
                        <calendar v-model="time" title="出生日期" disable-future></calendar>
                    </group>
                </li>
                <li class="attress">
                    <x-address @on-hide="logHide" @on-show="logShow" title="地区" v-model="attrValue" :list="addressData"
                               placeholder="请选择地址"></x-address>
                </li>
            </ul>
            <div class="operate">提交</div>
        </div>
        <div class="materialItem" v-if="isPhone">
            <ul class="edit_material edit_material2">
                <li>
                    <group>
                        <x-input title="原手机号" placeholder="原手机号"></x-input>
                    </group>
                </li>
                <li>
                    <group>
                        <x-input title="新手机号" placeholder="新手机号"></x-input>
                    </group>
                </li>
                <li class="code">
                    <group>
                        <x-input title="验证码" placeholder="请输入短信验证码"></x-input>
                    </group>
                    <span class="getCode">获取验证码</span>
                </li>
            </ul>
            <div class="operate">提交</div>
        </div>
    </div>
</template>
<script>
    import {
        XHeader, Scroller, XInput, Group, Selector, Calendar, Cell, XAddress, ChinaAddressData,
        Value2nameFilter as value2name
    } from 'vux'
    export default {
        components: {
            XHeader, Scroller, XInput, Group, Selector, Calendar, Cell, XAddress
        },
        data () {
            return {
                demo1: '修改资料',
                tablist: ['修改资料', '修改手机'],
                activeIndex: 0,
                isPhone: false,
                sexList: ['男', '女'],
                sex: '男',
                time: 'TODAY',
                attrValue: [],
                addressData: ChinaAddressData,
                attress: '',
            }
        },
        mounted(){
        },
        methods: {
            logHide(str){
                console.log('on-hide', str)
            },
            logShow(str){
                console.log('on-show')
            },
        },
        watch: {
            attrValue(val) {
                this.attress = value2name(val, ChinaAddressData); //把值转为文字
                // this.getCompany(this.address);
            },
        },
        created(){
        },
        computed: {}
    }
</script>
<style lang="less" rel="stylesheet/less">
    .operate{
        height: 2rem;
        line-height:2rem;
        text-align: center;
        font-size: .75rem;
        background: #AB9236;
        color: #fff;
        margin-top:1.25rem;
        border-radius: .2rem;
    }
    .page_person {
        .weui-cells:before, .weui-cells:after,
        .weui-cell_access .weui-cell__ft:after,
        .vux-cell-box:before {
            display: none;
        }
        .weui-cell,
        .weui-cell_access .weui-cell__ft,
        .vux-popup-picker-select span {
            padding: 0;
        }
        .vux-no-group-title {
            margin-top: 0;
            font-size: .7rem;
        }
        .weui-input {
            text-align: right;
            color: #999;
        }

        .weui-label {
            color: #333;
        }
        .vux-selector.weui-cell_select-after {
            padding-left: 0;
            height: .95rem;
        }
        .weui-cell_select-after .weui-select {
            padding: 0;
            direction: rtl;
            color: #999;
        }
        .weui-cell_select .weui-cell__bd:after {
            display: none;
        }
        .personTitle {
            width: 11.2rem;
            height: 1.3rem;
            line-height: 1.25rem;
            margin: .75rem auto;
            border: 1px solid #EC6941;
            border-radius: .2rem;
            font-size: 0;
            span {
                font-size: .6rem;
                text-align: center;
                color: #EC6941;
                display: inline-block;
                vertical-align: top;
                width: 50%;
                height: 1.2rem;
            }
            span.active {
                background: #EC6941;
                color: #fff;
            }
        }
        .materialItem {
            width: 100%;
            height: auto;
            padding: 0 1rem;
        }
        .edit_material {
            height: auto;
            width: 100%;
            li {
                list-style: none;
                padding: 1rem 1rem 1rem 0;
                height: auto;
                border-bottom: 1px solid #D2D2D2;
                width: 100%;
                background: url("../../assets/icon_right_on.png") no-repeat right center;
                background-size: .35rem;
                font-size: 0;
                div {
                    font-size: .7rem;
                }
                .material_item {
                    display: inline-block;
                    vertical-align: top;
                    font-size: .7rem;
                }
            }
            .attress{
                .vux-popup-picker-select span{
                    color: #999;
                }
            }
        }
        .edit_material2{
            width: 100%;
            height: auto;
                li{
                    background: none;
                    position: relative;
                    .weui-input{
                        text-align: left;
                    }
                    .getCode{
                        font-size: .7rem;
                        position: absolute;
                        right: 0;
                        top: 50%;
                        margin-top: -.55rem;
                        border-bottom: 1px solid #EC6941;
                        color: #EC6941;
                        z-index: 100;
                    }

                }

            .code{
                .weui-cell__ft{
                    display: none;
                }
            }

        }

    }
</style>
