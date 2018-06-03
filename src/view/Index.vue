<template>
  <div class="my-index">
    <div class="index-content">
      <div class="content-left">
        <index-common-module :list="item" v-for="(item,index) in commonTits" :key="item.content"/></index-common-module>
      </div>
      <div class="content-right">
        <index-notice></index-notice>
        <index-news></index-news>
      </div>
    </div>
    <div class="index-footer">
      <a :href="list.mylink" class="footer-p" v-for="(list,index) in navList" :key="list.tit">{{list.tit}}</a>
    </div>
  </div>
</template>

<script>
import IndexCommonModule from "../components/Index/IndexCommomModule";
import IndexNotice from "../components/Index/IndexNotice";
import IndexNews from "../components/Index/IndexNews";
export default {
  name: 'Index',
  components:{
    IndexCommonModule,
    IndexNotice,
    IndexNews
  },
  data () {
    return {
      navList:[
        {
          tit:"目标查询",
          mylink:"/Search"
        },
        {
          tit:"数据接入",
          mylink:"/Search"
        },
        {
          tit:"综合预警",
          mylink:"/Search"
        },
        {
          tit:"系统管理",
          mylink:"/Search"
        }
      ],
      commonTits:[
        {
          icon:"icon-accountfilling",
          content:"目标查询",
          path:"",
          mylink:"/SingleObjectiveAnalysis"
        },
        {
          icon:"icon-logistic",
          content:"数据接入",
          path:"",
          mylink:"/DataFeatureLibrary"                     
        },
        {
          icon:"icon-wxbsousuotuiguang",
          content:"智能搜索",
          path:"",
          mylink:"/Search"  
        },
        {
          icon:"icon-earth",
          content:"铁网",
          path:"",
          mylink:"/MainStabilityModelingAnalysis"
        }
      ]
    }
  }
}
</script>

<style scoped>
.my-index{
  height:100%;
  display:flex;
  flex-direction: column;
}
.index-content{
  width:100%;
  flex:1;
  display:flex;
}
.content-left,.content-right{
  width:50%;
}
.content-left{
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-content:center;
  padding-top:80px;
  padding-left:100px;
}
.content-right{
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-content:center;
  flex-direction: column;
}
.index-footer{
  height:80px;
  background: #ac0;
  display: flex;
  background: rgba(255,255,255,.3);
}
.footer-p{
  display: inline;
  width:25%;
  height:100%;
  text-align: center;
  line-height: 80px;
  cursor: pointer;
  color:#fff;
}
.footer-p:hover{
  background:rgba(0,153,255,.3);
}
</style>
