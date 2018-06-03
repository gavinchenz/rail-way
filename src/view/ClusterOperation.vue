<template>
  <div class="cluster-operation">
    <h1>{{msg}}</h1>
  </div>
</template>

<script>
export default {
  name: 'ClusterOperation',
  data () {
    return {
      msg:"集群运行 ClusterOperation"
    }
  }
}
</script>

<style scoped>
.cluster-operation{
  flex:1;
}
</style>
