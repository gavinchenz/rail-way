<template>
    <Row class="vm-table vm-panel">
        <div class="panel-heading">
            <Breadcrumb separator=">">
                <BreadcrumbItem to="/">案件列表</BreadcrumbItem>
                <BreadcrumbItem>
                    <span @click="backToAddCase" class="addCaseStyle">案件管理</span>
                </BreadcrumbItem>
                <BreadcrumbItem to="/caseObjAndSign">新增案件对象及标识</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <Row class="panel-body">
            <div>
                <p class="modal_title">#案件对象</p>
                <AddCaseObj ref="addCaseObj" :addCaseObjForm="addCaseObjForm" :isCaseObjDisabled="isCaseObjDisabled"/>
            </div>
            <section>
                <p class="modal_title">#案件标识</p>
              <Row>
                <Col span="18" offset="2">
                <div class="modal_title">
                  <RadioGroup v-model="filter" @on-change="addCaseSign" type="button">
                    <Radio label="0">添加标识</Radio>
                    <Radio label="1">批量添加标识</Radio>
                  </RadioGroup>
                </div>
                <!--添加标识-->
                <div v-show="showSignList">
                  <Row class="singleSignCls">
                    <Form ref="singleTempObj" :model="singleTempObj" :rules="ruleValidate">
                      <Col span="4">
                      <FormItem>
                        <Select v-model="singleTempObj.identifytype" style="width:100%" placeholder="请选择号码类型" @on-change="chooseNumberType" label-in-value>
                          <Option v-for="(item,index) in numTypeList" :key="item.id" :value="item.code">{{item.name}}</Option>
                        </Select>
                      </FormItem>
                      </Col>
                      <Col span="4" offset="1">
                      <FormItem prop="identify">
                        <Input v-model="singleTempObj.identify" style="width: 100%" :maxlength=50 placeholder="请输入侦控号码"/>
                      </FormItem>
                      </Col>
                      <Col span="4" offset="0">
                      <FormItem>
                        <Button type="ghost" icon="plus-round" @click="addSingleCaseSignFn('singleTempObj')" >添加</Button> //v-auth="0-1-2-7"
                      </FormItem>
                      </Col>
                    </Form>
                  </Row>
                  <AddSignList :columns="columns" :tableData="singlePushArr" @concatTableData="concatTableDataFn"
                                @updateSinglePushArr="updateSinglePushArrFn"/>
                </div>
                <!--批量添加标识-->
                <div v-if="Array.isArray(numTypeList) && numTypeList.length !== 0">
                  <AddSignForm :numTypeList="numTypeList" @batchPushSignToAddCaseObjForm="batchPushSignToAddCaseObjFormFn"
                                @disabledSaveOrsubmitSign="disabledSaveOrsubmitSignFn" v-show="!showSignList"
                                ref="AddSignFormDom"/>
                </div>
                </Col>
              </Row>
            </section>
            <br/>
            <hr/>
            <div class="caseObj_footer">
                <Button type="primary" ref="saveBtn" :disabled = "judgeByAddSignForm" @click="saveCaseObjAndSign('addCaseObjForm')"
               >保存</Button>  // v-auth="0-1-2-2"
                <Button type="success" ref="submitBtn" :disabled = "judgeByAddSignForm" @click="submitCaseObjAndSign('addCaseObjForm','submit')" v-if="addCaseObjForm.cdisplay === '1'" >提交</Button> //v-auth="0-1-2-2"
                <Button type="default" @click="cancelCaseObjAndSign('addCaseObjForm')" >取消</Button> //v-auth="0-1-2-2"
            </div>
        </Row>
    </Row>
