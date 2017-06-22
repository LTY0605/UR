<template>
    <div class="page_giftC">
        <dropDown title="礼品卡" :titleTab="0"></dropDown>
        <div class="massegel1List">
            <template v-for="item in cardList">
                <div class="gift1" v-if="item.cardName!='京东存值卡'">
                    <div class="list">
                        <p class="Type">{{item.cardName}}</p>
                        <p class="Id">{{item.cardcode}}</p>
                        <p class="money">余额：{{item.remainAmount}}</p>
                    </div>
                    <div class="imgbox">
                        <p class="picture">
                            <img @click="payCard(item.cardTypeName,item.cardcode,item.password)" width="100%"
                                 src="../../assets/icon_money_code.png" alt="图片">
                        </p>
                    </div>
                    <div class="buttonBox">
                        <button @click="payCard(item.cardTypeName,item.cardcode,item.password)" class="Box1">扫码支付
                        </button>
                        <!--<router-link :to="{name:'carPassword',query:{tab:1}}">-->
                        <!--<button class="Box7">修改密码</button>-->
                        <!--</router-link>-->
                        <router-link
                            :to="{name:'transaction',query:{valueCardcode:item.valueCardcode,cardName:item.cardName}}">
                            <button class="Box3">交易记录</button>
                        </router-link>
                    </div>
                </div>
                <div class="gift2" v-if="item.cardName=='京东存值卡'">
                    <div class="list1">
                        <p class="Type">{{item.cardName}}</p>
                        <p class="Id">{{item.cardcode}}</p>
                        <p class="money">余额：{{item.remainAmount}}</p>
                    </div>
                    <div class="imgbox1">
                        <p class="picture1">
                            <img @click="payCard(item.cardName,item.cardcode,item.password)" width="100%"
                                 src="../../assets/icon_money_code.png" alt="图片">
                        </p>
                    </div>
                    <div class="buttonBox1">
                        <div class="btnUp">
                            <button @click="payCard(item.cardName,item.cardcode,item.password)" class="Box1">扫码支付
                            </button>
                            <router-link
                                :to="{name:'transfer',query:{JDcardcode:item.valueCardcode,remainAmount:item.remainAmount}}">
                                <button class="Box5">转赠</button>
                            </router-link>
                            <button @click="getAmout" class="Box6">获取转赠</button>
                        </div>
                        <div class="btnDown">
                            <router-link :to="{name:'carPassword',query:{valueCardcode:item.valueCardcode}}">
                                <button class="Box7">修改密码</button>
                            </router-link>
                            <router-link
                                :to="{name:'transaction',query:{valueCardcode:item.valueCardcode,cardName:item.cardName}}">
                                <button class="Box8">交易记录</button>
                            </router-link>
                        </div>
                    </div>
                </div>
            </template>
        </div>
        <div @click.stop="showNoScroll=false" v-if="showNoScroll" class="gift-mask"></div>
        <x-dialog v-model="showNoScroll" class="dialog-demo page_pay" :scroll="false">
            <div @click.stop="" class="payCode">
                <div class="tabTitle">
                    <span :class="{active:titleTab==index}" v-for="(item, index) in titleList"
                          @click="titleTab = index">{{item.name}}
                    </span>
                </div>
                <div class="tabContain">
                    <div class="tabItem tab-swiper" v-show="titleTab==0">
                        <div>
                            <div class="scanPay">
                                <p class="scanPay-title">{{currentName}}</p>
                                <div class="pay-box">
                                    <img class="scanPay-img1" :src="barcodeUrl+'?text='+currentCode" alt="图片"/>
                                </div>
                                <p class="scanPay-number">{{currentCode}}</p>
                                <div class="pay-box">
                                    <img class="scanPay-img2" :src="barcodeUrl+'?text='+currentPSW" alt="图片"/>
                                </div>
                                <!--<p class="scanPay-massege">如不能扫描请刮开密码</p>-->
                                <!--<div id="scratch">-->
                                <!--<div id="card">{{currentPSW}}</div>-->
                                <!--</div>-->
                                <p class="pay-text">
                                    <a href="javascript:void(0)" @click="showNoScroll=false">返 回</a>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="tabItem" v-show="titleTab==1">
                        <img class="pay-img" :src="qRcodeUrl+'?text='+currentCode+'&width=150&height=150'" alt="图片"/>
                        <p class="payImgCode">{{currentCode}}</p>
                        <p class="pay-text">
                            <a href="javascript:void(0)" @click="showNoScroll=false">返 回</a>
                        </p>
                    </div>
                </div>
            </div>
        </x-dialog>
        <div @click="showNoScroll2=false" class="page_tran">
            <div @click="hide2">
                <x-dialog v-model="showNoScroll2" class="dialog-demo" :scroll="false">
                    <div @click.stop class="giftCode">
                        <!--<div class="giftCode-img"></div>-->
                        <!--<p class="giftCode-text">暂无转赠信息</p>-->
                        <p>您获取的转赠为{{amount}}元</p>
                        <div @click="hide2" class="giftCode-close"></div>
                    </div>
                </x-dialog>
            </div>
        </div>
        <toast v-model="showNoScro" type="text" :time="1000">{{warnText}}</toast>
    </div>
