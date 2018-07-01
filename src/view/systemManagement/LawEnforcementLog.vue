<template>
  <div class="vue-body"> 
    <Breadcrumb class="router-box" separator="/">
      <BreadcrumbItem to="/index">首页</BreadcrumbItem>
      <BreadcrumbItem to="/SystemManagement?condition=5">系统管理</BreadcrumbItem>  
      <BreadcrumbItem to="/caseManageList">执法日志</BreadcrumbItem>
    </Breadcrumb>
    <Row class="vm-table vm-panel">
      <div class="panel-body">
        <div v-if="$store.state.auth!=null">
          <LogSearch :searchInfo="searchData" @search="search"></LogSearch>
          <Table title="日志列表" :columns="tableColumns" :data="tableData" size="small" height="520" @on-sort-change="sortClick" stripe></Table>
          <br>
          <Paging :pages="searchData.page" @pageChange="pageChange" style="padding-bottom: 100px"></Paging>
        </div>
        <NoPermission v-else></NoPermission>
      </div>
    </Row>
  </div>
</template>
<script>
  import {logList} from '@/service/getData'
  import Paging from '@/components/common/tools/paging'
  import LogSearch from '@/components/log/log-search'
  import LogInfo from '@/components/log/log-info'
  import NoPermission from '@/components/common/tools/noPermission.vue' //无权限查看的模板
  export default {
    name: 'LogList',
    components: {
      Paging, LogSearch,NoPermission
    },
    data () {
      return {
        tableData: [],
        tableColumns: [
          {
            type: 'expand',
            width: 50,
            render: (h, params) => {
              return h(LogInfo, {
                props: {
                  row: params.row,
                }
              })
            }
          },
          {title: '序号',type:'index', width: 60, align: 'center'},
          {title: '业务系统', key: 'sysName'},
          {title: '案件名称', key: 'caseName'},
          {title: '操作目标', key: 'goal'},
          {title: '操作用户', key: 'userName'},
          {title: '日志时间', key: 'logDate', sortable: 'custom'},
          {title: '操作IP', key: 'ip'}
        ],
        searchData: {
          log: {
            userName: '',
            goal: '',
            ip: '',
            caseName: '',
            sysName: '',
            beginDate: '',
            endDate : ''
          },
          page:{
            totalElements: 1,
            size: 20,
            number: 1,
            sort: "logDate,desc"
          },
        }
      }
    },
    methods: {
      //搜索
      search(data){
        this.searchData = data;
        this.searchData.page.number = 1;
        this.getTableList(this.searchData)
      },
      formatDate(date){
        let dates = new Date(date);
        let year = dates.getFullYear();
        let month = dates.getMonth() + 1;
        let day = dates.getDate()
        return year + "-" + this.formatTen(month) + "-" + this.formatTen(day);
      },
      formatTen (num){
        return num > 9 ? (num + "") : ("0" + num);
      },
      async getTableList(sendData){
        if('' != sendData.log.beginDate){
          sendData.log.beginDate = this.formatDate(sendData.log.beginDate)
        }
        if('' != sendData.log.endDate){
          sendData.log.endDate = this.formatDate(sendData.log.endDate)
        }
        await logList(sendData)
          .then(res => {
            this.tableData= res.data.content;
            this.searchData.page.totalElements = res.data.totalElements;
          })
          .catch(err => {
            console.log(err);
          })
      },
      // 分页及复合搜索处理
      pageChange(page) {
        this.searchData['page']['number'] = page.number;
        this.searchData['page']['size'] = page.size;
        this.getTableList(this.searchData)
      },
      async sortClick(column){
        if(column.order != 'normal'){
          this.searchData.page.sort=(column.key+","+column.order);
        }
        this.getTableList(this.searchData);
      }
    },
    mounted(){
      this.getTableList(this.searchData);
    }
  }
</script>
