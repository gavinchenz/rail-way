<template>
  <div class="intermediate-library">
    <h1>{{msg}}</h1>
  </div>
</template>

<script>
export default {
  name: 'IntermediateLibrary',
  data () {
    return {
      msg:"中间库 IntermediateLibrary"
    }
  }
}
</script>

<style scoped>
.intermediate-library{
  flex:1;
}
</style>
