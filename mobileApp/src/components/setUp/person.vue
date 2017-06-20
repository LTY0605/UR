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
                        <x-input title="用户名" placeholder="请输入用户名" v-model="customerName" :max="20" :is-type="zhengze_name"></x-input>
                    </group>
                </li>
                <li>
                    <group>
                        <selector v-model="sex" title="性别" :options="sexList"></selector>
                    </group>
                </li>
                <li class="birthday">
                    <group>
                        <!--<datetime v-model="brithday"-->
                        <!--title="出生日期"-->
                        <!--format="YYYY-MM-DD"-->
                        <!--cancelText="取消"-->
                        <!--confirmText="确定"-->
                        <!--:min-year=1900></datetime>-->
                        <x-input v-model="brithday" title="出生日期" disabled></x-input>
                    </group>
                </li>
                <li class="attress">
                    <x-address @on-hide="logHide" @on-show="logShow" title="地区" v-model="attrValue" :list="addressData"
                               placeholder="请选择地址"></x-address>
                </li>
            </ul>
            <div class="operate" @click="sureSubmit">提交</div>
        </div>
        <div class="materialItem" v-if="isPhone">
            <ul class="edit_material edit_material2">
                <li>
                    <group>
                        <x-input title="原手机号" placeholder="原手机号" v-model="mobileTel" :max="11" :min="11"
                                 keyboard="number" is-type="china-mobile" disabled></x-input>
                    </group>
                </li>
                <li>
                    <group>
                        <x-input title="新手机号" placeholder="新手机号" v-model="newMobileTel" :max="11" :min="11"
                                 keyboard="number" is-type="china-mobile"></x-input>
                    </group>
                </li>
                <li class="code">
                    <group>
                        <x-input title="验证码" placeholder="请输入短信验证码" v-model="code"></x-input>
                    </group>
                    <!--<span class="getCode" @click="getCode">获取验证码</span>-->
                    <span v-show="!showMin" class="getCode" @click="getCode">获取验证码</span>
                    <span v-show="showMin" class="getCode2">{{time}}秒</span>
                </li>
            </ul>
            <div class="operate" @click="editTel">提交</div>
        </div>
        <!--<x-dialog v-model="showNoScroll" class="dialog-demo" :scroll="false">-->
        <!--<p class="dialog-title">温馨提示</p>-->
        <!--<div class="dialog-contain">-->
        <!--{{warnText}}-->
        <!--</div>-->
        <!--<button class="vux-close" @click="showNoScroll=false">关闭</button>-->
        <!--</x-dialog>-->
        <toast v-model="showNoScroll" type="text" :time="1000">{{warnText}}</toast>
    </div>
