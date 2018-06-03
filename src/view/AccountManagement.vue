<template>
  <div class="account-management">
    <h1>{{msg}}</h1>
  </div>
</template>

<script>
export default {
  name: 'AccountManagement',
  data () {
    return {
      msg:"账号管理 AccountManagement"
    }
  }
}
</script>

<style scoped>
.account-management{
    flex:1;
}
</style>
