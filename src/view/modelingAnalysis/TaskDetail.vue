<template>
  <div class="vue-body">
    <Breadcrumb class="router-box">
      <BreadcrumbItem to="/ModelingAnalysis">返回</BreadcrumbItem>
      <BreadcrumbItem>任务详情</BreadcrumbItem>
    </Breadcrumb>
    <!-- 查询条件 -->
    <Form :model="searchData" class="header-from">
      <FormItem  class="form-item" prop="aj">
        <Row :gutter="10">
        <Col span="2" class="col-label" style='marginLeft:30px;textAlign:left'>性别</Col>
          <Col span="2" class="col-checkbox">
              <RadioGroup v-model="searchData.sex">
                  <Radio label="1">男</Radio>
                  <Radio label="0">女</Radio>
              </RadioGroup>                
          </Col>
          <Col span="2" class="col-label">年龄</Col>
          <Col span="2">
              <Input v-model="searchData.startAge" placeholder="请输入..." clearable style="display: inline"></Input>
          </Col>
          <Col span="1" style="width:30px;fontSize:22px">
            －
          </Col>
          <Col span="2">
            <Input v-model="searchData.endAge" placeholder="请输入..." clearable style="display: inline"></Input>
          </Col>
          <Col span="2" class="col-label">席别</Col>
          <Col span="2">
              <Input v-model="searchData.xb" placeholder="请输入..." clearable style="width:200px"></Input>
          </Col>
          <Col span="2" class="col-label" style="marginLeft:80px;">地域</Col>
          <Col span="3">
            <Cascader :data="areaData" v-model="searchData.dyxz" change-on-select clearable style="width:200px;display: inline-block"></Cascader>               
          </Col>
          <Col span="2" class="col-label" style='marginLeft:30px'>
            <Button type="primary" icon="ios-search" @click="searchFn">查询</Button>
          </Col>
        </Row>
      </FormItem>
    </Form> 
    <!-- 按钮盒子 -->
<!--     <Form class="btn-box" inline>
        <FormItem class="form-item">
            <Row>
                <Col span="2" style="text-align: right">
                    <FormItem>
                        <Button class="btn" type="warning" icon="trash-a" @click="deleteAllFn">批量删除</Button>
                    </FormItem>
                </Col>
            </Row>     
        </FormItem>    
    </Form> -->
    <!-- 表格和翻页 -->
    <div class="table-box">
        <Table :loading="loading" class="table-content" border :columns="columns" :data="taskListDataList" @on-sort-change="sortClick"></Table>
        <Paging class="table-page" :pages="searchData.page" @pageChange="pageChangeFn"></Paging>
    </div>
  </div>
</template>

