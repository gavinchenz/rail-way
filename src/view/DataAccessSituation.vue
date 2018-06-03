<template>
  <div class="data-access-situation">
    <h1>{{msg}}</h1>
  </div>
</template>

<script>
export default {
  name: 'DataAccessSituation',
  data () {
    return {
      msg:"数据接入情况 DataAccessSituation"
    }
  }
}
</script>

<style scoped>
.data-access-situation{
  flex:1;
}
</style>
