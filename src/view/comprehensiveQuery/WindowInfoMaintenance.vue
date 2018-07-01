<template>
    <div class="vue-body">
        <!-- 面包屑 -->
        <Breadcrumb class="router-box">
            <BreadcrumbItem to="/index">首页</BreadcrumbItem>
            <BreadcrumbItem to="/ComprehensiveQuery?condition=2">综合查询</BreadcrumbItem>
            <BreadcrumbItem>窗口信息维护</BreadcrumbItem>
        </Breadcrumb>
        <!-- 查询条件 -->
        <Form :model="searchData" class="header-from">
            <FormItem class="form-item">
                <Row :gutter="16">
                    <Col span="2" class="col-label">售处站名</Col>
                    <Col span="4">
                      <Select v-model="searchData.scZm" placeholder="请选择" style="width:280px">
                        <Option v-for="item in sczmList" :value="item.key" :key="item.key">{{item.value}}</Option>
                      </Select>
                    </Col>
                    <Col span="2" class="col-label" style="marginLeft:30px">售处名称</Col>
                    <Col span="4">
                      <Select v-model="searchData.scName" placeholder="请选择" style="width:280px">
                        <Option v-for="item in scmcList" :value="item.key" :key="item.key">{{item.value}}</Option>
                      </Select>
                    </Col>
                    <Col span="2" class="col-label" style="marginLeft:30px">窗口名称</Col>
                    <Col span="4">
                        <Input v-model="searchData.windowName" placeholder="请输入窗口名称" clearable></Input>
                    </Col>
                    <Col span="2" class="col-label">
                        <Button type="primary" icon="ios-search" @click="searchFn" >查询</Button>
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
                            <Button class="btn" type="success" icon="plus-round" @click="addOperationFn">新增</Button>
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
            <FormItem class="form-item">
                <Row>
                    <Col span="2" style="text-align: right">
                        <FormItem>
                            <Button class="btn" type="info" icon="earth">地图展示</Button><!-- 方法暂没写 -->
                        </FormItem>
                    </Col>
                </Row>
            </FormItem>
        </Form>
        <!-- 表格和翻页 -->
        <div class="table-box">
            <Table :row-class-name="rowClassName"  height="520" :loading="loading" :columns="columns" :data="windowInfoList" @on-sort-change="sortClick" @on-selection-change="selectionClick"  size="small"></Table>
            <Paging class="table-page" :pages="searchData.page" @pageChange="pageChangeFn"></Paging>
        </div>
        <!-- 新增 -->
        <Modal v-model="addModal" width="800" @on-cancel="coloseModal('addForm')">
            <p slot="header">
                <Icon class="titleColor" v-if="toggleAdd===1" type="plus-round"></Icon>
                <Icon class="titleColor" v-else-if="toggleAdd===2" type="wrench"></Icon>
                <Icon class="titleColor" v-else type="ios-eye"></Icon>
                <span class="titleColor" v-if="toggleAdd===1">新增窗口信息</span>
                <span class="titleColor" v-else-if="toggleAdd===2">修改窗口信息</span>
                <span class="titleColor" v-else>查看窗口信息</span>
            </p>
            <Form :model="addInfo" ref="addForm" :rules="ruleValidate">
                <Row>
                    <Col span="12">
                        <FormItem label="售处站名" :label-width=95 prop="scZm">
                            <Select v-model="addInfo.scZm" placeholder="请选择" style="width:280px" @on-change="chooseSczm"  label-in-value>
                                <Option v-for="item in sczmList" :value="item.key" :key="item.key">{{item.value}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="售处名称" :label-width=75 prop="scName">
                          <Select v-model="addInfo.scName" placeholder="请选择" style="width:280px" @on-change="chooseScname"  label-in-value>
                            <Option v-for="item in scmcList" :value="item.key" :key="item.key">{{item.value}}</Option>
                          </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="窗口编号" :label-width=75 prop="windowNumber">
                            <Input v-model="addInfo.windowNumber" placeholder="请输入窗口编号"/>
                        </FormItem>
                    </Col>
                  <Col span="12">
                        <FormItem label="窗口名称" :label-width=75 prop="windowName">
                            <Input v-model="addInfo.windowName" placeholder="请输入窗口名称"/>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="经度" :label-width=75 prop="lon">
                            <Input v-model="addInfo.lon" placeholder="请输入经度"/>
                        </FormItem>
                    </Col>
                  <Col span="12">
                        <FormItem label="纬度" :label-width=75 prop="lat">
                            <Input v-model="addInfo.lat" placeholder="请输入纬度"/>
                        </FormItem>
                    </Col>
                </Row>
              <Row>
                <Col span="12">
                  <FormItem label="工作开始时间" :label-width=84 prop="workingStart">
                    <TimePicker type="time" placeholder="选择时间" v-model="addInfo.workingStart" format="HH:mm" style="width: 290px"></TimePicker>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="工作结束时间" :label-width=84 prop="workingEnd">
                    <TimePicker type="time" placeholder="选择时间" v-model="addInfo.workingEnd" format="HH:mm" style="width: 290px"></TimePicker>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem label="详细地址" :label-width=75 prop="address">
                    <Input  v-model="addInfo.address" placeholder="请输入地址"/>
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
    import {getWindowInfoList, saveWindowInfo, operTypenameList, deleteWindowInfo,watchWindowInfo,getScZmAndNameResult} from '@/service/getData';//异步请求链接
    import Paging from '@/components/common/tools/paging';//分页
    import expandRow from '@/components/systemManagement/operation/OperationExpand-row';//分页
    import {process_error} from '@/config/process_request_conf' //请求成功返回的状态
    import {idCard} from '@/components/common/validateFun';//校验
    export default {
        name: 'WindowInfoMaintenance',
        components: {Paging, expandRow},
        data () {
            return {
                toggleAdd: null,//v-if 新增时添加或编辑或查看图标切换,1新增,2编辑,3查看
                addModal: false,//v-model 新增弹出框开启或关闭
                loading: false, //布尔值判断 用于异步请求的样式
              ids:[],
              searchData: {//查询条件
                    page: {//翻页相关
                        totalElements: 0,
                        size: 10,//一页10行
                        pageNumber: 1,//第一页
                        sort: "lastModifyTime,desc"//排序，按最后修改时间和降序
                    },
                    scZm: '',
                  scName: '',
                  windowName: ''
                },
              //售处站名list
                sczmList: [],
              //售处名称list
              scmcList: [],
                addInfo: {//新增弹窗的表单及其需要新增的条件
                  //createUID: '1545', //登录用户ID
                    scZm:'',
                    scName:'',
                  windowNumber:'',
                  windowName:'',
                    lon:'',
                    lat:'',
                  address:'',
                  workingStart:'',
                  workingEnd:''
                },
              ruleValidate:{//新增弹窗表单addInfo的验证规则
                scZm: [
                  { required: true ,message: "售处站名不能为空"}
                ],
                scName: [
                  { required: true,message: "售处名称不能为空"}
                ],
                windowNumber: [
                  { required: true, message: "窗口编号不能为空", trigger: "blur" }
                ],
                windowName:[
                  {required:true, message:"窗口名称不能为空",trigger:"blur"}
                ]
              },
                columns: [
                    {title:'序号', type:'selection', width: 60, align: 'center',fixed: 'left'},
                    {title:'售处站名', width:150, align:'center',key:'scZm',sortable: true,render: (h, params) => {
                      return h("div",this.getSczmObjById(params.row.scZm));
                      }},
                    {title:'售处名称', width:150, align:'center',key:'scName',sortable: true,render: (h, params) => {
                        return h("div",this.getScmcObjById(params.row.scName));
                      }},
                    {title:'窗口编号', width:150, align:'center',key:'windowNumber',sortable: true},
                    {title:'窗口名称', width:150, align:'center',key:'windowName',sortable: true},
                  {title:'工作开始时间', width:150, align:'center',key:'workingStart',sortable: true},
                  {title:'工作结束时间', width:150, align:'center',key:'workingEnd',sortable: true},
                    {title:'经度', width:150, align:'center',key:'lon',sortable: true},
                    {title:'纬度', width:150, align:'center',key:'lat',sortable: true},
                    {title:'详细地址', width:300, align:'center',key:'address',sortable: true},
                    {
                        title: '操作',
                        width: 200,
                        fixed: 'right',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                    h ('Button', {
                                            props: {
                                                type: "success",
                                                size: 'small'
                                            },
                                            attrs: {title: "编辑"},
                                            style: {
                                                 marginRight: '5px'
                                            },
                                            on: {click: () => {
                                                    this.eideRowData(params.row)//编辑列表
                                                    }
                                                }
                                        },'编辑'
                                    ),
                                    h ('Button', {
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
                                    h ('Button', {
                                            props: {
                                                type: "error",
                                                size: 'small'
                                            },
                                            attrs: {title: "删除"},
                                            style: {
                                                marginRight: '5px'
                                            },
                                            on: {click: () => {
                                                    this.delRowData(params.row.id)//删除整列
                                                    }
                                                }
                                        },'删除'
                                    )
                                ]
                            );
                        }
                    }
                ],
                windowInfoList: []//table里的数据，异步获取列表信息
            }
        },
        methods:{
          rowClassName(row) {
            return 'demo-table-info-row';
          },
            //列表请求
            async getListData(sendData) {
                this.loading = true;
                await getWindowInfoList(sendData)
                .then(res => {
                    this.loading = false;
                    this.windowInfoList = res.data.content;
                    console.log(this.windowInfoList);
                    this.searchData.page.totalElements = res.data.totalElements;
                })
            },
          async getScZmAndNameResult(){
              await getScZmAndNameResult()
                .then(res =>{
                  this.sczmList = res.data.sczmList;
                  this.scmcList = res.data.scmcList;
                })
          },
            //新增，编辑保存请求
            async saveAddinfo(sendData) {
                await saveWindowInfo(sendData)
                .then(res => {
                    this.$Message.success(res.message);
                    this.getListData(this.searchData);
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
                let scZm = this.searchData['scZm'];
                let scName = this.searchData['scName'];
                let windowName = this.searchData['windowName'];
                this.searchData.page.pageNumber = 1;
                if (scZm || scName || windowName) {
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
                this.searchData['scZm'] = '';
                this.searchData['scName'] = '';
                this.searchData['windowName'] = '';
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
                         this.toggleAdd = null;
                    } else {
                        this.$Message.error('请在补充表单字段后再做提交操作');
                    }
                });
            },
            //关闭弹窗
            coloseModal(name) {
                this.addModal = false;
                this.$refs[name].resetFields();///？？？
            },
            //列表编辑
            eideRowData(data) {
                this.toggleAdd = 2;
                this.addInfo.createUID = data.createUID;
                this.addInfo.scZm = data.scZm;
                this.addInfo.scName = data.scName;
                this.addInfo.windowNumber = data.windowNumber;
                this.addInfo.windowName = data.windowName;
                this.addInfo.lon = data.lon;
                this.addInfo.lat = data.lat;
                this.addInfo.address = data.address;
                this.addInfo.id = data.id;
              this.addInfo.workingStart = data.workingStart;
                this.addInfo.workingEnd = data.workingEnd;
                this.clearSearchInfo();
                this.addModal = true;
            },
            //列表行删除
            async delData(id) {
                this.clearSearchInfo();
                await deleteWindowInfo(id)
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
          selectionClick(arr){
            this.ids = [];
            for(var i in arr){
              this.ids.push(arr[i].id);
            }
          },
          //批量删除
          async deleteAll(){
            this.clearSearchInfo();
            if(this.ids.length>0){
              await deleteWindowInfo(this.ids.join(","))
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
            //列表行查看
            async watchData(id) {
                this.clearSearchInfo();
                await watchWindowInfo(id)
                .then(res => {
                    if (res.statusCode !== 200) return process_error(res);
                        this.$Message.success(res.message);
                        this.getListData(this.searchData)
                    }).catch(err => {
                        this.$Message.error(err.message)
                })
            },
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
            //新增弹窗-售处站名-选择项，后期要异步获取
            chooseSczm(obj){
                this.addInfo.scZm= obj.value;
            },
          chooseScname(obj){
            this.addInfo.scName= obj.value;
          },
            //批量删除
            deleteAllFn(){
                console.log(1)
            },
          //循环遍历 通过id获得对应的名称
          getSczmObjById(o) {
            let name = "";
            if (o != "") {
              this.sczmList.filter(function(e) {
                if (o === e.key) {
                  name = e.value;
                }
              });
            }
            return name;
          },

          getScmcObjById(o) {
            let name = "";
            if (o != "") {
              this.scmcList.filter(function(e) {
                if (o === e.key) {
                  name = e.value;
                }
              });
            }
            return name;
          }

        },
        mounted() {
          this.getListData(this.searchData);
          this.getScZmAndNameResult();
        }
    };
</script>


<style scoped >

</style>
