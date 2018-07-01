<template>
  <div class="vue-body">
    <Breadcrumb class="router-box">
        <BreadcrumbItem to="/index">首页</BreadcrumbItem>
        <BreadcrumbItem to="/SystemManagement?condition=5">系统管理</BreadcrumbItem>
        <BreadcrumbItem>集群运行</BreadcrumbItem>
    </Breadcrumb> 
    <div class="panel-body">
      <Row>
        <Col span="24">
        <Form ref="searchForm" :model="searchForm" :label-width="80" inline>
          <FormItem label="机器名称">
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
  // import clusterOperationApi from '../../api/clusterOperationApi';
  export default {
    name: 'ClusterOperation',
    data () {
      return {
        searchForm:{
          caseType:'',
          name:''
        },
        columns:[
          //{type: 'selection',width: 60, align: 'center'},
          {type: 'index',title:'序号',width: 60,align: 'center'},
          {title: '机器名称',key: 'name'},
          {title: '机器ip',key: 'type'},
          {title: '硬盘容量(T)',key: 'cdCapacity'},
          {title: '硬盘使用(T)',key: 'cdUse'},
          {title: 'CPU容量(T)',key: 'cupCapacity'},
          {title: 'CPU使用(T)',key: 'cupCapacityUse'}
        ],
        data:[],
      }
    },
    created(){
      clusterOperationApi.getClusterOperationList((data)=> {
        this.data=data;
      });     
    },      
    methods:{}
  }
</script>

<style scoped>
.router-box{
  border-bottom: 1px solid #eeeff1;
}
</style>
