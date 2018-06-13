<template>
    <Row class="vm-table vm-panel">
      <div class="panel-heading">
        <Breadcrumb separator=">">
          <BreadcrumbItem to="/CaseManageList">案件列表</BreadcrumbItem>
          <BreadcrumbItem to="/addCase" v-if="!caseid">新增案件</BreadcrumbItem>
          <BreadcrumbItem v-else>
            <span @click="backToAddCase" class="addCaseStyle"> 案件管理</span>
          </BreadcrumbItem>
        </Breadcrumb>

        <span span="2" style="position:absolute;right:15px;top:16px;">
            <Button type="info" size="small" @click="backCaseManageList">返回列表</Button>
        </span>
      </div>
      <div class="panel-body">
        <!--案件信息 -->
        <section>
          <!--在办：已提交 、 结案 、 同步案件-->
          <div v-if="cdisplay === '1' || cstatuscode === '1' || cissynchrocase === '0'">
              <CaseInfoDetail :caseInfo="addCaseInfo" ref="caseInfo"></CaseInfoDetail>
          </div>
          <!--在办：为保存/提交-->
          <div v-else>
            <CaseInfo :addCaseInfo="addCaseInfo" @getCaseId="getCaseIdFn" ref="caseInfo"></CaseInfo>
          </div>
        </section>

        <!--对象信息-->
        <section>
            <p class="title-lv1">
              <span>对象信息</span>
              <!--
                添加对象的依据：
                  cissynchrocase: 1->手动录入 0->同步
                  cstatuscode: 0->在办 1->结案
              -->
              <!-- 手动录入 -->
              <div class="title-lv1 noBoTop" v-if="!!caseid && addCaseInfo.cissynchrocase === '1'" style="margin-bottom: 10px;">
                <Button type="primary" icon="plus-round" v-if="addCaseInfo.cstatuscode !== '1'" @click="createCaseObjAnd" size="small" >新建对象</Button>             //v-auth="0-1-2-1"
                <Button type="primary" icon="plus-round" v-if="addCaseInfo.cstatuscode !== '1' && addCaseInfo.cdisplay !== 0" @click="importCaseObjFn" size="small">导入对象</Button>
                <Button type="primary" icon="plus-round" v-if="addCaseInfo.cstatuscode !== '1' && addCaseInfo.cdisplay !== 0" @click="importCaseObjManageFn" size="small">导入对象管理</Button>
              </div>
              <!-- 同步案件 -->
              <div class="title-lv1 noBoTop" v-if="!!caseid && addCaseInfo.cissynchrocase === '0'" style="margin-bottom: 10px;">
                <Button type="primary" icon="plus-round" v-if="addCaseInfo.cstatuscode !== '1'" @click="createCaseObjAnd" size="small" >新建对象</Button> //v-auth="0-1-2-1"
                <Button type="primary" icon="plus-round" v-if="addCaseInfo.cstatuscode !== '1'" @click="importCaseObjFn" size="small">导入对象</Button>
                <Button type="primary" icon="plus-round" v-if="addCaseInfo.cstatuscode !== '1'" @click="importCaseObjManageFn" size="small">导入对象管理</Button>
              </div>
            </p>
            <CaseObjectInfoList @updateCaseInfoByExtensionObj="updateCaseInfoByExtensionObjFn" ref="CaseObjectInfoList"></CaseObjectInfoList>
        </section>

        <BackTop :height="100" :bottom="60">
            <div class="top">返回顶端</div>
        </BackTop>
        <!--导入对象Model-->
        <Modal v-model="importCaseObjModel" width="750px;" :mask-closable="false" :closable="false">
            <p slot="header" style="color:#f60;text-align:left">
                <span> <Icon type="grid"></Icon><b>导入对象标识</b></span>
            </p>
            <div style="text-align:center">
              <Row class-name="row">
                  <Col :xs="20" :sm="18" :md="18" :lg="14">
                      <Card style="min-width: 700px; margin: 5px;">
                          <Row class-name="table-row boTop">
                            <Col span="4" align="center" class-name="col noBoTop">
                              <p class="ColumnTitle">标识类型</p>
                            </Col>
                            <Col span="20" align="left" class-name="col">
                              <RadioGroup v-model="importCaseObj.identifytype" style="margin-left:5px;">
                                  <Radio v-for="(item,index) in numTypeList" :label="item.code" :key="item.code" :value="item.name" :ref="`radioGroup${item.code}`">{{item.name}}</Radio>
                              </RadioGroup>
                            </Col>
                          </Row>

                          <Row class-name="table-row">
                            <Col span="4" align="center" class-name="col caseinfo-title noBoTop" style="line-height: 250px;height: 250px;">
                            <p class="ColumnTitle">导入文件格式</p>
                            </Col>
                            <Col span="20" align="center" class-name="col caseinfo-content noBoTop" style="height: 250px;">
                            <Row>
                                <Col span="12">
                                  <div class="fileBox">
                                    <h4>对象，标识</h4>
                                    <p>对象1，标识1</p>
                                    <p>对象2，标识2，标识3</p>
                                    <p>...</p>
                                  </div>
                                </Col>
                                <Col span="12">
                                  <div class="fileBox">
                                    <h4>标识</h4>
                                    <p>标识1</p>
                                    <p>对标识2</p>
                                    <p>...</p>
                                  </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="12">
                                  <p><Radio v-model="single1" @on-change="changeRadio('1')">有对象格式</Radio></p>
                                </Col>
                                <Col span="12">
                                  <p><Radio v-model="single2" @on-change="changeRadio('0')">无对象格式</Radio></p>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="24">
                                  <p class="wrongSign">
                                    <span style="color:red;">*</span>
                                    <span>1、导入的文件严格对应所选格式，第一行为表头；2、两行之间以"，"（半角逗号）分割；标识有多个以"；"（半角分号）分割。</span>
                                  </p>
                                </Col>
                            </Row>
                            </Col>
                          </Row>

                          <Row class-name="table-row boBottom" type="flex" align="middle">
                            <Col span="4" align="center" class-name="col noBoLeft">
                              <p class="ColumnTitle">选择文件</p>
                            </Col>
                            <Col span="20" align="center" class-name="col">
                              <div class="uploadBox">
                                  <Upload
                                      ref="upload"
                                      :show-upload-list="true"
                                      :data="importCaseObj"
                                      :on-success="handleSuccess"
                                      :on-error="handleError"
                                      :max-size="2048"
                                      :on-remove="clearableFile"
                                      :with-credentials="true"
                                      :on-format-error="handleFormatError"
                                      :on-exceeded-size="handleMaxSize"
                                      :before-upload="handleUpload"
                                      :format="['xls','xlsx','xlsb','xlst','csv','txt']"
                                      action="/api/cm/caseobject/fileServer">
                                      <Button type="ghost" icon="ios-cloud-upload-outline" size="small">批量导入</Button>
                                  </Upload>
                                  <Input v-model="importCaseObj.fileName" placeholder="请选择上传文件" disabled style="width:200px;margin-left:5px;" size="small"/>
                                  <p class="wrongSign noBoTop adjustPosition"><span style="color:red;">*</span>只能上传.txt或.csv格式文件</p>
                              </div>
                            </Col>
                          </Row>
                      </Card>
                  </Col>
              </Row>
            </div>
            <div slot="footer">
                <Button type="primary" :loading="loadingStatus" @click="submitImport">提交</Button>
                <Button type="primary" :disabled="limitOneRequest !== 0" @click="cancelImport">取消</Button>
            </div>
        </Modal>

        <!-- 导入对象管理Model -->
        <Modal v-model="importCaseObjListModel" width="800px;">
          <header slot="header" style="color:#f60;text-align:left">
            <span>
              <Icon type="grid"></Icon>
              <b>导入对象列表</b>
            </span>
          </header>
          <section>
            <div style="margin-bottom:10px;">
              <Table title="导入对象列表" :row-class-name="rowClassName" :loading="showLoading" :columns="columns" :data="importCaseObjList" @on-sort-change="sortColumnFn" :stripe="showStripe" size="small"></Table>
            </div>
            <Paging :pages="page" @pageChange="pageChangeFn"></Paging>
          </section>
          <footer slot="footer"></footer>
        </Modal>

        <!-- 导入对象和标识返回结果展示Modal -->
        <Modal v-model="importCaseObjResultModel" width="800px;">
          <header slot="header" style="color:#f60;text-align:left">
            <span><Icon type="grid"></Icon><b>导入对象和标识结果展示</b></span>
          </header>
          <section>
            <div style="margin-bottom:10px;">
              <p><span style="font-weight:bolder;">导入对象：</span>{{importCaseObjResult.objStr}}</p>
              <p><span style="font-weight:bolder;">导入标识：</span>{{importCaseObjResult.objNumStr}}</p>
              <div>
                <span style="font-weight:bolder;">重复对象：</span>
                <Tag color="blue" v-for="(item,index) in importCaseObjResult.replaceObjList" :key="index">{{item}}</Tag>
                <span v-if="importCaseObjResult.replaceObjList.length > 10">等对象。</span>
              </div>
              <div>
                <span style="font-weight:bolder;">重复标识：</span>
                <Tag color="blue" v-for="(item,index) in importCaseObjResult.replaceObjNumList" :key="index">{{item}}</Tag>
                <span v-if="importCaseObjResult.replaceObjNumList.length > 10">等标识。</span>
              </div>
            </div>
          </section>
          <footer slot="footer">
            <Button type="primary" @click="closeImportCaseObjResultModel">确定</Button>
          </footer>
        </Modal>

      </div>
    </Row>
