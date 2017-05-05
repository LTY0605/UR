<template>
    <div class="page_one">
        <p class="con_p"><span class="con_num">1</span><span class="con_text">请选择你所惠临的门店</span></p>
        <div class="con_back">
            <select class="con_select" name="province">
                <option value ="" disabled selected>选择省份</option>
                <option value="广东省">广东省</option>
            </select>
            <select class="con_select" name="city">
                <option value ="" disabled selected>选择城市</option>
                <option value="广州市">广州市</option>
            </select>
            <select class="con_select" name="store">
                <option value ="" disabled selected>选择门店</option>
                <option value="肯德基">肯德基</option>
            </select>
            <x-button>继 续（1/10）</x-button>
        </div>
    </div>
</template>

<script>
    import {XButton} from 'vux'
    export default {
        components:{
            XButton
        },
        mounted(){
        },
        created(){
        },
        computed: {}
    }
</script>
<style lang="less" rel="stylesheet/less">
    .page_one{
        .con_back{
            padding-bottom: .7rem;
            background: url("../../assets/query_05.png") no-repeat;
            background-size: 100% 86.5%;
            background-position: 0 1.4rem;
        }
        .con_p{
            margin-bottom: 1.25rem;
        }
        .con_num{
            width: 1rem;
            height: 1rem;
            display: inline-block;
            background: #ab9236;
            border-radius: 50%;
            font-size: .6rem;
            line-height: 1rem;
            vertical-align: top;
            text-align: center;
            color: #FFFFFF;
            position: relative;
        }
        .con_num:before{
            content: '';
            display: block;
            position: absolute;
            width: .15rem;
            height: .15rem;
            background: #ab9236;
            border-radius: 50%;
            right: -.2rem;
            bottom: 0;
        }
        .con_text{
            display: inline-block;
            vertical-align: top;
            color: #ab9236;
            font-size: .8rem;
            margin-left: .6rem;
        }
        .con_select{
            width: 100%;
            height: 2rem;
            color: #999999;
            padding-left: .6rem;
            margin-bottom: .6rem;
            font-size: .75rem;
            border: 1px solid #D2D2D2;
            border-radius: .2rem;
            appearance:none;
            -moz-appearance:none;
            -webkit-appearance:none;
            /*在选择框的最右侧中间显示小箭头图片*/
            background: url("../../assets/icon_right.png") no-repeat ;
            background-position: 97% center;
            background-size: 3.5% 40%;
        }
    }
</style>
