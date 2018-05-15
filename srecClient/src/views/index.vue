<template>
  <div>
      <div class="topNav">
          电子校园
          <div class="right" @click="$router.push({name:'userInfo'})">
              <img src="../assets/user.png" alt="">
          </div>
          <div style="clear:both"></div>
      </div>
      <div style="margin-top:45px"></div>
      <top-swiper></top-swiper>
      <ul class="n_type">
          <li data-type="活动介绍" :class="{'active':n_type=='活动介绍'}" @click="n_type='活动介绍'">活动介绍</li>
          <li data-type="学校时事" :class="{'active':n_type=='学校时事'}" @click="n_type='学校时事'">学校时事</li>
          <li data-type="社团介绍" :class="{'active':n_type=='社团介绍'}" @click="n_type='社团介绍'">社团介绍</li>
      </ul>
      <div class="fixedBottom">
         <news-list :n_type="n_type"></news-list>       
      </div>
  </div>
</template>

<script>
import newsList from '../components/newsList';
import topSwiper from '../components/topSwiper';
export default {
    name:"index",
    data(){
        return {
            n_type:"活动介绍"
        }
    },
    components:{
        newsList,topSwiper
    }
}
</script>

<style lang="scss">
    @import "../scss/main.scss";
    .topNav
    {
        background-color: $bgColor;
        height: 45px;
        font-size: 18px;
        @include flex-box-row;
        @include justify-content-center;
        @include align-items-center;
        color: yellow;
        font-weight: bold;
        position: fixed;
        top: 0px;
        z-index: 99;
        .right
        {
            width: 40px;
            position: absolute;
            right: 10px;
            cursor: pointer;
            top: 5px;
        }
        .right>img
        {
            width: 100%;
        }
        
    }
    .n_type
    {
        @include flex-box-row;
        @include justify-content-center;
        @include align-items-center;
        height: 45px;
        background-color: $bgColor;
        li
        {
            width: 33%;
            height: 45px;
            @include flex-box-row;
            @include justify-content-center;
            @include align-items-center;
            color: black;
            cursor: pointer;
            &.active
            {
                color: yellow;
                font-weight: bold;
            }
        }
    }
</style>
