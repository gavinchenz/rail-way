<template>
   <div class="vue-body">
    <Breadcrumb class="router-box">
        <BreadcrumbItem to="/index">首页</BreadcrumbItem>
        <BreadcrumbItem to="/ModelingAnalysis?condition=3">建模分析</BreadcrumbItem>
        <BreadcrumbItem>综合研判</BreadcrumbItem>
    </Breadcrumb>
    <Form ref="searchData" :model="searchData" :label-width="80" style="width: 100%;color:#000" class="header-from">
        <h3 class="form-h">数据地图</h3>
        <FormItem
                class="form-item"
                v-for="(item, index) in searchData.items"
                v-if="item.status"
                :key="index"
                :label="'乘车时间 ' + item.index"
                :prop="'items.' + index + '.value'"
                :rules="{required: true, message: '乘车时间 ' + item.index +'填写的内容不能为空', trigger: 'blur'}">
            <Row>
                <Col span="2" class="col-label">开始时间</Col>
                <Col span="3">
                    <DatePicker type="datetime" format="yyyy-MM-dd HH:mm:ss"  @on-change="item.startDate=$event" placeholder="选择日期" v-model="item.startDate"></DatePicker>
                </Col>
                <Col span="2" class="col-label">结束时间</Col>
                <Col span="3">
                    <DatePicker type="datetime" format="yyyy-MM-dd HH:mm:ss"  @on-change="item.endDate=$event" placeholder="选择日期" v-model="item.endDate"></DatePicker>
                </Col>
                <Col span="2" class="col-label">发站</Col>
                <Col span="4">
                    <Input v-model="item.startStation" placeholder="请输入起始站" clearable></Input>
                </Col>
                <Col span="2" class="col-label">到站</Col>
                <Col span="4">
                    <Input v-model="item.endStation" placeholder="请输入结束站" clearable></Input>
                </Col>
                <Col span="2" offset="1">
                    <Button type="ghost" @click="handleRemove(index)">删除</Button>
                </Col>
            </Row>
        </FormItem>
        <FormItem>
            <Row>
                <Col span="3">
                    <Button type="dashed" long @click="handleAdd" icon="plus-round">添加查询条件</Button>
                </Col>
<!--                 <Col span="2" style="marginLeft:100px">
                    <Button type="primary" @click="handleSubmit('searchData')">提交</Button>
                </Col> -->
                <Col span="2">
                    <Button type="ghost" @click="handleReset('searchData')" style="margin-left: 8px">重置</Button>
                </Col>          
            </Row>
        </FormItem>
    </Form>
    <Form :model="searchData" class="header-from">
        <h3 class="form-h">特征模型</h3>
        <FormItem class="form-item">
            <Row :gutter="8">
                <Col span="2" class="col-label">模型类型</Col>
                <Col span="6" class="col-checkbox">
                    <CheckboxGroup v-model="searchData.tzlx1">
                        <Checkbox label="1">AB-BA</Checkbox>
                        <Checkbox label="2">AB-CA</Checkbox>
                    </CheckboxGroup>                
                </Col>
                <Col span="2" class="col-label col-btn col-btn1">
                    <Button type="gohst" icon="plus-round" @click="flag = !flag" >更多</Button>
                </Col>
            </Row>
        </FormItem>    
    </Form>        
    <Form :model="searchData" class="header-from"  v-if="flag">
        <FormItem class="form-item">
            <Row :gutter="24">
              <Col span="2" class="col-label">模型类型</Col>
              <Col span="4" class="col-checkbox">
                  <CheckboxGroup v-model="searchData.tzlx2">
                            <Checkbox label="3">A-B</Checkbox>
                            <Checkbox label="4">AB-CD</Checkbox>
                            <Checkbox label="5">AB-AB</Checkbox>
                            <Checkbox label="6">ACB</Checkbox>                          
                  </CheckboxGroup>                
              </Col>
              <Col span="2" class="col-label" style='textAlign:left'>夜间乘车</Col>
              <Col span="4">
                  <Input v-model="searchData.yjcc" placeholder="请输入..." clearable></Input>
              </Col> 
              <Col span="2" class="col-label" style='textAlign:left'>行程冲突</Col>
              <Col span="4">
                  <Input v-model="searchData.xcct" placeholder="请输入..." clearable></Input>
              </Col> 
              <Col span="2" class="col-label col-btn col-btn1">
                  <!-- <Button type="gohst" icon="plus-round" @click="addOperationFn">新增</Button> -->
              </Col> 
            </Row>
        </FormItem>   
    </Form>       
    <!-- 按钮盒子 -->
    <Form class="btn-box" inline>
        <FormItem class="form-item">
            <Row>
