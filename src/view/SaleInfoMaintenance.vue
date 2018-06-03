<template>
  <div class="sale-info-maintenance">
    <h1>{{msg}}</h1>
  </div>
</template>

<script>
export default {
  name: 'SaleInfoMaintenance',
  data () {
    return {
      msg:"售处信息维护 SaleInfoMaintenance"
    }
  }
}
</script>

<style scoped>
.sale-info-maintenance{
  flex:1;
}
</style>
