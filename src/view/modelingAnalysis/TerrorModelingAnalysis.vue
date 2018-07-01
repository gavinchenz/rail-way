<template>
    <div class="vue-body">
        <!-- 面包屑 -->
        <Breadcrumb class="router-box">
            <BreadcrumbItem to="/index">首页</BreadcrumbItem>
            <BreadcrumbItem to="/ModelingAnalysis?condition=3">建模分析</BreadcrumbItem>
            <BreadcrumbItem>涉恐建模分析</BreadcrumbItem>
        </Breadcrumb>
        <!-- 查询条件 -->    
        <Form :model="searchData" class="header-from">
            <FormItem class="form-item">
                <Row :gutter="24">
                    <Col span="2" class="col-label">异常类型</Col>
                    <Col span="22" class="col-checkbox">
                        <CheckboxGroup v-model="searchData.abnormalType">
                            <Checkbox label="全量数据">全量数据</Checkbox>
                            <Checkbox label="异常停留分析">异常停留分析</Checkbox>
                            <Checkbox label="长往返涉恐案件多发地人员分析">长往返涉恐案件多发地人员分析</Checkbox>
                            <Checkbox label="涉恐人员乘车一览">涉恐人员乘车一览</Checkbox>
                        </CheckboxGroup>                
                    </Col>
                </Row>
            </FormItem> 
            <FormItem class="form-item">
                <Row :gutter="12">
                    <Col span="2" class="col-label" style='text-align:left'>起始站</Col>
                    <Col span="4">
                        <Input v-model="searchData.startStation" placeholder="请输入起始站" clearable></Input>
                    </Col>
                    <Col span="2" class="col-label">结束站</Col>
                    <Col span="4">
                        <Input v-model="searchData.endStation" placeholder="请输入结束站" clearable></Input>
                    </Col>
                </Row>
            </FormItem>
            <FormItem class="form-item">
                <Row :gutter="24">
                    <Col span="2" class="col-label">开始时间</Col>
                    <Col span="4">
                        <DatePicker type="datetime" placeholder="选择日期" v-model="searchData.startDate" format="yyyy-MM-dd HH:mm:ss"  @on-change="searchData.startDate=$event"></DatePicker>
                    </Col>
                    <Col span="2" class="col-label">结束时间</Col>
                    <Col span="4">
                        <DatePicker type="datetime" placeholder="选择日期" v-model="searchData.endDate" format="yyyy-MM-dd HH:mm:ss"  @on-change="searchData.endDate=$event"></DatePicker>
                    </Col>
                    <Col span="4" class="col-label col-btn">
                        <Button type="primary" icon="ios-search" @click="searchFn" >抽取数据</Button>
                    </Col>
                </Row>
            </FormItem>
        </Form>
        <!-- 按钮盒子 -->
        <Form class="btn-box" inline>
            <FormItem class="form-item">
                <Row>
                    <Col span="2" style="text-align: right">
                        <FormItem>
                            <Button class="btn" type="primary" icon="share" @click="exportFn">导出</Button>
                        </FormItem>
                    </Col>
                </Row>     
            </FormItem>    
        </Form>
        <!-- 表格和翻页 -->
        <div class="table-box">
            <Table :loading="loading" class="table-content" border :columns="columns" :data="terrorModelingDataList" @on-sort-change="sortClick"></Table>
            <Paging class="table-page" :pages="searchData.page" @pageChange="pageChangeFn"></Paging>
        </div>
    </div>
</template>

