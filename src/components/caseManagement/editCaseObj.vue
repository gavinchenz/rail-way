<template>    
    <Row class="vm-table vm-panel">
        <div class="panel-heading">
            <Breadcrumb separator=">">
                <BreadcrumbItem to="/">案件列表</BreadcrumbItem>

                <BreadcrumbItem v-if="cstatuscode === '1' || cissynchrocase === '0'">
                    <span @click="backToAddCase" class="addCaseStyle">案件详情</span>
                </BreadcrumbItem> 
                <BreadcrumbItem v-else>
                    <span @click="backToAddCase" class="addCaseStyle">案件管理</span>
                </BreadcrumbItem> 

                <BreadcrumbItem class="addCaseStyle">案件对象</BreadcrumbItem>
            </Breadcrumb>
            <span span="2" style="position:absolute;right:15px;top:16px;">
                <Button type="info" size="small" @click="backToAddCase('addCaseObjForm')">返回</Button>
            </span>             
        </div>
        <Row class="panel-body">
                <div v-if="signOfEditOrSee === 'view'">
                    <CaseObject ref="addCaseObj" :addCaseObjForm="addCaseObjForm" />
                </div>
                <div v-else>
                    <p class="modal_title">#案件对象</p>
                    <AddCaseObj ref="addCaseObj" :addCaseObjForm="addCaseObjForm" :isCaseObjDisabled="isCaseObjDisabled"/>
                </div>                
                <div class="caseObj_footer">
                    <Button type="primary" v-if="signOfEditOrSee === 'edit'" ref="saveBtn"  @click="saveCaseObjAndSign('addCaseObjForm')">保存</Button>
                    <Button type="success" v-if="signOfEditOrSee === 'edit'" ref="submitBtn" @click="submitCaseObjAndSign('addCaseObjForm')">提交</Button>
                    <Button type="default" v-if="signOfEditOrSee === 'edit' && isCaseObjDisabled !== true" @click="backToAddCase('addCaseObjForm')">取消</Button>
                </div>
        </Row>            
    </Row>
