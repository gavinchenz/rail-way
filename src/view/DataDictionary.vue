<template>
  <div class="data-dictionary">
    <h1>{{msg}}</h1>
  </div>
</template>

<script>
export default {
  name: 'DataDictionary',
  data () {
    return {
      msg:"数据字典 DataDictionary"
    }
  }
}
</script>

<style scoped>
.data-dictionary{
  flex:1;
}
</style>
