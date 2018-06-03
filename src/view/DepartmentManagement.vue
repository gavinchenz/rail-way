<template>
  <div class="department-management">
    <h1>{{msg}}</h1>
  </div>
</template>

<script>
export default {
  name: 'DepartmentManagement',
  data () {
    return {
      msg:"部门管理 DepartmentManagement"
    }
  }
}
</script>

<style scoped>
.department-management{
  flex:1;
}
</style>
