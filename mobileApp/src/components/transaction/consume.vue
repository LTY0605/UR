<template>
    <div class="page_consume">
        <div class="consume">
            <no-data v-show="tranlists.length==0"></no-data>
            <ul class="tranlist" v-show="tranlists.length!=0">
                <li v-for="list in tranlists" class="list">
                    <p>单号：<span class="list-number">{{list.billNO}}</span></p>
                    <p class="list-mar">类型：{{list.operTypeName}}</p>
                    <p>日期：{{list.saleDate}}</p>
                    <template v-if="list.amount > 0">
                        <p class="list-money red">+{{list.amount}}</p>
                    </template>
                    <template v-else>
                        <p class="list-money">{{list.amount}}</p>
                    </template>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import noData from '../common/noData.vue'
    export default {
        components: {noData
        },
        props: {
            tranlists:Array,
        },

        data () {
            return {
            }
        },
        mounted(){
        },
        watch: {},
        created(){
            //this.renderData()
        },
        methods:{
           /*renderData(){
            transRecordService().save({
                operTypeName:this.operTypeName,
                operType:this.currentCode
            }).then(res =>{

                let body = res.body;
                if(body.errcode == 0){
                    this.tranlists = body.list;
                } else{
                    this.showNoScroll = true;
                    this.warnText = body.errmsg;
                }
            },res =>{
                this.showNoScroll = true;
                this.warnText = "网络超时，请重试";
            })
        }*/},
        computed: {}
    }
</script>

<style lang="less" rel="stylesheet/less">
    .page_consume{
        .consume{
            .tranlist{
                list-style: none;
                .list{
                    font-size: .6rem;
                    color: #666666;
                    border-bottom: 1px solid #D2D2D2;
                    width: auto;
                    height: auto;
                    padding: .9rem 0 1rem 1rem;
                    position: relative;
                    .list-number{
                        font-size: .75rem;
                        color: #333333 !important;
                    }
                    .list-mar{
                        margin:.35rem auto .4rem auto;
                    }
                    .list-money{
                        position: absolute;
                        right: 1rem;
                        bottom: 2rem;
                        font-size: 1rem;
                        color: #333333;
                    }
                    .red{
                        color:#F67982;
                    }
                }
            }
        }
    }
</style>