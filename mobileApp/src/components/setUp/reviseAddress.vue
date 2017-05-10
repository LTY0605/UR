<template>
    <div class="page_reviseAddress">
        <x-header :left-options="{backText: ''}">修改地址
            <a slot="right" @click="saveItem">保存</a>
        </x-header>
        <div class="address-con">
            <group>
                <x-input class="consignee" title="收货人姓名" v-model="consignee" placeholder="收货人姓名,必填" :max="20"></x-input>
                <x-input title="收货人电话" v-model="mobile"  placeholder="收货人电话,必填" :max="11" :min="11"
                         keyboard="number"></x-input>
                <x-address title="所在地区" v-model="attrValue" :list="addressData"
                           placeholder="请选择地址,必填"></x-address>
                <x-textarea class="address-text" placeholder="详细地址,必填" v-model="address"></x-textarea>
                <x-input title="邮政编码" v-model="postcode" placeholder="邮政编码,必填"></x-input>
            </group>
        </div>
        <div class="address-foot">
            <p class="remove-address" @click="deleteItem">删除地址</p>
            <div class="operate" @click="saveItem">保存</div>
        </div>
        <toast v-model="showNoScroll" type="text" :time="1000">{{warnText}}</toast>
        <x-dialog v-model="showNoScro" class="dialog-demo" :scroll="false">
            <p class="dialog-title">温馨提示</p>
            <div class="dialog-contain">
                {{warnText2}}
            </div>
            <span class="vux-close" @click="sureDelete" style="margin-right: 2.2rem;">确定</span>
            <span class="vux-close" @click="showNoScro=false">取消</span>
        </x-dialog>
    </div>
</template>
<script>
    import {
        XHeader, Scroller, Group, XInput, ChinaAddressData, XAddress, XTextarea,
        XButton, Alert, XDialog, Toast, Value2nameFilter as value2name, Name2valueFilter as name2value
    } from 'vux'
    import {
        removeService, detailService, editAttrService
    } from '../../services/person.js'
    export default {
        components: {
            XHeader, Scroller, Group, XInput, XAddress, XTextarea, XButton, Alert, XDialog, Toast
        },
        data () {
            return {
                addressData: ChinaAddressData,
                attrValue: [],
                attress: '',
                id: this.$route.query.id,
                showNoScro: false,
                warnText2: '',
                showNoScroll: false,
                warnText: '',
                isdefault: 1,
                provice: "",
                status: 0,
                consignee: "",
                postcode: "",
                city: "",
                address: "",
                district: "",
                mobile: "",
                beTel: function (value) {
                    return {
                        valid: /^(?=\d{11}$)^1(?:3\d|4[57]|5[^4\D]|7[^249\D]|8\d)\d{8}$/.test(value),
                        msg: ''
                    }
                },
            }
        },
        mounted(){
        },
        watch: {
            attrValue(val) {
                console.log(val);
                this.attress = value2name(val, ChinaAddressData); //把值转为文字
            }
        },
        created(){
            this.renderData();

        },
        methods: {
            renderData(){
                detailService().save({
                    id: this.id,
                    cardcode: window.localStorage.getItem('cardcode')
                }).then(res => {
                    let body = res.body;
                    if (body.errcode == 0) {
                        this.isdefault = body.isdefault;
                        this.provice = body.provice;
                        this.consignee = body.consignee;
                        this.postcode = body.postcode;
                        this.city = body.city;
                        this.address = body.address;
                        this.district = body.district;
                        this.mobile = body.mobile;
                        if (this.provice != '' && this.city != '' && this.district != '') {
                            var attr = this.provice + ' ' + this.city + ' ' + this.district;
                            this.attress = attr.split(" ");//地区文字转为数字，要数组
                            var transValue = name2value(this.attress, ChinaAddressData); //把文字转为值
                            this.attrValue = transValue.split(" ");//要数组
                        }
                    } else {
                        this.showNoScroll = true;
                        this.warnText = '初始化失败';
                    }
                }, res => {
                    this.showNoScroll = true;
                    this.warnText = '网络超时，请重试';
                })
            },
            saveItem(){
                var pro = this.attress.split(" ");
                let _this = this;
                if (this.consignee == '' || this.mobileTel == '' || this.address == '' || this.postcode == '' || this.attrValue.length == 0) {
                    this.showNoScroll = true;
                    this.warnText = '您有信息未填写';
                    return
                }
                if(!this.beTel(this.mobileTel).valid){
                    this.showNoScroll = true;
                    this.warnText = '请输入正确的手机号'
                    return
                }
                editAttrService().save({
                    id: this.id,
                    isdefault: this.isdefault,
                    cardcode: window.localStorage.getItem('cardcode'),
                    provice: pro[0],
                    city: pro[1],
                    district: pro[2],
                    postcode:this.postcode,
                    address:this.address,
                    mobile:this.mobile,
                    consignee:this.consignee
                }).then(res => {
                    let body = res.body;
                    if (body.errcode == 0) {
                        this.showNoScroll = true;
                        this.warnText = '保存成功';
                        setTimeout(function () {
                            _this.goLink();
                        }, 1000)
                    } else {
                        this.showNoScroll = true;
                        this.warnText = '保存失败';
                    }
                }, res => {
                    this.showNoScroll = true;
                    this.warnText = '网络超时，请重试';
                })
            },
            deleteItem(){
                this.showNoScro = true;
                this.warnText2 = '确定删除吗？';
            },
            sureDelete(){
                this.showNoScro = false;
                let _this = this;
                removeService().save({
                    id: this.id,
                    cardcode: window.localStorage.getItem('cardcode')
                }).then(res => {
                    let body = res.body;
                    if (body.errcode == 0) {
                        this.showNoScroll = true;
                        this.warnText = '删除成功';
                        setTimeout(function () {
                            _this.goLink();
                        }, 1000)
                    } else {
                        this.showNoScroll = true;
                        this.warnText = '删除失败';
                    }
                }, res => {
                    this.showNoScroll = true;
                    this.warnText = '网络超时，请重试';
                })
            },
            goLink(){
                window.history.back();
//                this.$router.push({
//                    name: 'personMain',
//                    query: {tab: 3},
//                });
            }

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

    .page_reviseAddress {
        .weui-input{
            color: #333;
        }
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
            .remove-address {
                font-size: .6rem;
                color: #EC6941;
                margin: .65rem 0 1rem 0;
            }
        }
    }


</style>
