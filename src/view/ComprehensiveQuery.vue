<template>
  <div class="my-home">
   <div class="home-header">
      <a class="login-a" href="javascript:;">
        <img id="login-img" src="../assets/images/login1.png"/>
        <p id="login-p">{{msg}}</p>
      </a>
      <p class="header-ul">
        <a class="header-page" @click="changePage(0)">融合数据查询</a>
        <a class="header-page" @click="changePage(1)">实名制数据查询</a>
        <a class="header-page" @click="changePage(2)">重点人员库</a>
        <a class="header-page" @click="changePage(3)">售处信息维护</a>
        <a class="header-page" @click="changePage(4)">窗口信息维护</a>
        <a class="header-page" @click="changePage(5)">全国站点信息</a>
        <a class="header-page" @click="changePage(8)">派出所信息</a>
        <a class="header-page" @click="changePage(10)">列车车次</a>
        <a class="header-page" @click="changePage(9)">清洗配置信息</a>
        <a class="header-page" @click="changePage(11)">座位信息</a>
        <a class="header-page" @click="changePage(6)">查询结果</a>
        <a class="header-page" @click="changePage(7)">上传</a>
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
  name: 'ComprehensiveQuery',
  components:{CommonScreenBtn},
  data () {
    return {
      msg:"大数据中心应用系统",
      routerList:[],
      currentRouterList:[],
      condition:null,
      flag:true
    }
  },
  methods:{
    changePage:function(index){
       if(index==0){
          this.$router.push({path:'/Search'})
       }else if(index==1){
          this.$router.push({path:'/RealNameDataQuery'})
       }else if(index==2){
          this.$router.push({path:'/KeyStaffBank'})
       }else if(index==3){
          this.$router.push({path:'/SaleInfoMaintenance'})
       }else if(index==4){
          this.$router.push({path:'/WindowInfoMaintenance'})
       }else if(index==5){
          this.$router.push({path:'/NationalSiteInformation'})
       }else if(index==6){
          this.$router.push({path:'/QueryResult'})
       }else if(index==8){
          this.$router.push({path:'/PoliceStation'})
       }else if(index==9){
          this.$router.push({path:'/CleanConfig'})
       }else if(index==10){
         this.$router.push({path:'/Trains'})
       }else if(index==11){
         this.$router.push({path:'/SeatRank'})
       }else{
          this.$router.push({path:'/Upload'})
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
  justify-content: flex-start;
}
.main-content{
  flex: 1;
  overflow-y: auto;
}
.footer{
  height: 0px;
}
.home-header{
  width: 100%;
  height: 50px;
  background: #fff;
  background:rgba(51,57,105,1);
  color:#fff;
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
