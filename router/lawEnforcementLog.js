//引入express模块
const express=require("express");
//定义路由级中间件
const router=express.Router();

router.get("/lawEnforcementLogData",(req,res)=>{
  var lawEnforcementLogData=
    [
      {text:'涉毒分析',user:'张三', IP:'192.168.1.100',caseType: '一大队',caseStatus: '测试案件',investigator: '测试任务',createdTime: '2018-06-01 12:10:03'},
      {text:'调查分析',user:'李建', IP:'192.168.1.110',caseType: '二大队',caseStatus: '测试案件1',investigator:'测试任务',createdTime:'2018-06-01 13:10:03'},
      {text:'调查分析',user:'王晓亮', IP:'192.168.1.102',caseType: '一大队',caseStatus: '测试案件23',investigator: '测试任务',createdTime: '2018-06-01 14:10:03'},
      {text:'调查分析',user:'高金', IP:'192.168.1.111',caseType: '一大队',caseStatus: '测试案件343',investigator: '测试任务',createdTime: '2018-06-01 12:10:03'},
      {text:'涉毒分析',user:'沈飞进', IP:'192.168.1.150',caseType: '一大队',caseStatus: '测试案件',investigator: '测试任务',createdTime: '2018-06-01 13:10:03'},
      {text:'涉毒分析',user:'王丽', IP:'192.168.1.142',caseType: '一大队',caseStatus: '测试案件',investigator: '测试任务',createdTime: '2018-06-01 16:10:03'},
      {text:'调查分析',user:'张海龙', IP:'192.168.1.133',caseType: '三大队',caseStatus: '测试案件',investigator: '测试任务',createdTime: '2018-06-01 11:10:03'},
      {text:'调查分析',user:'秦旭诶', IP:'192.168.1.121',caseType: '三大队',caseStatus: '测试案件',investigator: '测试任务',createdTime: '2018-06-01 12:10:03'},
      {text:'调查分析',user:'刘兰花', IP:'192.168.1.115',caseType: '一大队',caseStatus: '测试案件',investigator: '测试任务',createdTime: '2018-06-01 12:10:03'},
      {text:'涉毒分析',user:'张立柱', IP:'192.168.1.120',caseType: '一大队',caseStatus: '测试案件',investigator: '测试任务',createdTime: '2018-06-01 12:10:03'},
      {text:'涉毒分析',user:'李小刚', IP:'192.168.1.101',caseType: '三大队',caseStatus: '测试案件',investigator: '测试任务',createdTime: '2018-06-01 12:10:03'},
      {text:'涉毒分析',user:'沈丽君', IP:'192.168.1.111',caseType: '一大队',caseStatus: '测试案件',investigator: '测试任务',createdTime: '2018-06-01 12:10:03'}
    ];
  res.json(lawEnforcementLogData);
});

module.exports=router;