//引入express模块
const express=require("express");
//定义路由级中间件
const router=express.Router();

router.get("/authirityData",(req,res)=>{
  var authirityData=[
      {description:'我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息218',  department:'超级管理员',createTime:'2018-05-06 12:10:01'},
      {description:'我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息1818', department:'超级管理员',createTime:'2018-04-02 12:10:01'},
      {description:'我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息318',  department:'超级管理员',createTime:'2018-03-16 12:10:01'},
      {description:'我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息3218', department:'管理员1',createTime:'2018-04-06 12:10:01'},
      {description:'我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息328',  department:'管理员2',createTime:'2018-04-06 12:10:01'},
      {description:'我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息38',   department:'测试员001',createTime:'2018-04-06 12:10:01'},
      {description:'我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息38',   department:'测试员011',createTime:'2018-04-06 12:10:01'},
      {description:'我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息328',  department:'测试员021',createTime:'2018-04-06 12:10:01'},
      {description:'我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息382',  department:'测试员101',createTime:'2018-04-06 12:10:01'},
      {description:'我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息383',  department:'测试员222',createTime:'2018-04-06 12:10:01'},
      {description:'我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息3802', department:'测试员222',createTime:'2018-04-06 12:10:01'},
      {description:'我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息3181', department:'管理员2',createTime:'2018-04-06 12:10:01'},
      {description:'我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息18182',department:'测试员001',createTime:'2018-04-06 12:10:01'},
      {description:'我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息18312',department:'测试员001',createTime:'2018-04-06 12:10:01'},
      {description:'我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息18312',department:'测试员001',createTime:'2018-04-06 12:10:01'},
      {description:'我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息18312',department:'测试员001',createTime:'2018-04-06 12:10:01'},
      {description:'我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息18312',department:'测试员001',createTime:'2018-04-06 12:10:01'},
      {description:'我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息18312',department:'测试员001',createTime:'2018-04-06 12:10:01'},
      {description:'我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息18312',department:'测试员001',createTime:'2018-04-06 12:10:01'},
      {description:'我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息我是描述信息18312',department:'测试员001',createTime:'2018-04-06 12:10:01'}
    ];
  res.json(authirityData);
});

// router.get("/departmentData",(req,res)=>{
//   var departmentData=
//     [
//         {value: '001',label: '财务部'},
//         {value: '002',label: '后勤部'},
//     ];
//   res.json(departmentData);
// });

module.exports=router;