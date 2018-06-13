<template>
   <div class="vue-body">
    <Breadcrumb class="router-box">
        <BreadcrumbItem to="index">首页</BreadcrumbItem>
        <BreadcrumbItem to="/ModelingAnalysis?condition=3">建模分析</BreadcrumbItem>
        <BreadcrumbItem>任务列表</BreadcrumbItem>
    </Breadcrumb>
    <div class="header-box">
      <ul class="task-list">
        <li class="header-li">
          <label class="tit-label">案件</label>
          <Select class="tit-select" v-model="caseType" filterable clearable style="width:200px">
              <Option v-for="item in caseList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <label class="tit-label">任务名称</label>
          <Input class="tit-input" v-model="taskName" placeholder="请输入账号名称" clearable style="width: 200px"></Input>
          <label class="tit-label">任务类别</label>
          <Input class="tit-input" v-model="taskCategory" placeholder="请输入账号名称" clearable style="width: 200px"></Input>
          <Button class="btn" type="primary">查询</Button>
          <Button class="btn" type="ghost">重置</Button>
        </li>
      </ul>
    </div>
    <div class="table-box">
      <div class="btn-box">
        <Button class="commom-btn" type="warning" icon="trash-a">批量删除</Button>
      </div>
      <Table class="table-content" border :columns="columns" :data="data"></Table>
      <Page class="table-page" :total="100" show-sizer></Page>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskList',
  components:{

  },
  data () {
    return {
      caseType:"",
      taskName: '',
      taskCategory: '',
      caseList: [
          {
              value: '案件1',
              label: '案件1'
          },
          {
              value: '案件2',
              label: '案件2'
          },
          {
              value: '案件3',
              label: '案件3'
          },
          {
              value: '案件4',
              label: '案件4'
          },
          {
              value: '案件5',
              label: '案件5'
          },
          {
              value: '案件6',
              label: '案件6'
          }
      ],
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
