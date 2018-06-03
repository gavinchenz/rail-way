<template>
  <div class="authirity-management">
    <h1>{{msg}}</h1>
  </div>
</template>

<script>
export default {
  name: 'AuthirityManagement',
  data () {
    return {
      msg:"权限管理 AuthirityManagement"
    }
  }
}
</script>

<style scoped>
.authirity-management{
  flex:1;
}
</style>
