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
                        <span class="addressItem">{{item.provice}} {{item.city}} {{item.district}}</span>
                    </li>
                    <li>
                        <span>{{item.address}}</span>
                    </li>
                    <li>
                        <label class="editAtt" @click="changeDefalt(index)">
                            <input class="check" type="radio" name="radio1" :checked="item.isdefault==0"  :value="item.uid">
                            <span>默认地址</span>
                        </label>
                        <span class="eddOprate">
                          <span class="edit" @click="editItem(item.id)">编辑</span>
                          <span class="delete" @click="deleteItem(item.id,index)">删除</span>
                      </span>
                    </li>
                </ul>
            </div>

        </div>
        <div class="operate" @click="addAddress"><span class="plus">+</span>新增地址</div>
        <alert v-model="showNoScroll" title="温馨提示">{{warnText}}</alert>
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
        XHeader, Scroller, XInput, Group, Selector,XDialog,Alert
    } from 'vux'
    import {
        addressListService,removeService
    } from '../../services/person.js'
    export default {
        components: {
            XHeader, Scroller, XInput, Group, Selector,XDialog,Alert
        },
        data () {
            return {
                dataList:[],
                showNoScro:false,
                warnText2:'',
                showNoScroll:false,
                warnText:'',
                currentIndex:0,
                currentUid:0,
            }
        },
        created(){
            this.renderData();
        },
        mounted(){
        },
        methods: {
            changeDefalt(index){
                this.dataList[index].isdefault = 0;
            },
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
                this.currentIndex = index;
                this.currentUid = uid;
                this.showNoScro = true;
                this.warnText2 = '确定删除吗？';
            },
            editItem(id){
                this.$router.push({
                    name: 'reviseAddress',
                    query: {id: id},
                });
            },
            sureDelete(){
                this.showNoScro = false;
                removeService().save({
                    id:this.currentUid,
                    cardcode:window.localStorage.getItem('cardcode')
                }).then(res => {
                    let body = res.body;
                    if (body.errcode == 0) {
                        this.showNoScroll = true;
                        this.warnText = '删除成功';
                        this.dataList.splice(this.currentIndex, 1);
                    }else{
                        this.showNoScroll = true;
                        this.warnText = '删除失败';
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
                            font-size: .75rem;
                            display: inline-block;
                            input[type="radio"] {
                                display: none;
                            }
                            input[type="radio"] + span {
                                background: url(../../assets/images/circle.png) left center no-repeat;
                                background-size: .85rem .85rem;
                                padding-left: 1.3rem;
                                font-size: .75rem;
                            }
                            input[type="radio"]:checked + span {
                                background: url(../../assets/images/circle_a.png) left center no-repeat;
                                background-size: .85rem .85rem;
                            }
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
