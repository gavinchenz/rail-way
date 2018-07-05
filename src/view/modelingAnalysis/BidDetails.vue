<template>
  <div class="vue-body">
    <!-- 面包屑 -->
    <Breadcrumb class="router-box">
        <BreadcrumbItem to="/TaskDetail">返回</BreadcrumbItem>
        <BreadcrumbItem>查看详情</BreadcrumbItem>
    </Breadcrumb>
    <!-- 表格和翻页 -->
    <div class="table-box">
        <Table :loading="loading" class="table-content" border :columns="columns" :data="bidDetailsDataList" @on-sort-change="sortClick"></Table>
        <Paging class="table-page" :pages="searchData.page" @pageChange="pageChangeFn"></Paging>
    </div>
  </div>
</template>

<script>
  import {getBidDetailsList} from '@/service/getData';//异步请求链接
  import Paging from '@/components/common/tools/paging';//分页
  import expandRow from '@/components/systemManagement/operation/OperationExpand-row';//分页
  import {process_error} from '@/config/process_request_conf' //请求成功返回的状态
  export default {
    name: 'BidDetails',
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
            bidder:''
        },    
        columns: [
          // { title: "序号", type: "selection", fixed: 'left', width: 60, align: "center" },
          { title: "姓名", key: "xm", width: 100, align: "center",sortable: true },
          { title: "证件类型", key: "zjlx", width: 150, align: "center",sortable: true },
          { title: "证件号", key: "zjbh", width: 250, align: "center",sortable: true },
          { title: "乘车日期", key: "ccrq", width: 150, align: "center",sortable: true },
          { title: "乘车时间", key: "ccsj", width: 150, align: "center",sortable: true },
          { title: "票号", key: "ph", width: 100, align: "center",sortable: true },
          { title: "车次", key: "cc", width: 100, align: "center",sortable: true },
          { title: "发站", key: "fz", width: 100, align: "center",sortable: true },
          { title: "到站", key: "dz", width: 100, align: "center",sortable: true },
          { title: "车厢号", key: "cxh", width: 100, align: "center",sortable: true },
          { title: "席别", key: "xb", width: 100, align: "center",sortable: true },
          { title: "座位号", key: "zwh", width: 100, align: "center",sortable: true },
          { title: "票种", key: "pz", width: 100, align: "center",sortable: true },
          { title: "票价", key: "pj", width: 100, align: "center",sortable: true },
          { title: "售票处", key: "spc", width: 100, align: "center",sortable: true },
          { title: "窗口", key: "ck", width: 100, align: "center",sortable: true },
          { title: "售票时间", key: "spsj", width: 150, align: "center",sortable: true },
        ],
        bidDetailsDataList: [
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
          // },
          // {
          //   xm:'李某',
          //   zjlx:'身份证',
          //   zjbh:610114198707201474,
          //   ccrq:'2017-11-12',
          //   ccsj:'09:30',
          //   ph:'T2',
          //   cc:'T321',
          //   fz:'成都',
          //   dz:'西安',
          //   cxh:18,
          //   xb:'硬座',
          //   zwh:'A1',
          //   pz:'',
          //   pj:'',
          //   spc:'',
          //   ck:'',
          //   spsj:'2017-10-12'
          // },
          //                     {
          //   xm:'王某',
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
          // },
          // {
          //   xm:'刘某',
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
        this.searchData.bidder = sessionStorage.getItem('bidderId');
        console.log(this.searchData.bidder)
      },
      //查询
      searchFn() {
        let bidder = this.searchData["bidder"];
        this.searchData.page.pageNumber = 1;
        if (bidder) {
          this.getListData(this.searchData);
        } else {
          this.$Message.warning("查询内容不能为空!");
        }
      },
      //列表请求
      async getListData(sendData) {
        this.loading = true;
        await getBidDetailsList(sendData)
          .then(res => {
            this.loading = false;
            this.bidDetailsDataList = res.data.content;
            console.log(this.bidDetailsDataList);
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
