<style lang="less">
  .logSearch{
    .ivu-form-item {
      margin-bottom: 2px;
      margin-top: 10px;
    }
  }
</style>
<template>
  <div class="panel-body logSearch">
      <Form class="searchInfo" ref="searchInfo" :model="searchInfo" inline>
        <Row>
          <Col span="4">
            <FormItem :label-width="70" label="业务系统">
              <Input v-model="searchInfo.log.sysName" placeholder="业务系统"  size="small"/>
            </FormItem>
          </Col>
          <Col span="4">
            <FormItem :label-width="70" label="案件名称">
              <Input v-model="searchInfo.log.caseName" placeholder="案件名称" size="small"/>
            </FormItem>
          </Col>
          <Col span="4">
            <FormItem :label-width="70" label="操作目标">
              <Input v-model="searchInfo.log.goal" placeholder="操作目标" size="small"/>
            </FormItem>
          </Col>
          <Col span="4">
            <FormItem :label-width="70" label="操作用户">
              <Input v-model="searchInfo.log.userName" placeholder="操作用户" size="small"/>
            </FormItem>
          </Col>
          <Col span="4">
            <FormItem :label-width="70" label="操作IP">
              <Input v-model="searchInfo.log.ip" placeholder="操作IP" size="small"/>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="4">
            <Form-item :label-width="70" label="开始日期">
              <Date-picker :editable="false" format="yyyy-MM-dd" type="date" style="width: 86%" v-model="searchInfo.log.beginDate" placeholder="开始日期"
                          size="small"></Date-picker>
            </Form-item>
          </Col>
          <Col span="4">
            <Form-item :label-width="70" label="结束日期">
              <Date-picker :editable="false" format="yyyy-MM-dd" type="date" style="width: 86%" v-model="searchInfo.log.endDate" placeholder="结束日期"
                           size="small"></Date-picker>
            </Form-item>
          </Col>
          <Col span="16">
            <FormItem>
              <Button type="primary" @click="search" icon="ios-search" size="small">搜索</Button>
              <Button type="ghost" @click="resat" icon="refresh" size="small"> 重置</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Row>
  </div>
</template>
<script>
  export default {
    name: 'LogSearch',
    props: {
      searchInfo: Object
    },
    data () {
      return {
      }
    },
    methods: {
      search(){
        this.$emit('search', this.searchInfo);
      },

      resat() {
        this.searchInfo.log = {
          userName: '',
          goal: '',
          ip: '',
          caseName: '',
          sysName: '',
          beginDate:'',
          endDate:''
        };
        this.$emit('search', this.searchInfo);
      }
    }
  }
</script>
