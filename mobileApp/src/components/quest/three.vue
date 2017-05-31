<template>
    <div class="page_three">
        <p class="con_p">
            <span class="con_num">3</span>
            <span class="con_text">您对门店形象的整体感觉与以下哪一项 最符合？（单选）</span></p>
        <ul class="radioBox">
            <li class="girl">
                <label class="text" for="selectA">
                    <input
                            id="selectA"
                            name="radio"
                            type="radio"
                            v-model="selected"
                            value="0">
                    <span>A. 橱窗奢华大气，整体布局整齐有序</span>
                </label>
            </li>
            <li class="girl">
                <label class="text" for="selectB">
                    <input
                            id="selectB"
                            name="radio"
                            v-model="selected"
                            type="radio"
                            value="1">
                    <span>B. 店面设计一般，没有深刻印象</span>
                </label>
            </li>
            <li class="girl">
                <label class="text" for="selectC">
                    <input
                            id="selectC"
                            name="radio"
                            v-model="selected"
                            type="radio"
                            value="2">
                    <span>C. 门店设计风格不吸引，环境一般</span>
                </label>
            </li>
            <li class="boy">
                <label class="text" for="selectD">
                    <input
                            id="selectD"
                            name="other"
                            v-model="selected"
                            type="radio"
                            @click="otherText"
                            value="3">
                    <span>其他</span>
                </label>
                <br>
                <input :disabled="other" placeholder="请注明" class="txt" type="text"/>
            </li>
        </ul>
        <!--<button class="quest-btn" @click="">继 续（3/10）</button>-->
    </div>
</template>

<script>
    import {XButton} from 'vux'
    export default{
        components:{
            XButton
        },
        data(){
            return{
                selected: 6,
                other: true
            }
        },
        methods:{
            otherText(){
                var radios = document.getElementsByName('other');
                if(radios){
                    this.other = false
                } else{
                    this.other = true
                }
                console.log(this.selected);
            }
        },
        mounted(){
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    .page_three{
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
        margin-top: -.14rem;
        margin-left: .6rem;
        width: 13.6rem;
        line-height: 1.2rem;

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
    input[type="text"]::-webkit-input-placeholder{
        color: #999999 !important;
    }
    input[type="text"]{
        color: #666666;
    }
    .radioBox{
        font-size: .75rem;
        list-style: none;
    .girl{
        margin-bottom: 1.25rem;
    }
    .boy{
        .txt{
            background: none;
            border: none;
            /*border-bottom: 1px solid #999999;*/
            margin: .6rem 0 0 1.2rem;
            width: 85%;
        }
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