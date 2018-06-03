<template>
  <div class="warning-push">
    <h1>{{msg}}</h1>
  </div>
</template>

<script>
export default {
  name: 'WarningPush',
  data () {
    return {
      msg:"预警告警推送 WarningPush"
    }
  }
}
</script>

<style scoped>
.warning-push{
  flex:1;
}
</style>
