<template>
  <div class="newsList">
      <news-item v-for="(item,index) in newsList" :key="index" :item="item"></news-item>
  </div>
</template>

<script>
import newsItem from './newsItem';
export default {
    name:'newsList',
    props:["n_type"],
    data(){
        return {
            pageIndex:1,
            newsList:[]
        }
    },
    components:{
        newsItem
    },
    created(){
        this.getListByPage(this.pageIndex);
    },
    methods:{
        getListByPage(pageIndex){
            this.$http.get("/Api/news/list",{
                params:{
                    pageIndex:pageIndex,
                    n_type:this.n_type
                }
            }).then(res=>{
                console.log(res.data.data.data);
                this.newsList=this.newsList.concat(res.data.data.data);
            })
        }
    },
    watch:{
        n_type:function(newValue){
            this.pageIndex=1;
            this.newsList=[];
            this.getListByPage(this.pageIndex);
        }
    }
}
</script>

<style>

</style>
