<template>
  <div class="vue-body">
    <!-- 面包屑 -->
    <Breadcrumb class="router-box">
        <BreadcrumbItem to="/ComprehensiveQuery">返回</BreadcrumbItem>
        <BreadcrumbItem>查询结果</BreadcrumbItem>
    </Breadcrumb>
    <!-- 表格和翻页 -->
    <div class="table-box">
        <Table :loading="loading" class="table-content" border :columns="columns" :data="queryResultDataList" @on-sort-change="sortClick"></Table>
        <Paging class="table-page" :pages="searchData.page" @pageChange="pageChangeFn"></Paging>
    </div>
  </div>
   <!--  <div class="header-box">
      <ul class="query-result">
        <li class="header-li">
          <label class="tit-label">姓名</label>
          <Input class="tit-input" v-model="userName" placeholder="请输入姓名" clearable style="width: 200px"></Input>
          <label class="tit-label">身份证号</label>
          <Input class="tit-input" v-model="idCard" placeholder="请输入身份证号" clearable style="width: 200px"></Input>
          <label class="tit-label">车牌号</label>
          <Input class="tit-input" v-model="plateNumber" placeholder="请输入车牌号" clearable style="width: 200px;"></Input>
          <label class="tit-label">籍贯</label>
          <Input class="tit-input" v-model="nativePlace" placeholder="请输入籍贯" clearable style="width: 200px"></Input>
          <Button class="btn" type="primary">精确查询</Button>
        </li>
        <li class="header-li">
          <label class="tit-label">其他关键词</label>
          <Input class="tit-input" v-model="keyWord" placeholder="30-40岁男 南方口音 到西安 到成都" clearable style="width: 800px"></Input>
          <Button class="btn" type="primary">模糊查询</Button>
        </li> -->
        <!-- <li class="header-li">
          <Button class="btn" type="primary">模糊查询</Button>
          <Button class="btn" type="ghost">重置</Button>
        </li> -->
      <!-- </ul> -->
    <!-- </div -->
</template>

<script>
    import {getQueryResultList} from '@/service/getData';//异步请求链接
    import Paging from '@/components/common/tools/paging';//分页
    import expandRow from '@/components/systemManagement/operation/OperationExpand-row';//分页
    import {process_error} from '@/config/process_request_conf' //请求成功返回的状态
    export default {
        name: 'QueryResult',
        components: {Paging, expandRow}, 
        data () {
            return {
                // userName:"",
                // idCard:"",
                // plateNumber:"",
                // nativePlace:"",
                // keyWord:"",
                loading: false, //布尔值判断 
                searchData: {//查询条件
                    page: {//翻页相关
                        totalElements: 0,
                        size: 10,//一页10行
                        pageNumber: 1,//第一页
                        sort: "lastModifyTime,desc"//排序，按最后修改时间和降序
                    },                    
                    searchMsg:''
                },    
                columns: [
                {title:'序号',type: 'selection',width: 60,fixed: 'left'},
                {title:'姓名',width: 100,align: 'center',key:'xm',sortable: true},
                {title:'相似度',width: 100,align: 'center',key:'xsd',sortable: true},
                {title:'身份证号',width: 300,align: 'center',key:'sfzh',sortable: true},
                {title:'手机号',width: 200,align: 'center',key:'sjh',sortable: true},
                {title:'车牌号',width: 150,align: 'center',key:'cph',sortable: true},
                {title:'籍贯',width: 150,align: 'center',key:'jg',sortable: true},
                {title:'来源',width: 200,align: 'center',key:'ly',sortable: true},
                {title:'详细信息',width: 600,align: 'center',key:'xxxx',sortable: true},
                ],
                queryResultDataList: []
            }
        },
        methods:{
          //获取sessionStorage
          getMsgFn(){
            this.searchData.searchMsg = sessionStorage.getItem('Msg');
            console.log(this.searchData.searchMsg)
          },
          //查询
          searchFn() {
            let msg = this.searchData["searchMsg"];
            this.searchData.page.pageNumber = 1;
            if (msg) {
              this.getListData(this.searchData);
            } else {
              this.$Message.warning("查询内容不能为空!");
            }
          },
          //列表请求
          async getListData(sendData) {
            this.loading = true;
            await getQueryResultList(sendData)
              .then(res => {
                this.loading = false;
                this.queryResultDataList = res.data.content;
                console.log(this.queryResultDataList);
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
