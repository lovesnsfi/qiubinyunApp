<template>
        <div class="newsDetail">
            <base :href="baseURL">
            <div class="topNavDetail">
              <div class="back" @click="$router.back()">
                  <img src="../assets/back.png" alt="返回">
              </div>
            </div>
          <loading v-if="isLoading"></loading>
          <div v-else>
            <p class="n_title">
                  {{newsItem.n_title}}
              </p>
              <p class="n_date">
                  {{newsItem.n_date|toDate}}  &nbsp; {{newsItem.a_realName}}
              </p>
              <div class="n_content" v-html="newsItem.n_content"></div>
            
          </div>
          <div style="position:fixed;bottom:0px;left:0px;width:100%;padding:0px 10px;box-sizing:border-box">
            <reply-box v-if="!isLoading"></reply-box>            
          </div>
        </div>
</template>

<script>
import loading from "../components/loading";
import replyBox from '../components/replyBox';
import {toDate} from '../filter/filters';
export default {
  name: "newsDetail",
  data() {
    return {
      newsItem: null,
      n_id: null,
      isLoading: true,
      baseURL: ""
    };
  },
  components: {
    loading,replyBox
  },
  filters:{
    toDate:toDate
  },
  created() {
    this.baseURL = ApiConfig.baseURL;
    this.n_id = this.$route.params.n_id;
    this.findById(this.n_id);
  },
  methods: {
    findById(n_id) {
      this.$http
        .get("/Api/news/findById", {
          params: {
            n_id: n_id
          }
        })
        .then(res => {
          this.newsItem = res.data.data;
          this.isLoading = false;
        });
    }
  }
};
</script>

<style lang="scss">
@import "../scss/main.scss";
.newsDetail {
  box-sizing: border-box;
  padding: 5px 15px;
  margin: 45px 0px;

  .topNavDetail {
    background: $bgColor;
    position: fixed;
    top: 0px;
    width: 100%;
    left: 0px;
    height: 45px;
    @include flex-box-row;
    @include align-items-center;
    box-shadow: 0px 5px 10px lightgray;
    .back {
      width: 30px;
      height: 30px;
      margin-left: 10px;
      cursor: pointer;
      img {
        widows: 30px;
        height: 30px;
      }
    }
  }
  .n_date {
    color: gray;
    font-size: 12px;
    margin: 5px 0px;
  }
  .n_title {
    font-weight: bold;
    font-size: 16px;
  }
}
</style>
<style>
.n_content {
  width: 100%;
  line-height: 1.5;
  font-size: 14px;
}
.n_content p {
  margin: 5px 0px;
}
.n_content img {
  width: 100% !important;
  height: auto;
}
</style>


