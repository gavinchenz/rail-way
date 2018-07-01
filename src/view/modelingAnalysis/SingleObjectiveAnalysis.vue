<template>
    <div class="vue-body">
    <!-- 面包屑 -->
        <Breadcrumb class="router-box">
            <BreadcrumbItem to="/index">首页</BreadcrumbItem>
            <BreadcrumbItem to="/ModelingAnalysis?condition=3">建模分析</BreadcrumbItem>
            <BreadcrumbItem>单目标分析</BreadcrumbItem>
        </Breadcrumb>
        <!-- 查询条件 -->
        <Form :model="searchData" class="header-from">
            <FormItem class="form-item">
                <Row :gutter="16">
                    <Col span="2" class="col-label">时间范围</Col>
                    <Col span="6">
                        <DatePicker type="datetimerange" format="yyyy-MM-dd HH:mm:ss"  @on-change="searchData.dateRange=$event"  placeholder="选择日期" placement="bottom-end" v-model="searchData.dateRange" style="width:350px"></DatePicker>
                    </Col>
                    <Col span="2" class="col-label">身份证号</Col>
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
            <Table :loading="loading" class="table-content" border :columns="columns" :data="singleObjectiveDataList" @on-sort-change="sortClick"></Table>
            <Paging class="table-page" :pages="searchData.page" @pageChange="pageChangeFn"></Paging>
        </div>
    </div>
</template>

<script>
    import {getSingleObjectiveList} from '@/service/getData';//异步请求链接
    import Paging from '@/components/common/tools/paging';//分页
    import expandRow from '@/components/systemManagement/operation/OperationExpand-row';//分页
    import {process_error} from '@/config/process_request_conf' //请求成功返回的状态
export default {
    name: 'SingleObjectiveAnalysis',
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
                dateRange:'',
                inputId: ''
            },             
            columns: [
                {title:'序号',type: 'selection',width: 60,fixed: 'left'},
                {title:'身份证号',width: 400,align: 'center',key:'sfzh',sortable: true},
                {title:'车次',width: 150,align: 'center',key:'xm',sortable: true},
                {title:'年龄',width: 150,align: 'center',key:'nl',sortable: true},
                {title:'籍贯',width: 150,align: 'center',key:'jg',sortable: true},
                {title:'乘车次数',width: 150,align: 'center',key:'cccs',sortable: true},
                {title:'行踪轨迹',width: 600,align: 'center',key:'xzgj',sortable: true},
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
            singleObjectiveDataList: []
        }
    },
    methods:{
            //列表请求table
            async getListData(sendData) {
                this.loading = true;
                await getSingleObjectiveList(sendData)
                .then(res => {
                    this.loading = false;
                    this.singleObjectiveDataList = res.data;
                    console.log(this.singleObjectiveDataList);
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
                let dateRange = (this.searchData['dateRange']).join(',');//日期数组转字符串，用逗号隔开
                let inputId = this.searchData['inputId'];
                this.searchData.page.pageNumber = 1;
                if (dateRange || inputId) {
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
                this.searchData['dateRange'] = '';
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

<style scoped >
.select-col{
  float:left;
  margin-left:5px;
  width:202px;

}
</style>
