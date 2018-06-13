<template>
    <Row class="vm-table vm-panel">
      <div class="panel-heading">
        <Breadcrumb separator=">">
          <BreadcrumbItem to="/CaseManageList">案件列表</BreadcrumbItem>
          <BreadcrumbItem>
            <span class="addCaseStyle"> 案件详情</span>
          </BreadcrumbItem>
        </Breadcrumb>

        <span span="2" style="position:absolute;right:15px;top:16px;">
            <Button type="info" size="small" @click="backCaseManageList">返回列表</Button>
        </span>         
      </div>
      <div class="panel-body">
        <!--案件信息-->
        <section>
            <CaseInfo :caseInfo="addCaseInfo" ref="caseInfo"></CaseInfo>
        </section>

        <!--对象信息-->
        <section>
            <p class="title-lv1">
              <span>对象信息</span>              
            </p>          
            <CaseObjectInfoList />
        </section>
      </div>
    </Row>
</template>
<script>
  import {caseinfoViewCase,caseinfoDepartUser} from '@/service/getData'
  import CaseInfo from '@/components/caseManagement/caseDetail/caseInfo'
  import CaseObjectInfoList from '@/pages/caseManagement/CaseObjectInfoList'
  import {mapMutations} from 'vuex'
  import {process_error} from '@/config/process_request_conf'
  export default {
    name: "AddCase",
    components:{
      CaseInfo,CaseObjectInfoList
    },
    data() {
      return {
        caseid:'',
        addCaseInfo: {
          "casemansList": [],
          "id":'',
          "cnumber":"",
          "cname": "",
          "ccategory": "",
          "cappovalnumber":"",
          "ccategorycode": "",
          "cdisplay": "0", // 0:save  1: submit
          "cinvestigateendtime": "",
          "cinvestigatestarttime": "",
          "cproperty":"",
          "cacceptancenumber":"",
          "cacceptancedate":"",
          "cinvestigatepurpose":"",
          "cturncasecategory":"",
          "cturncasecategorycode":"",
          "cissynchrocase": "",
          "cturncaseman": "",
          "cregistedepartment": "",
          "cpropertydetail": "",
          "cassistcategory": "",
          "cassistcategorycode":"",
          "cremoteacceptancenumber": "",          
          "cusemethod": "",
          "czyqs": "",
          "clevel": "",
          "clevelcode":"",
          "cturncaseunit": "",
          "cturncasenumber": "",
          "cregisterman": "",
          "cregistedate": "",
          "csituation":"",
          "cbook": "",
          "cexplain": "",
          "cpurpose": "",
          "cremarks": "",
          "cstatus": "",
          "cstatuscode": "0",  // 0:在办 1：结案
          "ctype": "",
          "ctypecode": "",
          "cundertakeUser":"",  //承办人
          "cundertakeDept":"", // 所在部门
          "cundertakeUserStr":"",
          "userStr":"",
          "caseObjectSize":"" //案件对象个数
        },
        // 侦办人 | 承办人 tree data
        cunderAnduserTreeData:[],
      }
    },
    methods:{
      ...mapMutations([
        'SAVE_INVESTIGATE_TREE'
      ]),

      // 获取案件信息      
      async getCaseInfo(caseid){
        await caseinfoViewCase(caseid)
        .then(res => {
          if(res.statusCode !== 200) return process_error(res);
          sessionStorage.setItem("save_case_Info",JSON.stringify(res.data)); // 更新sessionStorage中 save_case_Info          
          Object.assign(this.addCaseInfo,res.data);
          
          let userStr = "";
          res.data.casemansList.forEach(v => {
            userStr += `${v.username}(${v.departmentname})  `;
          })
          this.addCaseInfo.userStr = userStr;
          if(!!res.data.cundertakeUserName){
            this.addCaseInfo.cundertakeUserStr = !!res.data.cundertakeDeptName ? `${res.data.cundertakeUserName}(${res.data.cundertakeDeptName})` : `${res.data.cundertakeUserName}`;
          }
        })
        .catch(err => console.log(err))
      },

    // 返回案件列表
    backCaseManageList() {
        this.$router.push({path:'/caseManageList'});
    },

    },
    mounted(){
      this.caseid = this.$route.query.caseid;
      this.getCaseInfo(this.caseid);
    }
  }
</script>

<style lang="less" scoped>
  .addCaseStyle{
      cursor: pointer;
      color:#495060;
      &:hover{
          color: #4776c8;
      }
  }  
  .title-lv1{
    height:30px;
    span{
      margin-right: 20px;
      display: inline-block;
      font:bold 14px/30px microsoft Yahei;
    }
    .ivu-icon{
      padding:5px 5px 0px 0px;
    }
  }  
</style>

