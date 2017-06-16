<template>
    <div class="page_two">
        <p class="con_p">
            <span class="con_num">{{list[currentIndex].orderNumber}}</span>
            <span class="con_text">{{list[currentIndex].title}}</span></p>
        <ul class="radioBox">
            <li v-for="(item,index) in list[currentIndex].option" class="girl">
                <label class="text" :for="'sex'+item.id">
                    <input
                            :id="'sex'+item.id"
                            name="radio"
                            type="radio"
                            @click="isOther(item.value)"
                            v-model="list[currentIndex].answers"
                            :value="item.id">
                    <span>{{item.value}}</span>
                </label>
            </li>
            <textarea v-model="list[currentIndex].otherOption[0].value"
                      class="other-txt"
                      :disabled="disabledText"
                      placeholder="请注明"
                      v-if="list[currentIndex].otherOption!=''"></textarea>
        </ul>
    </div>
</template>

<script>
    import {XButton} from 'vux'
    export default{
        components:{
            XButton
        },
        props:{
            surveyData:Array,
            currentIndex:Number,
            otherText:String
        },
        data(){
            return{
                selected: '',
                list:[],
                disabledText:true,
                otherShow:false,
                otherCopy: this.otherText
            }
        },
        methods:{
            isOther(item){
                if(this.surveyData[this.currentIndex].otherOption[0]){
                    if(item.indexOf('其他')==-1){
                        this.list[this.currentIndex].otherOption[0].value='';
                        this.disabledText=true;
                    }else{
                        this.disabledText=false;
                    }
                }
            }
        },
        watch: {
            surveyData: {
                immediate: true,
                handler(val) {
                    this.list = val;
                }
            },
            list: {
                immediate: true,
                handler(val) {
                    this.$emit('surveyData', val);
                }
            },
            otherText: {
                immediate: true,
                handler(val) {
                    this.otherCopy = val;
                }
            },
            otherCopy: {
                immediate: true,
                handler(val) {
                    this.$emit('changText', val);
                }
            }
        },

        mounted(){
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    .page_two{
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
        input[type="radio"]{
            display: none;
        }
        input[type="radio"] + span{
            width: .85rem;
            height: .85rem;
            line-height: 1.2rem;
            background: url(../../assets/images/circle.png) left center no-repeat;
            background-size: .85rem .85rem;
            padding-left: 1.2rem;
            font-size: .75rem;
            color: #999999;
        }
        input[type="radio"]:checked + span{
            background: url(../../assets/images/circle_a.png) left center no-repeat;
            background-size: .85rem .85rem;
            color: #666666;
        }
        .radioBox{
            font-size: .75rem;
            list-style: none;
            .girl{
                margin-bottom: 1.3rem;
            }
            .girl:last-child{
                margin-bottom: 2.5rem;
            }
            .other-txt{
                font-family: 'Verdana', "Hiragino Sans GB";
                background: none;
                resize: none;
                border: none;
                height: 3rem;
                line-height: 1rem;
                font-size: .75rem;
                color: #333333;
                width: 100%;
                margin-top: -.5rem;
                margin-bottom: 1.3rem;
                border-radius: .2rem;
                border: 1px solid #ab9236;
            }
        }
        button{
            outline: none;
        }
    }
</style>