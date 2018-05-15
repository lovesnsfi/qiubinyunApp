var express=require('express');
var router=express.Router();
var UserInfoServices=require("../services/UserInfoServices");
var PageJson=require("../model/PageJson");
var NewsInfoServices=require("../services/NewsInfoServices");
var fs=require('fs');
var multer=require('multer');
const upload=multer({
    dest:'../uploads'
})
//普通用户登陆
router.get("/user/checkLogin",async (req,resp)=>{
    var params={u_id,u_pwd}=req.query;
    var userInfoServices=new UserInfoServices();
    try {
        var result=await userInfoServices.checkLogin(params);
        if(result.length==1){
            resp.json(new PageJson("success","登陆成功",result[0]));
        }
        else{
            resp.json(new PageJson("error","登陆失败"));
        }
    } catch (error) {
        console.log(error);
        resp.json(new PageJson("error","服务器错误"));        
    }
});

//新闻列表
router.get("/news/list",async (req,resp)=>{
    var params={
        n_type:req.query.n_type,
        pageIndex:req.query.pageIndex||1
    };
    var newsInfoServices=new NewsInfoServices();
    try {
        var pd=await newsInfoServices.getListByPage(params);
        resp.json(new PageJson("success","获取成功",pd));
    } catch (error) {
        resp.json(new PageJson("error","服务器错误"));                
    }
});

router.get("/news/findById",async (req,resp)=>{
    var n_id=req.query.n_id;
    var newsInfoServices=new NewsInfoServices();
    try {
        var result=await newsInfoServices.findById(n_id);
        if(result.length==1){
            resp.json(new PageJson("success","获取新闻成功",result[0]));
        }
        else{
            resp.json(new PageJson("error","获取新闻失败"));
        }
    } catch (error) {
        resp.json(new PageJson("error","服务器出错了"));
    }
});
//用户注册
router.get("/user/register",async(req,resp)=>{
    var params={u_id,u_pwd,u_nickName,u_telPhone,u_sex,u_qq}=req.query;
    var userInfoServices=new UserInfoServices();
    try {
        var result=await userInfoServices.register(params);
        if(result.affectedRows>0){
            resp.json(new PageJson("success","注册成功"));
        }
        else{
            resp.json(new PageJson("error","注册失败"));
        }
    } catch (error) {
        resp.json(new PageJson("error","服务器出错了"));
    }
});

router.get("/user/checkU_id",async (req,resp)=>{
    var u_id=req.query.u_id;
    var userInfoServices=new UserInfoServices();
    try {
        var result=await userInfoServices.checkU_id(u_id);
        if(result.length>0){
            resp.json(new PageJson("error","当前用户名已存在"));
        }
        else{
            resp.json(new PageJson("success","恭喜你，当前用户名可用"));
        }
    } catch (error) {
        resp.json(new PageJson("error","服务器错误"));
    }
});

//图片上传
router.post("/uploads",upload.single("imgFile"),(req,resp)=>{
    let file=req.file;
    console.log(file);
    //防止文件重名，所有采用随机数处理
    let randomFileName=Math.floor(Math.random()*100000)+file.originalname;
    fs.rename(file.path,'./uploads/'+randomFileName,err=>{
        if(err){
            resp.json(new PageJson("error","上传图片失败"));
        }
        else{
            resp.json(new PageJson("success","图片上传成功","/uploads/"+randomFileName));
        }
    })
});
module.exports=router;