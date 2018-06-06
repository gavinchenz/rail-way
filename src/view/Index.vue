<template>
  <div class="my-index">
    <div class="index-content">
      <div class="content-left">
         <p class="content-left-up-p">常用功能</p>
        <div class="content-left-up">
            <index-common-module :list="item" v-for="(item,index) in commonTits" :key="item.content"/></index-common-module>
        </div>
        <p class="content-left-up-p changeP">快速查询</p>
        <search-components></search-components>
      </div>
      <div class="content-right">
        <index-notice></index-notice>
        <index-data-situation></index-data-situation>
      </div>
    </div>
    <div class="index-footer">
      <a class="footer-p" v-for="(list,index) in navList" :key="list.tit" @click="getNextPage(index,list.mylink)">{{list.tit}}</a>
    </div>
  </div>
</template>

<script>
import IndexCommonModule from "../components/Index/IndexCommomModule";
import IndexNotice from "../components/Index/IndexNotice";
import IndexDataSituation from "../components/Index/IndexDataSituation";
import SearchComponents from "../components/Search/SearchComponents";

export default {
  name: 'Index',
  components:{
    IndexCommonModule,
    IndexNotice,
    IndexDataSituation,
    SearchComponents
  },
  data () {
    return {
      navList:[
        {
          tit:"数据接入",
          mylink:"/Home/DataAccessSituation"
        },
        {
          tit:"综合查询",
          mylink:"/Home/Search"
        },
        {
          tit:"建模分析",
          mylink:"/Home/ComprehensiveStudy"
        },        
        {
          tit:"综合预警",
          mylink:"/Home/ComprehensiveEarlyWarning"
        },
        {
          tit:"系统管理",
          mylink:"/Home/AccountManagement"
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
        },
        {
          icon:"icon-accountfilling",
          content:"综合预警",
          path:"",
          mylink:"/SingleObjectiveAnalysis"
        },
        {
          icon:"icon-logistic",
          content:"单目标分析",
          path:"",
          mylink:"/DataFeatureLibrary"                     
        },
        {
          icon:"icon-wxbsousuotuiguang",
          content:"多目标分析",
          path:"",
          mylink:"/Search"  
        },
        {
          icon:"icon-earth",
          content:"权限管理",
          path:"",
          mylink:"/MainStabilityModelingAnalysis"
        },
        {
          icon:"icon-accountfilling",
          content:"系统设置",
          path:"",
          mylink:"/SingleObjectiveAnalysis"
        },
        {
          icon:"icon-logistic",
          content:"重点人员库",
          path:"",
          mylink:"/DataFeatureLibrary"                     
        }
      ]
    }
  },
  methods:{
    getNextPage(index,router){
      var id=index+1;
      var path=router;
      console.log(id);
      console.log(path);
      var routeData = this.$router.resolve({path:path,query:{condition:id}})
      window.open(routeData.href, '_blank');
    }
  }
}
</script>

<style scoped>
.my-index{
  height:100%;
  display:flex;
  flex-direction: column;
  background: url(../assets/images/bg-03.jpg) no-repeat;
  background-size:cover;
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
  padding-top:30px;
  padding-left:80px;
}
.content-left-up-p{
  height:40px;
  line-height: 40px;
  text-align: left;
  font-size:20px;
  font-weight:bold;
  color:#fff;
}
.changeP{
  margin:43px auto 0;
}
.content-left-up{
  height:30%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-content:flex-start;
}
.content-right{
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-content:center;
  flex-direction: column;
}
.index-footer{
  height:70px;
  background: #ac0;
  display: flex;
  background: rgba(255,255,255,.3);
}
.footer-p{
  display: inline;
  width:25%;
  height:100%;
  text-align: center;
  line-height: 70px;
  cursor: pointer;
  color:#fff;
}
.footer-p:hover{
  background:rgba(0,153,255,.3);
}
</style>
