<template>
  <div class="case-management">
    <h1>{{msg}}</h1>
  </div>
</template>

<script>
export default {
  name: 'CaseManagement',
  data () {
    return {
      msg:"案件管理 CaseManagement"
    }
  }
}
</script>

<style scoped>
.case-management{
  flex:1;
}
</style>
