<template>
    <div class="page_three">
        <p class="con_p">
            <span class="con_num">4</span>
            <span class="con_text">您从哪些渠道关注UR品牌？（多选， 最多可选3项）</span></p>
        <ul id="box" class="radioBox">
            <li v-for="(item,index) in feelData" class="girl">
                <label class="text" :for="'feel'+item.id">
                    <input
                            :id="'feel'+item.id"
                            name="check"
                            type="checkbox"
                            @click="checboxNum('check', 3)"
                            value="item.id">
                    <span>{{item.value}}</span>
                </label>
            </li>
        </ul>
        <!--<button class="quest-btn" @click="">继 续（4/10）</button>-->
        <br>
    </div>
</template>

<script>
    export default{
        components:{
        },
        props:{
            feelData:Array
        },
        data(){
            return{
            }
        },
        methods:{
            checboxNum(name, num) {
                let checboxs = document.getElementsByName(name);
                let a = 0;
                for (let index = 0; index < checboxs.length; index++) {
                    if (checboxs[index].checked) {
                        a = a + 1;
                    }
                }
                if (a == num) {
                    for (let index = 0; index < checboxs.length; index++) {
                        if (!checboxs[index].checked) {
                            checboxs[index].disabled = 'disabled';
                        }
                    }
                } else {
                    for (let index = 0; index < checboxs.length; index++)
                        checboxs[index].removeAttribute('disabled');
                }
            }
        },
        mounted(){
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    .page_three{
    .con_p{
        margin-bottom: 1rem;
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
    input[type="checkbox"]{
        display: none;
    }
    input[type="checkbox"] + span{
        width: .85rem;
        height: .85rem;
        line-height: .85rem;
        background: url(../../assets/images/circle.png) left center no-repeat;
        background-size: .85rem .85rem;
        padding-left: 1.2rem;
        font-size: .75rem;
        color: #999999;
    }
    input[type="checkbox"]:checked + span{
        background: url(../../assets/images/circle_a.png) left center no-repeat;
        background-size: .85rem .85rem;
        color: #666666;
    }
    .radioBox{
        font-size: .75rem;
        list-style: none;
    .girl{
        margin-bottom: 1.05rem;
    }
    .girl:last-child{
        margin-bottom: 3.05rem;
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