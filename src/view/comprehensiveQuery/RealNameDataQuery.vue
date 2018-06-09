<template>
  <div class="vue-body">
    <Breadcrumb class="router-box">
        <BreadcrumbItem to="index">首页</BreadcrumbItem>
        <BreadcrumbItem to="/ComprehensiveQuery?condition=2">综合查询</BreadcrumbItem>
        <BreadcrumbItem>实名制数据查询</BreadcrumbItem>
    </Breadcrumb>
    <div class="header-box">
      <ul class="national-site-information">
        <li class="header-li">
          <span class="tit-span">售票类型</span>
          <RadioGroup v-model="animal" class="radio-group">
            <Radio class="radio-label" label="所有">所有</Radio>
            <Radio class="radio-label" label="站售">站售</Radio>
            <Radio class="radio-label" label="网售">网售</Radio>
            <Radio class="radio-label" label="代售">代售</Radio>
            <Radio class="radio-label" label="12306订票">12306订票</Radio>
          </RadioGroup>
        </li>
        <li class="header-li">
          <span class="tit-span">乘车时间范围</span>
          <Col span="12" class="select-col">
            <DatePicker class="data-picker" type="daterange" show-week-numbers placement="bottom-end" placeholder="请输入时间范围" style="width: 200px"></DatePicker>
          </Col>
          <span class="tit-span">订票时间范围</span>
          <Col span="12" class="select-col">
            <DatePicker class="data-picker" type="daterange" show-week-numbers placement="bottom-end" placeholder="请输入时间范围" style="width: 200px"></DatePicker>
          </Col>
          <span class="tit-span">身份证号</span>
          <Input v-model="value14" placeholder="请输入身份证号" clearable style="width: 200px"></Input>
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
  name: 'NationalSiteInformation',
  data () {
    return {
      animal: '所有',
      value14: '',
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
  margin:15px 10px 0;
  border:1px solid #eeeff1;
  height:150px;
  padding:15px;
  border-radius:5px;
  font-size: 14px;
  color:#000;
  text-align: center;
  line-height: 50px;
  .header-li{
    height:50px;
    text-align: left;
    margin:3px 0;
    .tit-span{
      float:left;
      display:inline-block;
      margin:0 10px;
      line-height: 50px;
    }
    .radio-label{
      font-size: 14px;
      font-weight: 100;
    }
    .select-col{
      float:left;
      margin-left:5px;
      width:202px;

    }
    .btn{
      margin-left:20px;
    }
  }
}
.table-box{
  margin:15px 10px 0;
  .table-content{
    height:700px;

  }
  .table-page{
    margin:15px 0;
  }
}
</style>
