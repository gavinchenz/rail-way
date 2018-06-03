//1.引入express模块
const express = require('express');
var cors = require('cors');
var session = require('express-session')
var cookieParser = require('cookie-parser');
//2.创建app对象
const app = express();


//引入路由配置
const indexNav= require("./router/indexNav");


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("sessionuser"));
app.use(session(
  {
    secret:"sessionuser",
    resave:true,
    saveUninitialized:true
  }
));
app.use(cors({//用来限制头部文件中的信息
  origin:['http://localhost:8080'],
  methods:['GET','POST'],
  allowaHeaders: ['Content-Type','Authorization'],
}));

//注册路由表
app.use("/indexNav",indexNav);


//指定服务静态文件夹
app.use(express.static('dist'))
/*设置公共响应头信息*/
app.use(function ( req, res,next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

//定义简单路由
app.use('/',(req,res) => {
  res.send('服务器已启动');
});


//定义服务启动端口
app.listen(3000,() => {
    console.log('app listening on port 3000.');
});