<template>
  <div class="my-login">
    <header id="login-header">
      <a class="login-a" href="javascript:;">
        <img id="login-img" src="../assets/images/login1.png"/>
        <p id="login-p">{{msg}}</p>
      </a>
    </header>
    <form class="login-t" action="/index">
      <h5 class="f-h5" v-text="loginTit"></h5>
      <ul class="f-ul">
        <li class="f-li"  @click="changeTab(0)">用户登录</li>
        <li class="f-li" @click="changeTab(1)">Key登录</li>
      </ul>
      <div class="f-changeBox" :is="tabName">
      </div>
      <footer class="f-footer">
        <p class="f-p">{{technicalTel}}</p>
        <p class="f-p">{{company}}</p>
      </footer>   
    </form> 
  </div>
</template>

<script>
import UserLogin from "../components/Login/UserLogin";
import KeyLogin from "../components/Login/KeyLogin";
export default {
  name: 'Login',
  components:{
    UserLogin,
    KeyLogin
  },
  data () {
    return {
      msg:"大数据中心应用系统",
      technicalTel:"技术支持电话：18502978368",
      company:"西安九索数据技术股份有限公司",
      loginTit:"用户登录",
      tab:0,
      tabName:"user-login"
    }
  },
  methods:{
    changeTab:function(index){
      if(index==0){
        this.loginTit="用户登录";
        this.tabName="user-login";
      }else{
        this.loginTit="Key登录";
        this.tabName="key-login";     
      }
      $(".f-li").eq(index).addClass("borderChange").siblings().removeClass("borderChange");
    }  
  }
};
</script>

<style scoped>
.my-login{
  width:100%;
  height:100%;
  background: url(../assets/images/bg-03.jpg) no-repeat;
  background-size:cover;
}
#login-header{
  width:100%;
  height: 80px;
  padding-top:20px;
}
.login-a{
  width:30%;
  height:100%;
  float:left;
  display: flex;
  justify-content: flex-start;
  padding-left:40px;
}
#login-img{
  width:60px;
  height:60px; 
}
#login-p{
  flex:1;
  height:100%;
  color:#fff;
  font-size:34px;
  text-align: left;
  line-height:54px;
  letter-spacing: 1.5px;
}
.login-t{
  box-sizing: border-box;
    width: 400px;
    height: 500px;
    background: rgba(13, 25, 74, 0.7);
    border: 1px solid rgba(104, 125, 160, 0.7);
    position: absolute;
    z-index: 999;
    right: 305px;
    top: 50%;
    border-radius: 5px;
    margin-top: -250px;
    padding: 25px 45px 45px 45px;
    overflow: hidden;
    box-shadow: 10px 10px 70px rgba(49, 148, 228, 0.5);
}
.f-h5{
  width:100%;
  font-size:20px;
  text-align:left;
  color:#eeeeee;
  font-weight:normal;
}
.f-ul{
  width:70%;
  margin:60px auto 0;
  display: flex;
  justify-content: flex-start;
  font-size:14px;
  color:#eee;
}
.f-li{
  width:50%;
  border-bottom:2px solid #eee;
  cursor: pointer;
  line-height: 35px;
  text-align: center;
}
.borderChange{
  border-bottom:2px solid #007BFF;
}
.f-footer{
  width:100%;
  margin-top:30px;
}
.f-p{
  height: 25px;
  font-size:14px;
  color:#fff;
  line-height: 25px;
  letter-spacing: 1.5px;
  text-align: center;
}
</style>