</template>
<script>
  import {
      caseobjectPreUpdateObject,
      caseobjectSaveOrUpdateObject
    } from '@/service/getData'
  import AddCaseObj from '@/components/caseManagement/addCaseObj'
  import CaseObject from '@/components/caseManagement/caseObject/caseObject'
  import {process_error} from '@/config/process_request_conf'

  export default {
    name: "EditCaseObj",
    components:{
      AddCaseObj,CaseObject
    },    
    data() {
      return {
        caseid:"",
        cissynchrocase:"",  // 0：同步 1：手动
        cstatuscode:"",    // 0：在办 1：结案
        cdisplay:"", // 0:保存 1：提交
        signOfEditOrSee:'view', // 默认为 查看          
        isCaseObjDisabled:false,                    
        // 对象
        addCaseObjForm:{
            "caseid":"",
            "caseobejctnumList": [],
            "display": "0",  // 0:保存  1：提交
            "id": "",
            "investigateendtime":"",
            "investigatestarttime":"",
            "oaddress": "",
            "oage":"",
            "oalias": "",
            "objectname": "",
            "obodystyle": "",
            "obrithday": "",
            "occupation": "",
            "ocharacterstyle": "",
            "ocontryarea": "",
            "odepartment": "",
            "odocumentaddress": "",
            "odocumentnumber": "",
            "odocumenttype": "",
            "oeducation": "",
            "ohomenumber": "",
            "ohomeplace": "",
            "ointroduction": "",
            "omajorsubject": "",
            "onative": "",
            "oothernumber": "",
            "opoliticalstatus": "",
            "osexual": "1",
            "oskill": "",
            "osoundstyle": "",
            "ostatus": "0",
            "otelephone": "",
            "ounitnumber": "",
            "removeobjectinvestigate": "1", // add: "0"  update:"1",
            "cdisplay":"",  // 案件信息保存 `0` / 提交状态 `1` 
            "signOfEditOrSee":"",
            "cname":"",  // 案件名称
            "cnumber":""  // 案件编号           
        },                    
      }
    },
    methods:{       
      // 获取案件对象信息  
     async getCaseObjInfo(id){
        this.resetAddCaseObjForm(); 
        console.log("eventBus 传递过来的对象id:",id);
        await caseobjectPreUpdateObject(id)
            .then(res => {
                if(res.statusCode !== 200) return process_error(res);                
                Object.assign(this.addCaseObjForm,res.data);
                console.log("addCaseObjForm:",this.addCaseObjForm);
                this.$refs.addCaseObj.updatateObjectname(res.data);  // 更新子组件中的 objectname(对象名称)
                this.addCaseObjForm['oage'] = parseInt(this.addCaseObjForm['oage'],10) || "";
                this.caseid = this.addCaseObjForm['caseid'];
            })
            .catch(err => console.log(err))                     
      },

      // 保存 案件对象信息   
      saveCaseObjAndSign(name){
        this.addCaseObjForm['display'] = '0';             
          this.$refs['addCaseObj'].$children[0].validate((valid) => {
              if (valid) {
                  caseobjectSaveOrUpdateObject(this.addCaseObjForm).then(res => {                      
                    if(res.statusCode !== 200) return process_error(res);
                    this.$Message.success(`${res.message}`);
                    let caseId = this.addCaseObjForm['caseid'];
                    this.resetAddCaseObjForm();
                    this.$router.push({path:'/addCase',query:{caseid:caseId,cdisplay:this.cdisplay,isDisabled:true}});                     
                  },err => {
                      console.log(err);
                  })
              }
          })                        
      },

     // 重置 addCaseObjForm 防止缓存
     resetAddCaseObjForm(){
        this.$clearObj.clearSimpleObj(this.addCaseObjForm);
        this.addCaseObjForm.caseobejctnumList = [];
        this.addCaseObjForm.display = '0';
        this.addCaseObjForm.ostatus = '0';
        this.addCaseObjForm.osexual = '1';
        this.addCaseObjForm.removeobjectinvestigate = '1';
     },   

      // 提交 案件对象信息
      submitCaseObjAndSign(name,sign){
          this.addCaseObjForm['display'] = '1';         
          this.$refs['addCaseObj'].$children[0].validate((valid) => {
              if (valid) {                  
                  caseobjectSaveOrUpdateObject(this.addCaseObjForm).then(res => {
                    if(res.statusCode !== 200) return process_error(res);
                    this.$Message.success(`${res.message}`);
                    let caseId = this.addCaseObjForm['caseid'];
                    this.resetAddCaseObjForm();
                    this.$router.push({path:'/addCase',query:{caseid:caseId,cdisplay:this.cdisplay,isDisabled:true}});
                  },err =>console.log(err))                                     
              } else {
                  this.$Message.error('数据校验不正确!');
              }
          })            
      }, 

      // 返回 
      backToAddCase(){
        this.resetAddCaseObjForm();
        if(this.cstatuscode === '1' || this.cissynchrocase === '0'){
          // 返回案件详情
          this.$router.push({path:'/caseDetail',query:{
            caseid:this.caseid,
            isDisabled:true,
            cissynchrocase:this.cissynchrocase,
            cstatuscode:this.cstatuscode,
            cdisplay:'1'            
          }});
        }else{
          // 返回案件管理  
          this.$router.push({path:'/addCase',query:{
            caseid:this.caseid,
            isDisabled:true,
            cissynchrocase:this.cissynchrocase,
            cstatuscode:this.cstatuscode,
            cdisplay:this.cdisplay
          }});
        }      
      }
    },
    mounted(){                           
        // sign 存在 则 显示 该页面可编辑
        if(this.$route.query.sign === 'edit'){
            this.addCaseObjForm['signOfEditOrSee'] = this.signOfEditOrSee = 'edit';            
        }else{
            this.isCaseObjDisabled = true;
            this.addCaseObjForm['signOfEditOrSee'] = this.signOfEditOrSee = 'view';            
        }
        this.cissynchrocase = this.$route.query['cissynchrocase'];
        this.cstatuscode = this.$route.query['cstatuscode'];
        this.cdisplay = this.$route.query['cdisplay'];

        let objId = this.$route.query.objectId; 
        this.getCaseObjInfo(objId);                
    },        
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
  .modal_title{
    color: black;
    font-weight: 600;
    padding:10px 0;    
  }
  .caseObj_footer{
      display: flex;
      flex-direction: row;
      justify-content: center;
      .ivu-btn{
          margin:10px 0 0 10px;
      }
  }
</style>