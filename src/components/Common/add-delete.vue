<template>
   <div class="btn-box">
    <Button class="commom-btn" type="success" icon="plus">新增</Button>
    <Button class="commom-btn" type="warning" icon="trash-a">批量删除</Button>
  </div>
</template>

<script>
export default {
  name: 'add-delete',
  components:{

  },
  data () {
    return {
      msg:"售处信息维护 SaleInfoMaintenance"
    }
  }
};
</script>

<style scoped>
.btn-box{
  height:50px;
}
</style>
