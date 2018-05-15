<template>
    <div class="registerDiv">
        <div class="r_topNav">
            <div class="back" @click="$router.back()">
                <img src="../assets/back.png" alt="">
            </div>
        </div>
        <ul class="formList">
            <li>
                <p>注册用户信息</p>
            </li>
            <li>
                <input type="text" placeholder="请输入用户名" @blur="checkU_id()" v-model="formData.u_id"/>
            </li>
            <li>
                <input type="password" placeholder="请输入密码" v-model="formData.u_pwd" />
            </li>
            <li>
                <input type="password" placeholder="请输入确认密码" v-model="formData.u_secondPwd" />
            </li>
            <li>
                <input type="text" placeholder="请输入昵称" v-model="formData.u_nickName"/>
            </li>
            <li>
                <input type="text" placeholder="请输入手机号" v-model="formData.u_telPhone"/>
            </li>
            <li>
                <select v-model="formData.u_sex">
                    <option value="男">男</option>
                    <option value="女">女</option>
                </select>
            </li>
            <li>
                <input type="text" placeholder="请输入QQ号" v-model="formData.u_qq">
            </li>
            <li>
                <button type="button" @click="registerData()" ref="btnRegister">确认注册</button>
            </li>
        </ul>
    </div>
</template>

<script>
import ObjectHelper from '../utils/ObjectHelper';
export default {
    //注册
    name:'register',
    data(){
        return{
            formData:{
                u_id:"",
                u_pwd:"",
                u_nickName:"",
                u_telPhone:"",
                u_sex:"男",
                u_qq:"",
                u_secondPwd:""
            }
        }
    },
    computed:{
        isValidate(){
            return ObjectHelper.checkFormData(this.formData);
        }
    },
    methods:{
        checkU_id(){
            if(!ObjectHelper.isNullOrUndefined(this.formData.u_id.trim())){
                this.$http.get("/Api/user/checkU_id",{
                    params:{
                        u_id:this.formData.u_id
                    }
                }).then(res=>{
                    if(res.data.status=="error"){
                        this.$toast("当前用户名已存在，请换一个试下");
                        this.formData.u_id="";
                    }
                });
            }
        },
        registerData(){
            if(this.isValidate){
                if(this.formData.u_pwd!=this.formData.u_secondPwd){
                    this.$alert("两次密码不一致，请确认");
                    return;
                }
               this.$refs.btnRegister.disabled=true;
               this.$http.get("/Api/user/register",{
                   params:this.formData
               }).then(res=>{
                   this.$refs.btnRegister.disabled=false;
                    if(res.data.status=="success"){
                        this.$alert("注册成功").then(()=>{
                            this.$router.back();
                        })
                    }
                    else{
                        this.$alert("注册失败");
                    }
               })
           }
           else{
               this.$alert("请将信息输入完整");
           }
        }
    }
}
</script>

<style lang="scss">
@import '../scss/main.scss';
.registerDiv
{
    .r_topNav
    {
        background-color: $bgColor;
        height:45px;
        @include flex-box-row;
        @include align-items-center;
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
    .formList
    {
        box-sizing: border-box;
        padding: 0px 20px;
        li
        {
            height: 40px;
            line-height: 40px;
            p{
                text-align: center;
                font-size: 18px;
                color: $bgColor;
            }
            input,select,button
            {
                width: 100%;
                padding: 5px;
                box-sizing: border-box;
                outline-color: $bgColor;
            }
            button
            {
                border: 1px solid $bgColor;
                outline: none;
                background-color: rgb(241, 234, 234);
            }
        }
    }
    
}
</style>
