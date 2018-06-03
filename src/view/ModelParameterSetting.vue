<template>
  <div class="model-parameter-setting">
    <h1>{{msg}}</h1>
  </div>
</template>

<script>
export default {
  name: 'ModelParameterSetting',
  data () {
    return {
      msg:"模型参数设置 ModelParameterSetting"
    }
  }
}
</script>

<style scoped>
.model-parameter-setting{
  flex:1;
}
</style>
