<template>
    <div class="page_transfer">
        <div class="transfer">
            <ul class="tranlist">
                <li v-for="list in tranlists" class="list">
                    <p>单号：<span class="list-number">{{list.number}}</span></p>
                    <p class="list-mar">类型：{{list.type}}</p>
                    <p>日期：{{list.time}}</p>
                    <p class="list-money red">{{list.money}}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        components: {
        },
        data () {
            return {
                tranlists:[
                    {
                        number: 'OS201704120289',
                        type: '转赠',
                        time: '2017-04-12 15:30:28',
                        money: '+300.00'
                    },
                    {
                        number: 'OS201703021888',
                        type: '转赠',
                        time: '2017-03-02 09:38:21',
                        money: '+150.00'
                    },
                    {
                        number: 'OS201609113466',
                        type: '转赠',
                        time: '2016-09-11 11:25:15',
                        money: '+100.00'
                    }
                ]

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
    .page_transfer{
        .transfer{
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
                        font-weight: 100;
                    }
                    .red{
                        color: #F67982;
                    }
                }
            }
        }
    }
</style>