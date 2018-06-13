<template>
  <div>

    <div class="objBox" v-if="Array.isArray(ObjList) && !!ObjList.length">
      <Row type="flex">
        <Card class="card" v-for="(item,index) in ObjList" :key="`${index}`">
          <p class="userName" slot="title">
            <Icon type="person"></Icon>
            <span @click="caseObjOptBtn(item)" title="查看对象信息" class="objTitle">{{item.objectname}}</span>
            <Badge :count="item.numberCount"></Badge>
          </p>
          <div slot="extra">
            <!--非结案状态：显示按钮组 -->
            <div v-if="cstatuscode !== '1' && ObjList.length !== 0">
                <ButtonGroupSave :id="item.id" :caseid="searchData.caseid" :removenumbers="item.removeobjectinvestigate" :displays="item.display" :saveStatus="item" :index="index" v-if="item.display==='0' && item.ostatus ==='0'" @changeAddMarksSign="changeAddMarksSignFn(item)" :hideAddBtn="hideAddBtn"></ButtonGroupSave>
                <ButtonGroupControl @extension="extensionFn(item)" @markChange="changeAddMarksSignFn(item)" @upData="upDataFn" :id="item.id" :caseid="searchData.caseid" :removenumbers="item.removeobjectinvestigate" :displays="item.display"  :controlStatus="item" :index="index" v-else-if="item.display ==='1' && item.removeobjectinvestigate === '1' && item.ostatus ==='0'" :hideAddBtn="hideAddBtn"></ButtonGroupControl>
            </div>
            <!--结案状态：仅查看-->
          </div>

          <p class="time">状态：
            <b v-if="item.display==='0'">保存</b>
            <b style="color: #ed3f14" v-else-if="item.display ==='1' && item.removeobjectinvestigate === '1'">在控</b>
            <b style="color: #2db7f5" v-else-if="item.display==='1' && item.removeobjectinvestigate === '0'">解除侦控</b>
            <span>侦控时间：{{item.investigatestarttime}}&nbsp;至&nbsp;{{item.investigateendtime}}</span>
          </p>
          <div style="display:flex;flex-wrap: wrap;padding-left: 20px">
            <Card class="markCard" v-for="(msg,i) in item.caseobejctnumList" :key="`${i}`">
              <a v-if="msg.display==='0'" class="close_icon" @click.prevent="removeCard(msg)"><Icon type="close-circled"></Icon></a>
              <div class="cardMsg">
                <span class="info">
                  <Icon type="iphone" class="iconWidth" size="35" title="手机号"  v-if="msg.identifytype === '1001'"></Icon>
                  <Icon type="monitor" class="iconWidth" size="30" title="设备号" v-else-if="msg.identifytype ==='1003'"></Icon>
                  <Icon type="card" class="iconWidth" size="30" title="卡号" v-else="msg.identifytype ==='1002'"></Icon>
                </span>
                <p>
                  <Tooltip :content="msg.identify" placement="top">
                      <i>{{msg.identify}}</i><br>
                  </Tooltip>                                                      
                  <!--<span>类型：{{msg.identifytypeStr}}</span><br>-->
                  <span v-if="msg.display=== '0'">状态：保存</span>
                  <span v-else-if="(msg.display === null || msg.display === '1') && msg.removenumber ==='1'">状态：在控</span>
                  <span v-else-if="(msg.display === null || msg.display === '1') && msg.removenumber ==='0'">状态：解除侦控</span>
                  <span v-else>状态：</span>
                </p>
              </div>
              <div>

              </div>
            </Card>

            <!--
              添加标识的依据：
                同步：不显示
                手动录入：
                  1：手动录入(cissynchrocase = 1) && 未结案的(cstatuscode = 0)
                  2：对象未解除侦控 (removeobjectinvestigate = 1)
              <Card class="markCard addMark" v-if="(hideAddBtn['cissynchrocase'] !== '0' && hideAddBtn['cstatuscode'] === '0') || item.removeobjectinvestigate === '1'">
                <div @click="changeAddMarksSignFn(item)" v-auth="0-1-2-7"><Icon type="plus-round" size="40"></Icon></div>
              </Card>
            -->

          </div>
          <p class="viewMore" style="text-align: right">
            <a @click="viewMore(item.display,item.removeobjectinvestigate,item.id,searchData.caseid,hideAddBtn['cissynchrocase'],hideAddBtn['cstatuscode'],hideAddBtn['cdisplay'])">查看更多>></a>
          </p>
        </Card>
      </Row>

      <!--新增标识模态窗-->
      <Modal title="新增标识" v-model="addMarks" width="800px">
        <RadioGroup v-model="filter" @on-change="addCaseSign" type="button">
          <Radio label="0">添加标识</Radio>
          <Radio label="1">批量添加标识</Radio>
        </RadioGroup>

          <!--单独添加标识-->
          <div v-show="showSignList">
              <Row class="singleSignCls">
                <Form ref="singleTempObj" :model="singleTempObj" :rules="ruleValidate">
                    <Col span="8">
                        <FormItem>
                            <Select class="selectBox" v-model="singleTempObj.identifytype" style="width:100%" placeholder="请选择号码类型" @on-change="chooseNumberType" label-in-value>
                              <Option v-for="(msg,index) in numTypeList" :key="msg.id" :value="msg.code">{{msg.name}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="8" offset="1">
                        <FormItem prop="identify">
                            <Input v-model="singleTempObj.identify" style="width:100%" :maxlength=50 placeholder="请输入侦控号码"/>
                        </FormItem>
                    </Col>
                    <Col span="4" offset="1">
                        <FormItem>
                            <Button type="primary" shape="circle" icon="ios-plus-empty" @click="addSingleCaseSignFn('singleTempObj')"></Button>
                        </FormItem>
                    </Col>
                </Form>
                </Row>
              <AddSignList :columns="columns" :tableData="singlePushArr" @concatTableData="concatTableDataFn"
              @updateSinglePushArr="updateSinglePushArrFn"/>
          </div>

          <!--批量添加标识-->
          <div v-if="Array.isArray(numTypeList) && numTypeList.length !== 0">
              <AddSignForm v-show="!showSignList" :numTypeList="numTypeList" @batchPushSignToAddCaseObjForm="batchPushSignToAddCaseObjFormFn" @disabledSaveOrsubmitSign="disabledSaveOrsubmitSignFn"
              ref="AddSignFormDom"/>
          </div>

        <div slot="footer">
          <span><Button style="width:80px" @click="closeModal">取消</Button></span>&nbsp;&nbsp;&nbsp;
          <span v-if="singleTempObj.display === '0'&& singleTempObj.removenumber === '1'">
            <Button style="width:80px" @click="saveMarks" :disabled ="judgeByAddSignForm" type="info">保存</Button>
          </span>
          <span v-else>
            <Button  style="width:80px" @click="saveMarks" :disabled = "judgeByAddSignForm"  type="info">保存</Button>
            <Button  style="width:80px" @click="submitMarks" :disabled = "judgeByAddSignForm" type="success">提交</Button>
          </span>
        </div>
      </Modal>

      <!--延期模态窗-->
      <Modal title="延期" v-model="extension">
        <Form ref="dateModal" :rules="ruleValidate" :model="dateModal" :label-width="100" style="padding-left: 90px">
          <FormItem label="侦控开始时间">
            <DatePicker type="date" placeholder="侦控开始时间" v-model="dateModal.investigatestarttime" disabled></DatePicker>
          </FormItem>
          <FormItem label="侦控结束时间" prop="investigateendtime">
            <DatePicker type="date" placeholder="侦控结束时间" @on-change="endTimeFn" v-model="dateModal.investigateendtime"></DatePicker>
          </FormItem>
          <br>
          <FormItem >
            <Button style="width:80px" @click="extensionClose('dateModal')">取消</Button>
            <Button style="width:80px" @click="extensionOk('dateModal')" type="info">提交</Button>
          </FormItem>
        </Form>
          <div slot="footer"></div>
      </Modal>

    </div>

    <!-- 无对象信息展示 -->
    <div class="singleSignCls" v-else>
      <Alert show-icon>暂无对象信息!</Alert>  
    </div>

  </div>
</template>

<script>
  import {
    queryObjectByCaseid,
    findCaseDictionByParent,
    batchSaveNums,
    delayCaseobject,
    deleteCaseobjectnum
  } from '@/service/getData'
  import ButtonGroupSave from '@/components/caseManagement/caseObjBtn/ButtonGroupSave'
  import ButtonGroupControl from '@/components/caseManagement/caseObjBtn/ButtonGroupControl'
  import AddSignForm  from '@/components/caseManagement/caseSign/addSignForm'
  import AddSignList  from '@/components/caseManagement/caseSign/addSignList'
  import {arrDistinctSubmit} from '@/utils/removeDuplicates'

  import {process_error} from '@/config/process_request_conf'
  export default {
    name: "CaseObjectInfoList",
    components:{
      ButtonGroupSave,ButtonGroupControl,AddSignForm,AddSignList
    },
    data(){
      const validateEndTime = (rule, value, callback) => {
        let endtime = this.dateModal.investigateendtime;
        if(rule.required){
          if(value === ''){
            return callback(new Error('侦控时间不能为空!'));
          }else if(!((new Date(endtime).getTime() / 1000 - new Date(this.time).getTime() / 1000) > 0)){
            return callback(new Error('结束时间应大于'+ this.time));
          }else{ callback()}
        }
        callback();
      };
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
        addMarks:false,
        showSignList:true,
        extension:false,
        filter: '0',
        searchData:{
          caseid: "",
          data:{
            addMarkList:[]
          },
          date:{
            caseobjectid:"",
            endTime:""
          }
        },
        columns:[
          {field:'identifytypeStr',title:"号码类型",width:200,titleAlign:'center',columnAlign:'center',isResize:true},
          {field:'identify',title:"侦控号码",width:200,titleAlign:'center',columnAlign:'center',isEdit:false,isResize:true},
          {field:'action',title:"操作",width:290,titleAlign:'center',columnAlign:'center',componentName:'table-operation',isResize:true}
        ],
        ObjList:[],
        numTypeList:[],
        singleTempObj:{
          objectid: '',
          display: "",
          identify: "",
          identifytype: "",
          removenumber: "",
          investigatestarttime: "",
          investigateendtime: "",
          identifytypeStr:""
        },
        // 用于新增标识
        objectid:"",
        removenumber:"",
        caseid:"",

        // 隐藏 新增对象 和 新增标识 按钮
        hideAddBtn:{
          cissynchrocase:"",
          cstatuscode:"0",
          cdisplay:""
        },

        batchPushArr:[], //  批量新增侦控号码---暂存数组
        singlePushArr:[],
        judgeByAddSignForm:false, // 批量添加标识校验未通过则禁用保存和提交按钮
        distinguishSaveOrSubmit:0, // 0:保存 | 1：提交
        time:"",
        dateModal:{
          investigatestarttime:"",
          investigateendtime:""
        },
        // 延期 侦控时间暂存数据
        tempInvestigateendtime:"",

        ruleValidate:{
          investigateendtime:[
            { required: true, validator:validateEndTime ,name:'侦控结束时间不能为空', trigger: 'change' }
          ],
          identify:[
            {required:false,type:'string',name:'侦控号码',fieldName:'identify',validator:validateNumber,trigger:'blur'}
          ]
        },
      }
    },
    computed:{
      cstatuscode(){
        return this.$route.query.cstatuscode;
      }
    },
    methods:{
      // 获取数据类型
      async getNumberType(){
        let numTypeListData = await findCaseDictionByParent('numType');
        this.numTypeList = numTypeListData.data;
        sessionStorage.setItem("case_Obj_sign_numType",JSON.stringify(this.numTypeList));        
      },

      // 获取案件对象列表
      async getCaseObjInfoList(sendData){
        await queryObjectByCaseid(sendData)
          .then(res => {
              if(res.statusCode !== 200) return process_error(res);
              this.ObjList = res.data;
          })
          .catch(err => console.log(err))
      },

      // 查看对象信息
      caseObjOptBtn(item){
        //  说明：buttonGroupSave组件销毁会自动 发射 `sendCaseObjInfoFn` 事件 进而触发 editCaseObj 组件中的监听函数
        this.$router.replace({path:'/editCaseObj',query:{
          objectId:item.id,
          sign:'view',
          cissynchrocase:this.hideAddBtn['cissynchrocase'],
          cstatuscode:this.hideAddBtn['cstatuscode'],
          cdisplay:this.hideAddBtn['cdisplay']
      }});
      },

      // 点击buttonGroupSave 中 新增 标识按钮 / 在控中的 标识变更
      changeAddMarksSignFn(item){
        this.addMarks = true;
        this.singleTempObj.caseid = item.caseid;

        this.removenumber = this.singleTempObj.removenumber = '1';
        this.objectid = this.singleTempObj.objectid = item.id;

        this.singleTempObj.investigateendtime = item.investigateendtime;
        this.singleTempObj.investigatestarttime = item.investigatestarttime;
        this.singleTempObj.display = item.display;

        // 更新 addForm 中 临时标识对象 batchImportCaseSign
        console.log("DOM",this.$refs.AddSignFormDom);
        this.$refs.AddSignFormDom.updateBatchImportCaseSign(item)
      },

      //查看更多
      viewMore(a,b,id,caseid,cissynchrocase,cstatuscode,cdisplay){
        if(a==="0"){
          //保存
          this.$router.push({path:'/SeeMoreSave',query:{
            id:id,
            caseid:caseid,
            cissynchrocase:cissynchrocase,
            cstatuscode:cstatuscode,
            cdisplay:cdisplay
          }});
        }else if( a==="1"&& b==="1"){
          //在控
          this.$router.push({path:'/SeeMoreControl',query:{
            id:id,
            filter:0,
            caseid:caseid,
            cissynchrocase:cissynchrocase,
            cstatuscode:cstatuscode,
            cdisplay:cdisplay
          }});
        }else {
          //解除绑定
          this.$router.push({path:'/SeeMoreLifted',query:{
            id:id,
            caseid:caseid,
            cissynchrocase:cissynchrocase,
            cstatuscode:cstatuscode,
            cdisplay:cdisplay
          }});
        }
      },

      // 单独添加 / 批量添加   （切换按钮）
      addCaseSign(val){
        switch(val){
          case '0':this.showSignList = true;break;
          case '1':this.showSignList = false;break;
          default:this.showSignList = true;
        }
      },

      // 批量添加标识暂存数组
      batchPushSignToAddCaseObjFormFn(data){
        this.batchPushArr = data;
      },

      // 批量添加标识未通过 则 禁用按钮
      disabledSaveOrsubmitSignFn(bool){
        this.judgeByAddSignForm = bool;
      },

      // 单独添加标识存放数组 --> singlePushArr
      addSingleCaseSignFn(name){
        if(this.singleTempObj['identifytype'] === '' && !!this.singleTempObj['identify'] === ''){
          return this.$Message.warning(`标识类型或号码不能为空！`) 
        }                
        this.$refs[name].validate((valid)=>{
          if(valid){
            let rowParams = {
              "caseid":this.searchData['caseid'],
              "display":this.singleTempObj.display,  // 0:保存 1:提交
              "objectid":this.singleTempObj.objectid,
              "id": '',
              "identify":parseInt(this.singleTempObj.identify,10),
              "identifytype":this.singleTempObj.identifytype,
              "investigateendtime":this.singleTempObj.investigateendtime,
              "investigatestarttime":this.singleTempObj.investigatestarttime,
              "removenumber":"1",  //新增(保存) 1 | 提交：可以不传
              "identifytypeStr":this.singleTempObj.identifytypeStr,
              "action":""
            };
            // 去重
            let arr = this.singlePushArr;
            for(let i=0;i<arr.length;i++){
              // arr[i].identify === rowParams.identify && arr[i].identifytype === rowParams.identifytype && arr[i].identifytypeStr === rowParams.identifytypeStr
              if(arr[i].identify === rowParams.identify){
                return this.$Message.warning(`标识输入重复,请重新输入!`);
              }
            }
            this.singlePushArr.push(rowParams);
            console.log("单独添加标识的暂存数组：",this.singlePushArr);
          }
      })
      },

      //新增标识保存--都有objectId | id
      async saveMarks(){
        let display = "0";
        let addArrays = [].concat(this.singlePushArr,this.batchPushArr);
        if(addArrays.length === 0){
          this.addMarks = true;
          return this.$Message.warning(`请添加标识后进行提交或保存操作!`);
        }
        this.searchData.data['addMarkList'] = arrDistinctSubmit(addArrays,this.objectid,display);
        await batchSaveNums(this.searchData.data['addMarkList'])
          .then(res => {
            if(res.statusCode !== 200) return process_error(res);
            this.$Message.success(res.message);
            this.addMarks = false;
            // 重置 标识暂存数组 及 批量导入标识的 textarea
            this.batchPushArr = this.singlePushArr = [];
            this.$refs.AddSignFormDom['identifytypeStr'] = "";

            this.getCaseObjInfoList(this.searchData.caseid);
          })
          .catch(err => console.log(err))
      },

      //新增标识提交
      async submitMarks(){
        let display = "1";
        let addArrays = [].concat(this.singlePushArr,this.batchPushArr);
        if(addArrays.length === 0){
          this.addMarks = true;
          return this.$Message.warning(`请添加标识后进行提交或保存操作!`);
        }        
        this.searchData.data['addMarkList'] = arrDistinctSubmit(addArrays,this.objectid,display);
        await batchSaveNums(this.searchData.data['addMarkList'])
          .then(res => {
            if(res.statusCode !== 200) return process_error(res);
            this.$Message.success(res.message);
            this.addMarks = false;
            // 重置 标识暂存数组 及 批量导入标识的 textarea
            this.batchPushArr = this.singlePushArr = [];
            this.$refs.AddSignFormDom['identifytypeStr'] = "";

            this.getCaseObjInfoList(this.searchData.caseid);
          })
          .catch(err => console.log(err))
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

      //删除标识
      removeCard(msg){
       this.$Modal.confirm({
          title: '警告',
          content: '<p>是否要删除【<span style="font-weight: bold;color: #2d5ba6">'+ msg.identify+'</span>】?</p>',
          onOk: async() => {
            await deleteCaseobjectnum(msg.id)
              .then(res=>{
                if(res.statusCode !== 200) return process_error(res);
                this.$Message.success(`${res.message}`);
                this.getCaseObjInfoList(this.searchData.caseid);
              })
              .catch(err=>{
                this.$Message.error(err)
              })
          }
       });
      },

      // 选择数据类型
      chooseNumberType(obj){
        this.singleTempObj.identifytype = obj.value;
        this.singleTempObj.identifytypeStr = obj.label;
      },

      //关闭新增标识弹窗
      closeModal(){
        this.addMarks = false;
        this.singlePushArr = this.batchPushArr = [];
      },

      //解除侦控数据更新
      upDataFn(){
        this.getCaseObjInfoList(this.searchData.caseid);
      },

      //延期
      extensionFn(item){
        this.extension = true;
        this.searchData.date['caseobjectid'] = item.id;
        this.dateModal['investigatestarttime'] = item.investigatestarttime;
        this.dateModal['investigateendtime'] = item.investigateendtime;
        this.tempInvestigateendtime = this.time = item.investigateendtime;
      },

      //延期提交 重新案件对象列表数据 并 通知父组件重新拉取案件信息
     extensionOk(name){
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.time =  this.searchData.date.endTime;
            delayCaseobject(this.searchData.date).then(res=>{
              if(res.statusCode !== 200) return process_error(res);
              this.$Message.success(res.message);
              this.extension = false;
              this.getCaseObjInfoList(this.searchData.caseid)
              this.$emit("updateCaseInfoByExtensionObj")
            }).catch((err)=>{
              this.$Message.error(err);
            });
          }else{
            console.log(valid);
          }
        })
      },

      //延期弹窗取消
      extensionClose(name){
        this.$refs[name].resetFields();
        this.extension = false;
      },
      endTimeFn(time){
          this.searchData.date['endTime'] = time;
      },
      // 更新对象列表中的 `cissynchrocase ,cstatuscode,cdisplay`      
      updataSignFile(data){
          this.hideAddBtn['cissynchrocase'] = data.cissynchrocase;
          this.hideAddBtn['cstatuscode'] = data.cstatuscode;
          this.hideAddBtn['cdisplay'] = data.cdisplay;
      }
    },
    mounted(){
      if(!!this.$route.query.caseid){
        this.searchData.caseid = this.caseid = this.$route.query.caseid;
        this.getCaseObjInfoList(this.searchData.caseid);
      }
      // 从列表传递数据来判断 是否显示添加 对象和标识 按钮

      if(this.$route.query.cissynchrocase !== 'undefined' && this.$route.query.cstatuscode !== 'undefined' && this.$route.query.cdisplay !== 'undefined'){
          this.hideAddBtn['cissynchrocase'] = this.$route.query.cissynchrocase;
          this.hideAddBtn['cstatuscode'] = this.$route.query.cstatuscode;
          this.hideAddBtn['cdisplay'] = this.$route.query.cdisplay;
      }
            
      this.getNumberType();     
    },

    // 监听对象列表更新事件
    created(){
        window.eventBus.$on("upDataFn",this.upDataFn);
    },

    // 组件销毁前移除 事件监听!!!
    beforeDestroy(){
        window.eventBus.$off("upDataFn",this.upDataFn);
    }

  }
