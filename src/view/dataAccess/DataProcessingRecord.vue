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
      <Table class="table-content" border :columns="columns" :data="data"></Table>
      <Page class="table-page" :total="100" show-sizer></Page>
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
      columns: [
        {
            title: '乘车日期',
            key: 'date',
            sortable: true
        },
        {
            title: '车次',
            key: 'trainNumber',
            sortable: true
        },
        {
            title: '发站',
            key: 'departureStation',
            sortable: true
        },
        {
            title: '到站',
            key: 'destination',
            sortable: true
        },
        {
            title: '车厢',
            key: 'carriage',
            sortable: true
        },
        {
            title: '席位',
            key: 'seat',
            sortable: true
        },
        {
            title: '证件类型',
            key: 'certificatesType',
            sortable: true
        },
        {
            title: '证件号',
            key: 'idNumber',
            sortable: true
        },
        {
            title: '姓名',
            key: 'name',
            sortable: true
        },
        {
            title: '售处',
            key: 'sellingPlace',
            sortable: true
        }
      ],
      data: [
        {
            date: 'John Brown',
            trainNumber: 18,
            departureStation: 'New York No. 1 Lake Park',
            destination: '2016-10-03',
            carriage: '2016-10-03',
            seat: '2016-10-03',
            certificatesType: '2016-10-03',
            idNumber: '2016-10-03',
            name: '2016-10-03',
            sellingPlace: '2016-10-03',
        },
        {
            date: 'John Brown',
            trainNumber: 18,
            departureStation: 'New York No. 1 Lake Park',
            destination: '2016-10-03',
            carriage: '2016-10-03',
            seat: '2016-10-03',
            certificatesType: '2016-10-03',
            idNumber: '2016-10-03',
            name: '2016-10-03',
            sellingPlace: '2016-10-03',
        },
        {
            date: 'John Brown',
            trainNumber: 18,
            departureStation: 'New York No. 1 Lake Park',
            destination: '2016-10-03',
            carriage: '2016-10-03',
            seat: '2016-10-03',
            certificatesType: '2016-10-03',
            idNumber: '2016-10-03',
            name: '2016-10-03',
            sellingPlace: '2016-10-03',
        },
        {
            date: 'John Brown',
            trainNumber: 18,
            departureStation: 'New York No. 1 Lake Park',
            destination: '2016-10-03',
            carriage: '2016-10-03',
            seat: '2016-10-03',
            certificatesType: '2016-10-03',
            idNumber: '2016-10-03',
            name: '2016-10-03',
            sellingPlace: '2016-10-03',
        },
        {
            date: 'John Brown',
            trainNumber: 18,
            departureStation: 'New York No. 1 Lake Park',
            destination: '2016-10-03',
            carriage: '2016-10-03',
            seat: '2016-10-03',
            certificatesType: '2016-10-03',
            idNumber: '2016-10-03',
            name: '2016-10-03',
            sellingPlace: '2016-10-03',
        },
        {
            date: 'John Brown',
            trainNumber: 18,
            departureStation: 'New York No. 1 Lake Park',
            destination: '2016-10-03',
            carriage: '2016-10-03',
            seat: '2016-10-03',
            certificatesType: '2016-10-03',
            idNumber: '2016-10-03',
            name: '2016-10-03',
            sellingPlace: '2016-10-03',
        },
        {
            date: 'John Brown',
            trainNumber: 18,
            departureStation: 'New York No. 1 Lake Park',
            destination: '2016-10-03',
            carriage: '2016-10-03',
            seat: '2016-10-03',
            certificatesType: '2016-10-03',
            idNumber: '2016-10-03',
            name: '2016-10-03',
            sellingPlace: '2016-10-03',
        },
        {
            date: 'John Brown',
            trainNumber: 18,
            departureStation: 'New York No. 1 Lake Park',
            destination: '2016-10-03',
            carriage: '2016-10-03',
            seat: '2016-10-03',
            certificatesType: '2016-10-03',
            idNumber: '2016-10-03',
            name: '2016-10-03',
            sellingPlace: '2016-10-03',
        },
        {
            date: 'John Brown',
            trainNumber: 18,
            departureStation: 'New York No. 1 Lake Park',
            destination: '2016-10-03',
            carriage: '2016-10-03',
            seat: '2016-10-03',
            certificatesType: '2016-10-03',
            idNumber: '2016-10-03',
            name: '2016-10-03',
            sellingPlace: '2016-10-03',
        }
      ]
    }
  }
};
</script>

<style scoped lang="scss">
.header-box{
  height:100px;
}
</style>
