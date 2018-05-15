<template>
    <div class="loginDiv">
        <div class="r_topNav">
            <div class="back" @click="$router.back()">
                <img src="../assets/back.png" alt="">
            </div>
        </div>
        <ul class="formList">
            <li>
                <p>用户登陆</p>
            </li>
            <li>
                <input type="text" placeholder="请输入用户名" v-model="formData.u_id"/>
            </li>
            <li>
                <input type="password" placeholder="请输入密码" v-model="formData.u_pwd" />
            </li>
            <li>
                <button type="button" ref="btnLogin" @click="login()">登陆</button>
            </li>
        </ul>
    </div>
</template>

<script>
import ObjectHelper from '../utils/ObjectHelper';
export default {
    name:'login',
    data(){
        return {
            formData:{
                u_id:"",
                u_pwd:""
            }
        }
    },
    computed:{
        isValidate(){
            return ObjectHelper.checkFormData(this.formData);
        }
    },
    methods:{
        login(){
            if(this.isValidate){
                this.$refs.btnLogin.disabled=true;
                this.$http.get("/Api/user/checkLogin",{
                    params:this.formData
                }).then(res=>{
                    this.$refs.btnLogin.disabled=false;
                    if(res.data.status=="success"){
                        this.$toast("登陆成功");
                        ObjectHelper.setStorage("u_id",res.data.data.u_id);
                        ObjectHelper.setStorage("u_nickName",res.data.data.u_nickName);
                        ObjectHelper.setStorage("u_photo",res.data.data.u_photo);                        
                        setTimeout(() => {
                            this.$router.push({name:'userInfo'});
                        }, 3000);
                    }
                    else{
                        this.$alert("登陆失败");
                    }
                })
            }
            else{
                this.$alert("请将用户名与密码填写完整");
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '../scss/main.scss';
    .loginDiv
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
