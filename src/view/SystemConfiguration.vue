<template>
  <div class="system-configuration">
    <h1>{{msg}}</h1>
  </div>
</template>

<script>
export default {
  name: 'SystemConfiguration',
  data () {
    return {
      msg:"系统配置 SystemConfiguration"
    }
  }
}
</script>

<style scoped>
.system-configuration{
  flex:1;
}
</style>
