<template>
  <div class="my-home">
   <div class="home-header">
      <a class="login-a" href="javascript:;">
        <img id="login-img" src="../assets/images/login1.png"/>
        <p id="login-p">{{msg}}</p>
      </a>
      <ul class="header-ul">
        <li class="header-li" v-for="item in routerList.firstGroup" :key="item.pageName" >
          <a :href="item.pagePath" class="header-a">{{item.pageName}}</a>
        </li>
      </ul>
      <div class="header-right">
        <span class="right-btn fullScreen">全屏</span>
        <span class="right-btn lockScreen" @click="getCurrentRouterList($route.query.condition)">锁屏</span>
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
      currentRouterList:[
            {
                pageName:'数据接入情况',
                pagePath:'Home/DataAccessSituation'
            },
            {
                pageName:'数据特征库',
                pagePath:'Home/DataFeatureLibrary'
            },
            {
                pageName:'数据处理记录',
                pagePath:'Home/DataFeatureLibrary'
            }
      ],
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
      console.log(this.$route.query.id)
      console.log(this.id)
    },
    getCurrentRouterList(index){
      console.log("index="+index);
      if(index==1){
        that.currentRouterList=that.routerList.firstGroup;
      }else if(index==2){
        that.currentRouterList=that.routerList.secondGroup;
      }else if(index==3){
        that.currentRouterList=that.routerList.thirdGroup;
      }else if(index==4){
        that.currentRouterList=that.routerList.fourthGroup;
      }else{
        that.currentRouterList=that.routerList.fifthGroup;
      }
      console.log("wo kan kan "+that.currentRouterList);
    }
  },
  mounted:function(){
    this.getParams
    this.getCurrentRouterList
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
