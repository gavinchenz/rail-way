<template>
  <div class="interface-push">
    <h1>{{msg}}</h1>
  </div>
</template>

<script>
export default {
  name: 'InterfacePush',
  data () {
    return {
      msg:"接口推送 InterfacePush"
    }
  }
}
</script>

<style scoped>
.interface-push{
  flex:1;
}
</style>
