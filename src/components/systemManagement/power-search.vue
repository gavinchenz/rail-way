<style lang="less">
  .powerSearchBox{
    margin-top: 20px;
    .ivu-form-inline .ivu-form-item{
      margin-bottom: 0;
    }
  }
</style>
<template>
  <div class="powerSearchBox">
      <Form class="searchInfo" ref="searchInfo" :model="searchInfo" inline>
        <Row>
          <Col span="4">
          <FormItem :label-width="70" label="权限名称">
            <Input v-model="searchInfo.operGroup.gname" placeholder="权限名称" size="small"/>
          </FormItem>
          </Col>
          <Col span="6">
          <FormItem>
            <Button type="primary" @click="search" icon="ios-search" size="small">搜索</Button>
            <Button type="ghost" @click="resat" icon="refresh" size="small" style="margin-left: 10px;"> 重置</Button>
          </FormItem>
          </Col>
        </Row>
        <Row style="marginTop: 10px">
          <Col  span="6" style="text-align: left">
            <FormItem :label-width="50">
              <Button @click="addPower" type="success"  icon="plus" title="新增权限" size="small" >新增</Button> //:disabled="!$store.state.auth.has('1-1-1-13')"
            </FormItem>
          </Col>
        </Row>
      </Form>
  </div>
</template>
<script>
  export default {
    name: 'PowerSearch',
    props: {
      searchInfo: Object
    },
    data () {
      return {
      }
    },
    methods: {
      addPower(){
        this.$emit('addPower');
      },
      search(){
        if (!!this.searchInfo.operGroup.gname) {
          this.$emit('search', this.searchInfo.operGroup.gname);
        } else {
          this.$Message.info('请输入查询条件')
        }
      },

      resat() {
        this.searchInfo.operGroup.gname = ''
        this.$emit('search', this.searchInfo.operGroup.gname);
      }
    }
  }
</script>
