<template>
  <div class="user-login">
    <input type="text" class="user-input" placeholder="请输入用户名" v-model="userName" @blur="isAccoed()"/>
    <input type="password" class="user-input" placeholder="请输入密码" v-model="userPass" @blur="isAccoed()"/>
    <span class="user-spanMsg">{{spanMsg}}</span>
    <input class="user-btn" type="submit" value="登录" @click.once="getUserId()"/>
  </div>
</template>

<script>
export default {
  name: 'UserLogin',
  data () {
    return {
      userName:"",
      userPass:"",
      spanMsg:""
    }
  },
  methods:{
    isAccoed:function(){
      if(this.userName=="" || this.userName=="请输入用户名"){
        this.spanMsg="请输入用户名";
      }else if(this.userPass=="" || this.userPass=="请输入密码"){
        this.spanMsg="请输入密码";
      }else{
        this.spanMsg="";
      }
    },
    getUserId:function(){

    }
  }
};
</script>

<style scoped>
.user-login {
  width:85%;
  height:240px;
  margin:0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  box-sizing: border-box;
  padding-top:30px;
}
.user-input{
  height: 38px;
  border:1px solid #6F95DE;
  border-radius: 8px;
  text-indent: 10px;
  line-height:38px;
  font-size:12px; 
  background: rgba(30, 35, 94, 0.5);
  color:#fff;
  outline:none;
  box-shadow:0 0 3px 2px #4065A0;
  margin-bottom:20px;
}
.user-btn{
  height: 38px;
  line-height:38px;
  font-size:16px;
  color:#fff;
  outline:none;
  background: #007BFF;
  border:none;
  border-radius: 8px;
  cursor: pointer;
  letter-spacing: 15px;
}
.user-spanMsg{
  height: 10px;
  font-size:10px;
  color:#FF6F66;
  letter-spacing: 1px;
}
</style>
