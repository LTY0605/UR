<template>
    <div class="page_transfer">
        <x-header :left-options="{backText: ''}">转 赠</x-header>
        <!--页面主体-->
        <div class="transferCon">
            <p class="tran-money">余额：￥{{remainAmount}}</p>
            <group>
                <x-input v-model="phone" keyboard="number" is-type="china-mobile" :max="11" :min="11" placeholder="转赠人手机" required></x-input>
            </group>
            <group>
                <x-input v-model="money" :is-type="isMoney" placeholder="转赠金额" required></x-input>
            </group>
            <p class="tran-remind"><span>*</span> 转赠金额需大于50</p>
            <div @click="onSumbit">
                <x-button><span class="btn-text">提 交</span></x-button>
            </div>
        </div>
        <!--遮罩和密码框-->
        <div @click="hide">
            <x-dialog v-model="showNoScroll"  class="dialog-demo" :scroll="false">
                <div @click.stop class="transferCode">
                    <p class="transferCode-title">请输入密码</p>
                    <x-input type="password" v-model="password" class="transferCode-input" required></x-input>
                    <!--<p v-if="warnShow" class="warn-text">密码错误</p>-->
                    <div @click="enter"><x-button><span class="transferCode-text">确 定</span></x-button></div>
                </div>
            </x-dialog>
        </div>
        <!--提示-->
        <toast v-model="show2" type="text" :time="1000">{{warnText}}</toast>
        <!--<alert class="prompt" v-model="show2" title="温馨提示">{{warnText}}</alert>-->
    </div>
</template>

<script>
    import {XHeader,Group,XInput,XButton,XDialog,Alert,Toast} from 'vux'
    import { giftAmountService } from '../services/transRecord.js'
    export default{
        components:{
            XHeader,Group,XInput,XButton,XDialog,Alert,Toast
        },
        data(){
            return{
                show2:false,
                showNoScroll:false,
                warnShow:false,
                JDcardcode:this.$route.query.JDcardcode,
                remainAmount:this.$route.query.remainAmount,  //余额
                phone:'',  //转赠人手机
                money:'',  //金额
                password:'',  //密码
                jdpassword:'',
                warnText:'',  //错误提示文字
                isNumber:function (value) {
                    return{
                        valid: /^(?=\d{11}$)^1(?:3\d|4[57]|5[^4\D]|7[^249\D]|8\d)\d{8}$/.test(value),
                        msg: '必须是数字'
                    }
                },
                isMoney:function (value) {
                    return{
                        valid: /^[1-9][0-9]*$/.test(value)&&value>=50,  //转赠金额大于50
                        msg: '请输入正常的金额'
                    }
                }
            }
        },
        mounted(){
        },
        watch: {
        },
        created(){
        },
        methods:{
            onSumbit() {
                if(this.phone == '' || this.money == ''){
                    this.show2 = true;
                    this.warnText='你有信息未填写';
                }
                else if(!this.isNumber(this.phone).valid){
                    this.show2 = true;
                    this.warnText = '手机格式有误';
                }
                else if(!this.isMoney(this.money).valid){
                    this.show2 = true;
                    this.warnText = '金钱输入格式有误';
                }
                else if(this.remainAmount < this.money){
                    this.show2 = true;
                    this.warnText = '余额不足';
                }
                else if(this.money < 50){
                    this.show2 = true;
                    this.warnText = '转赠金额不能小于50'
                } else{
                    this.showNoScroll=true;
                    return
                }
            },
            hide() {
                this.showNoScroll = false;
            },
            enter() {
                if(this.password == ''){
                    this.show2 = true;
                    this.warnText = '请输入密码'
                } else{
                    giftAmountService().save({
                        JDcardcode:this.JDcardcode,
                        cardcode: window.localStorage.getItem("cardcode"),
                        wxOpenID: window.localStorage.getItem("wxOpenId"),
                        sendeeMobile:this.phone,
                        amount:this.money,
                        password:this.password
                    }).then(res => {
                        let body = res.body;
                        if(body.errcode==0){
//                            this.jdpassword = body.password;
                        }else{
                            this.show2 = true;
                            this.warnText = body.errmsg;
                            return
                        }
                    },res =>{
                        this.show2 = true;
                        this.warnText = '网络超时，请重试';
                    })

                    console.log(this.jdpassword,'======================')
                    this.warnShow = false;
                    this.showNoScroll = false;
                    this.show2 = true;
                    this.warnText = '转赠成功'
                }
            }
        },
        computed: {}
    }
