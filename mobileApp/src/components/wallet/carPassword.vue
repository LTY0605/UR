<template>
    <div class="page_password">
        <x-header :left-options="{backText: ''}">密码修改</x-header>
        <div class="materialItem">
            <p class="title">京东卡密码修改</p>
            <ul class="edit_material">
                <li>
                    <group>
                        <x-input type="password" title="原密码" placeholder="原密码" :max="11"
                                 v-model="oldpassword"></x-input>
                    </group>

                </li>
                <li>
                    <group>
                        <x-input type="password" title="新密码" placeholder="新密码" v-model="newpassword" :max="11" :min="6"
                                 :is-type="bePassWord"></x-input>
                    </group>

                </li>
                <li>
                    <group>
                        <x-input type="password" title="确认新密码" placeholder="请再次输入新密码" v-model="confirmpassword"
                                 :equal-with="newpassword"></x-input>
                    </group>
                </li>
            </ul>
            <div class="operate" @click="passWordEdit">提交</div>
        </div>
        <toast v-model="showNoScroll" type="text" :time="1000">{{warnText}}</toast>
    </div>
</template>
<script>
    import {carPasswordServices} from '../../services/carPassword.js'
    import {
        XHeader, Scroller, XInput, Group, Selector, Alert, Toast
    } from 'vux'
    import {
        passwordService
    } from '../../services/person.js'
    export default {
        components: {
            XHeader, Scroller, XInput, Group, Selector, Alert, Toast
        },
        data () {
            return {
                showNoScroll: false,
                warnText: '',
                newpassword: '',
                oldpassword: '',
                confirmpassword: '',
                valueCardcode: this.$route.query.valueCardcode,
                bePassWord: function (value) {
                    return {
                        valid: /^[0-9a-zA-Z]{6,11}$/.test(value),
                        msg: '密码只能字母跟数字，长度为6到11位'
                    }
                },
            }
        },
        mounted(){
        },
        created(){
        },
        methods: {

            passWordEdit(){
                let _this = this;
                if (this.oldpassword == '' || this.newpassword == '' || this.confirmpassword == '') {
                    this.showNoScroll = true;
                    this.warnText = '您有信息未填写';
                    return
                }
                if (!this.bePassWord(this.oldpassword).valid || !this.bePassWord(this.newpassword).valid || !this.bePassWord(this.confirmpassword).valid) {
                    this.showNoScroll = true;
                    this.warnText = '密码只能字母跟数字，长度为6到11位';
                    return
                }
                if (this.confirmpassword != this.newpassword) {
                    this.showNoScroll = true;
                    this.warnText = '两次输入的密码不一致';
                    return
                }
                carPasswordServices().save({
                    oldpassword: this.oldpassword,
                    newpassword: this.newpassword,
                    confirmpassword: this.confirmpassword,
                    valueCardcode: this.valueCardcode,
                }).then(res => {
                    let body = res.body;
                    if (body.errcode == 0) {
                        this.showNoScroll = true;
                        this.warnText = '修改成功';
                        setTimeout(function () {
                            _this.$router.push({
                                name: 'giftCoupon',
                            });
                        }, 300)
                    } else if (body.errcode == 1001) {
                        this.showNoScroll = true;
                        this.warnText = '原密码不正确，请重新输入';
                    } else {
                        this.showNoScroll = true;
                        this.warnText = body.errmsg;
                    }
                }, res => {
                })
            },
        },
        watch: {},
        computed: {}
    }
</script>
<style lang="less" rel="stylesheet/less">
    .page_password {
        .vux-header {
            background-color: #AB9236 !important;
        }
        .title {
            padding-bottom: .5rem;
            border-bottom: 1px solid #ddd;
            color: #AB9236;
            font-size: .9rem;
        }

        .vux-header .vux-header-title, .vux-header h1 {
            font-size: .85rem;
        }
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
            text-align: left;
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
            padding: .9rem 1rem 0 1rem;
        }
        .edit_material {
            height: auto;
            width: 100%;
            li {
                list-style: none;
                padding: 1rem 0;
                height: auto;
                border-bottom: 1px solid #D2D2D2;
                width: 100%;
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
            .attress {
                .vux-popup-picker-select span {
                    color: #999;
                }
            }
        }

    }
</style>
