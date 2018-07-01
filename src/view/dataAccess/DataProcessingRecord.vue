<template>
    <div class="vue-body">
        <!-- 面包屑 -->
        <Breadcrumb class="router-box">
            <BreadcrumbItem to="/index">首页</BreadcrumbItem>
            <BreadcrumbItem to="/DataAccess?condition=1">数据分析</BreadcrumbItem>
            <BreadcrumbItem>数据接入及处理记录</BreadcrumbItem>
        </Breadcrumb>
        <!-- 查询条件 -->
        <Form :model="searchData" class="header-from">
            <FormItem class="form-item">
                <Row :gutter="24">
                    <Col span="4" class="col-label" style="width:120px">数据日期</Col>
                    <Col span="4">
                        <DatePicker type="datetime" format="yyyy-MM-dd" @on-change="searchData.dataDate=$event" placeholder="选择日期" v-model="searchData.dataDate" style="width:280px"></DatePicker><!-- v-model模式下，要添加@on-change="searchData.busDate=$event"事件 将标准时间转化为自定义格式，同时必须定义format和加=$event -->
                    </Col>
                    <Col span="2" class="col-label">
                        <Button type="primary" icon="ios-search" @click="searchFn" style="marginLeft:30px" >查询</Button>
                    </Col>
                    <Col span="2" class="col-label">
                        <Button type="ghost" @click="handleResetFn" icon="refresh" style="marginLeft:30px">重置</Button>
                    </Col>
                </Row>
            </FormItem>
        </Form>
        <!-- 表格和翻页 -->
        <div class="table-box">
            <Table :loading="loading" class="table-content" border :columns="columns" :data="dataProcessingRecordList" @on-sort-change="sortClick"></Table>
            <Paging class="table-page" :pages="searchData.page" @pageChange="pageChangeFn"></Paging>
        </div>
    </div>
</template>

<script>
    import {getDataProcessingRecordList} from '@/service/getData';//异步请求链接
    import Paging from '@/components/common/tools/paging';//分页
    import expandRow from '@/components/systemManagement/operation/OperationExpand-row';//分页
    import {process_error} from '@/config/process_request_conf' //请求成功返回的状态
export default {
    name: 'DataProcessingRecord',
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
                dataDate:''
            },
            columns: [
                {title:'序号',type: 'selection',width: 60,fixed: 'left'},
                {title:'数据日期',width: 200,align: 'center',key:'datadate',sortable: true},
                {title:'数据类型',width: 200,align: 'center',key:'sourceid',sortable: true},
                {title:'清洗时间',width: 200,align: 'center',key:'currenttime',sortable: true},
                {title:'入库总量',width: 200,align: 'center',key:'total',sortable: true},
                {title:'有效数据量',width: 200,align: 'center',key:'valid',sortable: true}
            ],
              dataProcessingRecordList:[]
            }
        },
    methods: {
        //列表请求table
        async getListData(sendData) {
            this.loading = true;
            await getDataProcessingRecordList(sendData)
            .then(res => {
                this.loading = false;
                this.dataProcessingRecordList =res.data.content;
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
            let dataDate = this.searchData['dataDate'];
            this.searchData.page.pageNumber = 1;
            if (dataDate) {
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
            this.searchData['dataDate'] = '';
        },
        async sortClick(column) {
            if (column.order != 'normal') {
                this.searchData.page.sort = (column.key + "," + column.order);
            }
                this.getListData(this.searchData);
        }
    },
    mounted() {
      this.getListData(this.searchData);
    }
};
</script>

<style scoped >

</style>