<script>
    import {getTerrorModelingDataList} from '@/service/getData';//异步请求链接
    import Paging from '@/components/common/tools/paging';//分页
    import expandRow from '@/components/systemManagement/operation/OperationExpand-row';//分页
    import {process_error} from '@/config/process_request_conf' //请求成功返回的状态
    export default {
        name: 'TerrorModelingAnalysis',
        components: {Paging, expandRow}, 
        data () {
            return {
                loading: false, //布尔值判断 
                searchData: {//查询条件
                    page: {//翻页相关
                        totalElements: 0,
                        size: 10,//一页10行
                        pageNumber: 1,//第一页
                        sort: "lastModifyTime,desc"//排序，按最后修改时间和降序
                    },                    
                    abnormalType: [], 
                    startStation: '',
                    endStation: '',              
                    startDate: '', 
                    endDate: ''
                }, 
                columns: [
                    {title:'序号',type: 'selection',width: 60,fixed: 'left',class:'noExl'},
                    {title:'售票时间',width: 200,align: 'center',key:'spsj',sortable: true},
                    {title:'售处',width: 100,align: 'center',key:'sc',sortable: true},
                    {title:'窗口',width: 100,align: 'center',key:'cc',sortable: true},
                    {title:'证件号',width: 200,align: 'center',key:'zjh',sortable: true},
                    {title:'姓名',width: 100,align: 'center',key:'xm',sortable: true},
                    {title:'车次',width: 100,align: 'center',key:'checi',sortable: true},
                    {title:'票号',width: 100,align: 'center',key:'ph',sortable: true},
                    {title:'发站',width: 100,align: 'center',key:'fz',sortable: true},
                    {title:'到站',width: 100,align: 'center',key:'dz',sortable: true},
                    {title:'车厢',width: 100,align: 'center',key:'cx',sortable: true},
                    {title:'席位',width: 100,align: 'center',key:'xw',sortable: true},
                    {title:'席别',width: 100,align: 'center',key:'xb',sortable: true},
                    {title:'证件类型',width: 150,align: 'center',key:'zjlx',sortable: true},
                    {title:'乘车日期',width: 200,align: 'center',key:'ccrq',sortable: true},
                    {title:'发站时间',width: 200,align: 'center',key:'fzsj',sortable: true},
                    {title:'操作员',width: 150,align: 'center',key:'czy',sortable: true},
                    {
                        title: '操作',
                        width: 150,
                        align: 'center',
                        key: 'center',
                        fixed:'right',
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
                                                this.showDetail(params.idNumber);
                                            }
                                        }
                                    }, '查看详情')               
                            ]);
                        }              
                    }
                ],
                terrorModelingDataList: [
                    // {
                    //     'spsj': '2018-02-11 09:34:00',
                    //     'sc': '西安火车站',
                    //     'cc': '47512',
                    //     'zjh': '610112199012044475',
                    //     'xm': '张某',
                    //     'checi': 'T8102',
                    //     'ph': '4712',
                    //     'fz': '西安站',
                    //     'dz': '宁夏北站',
                    //     'cx': '10',
                    //     'xw': '1245',
                    //     'xb': '软卧',
                    //     'zjlx': '1',
                    //     'ccrq': '2018-02-12 11:20:00',
                    //     'fzsj': '2018-02-12 11:20:00',
                    //     'czy': '李某'
                    // }
                ]
            }
        },
        methods:{
            //列表请求table
            async getListData(sendData) {
                this.loading = true;
                await getTerrorModelingDataList(sendData)
                .then(res => {
                    this.loading = false;
                    this.terrorModelingDataList = res.data;
                    console.log(this.terrorModelingDataList);
                    this.searchData.page.totalElements = res.data.totalElements;
                })
            },
            //分页请求
            pageChangeFn(page) {
                this.searchData['page']['pageNumber'] = page.pageNumber;
                this.searchData['page']['size'] = page.size;
                this.getListData(this.searchData)
            },
            //查询
            searchFn() {
                let startDate = (this.searchData['startDate']).join(',');//日期数组转字符串，用逗号隔开
                let endDate = (this.searchData['endDate']).join(',');//日期数组转字符串，用逗号隔开
                let startStation = this.searchData['startStation'];
                let endStation = this.searchData['endStation'];
                let abnormalType = this.searchData['abnormalType'];
                this.searchData.page.pageNumber = 1;
                if (abnormalType || startStation || endStation || startDate || endDate ) {
                  this.getListData(this.searchData);
                } else {
                  this.$Message.warning('请输入查询内容!')
                }
            },
            //重置查询
            handleResetFn() {
                this.clearSearchInfo();
                this.getListData(this.searchData);
            },
            //清空查询
            clearSearchInfo() {
                this.searchData['abnormalType'] = [];
                this.searchData['startStation'] = '';
                this.searchData['endStation'] = '';
                this.searchData['startDate'] = '';
                this.searchData['endDate'] = '';
            },
            //导出excel
            exportFn(){
                $('.table-content').table2excel({
                    exclude:".noExl",
                    name:"demo",
                    filename:"数据表",
                    exclude_img:true,
                    exclude_links:true,
                    exclude_inputs:true
                })
            },
            async sortClick(column) {
                if (column.order != 'normal') {
                    this.searchData.page.sort = (column.key + "," + column.order);
                }
                    this.getListData(this.searchData);
            },
            //查看详情，暂未添加
            showDetail(id){
                console.log(id);
            }
        },
        mounted() {
          this.getListData(this.searchData);
          // this.exportFn();
        }
    };
</script>

<style scoped >

</style>