<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(str,index) in listImg" :key="index" >
                <img :src="str" alt="轮播图片" style="width:100%;height:auto">
            </div>
        </div>
        <div class="swiper-pagination swiper-pagination-white"></div>
    </div>
</template>

<script>
import Swiper from "swiper";
import item1 from '../assets/item1.jpg';
import item2 from '../assets/item2.jpg';
import item3 from '../assets/item3.jpg';
import item4 from '../assets/item4.jpg';
import "../../node_modules/swiper/dist/css/swiper.min.css";
export default {
  name: "topSwiper",
  data() {
    return {
      listImg: [
        item1,item2,item3,item4
      ],
      baseURL:""
    };
  },
  mounted() {
    var swiper = new Swiper(".swiper-container", {
      pagination: ".swiper-pagination",
      paginationClickable: true,
      loop: true,
      speed: 600,
      autoplay: 4000,
      onTouchEnd: function() {
        swiper.startAutoplay();
      }
    });
  }
};
</script>

<style lang="scss">
.swiper-container {
  width: 100%;
  .swiper-wrapper {
    width: 100%;
    height: 100%;
  }
  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
  .swiper-pagination-bullet {
    width: 0.833rem;
    height: 0.833rem;
    display: inline-block;
    background: #7c5e53;
  }
}
</style>
