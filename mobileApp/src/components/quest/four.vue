<template>
    <div class="page_three">
        <p class="con_p">
            <span class="con_num">{{list[currentIndex].orderNumber}}</span>
            <span class="con_text">{{list[currentIndex].title}}</span></p>
        <ul id="box" class="radioBox">
            <li v-for="(item,index) in list[currentIndex].option" class="girl">
                <label class="text" :for="'feel'+item.id">
                    <input
                            :id="'feel'+item.id"
                            name="check"
                            type="checkbox"
                            @click="isOther(item.value)"
                            v-model="list[currentIndex].answers"
                            :value="item.id">
                    <span>{{item.value}}</span>
                </label>
            </li>
            <textarea v-model="list[currentIndex].otherOption[0].text"
                      class="other-txt"
                      placeholder="请注明"
                      v-if="list[currentIndex].otherOption!=''"></textarea>
        </ul>
        <br>
    </div>
</template>

<script>
    export default{
        components:{
        },
        props:{
            surveyData:Array,
            currentIndex:Number
        },
        data(){
            return{
                list:[],
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
                    this.$emit('surveyData', val)
                }
            },
        },
        methods:{
            isOther(item){
                if(this.surveyData[this.currentIndex].otherOption[0]){
                    if(item.indexOf('其他')==-1){
                    }
                }
            },
            checboxNum(name, num) {
                let checboxs = document.getElementsByName(name);
                let a = 0;
                for (let index = 0; index < checboxs.length; index++) {
                    if (checboxs[index].checked) {
                        a = a + 1;
                    }
                }
                if (a == num) {
                    for (let index = 0; index < checboxs.length; index++) {
                        if (!checboxs[index].checked) {
                            checboxs[index].disabled = 'disabled';
                        }
                    }
                } else {
                    for (let index = 0; index < checboxs.length; index++)
                        checboxs[index].removeAttribute('disabled');
                }
            }
        },
        mounted(){
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    .page_three{
        .con_p{
            margin-bottom: 1rem;
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
            font-size: 1rem;
            margin-top: -.15rem;
            margin-left: .6rem;
            width: 86%;
            line-height: 1.2rem;
        }
        input[type="checkbox"]{
            display: none;
        }
        input[type="checkbox"] + span{
            width: .85rem;
            height: .85rem;
            line-height: .85rem;
            background: url(../../assets/images/circle.png) left center no-repeat;
            background-size: .85rem .85rem;
            padding-left: 1.2rem;
            font-size: .75rem;
            color: #999999;
        }
        input[type="checkbox"]:checked + span{
            background: url(../../assets/images/circle_a.png) left center no-repeat;
            background-size: .85rem .85rem;
            color: #666666;
        }
        .radioBox{
            font-size: .75rem;
            list-style: none;
            .girl{
                margin-bottom: 1.05rem;
            }
            .girl:last-child{
                margin-bottom: 3.05rem;
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
        .two_btn{
            margin-bottom: .7rem;
        }
        .quest-btn{
            margin-left: 0;
            width: 100%;
            height: 2rem;
            border: none;
            background: #ab9236;
            color: #FFFFFF;
        }
        button{
            outline: none;
        }
    }
</style>