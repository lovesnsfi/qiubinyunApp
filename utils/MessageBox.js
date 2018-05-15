class MessageBox{
    static showAndRedirect(msg,url,resp){
        resp.send("<script>alert('"+msg+"');location.href='"+url+"';</script>");
    }
    static showAndBack(msg,resp){
        resp.send("<script>alert('"+msg+"');history.back();</script>");
    }
}
module.exports=MessageBox;