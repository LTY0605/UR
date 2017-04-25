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
//                let wxOpenId = this.getParams("wxOpenId");
                let wxOpenId = 'o4r_GjkqReCgX_u9KFWL6oEIzbOU';
                window.localStorage.setItem("wxOpenId", wxOpenId);
            },
            getParams(paras) {
                let url = decodeURI(location.href);
                // let url = "http://yuantai.yt-hr.com/school/weixin/front?code=yuantai&menu=readIndex&JSESSIONID=D095CE34FFEAAAD376A6B5786E821199#!/";
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
