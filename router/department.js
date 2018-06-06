//引入express模块
const express=require("express");
//定义路由级中间件
const router=express.Router();

router.get("/departmentData",(req,res)=>{
  var departmentData=
    [
        {description:'我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息218',  department:'财务部',createTime:'2018-05-06 12:10:01'},
        {description:'我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息1818', department:'后勤部',createTime:'2018-04-02 12:10:01'},
        {description:'我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息318',  department:'后勤部',createTime:'2018-03-16 12:10:01'},
        {description:'我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息3218', department:'财务部',createTime:'2018-04-06 12:10:01'},
        {description:'我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息328',  department:'后勤部',createTime:'2018-04-06 12:10:01'},
        {description:'我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息38',   department:'后勤部',createTime:'2018-04-06 12:10:01'},
        {description:'我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息38',   department:'后勤部',createTime:'2018-04-06 12:10:01'},
        {description:'我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息328',  department:'人事部',createTime:'2018-04-06 12:10:01'},
        {description:'我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息382',  department:'人事部',createTime:'2018-04-06 12:10:01'},
        {description:'我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息383',  department:'人事部',createTime:'2018-04-06 12:10:01'},
        {description:'我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息3802', department:'财务部',createTime:'2018-04-06 12:10:01'},
        {description:'我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息3181', department:'财务部',createTime:'2018-04-06 12:10:01'},
        {description:'我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息18182',department:'人事部',createTime:'2018-04-06 12:10:01'},
        {description:'我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息18312',department:'财务部',createTime:'2018-04-06 12:10:01'},
        {description:'我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息18312',department:'财务部',createTime:'2018-04-06 12:10:01'},
        {description:'我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息18312',department:'财务部',createTime:'2018-04-06 12:10:01'},
        {description:'我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息18312',department:'财务部',createTime:'2018-04-06 12:10:01'},
        {description:'我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息18312',department:'财务部',createTime:'2018-04-06 12:10:01'},
        {description:'我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息18312',department:'财务部',createTime:'2018-04-06 12:10:01'},
        {description:'我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息18312',department:'财务部',createTime:'2018-04-06 12:10:01'}
    ];
  res.json(departmentData);
});

module.exports=router;