var express=require('express');
var router=express.Router();
var NewsInfoServices=require("../services/NewsInfoServices");
var MessageBox=require("../utils/MessageBox");
var fs=require('fs');
var multer=require('multer');
const upload=multer({
    dest:'../uploads'
})

router.post("/uploads",upload.single("imgFile"),(req,resp)=>{
    let file=req.file;
    console.log(file);
    //防止文件重名，所有采用随机数处理
    let randomFileName=Math.floor(Math.random()*100000)+file.originalname;
    fs.rename(file.path,'./uploads/'+randomFileName,err=>{
        if(err){
            console.log("上传失败");
        }
        else{
            console.log("上传成功");
            resp.json({
                errno:0,
                data:[
                    "/uploads/"+randomFileName
                ]
            });
        }
    });
});

router.get("/AddNews",(req,resp)=>{
    resp.render("NewsInfo/AddNews");
});


router.post("/AddNews",async (req,resp)=>{
    var params={
        n_title:req.body.n_title,
        n_content:req.body.n_content,
        n_picPath:req.body.n_picPath,
        n_type:req.body.n_type,
        n_date:new Date(),
        isTop:false,
        isDel:false,
        a_id:req.session.adminInfo.a_id
    };

    var newsInfoServices=new NewsInfoServices();
    try {
       var result=await newsInfoServices.addNews(params);
       if(result.affectedRows>0){
           //添加成功
           resp.redirect("getListByPage");
       }
       else{
           //添加失败
           MessageBox.showAndBack("添加失败",resp);

       }
    } catch (error) {
        resp.send("发生错误了");
        console.log(error);
    }
});

router.get("/getListByPage",async (req,resp)=>{
    var params={
        pageIndex:req.query.pageIndex||1,
        n_type:req.query.n_type
    };
    try {
        var newsInfoServices=new NewsInfoServices();
        var pageData=await newsInfoServices.getListByPage(params);
        resp.render("NewsInfo/NewsList",pageData);
    } catch (error) {
        resp.send("发生错误了");
    }
})

router.get("/query",async (req,resp)=>{
    var params={
        pageIndex:req.query.pageIndex||1,
        n_type:req.query.n_type
    };
    try {
        var newsInfoServices=new NewsInfoServices();
        var pageData=await newsInfoServices.getListByPage(params);
        resp.render("NewsInfo/partialNewsList",pageData);
    } catch (error) {
        resp.send("发生错误了");
    }
});

module.exports=router;