<template>
   <div class="vue-body">
    <Breadcrumb class="router-box">
        <BreadcrumbItem to="index">首页</BreadcrumbItem>
        <BreadcrumbItem to="/ModelingAnalysis?condition=3">建模分析</BreadcrumbItem>
        <BreadcrumbItem>涉嫖建模分析</BreadcrumbItem>
    </Breadcrumb>
    <div class="header-box">
      <ul class="whoring-modeling-analysis">
        <li class="header-li">
          <label class="tit-label">异常类型</label>
          <RadioGroup v-model="abnormalType" class="radio-group">
            <Radio class="radio-label" label="全量数据">全量数据</Radio>
            <Radio class="radio-label" label="相同身份证连续出票">相同身份证连续出票</Radio>
            <Radio class="radio-label" label="非工作时间售票">非工作时间售票</Radio>
            <Radio class="radio-label" label="紧俏票分析">紧俏票分析</Radio>
            <Radio class="radio-label" label="重复身份证售票分析">重复身份证售票分析</Radio>
            <Radio class="radio-label" label="异地售票分析">异地售票分析</Radio>
            <Radio class="radio-label" label="行程冲突出票分析">行程冲突出票分析</Radio>
            <Radio class="radio-label" label="售票量突增分析">售票量突增分析</Radio>
            <Radio class="radio-label" label="重点人员分析">重点人员分析</Radio>
          </RadioGroup>
        </li>
        <li class="header-li">
          <label class="tit-label">起始站</label>
          <Input class="tit-input" v-model="startStation" placeholder="请输入起始站" clearable style="width: 200px"></Input>
          <label class="tit-label">结束站</label>
          <Input class="tit-input" v-model="endStation" placeholder="请输入结束站" clearable style="width: 200px"></Input>
        </li>
        <li class="header-li">
          <label class="tit-label">开始时间</label>
          <Col span="12" class="select-col">
            <DatePicker class="data-picker" type="date" show-week-numbers placement="bottom-end" placeholder="请输入时间范围" style="width: 200px"></DatePicker>
          </Col>
          <label class="tit-label">结束时间</label>
          <Col span="12" class="select-col">
            <DatePicker class="data-picker" type="date" show-week-numbers placement="bottom-end" placeholder="请输入时间范围" style="width: 200px"></DatePicker>
          </Col>
          <Button class="btn" type="success">抽取数据</Button>
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
  name: 'WhoringModelingAnalysis',
  components:{

  },
  data () {
    return {
      abnormalType: '全量数据',
      startStation: '',
      endStation: '',
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
  height:200px;
}
</style>
