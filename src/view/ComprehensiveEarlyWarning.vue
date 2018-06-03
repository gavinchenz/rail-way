<template>
  <div class="comprehensive-early-warning">
    <H1>{{msg}}</H1>
  </div>
</template>

<script>
export default {
  name: 'ComprehensiveEarlyWarning',
  data () {
    return {
      msg:"综合预警 ComprehensiveEarlyWarning"
    }
  }
}
</script>

<style scoped>
.comprehensive-early-warning{
  flex:1;
}
</style>