</template>
<script>
    import {
        XHeader, Scroller, XInput, Group, Selector, Calendar, Cell, XAddress, ChinaAddressData,
        Value2nameFilter as value2name, Name2valueFilter as name2value, Datetime, XDialog,Toast
    } from 'vux'
    import {
        memberInfoService, infoEditService, mobileEditService, codeService
    } from '../../services/person.js'
    export default {
        components: {
            XHeader, Scroller, XInput, Group, Selector, Calendar, Cell, XAddress, Datetime, XDialog,Toast
        },
        data () {
            return {
                mobileTel: '',//原手机号
                newMobileTel: '',//新手机号
                beTel: function (value) {
                    return {
                        valid: /^(?=\d{11}$)^1(?:3\d|4[57]|5[^4\D]|7[^249\D]|8\d)\d{8}$/.test(value),
                        msg: ''
                    }
                },
                code: '',//验证码
                customerName: '',
                showNoScroll: false,
                brithday: '',
                warnText: '提示',
                demo1: '修改资料',
                tablist: ['修改资料', '修改手机'],
                activeIndex: 0,
                isPhone: false,
                sexList: [{key: '0', value: '男'}, {key: '1', value: '女'}],
                sex: '男',
                time: 'TODAY',
                attrValue: [],
                addressData: ChinaAddressData,
                attress: '',
                provice: '',//省
                city: '',//市
                district: '',//县/区
                cardcode: '',//会员卡号
                showMin: false,
                time: 60,
                zhengze_name: function (value) {
                    return {
                        valid: /^[A-Za-z0-9_\u4e00-\u9fa5]{4,20}$/.test(value),
                        msg: '字体长度不能超过20'
                    }
                },
            }
        },
        created(){
            // this.renderData();
            this.getData();
            this.mobileTel = window.localStorage.getItem("mobileTel");
        },
        mounted(){
        },
        methods: {
            editTel(){
                let _this = this;
                if (this.newMobileTel == '') {
                    this.showNoScroll = true;
                    this.warnText = '请输入新的手机号';
                    return
                }
                if (this.code == '') {
                    this.showNoScroll = true;
                    this.warnText = '请输入手机验证码';
                    return
                }
                if(!this.beTel(this.newMobileTel).valid){
                    this.showNoScroll = true;
                    this.warnText = '请输入正确的手机号'
                    return
                }
                if (this.newMobileTel == this.mobileTel) {
                    this.showNoScroll = true;
                    this.warnText = '新旧手机号不能一样';
                    return
                }
                mobileEditService().save({
                    mobileTel: this.mobileTel,
                    newMobileTel: this.newMobileTel,
                    code: this.code,
                    cardcode: window.localStorage.getItem("cardcode"),
                    wxOpenID: window.localStorage.getItem("wxOpenId"),
                }).then(res => {
                    let body = res.body;
                    if (body.errcode == 0) {
                        this.showNoScroll = true;
                        this.warnText = '修改成功';
                        setTimeout(function () {
                            _this.$router.push({
                                name: 'login',
                            });
                        },300)
                    } else {
                        this.showNoScroll = true;
                        this.warnText = body.errmsg;
                    }

                }, res => {
                    this.showNoScroll = true;
                    this.warnText = '网络超时，请重试';
                })
            },
            getCode(){
                if (this.newMobileTel == '') {
                    this.showNoScroll = true;
                    this.warnText = '请输入新手机号';
                    return
                }
                if(!this.beTel(this.newMobileTel).valid){
                    this.showNoScroll = true;
                    this.warnText = '请输入正确的新手机号'
                    return
                }
                codeService().save({
                    scope: 'mobileTel',
                    mobileTel: this.mobileTel,
                }).then(res => {
                    let body = res.body;
                    if (body.errcode == 0) {
                        this.showNoScroll = true;
                        this.warnText = '验证码发送成功';
                        this.showMin = true;
                        this.finish();
                    } else {
                        this.showNoScroll = true;
                        this.warnText = '验证码发送失败，请稍后再试';
                    }

                }, res => {
                    this.showNoScroll = true;
                    this.warnText = '网络超时，请重试';
                })
            },
            finish() {
                this.time = this.time - 1;
                if (this.time > 0) {
                    setTimeout(() => {
                        this.finish();
                    }, 1000)
                } else {
                    this.showMin = false;
                    this.time = 60;
                }
            },
            getData(){
                if (window.localStorage.getItem("customerName")) {
                    this.customerName = window.localStorage.getItem("customerName");
                    this.sex = window.localStorage.getItem("sex");
                    this.brithday = window.localStorage.getItem("brithday");
                    this.provice = window.localStorage.getItem("provice");
                    this.city = window.localStorage.getItem("city");
                    this.district = window.localStorage.getItem("district");
                    if (this.provice != '' && this.city != '' && this.district != '') {
                        var attr = this.provice + ' ' + this.city + ' ' + this.district;
                        this.attress = attr.split(" ");//地区文字转为数字，要数组
                        var transValue = name2value(this.attress, ChinaAddressData); //把文字转为值
                        this.attrValue = transValue.split(" ");//要数组
                    }
                }
            },
            renderData(){
                memberInfoService().get({
                    wxOpenid: window.localStorage.getItem("wxOpenId"),
                }).then(res => {
                    let body = res.body;
                    if (body.errcode == 0) {
                        this.cardcode = body.cardcode;
                        window.localStorage.setItem("cardcode", this.cardcode);
                        this.customerName = body.customerName;
                        this.sex = body.sex;
                        this.brithday = body.brithday;
                        this.provice = body.provice;
                        this.city = body.city;
                        this.district = body.district;
                        if (this.provice != '' && this.city != '' && this.district != '') {
                            var attr = this.provice + ' ' + this.city + ' ' + this.district;
                            this.attress = attr.split(" ");//地区文字转为数字，要数组
                            var transValue = name2value(this.attress, ChinaAddressData); //把文字转为值
                            this.attrValue = transValue.split(" ");//要数组
                        }
                    } else {
                        this.showNoScroll = true;
                        this.warnText = body.msg;
                    }
                }, res => {
                    this.showNoScroll = true;
                    this.warnText = '网络超时，请重试';
                })
            },
            sureSubmit(){
                var pro = this.attress.split(" ")
                if(this.customerName == ''){
                    this.showNoScroll = true;
                    this.warnText = '请输入用户名';
                    return
                }
                if(!this.zhengze_name(this.customerName).valid){
                    this.showNoScroll = true;
                    this.warnText = '用户名格式不对，字数在4到20之间'
                    return
                }
                infoEditService().save({
                    customerName: this.customerName,
                    cardcode: window.localStorage.getItem("cardcode"),
                    wxOpenID: window.localStorage.getItem("wxOpenId"),
                    sex: this.sex,
                    provice: pro[0],
                    city: pro[1],
                    district: pro[2]
                }).then(res => {
                    let body = res.body;
                    if (body.errcode == 0) {
                        this.showNoScroll = true;
                        this.warnText = '修改成功';
                        window.localStorage.setItem("sex", this.sex);
                        window.localStorage.setItem("provice", pro[0]);
                        window.localStorage.setItem("customerName", this.customerName);
                        window.localStorage.setItem("district", pro[2]);
                        window.localStorage.setItem("city", pro[1]);
                    } else {
                        this.showNoScroll = true;
                        this.warnText = '修改失败';
                    }

                }, res => {
                    this.showNoScroll = true;
                    this.warnText = '网络超时，请重试';
                })
            },
            logHide(str){
//                console.log('on-hide', str)
            },
            logShow(str){
//                console.log('on-show')
            },
        },
        watch: {
            attrValue(val) {
                this.attress = value2name(val, ChinaAddressData); //把值转为文字
            },
//            attress(val) {
//                this.attrValue = name2value(val, ChinaAddressData); //把值转为文字
//            },
        },

        computed: {}
    }
