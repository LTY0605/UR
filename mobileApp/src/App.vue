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
    import {TestLoginService} from  './services/index'
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
//            TestLoginService().get().then(() => {
//
//            })
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
