<template>
    <div class="page_three">
        <p class="con_p">
            <span class="con_num">3</span>
            <span class="con_text">您对门店形象的整体感觉与以下哪一项 最符合？（单选）</span></p>
        <ul class="radioBox">
            <li v-for="(item,index) in currentData.slice(0,4)" class="channel">
                <label class="text" :for="'channel'+item.id">
                    <input
                            :id="'channel'+item.id"
                            name="radio"
                            type="radio"
                            @click="disabledText"
                            v-model="selected"
                            :value="'channel'+item.id">
                    <span>{{item.value}}</span>
                </label>
            </li>
            <li class="channel">
                <label class="text" for="selectD">
                    <input
                            id="selectD"
                            name="radio"
                            v-model="selected"
                            type="radio"
                            @click="otherText"
                            value="3">
                    <span>其他</span>
                </label>
                <br>
                <input id="oText" :disabled="other" placeholder="请注明" class="txt" type="text"/>
            </li>
        </ul>
    </div>
</template>

<script>
    export default{
        components:{
        },
        props:{
            currentData:Array
        },
        data(){
            return{
                selected: 0,
                other: true
            }
        },
        methods:{
            //关闭禁用和随之获取焦点
            otherText(){
                this.other = false;
                let text = document.getElementById('oText');
                text.focus();
//                console.log(this.selected);
            },
            //清除其他的值和禁用
            disabledText(){
                let text = document.getElementById('oText');
                text.value = '';
                this.other = true;
            }
        },
        computed:{
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
            line-height: 1.2rem;
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
            .channel{
                margin-bottom: .85rem;
                .txt{
                    background: none;
                    border: none;
                    /*border-bottom: 1px solid #999999;*/
                    margin: .6rem 0 0 1.2rem;
                    width: 85%;
                }
            }
            .channel:last-child{
                margin-bottom: 1.85rem;
            }
        }
        button{
            outline: none;
        }
    }
</style>