const express=require('express');
var router=express.Router();
var AdminInfoServices=require("../services/AdminInfoServices");
var MessageBox=require("../utils/MessageBox");
router.get("/Index",(req,resp)=>{
    resp.render("AdminInfo/Index");
});

router.get("/checkLogin",async (req,resp)=>{
    var {a_id,a_pwd}=req.query;
    var adminInfoServices=new AdminInfoServices();
    try {
        var result =  await adminInfoServices.checkLogin({a_id,a_pwd});
        if(result.length==1){
            //登陆成功
            req.session.adminInfo=result[0];
            resp.redirect("/AdminInfo/AdminIndex");
        }
        else{
            //登陆失败
            MessageBox.showAndBack("登陆失败，请重试",resp);
        }
    } catch (error) {
        resp.send("数据库执行失败");
    }
});

router.get("/AdminIndex",(req,resp)=>{
    resp.render("AdminInfo/AdminIndex");
})


router.get("/LogOut",(req,resp)=>{
    req.session.destroy();   //销毁session
    resp.send("<script>top.location.href='/AdminInfo/Index';</script>");
});

module.exports=router;