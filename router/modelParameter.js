//引入express模块
const express=require("express");
//定义路由级中间件
const router=express.Router();

router.get("/modelParameterData",(req,res)=>{
  var modelParameterData=
    [
      {name:'连续售票0', settingType:'售票类型',  instryctions:'连续售票配置说明修改连续售票配置说明修改'},
      {name:'连续售票1', settingType:'售票类型1', instryctions:'连续售票配置说明修改置说明修改连续售票配置说明修改置说明修改'},
      {name:'连续售票2', settingType:'售票类型2', instryctions:'连续售票配置说明修改置说明修改连续售票配置说明修改置说明修改连续售票配置说明修改置说明修改'},
      {name:'连续售票3', settingType:'售票类型3', instryctions:'连续售票配置说明修改置说明修改'},
      {name:'连续售票4', settingType:'售票类型4', instryctions:'连续售票配置说明修改置说明修改连续售票配置说明修改置说明修改'},
      {name:'连续售票5', settingType:'售票类型5', instryctions:'连续售票配置说明修改置说明修改连续售票配置说明修改置说明修改'},
      {name:'连续售票6', settingType:'售票类型6', instryctions:'连续售票配置说明修改置说明修改123123213'},
      {name:'连续售票7', settingType:'售票类型7', instryctions:'连续售票配置说明修改置说明修改121231231231212312'},
      {name:'连续售票8', settingType:'售票类型8', instryctions:'连续售票配置说明修改置说明修改123123123'},
      {name:'连续售票9', settingType:'售票类型9', instryctions:'连续售票配置说明修改置说明修改1231231'},
      {name:'连续售票10',settingType:'售票类型10',instryctions:'连续售票配置说明修改置说明修改123213'},
      {name:'连续售票11',settingType:'售票类型11',instryctions:'连续售票配置说明修改置说明修改123123'},
      {name:'连续售票12',settingType:'售票类型12',instryctions:'连续售票配置说明修改置说明修改1231231'},
      {name:'连续售票13',settingType:'售票类型13',instryctions:'连续售票配置说明修改置说明修改123123111'},
      {name:'连续售票14',settingType:'售票类型14',instryctions:'连续售票配置说明修改置说明修改123123111'},
      {name:'连续售票15',settingType:'售票类型15',instryctions:'连续售票配置说明修改置说明修改123123111'},
      {name:'连续售票16',settingType:'售票类型16',instryctions:'连续售票配置说明修改置说明修改123123111'},
      {name:'连续售票17',settingType:'售票类型17',instryctions:'连续售票配置说明修改置说明修改123123111'},
      {name:'连续售票18',settingType:'售票类型18',instryctions:'连续售票配置说明修改置说明修改123123111'}
    ];
  res.json(modelParameterData);
});

module.exports=router;