</script>

<style lang="less">
  @media screen and (max-width:1700px) {
    .objBox{
      width: 990px;
      padding:10px 0 0 8px;
      margin: 0 auto;
    }
  }
  @media screen and (min-width:1701px) {
    .objBox{
      width: 1480px;
      padding:10px 0 0 8px;
      margin: 0 auto;
    }
  }
  .objBox{
    box-sizing: border-box;
    .card {width: 480px;margin-right: 10px;margin-bottom:10px;background: #ebf5ff;border:1px solid #b2ceeb;
      .ivu-card-head {
        padding: 5px 16px;
        .userName{
          display: inline-block;
          height: 22px;
          width: 200px;
          overflow: hidden;
          font-size: 14px;
          .objTitle{
            display: inline-block;
            max-width: 100px;
            vertical-align: bottom;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            &:hover{
               cursor: pointer;
               text-decoration: underline;
             }
          }
        }
      }
      .ivu-card-extra{top:5px;}
      .time{color: #414141;position: relative;top: -5px;font-size: 12px;
       span{color: #898e9c;position:absolute;right:0;}
          b{color: #47cb89;}
        }
      .markCard{width: 46.5555%;margin-right: 10px;margin-bottom: 10px; background:#ddebfa;border:1px solid #cddff3;
          .ivu-card-body{padding: 5px 10px;font-size:12px;}
          .close_icon {position: absolute;right: 0;top: -5px;font-size: 20px;color: #7A7A7A;}
          .close_icon:hover {color: #ed3f14;}
      }
      .markCard:hover .close_icon{display:block}
      .addMark{cursor: pointer;text-align: center;height: 57px;
          div{width:100%;height: 60px;overflow: hidden;font-size: 40px;line-height: 1;color: #9ea3b1}
      }
      .addMark div:hover{color: #2db7f5;transition:0.5s;}
      .markCard:nth-child(even){margin-right: 0}
      .cardMsg{display:flex;align-items: center;
          .info{text-align: center;font-size:45px;line-height: 1;margin-right: 5px;
            .iconWidth{  width: 40px; }            
          }        
          p{font-weight: bold;overflow: hidden;text-overflow: ellipsis;display: flex;flex-direction: column;
          >span{color: #898e9c;font-weight: normal;white-space: nowrap;}
        }
      }
      .viewMore{position: absolute;bottom:2px;right: 20px;font-weight: bold;font-size:12px;}
    }    
  }
    .singleSignCls{margin-top: 10px;}

</style>
