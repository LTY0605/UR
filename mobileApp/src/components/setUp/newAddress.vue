<template>
    <div class="page_newAddress">
        <x-header :left-options="{backText: ''}">新增收货地址
            <a slot="right">保存</a>
        </x-header>
        <div class="address-con">
            <group>
                <x-input class="consignee" title="收货人姓名" v-model="consignee" placeholder="收货人姓名" required></x-input>
                <x-input title="收货人电话" placeholder="收货人电话" v-model="mobileTel" required :max="11" :min="11"
                         keyboard="number" is-type="china-mobile"></x-input>
                <x-address class="address-select" placeholder="请选择" title="所在地区" v-model="attrValue" raw-value
                           :list="addressData"
                           value-text-align="left"></x-address>
                <x-textarea class="address-text" placeholder="详细地址" v-model="addressDeep" required></x-textarea>
            </group>
        </div>
        <div class="address-foot">
            <label class="text" for="feman">
                <input class="check" id="feman" name="feman" type="checkbox" v-model="selected" value="1">
                <span for="feman">设为默认地址</span>
            </label>
            <div class="operate" @click="save">保存</div>
        </div>
        <toast v-model="showNoScroll" type="text" :time="1000">{{warnText}}</toast>
        <x-dialog v-model="showNoScro" class="dialog-demo" :scroll="false">
            <p class="dialog-title">温馨提示</p>
            <div class="dialog-contain">
                {{warnText2}}
            </div>
            <span class="vux-close" @click="goLink">确定</span>
        </x-dialog>
    </div>
</template>
<script>
    import {
        XHeader, Scroller, Group, XInput, ChinaAddressData, XAddress, XTextarea, Checklist,
        XButton, Value2nameFilter as value2name, Name2valueFilter as name2value, Alert, XDialog,Toast
    } from 'vux'
    import {
        addAddressService
    } from '../../services/person.js'
    export default {
        components: {
            XHeader, Scroller, Group, XInput, XAddress, XTextarea, Checklist, XButton, Alert, XDialog,Toast
        },
        data () {
            return {
                addressData: ChinaAddressData,
                attrValue: [],
                error: '',
                selected: false,
                checklist: [],
                consignee: '',//收货人
                addressDeep: '',//详细地址
                address: '',//最后的地址
                mobileTel: '',
                showNoScroll: false,
                showNoScro: false,
                warnText2:'',
                warnText: '',
            }
        },
        mounted(){
        },
        watch: {
            attrValue(val) {
                this.address = value2name(val, ChinaAddressData); //把值转为文字
                //console.log(this.address)
            },
        },
        created(){
        },
        methods: {
            change (val) {
                console.log('change', val)
            },
            save(){
                if (this.consignee == '' || this.mobileTel == '' || this.address == '' || this.addressDeep == '') {
                    this.showNoScroll = true;
                    this.warnText = '您有信息未填写';
                    return
                }
                var pro = this.address.split(" ");
                var selected = 1;
                if (this.selected == true) {
                    selected = 0;
                } else {
                    selected = 1;
                }

                addAddressService().save({
                    cardcode: window.localStorage.getItem("cardcode"),
                    consignee: this.consignee,
                    mobileTel: this.mobileTel,
                    wxOpenID: window.localStorage.getItem("wxOpenId"),
                    address: this.addressDeep,
                    provice: pro[0],
                    city: pro[1],
                    district: pro[2],
                    isdefault: selected
                }).then(res => {
                    let body = res.body;
                    if (body.errcode == 0) {
                        this.showNoScro = true;
                        this.warnText2 = '保存成功';
                    }

                }, res => {

                })
            },
            goLink(){
                this.showNoScro = false;
                this.$router.push({
                    name: 'personMain',
                    query: {tab: 3},
                });
            },
        },
        computed: {}
    }
</script>
<style lang="less" rel="stylesheet/less">
    .dialog-demo {
        font-size: .9rem;
        .dialog-title {
            font-size: 1rem;
            height: 2.2rem;
            line-height: 2.2rem;
        }
        .dialog-contain {
            width: 100%;
            padding: .5rem 0 1rem 0;
            border-bottom: 1px solid #ddd;
            color: #999999;
        }
        .vux-close {
            height: 2rem;
            line-height: 2rem;
            color: #0BB20C;
            background: none;
        }
    }

    .operate {
        height: 2rem;
        line-height: 2rem;
        text-align: center;
        font-size: .75rem;
        background: #AB9236;
        color: #fff;
        margin-top: 1.25rem;
        border-radius: .2rem;
    }

    .vux-header .vux-header-left .left-arrow:before {
        border: 1px solid #FFFFFF;
        border-width: 1px 0 0 1px;
    }

    .vux-header-right a {
        color: #FFFFFF !important;
    }

    .page_newAddress {
        .text {
            display: block;
            height: 2rem;
            line-height: 2rem;
        }
        input[type="checkbox"] {
            display: none;
        }
        input[type="checkbox"] + span {
            width: .85rem;
            height: .85rem;
            line-height: .85rem;
            background: url(../../assets/images/circle.png) left center no-repeat;
            background-size: .85rem .85rem;
            padding-left: 1.3rem;
            font-size: .75rem;
        }
        input[type="checkbox"]:checked + span {
            background: url(../../assets/images/circle_a.png) left center no-repeat;
            background-size: .85rem .85rem;
        }
        .weui-cells .vux-no-group-title:after {
            border: none !important;
        }
        .vux-header {
            background-color: #AB9236 !important;
        }
        .vux-header .vux-header-title, .vux-header h1 {
            font-size: .85rem;
        }
        .weui-btn_default {
            background: #AB9236 !important;
            color: #FFFFFF !important;
            height: 2rem;
        }
        .address-con {
            padding: 0 1rem;
            border-bottom: .35rem solid #E5E5E5;
            .weui-cells {
                margin-top: .25rem !important;
            }
            .weui-cells:before {
                border: none;
            }
            .weui-cells:after {
                border: 3px solid #FFFFFF;
            }
            .weui-cell {
                padding: .8rem 0 !important;
                border-bottom: 1px solid #D2D2D2;
                font-size: .75rem;
            }
            .weui-cell:before {
                border: none;
            }
            .weui-label {
                font-size: .75rem;
                color: #333333;
                height: .8rem;
                line-height: .8rem;
            }
            .address-select {
                .vux-cell-box:before {
                    border: none;
                }
                .weui-cell {
                    padding: 1rem 0 !important;
                }
                .vux-popup-picker-select {
                    text-align: right !important;
                    height: .85rem;
                    line-height: .85rem;
                }
                .vux-popup-picker-select span {
                    font-size: .75rem;
                    color: #999999;
                    display: inline-block;
                }
            }
            .address-text {
                padding: 1rem 0 .5rem 0 !important;
                .weui-textarea {
                    font-size: .75rem;
                    font-family: inherit;
                    height: 5.2rem;
                }
            }
        }
        .checkAddress {
            .weui-cell {
                padding: .4rem 0 1rem 0;
            }
            .weui-cells:after {
                border: none !important;
            }
            i {
                transform: scale(0.7);
            }
            .weui-cells_checkbox > label > * {
                font-size: .6rem;
                margin-left: -.3rem;
            }
            .weui-cell__bd > p {
                margin-bottom: .2rem;
            }
        }
        .address-foot {
            padding: 0 1rem;
            .weui-cells:before {
                border: none;
            }
            .add-btn {
                font-size: .75rem;
                display: block;
            }
        }
    }
</style>
