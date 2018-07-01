<template>
  <div class="vue-body">
    <!-- 面包屑 -->
    <Breadcrumb class="router-box">
        <BreadcrumbItem to="/index">首页</BreadcrumbItem>
        <BreadcrumbItem to="ComprehensiveQuery?condition=2">综合查询</BreadcrumbItem>
        <BreadcrumbItem>清洗配置信息</BreadcrumbItem>
    </Breadcrumb>
    <!-- 查询条件 -->
    <Form :model="searchData" ref="searchForm" class="header-from">
      <FormItem class="form-item">
        <Row :gutter="16">
          <Col span="1" class="col-label">清洗规则</Col>
          <Col span="4">
            <Input v-model="searchData.rule" placeholder="请输入规则" clearable></Input>
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
      <Table :row-class-name="rowClassName"  height="520" :loading="loading" :columns="columns"  :data="cleanConfigDataList"
             @on-sort-change="sortClick" @on-selection-change="selectionClick"  size="small"></Table>
      <Paging class="table-page" :pages="searchData.page" @pageChange="pageChangeFn"></Paging>
    </div>
    <!-- 新增 -->
    <Modal v-model="addModal" width="800" @on-cancel="coloseModal('addForm')">
      <p slot="header">
        <Icon class="titleColor" v-if="toggleAdd===1" type="plus-round"></Icon>
        <Icon class="titleColor" v-else-if="toggleAdd===2" type="wrench"></Icon>
        <Icon class="titleColor" v-else type="ios-eye"></Icon>
        <span class="titleColor" v-if="toggleAdd===1">新增配置信息</span>
        <span class="titleColor" v-else-if="toggleAdd===2">修改配置信息</span>
        <span class="titleColor" v-else>查看配置信息</span>
      </p>
      <Form :model="addInfo" ref="addForm" :rules="ruleValidate">
        <Row>
          <Col span="12">
            <FormItem label="下标" :label-width=75 prop="filedindex">
              <InputNumber :min="1" v-model="addInfo.filedindex"  style="width: 90%"/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="清洗规则" :label-width=75 prop="rule">
              <Input v-model="addInfo.rule" placeholder="请输入清洗规则"/>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="类型" :label-width=75 prop="filedtype">
              <Input v-model="addInfo.filedtype" placeholder="请输入类型"/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="注释" :label-width=75 prop="filedname">
              <Input v-model="addInfo.filedname" placeholder="请输入注释"/>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="名称" :label-width=75 prop="filed">
              <Input v-model="addInfo.filed" placeholder="请输入名称"/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="源数据类型" :label-width=75 prop="datatype">
              <Input v-model="addInfo.datatype" placeholder="请输入源数据类型"/>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="是否符合格式" :label-width=90 prop="isconformingformat">
              <Input v-model="addInfo.isconformingformat" placeholder="请输入是否符合格式"/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="数据源表" :label-width=75 prop="sourceid">
              <Select v-model="addInfo.sourceid" placeholder="请选择" @on-change="chooseSource" label-in-value>
                <Option v-for="item in sourceList" :value="item.key" :key="item.key">{{item.value}}</Option>
              </Select>
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
    import {getCleanConfigList,saveCleanConfig,deleteCleanConfig,getConfigDataSource,getCleanConfigByid,isdateSwitch} from '@/service/getData';//异步请求链接
    import Paging from '@/components/common/tools/paging';//分页
    import expandRow from '@/components/systemManagement/operation/OperationExpand-row';//分页
    import {process_error} from '@/config/process_request_conf' //请求成功返回的状态
    export default {
      name: 'CleanConfig',
      components: {Paging, expandRow},
      data () {
        return {
          isTrue:false,
          flag:true,
          toggleAdd: true,//v-if 新增时添加或编辑图标切换
          addModal: false,//v-model 新增弹出框开启或关闭
          loading: false, //布尔值判断 用于异步请求的样式
          sourceList:[],//数据源表list
          ids:[],
          isdateFlag:"0",
          searchData: {//查询条件
            page: {//翻页相关
              totalElements: 0,
              size: 10,//一页10行
              pageNumber: 1,//第一页
              sort: "id,desc"//排序，按最后修改时间和降序
            },
            rule: ''
          },
          addInfo: {//新增弹窗的表单及其需要新增的条件
            //createUID: '1545', //登录用户ID
            filedindex: null,
            rule: '',
            filedtype:"",
            filedname:"",
            datatype:"",
            isdate:"",
            filed:"",
            sourceid:"",
            isconformingformat:""
          },
          ruleValidate: {
            sourceid:[
              { required: true, message: "数据源表不能为空"}
            ],
            filedindex:[
              {required:true,message:"下标不能为空"}
            ],
            rule:[
              {required:true,message:"清洗规则不能为空",trigger: "blur"}
            ],
            filed:[
              {required:true,message:"名称不能为空",trigger: "blur"}
            ]
          },
          columns: [
            {title:'序号',type: 'selection',width: 60},
            {title:'下标',width: 200,align: 'center',key:'filedindex',sortable: true},
            {title:'清洗规则',width: 200,align: 'center',key:'rule',sortable: true},
            {title:'注释',width: 200,align: 'center',key:'filedname',sortable: true},
            {title:'数据源来源',width: 200,align: 'center',key:'datatype',sortable: true},
            { title: '数据日期', key: 'isdate',width: 150, align: 'center',
              render: (h, params) => {
                var _this=this
                return h('div', [
                  h('i-switch', { //数据库1是已处理，0是未处理
                      props: {
                        type: 'primary',
                        size: 'large',
                        value: params.row.isdate === "1", //控制开关的打开或关闭状态，官网文档属性是value
                        disabled:_this.isTrue
                      },
                      class:{
                        switchBtn:true
                      },
                      style:{
                        disabled: _this.flag
                      },
                      on: {
                        'on-change': (value) => {//触发事件是on-change,用双引号括起来，
                          //参数value是回调值，并没有使用到
                          // this.switch(params.row); //params.index是拿到table的行序列，可以取到对应的表格值
                          if(!value){
                              // console.log(value)                            
                            _this.flag=false;           
                           }else{
                            _this.flag=true;
                           }
                            if(_this.flag==true && _this.isTrue==false){
                                  _this.isTrue=!_this.isTrue
                               }   
                        }
                      }
                    }, [
                      h('span', {
                        slot: 'open',
                        domProps: {
                          innerHTML: '是'
                        }
                      }),
                      h('span', {
                        slot: 'close',
                        domProps: {
                          innerHTML: '否'
                        }
                      })
                    ]
                  )
                ]);
              }
            },
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
          cleanConfigDataList: []
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
        await getCleanConfigList(sendData)
          .then(res => {
            this.loading = false;
            this.cleanConfigDataList = res.data.content;
            // console.log(this.cleanConfigDataList);
            this.searchData.page.totalElements = res.data.totalElements;
          });
      },
      //批量删除
      async deleteAll(){
        this.clearSearchInfo();
        if(this.ids.length>0){
          await deleteCleanConfig(this.ids.join(","))
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
      async switch(data) {
        await isdateSwitch(data.id)
            .then(res => {
            this.loading = false;
            this.$Message.success(res.message);
              this.getListData(this.searchData);
          })
          .catch(err => {
            this.loading = false;
            this.$Message.error(err);
          })
      },
      //新增，编辑保存请求
      async saveAddinfo(sendData) {
        await saveCleanConfig(sendData)
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
      //查询
      searchFn() {
        let rule = this.searchData["rule"];
        this.searchData.page.pageNumber = 1;
        if (rule) {
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
        this.searchData["rule"] = "";
      },
      //新增弹窗
      async addOperationFn() {
        this.toggleAdd = 1;
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
      chooseSource(obj){
        this.addInfo.sourceid= obj.value;
      },
      //关闭弹窗
      coloseModal(name) {
        this.addModal = false;
        this.$refs[name].resetFields();
      },
      //列表编辑
      async eideRowData(id) {
        await getCleanConfigByid(id)
          .then(res =>{
            this.toggleAdd = 2;
            this.addInfo.filedindex = res.data.filedindex;
            this.addInfo.rule = res.data.rule;
            this.addInfo.filedtype = res.data.filedtype;
            this.addInfo.filedname = res.data.filedname;
            this.addInfo.datatype = res.data.datatype;
            this.addInfo.isdate = res.data.isdate;
            this.addInfo.filed = res.data.filed;
            this.addInfo.sourceid = res.data.sourceid;
            this.addInfo.isconformingformat = res.data.isconformingformat;
            this.addInfo.id = res.data.id;
            this.clearSearchInfo();
            this.addModal = true;
          })
      },
      //列表行删除
      async delData(id) {
        this.clearSearchInfo();
        await deleteCleanConfig(id)
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
      },
      async getConfigDataSource(){
        await getConfigDataSource()
          .then(res =>{
            this.sourceList = res.data;
          })
      }
    },
    mounted() {
      this.getListData(this.searchData);
      this.getConfigDataSource();
    }
  };
</script>

<style scoped >

</style>
