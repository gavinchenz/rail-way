<template>
   <div class="vue-body">
    <!-- 面包屑 -->
    <Breadcrumb class="router-box">
        <BreadcrumbItem to="/index">首页</BreadcrumbItem>
        <BreadcrumbItem to="/ComprehensiveQuery?condition=2">综合查询</BreadcrumbItem>
        <BreadcrumbItem>全国站点信息</BreadcrumbItem>
    </Breadcrumb>
    <!-- 查询条件 -->
    <Form :model="searchData" class="header-from">s
        <FormItem class="form-item">
            <Row :gutter="16">
                <Col span="2" class="col-label">所属局</Col>
                <Col span="4">
                    <Input v-model="searchData.stationdepartment" placeholder="请输入所属局" clearable></Input>
                </Col>
                <Col span="1" class="col-label">站名</Col>
                <Col span="4">
                    <Input v-model="searchData.stationname" placeholder="请输入站名" clearable></Input>
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
    </Form>
    <!-- 表格和翻页 -->
    <div class="table-box">
        <Table :row-class-name="rowClassName"  height="520" :loading="loading" :columns="columns" :data="nationalSiteInfoList" @on-sort-change="sortClick" @on-selection-change="selectionClick" size="small"></Table>
        <Paging class="table-page" :pages="searchData.page" @pageChange="pageChangeFn"></Paging>
    </div>
    <!-- 新增 -->
    <Modal v-model="addModal" width="800" @on-cancel="coloseModal('addForm')">
        <p slot="header">
            <Icon class="titleColor" v-if="toggleAdd" type="plus-round"></Icon>
            <Icon class="titleColor" v-else type="wrench"></Icon>
            <span class="titleColor" v-if="toggleAdd">新增站点信息</span>
            <span class="titleColor" v-else>修改站点信息</span>
        </p>
        <Form :model="addInfo" ref="addForm" :rules="ruleValidate">
            <Row>
              <Col span="12">
                <FormItem label="所属局" :label-width=75 prop="stationdepartment">
                  <Input v-model="addInfo.stationdepartment" placeholder="请输入所属局"/>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="站名" :label-width=75 prop="stationname">
                  <Input v-model="addInfo.stationname" placeholder="请输入站名"/>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem label="省" :label-width=75 prop="province">
                  <Input v-model="addInfo.province" placeholder="请输入省"/>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="市" :label-width=75 prop="city">
                  <Input v-model="addInfo.city" placeholder="请输入市"/>
                </FormItem>
              </Col>
            </Row>
          <Row>
            <Col span="12">
              <FormItem label="区县" :label-width=75 prop="area">
                <Input v-model="addInfo.area" placeholder="请输入区县"/>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="地址" :label-width=75 prop="stationaddr">
                <Input v-model="addInfo.stationaddr" placeholder="请输入站名"/>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="地区编号" :label-width=75 prop="areacode">
                <Input v-model="addInfo.areacode" placeholder="请输入地区编号"/>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="电话区号" :label-width=75 prop="phonecode">
                <Input v-model="addInfo.phonecode" placeholder="请输入电话区号"/>
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
                <FormItem label="所属处" :label-width=75 prop="stationchu">
                  <Input v-model="addInfo.stationchu" placeholder="请输入所属处"/>
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
    import {getNationalSiteInfoList, saveNationalSiteInfo, operTypenameList, deleteNationalSiteInfo,watchNationalSiteInfo} from '@/service/getData';//异步请求链接
    import Paging from '@/components/common/tools/paging';//分页
    import expandRow from '@/components/systemManagement/operation/OperationExpand-row';//分页
    import {process_error} from '@/config/process_request_conf' //请求成功返回的状态
    import {idCard} from '@/components/common/validateFun';//校验
    export default {
        name: 'NationalSiteInformation',
        components: {Paging, expandRow},
        data () {
            return {
                toggleAdd: true,//v-if 新增时添加或编辑图标切换,true新增,false编辑
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
                  stationdepartment: '',
                  stationname: ''
                },
                addInfo: {//新增弹窗的表单及其需要新增的条件
                  //createUID: '1545', //登录用户ID
                  stationdepartment: '',
                  stationname: '',
                  stationaddr:'',
                  province:'',
                  city:'',
                  area:'',
                  areacode:'',
                  phonecode:'',
                  lon:'',
                  lat:'',
                  stationchu:''
                },
              ruleValidate:{//新增弹窗表单addInfo的验证规则
                stationdepartment: [
                  { required: true, message: "所属局不能为空", trigger: "blur" }
                ],
                stationname: [
                  { required: true, message: "站名不能为空", trigger: "blur" }
                ]
              },
                columns: [
                    {title:'序号', type:'selection', width: 60, align: 'center',fixed: 'left'},
                    {title:'所属局', width:200, align:'center',key:'stationdepartment',sortable: true},
                    {title:'站名', width:200, align:'center',key:'stationname',sortable: true},
                    {title:'省', width:150, align:'center',key:'province',sortable: true},
                    {title:'市', width:150, align:'center',key:'city',sortable: true},
                    {title:'区县', width:150, align:'center',key:'area',sortable: true},
                    {title:'地址', width:300, align:'center',key:'stationaddr',sortable: true},
                    {title:'地区编号', width:150, align:'center',key:'areacode',sortable: true},
                    {title:'电话区号', width:150, align:'center',key:'phonecode',sortable: true},
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
                                            attrs: {title: "修改"},
                                            style: {
                                                 marginRight: '5px'
                                            },
                                            on: {click: () => {
                                                    this.eideRowData(params.row)//修改列表
                                                    }
                                                }
                                        },'修改'
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
                nationalSiteInfoList: []//table里的数据，异步获取列表信息
            }
        },
        methods:{
          rowClassName(row) {
            return 'demo-table-info-row';
          },
            //列表请求
            async getListData(sendData) {
                this.loading = true;
                await getNationalSiteInfoList(sendData)
                .then(res => {
                    this.loading = false;
                    this.nationalSiteInfoList = res.data.content;
                    console.log(this.nationalSiteInfoList);
                    this.searchData.page.totalElements = res.data.totalElements;
                })
            },
            //新增，编辑保存请求
            async saveAddinfo(sendData) {
                await saveNationalSiteInfo(sendData)
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
                let SubBureau = this.searchData['stationdepartment'];
                let StationName = this.searchData['stationname'];
                this.searchData.page.pageNumber = 1;
                if (SubBureau || StationName ) {
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
                this.searchData['stationdepartment'] = '';
                this.searchData['stationname'] = '';
            },
            //新增弹窗
            async addOperationFn() {
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
                this.toggleAdd = false;
                this.addInfo.createUID = data.createUID;
                this.addInfo.stationdepartment = data.stationdepartment;
                this.addInfo.stationname = data.stationname;
                this.addInfo.stationaddr = data.stationaddr;
                this.addInfo.province = data.province;
                this.addInfo.city = data.city;
                this.addInfo.area = data.area;
                this.addInfo.areacode = data.areacode;
                this.addInfo.phonecode = data.phonecode;
                this.addInfo.lon = data.lon;
                this.addInfo.lat = data.lat;
                this.addInfo.stationchu = data.stationchu;
                this.addInfo.id = data.id;
                this.clearSearchInfo();
                this.addModal = true;
            },
            //列表行删除
            async delData(id) {
                this.clearSearchInfo();
                await deleteNationalSiteInfo(id)
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
            async watchData(id) {
                this.clearSearchInfo();
                await watchNationalSiteInfo(id)
                .then(res => {
                    if (res.statusCode !== 200) return process_error(res);
                        this.$Message.success(res.message);
                        this.getListData(this.searchData)
                    }).catch(err => {
                        this.$Message.error(err.message)
                })
            },
          //批量删除
          async deleteAll(){
            this.clearSearchInfo();
            if(this.ids.length>0){
              await deleteNationalSiteInfo(this.ids.join(","))
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
        },
        mounted() {
          this.getListData(this.searchData);
        }
    };
</script>

<style scoped >

</style>
