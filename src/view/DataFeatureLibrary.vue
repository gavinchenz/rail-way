<template>
  <div class="data-feature-library">
    <h1>{{msg}}</h1>
  </div>
</template>

<script>
export default {
  name: 'DataFeatureLibrary',
  data () {
    return {
      msg:"数据特征库 DataFeatureLibrary"
    }
  }
}
</script>

<style scoped>
.data-feature-library{
  flex:1;
}
</style>
