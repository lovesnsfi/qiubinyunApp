<template>
  <div class="newsItem" @click="getNewsDetail(item.n_id)">
      <div class="left">
          <img :src="baseURL+item.n_picPath" alt="新闻图片">
      </div>
      <div class="right">
          <div class="title">
              {{item.n_title}}
          </div>
          <div class="desc">
              <span>{{item.n_date|toDate}}</span>
              <span><i>{{item.commentCount}}</i>&nbsp;跟贴</span>
          </div>
      </div>
  </div>
</template> 

<script>
import {toDate} from '../filter/filters';
export default {
  name: "newsItem",
  data() {
    return {};
  },
  props: ["item"],
  computed:{
      baseURL:function(){
          return ApiConfig.baseURL;
      }
  },
  methods:{
      getNewsDetail(n_id){
          this.$router.push({name:"newsDetail",params:{n_id:n_id}});
      }
  },
  filters:{
    toDate:toDate
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/main.scss";
.newsItem {
  font-size: 12px;
  @include flex-box-row;
  @include justify-content-center;
  @include align-items-center;
  box-sizing: border-box;
  padding: 3px;
  .left {
    width: 70px;
    img {
      width: 100%;
      display: block;
      height: 70px;
    }
  }
  .right {
    margin-left: 5px;
    margin-right: 5px;
    flex: 1;
    @include flex-box-column;
    @include justify-content-space-around;
    min-height: 70px;
    .title {
      font-size: 14px;
    }
    .desc {
      color: gray;
      @include flex-box-row;
      @include justify-content-space-between;
    }
  }
  border-bottom: 1px solid lightgray;
}
</style>

