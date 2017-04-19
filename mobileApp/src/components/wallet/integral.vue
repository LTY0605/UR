<template>
    <div class="page_integral">
        <div class="integralTop">
            <div class="integralTop-img">
                <h1>18800</h1>
                <p>可用积分</p>
            </div>
            <span class="integralTop-text">积分规则</span>
        </div>
        <group class="integralList">
            <cell title="积分使用码">
                <img slot="icon" width="16" style="display:inline-block;margin-right:.25rem;margin-top: .2rem"
                     src="../../assets/icon_gift.png">
                <img slot="icon" width="15" style="position: absolute; right: 0;top:.75rem"
                     src="../../assets/icon_money_code.png"
                     alt=""/>
            </cell>
            <cell title="积分商城">
                <img slot="icon" width="16" style="display:inline-block;margin-right:.25rem;margin-top: .2rem"
                     src="../../assets/icon_home.png">
                <img slot="icon" width="7" style="position: absolute; right: 0;top:.75rem"
                     src="../../assets/icon_right_on.png"
                     alt=""/>
            </cell>
            <cell title="积分查询">
                <img slot="icon" width="16" style="display:inline-block;margin-right:.25rem;margin-top: .2rem"
                     src="../../assets/icon_search.png">
                <img slot="icon" width="7" style="position: absolute; right: 0;top:.75rem"
                     src="../../assets/icon_right_on.png"
                     alt=""/>
            </cell>
        </group>
    </div>
</template>
<script>
    import {XHeader, Scroller, XInput, Group, Selector, Calendar, Cell} from 'vux'
    export default {
        components: {
            XHeader, Scroller, XInput, Group, Selector, Calendar, Cell
        },
        data () {
            return {
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
    .vux-label{
        font-size: .75rem;
        color: #564712;
    }
    .weui-cells{
        margin-left: 1rem;
        margin-right: 1rem;
    }
    .weui-cells:before{
        top: -1px !important;
    }
    .weui-cell{
        padding: 10px 0 !important;
    }
    .weui-cell:before{
        left: 0 !important;
    }
    .page_integral{
        .integralTop{
            position: relative;
            display: inline-block;
            width: 100%;
            height: 16rem;
            background: url("../../assets/background1.png");
            background-size: 100%;
        }
        .integralTop-img{
            display: inline-block;
            width: 12rem;
            height: 14rem;
            background: url("../../assets/background2.png");
            background-size: 100%;
            margin: .85rem auto 0 auto;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        .integralTop-img > h1{
            margin-top: 1.2rem;
            margin-bottom: 0;
            font-size: 3rem;
            font-weight: 100;
            color: #AB9236;
        }
        .integralTop-img > p{
            margin-top: -.3rem;
            font-size: .75rem;
            color: #AB9236;
        }
        .integralTop-text{
            position: absolute;
            right: 1.05rem;
            bottom: .9rem;
            font-size: .75rem;
            color: #F67982;
        }
        .integralList{
            margin-top: -1rem;
        }
    }
</style>