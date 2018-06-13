<template>
   <div class="vue-body">
    <Breadcrumb class="router-box">
        <BreadcrumbItem to="index">首页</BreadcrumbItem>
        <BreadcrumbItem to="/ComprehensiveQuery?condition=2">综合查询</BreadcrumbItem>
        <BreadcrumbItem>窗口信息维护</BreadcrumbItem>
    </Breadcrumb>
    <Form :model="formItem" class="header-from">s
        <FormItem class="form-item">
            <Row :gutter="16">
                <Col span="2" class="col-label">售处编号</Col>
                <Col span="4">
                    <Input v-model="formItem.SaleNumber" placeholder="请输入售处编号" clearable></Input>
                </Col>
                <Col span="2" class="col-label">售处名称</Col>
                <Col span="4">
                    <Input v-model="formItem.SaleName" placeholder="请输入售处名称" clearable></Input>
                </Col>
                <Col span="2" class="col-label">售处站名</Col>
                <Col span="4">
                    <Input v-model="formItem.SaleStationName" placeholder="请输入售处站名" clearable></Input>
                </Col>
                <Col span="2" class="col-label">
                    <Button type="primary" icon="ios-search" @click="getSearch" >查询</Button>
                </Col>
                <Col span="2" class="col-label">
                    <Button type="ghost" @click="resat" icon="refresh">重置</Button>
                </Col>
            </Row>
        </FormItem>
    </Form>
    <div class="table-box">
      <div class="btn-box">
        <Button class="commom-btn" type="success" icon="plus">新增</Button>
        <Button class="commom-btn" type="warning" icon="trash-a">批量删除</Button>
        <Button class="commom-btn" type="info" icon="earth">地图展示</Button>
      </div>
      <Table class="table-content" border :columns="columns" :data="data"></Table>
      <Page class="table-page" :total="100" show-sizer></Page>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WindowInfoMaintenance',
  components:{

  },
  data () {
    return {
        formItem: {
            SaleNumber: '',
            SaleName: '',
            SaleStationName: ''
        }, 
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

<style scoped >

</style>
