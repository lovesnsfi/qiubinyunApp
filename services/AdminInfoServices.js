var DBUtil=require("../utils/DBUtil");
class AdminInfoServices{
    checkLogin({a_id,a_pwd}){
        return new Promise((resolve,reject)=>{
            var conn=DBUtil.getConn();
            conn.query("select * from adminInfo where a_id=? and a_pwd =? and isDel=false",[a_id,a_pwd],(err,result)=>{
                if(err){
                    reject(err);
                }
                else{
                    resolve(result);
                }
            });
            conn.end();
        });
    }
}
module.exports=AdminInfoServices;