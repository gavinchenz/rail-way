<template>
  <div class="vue-body">
    <!-- 面包屑 -->
    <Breadcrumb class="router-box">
        <BreadcrumbItem to="/TicketRelatedModelingAnalysis">返回</BreadcrumbItem>
        <BreadcrumbItem>查看涉票详情</BreadcrumbItem>
    </Breadcrumb>
    <!-- 表格和翻页 -->
    <div class="table-box">
        <Table :loading="loading" class="table-content" border :columns="columns" :data="ticketRelatedDetailList" @on-sort-change="sortClick"></Table>
        <Paging class="table-page" :pages="searchData.page" @pageChange="pageChangeFn"></Paging>
    </div>
  </div>
</template>

<script>
  import {getTicketRelatedDetailList} from '@/service/getData';//异步请求链接
  import Paging from '@/components/common/tools/paging';//分页
  import expandRow from '@/components/systemManagement/operation/OperationExpand-row';//分页
  import {process_error} from '@/config/process_request_conf' //请求成功返回的状态
  export default {
    name: 'TicketRelatedDetail',
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
            ticketRelated:''
        },    
        columns: [
          // { title: "序号", type: "selection", fixed: 'left', width: 60, align: "center" },
          { title: '售票时间',width: 300,key: 'date',sortable: true, align: "center" },  
          { title: '售处',width: 100,key: 'sellingPlace',sortable: true, align: "center" },
          { title: '窗口',width: 100,key: 'windows',sortable: true, align: "center" }, 
          { title: '证件号',width: 200,key: 'idCardNumber',sortable: true, align: "center" },
          { title: '姓名',width: 100,key: 'name',sortable: true, align: "center" },
          { title: '车次',width: 100,key: 'trainNumber',sortable: true, align: "center" },
          { title: '票号',width: 100,key: 'ticketNumber',sortable: true, align: "center" },
          { title: '发站',width: 100,key: 'departureStation',sortable: true, align: "center" },
          { title: '到站',width: 100,key: 'destination',sortable: true, align: "center" },
          { title: '车厢',width: 100,key: 'carriage',sortable: true, align: "center" },
          { title: '席位',width: 100,key: 'seats',sortable: true, align: "center" },
          { title: '席别', width: 80,key: 'banning',sortable: true, align: "center" },
          { title: '证件类型',width:120,key: 'certificateType',sortable: true, align: "center" },
          { title: '乘车日期',width: 120,key: 'rideDate',sortable: true, align: "center" },
          {title: '发站时间',width: 120,key: 'commonTrajectory',sortable: true, align: "center" },
          { title: '操作员',width: 100,key: 'handle',sortable: true, align: "center" }
        ],
        ticketRelatedDetailList: [
          // {
          //   xm:'张某',
          //   zjlx:'身份证',
          //   zjbh:610114197708157312,
          //   ccrq:'2017-12-1',
          //   ccsj:'05:25',
          //   ph:'T1',
          //   cc:'T123',
          //   fz:'西安',
          //   dz:'成都',
          //   cxh:11,
          //   xb:'上铺',
          //   zwh:'A1',
          //   pz:'',
          //   pj:'',
          //   spc:'',
          //   ck:'',
          //   spsj:'2017-11-15'
          // }
        ]//table里的数据，异步获取列表信息
      }
    },
    methods:{
      //获取sessionStorage
      getMsgFn(){
        this.searchData.ticketRelated = sessionStorage.getItem('ticketRelatedId');
        console.log(this.searchData.ticketRelated)
      },
      //查询
      searchFn() {
        let ticketRelated = this.searchData["ticketRelated"];
        this.searchData.page.pageNumber = 1;
        if (ticketRelated) {
          this.getListData(this.searchData);
        } else {
          this.$Message.warning("查询内容不能为空!");
        }
      },
      //列表请求
      async getListData(sendData) {
        this.loading = true;
        await getTicketRelatedDetailList(sendData)
          .then(res => {
            this.loading = false;
            this.ticketRelatedDetailList = res.data.content;
            console.log(this.ticketRelatedDetailList);
            this.searchData.page.totalElements = res.data.totalElements;
          });
      },
    },
    mounted(){
      this.getMsgFn();
      this.searchFn();
      this.getListData(this.searchData);
    }
  };
</script>

<style scoped >

</style>
