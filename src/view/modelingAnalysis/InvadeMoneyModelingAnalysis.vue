<template>
  <div class="vue-body">
    <!-- 面包屑 -->
    <Breadcrumb class="router-box">
      <BreadcrumbItem to="/index">首页</BreadcrumbItem>
      <BreadcrumbItem to="/ModelingAnalysis?condition=3">建模分析</BreadcrumbItem>
      <BreadcrumbItem>侵财建模分析</BreadcrumbItem>
    </Breadcrumb>
    <!-- 查询条件 -->
        <Form :model="searchData" class="header-from">
            <FormItem class="form-item">
                <Row :gutter="24">
                    <Col span="2" class="col-label">特征类型</Col>
                    <Col span="22" class="col-checkbox">
                        <RadioGroup v-model="searchData.radioValue" @on-change="changeConditionFn" :theValue="searchData.radioValue">
                            <Radio label="1">AB-BA</Radio>
                            <Radio label="2">AB-AB</Radio>
                            <Radio label="3">ACB</Radio>
                            <Radio label="4">AB-CA</Radio>
                        </RadioGroup>                
                    </Col>
                </Row>
            </FormItem> 
            <FormItem class="form-item">
                <Row :gutter="12">
                    <Col span="2" class="col-label" style='text-align:left'>起始站</Col>
                    <Col span="4">
                        <Input v-model="searchData.startStation" placeholder="请输入起始站" clearable></Input>
                    </Col>
                    <Col span="2" class="col-label">结束站</Col>
                    <Col span="4">
                        <Input v-model="searchData.endStation" placeholder="请输入结束站" clearable></Input>
                    </Col>
                </Row>
            </FormItem>
            <FormItem class="form-item" v-if="isValue==1">
                <Row :gutter="12">
                    <Col span="2" class="col-label" style='text-align:left'>时间间隔</Col>
                    <Col span="4">
                        <Input v-model="searchData.timeInterval" placeholder="请输入数字,单位以小时记算" clearable></Input>
                    </Col>
                    <Col span="2" class="col-label">频次</Col>
                    <Col span="4">
                        <Input v-model="searchData.frequency1" placeholder="请输入频次" clearable></Input>
                    </Col>
                </Row>
            </FormItem>
            <FormItem class="form-item" v-else>
                <Row :gutter="12">
                    <Col span="2" class="col-label" style="textAlign:left">频次</Col>
                    <Col span="4">
                        <Input v-model="searchData.frequency2" placeholder="请输入频次" clearable></Input>
                    </Col>
                </Row>
            </FormItem>
            <FormItem class="form-item">
                <Row :gutter="24">
                    <Col span="2" class="col-label">开始时间</Col>
                    <Col span="4">
                        <DatePicker type="datetime" placeholder="选择日期" v-model="searchData.startDate" format="yyyy-MM-dd HH:mm:ss"  @on-change="searchData.startDate=$event"></DatePicker>
                    </Col>
                    <Col span="2" class="col-label">结束时间</Col>
                    <Col span="4">
                        <DatePicker type="datetime" placeholder="选择日期" v-model="searchData.endDate" format="yyyy-MM-dd HH:mm:ss"  @on-change="searchData.endDate=$event"></DatePicker>
                    </Col>
                    <Col span="4" class="col-label col-btn">
                        <Button type="primary" icon="ios-download-outline" @click="searchFn" >导入数据</Button>
                    </Col>
                    <Col span="4" class="col-label col-btn" style="marginLeft:50px"> 
                        <Button type="success" icon="ios-search" @click="startAnalysisFn" >开始分析</Button>
                    </Col>
                </Row>
            </FormItem>
        </Form>
    <!-- 表格和翻页 -->
    <div class="table-box">
      <Table :loading="loading" class="table-content" border :columns="columns" :data="invadeMoneyModelDataList"
             @on-sort-change="sortClick"></Table>
      <Paging class="table-page" :pages="searchData.page" @pageChange="pageChangeFn"></Paging>
    </div>
    <!-- 新增模型 -->
    <Modal v-model="addModal" width="600" @on-cancel="coloseModal('addForm')">
      <p slot="header">
        <Icon class="titleColor" type="edit"></Icon>
        <span class="titleColor">新增模型</span>
      </p>
      <Form :model="addInfo" ref="addForm" :rules="ruleValidate">
        <Row>
          <Col span="12">
            <FormItem label="模型名称" :label-width=75 prop="mxmc">
              <Input v-model="addInfo.mxmc" placeholder="请输入模型名称"/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="是否常用" style="margin-left: 40px">
              <RadioGroup v-model="addInfo.sfcy" size="small">
                <Radio label="true" style="margin-left:40px">
                  <span>是</span>
                </Radio>
                <Radio label="false" style="margin-left:10px">
                  <span>否</span>
                </Radio>
              </RadioGroup>
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
  import { getInvadeMoneyModelDataList,getInvadeMoneyAnalysisList } from "@/service/getData";//异步请求链接
  import Paging from "@/components/common/tools/paging";//分页
  import expandRow from "@/components/systemManagement/operation/OperationExpand-row";//分页
  import { process_error } from "@/config/process_request_conf"; //请求成功返回的状态
  export default {
    name: "InvadeMoneyModelingAnalysis",
    components: { Paging, expandRow },
    data() {
      return {
        loading: false, //布尔值判断
        addModal: false,//v-model 新增弹出框开启或关闭
        isValue:null,        
        searchData: {//查询条件
          page: {//翻页相关
            totalElements: 0,
            size: 10,//一页10行
            pageNumber: 1,//第一页
            sort: "lastModifyTime,desc"//排序，按最后修改时间和降序
          },
          radioValue:'',
          startStation:'',
          endStation:'',
          timeInterval:'',
          frequency1:'',
          frequency2:'',
          startDate:'',
          endDate:'',
        },
        addInfo: {//新增弹窗的表单及其需要新增的条件
            //createUID: '1545', //登录用户ID
            mxmc:'',
            sfcy: ''
        }, 
        concatData:[],
        ruleValidate: {//新增弹窗表单addInfo的验证规则
            //人员类别
            mxmc:[
                { required: true, message: "模型名称不能为空"}
            ]
        },
        columns: [
          { title: "序号", type: "selection", fixed: 'left', width: 60, align: "center" },
          { title: "案件名", key: "ajm", width: 250, align: "center",sortable: true },
          { title: "任务名", key: "rwm", width: 250, align: "center",sortable: true },
          { title: "任务类别", key: "rwlb", width: 250, align: "center",sortable: true },
          { title: "任务来源", key: "rwly", width: 250, align: "center",sortable: true },
          { title: "创建人", key: "cjr", width: 250, align: "center",sortable: true },
          { title: "创建时间", key: "cjsj", width: 250, align: "center",sortable: true },
          { title: "结果条数", key: "jgts", width: 250, align: "center",sortable: true },
          { title: "任务状态", key: "rwzt", width: 250, align: "center",sortable: true },
          {
            title: '操作',
            width: 200,
            align: 'center',
            key: 'center',
            fixed:'right',
            render: (h, params) => {
              return h("div", [h ('Button', {
                          props: {
                            type: "info",
                            size: 'small'
                          },
                          attrs: {title: "查看"},
                          style: {
                             marginRight: '5px'
                          },
                          on: {click: () => {
                                  this.showRowData(params.row.id)//查看整列
                                  }
                              }
                      },'查看'
                  ),
                  h("Button", {
                      props: {
                        type: "error",
                        size: 'small'
                      },
                      attrs: { title: "删除" },
                      style: {
                         marginRight: '5px'
                      },
                      on: {
                        click: () => {
                          this.delRowData(params.row.id);//删除整列
                        }
                      }
                    }, "删除"
                  )
                ]
              );
            }
          }
        ], 
        // columns: [
        //   { title: "序号", type: "selection", width: 60, fixed: "left", class: "noExl" },
        //   { title: "售票时间", width: 200, align: "center", key: "spsj", sortable: true },
        //   { title: "售处", width: 100, align: "center", key: "sc", sortable: true },
        //   { title: "窗口", width: 100, align: "center", key: "cc", sortable: true },
        //   { title: "证件号", width: 200, align: "center", key: "zjh", sortable: true },
        //   { title: "姓名", width: 100, align: "center", key: "xm", sortable: true },
        //   { title: "车次", width: 100, align: "center", key: "checi", sortable: true },
        //   { title: "票号", width: 100, align: "center", key: "ph", sortable: true },
        //   { title: "发站", width: 100, align: "center", key: "fz", sortable: true },
        //   { title: "到站", width: 100, align: "center", key: "dz", sortable: true },
        //   { title: "车厢", width: 100, align: "center", key: "cx", sortable: true },
        //   { title: "席位", width: 100, align: "center", key: "xw", sortable: true },
        //   { title: "席别", width: 100, align: "center", key: "xb", sortable: true },
        //   { title: "证件类型", width: 150, align: "center", key: "zjlx", sortable: true },
        //   { title: "乘车日期", width: 200, align: "center", key: "ccrq", sortable: true },
        //   { title: "发站时间", width: 200, align: "center", key: "fzsj", sortable: true },
        //   { title: "操作员", width: 150, align: "center", key: "czy", sortable: true },
        //   {
        //     title: "操作",
        //     width: 150,
        //     align: "center",
        //     key: "center",
        //     fixed: "right",
        //     render: (h, params) => {
        //       return h("div", [
        //         h("Button", {
        //           props: {
        //             type: "primary",
        //             size: "small"
        //           },
        //           style: {
        //             marginRight: "5px"
        //           },
        //           on: {
        //             click: () => {
        //               this.showDetail(params.idNumber);
        //             }
        //           }
        //         }, "查看详情")
        //       ]);
        //     }
        //   }
        // ],
        invadeMoneyModelDataList: []
      };
    },
    methods: {
      //根据radio中value的值来改变筛选条件
      changeConditionFn(theValue){
          console.log(theValue)
          if(theValue==1 || theValue==2 || theValue==4){
              this.isValue=1;
          }else{
              this.isValue=0;
          }
      },
      //开始分析
      startAnalysisFn(){
          this.addModal = true;
      },
      //保存新增操作项
      saveModalInfo(name) {
          this.$refs[name].validate((valid) => {
              if (valid) {
                  console.log(this.searchData);
                  console.log(this.addInfo);
                  //别忘了写个方法把addInfo和searchData拼起来
                  // this.concatData = (this.addInfo).concat(this.searchData);
                  // console.log(this.concatData)
                  this.getAnalysisFn(this.addInfo);// this.concatData
                  this.$refs[name].resetFields();
                  this.addModal = false;
              } else {
                  this.$Message.error("请在补充表单字段后再做提交操作");
              }
          });
      },             
      //新增，编辑保存请求
      async getAnalysisFn(sendData) {
          await getInvadeMoneyAnalysisList(sendData)
            .then(res => {
              this.$Message.success(res.message);//???分析后的处理，需求暂时未定
              // this.getListData(this.searchData);
          });
      }, 
      //关闭弹窗
      coloseModal(name) {
          this.addModal = false;
          this.$refs[name].resetFields();
      }, 
      //列表请求table
      async getListData(sendData) {
        this.loading = true;
        await getInvadeMoneyModelDataList(sendData)
          .then(res => {
            this.loading = false;
            this.invadeMoneyModelDataList = res.data;
            console.log(this.invadeMoneyModelDataList);
            this.searchData.page.totalElements = res.data.totalElements;
          });
      },
      //分页请求
      pageChangeFn(page) {
        this.searchData["page"]["pageNumber"] = page.pageNumber;
        this.searchData["page"]["size"] = page.size;
        this.getListData(this.searchData);
      },
      //查询
      searchFn() {
        let startDate = (this.searchData["startDate"]).join(",");//日期数组转字符串，用逗号隔开
        let endDate = (this.searchData["endDate"]).join(",");//日期数组转字符串，用逗号隔开
        let startStation = this.searchData["startStation"];
        let endStation = this.searchData["endStation"];
        let abnormalType = this.searchData["abnormalType"];
        this.searchData.page.pageNumber = 1;
        if (abnormalType || startStation || endStation || startDate || endDate) {
          this.getListData(this.searchData);
        } else {
          this.$Message.warning("请输入查询内容!");
        }
      },
      //重置查询
      handleResetFn() {
        this.clearSearchInfo();
        this.getListData(this.searchData);
      },
      //清空查询
      clearSearchInfo() {
        this.searchData["abnormalType"] = [];
        this.searchData["startStation"] = "";
        this.searchData["endStation"] = "";
        this.searchData["startDate"] = "";
        this.searchData["endDate"] = "";
      },
      //导出excel
      exportFn() {
        $(".table-content").table2excel({
          exclude: ".noExl",
          name: "demo",
          filename: "数据表",
          exclude_img: true,
          exclude_links: true,
          exclude_inputs: true
        });
      },
      async sortClick(column) {
        if (column.order != "normal") {
          this.searchData.page.sort = (column.key + "," + column.order);
        }
        this.getListData(this.searchData);
      },
      //查看详情，暂未添加
      showDetail(id) {
        console.log(id);
      }
    },
    mounted() {
      this.getListData(this.searchData);
      // this.exportFn();
    }
  };
</script>

<style scoped>

</style>