</template>

<script>
    import dropDown from './dropDown.vue'
    import {XHeader, Scroller, XDialog, Toast} from 'vux'
    import LuckyCard from "../../tools/luckyCar/lucky-card.min";
    import {jdCardInfoService, cardListService, getAmountService} from '../../services/wallet.js'
    import {URL_getQRCode, URL_getBarcode} from '../../services/index.js'
    export default{
        components: {
            XHeader, Scroller, XDialog, Toast, dropDown
        },
        data(){
            return {
                jdCard: [],
                cardList: [],
                showNoScro: false,
                warnText: '',
                showNoScroll: false,
                showNoScroll2: false,
                titleTab: 0,
                list2: ['扫扫支付', '付款码'],
                index: 1,
                time: '',
                titleList: [
                    {
                        code: 0,
                        name: '扫扫支付'
                    },
                    {
                        code: 1,
                        name: '付款码'
                    },

                ],
                currentPSW: '',
                currentCode: '',
                currentName: '',
                qRcodeUrl: '',
                barcodeUrl: '',
                valueCardcode: '',
                amount: '',
            }
        },
        mounted(){
        },
        created(){
            this.renderCardList();
            this.qRcodeUrl = URL_getQRCode;
            this.barcodeUrl = URL_getBarcode;
        },
        methods: {
            /* renderCode(valueCardcode){
             this.$router.push({
             name: 'carPassword',
             query: {valueCardcode:valueCardcode},
             })
             },*/
            renderCardList(){
                cardListService().save({
//                   cardcode:'8urp0000118',
                    cardcode: window.localStorage.getItem("cardcode"),
                }).then(res => {
                    let body = res.body;
                    // console.log(body.list[0])
                    if (body.errcode == 0) {
                        this.cardList = body.list;

                    } else {
                        this.showNoScro = true;
                        this.warnText = body.errmsg;
                    }
                }, res => {
                    this.showNoScro = true;
                    this.warnText = "网络超时，请重试";
                })
            },
            getAmout(){
                this.showNoScroll2 = true;
                getAmountService().get({
                    cardcode: window.localStorage.getItem("cardcode"),
                    mobilTel: window.localStorage.getItem("mobileTel")
                }).then(res => {
                    let body = res.body;
                    if (body.errcode == 0) {
                        this.amount = body.amount;
                    } else {
                        this.showNoScro = true;
                        this.warnText = body.errmsg;
                    }
                }, res => {
                    this.showNoScro = true;
                    this.warnText = "网络超时，请重试";
                })
            },
            renderjdCard(){
                jdCardInfoService().save({
                    cardcode: '8urp0000118',
                }).then(res => {
                    let body = res.body;
                    if (body.errcode == 0) {
                        this.jdCard = body;
                    } else {
                        this.showNoScro = true;
                        this.warnText = body.errmsg;
                    }
                }, res => {
                    this.showNoScro = true;
                    this.warnText = "网络超时，请重试";
                })
            },
            payCard(name, code, passWord){
                this.currentName = name;
                this.currentCode = code;
                this.currentPSW = passWord;
                this.showNoScroll = true;
                setTimeout(function () {
                    LuckyCard.case({
                        ratio: .7,
                    }, function () {
                        this.clearCover();
                    });
                }, 300)
            },
            show() {
                this.showNoScroll2 = true;
            },
            hide2() {
                this.showNoScroll2 = false;
            },
        },
        computed: {}
    }

