<template>
    <div class="page_password">
        <div class="materialItem">
            <ul class="edit_material">
                <li>
                    <group>
                        <x-input type="password" title="原密码" placeholder="原密码" :is-type="bePassWord"
                                 v-model="password" :max="11"></x-input>
                    </group>
                </li>
                <li>
                    <group>
                        <x-input type="password" title="新密码" placeholder="新密码" v-model="newPassword"></x-input>
                    </group>
                </li>
                <li>
                    <group>
                        <x-input type="password" title="确认新密码" placeholder="请再次确认新密码" v-model="newPassword2"
                                 :equal-with="newPassword"></x-input>
                    </group>
                </li>
            </ul>
            <div class="operate">提交</div>
        </div>
    </div>
</template>
<script>
    import {
        XHeader, Scroller, XInput, Group, Selector
    } from 'vux'
    export default {
        components: {
            XHeader, Scroller, XInput, Group, Selector
        },
        data () {
            return {
                newPassword: '',
                password: '',
                newPassword2: '',
                bePassWord: function (value) {
                return {
                    valid: /[0-9a-zA-Z]{4,11}/.test(value),
                    msg: 'Must be 2333'
                }
            },
            }
        },
        mounted(){
        },
        methods: {
            kk(val){
                alert(val)
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