</script>
<style lang="less" rel="stylesheet/less">
    .dialog-demo {
        font-size: .85rem;
        .dialog-title {
            height: 2rem;
            line-height: 2rem;
            font-size: .9rem;
        }
        .dialog-contain {
            padding-bottom: .5rem;
        }
        .vux-close {
            width: 2rem;
            background: #CDBE86;
            border: 0;
            margin-bottom: .5rem;
            color: #fff;
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
            width: 2rem;
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
                font-size: .7rem;
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
            .birthday {
                background: none;
            }
            .attress {
                .vux-popup-picker-select span {
                    color: #999;
                }
            }
        }
        .edit_material2 {
            width: 100%;
            height: auto;
            li {
                background: none;
                position: relative;
                padding: 1rem 0;
                .weui-input {
                    text-align: left;
                }
                .getCode {
                    font-size: .7rem;
                    position: absolute;
                    right: 0;
                    top: 50%;
                    margin-top: -.55rem;
                    border-bottom: 1px solid #EC6941;
                    color: #EC6941;
                    z-index: 100;
                }
                .getCode2{
                    font-size: .7rem;
                    position: absolute;
                    right: 0;
                    top: 50%;
                    margin-top: -.55rem;
                    color: #999;
                    z-index: 100;
                }

            }

            .code {
                .weui-cell__ft {
                    display: none;
                }
            }

        }

    }
</style>
