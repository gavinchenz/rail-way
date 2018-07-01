<template>
  <div class="my-home">
   <div class="home-header">
      <a class="login-a" href="javascript:;">
        <img id="login-img" src="../assets/images/login1.png"/>
        <p id="login-p">{{msg}}</p>
      </a>
      <p class="header-ul">
        <a class="header-page" @click="changePage(0)">综合研判</a>
        <!--<a class="header-page" @click="changePage(1)">自定义分析</a>-->
        <!-- <a class="header-page" @click="changePage(2)">单目标分析</a> -->
        <!-- <a class="header-page" @click="changePage(3)">多目标分析</a> -->
        <a class="header-page" @click="changePage(4)">涉票建模分析</a>
        <a class="header-page" @click="changePage(5)">涉毒建模分析</a>
        <a class="header-page" @click="changePage(6)">涉恐建模分析</a>
        <a class="header-page" @click="changePage(7)">侵财建模分析</a>
        <a class="header-page" @click="changePage(8)">维稳建模分析</a>
        <!-- <a class="header-page" @click="changePage(9)">中间库</a> -->
        <a class="header-page" @click="changePage(10)">任务列表</a>
      </p>
      <div class="header-right">
        <span class="right-btn fullScreen">全屏</span>
        <span class="right-btn lockScreen">锁屏</span>
        <span class="right-btn signOut">退出</span>
      </div>
     </div>
   <router-view class="main-content"/>
   <footer class="footer"></footer>
  </div>
</template>

<script>
export default {
  name: 'ModelingAnalysis',
  data () {
    return {
      msg:"大数据中心应用系统",
      routerList:[],
      currentRouterList:[],
      condition:null
    }
  },
  methods:{
    changePage:function(index){
       if(index==0){
          this.$router.push({path:'/ComprehensiveStudy'})
       }else if(index==1){
          this.$router.push({path:'/CustomAnalysis'})
       }else if(index==2){
          this.$router.push({path:'/SingleObjectiveAnalysis'})
       }else if(index==3){
          this.$router.push({path:'/MultiobjectiveAnalysis'})
       }else if(index==4){
          this.$router.push({path:'/TicketRelatedModelingAnalysis'})
       }else if(index==5){
          this.$router.push({path:'/DrugModelingAnalysis'})
       }else if(index==6){
          this.$router.push({path:'/TerrorModelingAnalysis'})
       }else if(index==7){
          this.$router.push({path:'/InvadeMoneyModelingAnalysis'})
       }else if(index==8){
          this.$router.push({path:'/MainStabilityModelingAnalysis'})
       }else if(index==9){
          this.$router.push({path:'/IntermediateLibrary'})
       }else{
          this.$router.push({path:'/TaskList'})
       }

       $(".tab").eq(index).addClass("tab1").siblings().removeClass('tab1');
    }
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
