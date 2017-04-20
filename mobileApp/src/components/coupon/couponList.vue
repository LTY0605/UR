<template>
    <div class="page_couponList">
        <div class="couponCon" v-for="(coupon,index) in couponList">
            <div class="couList">
                <div class="couList-img">
                    <p>
                        <span style="display: inline-block;font-size:.55rem;width: .2rem">￥</span>
                        <span style="font-size: 1.4rem;font-weight: 600">{{coupon.money}}</span>
                    </p>
                    <span>{{coupon.type}}</span>
                    <img width="100%" src="../../assets/money_back.png" alt=""/>
                </div>
                <div class="couList-text">
                    <p style="margin:0;font-size: .75rem;color: #333333">券号：{{coupon.number}}</p>
                    <p class="cou-type">{{coupon.shop}}</p>
                    <p style="margin:0;font-size: .6rem;color: #999999">有效期：{{coupon.startTime}}～{{coupon.endTime}}</p>
                    <a>礼券说明></a>
                </div>
                <div class="couList-code">
                    <img src="../../assets/money_code2.png" alt=""/>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {XHeader, Scroller,XInput, Group,Selector,Calendar,Cell} from 'vux'
    export default {
        components: {
            XHeader, Scroller,XInput, Group,Selector,Calendar,Cell
        },
        data () {
            return {
                couponList: [
                    {
                        money: '50', type: '生日礼券', number: '8999305128', shop:'线下门店',
                        startTime:'2017.04.12',endTime:'2017.04.30'
                    },
                    {
                        money: '30', type: '购物礼券', number: '8229305128', shop:'线上网店',
                        startTime:'2017.04.12',endTime:'2017.04.30'
                    },
                    {
                        money: '50', type: '生日礼券', number: '8999305128', shop:'线下门店',
                        startTime:'2017.04.12',endTime:'2017.04.30'
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
    .page_couponList {
    .couponCon {
        width: 100%;
        height: auto;
        margin: 0 auto;
        border-bottom: .35rem solid #E5E5E5;
    .couList {
        display: flex;
        width: 89.6%;
        margin: 0 auto 0 auto;
        position: relative;
    }
    .couList-img {
        width: 3.8rem;
        height: 4.56rem;
        margin: .62rem 0 .62rem 0;
        position: relative;
    }
    .couList-img > p {
        position: absolute;
        top: .9rem;
        left: .75rem;
        color: #C5B166;
        padding: 0;
        margin: 0;
    }
    .couList-img > span {
        position: absolute;
        display: block;
        font-size: .45rem;
        bottom: 1.35rem;
        left: .77rem;
        color: #C5B166
    }
    .couList-text {
        margin-left: .6rem;
        margin-top: .75rem;
        height: 4rem;
        width: auto;
    }
    .couList-text > a {
        color: #F68B79;
        font-size: .6rem;
        display: block;
        margin-top: .15rem;
        position: relative;
    }
    .couList-text > a:before {
        content: '';
        position: absolute;
        height: 1px;
        width: 2.8rem;
        background: #F68B79;
        bottom: -1px;
    }
    .cou-type {
        margin: .2rem 0 .2rem 0;
        width: 2.9rem;
        height: .95rem;
        color: #FFFFFF;
        font-size: .6rem;
        line-height: .95rem;
        text-align: center;
        background: #F68B79;
    }
    .couList-code {
        width: 1.5rem;
        height: 1.5rem;
        position: absolute;
        bottom: 2.5rem;
        right: 0;
    }
    .couList-code > img {
        width: 100%;
    }
    }
    }
</style>