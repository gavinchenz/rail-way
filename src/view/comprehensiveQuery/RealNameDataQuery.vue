<template>
  <div class="vue-body">
    <Breadcrumb class="router-box">
        <BreadcrumbItem to="index">首页</BreadcrumbItem>
        <BreadcrumbItem to="/ComprehensiveQuery?condition=2">综合查询</BreadcrumbItem>
        <BreadcrumbItem>实名制数据查询</BreadcrumbItem>
    </Breadcrumb>
    <Form :model="formItem" class="header-from">
        <FormItem class="form-item">
            <Row :gutter="16">
                <Col span="2" class="col-label">售票类型</Col>
                <Col span="8" class="col-checkbox">
                    <CheckboxGroup v-model="formItem.checkbox">
                        <Checkbox label="所有">所有</Checkbox>
                        <Checkbox label="站售">站售</Checkbox>
                        <Checkbox label="网售">网售</Checkbox>
                        <Checkbox label="代售">代售</Checkbox>
                        <Checkbox label="12306订票">12306订票</Checkbox>
                    </CheckboxGroup>                
                </Col>
            </Row>
        </FormItem> 
        <FormItem class="form-item">
            <Row :gutter="24">
                <Col span="2" class="col-label">乘车时间范围</Col>
                <Col span="4">
                    <DatePicker type="date" placeholder="选择日期" v-model="formItem.busDate"></DatePicker>
                </Col>
                <Col span="2" class="col-label">订票时间范围</Col>
                <Col span="4">
                    <DatePicker type="date" placeholder="选择日期" v-model="formItem.bookingDate"></DatePicker>
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
        <Table  class="table-content" border :data="tableData" :columns="tableColumns" :loading="loading"></Table>
            <div style="margin: 10px;overflow: hidden">
                <div style="float: left;">
                    <Page class="table-page" :total="100" :current="1" @on-change="changePage"></Page>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'NationalSiteInformation',
    data () {
        return {
            formItem: {
                checkbox:["所有"],
                busDate: '',
                bookingDate: '',
                inputId: ''
            },
            loading: false,
            tableData: this.mockTableData(),
            tableColumns: [
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
                title: '席别',
                key: 'Banning',
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
            },
            {
                title: '售处类型',
                key: 'sellingPlaceType',
                sortable: true
            },
            {
                title: '窗口',
                key: 'sellWindows',
                sortable: true
            },
            {
                title: '操作员',
                key: 'operator',
                sortable: true
            },
            {
                title: '售票时间',
                key: 'ticketingTime',
                sortable: true
            },
            {
                title: '票号',
                key: 'ticketNumber',
                sortable: true
            },
            {
                title: '发车时间',
                key: 'departureTime',
                sortable: true
            },
            {
                title: '操作',
                key: 'operation',
                render: (h, params) => {
                    return h('div', [
                        h('Button', {
                            props: {
                                type: 'primary',
                                size: 'small'
                            },
                            style: {
                                marginRight: '5px'
                            },
                            on: {
                                click: () => {
                                    this.show(params.index)
                                }
                            }
                        }, 'View')
                    ]);
                }              
            }
          ]    
        }
    },
    methods: {
        //重置
        resat() {
          this.formItem.checkbox = ['所有'];
          this.formItem.busDate = '';
          this.formItem.bookingDate = '';
          this.formItem.inputId = '';
        },
        //查询
        getSearch(){
           console.log(this.formItem);
           console.log(this.formItem.busDate);
        },
        mockTableData () {
            let data = [];
            for (let i = 0; i < 10; i++) {
                data.push({
                        date: '20180112',
                        trainNumber: "k1085",
                        departureStation: '西安',
                        destination: '银川',
                        carriage: '10',
                        seat:"0081",
                        banning:3,
                        certificatesType: '身份证',
                        idNumber: 610623199603160444,
                        name: '高某',
                        sellingPlace: 3947320,
                        sellingPlaceType:"",
                        sellWindows:"",
                        operator:"",
                        ticketingTime:"20180112 14:55:59",
                        ticketNumber:"S053670",
                        departureTime:1738,
                        operation:""
                    },
                    {
                        date: '20180112',
                        trainNumber: "k1085",
                        departureStation: '西安',
                        destination: '银川',
                        carriage: '10',
                        seat:"0081",
                        banning:3,
                        certificatesType: '身份证',
                        idNumber: 610623199603160444,
                        name: '高某',
                        sellingPlace: 3947320,
                        sellingPlaceType:"",
                        sellWindows:"",
                        operator:"",
                        ticketingTime:"20180112 14:55:59",
                        ticketNumber:"S053670",
                        departureTime:1738,
                        operation:""
                    },
                    {
                        date: '20180112',
                        trainNumber: "k1085",
                        departureStation: '西安',
                        destination: '银川',
                        carriage: '10',
                        seat:"0081",
                        banning:3,
                        certificatesType: '身份证',
                        idNumber: 610623199603160444,
                        name: '高某',
                        sellingPlace: 3947320,
                        sellingPlaceType:"",
                        sellWindows:"",
                        operator:"",
                        ticketingTime:"20180112 14:55:59",
                        ticketNumber:"S053670",
                        departureTime:1738,
                        operation:""
                    },
                    {
                        date: '20180112',
                        trainNumber: "k1085",
                        departureStation: '西安',
                        destination: '银川',
                        carriage: '10',
                        seat:"0081",
                        banning:3,
                        certificatesType: '身份证',
                        idNumber: 610623199603160444,
                        name: '高某',
                        sellingPlace: 3947320,
                        sellingPlaceType:"",
                        sellWindows:"",
                        operator:"",
                        ticketingTime:"20180112 14:55:59",
                        ticketNumber:"S053670",
                        departureTime:1738,
                        operation:""
                    },
                    {
                        date: '20180112',
                        trainNumber: "k1085",
                        departureStation: '西安',
                        destination: '银川',
                        carriage: '10',
                        seat:"0081",
                        banning:3,
                        certificatesType: '身份证',
                        idNumber: 610623199603160444,
                        name: '高某',
                        sellingPlace: 3947320,
                        sellingPlaceType:"",
                        sellWindows:"",
                        operator:"",
                        ticketingTime:"20180112 14:55:59",
                        ticketNumber:"S053670",
                        departureTime:1738,
                        operation:""
                    },
                    {
                        date: '20180112',
                        trainNumber: "k1085",
                        departureStation: '西安',
                        destination: '银川',
                        carriage: '10',
                        seat:"0081",
                        banning:3,
                        certificatesType: '身份证',
                        idNumber: 610623199603160444,
                        name: '高某',
                        sellingPlace: 3947320,
                        sellingPlaceType:"",
                        sellWindows:"",
                        operator:"",
                        ticketingTime:"20180112 14:55:59",
                        ticketNumber:"S053670",
                        departureTime:1738,
                        operation:""
                    },
                    {
                        date: '20180112',
                        trainNumber: "k1085",
                        departureStation: '西安',
                        destination: '银川',
                        carriage: '10',
                        seat:"0081",
                        banning:3,
                        certificatesType: '身份证',
                        idNumber: 610623199603160444,
                        name: '高某',
                        sellingPlace: 3947320,
                        sellingPlaceType:"",
                        sellWindows:"",
                        operator:"",
                        ticketingTime:"20180112 14:55:59",
                        ticketNumber:"S053670",
                        departureTime:1738,
                        operation:""
                    },
                    {
                        date: '20180112',
                        trainNumber: "k1085",
                        departureStation: '西安',
                        destination: '银川',
                        carriage: '10',
                        seat:"0081",
                        banning:3,
                        certificatesType: '身份证',
                        idNumber: 610623199603160444,
                        name: '高某',
                        sellingPlace: 3947320,
                        sellingPlaceType:"",
                        sellWindows:"",
                        operator:"",
                        ticketingTime:"20180112 14:55:59",
                        ticketNumber:"S053670",
                        departureTime:1738,
                        operation:""
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

<style scoped>
.col-label{
    text-align: left;
}
</style>
