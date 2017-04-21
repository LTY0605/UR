<template>
    <div class="page_address">
        <div class="address_main">
            <div class="address_item">
                <ul>
                    <li>
                        <span class="liName">张小姐</span>
                        <span class="liCode">13800138000</span>
                    </li>
                    <li>
                        <span class="addressItem">广东省 广州市 天河区</span>
                    </li>
                    <li>
                        <span>体育西183号</span>
                    </li>
                    <li>
                        <span class="editAtt">默认地址</span>
                        <span class="eddOprate">
                          <span class="edit">编辑</span>
                          <span class="delete">删除</span>
                      </span>
                    </li>
                </ul>
            </div>
            <div class="address_item">
                <ul>
                    <li>
                        <span class="liName">张小姐</span>
                        <span class="liCode">13800138000</span>
                    </li>
                    <li>
                        <span class="addressItem">广东省 广州市 天河区</span>
                    </li>
                    <li>
                        <span>体育西183号</span>
                    </li>
                    <li>
                        <span class="editAtt">默认地址</span>
                        <span class="eddOprate">
                          <span class="edit">编辑</span>
                          <span class="delete">删除</span>
                      </span>
                    </li>
                </ul>
            </div>
            <div class="address_item">
                <ul>
                    <li>
                        <span class="liName">张小姐</span>
                        <span class="liCode">13800138000</span>
                    </li>
                    <li>
                        <span class="addressItem">广东省 广州市 天河区</span>
                    </li>
                    <li>
                        <span>体育西183号</span>
                    </li>
                    <li>
                        <span class="editAtt">默认地址</span>
                        <span class="eddOprate">
                          <span class="edit">编辑</span>
                          <span class="delete">删除</span>
                      </span>
                    </li>
                </ul>
            </div>
            <div class="address_item">
                <ul>
                    <li>
                        <span class="liName">张小姐</span>
                        <span class="liCode">13800138000</span>
                    </li>
                    <li>
                        <span class="addressItem">广东省 广州市 天河区</span>
                    </li>
                    <li>
                        <span>体育西183号</span>
                    </li>
                    <li>
                        <span class="editAtt">默认地址</span>
                        <span class="eddOprate">
                          <span class="edit">编辑</span>
                          <span class="delete">删除</span>
                      </span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="operate"><span class="plus">+</span>新增地址</div>

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
            return {}
        },
        mounted(){
        },
        methods: {},
        watch: {},
        created(){
        },
        computed: {}
    }
</script>
<style lang="less" rel="stylesheet/less">
    .page_address {
        .operate {
            margin: 1rem;
            .plus {
                font-size: 1.2rem;
                display: inline-block;
                vertical-align: top;
                margin-right: .25rem;
            }
        }
        .address_main {
            width: 100%;
            height: auto;
            background: #e8e8e8;
            padding-bottom: 0.01rem;
            .address_item {
                padding: .75rem 1rem;
                background: #fff;
                margin-bottom: .35rem;
                ul {
                    width: 100%;
                    height: auto;
                    li {
                        list-style: none;
                        font-size: 0;
                        color: #333;
                        padding: .375rem 0;
                        span {
                            font-size: .75rem;
                            display: inline-block;
                            vertical-align: top;
                        }
                        .liName {
                            width: 40%;
                            text-align: left;
                        }
                        .liCode {
                            width: 60%;
                            text-align: right;
                        }
                        .addressItem {
                            color: #666
                        }
                        .editAtt {
                            width: 30%;
                            background: url("../../assets/icon_on.png") no-repeat left center;
                            background-size: .8rem;
                            padding-left: 1rem;
                        }
                        .eddOprate {
                            width: 70%;
                            text-align: right;
                            .edit{
                                background: url("../../assets/icon_edit.png") no-repeat left center;
                                background-size: .8rem;
                                padding: 0 .5rem 0 1rem;
                            }
                            .delete{
                                background: url("../../assets/icon_trash.png") no-repeat left center;
                                background-size: .75rem;
                                padding-left: 1rem;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
