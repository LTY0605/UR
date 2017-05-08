<template>
    <div class="page_sample">
        <div class="detail">
            <no-data v-show="dataList.length==0"></no-data>
            <ul class="samplelist" v-show="dataList.length!=0">
                <li class="list" v-for="item in dataList">
                    <p>单号：<span class="list-number">{{item.integralBillNO}}</span></p>
                    <p class="list-mar">类型：{{item.integralTypeName}}</p>
                    <p>日期：{{item.integralDate}}</p>
                    <template v-if="item.integralType == 2 || item.integralType == 1 || item.integralType == 5 || item.integralType == 8">
                    <p class="list-money red">+{{item.integral}}</p>
                    </template>
                    <template v-else>
                        <p class="list-money">{{item.integral}}</p>
                    </template>
                </li>
            </ul>
        </div>
    </div>
    </div>

</template>

<script>
    import noData from '../common/noData.vue'
    export default {
        components: {noData},
        props: {
            dataList:Array,
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
    .page_sample {
        .detail {
            .samplelist {
                list-style: none;
                .list {
                    font-size: .6rem;
                    color: #666666;
                    border-bottom: 1px solid #D2D2D2;
                    width: auto;
                    height: auto;
                    padding: .9rem 0 1rem 1rem;
                    position: relative;
                    .list-number {
                        font-size: .75rem;
                        color: #333333 !important;
                    }
                    .list-mar {
                        margin: .35rem auto .4rem auto;
                    }
                    .list-money {
                        position: absolute;
                        right: 1rem;
                        bottom: 2rem;
                        font-size: 1rem;
                        color: #333333;
                    }
                    .red {
                        color: #F67982;
                    }
                }
            }
        }
    }
</style>
