<template>
  <div class="data-processing-record">
    <h1>{{msg}}</h1>
  </div>
</template>

<script>
export default {
  name: 'DataProcessingRecord',
  data () {
    return {
      msg:"数据处理记录 DataProcessingRecord"
    }
  }
};
</script>

<style scoped>
.data-processing-record{
  flex:1;
}
</style>
