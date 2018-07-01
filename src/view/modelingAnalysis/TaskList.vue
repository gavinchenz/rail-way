<template>
  <div class="vue-body">
    <Breadcrumb class="router-box">
      <BreadcrumbItem to="/index">首页</BreadcrumbItem>
      <BreadcrumbItem to="/ModelingAnalysis?condition=3">建模分析</BreadcrumbItem>
      <BreadcrumbItem>任务列表</BreadcrumbItem>
    </Breadcrumb>
    <!-- 查询条件 -->
    <Form :model="searchData" class="header-from">
    <FormItem  class="form-item" prop="aj">
        <Row :gutter="10">
          <Col span="1" class="col-label" style="textAlign:left;textIndent:5px">案件</Col>
          <Col span="4">
            <Select v-model="searchData.aj" placeholder="请选择" style="width:260px" @on-change="chooseAj" label-in-value>
              <Option v-for="item in ajList" :value="item.id" :key="item.id">{{item.hyzkname}}</Option>
            </Select>          
          </Col>
        </Row>
      </FormItem> 
      <FormItem class="form-item">
        <Row :gutter="14">
          <Col span="1" class="col-label">任务名称</Col>
          <Col span="4">
            <Input v-model="searchData.rwmc" placeholder="请输入任务名称" clearable></Input>
          </Col>
          <Col span="1" class="col-label">类别</Col>
          <Col span="4">
            <Input v-model="searchData.lb" placeholder="请输入类别" clearable></Input>
          </Col>
          <Col span="2" class="col-label">
            <Button type="primary" icon="ios-search" @click="searchFn">查询</Button>
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
                        <Button class="btn" type="warning" icon="trash-a" @click="deleteAllFn">批量删除</Button>
                    </FormItem>
                </Col>
            </Row>     
        </FormItem>    
    </Form>
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
  export default {
    name: 'TaskList',
    components: { Paging, expandRow },
    data () {
      return{
        loading: false,//布尔值判断 用于异步请求的样式
        searchData: {//查询条件
          page: {//翻页相关
            totalElements: 0,
            size: 10,//一页10行
            pageNumber: 1,//第一页
            sort: "id,desc"//排序，按最后修改时间和降序
          },
          aj: "",
          rwmc: "",
          lb: ""
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
        taskListDataList: []//table里的数据，异步获取列表信息
      }  
    },
    methods:{
      //列表请求
      async getListData(sendData) {
          this.loading = true;
          await getTaskListDataList(sendData)
          .then(res => {
              this.loading = false;
              this.taskListDataList = res.data.content;
              console.log(this.taskListDataList);
              this.searchData.page.totalElements = res.data.totalElements;
          })
      },
      //分页请求
      pageChangeFn(page) {
          this.searchData['page']['pageNumber'] = page.pageNumber;
          this.searchData['page']['size'] = page.size;
          this.getListData(this.searchData)
      },
      //查询
      searchFn() {
          let aj = this.searchData['aj'];
          let rwmc = this.searchData['rwmc'];
          let lb = this.searchData['lb'];
          this.searchData.page.pageNumber = 1;
          if (aj || rwmc || lb) {
            this.getListData(this.searchData);
          } else {
            this.$Message.warning('请输入查询内容!')
          }
      },
      //重置查询
      handleResetFn() {
          this.clearSearchInfo();
          this.getListData(this.searchData);
      },
      //清空查询
      clearSearchInfo() {
          this.searchData['aj'] = '';
          this.searchData['rwmc'] = '';
          this.searchData['lb'] = '';
      },
      chooseAj(obj) {
        this.searchData.aj = obj.value;
        this.searchData.ajName = obj.label;
      },
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
