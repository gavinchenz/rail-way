<template>
   <div class="vue-body">
    <Breadcrumb class="router-box">
        <BreadcrumbItem to="index">首页</BreadcrumbItem>
        <BreadcrumbItem to="/DataAccess?condition=1">数据分析</BreadcrumbItem>
        <BreadcrumbItem>数据接入及处理记录</BreadcrumbItem>
    </Breadcrumb>
    <div class="header-box">
      <ul class="data-processing-record">
        <li class="header-li">
          <label class="tit-label">数据日期</label>
          <Input class="tit-input" v-model="dataDate" placeholder="请输入数据日期" clearable style="width: 200px"></Input>
          <Button class="btn" type="primary">查询</Button>
          <Button class="btn" type="ghost">重置</Button>
        </li>
      </ul>
    </div>
    <div class="table-box">
        <Table  class="table-content" border :data="tableData" :columns="tableColumns" :loading="loading"></Table>
            <div style="margin: 10px;overflow: hidden">
                <div style="float: left;">
                    <Page class="table-page" :total="100" :current="1" @on-change="changePage"></Page>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataProcessingRecord',
  components:{

  },
  data () {
    return {
      dataDate: '',
            loading: false,
            tableData: this.mockTableData(),
            tableColumns: [
            {
                title: '数据日期',
                key: 'date', 
                sortable: true           
            },
            {
                title: '数据类型',
                key: 'dataType',
                sortable: true
            },
            {
                title: '数据数据(M)',
                key: 'dataes',
                sortable: true
            },
            {
                title: '清洗状态',
                key: 'cleaningState',
                sortable: true
            },
            {
                title: '清洗数据量',
                key: 'cleaningAmount',
                sortable: true
            },
            {
                title: '清洗时间',
                key: 'cleaningTime',
                sortable: true
            },
            {
                title: '入库数据量',
                key: 'warehouseDataVolume',
                sortable: true
            },
            {
                title: '入库时间',
                key: 'warehouseDataTime',
                sortable: true
            },
            {
                title: '入库条数',
                key: 'warehouseDataAmount',
                sortable: true
            }
          ]    
        }
    },
    methods: {
        mockTableData () {
            let data = [];
            for (let i = 0; i < 10; i++) {
                data.push({
                        date:new Date().toLocaleString(),
                        dataType: "是",
                        dataes:800,
                        cleaningState:new Date().toLocaleString(),
                        cleaningAmount:350,
                        cleaningTime:new Date().toLocaleString(),
                        warehouseDataVolume:350,
                        warehouseDataTime:new Date().toLocaleString(),
                        warehouseDataAmount: 352150
                    },
                    {
                        date:new Date().toLocaleString(),
                        dataType: "是",
                        dataes:800,
                        cleaningState:new Date().toLocaleString(),
                        cleaningAmount:350,
                        cleaningTime:new Date().toLocaleString(),
                        warehouseDataVolume:350,
                        warehouseDataTime:new Date().toLocaleString(),
                        warehouseDataAmount: 352150
                    },
                    {
                        date:new Date().toLocaleString(),
                        dataType: "是",
                        dataes:800,
                        cleaningState:new Date().toLocaleString(),
                        cleaningAmount:350,
                        cleaningTime:new Date().toLocaleString(),
                        warehouseDataVolume:350,
                        warehouseDataTime:new Date().toLocaleString(),
                        warehouseDataAmount: 352150
                    },
                    {
                        date:new Date().toLocaleString(),
                        dataType: "是",
                        dataes:800,
                        cleaningState:new Date().toLocaleString(),
                        cleaningAmount:350,
                        cleaningTime:new Date().toLocaleString(),
                        warehouseDataVolume:350,
                        warehouseDataTime:new Date().toLocaleString(),
                        warehouseDataAmount: 352150
                    },
                    {
                        date:new Date().toLocaleString(),
                        dataType: "是",
                        dataes:800,
                        cleaningState:new Date().toLocaleString(),
                        cleaningAmount:350,
                        cleaningTime:new Date().toLocaleString(),
                        warehouseDataVolume:350,
                        warehouseDataTime:new Date().toLocaleString(),
                        warehouseDataAmount: 352150
                    },
                    {
                        date:new Date().toLocaleString(),
                        dataType: "是",
                        dataes:800,
                        cleaningState:new Date().toLocaleString(),
                        cleaningAmount:350,
                        cleaningTime:new Date().toLocaleString(),
                        warehouseDataVolume:350,
                        warehouseDataTime:new Date().toLocaleString(),
                        warehouseDataAmount: 352150
                    },
                    {
                        date:new Date().toLocaleString(),
                        dataType: "是",
                        dataes:800,
                        cleaningState:new Date().toLocaleString(),
                        cleaningAmount:350,
                        cleaningTime:new Date().toLocaleString(),
                        warehouseDataVolume:350,
                        warehouseDataTime:new Date().toLocaleString(),
                        warehouseDataAmount: 352150
                    },
                    {
                        date:new Date().toLocaleString(),
                        dataType: "是",
                        dataes:800,
                        cleaningState:new Date().toLocaleString(),
                        cleaningAmount:350,
                        cleaningTime:new Date().toLocaleString(),
                        warehouseDataVolume:350,
                        warehouseDataTime:new Date().toLocaleString(),
                        warehouseDataAmount: 352150
                })
            }
            return data;
        },
        changePage () {
            // 这里直接改变模拟数据，实际使用场景应该从服务器获取数据。
            this.tableData = this.mockTableData();
        }
    }
}
</script>

<style scoped >
.header-box{
  height:100px;
}
</style>
