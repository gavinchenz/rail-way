<template>
  <Row class="vm-table vm-panel">
    <div class="panel-heading">
      <Breadcrumb separator=">">
        <BreadcrumbItem href="/caseManageList">案件列表</BreadcrumbItem>

        <BreadcrumbItem v-if="cstatuscode === '1' || cissynchrocase === '0'">
            <span @click="backToAddCase" class="addCaseStyle">案件详情</span>
        </BreadcrumbItem> 
        <BreadcrumbItem v-else>
            <span @click="backToAddCase" class="addCaseStyle">案件管理</span>
        </BreadcrumbItem> 
                  
        <BreadcrumbItem class="addCaseStyle">查看更多</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="panel-body">
      <Button icon="chevron-left" @click="backToAddCase">返回</Button>
      <br><br>
      <Row type="flex" style="margin-top: 10px">
        <CheckboxGroup v-model="checkedList">
          <MarkItem :filter="filterData" :listData="list"></MarkItem>
        </CheckboxGroup>
      </Row>
      <Paging  :pages="searchData.page" @pageChange="pageChangeFn"></Paging>
    </div>
  </Row>
</template>
<script>
  import {viewCaseobject} from '@/service/getData'
  import Paging from '@/components/common/tools/paging'
  import MarkItem from "../MarkList";

  import {process_error} from '@/config/process_request_conf'
  export default {
    name: "SeeMoreLifted",
    components:{
      Paging,MarkItem
    },
    data() {
      return {
        filterData: 0,
        todoitem:false,
        markData:false,
        searchData:{
          page:{
            totalElements: 1,
            size: 40,
            pageNumber:1,
            sort:'',
          },
          objectId:"",
        },
        list:[],
        caseid:"",
        checkedList:[],
        cissynchrocase:"", // 0：同步过来的案件 1：手动录入的案件
        cstatuscode:"", // 0：在办 1：结案 
        cdisplay:"" //  0:保存 1：提交        
      }
    },
    methods: {
      
      // 点击 案件管理 或 返回
      backToAddCase(){
        if(this.cstatuscode === '1' || this.cissynchrocase === '0'){
          this.$router.push({path:'/caseDetail',query:{
            caseid:this.caseid,
            isDisabled:true,
            cissynchrocase:this.cissynchrocase,
            cstatuscode:this.cstatuscode,
            cdisplay:'1'
          }});
        }else{
          this.$router.push({path:'/addCase',query:{
            caseid:this.caseid,
            isDisabled:true,
            cissynchrocase:this.cissynchrocase,
            cstatuscode:this.cstatuscode,
            cdisplay:this.cdisplay
          }});
        }
      },      

      // 获取标识列表
      async viewData(sendData){
        await viewCaseobject(sendData)
          .then(res => {
            if(res.statusCode !== 200) return process_error(res);
            this.list = res.data.content;
            this.searchData.page.totalElements = res.data.totalElements;
          })
      },
      // 分页及复合搜索处理
      pageChangeFn(page) {
        this.searchData.page['pageNumber'] = page.pageNumber;
        this.searchData.page['size'] = page.size;
        this.viewData(this.searchData)
      },
    },
    mounted(){
      this.searchData.objectId = this.$route.query.id;
      this.caseid = this.$route.query.caseid;
      this.cissynchrocase = this.$route.query.cissynchrocase;
      this.cstatuscode = this.$route.query.cstatuscode;
      this.cdisplay = this.$route.query.cdisplay; 

      console.log("cissynchrocase:",this.$route.query['cissynchrocase']);
      console.log("cstatuscode",this.$route.query['cstatuscode']);
      console.log("cdisplay",this.$route.query['cdisplay']);

      this.viewData(this.searchData);
    }
  }
</script>

<style scoped lang="less">
  .addCaseStyle{
      cursor: pointer;
      color:#495060;
      &:hover{
          color: #4776c8;
      }
  }   
  .card {
    overflow: hidden;
    width:200px;
    margin-right: 5px;
    margin-bottom: 5px;
  }
  .hasChecked{
    background: #9ea3b1;
  }
</style>
