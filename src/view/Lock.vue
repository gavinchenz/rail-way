<template>
  <div class="lock-container pull-height">
    <div class="lock-form animated bounceInDown">
      <div class="animated" :class="{'shake':passwdError,'bounceOut':pass}">
<!--         <h3 class="text-white">{{name}}</h3> -->
        <Input placeholder="请输入登录密码" type="password" class="input-with-select animated" v-model="passwd" @keyup.enter.native="handleLogin" style="width: 200px">
        </Input>
        <Button type="ghost" icon="android-unlock" @click="handleLogin"></Button>
        <Button type="ghost" icon="android-exit" @click="handleLogout"></Button>
      </div>

    </div>
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'lock',
  data() {
    return {
      passwd: '',
      passwdError: false,
      pass: false
    }
  },
  created() {},
  mounted() {
    
  },
  computed: {
    ...mapState({
      name: state => state.user.name
    }),
    ...mapGetters(['tag', 'lockPasswd'])
  },
  props: [],
  methods: {
    handleLogout() {
      this.$Modal.confirm({
          title:'提示',
          content:'<p>是否退出系统, 是否继续?</p>', 
          onOK:()=>{
              return true//???
          }
        })
        .then(() => {
        this.$store.dispatch('LogOut')
        .then(() => {
          this.$router.push({ path: '/login' })
        })
      }).catch(() => {
        return false
      })
    },
    handleLogin() {
      if (this.passwd !== this.lockPasswd) {
        this.passwd = ''
        this.$Message.error('解锁密码错误,请重新输入')
        this.passwdError = true
        setTimeout(() => {
          this.passwdError = false
        }, 1000)
        return
      }
      this.pass = true
      setTimeout(() => {
        this.$store.commit('CLEAR_LOCK')
        this.$router.push('/index')
      }, 1000)
    }
  },
  components: {}
};
</script>

<style scoped>
.lock-container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.lock-container::before {
  z-index: -999;
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: url("../assets/images/lockLogin.png");
  background-size: cover;
}
.lock-form {
  width: 300px;
}
</style>