<template>
    <div class="page_address">
        <div class="address_main">
            <div class="address_item" v-for="(item,index) in dataList">
                <ul>
                    <li>
                        <span class="liName">{{item.consignee}}</span>
                        <span class="liCode">{{item.mobileTel}}</span>
                    </li>
                    <li>
                        <span class="addressItem">广东省 广州市 天河区</span>
                    </li>
                    <li>
                        <span>{{item.address}}</span>
                    </li>
                    <li>
                        <span class="editAtt" v-if="item.default == 0">默认地址</span>
                        <span class="eddOprate">
                          <span class="edit">编辑</span>
                          <span class="delete" @click="deleteItem(item.uid,index)">删除</span>
                      </span>
                    </li>
                </ul>
            </div>

        </div>
        <div class="operate" @click="addAddress"><span class="plus">+</span>新增地址</div>
        <x-dialog v-model="showNoScro" class="dialog-demo" :scroll="false">
            <p class="dialog-title">温馨提示</p>
            <div class="dialog-contain">
                {{warnText2}}
            </div>
            <span class="vux-close" @click="showNoScro=false">确定</span>
        </x-dialog>
    </div>
</template>
<script>
    import {
        XHeader, Scroller, XInput, Group, Selector,XDialog
    } from 'vux'
    import {
        addressListService,removeService
    } from '../../services/person.js'
    export default {
        components: {
            XHeader, Scroller, XInput, Group, Selector,XDialog
        },
        data () {
            return {
                dataList:[],
                showNoScro:false,
                warnText2:'',
            }
        },
        created(){
            this.renderData();
        },
        mounted(){
        },
        methods: {
            renderData(){
                addressListService().save({
                    cardcode:window.localStorage.getItem("cardcode"),
                    wxOpenID:window.localStorage.getItem("wxOpenId"),
                }).then(res => {
                    let body = res.body;
                    if (body.errcode == 0) {
                        this.dataList = body.list;
                    }
                }, res => {

                })
            },
            addAddress(){
                this.$router.push({
                    name: 'newAddress',
                });
            },
            deleteItem(uid,index){
                removeService().save({
                    uid:uid,
                }).then(res => {
                    let body = res.body;
                    if (body.errcode == 0) {
                        this.showNoScro = true;
                        this.warnText2 = '删除成功';
                        this.dataList.splice(index, 1);
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
