<template>
    <div class="page_questPage">
        <x-header :left-options="{backText:''}">UR问卷调研</x-header>
        <div class="quest_con">
            <one v-if="one"></one>
            <two v-if="two"></two>
            <three v-if="three"></three>
        </div>
    </div>
</template>

<script>
    import one from './quest/one.vue'
    import two from './quest/two.vue'
    import three from './quest/three.vue'
    import {XHeader, Group, Cell, XButton} from 'vux'
    export default{
        components:{
            XHeader, XButton, one, two, three
        },
        data(){
            return{
                one:false,
                two:false,
                three:true
            }
        },
        methods:{
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
            background-size: 80% 68%;
            background-position: 1.75rem 4.5rem;
            height: auto;
        }
    }
</style>