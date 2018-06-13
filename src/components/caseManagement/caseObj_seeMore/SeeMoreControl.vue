<template>
  <Row class="vm-table vm-panel">
    <div class="panel-heading">
      <Breadcrumb separator=">">
        <BreadcrumbItem  to="/caseManageList">案件列表</BreadcrumbItem>

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
      <RadioGroup v-model="filterData" @on-change="onChange" type="button" style="margin-right: 20px">
        <Radio :label="0">全部</Radio>
        <Radio :label="1">保存</Radio>
        <Radio :label="2">在控</Radio>
        <Radio :label="3">解除侦控</Radio>
      </RadioGroup>

      <span style="height: 36px;padding-top: 10px">
        <span v-if="filterData === 1">
          <Button type="ghost" @click="submit" size="small" ><Icon type="checkmark"></Icon> 批量提交</Button> //v-auth="0-1-3-5"
          <Button type="info" @click="submitAll" size="small" ><Icon type="checkmark-circled"></Icon> 全部提交</Button> //v-auth="0-1-3-6"
          <Button type="warning" @click="del" size="small" ><Icon type="close"></Icon>&nbsp;批量删除</Button> //v-auth="0-1-3-3"
          <Button type="error" @click="delAll" size="small" ><Icon type="close-circled"></Icon>&nbsp;全部删除</Button> //v-auth="0-1-3-4"
        </span>
        <span v-else-if="filterData === 2">
          <Button type="ghost" @click="removedMark" size="small" ><Icon type="reply"></Icon> 批量撤号</Button> //v-auth="0-1-3-1"
          <Button type="info" @click="removedMarkAll" size="small" ><Icon type="reply-all"></Icon> 全部撤号</Button> //v-auth="0-1-3-2"
        </span>
      </span>

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
  import {
    viewCaseobject,
    relieveCaseobjectnum,
    batchSubmitNums,
    batchSubmitNumsByObjId,
    allRelieveCaseobjectnum,
    deleteCaseobjectnum,
    deleteNumByObject
  } from '@/service/getData'
  import Paging from '@/components/common/tools/paging'
  import MarkItem from "../MarkList";

  import {process_error} from '@/config/process_request_conf'
  export default {
    name: "SeeMoreControl",
    components:{
      Paging,MarkItem
    },
    data() {
      return {
        filterData: 0,
        searchData:{
          page:{
            totalElements: 1,
            size: 40,
            pageNumber:1,
            sort:'',
          },
          objectId:"",
          removenumber:"",
          display:"0",
          caseobjectnumId:[],
          types:""
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

      //删除标识
      removeCardFn(msg){
        this.$Modal.confirm({
          title: '警告',
          content: '<p>是否要删除【<span style="font-weight: bold;color: #2d5ba6">'+ this.list[msg.index].identify+'</span>】?</p>',
          onOk: async () => {
            await deleteCaseobjectnum(msg.id)
              .then(msg=>{
                if(msg.statusCode !== 200) return process_error(msg);
                this.searchData.types = "1";
                this.viewData(this.searchData);
                this.$Message.success(`${msg.message}`);
                this.checkedList =[];
              })
              .catch(err => console.log(err))
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
                  this.searchData.types = "1";
                  this.viewData(this.searchData);
                  this.$Message.success(`${res.message}`);
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
          content: '<p>是否要删除全部保存状态的标识?</p>',
          onOk: async () => {
            await deleteNumByObject(this.searchData.objectId)
              .then(res => {
                if(res.statusCode !== 200) return process_error(res);
                this.searchData.types = "1";
                this.viewData(this.searchData);
                this.$Message.success(`${res.message}`);
                this.checkedList=[];
              })
              .catch(err => console.log(err))
          }
        })
      },

      //批量撤号
      removedMark(){
        if(this.checkedList.length > 0){
         this.$Modal.confirm({
         title: '警告',
           content: '<p>是否对<span style="font-weight: bold;color: #2d5ba6">选中标识</span>撤号?</p>',
           onOk: () => {
               this.searchData.caseobjectnumId = this.checkedList.toString();
                relieveCaseobjectnum(this.searchData['caseobjectnumId'])
                 .then(msg=>{
                   if(msg.statusCode !== 200) return process_error(msg);
                   this.searchData.caseobjectnumId=[];
                   this.searchData.types = "2";
                   this.viewData(this.searchData);
                   this.$Message.success(`${msg.message}`);
                   this.checkedList =[];
                 })
                 .catch(err=>console.log(err))
           }
         })
        }else {
          this.$Message.warning('请选择标识');
        }
      },

      //全部撤号
      removedMarkAll(){
          this.$Modal.confirm({
            title: '警告',
            content: '<p>是否对该对象下标识<span style="font-weight: bold;color: #2d5ba6">全部撤号?</span></p>',
            onOk: async() => {
              await allRelieveCaseobjectnum(this.searchData['objectId'])
                .then(msg=>{
                  if(msg.statusCode !== 200) return process_error(msg);
                  this.searchData.types = "2";
                  this.viewData(this.searchData);
                  this.searchData.caseobjectnumId=[];
                  this.$Message.success(`${msg.message}`);
                  this.checkedList =[];
                })
                .catch(err=>console.log(err))
            }
          })
      },

      //批量提交
      submit(){
          this.$Modal.confirm({
            title: '警告',
            content: '<p>是否执行<span style="font-weight: bold;color: #2d5ba6">选中标识</span>提交?</p>',
            onOk: async() => {
              this.searchData.caseobjectnumId = this.checkedList.toString();
              await batchSubmitNums(this.searchData)
                .then(msg=>{
                  if(msg.statusCode !== 200) return process_error(msg);
                  this.searchData.types = "1";
                  this.viewData(this.searchData);
                  this.searchData.caseobjectnumId=[];
                  this.$Message.success(`${msg.message}`);
                  this.checkedList =[];
                })
                .catch(err=>console.log(err))
            }
          })
      },

      //全部提交
      submitAll(){
          this.$Modal.confirm({
            title: '警告',
            content: '<p>是否执行<span style="font-weight: bold;color: #2d5ba6">全部标识</span>提交?</p>',
            onOk: async() => {
              this.searchData.caseobjectnumId = this.checkedList.toString();
              await batchSubmitNumsByObjId(this.searchData['objectId'])
                .then(msg=>{
                  if(msg.statusCode !== 200) return process_error(msg);
                  this.searchData.types = "1";
                  this.viewData(this.searchData);
                  this.searchData.caseobjectnumId=[];
                  this.$Message.success(`${msg.message}`);
                  this.checkedList =[];
                })
                .catch(err=>console.log(err))
            }
          })
      },

      //过滤回调
      onChange(data){
       switch (data){
         case 0: //全部
           this.searchData['types'] = '0';
           break;
         case 1: //保存
           this.searchData['types'] = '1';
           break;
         case 2: //在控
           this.searchData['types'] = '2';
           break;
         case 3: //撤号
           this.searchData['types'] = '3';
           break;
       }
        this.checkedList =[];
        this.viewData(this.searchData);
        this.searchData['types'] = '';
      },
    },
    mounted(){
      this.searchData.objectId = this.$route.query.id;
      this.searchData.removenumber = this.$route.query.removenumbers;
      this.searchData.display = this.$route.query.displays;
      // 批量提交、批量撤号 通过路由 传递的 filter 应和 按钮的 label 相对应!!!
      this.searchData.types = this.filterData = parseInt(this.$route.query.filter,10);
      this.caseid = this.$route.query.caseid;

      this.cissynchrocase = this.$route.query.cissynchrocase;
      this.cstatuscode = this.$route.query.cstatuscode;
      this.cdisplay = this.$route.query.cdisplay;

      this.list = this.checkedList = [];
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
