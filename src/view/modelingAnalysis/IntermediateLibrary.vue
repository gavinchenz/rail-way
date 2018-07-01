<template>
    <div class="vue-body">
        <!-- 面包屑 -->
        <Breadcrumb class="router-box">
            <BreadcrumbItem to="/index">首页</BreadcrumbItem>
            <BreadcrumbItem to="/ModelingAnalysis?condition=3">建模分析</BreadcrumbItem>
            <BreadcrumbItem>中间库</BreadcrumbItem>
        </Breadcrumb>
        <!-- 查询条件 -->
        <Form :model="searchData" class="header-from">
            <FormItem class="form-item">
                <Row :gutter="16">
                    <Col span="4" class="col-label" style="width:100px">中间库名称</Col>
                    <Col span="4">
                        <Input v-model="searchData.libraryName" placeholder="请输入库名" clearable></Input>
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
        <!-- 按钮盒子 -->
        <Form class="btn-box" inline>
            <FormItem class="form-item">
                <Row>
                    <Col span="2" style="text-align: right">
                        <FormItem>
                            <Button class="btn" type="success" icon="plus" @click="tableSearchFn(0)">表关联</Button>
                        </FormItem>
                    </Col>
                </Row>     
            </FormItem>
            <FormItem class="form-item">
                <Row>
                    <Col span="2" style="text-align: right">
                        <FormItem>
                            <Button class="btn" type="success" icon="ios-book" @click="tableSearchFn(1)">表合并</Button>
                        </FormItem>
                    </Col>
                </Row>     
            </FormItem>
            <FormItem class="form-item">
                <Row>
                    <Col span="2" style="text-align: right">
                        <FormItem>
                            <Button class="btn" type="success" icon="android-open" @click="tableSearchFn(2)">表排除</Button>
                        </FormItem>
                    </Col>
                </Row>     
            </FormItem>
        </Form>
        <!-- 表格和翻页 -->
        <div class="table-box">
            <Table :loading="loading" class="table-content" border :columns="columns" :data="intermediateLibraryDataList" @on-sort-change="sortClick"></Table>
            <Paging class="table-page" :pages="searchData.page" @pageChange="pageChangeFn"></Paging>
        </div>
    </div>
</template>

<script>
    import {getIntermediateLibraryList} from '@/service/getData';//异步请求链接
    import Paging from '@/components/common/tools/paging';//分页
    import expandRow from '@/components/systemManagement/operation/OperationExpand-row';//分页
    import {process_error} from '@/config/process_request_conf' //请求成功返回的状态
    export default {
        name: 'IntermediateLibrary',
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
                    libraryName: ''
                }, 
                columns: [
                    {title:'序号',type: 'selection',width: 60,align: 'center',class:'noExl'},
                    {title:'中间库名称',width: 200,align: 'center',key:'zjkmc',sortable: true},
                    {title:'数据条数',width: 200,align: 'center',key:'sjts',sortable: true},
                    {title:'重点人个数',width: 200,align: 'center',key:'zdrgs',sortable: true},
                    {title:'案件名称',width: 200,align: 'center',key:'ajmc',sortable: true},
                    {title:'创建人',width: 200,align: 'center',key:'cjr',sortable: true},
                    {title:'创建时间',width: 200,align: 'center',key:'cjsj',sortable: true}
                ],
                intermediateLibraryDataList: []
            }
        },
        methods:{
            //列表请求table
            async getListData(sendData) {
                this.loading = true;
                await getIntermediateLibraryList(sendData)
                .then(res => {
                    this.loading = false;
                    this.intermediateLibraryDataList = res.data;
                    console.log(this.intermediateLibraryDataList);
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
                let libraryName = this.searchData['libraryName'];
                // let endDate = (this.searchData['endDate']).join(',');//日期数组转字符串，用逗号隔开
                this.searchData.page.pageNumber = 1;
                if (libraryName ) {
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
                this.searchData['libraryName'] = [];
            },
            //表关联、合并、及排除,暂未写
            tableSearchFn(value){
                console.log(value);
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
.select-col{
  float:left;
  margin-left:5px;
  width:202px;

}
</style>
