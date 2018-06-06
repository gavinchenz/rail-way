<template>
  <Alert type="warning" show-icon>
    <p style="text-align: left">温馨提示</p>
    <template slot="desc">
      <span v-if="$store.state.auth.size <= 0">
         <span>您没有权限查看 <b>案件中心</b> 请联系管理员分配权限！</span>
         <a class="backToLogin" @click="backPage('login')">返回到首页</a>
      </span>
      <p v-else>
        <span v-if="viewMenu">您没有权限查看该页面</span>
        <span v-else>
          您没有权限查看该系统
          <a class="backToLogin" @click="backPage('login')">返回到平台首页</a>
        </span>
      </p>
    </template>
  </Alert>
</template>

<script>
  import {getStore} from '@/config/mUtils'
  export default {
    name: "NoPermission",
    data(){
      return {
        menuAuth:['1-1-1-1','1-1-4-1','1-1-5-1'],
        authList:[],
        viewMenu:true
      }
    },
    methods:{
      backPage () {
        let redirectUrl = `http://${window.location.hostname}/login`;
        return window.location.href = redirectUrl;
      }
    },
    mounted(){
      this.authList = JSON.parse(getStore('auth')) || [];
      this.viewMenu = this.menuAuth.some(v => this.authList.indexOf(v) >= 0)
    }
  }
</script>
