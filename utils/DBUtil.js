var mysql=require('mysql');
class DBUtil{
    static getConn(){
        var conn=mysql.createConnection({
            host:"127.0.0.1",
            user:"root",
            password:"123456",
            multipleStatements:true,
            database:"srec"
        });
        conn.connect();
        return conn;
    }
}

module.exports=DBUtil;