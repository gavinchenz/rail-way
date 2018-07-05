<template>
  <div class="my-home">s
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
      <common-screen-btn></common-screen-btn>
     </div>
   <router-view class="main-content" />
   <footer class="footer"></footer>
  </div>
</template>

<script>
import CommonScreenBtn from '../components/common/commonScreenBtn';
export default {
  name: 'DataAccess',
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
          this.$router.push({path:'/DataAccessSituation'})
       }else if(index==1){
          this.$router.push({path:'/DataFeatureLibrary'})
       }else if(index==2){
          this.$router.push({path:'/DataProcessingRecord'})
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
