//引入express模块
const express=require("express");
//定义路由级中间件
const router=express.Router();

router.get("/clusterOperationData",(req,res)=>{
  var clusterOperationData=
    [
      {name:'机器1', type:'133.133.133.31', cdCapacity:'25',cdUse: '2',  cupCapacity: '16',cupCapacityUse:'5'},
      {name:'机器22',type:'133.133.133.12', cdCapacity:'25',cdUse: '11', cupCapacity: '16',cupCapacityUse:'5'},
      {name:'机器13',type:'133.133.133.11', cdCapacity:'25',cdUse: '12', cupCapacity: '16',cupCapacityUse:'5'},
      {name:'机器14',type:'133.133.133.10', cdCapacity:'25',cdUse: '12', cupCapacity: '16',cupCapacityUse:'5'},
      {name:'机器15',type:'133.133.133.22', cdCapacity:'25',cdUse: '11', cupCapacity: '16',cupCapacityUse:'5'},
      {name:'机器25',type:'133.133.133.33', cdCapacity:'25',cdUse: '15', cupCapacity: '16',cupCapacityUse:'5'},
      {name:'机器11',type:'133.133.133.42', cdCapacity:'25',cdUse: '11', cupCapacity: '16',cupCapacityUse:'5'},
      {name:'机器31',type:'133.133.133.53', cdCapacity:'25',cdUse: '13', cupCapacity: '16',cupCapacityUse:'5'},
      {name:'机器21',type:'133.133.133.44', cdCapacity:'25',cdUse: '11', cupCapacity: '16',cupCapacityUse:'5'},
      {name:'机器54',type:'133.133.133.65', cdCapacity:'25',cdUse: '11', cupCapacity: '16',cupCapacityUse:'5'},
      {name:'机器21',type:'133.133.133.13', cdCapacity:'25',cdUse: '11', cupCapacity: '16',cupCapacityUse:'5'},
      {name:'机器24',type:'133.133.133.15', cdCapacity:'25',cdUse: '11', cupCapacity: '16',cupCapacityUse:'5'}
    ];
  res.json(clusterOperationData);
});

module.exports=router;