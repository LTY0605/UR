<template>
    <div class="page_person">
        <div class="personTitle">
            <span :class="{ active:!isPhone}" @click="isPhone = false">修改资料</span>
            <span :class="{ active:isPhone}" @click="isPhone = true">修改手机</span>
        </div>
        <ul class="edit_material">
            <!--<li>-->
                <!--<span class="material_item material_item_name">用户名</span>-->
                <!--<span class="material_item material_item_code"></span>-->
            <!--</li>-->
            <li>
                <group>
                    <x-input title="用户名"  placeholder="请输入"></x-input>
                </group>
            </li>
            <li>
                <group>
                    <selector v-model="sex" title="性别" :options="sexList"></selector>
                </group>
            </li>
            <li>
                <group>
                    <calendar v-model="time" title="出生日期" disable-past></calendar>
                </group>
            </li>
        </ul>
    </div>
</template>
<script>
    import {XHeader, Scroller,XInput, Group,Selector,Calendar,Cell} from 'vux'
    export default {
        components: {
            XHeader, Scroller,XInput, Group,Selector,Calendar,Cell
        },
        data () {
            return {
                demo1: '修改资料',
                tablist: ['修改资料', '修改手机'],
                activeIndex: 0,
                isPhone:false,
                sexList:['男', '女'],
                sex:'男',
                time:'TODAY',
            }
        },
        mounted(){
        },
        watch: {},
        created(){
        },
        computed: {}
    }
</script>
<style lang="less" rel="stylesheet/less">
    .page_person {
        .weui-cells:before,.weui-cells:after{
            display: none;
        }
        .weui-cell{
            padding:0;
        }
        .vux-no-group-title{
            margin-top:0;
            font-size: .7rem;
        }
        .weui-input{
            text-align: right;
            color: #999;
        }

        .weui-label{
            color: #333;
        }
        .vux-selector.weui-cell_select-after{
            padding-left:0;
            height: .95rem;
        }
        .weui-cell_select-after .weui-select{
            padding:0;
            direction: rtl;
        }
        .weui-cell_select .weui-cell__bd:after{
            display: none;
        }
        .personTitle {
            width: 11.2rem;
            height: 1.3rem;
            line-height: 1.25rem;
            margin: .75rem auto;
            border:1px solid #EC6941;
            border-radius: .2rem;
            font-size: 0;
            span{
                font-size: .6rem;
                text-align: center;
                color: #EC6941;
                display: inline-block;
                vertical-align: top;
                width: 50%;
                height: 1.2rem;
            }
            span.active{
                background: #EC6941;
                color: #fff;
            }
        }
        .edit_material {
            height: auto;
            padding: 0 1rem;
            li {
                list-style: none;
                padding: 1rem 1rem 1rem 0;
                height: auto;
                border-bottom: 1px solid #D2D2D2;
                width: 100%;
                background: url("../../assets/icon_right_on.png") no-repeat right center;
                background-size: .35rem;
                font-size: 0;
                .material_item{
                    display: inline-block;
                    vertical-align: top;
                    font-size: .7rem;
                }
            }
        }

    }
</style>
