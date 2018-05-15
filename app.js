var express = require('express');
var path = require('path');
var ejs=require('ejs');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var domain=require('domain');
var session=require("express-session");
var app = express();
app.use(cookieParser("adminInfo"));
app.use(session({
    secret:"adminInfo",
    resave:true,
    saveUninitialized:true
}));
var http=require("http");
//使用domain处理异常
app.use((req,resp,next)=>{
  var d=domain.create();
  d.on("err",err=>{
    resp.statusCode = 500;
    resp.send("服务器错误了");
    d.dispose();
  });
  d.add(req);
  d.add(resp);
  d.run(next);
})

// view engine setup
app.engine("html",ejs.__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({limit:'10mb'}));
app.use(bodyParser.urlencoded({ limit:'10mb',extended: false }));

app.use("/public",express.static(path.join(__dirname, 'public')));
app.use("/uploads",express.static(path.join(__dirname,"uploads")));
app.use("/dist",express.static(path.join(__dirname,"dist")));
//跨域的处理
app.use((req,resp,next)=>{
  resp.setHeader("Access-Control-Allow-Origin","*");
  resp.setHeader("Access-Control-Allow-Methods","PUT,DELETE,GET,POST,OPTIONS");
  resp.setHeader("Access-Control-Allow-Headers","Content-Type");
  next();
})


const AdminInfoController=require('./routes/AdminInfoController');
app.use("/AdminInfo",AdminInfoController);
const NewsInfoController=require("./routes/NewsInfoController");
app.use("/NewsInfo",NewsInfoController);
const ApiController=require("./routes/ApiController");
app.use('/Api',ApiController);

http.createServer(app).listen(8888,()=>{
  console.log("服务器启动成功","端口号8888");
})


module.exports = app;
