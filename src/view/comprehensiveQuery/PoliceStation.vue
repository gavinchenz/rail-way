<template>
  <div class="vue-body">
    <!-- 面包屑 -->
    <Breadcrumb class="router-box">
        <BreadcrumbItem to="/index">首页</BreadcrumbItem>
        <BreadcrumbItem to="ComprehensiveQuery?condition=2">综合查询</BreadcrumbItem>
        <BreadcrumbItem>派出所信息</BreadcrumbItem>
    </Breadcrumb>
    <!-- 查询条件 -->
    <Form :model="searchData" ref="searchForm" class="header-from">
      <FormItem class="form-item">
        <Row :gutter="16">
          <Col span="2" class="col-label">名称</Col>
          <Col span="4">
              <Input v-model="searchData.name" placeholder="请输入名称" clearable></Input>
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
      <Table :row-class-name="rowClassName"  height="520" :loading="loading" :columns="columns"  :data="policeStationDataList"
             @on-sort-change="sortClick" @on-selection-change="selectionClick"  size="small"></Table>
      <Paging class="table-page" :pages="searchData.page" @pageChange="pageChangeFn"></Paging>
    </div>
    <!-- 新增 -->
    <Modal v-model="addModal" width="800" @on-cancel="coloseModal('addForm')">
      <p slot="header">
        <Icon class="titleColor" v-if="toggleAdd" type="plus-round"></Icon>
        <Icon class="titleColor" v-else type="edit"></Icon>
        <span class="titleColor" v-if="toggleAdd">新增派出所信息</span>
        <span class="titleColor" v-else>编辑派出所信息</span>
      </p>
      <Form :model="addInfo" ref="addForm" :rules="ruleValidate">
        <Row>
          <Col span="12">
            <FormItem label="省/市/区" :label-width=75 prop="ssq">
              <Cascader :data="areaData" v-model="addInfo.ssq" :placeholder="ssqValue" change-on-select @on-change="getSelectData" clearable></Cascader>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="名称" :label-width=75 prop="name">
              <Input v-model="addInfo.name" placeholder="请输入名称" clearable></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="地址" :label-width=75 prop="address">
              <Input v-model="addInfo.address" placeholder="请输入地址" clearable></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="联系电话" :label-width=75 prop="phone">
              <Input v-model.number="addInfo.phone" placeholder="请输入联系电话" clearable></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="经度" :label-width=75 prop="lon">
              <Input v-model="addInfo.lon" placeholder="请输入经度" clearable></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="纬度" :label-width=75 prop="lat">
              <Input v-model.number="addInfo.lat" placeholder="请输入纬度" clearable></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="24">
            <FormItem label="详细地址" :label-width=75 prop="fulladdress">
              <Input v-model="addInfo.fulladdress" placeholder="请输入详细地址" clearable></Input>
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
  import {getPoliceStationList,savePoliceStation,deletePoliceStation,getPolicestainfoByid} from '@/service/getData';//异步请求链接
  import Paging from '@/components/common/tools/paging';//分页
  import expandRow from '@/components/systemManagement/operation/OperationExpand-row';//分页
  import {process_error} from '@/config/process_request_conf'; //请求成功返回的状态
  import CityList from '../../assets/script/CityList';//省市区三级联动表单
  export default {
    name: 'CleanConfig',
    components: {Paging, expandRow},
    data () {
      return {
        toggleAdd: true,//v-if 新增时添加或编辑图标切换
        addModal: false,//v-model 新增弹出框开启或关闭
        loading: false, //布尔值判断 用于异步请求的样式
        ids:[],
        ssqValue:"请选择",
        searchData: {//查询条件
          page: {//翻页相关
          totalElements: 0,
          size: 10,//一页10行
          pageNumber: 1,//第一页
          sort: "id,desc"//排序，按最后修改时间和降序
          },
          name: ""
        },
        addInfo: {//新增弹窗的表单及其需要新增的条件
        //createUID: '1545', //登录用户ID
          ssq: "",
          name: "",
          address: "",
          phone: "",
          lon: "",
          lat: "",
          fulladdress: ""
        },
        ruleValidate: {
          ssq:[
            { required: true, message: "请选择省市区"}
          ],
          name:[
            { required: true, message: "名称不能为空",trigger: "blur"}
          ],
        },
        columns: [
          {title:'序号',type: 'selection',width: 60,align: "center",sortable: true},
          {title:'省',width: 100,align: 'center',key:'province',sortable: true},
          {title:'市',width: 100,align: 'center',key:'city',sortable: true},
          {title:'区县',width: 200,align: 'center',key:'area',sortable: true},
          {title:'名称',width: 200,align: 'center',key:'name',sortable: true},
          {title:'地址',width: 200,align: 'center',key:'address',sortable: true},
          {title:'联系电话',width: 200,align: 'center',key:'phone',sortable: true},
          {title:'经度',width: 200,align: 'center',key:'lon',sortable: true},
          {title:'维度',width: 200,align: 'center',key:'lat',sortable: true},
          {title:'详细地址',width: 200,align: 'center',key:'fulladdress',sortable: true},
          {
            title: "操作",
            width: 150,
            align: "center",
            fixed: 'right',
            render: (h, params) => {
              return h("div", [
                h("Button", {
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
        policeStationDataList: [],
        areaData:CityList
      }
    },
    methods: {
      rowClassName(row) {
        return 'demo-table-info-row';
      },
      selectionClick(arr){
        this.ids = [];
        for(var i in arr){
          this.ids.push(arr[i].id);
        }
      },
      //列表请求
      async getListData(sendData) {
        this.loading = true;
        await getPoliceStationList(sendData)
          .then(res => {
            this.loading = false;
            this.policeStationDataList = res.data.content;
            console.log(this.policeStationDataList);
            this.searchData.page.totalElements = res.data.totalElements;
          });
      },
      //新增，编辑保存请求
      async saveAddinfo(sendData) {
        await savePoliceStation(sendData)
          .then(res => {
            this.$Message.success(res.message);
            this.getListData(this.searchData);
            this.addInfo.id ='';
          });
      },
      getSelectData(value,selectedData){
        if (0 < value.length) {
          var seletData = [];
          for(var i in selectedData){
            var obj = selectedData[i];
            if($.inArray(obj.label,selectedData) < 0){
              seletData.push(obj.label);
            }
          }
        }
        this.addInfo.ssq = seletData;
      },
      //分页请求
      pageChangeFn(page) {
        this.searchData["page"]["pageNumber"] = page.pageNumber;
        this.searchData["page"]["size"] = page.size;
        this.getListData(this.searchData);
      },
      //查询
      searchFn() {
        let name = this.searchData["name"];
        this.searchData.page.pageNumber = 1;
        if (name) {
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
        this.searchData["name"] = "";
      },
      //新增弹窗
      async addOperationFn() {
        this.toggleAdd = true;
        this.addModal = true;
        this.ssqValue = '请选择';
        this.addInfo.ssq = "";
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

      //批量删除
      async deleteAll(){
        this.clearSearchInfo();
        if(this.ids.length>0){
          await deletePoliceStation(this.ids.join(","))
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

      //列表编辑
      async eideRowData(id) {
        await getPolicestainfoByid(id)
          .then(res =>{
            this.toggleAdd = false;
            this.addInfo.ssq = res.data.ssq;
            this.addInfo.name = res.data.name;
            this.addInfo.address = res.data.address;
            this.addInfo.lxdh = res.data.lxdh;
            this.addInfo.phone = res.data.phone;
            this.addInfo.lon = res.data.lon;
            this.addInfo.lat = res.data.lat;
            this.addInfo.fulladdress = res.data.fulladdress;
            this.ssqValue = res.data.ssqValue;
            this.addInfo.id = res.data.id;
            this.clearSearchInfo();
            this.addModal = true;
          })
      },
      //列表行删除
      async delData(id) {
        this.clearSearchInfo();
        await deletePoliceStation(id)
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
      async sortClick(column) {
        if (column.order != "normal") {
          this.searchData.page.sort = (column.key + "," + column.order);
        }
        this.getListData(this.searchData);
      }
    },
    mounted() {
      this.getListData(this.searchData);
    }
  };
</script>

<style scoped >
.demo-table-info-row{
  text-indent:-50px;
}
</style>
