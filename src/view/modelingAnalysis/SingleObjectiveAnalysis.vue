<template>
   <div class="vue-body">
    <Breadcrumb class="router-box">
        <BreadcrumbItem to="index">首页</BreadcrumbItem>
        <BreadcrumbItem to="/ModelingAnalysis?condition=3">建模分析</BreadcrumbItem>
        <BreadcrumbItem>单目标分析</BreadcrumbItem>
    </Breadcrumb>
    <Form :model="formItem" class="header-from">
        <FormItem class="form-item">
            <Row :gutter="16">
                <Col span="2" class="col-label">时间范围</Col>
                <Col span="4">
                    <DatePicker type="date" placeholder="选择日期" placement="bottom-end" v-model="formItem.dateRange"></DatePicker>
                </Col>
                <Col span="2" class="col-label">身份证号</Col>
                <Col span="4">
                    <Input v-model="formItem.inputId" placeholder="请输入身份证号" clearable></Input>
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
      <Table class="table-content"  border ref="selection" :columns="columns" :data="data"></Table>
      <Page class="table-page" :total="100" show-sizer></Page>
    </div>
  </div>
</template>

<script>
export default {
    name: 'SingleObjectiveAnalysis',
    components:{

    },
    data () {
        return {
            formItem: {
                    dateRange: '',
                    inputId: ''
            },              
            columns: [
                {
                    type: 'selection',
                    width: 60,
                    fixed: 'left'
                },            
                {
                    title: '身份证号',
                    width: 400,
                    key: 'idCardNumber',
                    sortable: true
                },
                {
                    title: '姓名',
                    width:100,
                    key: 'name',
                    sortable: true
                },
                {
                    title: '年龄',
                    width: 100,
                    key: 'age',
                    sortable: true
                },
                {
                    title: '籍贯',
                    width: 100,
                    key: 'nativePlace',
                    sortable: true
                },
                {
                    title: '乘车次数',
                    width: 130,
                    key: 'rideTimes',
                    sortable: true
                },
                {
                    title: '行踪轨迹',
                    width: 400,
                    key: 'trajectory',
                    sortable: true
                },
                {
                    title: '操作',
                    width: 200,
                    key: 'handle',
                    fixed: 'right',                    
                    sortable: true
                }
            ],
            data: [
                {
                    idCardNumber: '610111199012119922',
                    name: '张某',
                    age: 34,
                    nativePlace: '安康',
                    rideTimes: '2',
                    trajectory: '西安到安康，西安到延安，西安到渭南',
                    handle: ''
                }
            ]
        }
    },
    methods:{
        //重置
        resat() {
          this.formItem.dateRange = '';
          this.formItem.inputId = '';
        },
        //查询
        getSearch(){
           console.log(this.formItem);
           console.log(this.formItem.inputId);
        }
    }
};
</script>

<style scoped >
.select-col{
  float:left;
  margin-left:5px;
  width:202px;

}
</style>
