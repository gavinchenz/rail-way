<template>
   <div class="vue-body">
    <Breadcrumb class="router-box">
        <BreadcrumbItem to="index">首页</BreadcrumbItem>
        <BreadcrumbItem to="/ComprehensiveQuery?condition=2">综合查询</BreadcrumbItem>
        <BreadcrumbItem>窗口信息维护</BreadcrumbItem>
    </Breadcrumb>
    <div class="header-box">
      <ul class="window-info-maintenance">
        <li class="header-li">
          <label class="tit-label">售处编号</label>
          <Input class="tit-input" v-model="SaleNumber" placeholder="请输入售处编号" clearable style="width: 200px"></Input>
          <label class="tit-label">售处名称</label>
          <Input class="tit-input" v-model="SaleName" placeholder="请输入售处名称" clearable style="width: 200px"></Input>
          <label class="tit-label">售处站名</label>
          <Input class="tit-input" v-model="SaleStationName" placeholder="请输入售处站名" clearable style="width: 200px"></Input>
          <Button class="btn" type="primary">查询</Button>
          <Button class="btn" type="ghost">重置</Button>
        </li>
      </ul>
    </div>
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
      animal: '所有',
      SaleNumber: '',
      SaleName: '',
      SaleStationName: '',
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
// .header-box{
//   margin:15px 10px 0;
//   border:1px solid #eeeff1;
//   height:100px;
//   padding:15px;
//   border-radius:5px;
//   font-size: 14px;
//   color:#000;
//   text-align: center;
//   line-height: 50px;
//   .header-li{
//     height:50px;
//     text-align: left;
//     margin:3px 0;
//     .tit-label{
//       float:left;
//       margin:0 10px;
//       vertical-align: middle;
//     }
//     .tit-input{
//       float:left;
//       margin-left:5px;
//       line-height:50px;
//     }
//     .btn{
//       margin-left:20px;
//     }
//   }
// }
// .table-box{
//   margin:15px 10px 0;
//   .table-content{
//     height:700px;

//   }
//   .btn-box{
//     height:50px;
//   }
//   .table-page{
//     margin:15px 0;
//   }
// }
</style>