<!--                 <Col span="2" style="marginRight:90px">
                   <FormItem>
                        <Button class="btn" type="info" icon="share" @click="addToEarlyWarningFn">添加模型到预警</Button>
                    </FormItem>
                </Col> -->
                <Col span="2" style="marginRight:100px">
                    <FormItem>
                        <Button class="btn" type="success" icon="ios-download-outline" @click="importDataFn">导入数据</Button>
                    </FormItem>
                </Col>
                <Col span="2" style="marginRight:50px">
                    <FormItem>
                        <Button class="btn" type="primary" icon="android-search" @click="startAnalysisFn">开始分析</Button>
                    </FormItem>
                </Col>
<!--                 <Col span="2" style="marginRight:50px">
                    <FormItem>
                        <Button class="btn" type="warning" icon="clipboard" @click="generateDataFn">生成数据模型</Button>
                    </FormItem>
                </Col>  -->                               
            </Row>     
        </FormItem>    
    </Form>
    <!-- 表格和翻页 -->
    <div class="table-box">
      <Table :loading="loading" class="table-content" border :columns="columns" :data="comprehensiveStudyDataList"
             @on-sort-change="sortClick"></Table>
      <Paging class="table-page" :pages="searchData.page" @pageChange="pageChangeFn"></Paging>
    </div>
    <!-- 新增 -->
    <Modal v-model="addModal" width="800" @on-cancel="coloseModal('addForm')">
      <p slot="header">
        <Icon class="titleColor" type="plus-round"></Icon>
        <span class="titleColor">新增模型</span>
 
      </p>
      <Form :model="addInfo" ref="addForm" :rules="ruleValidate">
        <h4>行程1</h4>
        <Row>
          <Col span="12">
            <FormItem label="发站1" :label-width=75 prop="fz1">
              <Input v-model="addInfo.fz1" placeholder="请输入发站1"/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="到站1" :label-width=75 prop="dz1">
              <Input v-model="addInfo.dz1" placeholder="请输入到站1"/>
            </FormItem>
          </Col>
        </Row>
        <h4>行程2</h4>
        <Row>
          <Col span="12">
            <FormItem label="发站2" :label-width=75 prop="fz2">
              <Input v-model="addInfo.fz2" placeholder="请输入发站2"/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="到站2" :label-width=75 prop="dz2">
              <Input v-model="addInfo.dz2" placeholder="请输入到站2"/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="时间间隔" :label-width=75 prop="sjjg">
              <Input v-model="addInfo.sjjg2" placeholder="请输入时间间隔"/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="频次" :label-width=75 prop="pc">
              <Input v-model="addInfo.pc2" placeholder="请输入频次"/>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button type="ghost" @click="coloseModal('addForm')">取消</Button>
        <Button type="primary" @click="saveModalInfo('addForm')">保存</Button>
      </div>
    </Modal>
  </div>    
</template>

