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
        <Button type="warning" @click="del" size="small" ><Icon type="close"></Icon>&nbsp;批量删除</Button> //v-auth="0-1-3-3"
        <Button type="error" @click="delAll" size="small" ><Icon type="close-circled"></Icon>&nbsp;全部删除</Button> //v-auth="0-1-3-4"
      <Row type="flex" style="margin-top: 10px">
        <CheckboxGroup v-model="checkedList">
          <MarkItem :filter="filterData" :listData="list" @removeCard="removeCardFn"></MarkItem>
        </CheckboxGroup>
      </Row>
      <Paging :pages="searchData.page" @pageChange="pageChangeFn"></Paging>
    </div>
  </Row>
</template>
<script>
  import {viewCaseobject,deleteCaseobjectnum,deleteNumByObject} from '@/service/getData'
  import Paging from '@/components/common/tools/paging'
  import MarkItem from "../MarkList";

  import {process_error} from '@/config/process_request_conf'
  export default {
    name: "SeeMoreSave",
    components:{
      Paging,MarkItem
    },
    data() {
      return {
        filterData: 1,
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
          .catch(err => console.log(err))
      },

      // 分页及复合搜索处理
      pageChangeFn(page) {
        this.searchData.page['pageNumber'] = page.pageNumber;
        this.searchData.page['size'] = page.size;
        this.viewData(this.searchData)
      },

      //删除单个
      removeCardFn(msg){
        this.$Modal.confirm({
          title: '警告',
          content: '<p>是否要删除【<span style="font-weight: bold;color: #2d5ba6">'+ this.list[msg.index].identify+'</span>】?</p>',
          onOk: async () => {
            await deleteCaseobjectnum(msg.id)
              .then(msg=>{
                if(msg.statusCode !== 200) return process_error(msg);
                this.$Message.success(`${msg.message}`);
                this.viewData(this.searchData);
                this.checkedList =[];
              })
              .catch(err=>{
                this.$Message.error(err)
              })
          }
        });
      },

      //批量删除
       del(){
        if(this.checkedList.length > 0){
        this.$Modal.confirm({
          title: '警告',
          content: '<p>是否要删除已选标识?</p>',
          onOk: async () => {
            this.searchData.caseobjectnumId = this.checkedList.toString();
            await deleteCaseobjectnum(this.searchData['caseobjectnumId'])
              .then(res => {
                if(res.statusCode !== 200) return process_error(res);
                this.$Message.success(`${res.message}`);
                this.viewData(this.searchData);
                this.checkedList=[];
              })
              .catch(err => console.log(err))
          }
        })
        }else {
          this.$Message.warning('请选择要删除的标识');
        }
      },

      //全部删除
      delAll(){
          this.$Modal.confirm({
            title: '警告',
            content: '<p>是否要删除全部标识?</p>',
            onOk: async () => {
              await deleteNumByObject(this.searchData.objectId)
                .then(res => {
                  if(res.statusCode !== 200) return process_error(res);
                  this.$Message.success(`${res.message}`);
                  this.viewData(this.searchData);
                  this.checkedList=[];
                })
                .catch(err => console.log(err))
            }
          })
        }

    },
    mounted(){
      this.checkedList=[];
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
