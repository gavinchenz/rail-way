<template>
   <div class="vue-body">
    <Breadcrumb class="router-box">
        <BreadcrumbItem to="index">首页</BreadcrumbItem>
        <BreadcrumbItem to="/ComprehensiveQuery?condition=2">综合查询</BreadcrumbItem>
        <BreadcrumbItem>全国站点信息</BreadcrumbItem>
    </Breadcrumb>
    <Form :model="formItem" class="header-from">s
        <FormItem class="form-item">
            <Row :gutter="16">
                <Col span="2" class="col-label">所属分局</Col>
                <Col span="4">
                    <Input v-model="formItem.SubBureau" placeholder="请输入所属分局" clearable></Input>
                </Col>
                <Col span="1" class="col-label">站名</Col>
                <Col span="4">
                    <Input v-model="formItem.StationName" placeholder="请输入站名" clearable></Input>
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
      </div>
      <Table class="table-content" border :columns="columns" :data="data"></Table>
      <Page class="table-page" :total="100" show-sizer></Page>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'NationalSiteInformation',
        components:{

        },
        data () {
            return {
                formItem: {
                    SubBureau: '',
                    StationName: ''
                },   
                columns: [
                    {
                        title: '乘车日期',
                        key: 'date',
                        sortable: true,
                        fixed: 'left'            
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
                        key: 'operation'
                    }
                ],
                data: [
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
                    }
                ]
            }
        },
        methods:{
            //重置
            resat() {
              this.formItem.SubBureau = '';
              this.formItem.StationName = '';
            },
            //查询
            getSearch(){
               console.log(this.formItem);
               console.log(this.formItem.SubBureau);
            }
        }        
    };
</script>

<style scoped >

</style>
