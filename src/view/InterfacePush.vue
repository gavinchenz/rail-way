<template>
  <div class="vue-body">
    <div class="panel-heading">
      <Breadcrumb>
        <BreadcrumbItem>系统管理</BreadcrumbItem>
        <BreadcrumbItem>接口推送</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="panel-body">
      <Row>
        <Col span="24">
        <Form ref="searchForm" :model="searchForm" :label-width="80" inline>
          <FormItem label="接口名称">
            <Input type="text" v-model="searchForm.name" size="small" placeholder="接口名称">
            </Input>
          </FormItem>
          <FormItem :label-width="20">
            <Button type="primary" size="small">查询</Button>
            <Button type="ghost" size="small">重置</Button>
          </FormItem>
        </Form>
        </Col>
      </Row>
      <Table height="700" :columns="columns" :data="data" size="small" style="margin-top: 5px" stripe></Table><br>
      <Page :total="100" show-sizer size="small" :page-size="20" show-total></Page>
    </div>
  </div>
</template>

<script>
  import interfacePushApi from '../api/interfacePushApi'
  export default {
    name: 'InterfacePush',
    data () {
      return {
        searchForm:{
          caseType:'',
          name:''
        },
        columns:[
          //{type: 'selection',width: 60, align: 'center'},
          {type: 'index',title:'序号',width: 60,align: 'center'},
          {title: '接口名称',key: 'name'},
          {title: '接口类型',key: 'type'},
          {title: '是否推送',key: 'isPush'},
          {title: '推送时间',key: 'pushTime'}
        ],
        data:[],
      }
    },
    created(){
      interfacePushApi.getInterfacePushList((data)=> {
        this.data=data;
      });     
    },     
    methods:{}
  }
</script>

<style scoped>
  .case-management{
    height:100%;
  }
</style>
