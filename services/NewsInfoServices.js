var DBUtil = require("../utils/DBUtil");
var ObjectHelper = require('../utils/ObjectHelper');
var PageData = require("../model/PageData");
class NewsInfoServices {
    addNews(params) {
        //异步转同步
        return new Promise((resolve, reject) => {
            var conn = DBUtil.getConn();
            var strSql = "INSERT INTO newsinfo (n_title, n_content, n_picPath, n_type, a_id, isTop, n_date, isDel) VALUES (?, ?, ?, ?, ?, ?, ?, ?);"
            conn.query(strSql, [
                params.n_title,
                params.n_content,
                params.n_picPath,
                params.n_type,
                params.a_id,
                params.isTop,
                params.n_date,
                params.isDel
            ], (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            })
            conn.on("err",function(){
                console.log("数据库连接错误");
            })
            conn.end();
        });
    }
    getListByPage(obj) {
        return new Promise((resolve, reject) => {
            var conn = DBUtil.getConn();
            var strSql = "select * from newsInfoViewWithAdmin where isDel=false ";
            var strCountSql = "select count(*) as sumCount from newsInfoViewWithAdmin where isDel=false ";
            var strWhere = "";
            if (!ObjectHelper.isNullOrUndefined(obj.n_type)) {
                strWhere += " and n_type='" + obj.n_type + "'";
            }
            var limit = 10;
            var offset = (obj.pageIndex - 1) * limit;
            strSql += strWhere + " limit ?,? ";
            strCountSql += strWhere;
            conn.query(strSql + ";" + strCountSql, [offset, limit], (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    var pageData = new PageData(obj.pageIndex, result[1][0].sumCount, 10, result[0]);
                    resolve(pageData);
                }
            });
            conn.on("error",()=>{
                console.log("数据库conn出错");
            });
            conn.end();
        });
    }
    findById(n_id){
        return new Promise((resolve,reject)=>{
            var conn=DBUtil.getConn();
            var strSql="select * from newsInfoViewWithAdmin where n_id=? and isDel=false";
            conn.query(strSql,[n_id],(err,result)=>{
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
}

module.exports = NewsInfoServices;