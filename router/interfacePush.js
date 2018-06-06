//引入express模块
const express=require("express");
//定义路由级中间件
const router=express.Router();

router.get("/interfacePushData",(req,res)=>{
  var interfacePushData=
    [
      {name:'查询接口',type:'基础', IP:'192.168.1.100',isPush: '是', pushTime: '2018-06-01 12:10:03'},
      {name:'查询接口',type:'基础', IP:'192.168.1.110',isPush: '否', pushTime: '2018-06-01 12:10:03'},
      {name:'查询接口',type:'基础', IP:'192.168.1.102',isPush: '是', pushTime: '2018-06-01 12:10:03'},
      {name:'查询接口',type:'基础', IP:'192.168.1.111',isPush: '否', pushTime: '2018-06-01 12:10:03'},
      {name:'查询接口',type:'基础', IP:'192.168.1.150',isPush: '否', pushTime: '2018-06-01 12:10:03'},
      {name:'查询接口',type:'基础', IP:'192.168.1.142',isPush: '否', pushTime: '2018-06-01 12:10:03'},
      {name:'查询接口',type:'基础', IP:'192.168.1.133',isPush: '是', pushTime: '2018-06-01 12:10:03'},
      {name:'查询接口',type:'基础', IP:'192.168.1.121',isPush: '否', pushTime: '2018-06-01 12:10:03'},
      {name:'查询接口',type:'基础', IP:'192.168.1.115',isPush: '是', pushTime: '2018-06-01 12:10:03'},
      {name:'查询接口',type:'基础', IP:'192.168.1.120',isPush: '否', pushTime: '2018-06-01 12:10:03'},
      {name:'查询接口',type:'基础', IP:'192.168.1.101',isPush: '否', pushTime: '2018-06-01 12:10:03'},
      {name:'查询接口',type:'基础', IP:'192.168.1.111',isPush: '是', pushTime: '2018-06-01 12:10:03'}
    ];
  res.json(interfacePushData);
});

module.exports=router;