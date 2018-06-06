//引入express模块
const express=require("express");
//定义路由级中间件
const router=express.Router();

router.get("/systemConfigurationData",(req,res)=>{
  var systemConfigurationData=
    [
      {description:'连续售票配置说明', department:'连续售票',createTime: '售票类型'},
      {description:'连续售票配置说明连续售票配置说明', department:'连续售票',createTime: '售票类型'},
      {description:'连续售票配置说明', department:'连续售票',createTime: '售票类型'},
      {description:'连续售票配置说明连续售票配置说明连续售票配置说明', department:'连续售票',createTime: '售票类型'},
      {description:'连续售票配置说明', department:'连续售票',createTime: '售票类型'},
      {description:'连续售票配置说明连续售票配置说明连续售票配置说明', department:'连续售票',createTime: '售票类型'},
      {description:'连续售票配置说明', department:'连续售票',createTime: '售票类型'},
      {description:'连续售票配置说明连续售票配置说明', department:'连续售票',createTime: '售票类型'},
      {description:'连续售票配置说明', department:'连续售票',createTime: '售票类型'},
      {description:'连续售票配置说明连续售票配置说明', department:'连续售票',createTime: '售票类型'},
      {description:'连续售票配置说明', department:'连续售票',createTime:'售票类型'},
      {description:'连续售票配置说明连续售票配置说明', department:'连续售票',createTime:'售票类型'},
      {description:'配置说明', department:'连续售票',createTime:'售票类型'},
      {description:'连续售票配置说明', department:'连续售票',createTime:'售票类型'},
      {description:'连续售票配置说明', department:'连续售票',createTime:'售票类型'},
      {description:'连续售票配置说明', department:'连续售票',createTime:'售票类型'},
      {description:'连续售票配置说明', department:'连续售票',createTime:'售票类型'},
      {description:'连续售票配置说明', department:'连续售票',createTime:'售票类型'},
      {description:'连续售票配置说明', department:'连续售票',createTime:'售票类型'},
      {description:'连续售票配置说明', department:'连续售票',createTime:'售票类型'}
    ];
  res.json(systemConfigurationData);
});

module.exports=router;