<template>
   <div class="page_sampleT" >

      <div class="detail">
         <span class="price">-800</span>
         <ul>
            <li class="number">单号:<a href="#">#VHB56646</a></li>
            <li class="itype">类型:<a href="#">兑换</a></li>
            <li class="time">日期:<a href="#"></a></li>
         </ul>

      </div>
   </div>
   </div>
</template>

<script>

</script>
<style lang="less" rel="stylesheet/less">
   .page_sampleT{

   .detail {
      position: relative;
      margin: .8rem auto;
      padding-left: 1rem;
      border-bottom: 1px solid #D2D2D2;
   .price{
      font-size: 1rem;
      color: #333;
      top: .9rem;
      right: 1rem;
      position: absolute;

   }
   ul{
      list-style: none;
      height: 4.3rem;
      width: 100%;
      font-size: .6rem;
      color: #666;

      /*display: inline-block;*/

   }

   .number{
      height: auto;
      width: 8.25rem;
   }
   a{
      list-style: none;
      color: #666;
      padding-left: .5rem;
   }
   .number a{
      font-size: .75rem !important;
      color: #333 !important;
   }
   .itype{
      height: auto;
      width: 4.92rem;
      padding: .3rem 0rem .3rem 0rem;
      /*padding: .45rem 0rem .4rem 0rem;*/
   }


   .time{
      height: auto;
      width: 8rem;
      /*margin-top: .5rem;*/
      /*padding-top: .4rem;*/
   }
   }

   }
</style>
