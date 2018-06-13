<template>
   <div class="vue-body">
    <Breadcrumb class="router-box">
        <BreadcrumbItem to="index">首页</BreadcrumbItem>
        <BreadcrumbItem to="/ModelingAnalysis?condition=3">建模分析</BreadcrumbItem>
        <BreadcrumbItem>涉票建模分析</BreadcrumbItem>
    </Breadcrumb>
    <Form :model="formItem" class="header-from">
        <FormItem class="form-item">
            <Row :gutter="24">
                <Col span="2" class="col-label">异常类型</Col>
                <Col span="22" class="col-checkbox">
                    <CheckboxGroup v-model="formItem.abnormalType">
                        <Checkbox label="全量数据">全量数据</Checkbox>
                        <Checkbox label="相同身份证连续出票">相同身份证连续出票</Checkbox>
                        <Checkbox label="非工作时间售票">非工作时间售票</Checkbox>
                        <Checkbox label="紧俏票分析">紧俏票分析</Checkbox>
                        <Checkbox label="重复身份证售票分析">重复身份证售票分析</Checkbox>
                        <Checkbox label="异地售票分析">异地售票分析</Checkbox>
                        <Checkbox label="行程冲突出票分析">行程冲突出票分析</Checkbox>
                        <Checkbox label="售票量突增分析">售票量突增分析</Checkbox>
                        <Checkbox label="重点人员分析">重点人员分析</Checkbox>
                    </CheckboxGroup>                
                </Col>
            </Row>
        </FormItem> 
        <FormItem class="form-item">
            <Row :gutter="12">
                <Col span="2" class="col-label" style='text-align:left'>起始站</Col>
                <Col span="4">
                    <Input v-model="formItem.startStation" placeholder="请输入起始站" clearable></Input>
                </Col>
                <Col span="2" class="col-label">结束站</Col>
                <Col span="4">
                    <Input v-model="formItem.endStation" placeholder="请输入结束站" clearable></Input>
                </Col>
            </Row>
        </FormItem>
        <FormItem class="form-item">
            <Row :gutter="24">
                <Col span="2" class="col-label">开始时间</Col>
                <Col span="4">
                    <DatePicker type="date" placeholder="选择日期" v-model="formItem.startDate"></DatePicker>
                </Col>
                <Col span="2" class="col-label">结束时间</Col>
                <Col span="4">
                    <DatePicker type="date" placeholder="选择日期" v-model="formItem.endDate"></DatePicker>
                </Col>
                <Col span="4" class="col-label col-btn">
                    <Button type="primary" icon="ios-search" @click="getData" >抽取数据</Button>
                </Col>
            </Row>
        </FormItem>
    </Form>
    <div class="table-box">
      <Table class="table-content"  border ref="selection" :columns="columns" :data="data"></Table>
      <Page class="table-page" :total="100" show-sizer></Page>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TicketRelatedModelingAnalysis',
  components:{

  },
  data () {
    return {
        formItem: {
            abnormalType: ['全量数据'], 
            startStation: '',
            endStation: '',              
            startDate: '', 
            endDate: ''
        },
        columns: [
            {
                type: 'selection',
                width: 60,
                fixed: 'left'
            },
            {
                title: '售票时间',
                width: 300,
                key: 'date',
                sortable: true
            },  
            {
                title: '售处',
                width: 100,
                key: 'sellingPlace',
                sortable: true
            },
            {
                title: '窗口',
                width: 100,
                key: 'windows',
                sortable: true
            },          
            {
                title: '证件号',
                width: 200,
                key: 'idCardNumber',
                sortable: true
            },
            {
                title: '姓名',
                width: 100,
                key: 'name',
                sortable: true
            },
            {
                title: '车次',
                width: 100,
                key: 'trainNumber',
                sortable: true
            },
            {
                title: '票号',
                width: 100,
                key: 'ticketNumber',
                sortable: true
            },
            {
                title: '发站',
                width: 100,
                key: 'departureStation',
                sortable: true
            },
            {
                title: '到站',
                width: 100,
                key: 'destination',
                sortable: true
            },
            {
                title: '车厢',
                width: 100,
                key: 'carriage',
                sortable: true
            },
            {
                title: '席位',
                width: 100,
                key: 'seats',
                sortable: true
            },
            {
                title: '席别',
                width: 80,
                key: 'banning',
                sortable: true
            },
            {
                title: '证件类型',
                width:120,
                key: 'certificateType',
                sortable: true
            },
            {
                title: '乘车日期',
                width: 120,
                key: 'rideDate',
                sortable: true
            },
            {
                title: '发站时间',
                width: 120,
                key: 'commonTrajectory',
                sortable: true
            },
            {
                title: '操作员',
                width: 100,
                key: 'handle',
                fixed: 'right',                    
                sortable: true
            }
        ],
        data: [
            {
                date:new Date().toLocaleString(),
                sellingPlace:3947320,
                windows:31,
                idCardNumber:610111199011221122,
                name:'测试',
                trainNumber:'K1085',
                ticketNumber:'S053670',
                departureStation:'西安',
                destination:'银川',
                carriage:10,
                seats:'0081',
                banning:3,
                certificateType:1,
                rideDate:new Date().toLocaleString(),
                commonTrajectory:1738,
                handle:'',
            }
        ]
    }
  }
};
</script>

<style scoped >
.header-box{
  height:200px;
}
</style>
