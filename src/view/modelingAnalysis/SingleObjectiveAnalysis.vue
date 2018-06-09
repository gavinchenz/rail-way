<template>
  <div class="single-objective-analysis">
    <h1>{{msg}}</h1>
  </div>
</template>

<script>
export default {
  name: 'SingleObjectiveAnalysis',
  data () {
    return {
      msg:"单目标分析 SingleObjectiveAnalysis"
    }
  }
}
</script>

<style scoped>
.single-objective-analysis{
  flex:1;
}
</style>
