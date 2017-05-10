<template>
    <div>
        <keep-alive>
            <transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
                <router-view class="router-view" v-wechat-title="$route.meta.title"></router-view>
            </transition>
        </keep-alive>
        <!--<div v-transfer-dom>-->
        <loading v-model="isLoading" text="加载中..."></loading>
        <!--</div>-->
    </div>
</template>

<script>
    import {
        ButtonTab,
        ButtonTabItem,
        ViewBox,
        XHeader,
        Tabbar,
        TabbarItem,
        Loading,
        TransferDomDirective as TransferDom
    } from 'vux'
    import {
        memberInfoService
    } from './services/person.js'
    import {mapState, mapActions} from 'vuex'
    import {openService} from  './services/index'
    export default {
        components: {Loading},
        mounted(){
        },
        watch: {},
        data(){
            return {
                loginText: '加载中...',
            }
        },
        created(){
            this.renderOpen();
        },
        methods: {
            renderOpen(){
                let wxOpenId = this.getParams("wxOpenId");
                //let wxOpenId = 'odaBLwEfMOFDB5ATyqZwQco5Aaxo';
//                let wxOpenId = 'o4r_GjkqReCgX_u9KFWL6oEIzbOU';
                if (wxOpenId && wxOpenId != '') {
                    window.localStorage.setItem("wxOpenId", wxOpenId);
                }
                //如果缓存中没有mobileTel，就重新登录
                if (window.localStorage.getItem("mobileTel") == "") {
                    this.$router.push({
                        name: 'login',
                    });
                } else {
                    this.putLocal();
                }
            },
            putLocal(){
                memberInfoService().get({
                    wxOpenID: window.localStorage.getItem("wxOpenId"),
                    mobileTel: window.localStorage.getItem("mobileTel")
                }).then(res => {
                    let body = res.body;
                    if (body.errcode == 0) {
                        window.localStorage.setItem("cardcode", body.cardcode);
                        window.localStorage.setItem("sex", body.sex);
                        window.localStorage.setItem("provice", body.provice);
                        window.localStorage.setItem("brithday", body.brithday);
                        window.localStorage.setItem("customerName", body.customerName);
                        window.localStorage.setItem("district", body.district);
                        window.localStorage.setItem("city", body.city);
                        window.localStorage.setItem("mobileTel", body.mobileTel);
                        window.localStorage.setItem("headimgurl", body.headimgurl);
                    } else {
//                        this.$router.push({
//                            name: 'login',
//                        });
                    }
                }, res => {
//                    this.$router.push({
//                        name: 'login',
//                    });
                })
            },
            getParams(paras) {
                let url = decodeURI(location.href);
//                let url = 'http://nianhui.ur.com.cn/front/#/personMain?wxOpenId=odaBLwEfMOFDB5ATyqZwQco5Aaxo';
                let paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
                let returnValue;
                for (let i = 0; i < paraString.length; i++) {
                    let tempParas = paraString[i].split('=')[0];
                    let parasValue = paraString[i].split('=')[1];
                    if (tempParas === paras)
                        returnValue = parasValue;
                }
                if (typeof(returnValue) == "undefined") {
                    return "";
                } else {
                    return returnValue;
                }
            },
        },
        computed: {
            ...mapState({
                route: state => state.route,
                path: state => state.route.path,
                deviceready: state => state.app.deviceready,
                demoTop: state => state.vux.demoScrollTop,
                isLoading: state => state.vux.isLoading,
                direction: state => state.vux.direction,
            }),
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    @import "./assets/css/loading";
    @import "./assets/css/1px";
    @import "./assets/css/vue-router-transition.css";
    @import "./assets/css/common.css";
</style>
