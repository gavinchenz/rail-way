<template>
  <div class="my-home">
   <div class="home-header">
      <a class="login-a" href="javascript:;">
        <img id="login-img" src="../assets/images/login1.png"/>
        <p id="login-p">{{msg}}</p>
      </a>
      <p class="header-ul">
        <a class="header-page" @click="changePage(0)">数据接入情况</a>
        <a class="header-page" @click="changePage(1)">数据特征专题库</a>
        <a class="header-page" @click="changePage(2)">数据接入及处理记录</a>
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
  import DataAccessSituation from "./dataAccess/DataAccessSituation";
  import DataFeatureLibrary from "./dataAccess/DataFeatureLibrary";
  import DataProcessingRecord from "./dataAccess/DataProcessingRecord";
  //引入路由配置数据
  // import homeSecondaryPageRouterApi from '../api/homeSecondaryPageRouterApi';
export default {
  name: 'DataAccess',
  components:{
    DataAccessSituation,
    DataFeatureLibrary,
    DataProcessingRecord
  },
  data () {
    return {
      msg:"大数据中心应用系统",
      routerList:[],
      currentRouterList:[],
      condition:null,
      pageName:"data-access-situation"
    }
  },
  created(){
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
        this.pageName="data-access-situation"
       }else if(index==1){
        this.pageName="data-feature-library"
       }else if(index==2){
        this.pageName="data-processing-record"
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
  width: 60%;
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