<script>
  import { getTaskListDataList, deleteTaskListData} from "@/service/getData";//一部请求链接
  import Paging from "@/components/common/tools/paging";//分页
  import expandRow from "@/components/systemManagement/operation/OperationExpand-row";//分页
  import { process_error } from "@/config/process_request_conf"; //请求成功返回的状态
  import { idCard } from "@/components/common/validateFun";//校验
  import NationalCityList from '../../assets/script/nationalCityList';//省市区三级联动表单
  export default {
    name: 'TaskList',
    components: { Paging, expandRow },
    data () {
      return{
        areaData:NationalCityList,
        loading: false,//布尔值判断 用于异步请求的样式
        searchData: {//查询条件
          page: {//翻页相关
            totalElements: 0,
            size: 10,//一页10行
            pageNumber: 1,//第一页
            sort: "id,desc"//排序，按最后修改时间和降序
          },
          sex: "",
          startAge: "",
          endAge: "",
          xb:'',
          dyxz:''
        },
        ajList: [//案件选择框-选择项，后期要异步获取
          { id: "0", ajName: "案件1" }, 
          { id: "1", ajName: "案件2" }, 
          { id: "2", ajName: "案件3" }, 
          { id: "3", ajName: "案件4" },
          { id: "4", ajName: "案件5" },
          { id: "5", ajName: "案件6" }
        ],
        columns: [
          // { title: "序号", type: "selection", fixed: 'left', width: 60, align: "center" },
          { title: "姓名", key: "xm", width: 100, align: "center",sortable: true },
          { title: "证件类型", key: "zjlx", width: 150, align: "center",sortable: true },
          { title: "证件号", key: "zjbh", width: 250, align: "center",sortable: true },
          { title: "乘车日期", key: "ccrq", width: 150, align: "center",sortable: true },
          { title: "乘车时间", key: "ccsj", width: 150, align: "center",sortable: true },
          { title: "票号", key: "ph", width: 100, align: "center",sortable: true },
          { title: "车次", key: "cc", width: 100, align: "center",sortable: true },
          { title: "发站", key: "fz", width: 100, align: "center",sortable: true },
          { title: "到站", key: "dz", width: 100, align: "center",sortable: true },
          { title: "车厢号", key: "cxh", width: 100, align: "center",sortable: true },
          { title: "席别", key: "xb", width: 100, align: "center",sortable: true },
          { title: "座位号", key: "zwh", width: 100, align: "center",sortable: true },
          { title: "票种", key: "pz", width: 100, align: "center",sortable: true },
          { title: "票价", key: "pj", width: 100, align: "center",sortable: true },
          { title: "售票处", key: "spc", width: 100, align: "center",sortable: true },
          { title: "窗口", key: "ck", width: 100, align: "center",sortable: true },
          { title: "售票时间", key: "spsj", width: 150, align: "center",sortable: true },
          {
            title: '操作',
            width: 150,
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
        taskListDataList: [
          {
            xm:'张某',
            zjlx:'身份证',
            zjbh:610114197708157312,
            ccrq:'2017-12-1',
            ccsj:'05:25',
            ph:'T1',
            cc:'T123',
            fz:'西安',
            dz:'成都',
            cxh:11,
            xb:'上铺',
            zwh:'A1',
            pz:'',
            pj:'',
            spc:'',
            ck:'',
            spsj:'2017-11-15'
          },
          {
            xm:'李某',
            zjlx:'身份证',
            zjbh:610114198707201474,
            ccrq:'2017-11-12',
            ccsj:'09:30',
            ph:'T2',
            cc:'T321',
            fz:'成都',
            dz:'西安',
            cxh:18,
            xb:'硬座',
            zwh:'A1',
            pz:'',
            pj:'',
            spc:'',
            ck:'',
            spsj:'2017-10-12'
          },
                              {
            xm:'王某',
            zjlx:'身份证',
            zjbh:610114197708157312,
            ccrq:'2017-12-1',
            ccsj:'05:25',
            ph:'T1',
            cc:'T123',
            fz:'西安',
            dz:'成都',
            cxh:11,
            xb:'上铺',
            zwh:'A1',
            pz:'',
            pj:'',
            spc:'',
            ck:'',
            spsj:'2017-11-15'
          },
          {
            xm:'刘某',
            zjlx:'身份证',
            zjbh:610114197708157312,
            ccrq:'2017-12-1',
            ccsj:'05:25',
            ph:'T1',
            cc:'T123',
            fz:'西安',
            dz:'成都',
            cxh:11,
            xb:'上铺',
            zwh:'A1',
            pz:'',
            pj:'',
            spc:'',
            ck:'',
            spsj:'2017-11-15'
          },          
        ]//table里的数据，异步获取列表信息
      }  
    },
    methods:{
      //列表请求
      // async getListData(sendData) {
      //     this.loading = true;
      //     await getTaskListDataList(sendData)
      //     .then(res => {
      //         this.loading = false;
      //         this.taskListDataList = res.data.content;
      //         console.log(this.taskListDataList);
      //         this.searchData.page.totalElements = res.data.totalElements;
      //     })
      // },
      // //分页请求
      // pageChangeFn(page) {
      //     this.searchData['page']['pageNumber'] = page.pageNumber;
      //     this.searchData['page']['size'] = page.size;
      //     this.getListData(this.searchData)
      // },
      // //查询
      // searchFn() {
      //     let aj = this.searchData['aj'];
      //     let rwmc = this.searchData['rwmc'];
      //     let lb = this.searchData['lb'];
      //     this.searchData.page.pageNumber = 1;
      //     if (aj || rwmc || lb) {
      //       this.getListData(this.searchData);
      //     } else {
      //       this.$Message.warning('请输入查询内容!')
      //     }
      // },
      // //重置查询
      // handleResetFn() {
      //     this.clearSearchInfo();
      //     this.getListData(this.searchData);
      // },
      // //清空查询
      // clearSearchInfo() {
      //     this.searchData['aj'] = '';
      //     this.searchData['rwmc'] = '';
      //     this.searchData['lb'] = '';
      // },
      // chooseAj(obj) {
      //   this.searchData.aj = obj.value;
      //   this.searchData.ajName = obj.label;
      // },
      //列表行删除
      async delData(id) {
          this.clearSearchInfo();
          await deleteTaskListData(id)
          .then(res => {
              if (res.statusCode !== 200) return process_error(res);
                  this.$Message.success(res.message);
                  this.getListData(this.searchData)
              }).catch(err => {
                  this.$Message.error(err.message)
          })
      },
      //列表行删除
      delRowData(id) {
          this.$Modal.confirm({
              title: '删除操作',
              content: '<p>您确定要删除这条操作记录吗？</p>',
              onOk: () => {
                  this.delData(id);
              }
          });
      },
      //列表行查看
      // async watchData(id) {
      //     this.clearSearchInfo();
      //     await watchSaleInfo(id)
      //     .then(res => {
      //         if (res.statusCode !== 200) return process_error(res);
      //             this.$Message.success(res.message);
      //             this.getListData(this.searchData)
      //         }).catch(err => {
      //             this.$Message.error(err.message)
      //     })
      // },
      //列表查看
      showRowData(id){
          this.watchData(id);
      },
      async sortClick(column) {
          if (column.order != 'normal') {
              this.searchData.page.sort = (column.key + "," + column.order);
          }
              this.getListData(this.searchData);
      },
      //批量删除，暂未写
      deleteAllFn(){
          console.log(1)
      }
    },
    created(){
      this.chooseAj();
    },
    mounted() {
      this.getListData(this.searchData);
    }  
  };
</script>

<style scoped >

</style>