</script>

<style lang="less" rel="stylesheet">
    .page_transfer{
        .vux-header {
            background-color: #AB9236 !important;
        }
        .vux-header .vux-header-title, .vux-header h1 {
            font-size: .85rem;
        }
        .left-arrow:before{
            border-color: #FFFFFF !important;
        }
        .weui-dialog{
            width: auto !important;
            max-width: none !important;
            top: 43% !important;
        }
        .prompt{
            .weui-dialog{
                width: 80% !important;
            }
        }
        .transferCon{
            padding: 1rem 1.75rem 0 1.75rem;
            .weui-cells{
                border: 1px solid #D2D2D2;
                border-radius: 4px;
                line-height: .75rem;
                font-size: .75rem;
                margin-top: .65rem;
            }
            .weui-cell{
                padding: .65rem;
            }
            .weui-input{
                height: .85rem;
                line-height: .85rem;
                font-size: .75rem;
            }
            .weui-cells:before{
                border: none;
            }
            .weui-cells:after{
                border: none;
            }
            .weui-btn:after{
                border: none;
                height: 2rem;
            }
            .weui-btn_default{
                background: #AB9236;
            }
            .vux-x-input .vux-input-icon{
                font-size: .7rem;
            }
            .vux-input-icon.weui-icon-warn:before, .vux-input-icon.weui-icon-success:before{
                font-size: .7rem !important;
            }
            .weui-cell_warn{
                color: #000000 !important;
            }
            .tran-money{
                color: #333333;
                font-size: .75rem;
                margin-left: .5rem;
            }
            .tran-remind{
                margin-top: .15rem;
                margin-bottom: 1.1rem;
                margin-left: -.6rem;
                font-size: .5rem;
                transform:scale(0.875);
                color: #F67982;
                span{
                    display: inline-block;
                    vertical-align: middle;
                }
            }
            .btn-text{
                font-size: .75rem;
                color: #FFFFFF;
            }
        }
        .transferCode{
            width: 12.5rem;
            height: auto;
            padding: 1rem;
            position: relative;
            background: white;
            .weui-cell{
                border: 1px solid #D2D2D2;
                border-radius: 4px;
                height: 2rem;
            }
            .weui-cell:before{
                border-top: none ;
            }
            .weui-cell:after{
                border: none ;
            }
            .weui-input{
                font-size: .75rem;
                height: 2rem;
                line-height: 2rem;
            }
            [class^="weui-icon-"]:before{
                margin-bottom: .3rem;
            }
            .weui-btn:after{
                border: none;
                height: 2rem;
            }
            .weui-btn_default{
                margin-top: 1rem;
                background: #AB9236;
                height: 2rem;
            }
            .transferCode-title{
                font-size: .75rem;
                color: #AB9236;
                margin-bottom: 1.5rem;
            }
            .transferCode-text{
                font-size: .75rem;
                color: #FFFFFF;
                display: block;
            }
            .transferCode-input{
                .weui-icon-warn:before{
                    font-size: .75rem;
                }
                [class^="weui-icon-"]:before, [class*=" weui-icon-"]:before{
                    margin-bottom: .3rem;
                }
            }
            .warn-text{
                font-size: .6rem;
                transform: scale(.8);
                color: #F67982;
                position: absolute;
            }
        }
    }
</style>