</template>
<script>
  import {caseobjectSaveOrUpObjectandNum} from '@/service/getData'
  import AddCaseObj from '@/components/caseManagement/addCaseObj'
  import AddSignList from '@/components/caseManagement/caseSign/addSignList'
  import AddSignForm from '@/components/caseManagement/caseSign/addSignForm'
  import {arrDistinct,arrDistinctSubmit} from '@/utils/removeDuplicates'
  import {mapMutations} from 'vuex'

  import {process_error} from '@/config/process_request_conf'

  export default {
    name: "CaseObjAndSign",
    components:{
      AddCaseObj,AddSignList,AddSignForm
    },
    data() {
      const validateNumber = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('不能为空,只能为数字'));
        }else if(value.length>50){
            callback(new Error('最多输入50个数字'));
        }else {
          if(!Number.isInteger(parseInt(value,10))) {
            callback(new Error('只能为数字'));
          }else {
            callback();
          }
        }
      };

      return {
        cname:"", // 案件名称
        isCaseObjDisabled:false,
        addCaseObjModal:false,
        numTypeList:[],
        singleTempObj:{
            identify: "",
            identifytype: "",
            identifytypeStr: ""
        },
        distinguishSaveOrSubmit:0, // 0:保存 | 1：提交
        judgeByAddSignForm:false, // 批量添加标识校验未通过则禁用保存和提交按钮
        cissynchrocaseCdisplay:"", // 1：同步案件新增对象 "":手动录入新增对象

        filter: '0',
        showSignList:true,
        // 对象及标识
        singlePushArr:[],
        batchPushArr:[],
        addCaseObjForm:{
            "caseid":"",
            "caseobejctnumList": [],
            "display": "0",
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
            "ostatus": "0", // 0:手动录入 null:非手动录入
            "otelephone": "",
            "ounitnumber": "",
            "removeobjectinvestigate": "1", // add: "0"  update:"1",
            "cdisplay":"",  // 案件信息保存 `0` / 提交状态 `1`
            "cname":"",
            "cnumber":"",
            "osexualStr":"",  // 性别
            "onativeStr":"",   // 民族
            "oeducationStr":"",  // 学历
            "odocumenttypeStr":"" // 证件类型
        },
        columns:[
            // {field:'index',title:"序号",width:80,titleAlign:'center',columnAlign:'center',isEdit:false,
            // formatter:function(rowData,rowIndex,pagingIndex,field){
            //     return `<span class='cell-edit-color'>${rowData[field]}</span>`;
            // },isResize:true},
            {field:'identifytypeStr',title:"号码类型",width:200,titleAlign:'center',columnAlign:'center',isResize:true},
            {field:'identify',title:"侦控号码",width:200,titleAlign:'center',columnAlign:'center',isEdit:false,isResize:true},
            {field:'action',title:"操作",width:290,titleAlign:'center',columnAlign:'center',componentName:'table-operation',isResize:true}
        ],
        ruleValidate:{
          identify:[
            {required:false,type:'string',name:'侦控号码',fieldName:'identify',validator:validateNumber,trigger:'blur'}
          ]
        }
      }
    },
    methods:{

       ...mapMutations([
            'UPDATE_CASE_OBJ_SIGN'
       ]),

      // 选择数据类型
      chooseNumberType(obj){
        this.singleTempObj.identifytype = obj.value;
        this.singleTempObj.identifytypeStr = obj.label;
      },

      // 列表删除操作
      concatTableDataFn(index){
          this.singlePushArr.slice(index,1);
          console.log("删除标识列表后--单独添加标识的暂存数组:",this.singlePushArr);
      },

     // 标识列表编辑修改 --通过 index 更新 侦控号码
     updateSinglePushArrFn(index,newValue){
        this.singlePushArr[index]['identify'] = newValue;
        console.log("编辑标识列表后--单独添加标识的暂存数组:",this.singlePushArr);
     },

     // 单独添加 / 批量添加   （切换按钮）
      addCaseSign(val){
        switch(val){
          case '0':this.showSignList = true;break;
          case '1':this.showSignList = false;break;
          default:this.showSignList = true;
        }
      },

      // 单独添加标识存放数组 --> singlePushArr
      addSingleCaseSignFn(name){
        if(this.singleTempObj['identifytype'] === '' && !!this.singleTempObj['identify'] === ''){
          return this.$Message.warning(`标识类型或号码不能为空！`);
        }
        this.$refs[name].validate((valid)=>{
          if(valid){
            let rowParams = {
                "caseid":this.addCaseObjForm['caseid'],
                "display":"0",  // 0:保存 1:提交
                "id": "",
                "identify":parseInt(this.singleTempObj.identify,10),
                "identifytype":this.singleTempObj.identifytype,
                "identifytypeStr":this.singleTempObj.identifytypeStr,
                "investigatestarttime":this.addCaseObjForm['investigatestarttime'],
                "investigateendtime":this.addCaseObjForm['investigateendtime'],
                "objectid":"",
                "removenumber":"1",  //新增(保存) 1 | 提交：可以不传
                "action":""
            };
            // 去重
            let arr = this.singlePushArr;
            for(let i=0;i<arr.length;i++){
                if(arr[i].identify === rowParams.identify){
                    return this.$Message.warning(`该数据已选择,请重新选择！`);
                }
            }
            this.singlePushArr.push(rowParams);
            console.log("单独添加标识的暂存数组：",this.singlePushArr);
          }
        })
      },

      // 批量添加标识未通过 则 禁用按钮
      disabledSaveOrsubmitSignFn(bool){
        this.judgeByAddSignForm = bool;
      },

      // 保存 案件对象及标识
      saveCaseObjAndSign(name){
        if(this.isCaseObjDisabled) return this.$Message.warning(`数据已经保存不可修改!`);
          this.$refs['addCaseObj'].$children[0].validate((valid) => {
              if (valid) {
                // 合并单独/批量 (标识存放数组) 并去重
                let addArrays = [].concat(this.singlePushArr,this.batchPushArr);
                console.log("两个暂存数组合并后的结果:",addArrays);
                this.addCaseObjForm['display'] = '0';
                this.addCaseObjForm['caseobejctnumList'] = arrDistinct(addArrays);
                this.save_submit_Data_commonRequest();
              } else {
                  this.$Message.error('数据校验不正确!');
              }
          })
      },

      // 提交 案件对象及标识
      submitCaseObjAndSign(name,sign){
          this.$refs['addCaseObj'].$children[0].validate((valid) => {
              if (valid) {
                // 合并单独/批量 (标识存放数组) 并去重
                let addArrays = [].concat(this.singlePushArr,this.batchPushArr);
                this.addCaseObjForm['display'] = '1';
                this.addCaseObjForm['caseobejctnumList'] = arrDistinctSubmit(addArrays);
                this.save_submit_Data_commonRequest();
              } else {
                  this.$Message.error('数据校验不正确!');
              }
          })
      },

      // 保存和提交公共方法
      async save_submit_Data_commonRequest(){
        await caseobjectSaveOrUpObjectandNum(this.addCaseObjForm)
            .then(res => {
                if(res.statusCode !== 200) return process_error(res);
                this.$Message.success(`${res.message}`);
                let caseId = this.addCaseObjForm['caseid'];
                let cdisplay = this.addCaseObjForm['cdisplay'];
                this.isCaseObjDisabled = true;
                this.$router.push({path:'/addCase',query:{caseid:caseId,isDisabled:true,cdisplay:cdisplay}});
            })
            .catch(err => console.log(err))
      },

     // 取消添加案件对象及标识
      cancelCaseObjAndSign(name){
          this.$refs['addCaseObj'].$children[0].resetFields();
          let caseId = this.addCaseObjForm['caseid'];
          // cdisplay:判断案件信息是否提交 来展示 可编辑页面 / 详情页面
          let cdisplay = this.addCaseObjForm['cdisplay'];
          this.$router.push({path:'/addCase',query:{caseid:caseId,isDisabled:true,cdisplay:cdisplay}});
      },

     //  批量新增侦控号码---暂存数组
      batchPushSignToAddCaseObjFormFn(data){
        this.batchPushArr = data;
      },

     // 返回刚才新增案件页面
     backToAddCase(){
        let caseid = this.addCaseObjForm['caseid'];
        let cdisplay = this.addCaseObjForm['cdisplay'];  // 判断案件信息是否提交
        this.$router.push({path:'/addCase',query:{caseid:caseid,isDisabled:true,cdisplay:cdisplay}})
     }
    },
    created(){
        // 获取数据类型下拉列表
        this.numTypeList = JSON.parse(sessionStorage.getItem("case_Obj_sign_numType"));

        // 获取 案件的信息
        let save_case_Info = JSON.parse(sessionStorage.getItem("save_case_Info"));

        this.addCaseObjForm['caseid'] = save_case_Info.id;
        this.addCaseObjForm['investigatestarttime'] = save_case_Info.cinvestigatestarttime;
        this.addCaseObjForm['investigateendtime'] = save_case_Info.cinvestigateendtime;
        this.addCaseObjForm['cdisplay'] = save_case_Info.cissynchrocase === '0' ? '1' : save_case_Info.cdisplay;

        this.addCaseObjForm['cname'] = save_case_Info.cname;
        this.addCaseObjForm['cnumber'] = save_case_Info.cnumber;

        // 存储初始化的案件对象信息--子节点在mounted中要获取，所以写在 created周期函数中!!!
        sessionStorage.setItem("case_Obj_Info",JSON.stringify(this.addCaseObjForm));
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
  .modal_title{
    color: black;
    font-weight: 600;
    padding:10px 0;
  }
  .fl{
    float:right;
    margin-right:47px;
  }
  .caseObj_footer{
      display: flex;
      flex-direction: row;
      justify-content: center;
      .ivu-btn{
          margin:10px 0 0 10px;
      }
  }
  .singleSignCls{
    margin-bottom:10px;
    .ivu-btn{
        margin-left:15px;
    }
  }
hr{
    border: none;
    border-top: 1px solid #eeeff1;
  }
</style>
