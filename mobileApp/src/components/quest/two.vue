<template>
    <div class="page_two">
        <p class="con_p"><span class="con_num">2</span><span class="con_text">您的性别</span></p>
        <ul class="radioBox">
            <li class="girl">
                <label class="text" for="feman">
                    <input
                            id="feman"
                            name="radio"
                            type="radio"
                            v-model="selected"
                            value="1">
                    <span>女生</span>
                </label>
            </li>
            <li class="boy">
                <label class="text checked" for="man">
                    <input
                            id="man"
                            name="radio"
                            v-model="selected"
                            type="radio"
                            value="0">
                    <span>男生</span>
                </label>
            </li>
        </ul>
        <!--<button class="quest-btn" @click="">继 续（2/10）</button>-->
    </div>
</template>

<script>
    import {XButton} from 'vux'
    export default{
        components:{
            XButton
        },
        props:{
            sexData:Array
        },
        data(){
            return{
                selected: 1,
            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    .page_two{
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
    input[type="radio"]{
        display: none;
    }
    input[type="radio"] + span{
        width: .85rem;
        height: .85rem;
        line-height: .85rem;
        background: url(../../assets/images/circle.png) left center no-repeat;
        background-size: .85rem .85rem;
        padding-left: 1.2rem;
        font-size: .75rem;
        color: #999999;
    }
    input[type="radio"]:checked + span{
        background: url(../../assets/images/circle_a.png) left center no-repeat;
        background-size: .85rem .85rem;
        color: #666666;
    }
    .radioBox{
        font-size: .75rem;
        list-style: none;
        .girl{
            margin-bottom: 1.3rem;
        }
        .boy{
            margin-bottom: 5.65rem;
        }
    }
    .two_btn{
        margin-bottom: .7rem;
    }
    .quest-btn{
        margin-left: 0;
        width: 100%;
        height: 2rem;
        border: none;
        background: #ab9236;
        color: #FFFFFF;
    }
    button{
        outline: none;
    }
    }
</style>