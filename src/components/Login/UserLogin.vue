<template>
  <div class="user-login">
    <input type="text" class="user-input" placeholder="请输入用户名" v-model="username"/>
    <input type="password" class="user-input" placeholder="请输入密码" v-model="password"/>
    <span class="user-spanMsg"></span>
    <div class="login-form mart40">
      <Button type="primary" @click='isLogin' class='user-btn'>登录</Button>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import {accountLogin,getDictGroups} from '@/service/getData'
import {process_error} from '@/config/process_request_conf'
export default {
  name: "VmLogin",
  data() {
    return {
      username: "",
      password: "",
      remenber: false,
      loginSign:0
    };
  },
  methods: {
    ...mapMutations([
      'CHANGE_LOGIN_STATUS',
      'SET_USERINFO',
      'SET_AUTH',
      'SET_DICT_GROUPS'
    ]),
   /* ...mapActions([
      'getDictGroups'
    ]),*/

    async isLogin () {
      //登录验证
      if (!this.username || !this.password) {
        let msg = !!this.username ? `请输入密码!` : `请输入用户名!`;
        return this.$Message.error(msg);
      }
      await accountLogin(this.username,this.password,this.remenber)
        .then(loginInfo => {
          if(loginInfo.statusCode !== 200) return process_error(loginInfo);
          let userInfo = loginInfo.data; // 用户信息
          let authInfo = loginInfo.data.ocodeList; // 资源信息
          //根据store中set_token方法将token保存至localStorage/sessionStorage中，data["Authentication-Token"]，获取token的value值
          // this.$store.commit('set_token', data["Authentication-Token"]);
          sessionStorage.setItem('token', loginInfo.data.cardId);//保存token
          this.SET_USERINFO(userInfo);// loginInfo.data
          this.CHANGE_LOGIN_STATUS(true);
          this.SET_AUTH(authInfo);//loginInfo.data.ocodeList
        /*this.getDictGroups();*/
          this.loginSign = 1;
          this.$router.push({path: "/index"});

          // if (store.state.token) {
          // this.$router.push('/index')
          // console.log(store.state.token)
          // } else {
          // this.$router.replace('/login');
          // }
        })
        .catch(err =>{
          // this.loginSign = 0;
          // this.$Message.error('账号或密码错误');
          console.log(err)
        })
    }
  },
  mounted(){
    document.onkeydown = (e) => {
      if (e.keyCode === 13 && this.loginSign === 0) this.isLogin();
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
.mart40{
  text-align:center;
}
.user-btn{
  width:250px;
  display:inline-block;
}
.user-spanMsg{
  height: 10px;
  font-size:10px;
  color:#FF6F66;
  letter-spacing: 1px;
}
</style>
