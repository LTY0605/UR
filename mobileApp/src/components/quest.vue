<template>
    <div class="page_quest">
        <x-header :left-options="{backText:''}">UR问卷调研</x-header>
        <div class="quest-con">
            <div class="con-logo"></div>
            <div class="con-text">
                <p>尊敬的{{customerName}}会员：</p>
                <p>UR致力于为您提供<br/>高品质的时尚产品和优质服务！<br>
                    为了提高您的购物体验，<br>请您提供宝贵的意见，<br>完成问卷即可获赠<span class="con-integral">300会员积分</span>，<br>谢谢！</p>
            </div>
            <span @click="goLinkQuest" class="con-btn">开始问卷</span>
        </div>
        <!--提示-->
        <toast v-model="showNoScroll2" type="text" :time="1000">{{warnText}}</toast>
    </div>
</template>

<script>
    import {surveyServices} from '../services/quest.js'
    import {XHeader, Toast} from 'vux'
    export default{
        components: {
            XHeader, Toast
        },
        data(){
            return {
                customerName: '',
                showNoScroll2: false,
                surveyType: '02',
                surveyCode: 'wqdc',
                warnText: ''
            }
        },
        methods: {
            questName(){
                this.customerName = window.localStorage.getItem('customerName');
            },
            goLinkQuest(){
                let _this = this;
                if (window.navigator.onLine == true) {
                    surveyServices().save({
                        cardcode: window.localStorage.getItem("cardcode"),
                        surveyType: this.surveyType,
                        surveyCode: this.surveyCode
                    }).then(res => {
                        let body = res.body;
                        if (body.errcode == 0) {
                            this.$router.push({name: 'questPage'})
                        } else if (body.errcode == 4001) {
                            this.showNoScroll2 = true;
                            this.warnText = body.errmsg
                            setTimeout(function () {
                                _this.$router.push({
                                    name: 'index'
                                })
                            }, 500)
                        } else {
                            this.showNoScroll2 = true;
                            this.warnText = '网络超时，请重试'
                        }
                    }, res => {
                        this.showNoScroll2 = true;
                        this.warnText = '网络超时，请重试'
                    })
                } else {
                    this.showNoScroll2 = true;
                    this.warnText = '网络超时，请重试'
                }
            }
        },
        mounted(){
            this.questName()
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    .page_quest {
        .vux-header {
            background-color: #AB9236 !important;
        }
        .vux-header .vux-header-title, .vux-header h1 {
            font-size: .85rem;
        }
        .quest-con {
            width: 100%;
            height: 100%;
            background: url("../assets/ask01.png");
            background-size: 100% 100%;
            position: fixed;
            .con-logo {
                position: absolute;
                top: .7rem;
                left: .8rem;
                width: 5.35rem;
                height: 3.9rem;
                background: url("../assets/ask03.png");
                background-size: 100% 100%;
            }
            .con-text {
                position: absolute;
                left: 6.15rem;
                top: 6.5rem;
                font-size: .75rem;
                p {
                    line-height: 1.17rem;
                }
            }
            .con-integral {
                color: #FFFFFF;
                background: #AB9236;
                margin-left: .2rem;
                display: inline-block;
                font-size: .7rem;
                width: 4.5rem;
                height: 1rem;
                line-height: 1rem;
                text-align: center;
            }
            .con-btn {
                display: inline-block;
                position: absolute;
                left: 9rem;
                top: 16rem;
                font-size: .75rem;
                width: 5.8rem;
                height: 1.8rem;
                color: #FFFFFF;
                line-height: 1.8rem;
                background: #AB9236;
                text-align: center;
                border-radius: .2rem;
            }
        }
    }
</style>
