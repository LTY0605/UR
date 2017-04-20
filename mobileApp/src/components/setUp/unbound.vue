<template>
    <div class="page_unbound">
        <div class="materialItem">
            <ul class="edit_material">
                <li>
                    <group>
                        <x-input title="手机号" placeholder="手机号"></x-input>
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
        XHeader, Scroller, XInput, Group, Selector
    } from 'vux'
    export default {
        components: {
            XHeader, Scroller, XInput, Group, Selector
        },
        data () {
            return {

            }
        },
        mounted(){
        },
        methods: {

        },
        watch: {

        },
        created(){
        },
        computed: {}
    }
</script>
<style lang="less" rel="stylesheet/less">
    .page_unbound {
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
                padding: 1rem 1rem 1rem 0;
                height: auto;
                border-bottom: 1px solid #D2D2D2;
                width: 100%;
                font-size: 0;
                position: relative;
                div {
                    font-size: .7rem;
                }
                .material_item {
                    display: inline-block;
                    vertical-align: top;
                    font-size: .7rem;
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
        }
        .code{
            .weui-cell__ft{
                display: none;
            }
        }

    }
</style>
