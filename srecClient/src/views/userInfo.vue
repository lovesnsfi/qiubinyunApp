<template>
  <div class="userInfo">
      <loading v-if="isLoading"></loading>
      <div v-else>
          <div class="u_topNav">
              <div class="back" @click="$router.push({name:'index'})">
                  <img src="../assets/back.png" alt="返回">
              </div>
              <div class="registDiv" @click="$router.push({name:'login'})">登陆</div>
          </div>
          <div class="u_info">
              <div class="picDiv" @click.stop="chooseFile()">
                  <img :src="u_photo" alt="" ref="img_userPhoto">
                  <input type="file" ref="imgFile" @change="uploadPhoto()" style="display:none">              
              </div>
              <p class="u_realName">{{u_nickName}}</p>
          </div>
          <ul  class="ul_info">
              <li>个人资料</li>
              <li>我的评论</li>
              <li>关于新版本</li>
              <li @click="$router.push({name:'register'})">我要注册</li>              
          </ul>
      </div>
  </div>
</template>

<script>
import ObjectHelper from '../utils/ObjectHelper';
import loading from '../components/loading';
import xc from '../assets/xc.png';
export default {
    name:'userInfo',
    components:{
        loading
    },
    data(){
        return {
            isLoading:false,
            filePath:""
        }
    },
    computed:{
        u_nickName(){
            var u_nickName= ObjectHelper.getStorage("u_nickName");
            if(ObjectHelper.isNullOrUndefined(u_nickName)){
                u_nickName="未登陆";
            }
            return u_nickName;
        },
        u_photo(){
            var u_photo=ObjectHelper.getStorage("u_photo");
            if(ObjectHelper.isNullOrUndefined(u_photo)){
                u_photo=xc;
            }
            return u_photo;
        }
    },
    methods:{
        //上传头像
        chooseFile(){
            this.$refs.imgFile.click();
        },
        uploadPhoto(){
            var file=this.$refs.imgFile.files[0];
            console.log(file);
            if(/^(image)\/\w{3,4}$/.test(file.type)){
                var formData=new FormData();
                formData.append("imgFile",file);
                let config={
                    headers:{
                        "Content-Type":"multipart/form-data"
                    }
                };
                this.$http.post("/Api/uploads",formData,config).then(res=>{
                    if(res.data.status=="success"){
                        this.$refs.img_userPhoto.src=ApiConfig.baseURL+res.data.data;
                        ObjectHelper.setStorage("u_photo",ApiConfig.baseURL+res.data.data);
                    }
                    else{
                        this.$toast("图片上传失败");
                    }
                });
            }
            else{
                this.$alert("请选择图片文件").then(()=>{
                    this.$refs.imgFile.value=""
                });
            }
        }        
    }
}
</script>

<style lang="scss">
    @import '../scss/main.scss';
    .userInfo
    {
        margin-top: 45px;
        .u_topNav
        {
            height: 45px;
            background-color: $bgColor;
            @include flex-box-row;
            @include align-items-center;
            @include justify-content-space-between;
            position: fixed;
            top: 0px;
            left: 0px;
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
            .registDiv
            {
                margin-right: 10px;
                cursor: pointer;
                color: yellow;
            }
        }
        .u_info
        {
            height: 200px;
            background-color: $bgColor;
            @include flex-box-column;
            @include justify-content-center;
            @include align-items-center;
            .picDiv
            {
                width: 70px;
                height: 70px;
                border-radius: 35px;
                border: 1px solid white;
                cursor: pointer;
                outline: none;
                overflow: hidden;
                >img
                {
                    width: 70px;
                    height: auto;
                    outline: none;
                    height: 70px;
                }
            }
            .u_realName
            {
                color: white;
                font-weight: bold;
                margin-top: 10px;
            }
        }
        .ul_info
        {
            padding:0px 15px;
            box-sizing: border-box;
            li
            {
                height: 45px;
                line-height: 45px;
                margin:5px 0px;
                border-bottom: 1px solid lightgray;
                font-size: 14px;
                box-sizing: border-box;
                padding-left:5px; 
            }
        }
    }
</style>
