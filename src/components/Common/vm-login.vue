<style lang="less" scoped>
  .ivu-btn-primary{
    font-size: 16px;
    background-color: #2d5ba6;
    border-color: #2d5ba6;
    color: #ffffff;
    &:hover{
      background-color: green;
      border-color: green;
      color: #ffffff;      
    }    
  }
  .ivu-row{
    height:100% !important;
  }
</style>

<template>
  <Row class="vm-login vm-panel">

    <Col span="24" class="login-ad">
      <Col span="7" class="login-form" style="background:rgba(255, 255, 255, 0.3);height:100%;padding:0px 40px;float:right;">
        <div class="login-header mart15b">
          <img src="../../assets/img/o.png" height="130" alt="">
          <p style="font-size: 24px;color: #fff;">用户管理系统</p>
        </div>

        <div class="login-form">
          <Input v-model="username" :maxlength="20" placeholder="请输入用户名"/>
          <Input v-model="password" type="password" :maxlength="20" placeholder="请输入密码"/>
        </div>
        <div class="login-footer" style="display:none">
          <Checkbox v-model="remenber">记住密码</Checkbox>
          <!--<span class="forget"><a href="#">忘记密码？</a></span>-->
        </div>
              
        <div class="login-form mart40">
          <Button type="primary" @click='isLogin'>登陆</Button>
        </div>
        
        <div class="login-form" style="position:fixed;bottom:15px;text-align: center;width:100%;color:#fff;left:0;margin-left: -13%;">
          <p>© 西安九索数据 2017-2017 </p>
        </div>
      </Col>
    </Col>

  </Row>
</template>
<script>
  import {mapState,mapActions,mapMutations} from 'vuex'
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
      ...mapActions([
        'getDictGroups'
      ]),

      async isLogin () {
        if (!this.username || !this.password) {
          let msg = !!this.username ? `请输入密码!` : `请输入用户名!`;
          return this.$Modal.error(msg);
        }
        await accountLogin(this.username,this.password,this.remenber)
          .then(loginInfo => {
            
            if(loginInfo.statusCode !== 200) return process_error(loginInfo);

            let userInfo = loginInfo.sysUserVo; // 用户信息
            let authInfo = loginInfo.sysResourceCodesList; // 资源信息
            sessionStorage.setItem('token', loginInfo.jwtToken);
            this.SET_USERINFO(userInfo);
            this.CHANGE_LOGIN_STATUS(true);
            this.SET_AUTH(authInfo);

            this.getDictGroups();
            this.loginSign = 1;
            this.$router.push({path: "/home"});
          })
          .catch(err => console.log(err))
        
      }
    },
    mounted(){
      document.onkeydown = (e) => {
        if (e.keyCode === 13 && this.loginSign === 0) this.isLogin();
      }
      
    }
  };
</script>
