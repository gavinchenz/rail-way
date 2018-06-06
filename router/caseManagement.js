//引入express模块
const express=require("express");
//定义路由级中间件
const router=express.Router();

router.get("/caseManagementData",(req,res)=>{
  var caseManagementData=
    [
        {caseName:'测试案件111', caseNum:'1000012565',caseType: '盗窃',caseStatus: '处理中',investigator: '曾浩',createdTime: '2018-06-01 12:10:03'},
        {caseName:'测试案件112', caseNum:'1000012565',caseType: '盗窃',caseStatus: '结案',investigator:'曾浩',createdTime:'2018-06-01 13:10:03'},
        {caseName:'测试案件113', caseNum:'1000012565',caseType: '盗窃',caseStatus: '结案',investigator: '曾浩',createdTime: '2018-06-01 14:10:03'},
        {caseName:'测试案件114', caseNum:'1000012565',caseType: '盗窃',caseStatus: '处理中',investigator: '曾浩',createdTime: '2018-06-01 12:10:03'},
        {caseName:'测试案件115', caseNum:'1000012565',caseType: '盗窃',caseStatus: '结案',investigator: '曾浩',createdTime: '2018-06-01 13:10:03'},
        {caseName:'测试案件116', caseNum:'1000012565',caseType: '盗窃',caseStatus: '结案',investigator: '曾浩',createdTime: '2018-06-01 16:10:03'},
        {caseName:'测试案件117', caseNum:'1000012565',caseType: '盗窃',caseStatus: '结案',investigator: '曾浩',createdTime: '2018-06-01 11:10:03'},
        {caseName:'测试案件118', caseNum:'1000012565',caseType: '盗窃',caseStatus: '结案',investigator: '曾浩',createdTime: '2018-06-01 12:10:03'},
        {caseName:'测试案件119', caseNum:'1000012565',caseType: '盗窃',caseStatus: '处理中',investigator: '曾浩',createdTime: '2018-06-01 12:10:03'},
        {caseName:'测试案件120', caseNum:'1000012565',caseType: '盗窃',caseStatus: '处理中',investigator: '曾浩',createdTime: '2018-06-01 12:10:03'},
        {caseName:'测试案件121', caseNum:'1000012565',caseType: '盗窃',caseStatus: '处理中',investigator: '曾浩',createdTime: '2018-06-01 12:10:03'},
        {caseName:'测试案件122', caseNum:'1000012565',caseType: '盗窃',caseStatus: '结案',investigator: '曾浩',createdTime: '2018-06-01 12:10:03'},
        {caseName:'测试案件123', caseNum:'1000012565',caseType: '盗窃',caseStatus: '结案',investigator: '曾浩',createdTime: '2018-06-01 12:10:03'},
        {caseName:'测试案件124', caseNum:'1000012565',caseType: '盗窃',caseStatus: '处理中',investigator: '曾浩',createdTime: '2018-06-01 12:10:03'},
        {caseName:'测试案件125', caseNum:'1000012565',caseType: '盗窃',caseStatus: '处理中',investigator: '曾浩',createdTime: '2018-06-01 12:10:03'},
        {caseName:'测试案件126', caseNum:'1000012565',caseType: '盗窃',caseStatus: '处理中',investigator: '曾浩',createdTime: '2018-06-01 12:10:03'}
    ];
  res.json(caseManagementData);
});

module.exports=router;