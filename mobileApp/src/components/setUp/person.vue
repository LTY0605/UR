<template>
    <div class="page_person">
        <div class="personTitle">
            <span>修改资料</span>
            <span>修改手机</span>
        </div>
    </div>
</template>
<script>
    import {XHeader, Scroller} from 'vux'
    export default {
        components: {
            XHeader,Scroller
        },
        data () {
            return {


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
.page_person{
    .personTitle{
        width: 11.2rem;
        border: 1px solid #EC6941;
        height: 1.25rem;
        line-height:1.25rem;
        border-radius: .2rem;
        margin: .75rem auto;
    }
}
</style>