</template>
<script>
  import {
    caseinfoPreUpdateCase,
    findCaseDictionByParent,
    queryObjectByCaseidforImport
  } from '@/service/getData'
  import CaseInfo from '@/components/caseManagement/caseInfo'
  import CaseInfoDetail from '@/components/caseManagement/caseDetail/caseInfo'

  import CaseObjectInfoList from '@/pages/caseManagement/CaseObjectInfoList'
  import Paging from '@/components/common/tools/paging'
  import {mapState,mapMutations} from 'vuex'
  import {process_error} from '@/config/process_request_conf'
  export default {
    name: "AddCase",
    components:{
      CaseInfo,CaseObjectInfoList,CaseInfoDetail,Paging
    },
    data() {
      return {
        caseid:'',
        cissynchrocase:"",  // 0：同步 1：手动
        cstatuscode:"",    // 0：在办 1：结案
        cdisplay:"",  // 0:保存 1：提交
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
          "cundertakeUser":"",  //承办人ID
          "cundertakeDept":"", // 所在部门ID
          "cundertakeUserName":"",
          "cundertakeUserStr":"",
          "userStr":"",
          "caseObjectSize":"" //案件对象个数
        },

        // 导入对象
        importCaseObjModel:false,
        numTypeList:[], // 数据类型
        importCaseObj:{  //
          layout:'0',
          identifytype:"",
          fileName:"",
          caseId:""
        },
        single1:false,
        single2:true,
        // 批量上传文件
        file: null,
        loadingStatus: false,
        limitOneRequest:0, //0:可进行同步 1：禁止同步
        fileLoad:"",
        importCaseObjResultModel:false,
        importCaseObjResult:{
          objStr:"",
          objNumStr:"",
          replaceObjList:[],
          replaceObjNumList:[]
        },
        // 导入对象管理
        importCaseObjListModel:false,
        page:{
          caseId:"",
          totalElements: 0,
          size: 10,
          pageNumber:1,
          sort:"investigatestarttime,desc"
        },
        showLoading:false,
        showStripe:true,
        columns: [
          {title: '序号',type:'index', width: 60, align: 'center'},
          {title: '姓名', key: 'objectname',align: 'center',sortable:'custom'},
          {title: '标识名和类型', key: 'objnumStr',width:240,align: 'center',sortable:'custom'},
          {title: '状态', key: 'display',align: 'center',sortable:'custom',
            render: (h, params) => {
                let state = parseInt(params.row.display, 10);
                let style = state === 0 ? "#495060" : "#fea32d";
                let field = state === 0 ? "保存" : "提交";
                let btn = h('div', [
                    h('Button', {
                        props: {
                            size: 'small',
                            type: 'primary',
                        },
                        style: {
                            backgroundColor:style,
                            borderColor:style,
                            width: '60px',
                            cursor:'default'
                        },
                    },field),
                ]);
                return btn;
            }
          },
          {title: '侦控期限', key: 'investigateTime',width: 180,align: 'center',sortable:'custom'},
          {title: '操作', key: 'action',width: 60,align: 'center'}
        ],
        importCaseObjList:[]
    }
  },
    computed:mapState({
      uploadUrl:function(state){
        return state.url;
      }
    }),
    methods:{
      // 获取案件信息
      async getCaseInfo(caseid){
        await caseinfoPreUpdateCase(caseid)
        .then(res => {
          if(res.statusCode !== 200) return process_error(res);
          sessionStorage.setItem("save_case_Info",JSON.stringify(res.data)); // 更新sessionStorage中 save_case_Info
          Object.assign(this.addCaseInfo,res.data);

          // 组合侦办人 string
          let userStr = "";
          res.data.casemansList.forEach(v => {
            userStr += `${v.username}(${v.departmentname}),`;
          })
          let len = userStr.length;
          this.addCaseInfo['userStr'] = userStr.substring(0,len-1);

          // 组合 承办人 string
          if(!!res.data.cundertakeUserName){
            this.addCaseInfo.cundertakeUserStr = !!res.data.cundertakeDeptName ? `${res.data.cundertakeUserName}(${res.data.cundertakeDeptName})` : `${res.data.cundertakeUserName}`;
          }

          // 更新子组件的案件名称和编号 及 承办人下拉列表(侦办人选项)
          this.$refs.caseInfo.updatateCname(res.data);
        })
        .catch(err => console.log(err))
      },

      // 更新当前组件及对象列表组件 标识状态
      getCaseIdFn(data){
          this.caseid = data['id'];
          this.cissynchrocase = data['cissynchrocase'];
          this.cstatuscode = data['cstatuscode'];
          this.cdisplay = data['cdisplay'];
          this.$refs['CaseObjectInfoList'].updataSignFile(data);
      },

      // 新增对象
      createCaseObjAnd(){
        let caseid = this.caseid;
        if(!caseid) return this.$Message.warning(`新增案件信息后才可添加对象!`);
        this.$router.push({path:'/caseObjAndSign',query:{caseid:caseid}});
      },

     // 返回 案件管理 页面
     backToAddCase(){
        let caseid = this.$route.query.caseid;
        this.$router.push({path:'/addCase',query:{caseid:caseid,isDisabled:true}})
     },

     // 返回案件列表
     backCaseManageList() {
        this.$router.push({path:'/caseManageList'});
     },

     // 对象延期后重新拉取案件信息
     updateCaseInfoByExtensionObjFn(){
        if(!!this.$route.query.caseid){
          this.caseid = this.$route.query.caseid;
          this.getCaseInfo(this.caseid);
        }
        // 启用 caseInfo.vue 中编辑 、提交 | 隐藏保存
        if(!!this.$route.query.isDisabled && JSON.parse(this.$route.query.isDisabled)){
          this.$refs.caseInfo.enabledOperateBtn();
        }
     },

      // 导入对象 -- 获取数据类型
      async importCaseObjFn(){
        this.importCaseObjModel = true;
        let numTypeListData = await findCaseDictionByParent('numType');
        this.numTypeList = numTypeListData.data;
        sessionStorage.setItem("case_Obj_sign_numType",JSON.stringify(this.numTypeList));
        this.importCaseObj.identifytype = this.numTypeList[0]['code'];
      },

      // 提交导入对象
      submitImport(){
        if(this.file === null || this.limitOneRequest === 1) return;
        this.importCaseObj.caseId = this.caseid;
        this.loadingStatus = true;
        this.limitOneRequest = 1;
        this.$refs.upload.post(this.file)
      },

      // 取消导入对象
      cancelImport(){
        this.file = null;
        this.importCaseObjModel = false;
      },

      // 选择对象格式 0：无对象 、1：有对象
      changeRadio(val){
        if(val === '0'){
          this.single2 = true;
          this.single1 = false;
        }else{
          this.single1 = true;
          this.single2 = false;
        }
        this.importCaseObj.layout = val;
        console.log(`0：无对象 、1：有对象 ---> 实际对象格式标识选择:`,this.importCaseObj.layout);
      },


      // 批量上传操作 - 阻止默认上传事件
      handleUpload (file) {
          this.file = file;
          this.importCaseObj.fileName = file.name;
          return false;
      },
      // 删除批量上传的文件
      clearableFile(file,fileList){
          this.importCaseObj.fileName = "";
          this.file = null;
          console.log("删除上传的文件 this.file:",this.file);
      },
      handleSuccess (res, file) {
          this.loadingStatus = false;
          this.limitOneRequest = 0;
          if(res.statusCode !== 200){
            return process_error(res);
          }else if(res.message === "导入失败"){
            return this.$Message.error(`${res.message}:原因:${res.data}`)
          }else{
            this.importCaseObjModel=false;
            this.importCaseObjResultModel = true;
            this.importCaseObjResult['objStr'] = `${res.data.objsize}个对象导入成功，${res.data.repaceObjNames}个对象重复未成功导入`;
            this.importCaseObjResult['objNumStr'] = `${res.data.objnumsize}个标识导入成功，${res.data.repaceidentitys}个标识重复未成功导入`;
            this.importCaseObjResult['replaceObjList'] = res.data.repaceObjNamesForView;
            this.importCaseObjResult['replaceObjNumList'] = res.data.repaceidentitysForView;
          }
      },
      closeImportCaseObjResultModel(){
        this.importCaseObjResultModel = false;
        this.clearableFile()
      },
      handleFormatError (file) {
          this.$Notice.warning({
              title:`文件格式不正确`,
              desc:`请选择 .csv .txt 格式文件`
          });
      },
      handleError(error,file){
          this.importCaseObjModel=true;
          this.$Message.error(`请选择与对象格式想匹配的文件!`);
      },
      handleMaxSize (file) {
          this.$Notice.warning({
              title:`文件大小超出限制`,
              desc:`文件大小请限制在2M以内`
          });
      },

      // 调整table样式
      rowClassName(row) {
          return 'demo-table-info-row';
      },

      // 导入对象管理Modal
      importCaseObjManageFn(){
        this.importCaseObjListModel = true;
        this.importCaseObjManageListFn(this.page);
      },

      // 导入对象管理列表
      async importCaseObjManageListFn(sendData){
        this.showLoading = true;
        await queryObjectByCaseidforImport(sendData)
          .then(res => {
            this.showLoading = false;
            if(res.statusCode !== 200) return process_error(res);
            res.data.content.forEach(v => {
              v.investigateTime = `${v.investigatestarttime} - ${v.investigateendtime}`;
            })
            this.importCaseObjList = res.data.content;
            this.page.totalElements = res.data.totalElements;
            if(res.data.content.length === 0){
                this.page.totalElements = 0;
                this.page.pageNumber = 1;
                this.page.size = 10;
                return;
            }
          })
          .catch(err => console.log(err))
      },

      // 排序
      sortColumnFn(data){
        if(data.order === "normal"){
          this.page['sort'] = "investigatestarttime,desc";
        }else {
          this.page['sort'] = data.key === 'investigateTime' ? `investigatestarttime,${data.order}` : `${data.key},${data.order}`;
        }
        this.importCaseObjManageListFn(this.page);
      },

      // 分页及复合搜索处理
      pageChangeFn(page) {
          this.page['pageNumber'] = page.pageNumber;
          this.page['size'] = page.size;
          this.showLoading = true;
          this.importCaseObjManageListFn(this.page)
      },
    },
    mounted(){

      // 新增完案件信息及案件对象、标识 返回 '/addCase'
      if(!!this.$route.query.caseid){
        this.caseid = this.page.caseId = this.$route.query.caseid;
        this.getCaseInfo(this.caseid);
      }

      // 启用 caseInfo.vue 中编辑 、提交 | 隐藏保存
      if(!!this.$route.query.isDisabled && JSON.parse(this.$route.query.isDisabled)){
        this.$refs.caseInfo.enabledOperateBtn();
      }

      // 选择加载 可编辑的 案件信息组件 / 仅查看的 案件信息组件 --  优化用户体验
      this.cissynchrocase = this.$route.query['cissynchrocase'] || "";
      this.cstatuscode = this.$route.query['cstatuscode'] || "";
      this.cdisplay = this.$route.query['cdisplay'] || "";
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
    margin-top: 10px;
    padding-top: 5px;
    border-top: 1px solid #eeeff1;
    span{
      margin-right: 20px;
      display: inline-block;
      font:bold 14px/30px microsoft Yahei;
    }
    .ivu-icon{
      padding:5px 5px 0px 0px;
    }
  }
  .wrongSign{
    border-top: 1px solid #e8e8e8;
    font: 12px/18px normal;
    text-align: left;
  }
  .ColumnTitle{font-size:12px;}
  .fileBox{display: flex;flex-direction:column;width:150px;height:150px;border:1px solid #495060;border-radius: 5px;margin-top:10px;
    background:#e8e8e8;
    p{line-height:34px;height:50px;font-size:12px;}
  }
  .uploadBox{display: flex;flex-direction: row;line-height: 1;padding:5px 0 0 5px;
    .ivu-btn{ padding:2px 6px !important; }
  }
  /* 表格style */
  .table-row{
    border-right:1px solid #e2e2e2;
    border-top: 1px solid #e2e2e2;
  }
  .boBottom{
    border-left:1px solid #e2e2e2;
    border-bottom:1px solid #e2e2e2;
  }
  .noBoTop{border-top:none;}
  .col{  border-left: 1px solid #e2e2e2; }
  .noBoLeft{border-left:none;}
  .adjustPos{margin-top:10px;}
  .rowClassName{margin-bottom:10px;}
  .adjustPosition{padding-left: 20px; line-height: 25px;}
  /*表格 style end*/

  /*返回顶部*/
  .top{
      padding: 10px;
      background: rgb(71, 118, 200);
      color: rgba(242, 242, 242, 0.87);
      font-size:14px;
      text-align: center;
      border-radius: 5px;
      &:hover{color:#ed3f14;}
  }
</style>

