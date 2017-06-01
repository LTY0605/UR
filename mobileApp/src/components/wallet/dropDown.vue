<template>
    <div class="page_down">
        <x-header :left-options="{backText: ''}">我的钱包</x-header>
        <div class="tabDown">
            <cell :class="arrow" is-link :border-intent="false" :arrow-direction="show ? 'up' : 'down'"
                  @click.native="tabShow">
                <p>{{title}}</p>
            </cell>

            <div class="slide" :class="show?'animate':''">
                <div class="slide-div">
                    <span :class="{active:titleTab==index}"
                          v-for="(item, index) in titleList"
                          @click="tabChange(index)">
                        <!--<router-link :to="titleList[titleTab].type">-->
                        {{item.name}}
                        <!--</router-link>-->
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {XHeader, Cell} from 'vux'
    export default{
        components:{
            Cell, XHeader
        },
        props:{
            title:String,
            titleTab:Number
        },
        data () {
            return {
                arrow:{
                    downhead:true,
                    uphead:false
                },
                show: false,
                index: 0,
                downTab:'',
                titleList: [
                    {
                        code: 0,
                        name: '礼品卡',
                        type: 'giftCoupon'
                    },
                    {
                        code: 1,
                        name: '优惠券',
                        type: 'coupon'
                    },
                    {
                        code: 2,
                        name: '积分',
                        type: 'integral'
                    }
                ],

            }
        },
        mounted(){
        },
        watch: {},
        created(){
           /* if (this.$route.query.tab) {
                this.titleTab = this.$route.query.tab;
            }*/
        },
        methods:{
            tabChange(index){
                this.downTab = index;
                this.$router.push({
                    name:this.titleList[this.downTab].type,
//                    query:{tab: index},
                })
                this.show=false;
            },
            tabShow(){
                this.show = !this.show;
                this.arrow.downhead = !this.arrow.downhead;
                this.arrow.uphead = !this.arrow.uphead
            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    .page_down{
        .vux-header {
            background-color: #AB9236 !important;
        }
        .vux-header .vux-header-title, .vux-header h1 {
            font-size: .85rem;
        }
        .tabDown{
            .vux-label{
                text-align: center;
            }
            .weui-cell{
                padding: 10px 15px !important;
            }
            .weui-cell__ft{
                padding: 0 !important;
                width: 100%;
                text-align: center;
                p{
                    font-size: .75rem !important;
                    color: #ab9236 !important;
                }
                .weui-cell__ft:after{
                    border-color: #ab9236;
                    -webkit-transform:matrix(0.71 ,0.71, 0.71, -0.71, 0, 0);
                    transform:matrix(0.71 ,0.71, 0.71, -0.71, 0, 0);
                    margin-top: -6px;
                }
            }
            .downhead{
                background: #f2edda;
                z-index: 222;
                position: relative;
            }
            .downhead:after{
                content: " ";
                display: inline-block;
                height: 6px;
                width: 6px;
                border-width: 2px 2px 0 0;
                border-color: #ab9236;
                border-style: solid;
                transform: matrix(0.71, 0.71,  0.71,-0.71, 0, 0);
                position: absolute;
                top: 50%;
                margin-top: -.3rem;
                right: .75rem;
            }
            .uphead{
                background: #f2edda;
                z-index: 222;
                position: relative;
            }
            .uphead:after{
                content: " ";
                display: inline-block;
                height: 6px;
                width: 6px;
                border-width: 2px 2px 0 0;
                border-color: #ab9236;
                border-style: solid;
                transform: matrix(0.71, 0.71,  0.71,-0.71, 0, 0);
                transform: rotate(-45deg);
                position: absolute;
                top: 50%;
                margin-top: -.1rem;
                right: .75rem;
            }
            .weui-cell_access .weui-cell__ft:after{
                border-style: none !important;
            }
            .slide {
                padding: 0 1rem;
                width: 100%;
                overflow: hidden;
                max-height: 0;
                position: absolute;
                z-index: 1000;
                background: #FFFFFF;
                transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
                .slide-div{
                    padding-top: 1rem;
                    padding-bottom: .5rem;
                    font-size: 0;
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    justify-content: space-between;
                    span{
                        display: inline-block;
                        width: 4.2rem;
                        height: 1.6rem;
                        line-height: 1.5rem;
                        text-align: center;
                        border-radius: .15rem;
                        font-size: .75rem;
                        margin: 0 0 .5rem 0;
                        border: 1px solid #CDBE86;
                        background: #FFFFFF;
                        color: #999999;
                        /* a{
                             color: #999999;
                             width: 100%;
                             height: 100%;
                             display: inline-block;
                         }*/
                    }
                    span.active {
                        background: #CDBE86;
                        color:#fff;
                    }
                }
            }
            .animate {
                max-height: 9999px;
                transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
                transition-delay: 0s;
            }
        }
    }
</style>
