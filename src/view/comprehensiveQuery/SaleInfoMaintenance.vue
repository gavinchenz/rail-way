<template>
    <div class="vue-body">
        <!-- 面包屑 -->
        <Breadcrumb class="router-box">
            <BreadcrumbItem to="/index">首页</BreadcrumbItem>
            <BreadcrumbItem to="/ComprehensiveQuery?condition=2">综合查询</BreadcrumbItem>
            <BreadcrumbItem>售处信息维护</BreadcrumbItem>
        </Breadcrumb>
        <!-- 查询条件 -->
        <Form :model="searchData" class="header-from">
            <FormItem class="form-item">
                <Row :gutter="16">
                    <Col span="2" class="col-label">售处编号</Col>
                    <Col span="4">
                        <Input v-model="searchData.scbh" placeholder="请输入售处编号" clearable></Input>
                    </Col>
                    <Col span="2" class="col-label">售处名称</Col>
                    <Col span="4">
                        <Input v-model="searchData.scmc" placeholder="请输入售处名称" clearable></Input>
                    </Col>
                    <Col span="2" class="col-label">售处站名</Col>
                    <Col span="4">
                        <Input v-model="searchData.sczm" placeholder="请输入售处站名" clearable></Input>
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
        </Form>
        <!-- 表格和翻页 -->
        <div class="table-box">
            <Table :row-class-name="rowClassName"  height="520" :loading="loading" :columns="columns" :data="saleInfoList"  @on-sort-change="sortClick" @on-selection-change="selectionClick"  size="small"></Table>
            <Paging class="table-page" :pages="searchData.page" @pageChange="pageChangeFn"></Paging>
        </div>
        <!-- 新增 -->
        <Modal v-model="addModal" width="800"  @on-cancel="coloseModal('addForm')">
            <p slot="header">
                <Icon class="titleColor" v-if="toggleAdd===1" type="plus-round"></Icon>
                <Icon class="titleColor" v-else-if="toggleAdd===2" type="wrench"></Icon>
                <Icon class="titleColor" v-else type="ios-eye"></Icon>
                <span class="titleColor" v-if="toggleAdd===1">新增售处信息</span>
                <span class="titleColor" v-else-if="toggleAdd===2">修改售处信息</span>
                <span class="titleColor" v-else>查看售处信息</span>
            </p>
            <Form :model="addInfo" ref="addForm"  :rules="ruleValidate">
                <Row>
                  <Col span="12">
                    <FormItem label="售处编号" :label-width=75 prop="scbh">
                      <Input v-model="addInfo.scbh" placeholder="请输入售处编号"/>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem label="售处名称" :label-width=75 prop="scmc">
                      <Input v-model="addInfo.scmc" placeholder="请输入售处名称"/>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                    <FormItem label="售处站名" :label-width=75 prop="sczm">
                      <Input v-model="addInfo.sczm" placeholder="请输入售处站名"/>
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
    import {getSaleInfoList, saveSaleInfo, operTypenameList, deleteSaleInfo,watchSaleInfo} from '@/service/getData';//异步请求链接
    import Paging from '@/components/common/tools/paging';//分页
    import expandRow from '@/components/systemManagement/operation/OperationExpand-row';//分页
    import {process_error} from '@/config/process_request_conf' //请求成功返回的状态
    import {idCard} from '@/components/common/validateFun';//校验
    export default {
        name: 'SaleInfoMaintenance',
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
                  scbh: '',
                  scmc: '',
                  sczm: ''
                },
                addInfo: {//新增弹窗的表单及其需要新增的条件
                  //createUID: '1545', //登录用户ID
                  scbh: '',
                  scmc: '',
                  sczm: '',
                },
              ruleValidate:{//新增弹窗表单addInfo的验证规则
                scbh: [
                  { required: true, message: "售处编号不能为空", trigger: "blur" }
                ],
                scmc: [
                  { required: true, message: "售处名称不能为空", trigger: "blur" }
                ],
                sczm: [
                  { required: true, message: "售处站名不能为空", trigger: "blur" }
                ]
              },
                columns: [
                    {title:'序号', type:'selection', width: 60, align: 'center'},
                    {title:'售处编号', width:200, align:'center',key:'scbh',sortable: true},
                    {title:'售处名称', width:200, align:'center',key:'scmc',sortable: true},
                    {title:'售处站名', width:200, align:'center',key:'sczm',sortable: true},
                    {
                        title: '操作',
                        width: 200,
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
                saleInfoList: []//table里的数据，异步获取列表信息
            }
        },
        methods:{
          rowClassName(row) {
            return 'demo-table-info-row';
          },
            //列表请求
            async getListData(sendData) {
                this.loading = true;
                await getSaleInfoList(sendData)
                .then(res => {
                    this.loading = false;
                    this.saleInfoList = res.data.content;
                    console.log(this.saleInfoList);
                    this.searchData.page.totalElements = res.data.totalElements;
                })
            },
            //新增，编辑保存请求
            async saveAddinfo(sendData) {
                await saveSaleInfo(sendData)
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
          selectionClick(arr){
              this.ids = [];
              for(var i in arr){
                this.ids.push(arr[i].id);
              }
          },
            //查询
            searchFn() {
                let scbh = this.searchData['scbh'];
                let scmc = this.searchData['scmc'];
                let sczm = this.searchData['sczm'];
                this.searchData.page.pageNumber = 1;
                if (scbh || scmc || sczm) {
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
                this.searchData['scbh'] = '';
                this.searchData['scmc'] = '';
                this.searchData['sczm'] = '';
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
                this.addInfo.scbh = data.scbh;
                this.addInfo.scmc = data.scmc;
                this.addInfo.sczm = data.sczm;
                this.addInfo.id = data.id;
                this.clearSearchInfo();
                this.addModal = true;
            },
          //批量删除
          async deleteAll(){
            this.clearSearchInfo();
            if(this.ids.length>0){
              await deleteSaleInfo(this.ids.join(","))
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
            //列表行删除
            async delData(id) {
                this.clearSearchInfo();
                await deleteSaleInfo(id)
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
            async showRowData(id) {
                this.clearSearchInfo();
                await watchSaleInfo(id)
                .then(res => {
                    if (res.statusCode !== 200) return process_error(res);
                        this.$Message.success(res.message);
                        this.getListData(this.searchData)
                    }).catch(err => {
                        this.$Message.error(err.message)
                })
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
        mounted() {
          this.getListData(this.searchData);
        }
    };
</script>

<style scoped >

</style>
