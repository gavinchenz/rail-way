<template>
  <div class="window-info-maintenance">
    <h1>{{msg}}</h1>
  </div>
</template>

<script>
export default {
  name: 'WindowInfoMaintenance',
  data () {
    return {
      msg:"窗口信息维护 WindowInfoMaintenance"
    }
  }
}
</script>

<style scoped>
.window-info-maintenance{
  flex:1;
}
</style>
