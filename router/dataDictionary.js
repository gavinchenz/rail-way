//引入express模块
const express=require("express");
//定义路由级中间件
const router=express.Router();

router.get("/dataDictionaryData",(req,res)=>{
  var dataDictionaryData=
    [
      {note:'这是分类',description:'男', department:'性别',createTime: '023'},
      {note:'这是分类',description:'26', department:'年龄',createTime: '021'},
      {note:'这是分类',description:'男', department:'性别',createTime: '023'},
      {note:'这是分类',description:'男', department:'性别',createTime: '1231'},
      {note:'这是分类',description:'男', department:'性别',createTime: '1231'},
      {note:'这是分类',description:'银行职员', department:'职位',createTime: '1231'},
      {note:'这是分类',description:'男', department:'性别',createTime: '1231'},
      {note:'这是分类',description:'银行职员', department:'职位',createTime: '1231'},
      {note:'这是分类',description:'银行职员', department:'职位',createTime: '1231'},
      {note:'这是分类',description:'中国', department:'国籍',createTime: '1231'},
      {note:'这是分类',description:'温州', department:'出生地',createTime:'5255'},
      {note:'这是分类',description:'温州', department:'出生地',createTime:'5255'},
      {note:'这是分类',description:'温州', department:'出生地',createTime:'5255'},
      {note:'这是分类',description:'温州', department:'出生地',createTime:'5255'},
      {note:'这是分类',description:'温州', department:'出生地',createTime:'5255'},
      {note:'这是分类',description:'温州', department:'出生地',createTime:'5255'},
      {note:'这是分类',description:'女', department:'性别',createTime:'0002'},
      {note:'这是分类',description:'女', department:'性别',createTime:'0002'},
      {note:'这是分类',description:'女', department:'性别',createTime:'0002'},
      {note:'这是分类',description:'女', department:'性别',createTime:'0002'}
    ];
  res.json(dataDictionaryData);
});

module.exports=router;