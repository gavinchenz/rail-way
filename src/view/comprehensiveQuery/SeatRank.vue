<template>
  <div class="vue-body">
    <!-- 面包屑 -->
    <Breadcrumb class="router-box">
        <BreadcrumbItem to="/index">首页</BreadcrumbItem>
        <BreadcrumbItem to="ComprehensiveQuery?condition=2">综合查询</BreadcrumbItem>
        <BreadcrumbItem>座位席别信息</BreadcrumbItem>
    </Breadcrumb>
    <!-- 查询条件 -->
    <Form :model="searchData" ref="searchForm" class="header-from">
      <FormItem class="form-item">
        <Row :gutter="16">
          <Col span="1" class="col-label">座位类型</Col>
          <Col span="4">
            <Input v-model="searchData.seatTypeName" placeholder="请输入座位类型" clearable></Input>
          </Col>
          <Col span="2" class="col-label">
            <Button type="primary" icon="ios-search" @click="searchFn">查询</Button>
          </Col>
          <Col span="2" class="col-label">
            <Button type="ghost" @click="handleResetFn" icon="refresh">重置</Button>
          </Col>
        </Row>
      </FormItem>
    </Form>
    <!-- 表格和翻页 -->
    <div class="table-box">
      <Table :row-class-name="rowClassName"  height="520" :loading="loading" :columns="columns"  :data="seatRankDataList"
             @on-sort-change="sortClick"  size="small"></Table>
      <Paging class="table-page" :pages="searchData.page" @pageChange="pageChangeFn"></Paging>
    </div>
    <!-- 新增 -->
  </div>
</template>

<script>
    import {querySeatRank} from '@/service/getData';//异步请求链接
    import Paging from '@/components/common/tools/paging';//分页
    import expandRow from '@/components/systemManagement/operation/OperationExpand-row';//分页
    import {process_error} from '@/config/process_request_conf' //请求成功返回的状态
    export default {
      name: 'SeatRank',
      components: {Paging, expandRow},
      data () {
        return {
          loading: false, //布尔值判断 用于异步请求的样式
          searchData: {//查询条件
            page: {//翻页相关
              totalElements: 0,
              size: 10,//一页10行
              pageNumber: 1,//第一页
              sort: "id,desc"//排序，按最后修改时间和降序
            },
            seatTypeName: ""
          },
          columns: [
            {title:'序号',type: 'index',width: 60},
            {title:'标识',width: 200,align: 'center',key:'seatTypeCode',sortable: true},
            {title:'座位类型',width: 200,align: 'center',key:'seatTypeName',sortable: true},
            {title:'默认类型',width: 200,align: 'center',key:'displaySeatTypeName',sortable: true}
          ],
          seatRankDataList: []
        }
      },
    methods: {
      rowClassName(row) {
        return 'demo-table-info-row';
      },
      //列表请求
      async getListData(sendData) {
        this.loading = true;
        await querySeatRank(sendData)
          .then(res => {
            this.loading = false;
            this.seatRankDataList = res.data.content;
            this.searchData.page.totalElements = res.data.totalElements;
          });
      },
      //分页请求
      pageChangeFn(page) {
        this.searchData["page"]["pageNumber"] = page.pageNumber;
        this.searchData["page"]["size"] = page.size;
        this.getListData(this.searchData);
      },
      //查询
      searchFn() {
        let rule = this.searchData["seatTypeName"];
        this.searchData.page.pageNumber = 1;
        if (rule) {
          this.getListData(this.searchData);
        } else {
          this.$Message.warning("请输入查询内容!");
        }
      },
      //重置查询
      handleResetFn() {
        this.clearSearchInfo();
        this.getListData(this.searchData);
      },
      //清空查询
      clearSearchInfo() {
        this.searchData["seatTypeName"] = "";
      },
      chooseSource(obj){
        this.addInfo.sourceid= obj.value;
      },
      async sortClick(column) {
        if (column.order != "normal") {
          this.searchData.page.sort = (column.key + "," + column.order);
        }
        this.getListData(this.searchData);
      },
    },
    mounted() {
      this.getListData(this.searchData);
    }
  };
</script>

<style scoped >

</style>
