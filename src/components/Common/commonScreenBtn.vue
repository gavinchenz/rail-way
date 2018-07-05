<template>
  <div class="header-right">
    <span class="right-btn"  v-if='flag' @click='launchFullscreen'>全屏</span>
    <span class="right-btn"  v-else @click='exitFullscreen'>退出全屏</span>
    <span class="right-btn" @click='handleLock'>锁屏</span>
    <span class="right-btn" @click="signOut">退出</span>
    <!-- 锁屏 -->
    <Modal v-model="addModal" width="400" @on-cancel="coloseModal('addForm')">
      <p slot="header">
        <span class="titleColor">设置锁屏密码</span>
      </p>
      <Form :model="form"  ref="addForm"> <!-- ref="form" -->
        <FormItem label="锁屏密码" prop="passwd" :rules="[{ required: true, message: '锁屏密码不能为空'}]">
          <Input v-model="form.passwd" placeholder="请输入锁屏密码"/>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" @click="handleSetLock">保存</Button>
      </div>
    </Modal>    
  </div>
</template>

<script>
import { validatenull } from '@/utils/validate'
import { mapGetters } from 'vuex'
// import {logout} from '@/service/getData';
export default {
  name: 'CommonScreenBtn',
  data () {
    return {
      flag:true,
      addModal:false,
      form: {
        passwd: ''
      }      
    }
  },
  computed: {
    ...mapGetters(['lockPasswd'])
  },  
  methods:{
    //全屏
    launchFullscreen(){
      var domElement=document.documentElement;
      if(domElement.requestFullscreen){
        domElement.requestFullscreen();
      }else if(domElement.mozRequestFullScreen){
        domElement.mozRequestFullScreen();
      }else if(domElement.msRequestFullscreen){
        domElement.msRequestFullscreen();
      }else if(domElement.webkitRequestFullscreen){
        domElement.webkitRequestFullscreen();
      }
      this.flag = false;
    },
    //退出全屏
    exitFullscreen(){
      if (document.exitFullscreen) {
          document.exitFullscreen();
      }
      else if (document.msExitFullscreen) {
          document.msExitFullscreen();
      }
      else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
      }
      else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
      }
      this.flag = true;
    },
    //锁屏
    handleSetLock() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.$store.commit('SET_LOCK_PASSWD', this.form.passwd)
          this.handleLock()
        }
      })
    },
    handleLock() {
      if (validatenull(this.lockPasswd)) {
        this.addModal = true
        return
      }
      this.$store.commit('SET_LOCK')
      setTimeout(() => {
        this.$router.push({ path: '/lock' })
      }, 100)
    },
    //退出页面
    signOut(){
      sessionStorage.setItem('token', '');
      return window.close();
    }
    // async signOut(){
    //   sessionStorage.setItem('token', '');
    //   await logout();
    //   return window.close();
    // }
  },
  mounted(){
    this.launchFullscreen();
    this.exitFullscreen();
    // this.lockScreen();
    // this.signOut();
  }
};
</script>

<style scoped>
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
</style>
