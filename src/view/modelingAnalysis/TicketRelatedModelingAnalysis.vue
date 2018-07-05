<template>
   <div class="vue-body">
    <Breadcrumb class="router-box">
        <BreadcrumbItem to="/index">首页</BreadcrumbItem>
        <BreadcrumbItem to="/ModelingAnalysis?condition=3">建模分析</BreadcrumbItem>
        <BreadcrumbItem>涉票建模分析</BreadcrumbItem>
    </Breadcrumb>
    <Form :model="searchData" class="header-from">
        <FormItem class="form-item">
            <Row :gutter="24">
                <Col span="2" class="col-label">异常类型</Col>
                <Col span="22" class="col-checkbox">
                    <CheckboxGroup v-model="searchData.abnormalType">
                        <Checkbox label="1">相同身份证连续出票</Checkbox>
                        <Checkbox label="2">非工作时间售票</Checkbox>
                        <Checkbox label="3">重点人员分析</Checkbox>
<!--                         <Checkbox label="紧俏票分析">紧俏票分析</Checkbox>
                        <Checkbox label="重复身份证售票分析">重复身份证售票分析</Checkbox>
                        <Checkbox label="异地售票分析">异地售票分析</Checkbox>
                        <Checkbox label="行程冲突出票分析">行程冲突出票分析</Checkbox>
                        <Checkbox label="售票量突增分析">售票量突增分析</Checkbox>    -->
                    </CheckboxGroup>                
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
    <!-- 表格和翻页 -->
    <div class="table-box">
        <Table :row-class-name="rowClassName"  height="520" :loading="loading" :columns="columns" :data="ticketRelatedModelList" @on-sort-change="sortClick" @on-selection-change="selectionClick"  size="small"></Table>
        <Paging class="table-page" :pages="searchData.page" @pageChange="pageChangeFn"></Paging>
    </div>
  </div>
</template>

<script>
    import {getTicketRelatedModelList } from '@/service/getData';//异步请求链接
    import Paging from '@/components/common/tools/paging';//分页
    import expandRow from '@/components/systemManagement/operation/OperationExpand-row';//分页
    import {process_error} from '@/config/process_request_conf' //请求成功返回的状态
    import {idCard} from '@/components/common/validateFun';//校验
export default {
    name: 'TicketRelatedModelingAnalysis',
    components: {Paging, expandRow},
    data () {
        return {
            loading: false, //布尔值判断 用于异步请求的样式
            searchData: {//查询条件
                page: {//翻页相关
                    totalElements: 0,
                    size: 10,//一页10行
                    pageNumber: 1,//第一页
                    sort: "lastModifyTime,desc"//排序，按最后修改时间和降序
                },
                abnormalType: [],              
                startDate: '', 
                endDate: ''
            },            
            columns: [
                // { title: "序号", type: "selection", fixed: 'left', width: 60, align: "center" },
                { title: '售票日期',width: 300,key: 'date',sortable: true, align: "center" },  
                { title: '售处',width: 100,key: 'sellingPlace',sortable: true, align: "center" },
                { title: '窗口',width: 100,key: 'windows',sortable: true, align: "center" }, 
                { title: '同身份证多次购票总数',width: 300,key: 'tsfzdcgpzs',sortable: true, align: "center" },
                { title: '非工作时间售票总数',width: 300,key: 'fgzsjspzs',sortable: true, align: "center" },
                { title: '售重点人总数',width: 200,key: 'szdrzs',sortable: true, align: "center" },
                {
                    title: '操作',
                    width: 300,
                    align: 'center',
                    key: 'center',
                    render: (h, params) => {
                      return h("div", [h ('Button', {
                                  props: {
                                    type: "info",
                                    size: 'small'
                                  },
                                  attrs: {title: "查看结果"},
                                  style: {
                                   marginRight: '5px'
                                  },
                                  on: {click: () => {
                                          this.showRowData(params.row.id)//查看整列
                                          }
                                      }
                              },'查看结果'
                          )
                        ]
                      );
                    }
                }            
            ],
            ticketRelatedModelList: [
                {
                    date:new Date().toLocaleString(),
                    sellingPlace:3947320,
                    windows:31,
                    tsfzdcgpzs:9,
                    fgzsjspzs:4,
                    szdrzs:3,
                }
            ]
        }
    },
    methods:{
        //查询
        searchFn() {
            let abnormalType = this.searchData['abnormalType'];
            let startDate = this.searchData['startDate'];
            let endDate = this.searchData['endDate'];
            this.searchData.page.pageNumber = 1;
            if (abnormalType || startDate || endDate) {
              this.getListData(this.searchData);
            } else {
              this.$Message.warning('请输入查询内容!')
            }
        },
        //分页请求
        pageChangeFn(page) {
            this.searchData['page']['pageNumber'] = page.pageNumber;
            this.searchData['page']['size'] = page.size;
            this.getListData(this.searchData)
        },
        //列表请求
        // async getListData(sendData) {
        //     this.loading = true;
        //     await getTicketRelatedModelList(sendData)
        //     .then(res => {
        //         this.loading = false;
        //         this.ticketRelatedModelList = res.data.content;
        //         console.log(this.ticketRelatedModelList);
        //         this.searchData.page.totalElements = res.data.totalElements;
        //     })
        // },
        async sortClick(column) {
            if (column.order != 'normal') {
                this.searchData.page.sort = (column.key + "," + column.order);
            }
                this.getListData(this.searchData);
        },
        //查看详情
        showRowData(id){
            sessionStorage.setItem('ticketRelatedId',this.searchData.abnormalType);
            this.$router.push({path:'/TicketRelatedDetail'}) //功能没写完，id没传
        },
    },
    mounted() {
      this.getListData(this.searchData);
    }
};
</script>

<style scoped >
.header-box{
  height:200px;
}
</style>