</script>
<style lang="less" rel="stylesheet/less">
    @import "../../tools/luckyCar/lucky-card.css";

    .page_giftC {
        #scratch {
            width: 65%;
            height: 2.2rem;
            font-size: .7rem;
            /* line-height: 2.2rem; */
            margin: .5rem auto;
            #card {
                width: 100%;
                height: 2.2rem;
                line-height: 2.2rem;
                font-size: .7rem;
                text-align: center;
                background: #FAFAFA;
            }
            #cover {
                width: 100%;
                height: 100%;
            }
        }
        .page_tran {
            .weui-dialog {
                width: 12.5rem !important;
                max-width: none !important;
            }
            .giftCode {
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 12.5rem;
                height: auto;
                position: relative;
                padding: 2.2rem;
                background: white;
                .giftCode-img {
                    width: 3rem;
                    height: 3rem;
                    background: url("../../assets/warn.png");
                    background-size: 100% 100%;
                }
                .giftCode-text {
                    font-size: .9rem;
                    margin-top: 1rem;
                    color: #ec6941;
                }
                P {
                    font-size: .85rem;
                }
                .giftCode-close {
                    position: absolute;
                    width: .8rem;
                    height: .8rem;
                    background: url("../../assets/money_code3.png");
                    background-size: cover;
                    top: .6rem;
                    right: .6rem;
                }
            }
        }
        .gift1 {
            margin: 1.2rem 1rem;
            padding: .65rem 1rem;
            height: auto;
            font-family: PingFang-SC-Medium;
            font-size: .8rem;
            color: #ffffff;
            background-image: url("../../assets/giftBack1.png");
            background-repeat: no-repeat;
            background-size: 100% 100%;
            position: relative;
        }
        .massege1 {
            display: inline-block;
            margin-bottom: .5rem;
        }
        .list {
            list-style: none;
            font-family: PingFang-SC-Medium;
        }
        .Type {
            font-size: .9rem;
        }
        .Id {
            padding: .375rem 0rem;
        }
        .money {
            font-size: .9rem;
        }
        .picture {
            width: 1.3rem;
            height: 1.3rem;
            right: 1rem;
            top: 2.7rem;
            position: absolute;
        }
        .buttonBox {
            font-size: 0;
            /*display: flex;*/
            /*justify-content: space-between;*/
            margin: auto 0;
            height: auto;
            padding-top: .55rem;
        }
        .Box1, .Box2, .Box3 {
            font-size: .75rem;
            background-color: #CDBE86;
            color: #473A0C;
            margin: 0rem;
            padding: 0rem;
            width: 27.7%;
            height: 1.6rem;
            margin-right: 8.45%;
        }
        .Box3 {
            font-size: .75rem;
            margin-right: 0;
            padding: 0rem;
        }
        .page_pay {
            display: flex;
            justify-content: center;
            .weui-dialog {
                width: auto;
                max-width: none;
            }
            .weui-mask {
                display: none;
            }
        }
        .payCode {
            width: 12.55rem;
            height: auto;
            font-family: PingFang-SC-Medium;
            margin: 0;
            padding: 0;
        }
        .pay-text {
            text-align: center;
            font-size: .6rem;
            margin: .9rem 0;
            a {
                list-style: none;
                color: #F68B79;
                text-decoration: underline;
            }
        }

        .tabTitle {
            width: 100%;
            height: auto;
            font-size: 0;
            position: relative;
            span {
                font-size: .75rem;
                display: inline-block;
                width: 50%;
                background: rgb(242, 237, 218);
                color: #000000;
                border-left: 1px solid #CDBE86;
                height: 2.5rem;
                line-height: 2rem;
                text-align: center;
                padding-top: .25rem;
            }
            span.active {
                background: #CDBE86;
                position: relative;
            }
            span.active:after {
                content: '';
                border-style: solid;
                border-width: .35rem;
                border-color: transparent transparent #fff transparent;
                position: absolute;
                bottom: -1px;
                left: 48%;
                margin-left: -0.175rem;
                display: block;
            }
            .close {
                border-left: 0;
                width: .8rem;
                height: .8rem;
                background: url("../../assets/money_code3.png");
                background-size: 100%;
                top: 0.3rem;
                right: 0.3rem;
                position: absolute;
            }
        }
        .pay-img {
            width: 7.5rem;
            height: 7.5rem;
            margin: .75rem 2.5rem 0rem ;
        }
        .payImgCode{
            margin-top: -1rem;
            font-size: .75rem;
        }
        .scanPay {
            width: 12.5rem;
            height: auto;
            position: relative;
            background: white;
            font-size: 0;
            .scanPay-title {
                font-size: .7rem;
                text-align: center;
                color: #000000;
                margin: .5rem auto;
                width: 80%;
            }
            .pay-box {
                display: flex;
                justify-content: center;
            }
            .scanPay-massege {
                width: auto;
                font-size: .6rem;
                text-align: center;
                color: #FF0018;
            }
            .scanPay-img1, .scanPay-img2 {
                width: 7.85rem;
                height: 2.6rem;
            }
            .scanPay-img2 {
                margin: .6rem auto;
            }
            .scanPay-number {
                text-align: center;
                font-size: .6rem;
                padding: .2rem 0rem .5rem;
                border-bottom: 1px solid #CDBE86;
            }
            .scanPay-close {
                position: absolute;
                width: .8rem;
                height: .8rem;
                background-size: 100%;
                top: -.15rem;
                right: .6rem;
            }
        }
        .gift2 {
            margin: 1.2rem 1rem;
            padding: .7rem 1rem;
            /*width: 16.8rem;*/
            height: auto;
            font-family: PingFang-SC-Medium;
            font-size: .8rem;
            color: #ffffff;
            background-image: url("../../assets/giftBack2.png");
            background-repeat: no-repeat;
            background-size: 100% 100%;
            position: relative;
        }
        .list1 {
            list-style: none;
        }
        .Type {
            font-size: .9rem;
        }
        .number {
            padding: .375rem 0rem;
        }
        .money {
            font-size: .9rem;
        }
        .picture1 {
            width: 1.3rem;
            height: 1.3rem;
            right: 1rem;
            top: 2.8rem;
            position: absolute;
        }
        .buttonBox1 {
            height: auto;
            margin: auto 0;
        }
        .Box4, .Box5, .Box7, .Box8 {
            font-size: .75rem;
            background-color: #CDBE86;
            color: #473A0C;
            margin: 0rem;
            padding: 0rem;
            width: 27.7%;
            height: 1.6rem;
            margin-right: 8.45%;
        }
        .Box6 {
            font-size: .75rem;
            background-color: #CDBE86;
            color: #473A0C;
            margin: 0rem;
            width: 27.7%;
            margin-right: 0;
            padding: 0rem;
        }
        .btnUp {
            margin: .5rem 0;
            font-size: 0;
        }
        .btnDown {
            font-size: 0;
        }
        .gift-mask {
            position: fixed;
            z-index: 1000;
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.6);
        }
    }


</style>