<script>
  import { getComprehensiveStudyDataList } from "@/service/getData";//异步请求链接
  import Paging from "@/components/common/tools/paging";//分页
  import expandRow from "@/components/systemManagement/operation/OperationExpand-row";//分页
  import { process_error } from "@/config/process_request_conf"; //请求成功返回的状态
  import NationalCityList from '../../assets/script/nationalCityList';//省市区三级联动表单
  export default {
    name: 'ComprehensiveStudy',
    components:{

    },
    data () {
      return {
        flag:false,//更多按钮
        addModal: false,//v-model 新增弹出框开启或关闭
        index: 1,
        searchData: {
          items: [
              {
                  startDate: '',
                  endDate: '',
                  startStation: '',
                  endStation: '',
                  index: 1,
                  status: 1
              }
          ],   
          tzlx1: [],
          sex: '', 
          startAge: '', 
          endAge: '', 
          mz: '',
          dyxz:"",
          tzlx2: [],
          yjcc:"",
          xcct:""
        },
        addInfo: {//新增弹窗的表单及其需要新增的条件
          //createUID: '1545', //登录用户ID
          fz1:'',
          dz1:'',
          sjjg:'',
          pc:'',
          fz2:'',
          dz2:''
        },
        areaData:NationalCityList,
        columns:[
          { title: "序号", type: "selection", fixed: 'left', width: 60, align: "center" },
          { title: "任务名称", key: "rwmc", width: 250, align: "center",sortable: true },
          { title: "发起时间", key: "fqsj", width: 250, align: "center",sortable: true },
          { title: "任务状态", key: "rwzt", width: 250, align: "center",sortable: true },
          { title: "结果人数", key: "jgrs", width: 250, align: "center",sortable: true },
          { title: "发起人", key: "fqr", width: 250, align: "center",sortable: true },
          {
            title: '操作',
            width: 200,
            align: 'center',
            key: 'center',
            render: (h, params) => {
              return h("div", [h ('Button', {
                          props: {
                            type: "info",
                            size: 'small'
                          },
                          attrs: {title: "查看结果"},
                          style: {
                           marginRight: '5px'
                          },
                          on: {click: () => {
                                  this.showRowData(params.row.id)//查看整列
                                  }
                              }
                      },'查看结果'
                  )
                ]
              );
            }
          }
        ],
        comprehensiveStudyDataList: [
          {
            rwmc:'测试任务',
            fqsj:'2018-2-11',
            rwzt:'成功',
            jgrs:123,
            fqr:'测试人员'
          }
        ]
      }
    },
    methods:{
      //列表请求table
      async getListData(sendData) {
        this.loading = true;
        await getComprehensiveStudyDataList(sendData)
          .then(res => {
            this.loading = false;
            this.comprehensiveStudyDataList = res.data;
            console.log(this.comprehensiveStudyDataList);
            this.searchData.page.totalElements = res.data.totalElements;
          });
      },
      //分页请求
      pageChangeFn(page) {
        this.searchData["page"]["pageNumber"] = page.pageNumber;
        this.searchData["page"]["size"] = page.size;
        this.getListData(this.searchData);
      },
      //新增弹窗
      async addOperationFn() {
        this.addModal = true;
        this.clearSearchInfo();
      },
      //保存新增操作项
      saveModalInfo(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.saveAddinfo(this.addInfo);
            this.$refs[name].resetFields();
            this.addModal = false;
          } else {
            this.$Message.error("请在补充表单字段后再做提交操作");
          }
        });
      },
      //关闭弹窗
      coloseModal(name) {
        this.addModal = false;
        this.$refs[name].resetFields();
      },
      //列表编辑
      async eideRowData(id) {
        await getPersonnerByid(id)
          .then(res =>{
            this.toggleAdd = false;
            this.addInfo.fz1 = res.data.fz1;
            this.addInfo.dz1 = res.data.dz1;
            this.addInfo.sjjg = res.data.sjjg;
            this.addInfo.pc = res.data.pc;
            this.addInfo.sfzh = res.data.sfzh;
            this.addInfo.fz2 = res.data.sex;
            this.addInfo.dz2 = res.data.dz2;
            this.addInfo.id = res.data.id;
            this.clearSearchInfo();
            this.addModal = true;
          })
      },
      //查看详情
      showRowData(id){
        this.$router.push({path:'/TaskDetail'}) 
      },
      async sortClick(column) {
        if (column.order != "normal") {
          this.searchData.page.sort = (column.key + "," + column.order);
        }
        this.getListData(this.searchData);
      },
      handleSubmit (name) {
          this.$refs[name].validate((valid) => {
              if (valid) {
                  this.$Message.success('提交成功!');
              } else {
                  this.$Message.error('提交失败!');
              }
          })
      },
      handleReset (name) {
          this.$refs[name].resetFields();
          this.index=0;
      },
      handleAdd () {
          if(this.index<=2){
             this.index++; 
             this.searchData.items.push({
                  startDate: '',
                  endDate: '',
                  startStation: '',
                  endStation: '',
                  index: this.index,
                  status: 1
              });
          }     
      },
      handleRemove (index) {
          this.searchData.items[index].status = 0;
      },
      //添加模型到预警
      addToEarlyWarningFn(){
       console.log(this.searchData);
      },
      //导入数据
      importDataFn(){
       console.log(this.searchData);
        this.$router.push({path:'/TaskList'})
      },
      //开始分析
      startAnalysisFn(){
       console.log(this.searchData);
        this.$router.push({path:'/TaskList'})
      },
      //生成数据模型
      generateDataFn(){
       console.log(this.searchData);
        this.$router.push({path:'/TaskList'})
      },            
    }
  };
</script>

<style scoped >
.form-h{
  height:20px;
  line-height: 20px;
  text-indent: 10px;
  color:#000;
}
.header-from{
  padding:10px 0 0 10px;
}
.col-label{
    color:#000;
    width:80px;
    text-align: center;
}
.form-item .col-btn1{
   margin-right:300px;
}
.col-btn{
  float:right;
  margin-right:30px;
}
</style>
