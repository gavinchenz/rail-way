<template>
  <div class="my-home">
   <div class="home-header">
      <a class="login-a" href="javascript:;">
        <img id="login-img" src="../assets/images/login1.png"/>
        <p id="login-p">{{msg}}</p>
      </a>
      <p class="header-ul">
        <a class="header-page" @click="changePage(0)">综合研判</a>
        <a class="header-page" @click="changePage(1)">自定义分析</a>
        <a class="header-page" @click="changePage(2)">单目标分析</a>
        <a class="header-page" @click="changePage(3)">多目标分析</a>
        <a class="header-page" @click="changePage(4)">涉票建模分析</a>
        <a class="header-page" @click="changePage(5)">涉毒建模分析</a>
        <a class="header-page" @click="changePage(6)">涉恐建模分析</a>
        <a class="header-page" @click="changePage(7)">侵财建模分析</a>
        <a class="header-page" @click="changePage(8)">维稳建模分析</a>
        <a class="header-page" @click="changePage(9)">中间库</a>
        <a class="header-page" @click="changePage(10)">任务列表</a>
      </p>
      <div class="header-right">
        <span class="right-btn fullScreen">全屏</span>
        <span class="right-btn lockScreen">锁屏</span>
        <span class="right-btn signOut">退出</span>
      </div>
     </div>
   <router-view class="main-content" :is="pageName"/>
   <footer class="footer"></footer>
  </div>
</template>

<script>
  //建模分析
  import CustomAnalysis from './modelingAnalysis/CustomAnalysis'
  import ComprehensiveStudy from './modelingAnalysis/ComprehensiveStudy'
  import SingleObjectiveAnalysis from './modelingAnalysis/SingleObjectiveAnalysis'
  import MultiobjectiveAnalysis from './modelingAnalysis/MultiobjectiveAnalysis'
  import TicketRelatedModelingAnalysis from './modelingAnalysis/TicketRelatedModelingAnalysis'
  import DrugModelingAnalysis from './modelingAnalysis/DrugModelingAnalysis'
  import TerrorModelingAnalysis from './modelingAnalysis/TerrorModelingAnalysis'
  import InvadeMoneyModelingAnalysis from './modelingAnalysis/InvadeMoneyModelingAnalysis'
  import MainStabilityModelingAnalysis from './modelingAnalysis/MainStabilityModelingAnalysis'
  import IntermediateLibrary from './modelingAnalysis/IntermediateLibrary'
  import TaskList from './modelingAnalysis/TaskList'

  //引入路由配置数据
  // import homeSecondaryPageRouterApi from '../api/homeSecondaryPageRouterApi';
export default {
  name: 'ModelingAnalysis',
  components:{
    CustomAnalysis,
    ComprehensiveStudy,
    SingleObjectiveAnalysis,
    MultiobjectiveAnalysis,
    TicketRelatedModelingAnalysis,
    DrugModelingAnalysis,
    TerrorModelingAnalysis,
    InvadeMoneyModelingAnalysis,
    MainStabilityModelingAnalysis,
    IntermediateLibrary,
    TaskList
  },
  data () {
    return {
      msg:"大数据中心应用系统",
      routerList:[],
      currentRouterList:[],
      condition:null,
      pageName:"comprehensive-study"
    }
  },
  created(){
      console.log("created")
      homeSecondaryPageRouterApi.getSecondaryPageRouterDataList((data)=> {
        this.routerList=data;
        console.log(this.routerList);
        this.currentRouterList=data[0];
        console.log(this.currentRouterList);
      });
  },
  methods:{
    changePage:function(index){
       if(index==0){
        this.pageName="comprehensive-study"
       }else if(index==1){
        this.pageName="custom-analysis"
       }else if(index==2){
        this.pageName="single-objective-analysis"
       }else if(index==3){
        this.pageName="multiobjective-analysis"
       }else if(index==4){
        this.pageName="ticket-related-modeling-analysis"
       }else if(index==5){
        this.pageName="drug-modeling-analysis"
       }else if(index==6){
        this.pageName="terror-modeling-analysis"
       }else if(index==7){
        this.pageName="invade-money-modeling-analysis"
       }else if(index==8){
        this.pageName="main-stability-modeling-analysis"
       }else if(index==9){
        this.pageName="intermediate-library"
       }else{
        this.pageName="task-list"
       }

       $(".tab").eq(index).addClass("tab1").siblings().removeClass('tab1');
    },
    //获取路由参数
    getParams:function(){
      // this.condition=this.$route.query.condition
    },
    getCurrentRouterList(){
      if(this.condition==1){
        this.currentRouterList=this.routerList[0];
      }else if(this.condition==2){
        this.currentRouterList=this.routerList[1];
      }else if(this.condition==3){
        this.currentRouterList=this.routerList[2];
      }else if(this.condition==4){
        this.currentRouterList=this.routerList[3];
      }else{
        this.currentRouterList=this.routerList[4];
      }
      console.log("wo kan kan "+this.currentRouterList);
    }
  },
  watch:{

  }
};
</script>

<style scoped>
.my-home{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  color:#fff;
  justify-content: flex-start;
}
.home-header{
  width: 100%;
  height: 50px;
  background: #fff;
  background:rgba(51,57,105,1);
}
.login-a{
  width:300px;
  height:100%;
  float:left;
  display: flex;
  justify-content: flex-start;
  padding-left:5px;
}
#login-img{
  height:100%;
}
#login-p{
  height:100%;
  color:#fff;
  font-size:18px;
  text-align: left;
  letter-spacing: 8px;
  line-height: 50px;
}
#login-span{
  display:block;
  font-size:10px;
  letter-spacing: 0px;
}
.header-right{
  width:180px;
  float: right;
}
.right-btn{
  float:left;
  display:block;
  width:60px;
  line-height: 50px;
  text-align: center;
  cursor: pointer;
}
.right-btn:hover{
  background:#2D5BA6;
  font-weight: bold;
}
.header-ul{
  float: left;
  width: 70%;
  padding-left:10px;
  display: inline-block;
  text-align: left;
}
.header-page{
  float: left;
  height:100%;
  display:inline-block;
  margin:0 10px;
  font-size:14px;
  line-height:50px;
  color:#fff;
}
.header-page:hover{
  background:rgba(255,255,255,.3);
  font-weight: bold;
}
.iconfont{
  display: block;
  width:40px;
  font-size:25px;
  font-weight: bold;
  color:#000;
  line-height:40px;
  cursor: pointer;
}
.switchPage{
  flex:1;
}
.main-content{
  width:100%;
  flex:1;
}
</style>
