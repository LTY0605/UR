<template>
    <div class="page_couponList">
        <!--扫码和遮罩-->
        <transition name="mask-animative">
            <div v-if="show" @click="show=!show" class="integral-mask">
                <div id="couponMask" @click="stopPropagation" class="integral-code">
                    <div class="code-text">付款时交给店员扫一扫</div>
                    <img class="code-img" src="../../assets/money_code.png" alt=""/>
                    <p class="code-p">8999305228</p>
                </div>
            </div>
        </transition>
        <!--优惠券-->
        <div class="couponCon" v-for="(coupon,index) in couponList">
            <div class="couList">
                <div class="couList-img">
                    <p class="couList-imgText">
                        <span class="imgText-symbol">￥</span>
                        <span class="imgText-money">{{coupon.money}}</span>
                    </p>
                    <p class="couList-imgType">{{coupon.type}}</p>
                </div>
                <div class="couList-text">
                    <p style="margin:0;font-size: .75rem;color: #333333">券号：{{coupon.number}}</p>
                    <p class="cou-type">{{coupon.shop}}</p>
                    <p style="margin:0;font-size: .6rem;color: #999999">有效期：{{coupon.startTime}}～{{coupon.endTime}}</p>
                    <router-link to="myCoupon">
                        <span class="couponExplain">礼券说明></span>
                    </router-link>
                </div>
                <div @click="show=!show" class="couList-code"></div>
            </div>
    </div>
    </div>
</template>
<script>
    import {XHeader, Scroller} from 'vux'
    export default {
        components: {
            XHeader, Scroller
        },
        data () {
            return {
                show:false,
                couponList: [
                    {
                        money: '50', type: '生日礼券', number: '8999305128', shop:'线下门店',
                        startTime:'2017.04.12',endTime:'2017.04.30'
                    },
                    {
                        money: '130', type: '购物礼券', number: '8229305128', shop:'线上网店',
                        startTime:'2017.04.12',endTime:'2017.04.30'
                    },
                    {
                        money: '50', type: '生日礼券', number: '8999305128', shop:'线下门店',
                        startTime:'2017.04.12',endTime:'2017.04.30'
                    }
                ]
            }
        },
        methods:{
            stopPropagation:function (e) {
                e = e||window.event;
                if(e.stopPropagation){
                    e.stopPropagation();
                }else{
                    e.cancelBubble = true;
                }
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
        .integral-mask{
            z-index: 999;
            position:absolute;
            top: 0;
            height: 100%;
            width: 100%;
            background: rgba(0,0,0,0.5);
        }
        .integral-code{
            margin: 8.25rem auto 0 auto;
            width: 12.55rem;
            height: 8.05rem;
            background: white;
            border-radius: 2px;
            display: flex;
            flex-direction: column;
        }
        .code-text{
            width: 11.05rem;
            height: 2.1rem;
            line-height: 2.1rem;
            text-align: center;
            font-size: .6rem;
            color: #FF0018;
            border-bottom: 1px solid rgb(205,190,134);
            box-sizing: border-box;
            margin: .75rem auto .75rem auto;
        }
        .code-img{
            width: 7.85rem;
            margin: 0 auto;
        }
        .code-p{
            font-size: .6rem;
            margin: .15rem auto 0 auto;
        }
        .mask-animative-enter-active, .mask-animative-leave-active{
            transition: all .3s ease;
        }
        .mask-animative-enter, .mask-animative-leave-active {
            opacity: 0;
        }
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
                background: url("../../assets/money_back.png");
                background-size: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
            }
            .couList-imgText {
                color: #C5B166;
                padding: 0;
                margin-top: -.3rem;
            }
            .imgText-symbol{
                display: inline-block;
                font-size:.55rem;
                width: .2rem;
            }
            .imgText-money{
                font-size: 1.25rem;
                font-weight: 600;
            }
            .couList-imgType {
                font-size: .45rem;
                color: #C5B166;
                margin-top: -.3rem;
                -webkit-text-size-adjust: none;
            }
            .couList-text {
                margin-left: .6rem;
                margin-top: .75rem;
                height: 4rem;
                width: auto;
            }
            .couponExplain {
                color: #F68B79;
                font-size: .6rem;
                display: block;
                margin-top: .15rem;
                position: relative;
            }
            .couponExplain:before {
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
                background: url("../../assets/money_code2.png");
                background-size: 100%;
            }
        }
    }
</style>