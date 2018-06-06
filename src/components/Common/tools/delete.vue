<template>
  <Modal v-model="modalDel" width="360">
    <p slot="header" style="color:#f60;text-align:center">
      <Icon type="information-circled"></Icon>
      <span>删除确认</span>
    </p>
    <div style="text-align:center">
      <p>删除后将无法恢复，是否继续删除？</p>
    </div>
    <div slot="footer">
      <Button type="error" size="large" long  @click="delFile(fileId)">删除</Button>
    </div>
  </Modal>
</template>
<script>
  export default {
    name: 'Paging',
    props: {
      modalDel: Boolean,
      fileId: String
    },
    data () {
      return {
        pageSize: 20
      }
    },

    methods: {
      delFile(fileId){
        this.$emit('delFile', fileId);
      }
    }
  }
</script>
