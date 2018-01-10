<template>
    <div class="page_password">
        <div class="materialItem">
            <ul class="edit_material">
                <li>
                    <group>
                        <x-input type="password" title="原密码" placeholder="原密码"  :max="11" :is-type="bePassWord"
                                 v-model="oldPassword"></x-input>
                    </group>
                </li>
                <li>
                    <group>
                        <x-input type="password" title="新密码" placeholder="新密码" v-model="newPassword" :max="11" :is-type="bePassWord"></x-input>
                    </group>
                </li>
                <li>
                    <group>
                        <x-input type="password" title="确认新密码" placeholder="请再次确认新密码" v-model="newPassword2"
                                 :equal-with="newPassword"></x-input>
                    </group>
                </li>
            </ul>
            <div class="operate" @click="passWordEdit">提交</div>
        </div>
        <toast v-model="showNoScroll" type="text" :time="1000">{{warnText}}</toast>
    </div>
</template>
<script>
    import {
        XHeader, Scroller, XInput, Group, Selector,Alert,Toast
    } from 'vux'
    import {
        passwordService
    } from '../../services/person.js'
    export default {
        components: {
            XHeader, Scroller, XInput, Group, Selector,Alert,Toast
        },
        data () {
            return {
                showNoScroll:false,
                warnText:'',
                newPassword: '',
                oldPassword: '',
                newPassword2: '',
                bePassWord: function (value) {
                return {
                    valid: /^[0-9a-zA-Z]{0,11}$/.test(value),
                    msg: '密码只能字母跟数字，长度不能大于11位'
                }
            },
            }
        },
        mounted(){
        },
        methods: {
            passWordEdit(){
                if (this.oldPassword == '' || this.newPassword == '' || this.newPassword2 == '') {
                    this.showNoScroll = true;
                    this.warnText = '您有信息未填写';
                    return
                }
                if(!this.bePassWord(this.oldPassword).valid || !this.bePassWord(this.newPassword).valid || !this.bePassWord(this.newPassword2).valid){
                    this.showNoScroll = true;
                    this.warnText = '密码只能字母跟数字，长度不能大于11位';
                    return
                }
                if (this.newPassword2 != this.newPassword) {
                    this.showNoScroll = true;
                    this.warnText = '两次输入的密码不一致';
                    return
                }
                passwordService().save({
                    oldpassword:this.oldPassword,
                    newpassword:this.newPassword,
                    confirmpassword:this.newPassword2,
                    cardcode: window.localStorage.getItem("cardcode"),
                }).then(res => {
                    let body = res.body;
                    if (body.errcode == 0) {
                        this.showNoScroll = true;
                        this.warnText = '修改成功';
                    }else{
                        this.showNoScroll = true;
                        this.warnText = body.errmsg;
                    }

                }, res => {

                })
            },
        },
        watch: {},
        created(){
        },
        computed: {}
    }
</script>
<style lang="less" rel="stylesheet/less">
    .page_password {
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
