<template>
    <div class="page_one">
        <p class="con_p"><span class="con_num">1</span><span class="con_text">请选择你所惠临的门店</span></p>
        <div class="con_back">
            <select id="provinces" v-model="province" class="con_select" name="province"
                    @change="changeCity">
                <option value="" disabled selected>选择省份</option>
                <option :value="item.id"
                        v-for="(item,index) in list[currentIndex].option"
                        @click="getProIndex(index)"
                        v-if="item.parentID==0">{{item.value}}</option>
            </select>
            <select id="citys" v-model="city" class="con_select" name="city" @change="changeStore">
                <option value ="" disabled selected>选择城市</option>
                <option :value="item.id"
                        v-for="(item,index) in list[currentIndex].option"
                        v-if="item.parentID==province">{{item.value}}</option>
            </select>
            <select id="stores" class="con_select last" name="store" v-model="store" @change="changeSelect">
                <option value ="" disabled selected>选择门店</option>
                <option :value="item.id"
                        v-for="(item,index) in list[currentIndex].option" v-if="item.parentID==city">{{item.value}}</option>
            </select>
        </div>
    </div>
</template>

<script>
    import {XButton} from 'vux'
    export default {
        components:{
            XButton
        },
        props:{
            surveyData:Array,
            currentIndex:Number
        },
        data(){
            return{
                list:[],
                province: '',
                city: '',
                store: '',
                index:0,
            }
        },
        watch: {
            currentIndex:{
                immediate: true,
                handler(val) {
                    this.index = val;
                }
            },
            surveyData: {
                immediate: true,
                handler(val) {
                    this.list = val;
                    let region = ["","",""];
                    this.list[this.index].answers = region;
                }
            },
            list: {
                immediate: true,
                handler(val) {
                    this.$emit('surveyData', val)
                }
            },
        },
        methods:{
            changeCity(){
                this.city = '';
                this.store = '';
                this.list[this.index].answers[0] = this.province;
            },
            changeStore(){
                this.store = '';
                this.list[this.index].answers[1] = this.city;
            },
            changeSelect(){
                this.list[this.index].answers[2] = this.store;
            },
        },
        mounted(){
        },
        created(){
        }
    }
</script>
<style lang="less" rel="stylesheet/less">
    .page_one{
        select{
            outline: none;
        }
        option{
        }
        .con_back{
            .last{
                margin-bottom: 1.25rem;
            }
        }
        .con_p{
            margin-bottom: 1.25rem;
        }
        .con_num{
            width: 1rem;
            height: 1rem;
            display: inline-block;
            background: #ab9236;
            border-radius: 50%;
            font-size: .6rem;
            line-height: 1rem;
            vertical-align: top;
            text-align: center;
            color: #FFFFFF;
            position: relative;
        }
        .con_num:before{
            content: '';
            display: block;
            position: absolute;
            width: .15rem;
            height: .15rem;
            background: #ab9236;
            border-radius: 50%;
            right: -.2rem;
            bottom: 0;
        }
        .con_text{
            display: inline-block;
            vertical-align: top;
            color: #ab9236;
            font-size: .8rem;
            margin-top: -.14rem;
            margin-left: .6rem;
            width: 86%;
            line-height: 1.2rem;
        }
        .con_select{
            width: 100%;
            height: 2rem;
            color: #999999;
            padding-left: .6rem;
            margin-bottom: .6rem;
            font-size: .75rem;
            border: 1px solid #D2D2D2;
            border-radius: .2rem;
            appearance:none;
            -moz-appearance:none;
            -webkit-appearance:none;
            /*在选择框的最右侧中间显示小箭头图片*/
            background: url("../../assets/icon_right.png") no-repeat ;
            background-position: 97% center;
            background-size: 3.5% 40%;
        }
    }
</style>
