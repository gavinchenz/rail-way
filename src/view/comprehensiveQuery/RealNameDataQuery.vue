<template>
    <div class="vue-body">
        <!-- 面包屑 -->
        <Breadcrumb class="router-box">
            <BreadcrumbItem to="/index">首页</BreadcrumbItem>
            <BreadcrumbItem to="/ComprehensiveQuery?condition=2">综合查询</BreadcrumbItem>
            <BreadcrumbItem>实名制数据查询</BreadcrumbItem>
        </Breadcrumb>
        <!-- 查询条件 -->
        <Form :model="searchData" class="header-from">
<!--             <FormItem class="form-item">
                <Row :gutter="16">
                    <Col span="2" class="col-label">售票类型</Col>
                    <Col span="8" class="col-checkbox">
                        <CheckboxGroup v-model="searchData.checkbox">
                            <Checkbox label="所有">所有</Checkbox>
                            <Checkbox label="站售">站售</Checkbox>
                            <Checkbox label="网售">网售</Checkbox>
                            <Checkbox label="代售">代售</Checkbox>
                        </CheckboxGroup>                
                    </Col>
                </Row>
            </FormItem>  -->
            <FormItem class="form-item">
                <Row :gutter="24">
                    <Col span="4" class="col-label" style="width:120px;marginLeft:30px">订票时间范围</Col>
                    <Col span="4">
                        <DatePicker type="datetimerange" format="yyyy-MM-dd HH:mm:ss" @on-change="searchData.bookingDate=$event" placeholder="选择日期" v-model="searchData.bookingDate" style="width:280px"></DatePicker>
                    </Col>
                    <Col span="4" class="col-label" style="width:120px;marginLeft:50px">乘车时间范围</Col>
                    <Col span="4">
                        <DatePicker type="datetimerange" format="yyyy-MM-dd HH:mm:ss" @on-change="searchData.busDate=$event" placeholder="选择日期" v-model="searchData.busDate" style="width:280px"></DatePicker><!-- v-model模式下，要添加@on-change="searchData.busDate=$event"事件 将标准时间转化为自定义格式，同时必须定义format和加=$event -->
                    </Col>
                </Row>
                <Row :gutter="24" style="marginTop:20px">
                    <Col span="2" class="col-label" style="marginLeft:30px">车次</Col>
                    <Col span="4">
                        <Input v-model="searchData.cc" placeholder="请输入车次" clearable></Input>
                    </Col>
                    <Col span="2" class="col-label" style="marginLeft:30px">身份证号</Col>
                    <Col span="4">
                        <Input v-model="searchData.inputId" placeholder="请输入身份证号" clearable></Input>
                    </Col>
                    <Col span="2" class="col-label">
                        <Button type="primary" icon="ios-search" @click="searchFn" >查询</Button>
                    </Col>
                    <Col span="2" class="col-label">
                        <Button type="ghost" @click="handleResetFn" icon="refresh">重置</Button>
                    </Col>                                                
                </Row>
            </FormItem>            
        </Form>    
        <!-- 表格和翻页 -->
        <div class="table-box">
            <Table :loading="loading" class="table-content" border :columns="columns" :data="realNameDataList" @on-sort-change="sortClick"></Table>
            <Paging class="table-page" :pages="searchData.page" @pageChange="pageChangeFn"></Paging>
        </div>
    </div>
</template>

<script>
    import {getRealNameDataList} from '@/service/getData';//异步请求链接
    import Paging from '@/components/common/tools/paging';//分页
    import expandRow from '@/components/systemManagement/operation/OperationExpand-row';//分页
    import {process_error} from '@/config/process_request_conf' //请求成功返回的状态
    export default {
        name: 'NationalSiteInformation',
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
                    checkbox:[],
                    busDate: '',
                    bookingDate:'',
                    inputId: '',
                    cc:''
                },
                columns: [
                    {title:'序号',type: 'selection',width: 60,fixed: 'left'},
                    {title:'乘车日期',width: 120,align: 'center',key:'chengCheRiQi',sortable: true},
                    {title:'车次',width: 80,align: 'center',key:'cheCi',sortable: true},
                    {title:'发站',width: 80,align: 'center',key:'faZhan',sortable: true},
                    {title:'到站',width: 80,align: 'center',key:'daoZhan',sortable: true},
                    {title:'车厢',width: 80,align: 'center',key:'cheXiang',sortable: true},
                    {title:'席位',width: 80,align: 'center',key:'xiWei',sortable: true},
                    {title:'席别',width: 80,align: 'center',key:'xiBie',sortable: true},
                    {title:'证件类型',width: 300,align: 'center',key:'zhengJianLeiXing',sortable: true},
                    {title:'证件号',width: 200,align: 'center',key:'zhengJianHao',sortable: true},
                    {title:'姓名',width: 100,align: 'center',key:'xingMing',sortable: true},
                    {title:'售处',width: 100,align: 'center',key:'shouChu',sortable: true},
                    {title:'售处类型',width: 120,align: 'center',key:'sellingPlaceType',sortable: true},
                    {title:'窗口',width: 100,align: 'center',key:'chuangKou',sortable: true},
                    {title:'操作员',width: 120,align: 'center',key:'caoZuoYuan',sortable: true},
                    {title:'售票时间',width: 120,align: 'center',key:'shouPiaoShiJian',sortable: true},
                    {title:'票号',width: 100,align: 'center',key:'piaoHao',sortable: true},
                    {title:'发车时间',width: 120,align: 'center',key:'faCheShiJian',sortable: true},
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
                                                this.showDetail(params.zhengJianHao);
                                            }
                                        }
                                    }, '查看详情')               
                            ]);
                        }              
                    }
                ],
                realNameDataList:[]//table里的数据，异步获取列表信息
            }
        },
        methods: {
            //列表请求table
            async getListData(sendData) {
                this.loading = true;
                await getRealNameDataList(sendData)
                .then(res => {
                    this.loading = false;
                    this.realNameDataList =JSON.parse(res.data).list;
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
                let checkbox = this.searchData['checkbox'];
                let busDate = this.searchData['busDate'];
                console.log(busDate)
                let bookingDate = this.searchData['bookingDate'];
                let inputId = this.searchData['inputId'];
                this.searchData.page.pageNumber = 1;
                if (checkbox || busDate || bookingDate || inputId) {
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
                this.searchData['checkbox'] = '';
                this.searchData['busDate'] = [];
                this.searchData['bookingDate'] = [];
                this.searchData['inputId'] = '';
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
        }
    };
</script>

<style scoped>
.col-label{
    text-align: left;
}
</style>
