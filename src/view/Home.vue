<template>
  <div class="my-home">
   <div class="home-header">
     <div class="home-header-up">
      <a class="login-a" href="javascript:;">
        <img id="login-img" src="../assets/images/login1.png"/>
        <p id="login-p">
          {{msg}}
          <span id="login-span">{{subTitle}}</span>
        </p>
      </a>
      <ul class="header-up-ul">
        <li class="header-up-li" v-for="item in firstNav" :key="item.tit">
          <a :href="item.path" class="header-up-a">{{item.tit}}</a>
        </li>
      </ul>
      <div class="header-up-right">
        <span class="right-btn fullScreen" @click.native="getFullSceeen">全屏</span>
        <span class="right-btn lockScreen">锁屏</span>
        <span class="right-btn signOut">退出</span>
      </div>
     </div>
      <div class="home-header-down">
        <i class="iconfont icon-arrowleft"></i>
        <ul class="switchPage">
          <li class="switchPage-li"></li>
        </ul>
        <i class="iconfont icon-arrowright"></i>
      </div>     
   </div>
   <router-view/>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components:{
   
  },
  data () {
    return {
      msg:"大数据中心应用系统",
      subTitle:"Large Data Center Application System",
      firstNav:[
        {
          tit:"目标查询",
          path:"/Home/Search"
        },
        {
          tit:"数据接入",
          path:"/Home/DataAccessSituation"
        },
        {
          tit:"综合预警",
          path:"/Home/Search"
        },
        {
          tit:"系统管理",
          path:"/Home/AccountManagement"
        },
      ]
    }
  },
  methods:{
    getFullSceeen:function(){
      var doElm=document.documentElement;
      if(doElm.requestFullscreen){
        doElm.requestFullscreen();
      }else if(doElm.mozRequestFullScreen){
        doElm.mozRequestFullScreen();
      }else if(doElm.webkitRequestFullScreen){
        doElm.webkitRequestFullScreen();
      }else if(elem.msRequestFullScreen){
        elem.msRequestFullScreen();
      }
    }
  },
  mounted:function(){
    this.getFullSceeen
  }
}
</script>

<style scoped>
.my-home{
  height:100%;
  display:flex;
  flex-direction: column;
  color:#fff;
}
.home-header{
  height: 80px;
  background: #fff;
}
.home-header-up,.home-header-down{
  height:50%;
  display:flex;
}
.home-header-up{
  background:rgba(51,57,105,1);
}
.login-a{
  width:272px;;
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
  flex:1;
  height:100%;
  color:#fff;
  font-size:15px;
  text-align: left;
  letter-spacing: 10px;
}
#login-span{
  display:block;
  font-size:10px;
  letter-spacing: 0px;
}
.header-up-right{
  float:right;
  width:180px;
}
.right-btn{
  float:left;
  display:block;
  width:60px;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
}
.right-btn:hover{
  background:#2D5BA6;
  font-weight: bold;
}
.header-up-ul{
  flex:1;
  padding-left:100px;
  display: flex;
  justify-content: flex-start;
}
.header-up-li{
  width:10%;
}
.header-up-li a{
  display: block;
  width:100%;
  font-size:16px;
  line-height:40px;
  color:#fff;
}
.header-up-li a:hover{
  background:#2D5BA6;
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
</style>
