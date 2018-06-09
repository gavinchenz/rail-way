<template>
  <div class="my-home">
   <div class="home-header">
      <a class="login-a" href="javascript:;">
        <img id="login-img" src="../assets/images/login1.png"/>
        <p id="login-p">{{msg}}</p>
      </a>
      <ul class="header-ul">
        <li class="header-li" v-for="currentRouter in currentRouterList" :key="currentRouter.pageName" >
          <a :href="currentRouter.pagePath" class="header-a">{{currentRouter.pageName}}</a>
        </li>
      </ul>
      <div class="header-right">
        <span class="right-btn fullScreen">全屏</span>
        <span class="right-btn lockScreen">锁屏{{this.condition}}</span>
        <span class="right-btn signOut">退出{{this.$route.query.condition}}</span>
      </div>
     </div>
   <router-view/>
  </div>
</template>

<script>
  import homeSecondaryPageRouterApi from '../api/homeSecondaryPageRouterApi';
export default {
  name: 'Home',
  components:{
   
  },
  data () {
    return {
      msg:"大数据中心应用系统",
      routerList:[],
      condition:null,
      currentRouterList:[
            {
                pageName:'数据接入情况',
                pagePath:'DataAccessSituation'
            },
            {
                pageName:'数据特征库',
                pagePath:'DataFeatureLibrary'
            },
            {
                pageName:'数据处理记录',
                pagePath:'DataProcessingRecord'
            }
      ]
    }
  },
  created(){
      homeSecondaryPageRouterApi.getSecondaryPageRouterDataList((data)=> {
        this.routerList=data;
        console.log(this.routerList);
      }); 
  },
  methods:{
    //获取路由参数
    getParams:function(){
      this.condition=this.$route.query.condition
    },
    getCurrentRouterList(){
      if(this.condition==1){
        this.currentRouterList=this.routerList.firstGroup;
      }else if(this.condition==2){
        this.currentRouterList=this.routerList.secondGroup;
      }else if(this.condition==3){
        this.currentRouterList=this.routerList.thirdGroup;
      }else if(this.condition==4){
        this.currentRouterList=this.routerList.fourthGroup;
      }else{
        this.currentRouterList=this.routerList.fifthGroup;
      }
      console.log("wo kan kan "+this.currentRouterList);
    }
  },
  mounted(){
    this.getParams()
   // this.getCurrentRouterList()
  },
  watch:{

  }
}
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
.header-li{
  float: left;
  display:inline-block;
  margin:0 10px;
}
.header-li a{
  display: block;
  width:100%;
  font-size:14px;
  line-height:50px;
  color:#fff;
}
.header-li a:hover{
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
</style>
