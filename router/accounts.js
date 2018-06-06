//引入express模块
const express=require("express");
//定义路由级中间件
const router=express.Router();

router.get("/accountsData",(req,res)=>{
  var accountsData=
    [
        {num:'151118218',  name:'张三',  department:'财务部',createTime:'2018-05-06'},
        {num:'1522211818',name:'李晓非',  department:'后勤部',createTime:'2018-04-02'},
        {num:'152221318', name:'王乐',   department:'后勤部',createTime:'2018-03-16'},
        {num:'1522213218',name:'利达丰',  department:'财务部',createTime:'2018-04-06'},
        {num:'121221328',name:'张建名',   department:'后勤部',createTime:'2018-04-06'},
        {num:'12122138',name:'裴大业',    department:'后勤部',createTime:'2018-04-06'},
        {num:'12122138',name:'董小童',    department:'后勤部',createTime:'2018-04-06'},
        {num:'421221328', name:'李梅',   department:'人事部',createTime:'2018-04-06'},
        {num:'421221382', name:'张泽',   department:'人事部',createTime:'2018-04-06'},
        {num:'421221383', name:'曾浩',   department:'人事部',createTime:'2018-04-06'},
        {num:'4212213802',name:'李明达',  department:'财务部',createTime:'2018-04-06'},
        {num:'4512213181', name:'王菲',  department:'财务部',createTime:'2018-04-06'},
        {num:'45122118182', name:'李建科',department:'人事部',createTime:'2018-04-06'},
        {num:'45111818312', name:'张利民',department:'财务部',createTime:'2018-04-06'},
        {num:'45111818312', name:'张利民',department:'财务部',createTime:'2018-04-06'},
        {num:'45111818312', name:'张利民',department:'财务部',createTime:'2018-04-06'},
        {num:'45111818312', name:'张利民',department:'财务部',createTime:'2018-04-06'},
        {num:'45111818312', name:'张利民',department:'财务部',createTime:'2018-04-06'},
        {num:'45111818312', name:'张利民',department:'财务部',createTime:'2018-04-06'},
        {num:'45111818312', name:'张利民',department:'财务部',createTime:'2018-04-06'}
    ];
  res.json(accountsData);
});

router.get("/departmentSelectData",(req,res)=>{
  var departmentSelectData=
    [
        {value: '001',label: '财务部'},
        {value: '002',label: '后勤部'},
    ];
  res.json(departmentSelectData);
});

module.exports=router;