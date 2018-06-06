<style lang="less" scoped>

</style>
<template>
  <Row type="flex" justify="space-between" class="footer">
    <div class="page">
      <Page :total="pages.totalElements" :current="pages.pageNumber" :page-size="pages.size"
            @on-change="pageChange" @on-page-size-change="updateDataShow" show-total show-sizer size="small"></Page>
    </div>
  </Row>
</template>
<script>
  export default {
    name: 'Paging',
    props:{pages:Object},
    data () {
      return {}
    },

    methods: {
      // 页数改变
      pageChange(index) {
        this.pages.pageNumber = this.pages.number = index;
        this.$emit('pageChange', this.pages)
      },

      // 更新显示(每页条数改变)
      updateDataShow(pageSize) {
        this.pages.size = pageSize;
        this.$emit('pageChange', this.pages)
      }
    },
  }
</script>

