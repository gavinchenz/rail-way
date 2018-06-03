<template>
  <div class="law-enforcement-log">
    <h1>{{msg}}</h1>
  </div>
</template>

<script>
export default {
  name: 'LawEnforcementLog',
  data () {
    return {
      msg:"执法日志 LawEnforcementLog"
    }
  }
}
</script>

<style scoped>
.law-enforcement-log{
  flex:1;
}
</style>