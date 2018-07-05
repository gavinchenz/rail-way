<template>
  <div class="my-home">
   <div class="home-header">
      <a class="login-a" href="javascript:;">
        <img id="login-img" src="../assets/images/login1.png"/>
        <p id="login-p">{{msg}}</p>
      </a>
      <p class="header-ul">
        <a class="header-page" @click="changePage(0)">模型参数设置</a>
        <a class="header-page" @click="changePage(1)">账号管理</a>
        <a class="header-page" @click="changePage(2)">部门管理</a>
        <a class="header-page" @click="changePage(3)">权限管理</a>
        <a class="header-page" @click="changePage(4)">数据字典</a>
        <a class="header-page" @click="changePage(5)">系统配置</a>
        <a class="header-page" @click="changePage(6)">案件管理</a>
        <a class="header-page" @click="changePage(7)">执法日志</a>
        <a class="header-page" @click="changePage(8)">接口推送</a>
        <a class="header-page" @click="changePage(9)">集群运行</a>
      </p>
      <common-screen-btn></common-screen-btn>
     </div>
   <router-view class="main-content"/>
   <footer class="footer"></footer>
  </div>
</template>

<script>
import CommonScreenBtn from '../components/common/commonScreenBtn';
export default {
  name: 'SystemManagement',
  components:{CommonScreenBtn},
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
          this.$router.push({path:'/ModelParameterSetting'})
       }else if(index==1){
          this.$router.push({path:'/AccountManagement'})
       }else if(index==2){
          this.$router.push({path:'/DepartmentManagement'})
       }else if(index==3){
          this.$router.push({path:'/AuthirityManagement'})
       }else if(index==4){
          this.$router.push({path:'/DataDictionary'})
       }else if(index==5){
          this.$router.push({path:'/SystemConfiguration'})
       }else if(index==6){
          this.$router.push({path:'/CaseManagement'})
       }else if(index==7){
          this.$router.push({path:'/LawEnforcementLog'})
       }else if(index==8){
          this.$router.push({path:'/InterfacePush'})
       }else{
          this.$router.push({path:'/ClusterOperation'})
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
