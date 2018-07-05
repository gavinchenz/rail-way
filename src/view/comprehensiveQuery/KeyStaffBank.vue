<template>
  <div class="vue-body">
    <!-- 面包屑 -->
    <Breadcrumb class="router-box">
      <BreadcrumbItem to="/index">首页</BreadcrumbItem>
      <BreadcrumbItem to="/ComprehensiveQuery?condition=2">综合查询</BreadcrumbItem>
      <BreadcrumbItem>重点人员库</BreadcrumbItem>
    </Breadcrumb>
    <!-- 查询条件 -->
    <Form :model="searchData" ref="searchForm" class="header-from">
      <FormItem class="form-item">
        <Row :gutter="16">
          <Col span="1" class="col-label">姓名</Col>
          <Col span="4">
            <Input v-model="searchData.xm" placeholder="请输入姓名" clearable></Input>
          </Col>
          <Col span="2" class="col-label">身份证号</Col>
          <Col span="4">
            <Input v-model="searchData.sfzh" placeholder="请输入身份证号" clearable></Input>
          </Col>
          <Col span="2" class="col-label">车牌信息</Col>
          <Col span="4">
            <Input v-model="searchData.clxx" placeholder="请输入车牌信息" clearable></Input>
          </Col>
        </Row>
      </FormItem>
      <FormItem class="form-item">
        <Row :gutter="14">
          <Col span="1" class="col-label">户籍地</Col>
          <Col span="4">
            <Input v-model="searchData.hjd" placeholder="请输入户籍地" clearable></Input>
          </Col>
          <Col span="2" class="col-label">
            <Button type="primary" icon="ios-search" @click="searchFn">查询</Button>
          </Col>
          <Col span="2" class="col-label">
            <Button type="ghost" @click="handleResetFn" icon="refresh">重置</Button>
          </Col>
        </Row>
      </FormItem>
    </Form>
    <!-- 按钮盒子 -->
    <Form class="btn-box" inline>
      <FormItem class="form-item">
        <Row>
          <Col span="2" style="text-align: right">
            <FormItem>
              <Button type="success" icon="plus-round" @click="addOperationFn">新增</Button>
            </FormItem>
          </Col>
        </Row>
      </FormItem>
      <FormItem class="form-item">
        <Row>
          <Col span="2" style="text-align: right">
            <FormItem>
              <Button class="btn" type="warning" icon="trash-a" @click="deleteAll">批量删除</Button>
            </FormItem>
          </Col>
        </Row>
      </FormItem>
    </Form>
    <!-- 表格和翻页 -->
    <div class="table-box">
      <Table :row-class-name="rowClassName"  height="520" :loading="loading" :columns="columns"  :data="personnerList"
             @on-sort-change="sortClick" @on-selection-change="selectionClick"  size="small"></Table>
      <Paging class="table-page" :pages="searchData.page" @pageChange="pageChangeFn"></Paging>
    </div>
    <!-- 新增 -->
    <Modal v-model="addModal" width="800" @on-cancel="coloseModal('addForm')">
      <p slot="header">
        <Icon class="titleColor" v-if="toggleAdd" type="plus-round"></Icon>
        <Icon class="titleColor" v-else type="edit"></Icon>
        <span class="titleColor" v-if="toggleAdd">新增重点人员</span>
        <span class="titleColor" v-else>编辑重点人员</span>
      </p>
      <Form :model="addInfo" ref="addForm" :rules="ruleValidate">
        <h4>基本信息</h4>
        <Row>
          <Col span="24">
            <FormItem label="人员类别" :label-width=75 prop="rylb">
                <Select v-model="addInfo.rylb" multiple placeholder="请选择" style="width:99%"
                        label-in-value>
                  <Option v-for="item in rylbList" :value="item.key" :key="item.key">{{item.value}}</Option>
                </Select>
              </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="姓名" :label-width=75 prop="xm">
              <Input v-model="addInfo.xm" placeholder="请输入姓名"/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="民族" :label-width=75 prop="mz">
              <Input v-model="addInfo.mz" placeholder="请输入民族"/>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="身份证号" :label-width=75 prop="sfzh">
              <Input v-model="addInfo.sfzh" placeholder="请输入身份证号"/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="性别" style="margin-left: 40px">
              <RadioGroup v-model="addInfo.sex" size="small">
                <Radio label="true" style="margin-left:40px">
                  <Icon type="male"></Icon>
                  <span>男</span>
                </Radio>
                <Radio label="false" style="margin-left:10px">
                  <Icon type="female"></Icon>
                  <span>女</span>
                </Radio>
              </RadioGroup>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="出生日期" :label-width=75 prop="csrq">
              <Input v-model="addInfo.csrq" placeholder="请输入出生日期"/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="身高" :label-width=75 prop="sg">
              <Input v-model="addInfo.sg" placeholder="请输入身高"/>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="工作情况" :label-width=75 prop="gzqk">
              <Input v-model="addInfo.gzqk" placeholder="请输入工作情况"/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="服务处所" :label-width=75 prop="fwcs">
              <Input v-model="addInfo.fwcs" placeholder="请输入服务处所"/>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="其他住址" :label-width=75 prop="qtzz">
              <Input v-model="addInfo.qtzz" placeholder="请输入其他住址"/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="户籍地" :label-width=75 prop="hjd">
              <Input v-model="addInfo.hjd" placeholder="请输入户籍地"/>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="文化程度" :label-width=75 prop="whcd">
              <Select v-model="addInfo.whcd" placeholder="请选择" style="width:300px" @on-change="chooseXl" label-in-value>
                <Option v-for="item in xlList" :value="item.id" :key="item.id">{{item.xlname}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="婚姻状况" :label-width=95 prop="hyzk">
              <Select v-model="addInfo.hyzk" placeholder="请选择" style="width:280px" @on-change="chooseHyzk"
                      label-in-value>
                <Option v-for="item in hyzkList" :value="item.id" :key="item.id">{{item.hyzkname}}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="身份状况" :label-width=75 prop="sfzk">
              <Input v-model="addInfo.sfzk" placeholder="请输入身份状况"/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="手机号" :label-width=75 prop="sjh">
              <Input v-model="addInfo.sjh" placeholder="请输入手机号"/>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="微信号" :label-width=75 prop="wx">
              <Input v-model="addInfo.wx" placeholder="请输入微信号"/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="QQ" :label-width=75 prop="qq">
              <Input v-model="addInfo.qq" placeholder="请输入QQ"/>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="其他虚拟信息" :label-width=95 prop="qtxnxx">
              <Input v-model="addInfo.qtxnxx" placeholder="请输入其他虚拟信息"/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="开户银行" :label-width=75 prop="khyh">
              <Input v-model="addInfo.khyh" placeholder="请输入开户银行"/>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="其他财产信息" :label-width=95 prop="qtccxx">
              <Input v-model="addInfo.qtccxx" placeholder="请输入其他财产信息"/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="违法前科信息" :label-width=95 prop="wfqkxx">
              <Input v-model="addInfo.wfqkxx" placeholder="请输入违法前科信息"/>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="现状" :label-width=75 prop="xz">
              <Input v-model="addInfo.xz" placeholder="请输入现状"/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="车辆信息" :label-width=75 prop="clxx">
              <Input v-model="addInfo.clxx" placeholder="请输入车辆信息"/>
            </FormItem>
          </Col>
        </Row>
        <h4>关联人员</h4>
        <Row>
          <Col span="24">
            <FormItem>
              <Table :columns="[{title:'姓名',key:'xm'},{title:'身份证号',key:'idcard'},{title:'户籍地',key:'hjd'},{title:'关系',key:'relev'},{title:'备注',key:'remarks'}]"></Table>
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
  import { getPersonnerList, savePersonner, operTypenameList, deletePersonner,getDictionForRylb,getPersonnerByid } from "@/service/getData";//一部请求链接
  import Paging from "@/components/common/tools/paging";//分页
  import expandRow from "@/components/systemManagement/operation/OperationExpand-row";//分页
  import { process_error } from "@/config/process_request_conf"; //请求成功返回的状态
  import { idCard } from "@/components/common/validateFun";//校验
  export default {
    name: "KeyStaffBank",
    components: { Paging, expandRow },
    data() {
      return {
        toggleAdd: true,//v-if 新增时添加或编辑图标切换
        addModal: false,//v-model 新增弹出框开启或关闭
        loading: false, //布尔值判断 用于异步请求的样式
        ids:[],
        searchData: {//查询条件
          page: {//翻页相关
            totalElements: 0,
            size: 10,//一页10行
            pageNumber: 1,//第一页
            sort: "id,desc"//排序，按最后修改时间和降序
          },
          xm: "",
          sfzh: "",
          clxx: "",
          hjd: ""
        },
        typeNameList: [],//？？？？暂不知道干什么用
        rylbList:[],
        hyzkList: [//新增弹窗-婚姻状况-选择项，后期要异步获取
          { id: "0", hyzkname: "未婚" }, { id: "1", hyzkname: "已婚" }, { id: "2", hyzkname: "离婚" }, { id: "3", hyzkname: "丧偶"  }
        ],
        xlList: [//新增弹窗-婚姻状况-选择项，后期要异步获取
          { id: "0", xlname: "博士后" }, { id: "1", xlname: "博士" }, { id: "2", xlname: "硕士" }, { id: "3", xlname: "研究生"  }, { id: "4", xlname: "大学本科" }, { id: "5", xlname: "大学专科" }, { id: "6", xlname: "高中" },
          {  id: "7", xlname: "初中" }, { id: "8", xlname: "小学" } ],
        addInfo: {//新增弹窗的表单及其需要新增的条件
          //createUID: '1545', //登录用户ID
          rylb:[],
          xm: "",
          mz: "",
          sfzh: "",
          sex: "true",
          csrq: "",
          sg: "",
          gzqk: "",
          fwcs: "",
          qtzz: "",
          hjd: "",
          whcd: "",
          hyzk: "",
          sfzk: "",
          sjh: "",
          wx: "",
          qq: "",
          qtxnxx: "",
          khyh: "",
          qtccxx: "",
          wfqkxx: "",
          xz: "",
          clxx: "",
          relevPersonnerList: [],
          zdrly:"1",
          id: ""
        },
        ruleValidate: {//新增弹窗表单addInfo的验证规则
          //人员类别
          rylb:[
            { required: true, message: "人员类别不能为空"}
          ],
          //姓名
          xm: [
            { required: true, message: "姓名不能为空", trigger: "blur" },
            { type: "string", max: 50, message: "姓名太长", trigger: "blur" }
          ],
          //身份证号码
          sfzh: [
            { required: true, trigger: "blur", validator: idCard }
          ]
        },
        columns: [
          { title: "序号", type: "selection", width: 60, align: "center",sortable: true },
          { title: "姓名", key: "xm",width:150,align:'center',sortable: true},
          { title: "民族", key: "mz",width:100,align:'center',sortable: true},
          { title: "身份证号", key: "sfzh" ,width:200,align:'center',sortable: true},
          { title: "户籍地", key: "hjd",width:200,align:'center',sortable: true },
          { title: "工作情况", key: "gzqk" ,width:200,align:'center',sortable: true},
          { title: "违法前科信息", key: "wfqkxx",align:'center',sortable: true},
          {
            title: "操作",
            width: 130,
            align: "center",
            render: (h, params) => {
              return h("div", [h("Button", {
                  props: {
                    type: "success",
                    size: 'small'
                  },
                  attrs: { title: "编辑" },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.eideRowData(params.row.id);//编辑列表
                    }
                  }
                }, "编辑"
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
        personnerList: []//table里的数据，异步获取列表信息
      };
    },
    methods: {
      rowClassName(row) {
        return 'demo-table-info-row';
      },
      //列表请求
      async getListData(sendData) {
        this.loading = true;
        await getPersonnerList(sendData)
          .then(res => {
            this.loading = false;
            this.personnerList = res.data.content;
            console.log(this.personnerList);
            this.searchData.page.totalElements = res.data.totalElements;
          });
      },
      //新增，编辑保存请求
      async saveAddinfo(sendData) {
        await savePersonner(sendData)
          .then(res => {
            this.$Message.success(res.message);
            this.getListData(this.searchData);
          });
      },
      //分页请求
      pageChangeFn(page) {
        this.searchData["page"]["pageNumber"] = page.pageNumber;
        this.searchData["page"]["size"] = page.size;
        this.getListData(this.searchData);
      },
      selectionClick(arr){
        this.ids = [];
        for(var i in arr){
          this.ids.push(arr[i].id);
        }
      },
      //查询
      searchFn() {
        let xm = this.searchData["xm"];
        let sfzh = this.searchData["sfzh"];
        let clxx = this.searchData["clxx"];
        let hjd = this.searchData["hjd"];
        this.searchData.page.pageNumber = 1;
        if (xm || sfzh || clxx || hjd) {
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
        this.searchData["xm"] = "";
        this.searchData["sfzh"] = "";
        this.searchData["clxx"] = "";
        this.searchData["hjd"] = "";
      },
      //新增弹窗
      async addOperationFn() {
        this.addInfo = {
          sex: "true"
        };
        this.toggleAdd = true;
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
            this.addInfo.createUID = res.data.createUID;
            this.addInfo.rylb = res.data.rylb;
            this.addInfo.xm = res.data.xm;
            this.addInfo.mz = res.data.mz;
            this.addInfo.sfzh = res.data.sfzh;
            this.addInfo.sex = res.data.sex;
            this.addInfo.csrq = res.data.csrq;
            this.addInfo.sg = res.data.sg;
            this.addInfo.gzqk = res.data.gzqk;
            this.addInfo.fwcs = res.data.fwcs;
            this.addInfo.qtzz = res.data.qtzz;
            this.addInfo.hjd = res.data.hjd;
            this.addInfo.whcd = res.data.whcd;
            this.addInfo.xlname = this.getXlObjById(res.data.whcd);
            this.addInfo.hyzk = res.data.hyzk;
            this.addInfo.hyzkname = this.getHyzkObjById(res.data.hyzk);
            this.addInfo.sfzk = res.data.sfzk;
            this.addInfo.sjh = res.data.sjh;
            this.addInfo.wx = res.data.wx;
            this.addInfo.qq = res.data.qq;
            this.addInfo.qtxnxx = res.data.qtxnxx;
            this.addInfo.khyh = res.data.khyh;
            this.addInfo.qtccxx = res.data.qtccxx;
            this.addInfo.wfqkxx = res.data.wfqkxx;
            this.addInfo.xz = res.data.xz;
            this.addInfo.clxx = res.data.clxx;
            this.addInfo.relevPersonnerList = res.data.relevPersonnerList;
            this.addInfo.zdrly = res.data.zdrly;
            this.addInfo.id = res.data.id;
            this.clearSearchInfo();
            this.addModal = true;
          })
      },
      //列表行删除
      async delData(id) {
        this.clearSearchInfo();
        await deletePersonner(id)
          .then(res => {
            if (res.statusCode !== 200) return process_error(res);
            this.$Message.success(res.message);
            this.getListData(this.searchData);
          }).catch(err => {
            this.$Message.error(err.message);
          });
      },
      //列表行删除
      delRowData(id) {
        this.$Modal.confirm({
          title: "删除操作",
          content: "<p>您确定要删除这条操作记录吗？</p>",
          onOk: () => {
            this.delData(id);
          }
        });
      },
      //批量删除
      async deleteAll(){
        this.clearSearchInfo();
        if(this.ids.length>0){
          await deletePersonner(this.ids.join(","))
            .then(res => {
              if (res.statusCode !== 200) return process_error(res);
              this.$Message.success(res.message);
              this.getListData(this.searchData);
              this.ids = [];
            }).catch(err => {
              this.$Message.error(err.message)
            })
        }
      },
      async sortClick(column) {
        if (column.order != "normal") {
          this.searchData.page.sort = (column.key + "," + column.order);
        }
        this.getListData(this.searchData);
      },
      chooseXl(obj) {
        this.addInfo.xl = obj.value;
        this.addInfo.xlname = obj.label;
      },
      chooseHyzk(obj) {
        this.addInfo.hyzk = obj.value;
        this.addInfo.hyzkname = obj.label;
      },
      //循环遍历 通过id获得对应的名称
      getRylbObjById(o) {
        let name = "";
        if (o != "") {
          this.rylbList.filter(function(e) {
            if (o === e.key) {
              name = e.value;
            }
          });
        }
        return name;
      },
      getXlObjById(o) {
        let name = "";
        if (o != "") {
          this.xlList.filter(function(e) {
            if (o === e.id) {
              name = e.xlname;
            }
          });
        }
        return name;
      },
      getHyzkObjById(o) {
        let name = "";
        if (o != "") {
          this.hyzkList.filter(function(e) {
            if (o === e.id) {
              name = e.hyzkname;
            }
          });
        }
        return name;
      },
      async getDictionForRylb(){
        await getDictionForRylb()
          .then(res =>{
            this.rylbList = res.data;
          })
      },
    },
    mounted() {
      this.getListData(this.searchData);
      this.getDictionForRylb();
    }
  };
</script>

<style scoped>

</style>
