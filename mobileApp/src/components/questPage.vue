<template>
    <div class="page_questPage">
        <x-header :left-options="{backText:''}">UR问卷调研</x-header>
        <div class="quest_con">
            <one v-if="one"></one>
            <two v-if="two"></two>
            <three v-if="three"></three>
            <four v-if="four"></four>
            <button id="btnText" class="quest-btn" @click="next">继 续（{{num}} /10）</button>
        </div>
    </div>
</template>

<script>
    import one from './quest/one.vue'
    import two from './quest/two.vue'
    import three from './quest/three.vue'
    import four from './quest/four.vue'
    import {XHeader, Group, Cell, XButton} from 'vux'
    export default{
        components:{
            XHeader, XButton, one, two, three, four
        },
        data(){
            return{
                one:true,
                two:false,
                three:false,
                four:false,
                num:'1'
            }
        },
        methods:{
            next(){
                let fBtn = document.getElementById('btnText');
                if(this.one == true){
                    this.one = false;
                    this.num=2;
                    this.two = true;
                }else if(this.two == true){
                    this.two = false;
                    this.num=3;
                    this.three = true;
                }else if(this.three == true){
                    this.three = false;
                    this.num=4;
                    fBtn.innerHTML = '提交';
                    this.four = true;
                }
            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    .page_questPage{
        .vux-header {
            background-color: #AB9236 !important;
        }

        .vux-header .vux-header-title, .vux-header h1 {
            font-size: .85rem;
        }
        .weui-btn{
            font-size: .75rem;
            color: #FFFFFF;
            background: #AB9236;
        }
        .quest_con{
            padding: 1.25rem 1.75rem .7rem 1.75rem;
            font-size: 0;
            background: url("../assets/query_05.png") no-repeat;
            background-size: 15.5rem 9.85rem;
            background-position: 1.75rem 4.5rem;
            height: auto;
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