var DBUtil=require("../utils/DBUtil");
class UserInfoServices{
    constructor(){

    }
    //检测普通用户登陆
    checkLogin({u_id,u_pwd}){
        return new Promise((resolve,reject)=>{
            var conn=DBUtil.getConn();
            conn.query("select * from userInfo where u_id=? and u_pwd=? and isDel=false",[u_id,u_pwd],(err,result)=>{
                if(err){
                    reject(err);
                }
                else{
                    resolve(result);
                }
            })
            conn.end();
        });  
    }
    register({u_id,u_pwd,u_nickName,u_telPhone,u_sex,u_qq}){
        return new Promise((resolve,reject)=>{
            var conn=DBUtil.getConn();
            var strSql="INSERT INTO srec.userinfo (u_id, u_pwd, u_nickName, u_telPhone, u_sex, isDel, u_qq) VALUES (?,?,?,?,?,?,?)";
            conn.query(strSql,[u_id,u_pwd,u_nickName,u_telPhone,u_sex,false,u_qq],(err,result)=>{
                if(err){
                    reject(err);
                }
                else{
                    resolve(result);
                }
            })
            conn.end();
        });
    }
    checkU_id(u_id){
        return new Promise((resolve,reject)=>{
            var conn=DBUtil.getConn();
            var strSql="select * from userInfo where u_id=? and isDel=false";
            conn.query(strSql,[u_id],(err,result)=>{
                if(err){
                    reject(err);
                }
                else{
                    resolve(result);
                }
            });
            conn.end();
        })
    }
}
module.exports=UserInfoServices;