<template>
  <div class="operationBox">
    <Form :model="searchData" ref="searchForm" inline>
      <Row :gutter="5">
        <Col span="4">
        <FormItem label="操作名称" :label-width="70">
          <Input v-model="searchData.oname" placeholder="请输入操作名称" size="small"/>
        </FormItem>
        </Col>
        <Col span="4">
        <FormItem label="操作组" :label-width="70">
          <Input v-model="searchData.typeName" placeholder="请输入操作组" size="small"/>
        </FormItem>
        </Col>
        <Col span="4">
        <FormItem label="操作编码" :label-width="70">
          <Input v-model="searchData.ocode" placeholder="请输入操作编码" size="small"/>
        </FormItem>
        </Col>
        <Col span="4">
        <FormItem>
          <Button type="primary" icon="search" size="small" @click="searchFn">查询</Button>
          <Button type="ghost" icon="refresh" size="small" @click="handleResetFn" style="margin-left: 10px;">重置</Button>
        </FormItem>
        </Col>
        <Col span="6">
        <FormItem>
        </FormItem>
        </Col>
        <Col span="2" style="text-align: right">
        <FormItem>
          <Button type="success" icon="plus-round" @click="addOperationFn" size="small" :disabled="!$store.state.auth.has('1-1-1-11')">新增</Button>
        </FormItem>
        </Col>
      </Row>
    </Form>
    <br>
    <Row>
      <Col>
      <Table :loading="loading" height="520" :columns="columns" :data="operationList" stripe size="small" @on-sort-change="sortClick"></Table>
      </Col>
      <Col>
      <Paging :pages="searchData.page" @pageChange="pageChangeFn"></Paging>
      </Col>
    </Row>
    <Modal v-model="addModal" width="500" @on-cancel="coloseModal('addForm')">
      <p slot="header">
          <Icon class="titleColor" v-if="toggleAdd" type="plus-round"></Icon>
          <Icon class="titleColor" v-else type="edit"></Icon>
          <span class="titleColor" v-if="toggleAdd">新增操作项</span>
          <span class="titleColor" v-else>编辑操作项</span>
      </p>
      <Form :model="addInfo" ref="addForm" :rules="ruleValidate">
        <Row type="flex" justify="center">
          <Col span="20">
          <FormItem label="操作名称" :label-width=75 prop="oname">
            <Input v-model="addInfo.oname" placeholder="请输入操作名称"/>
          </FormItem>
          <FormItem label="操作描述" :label-width=75 prop="odesc">
            <Input v-model="addInfo.odesc" placeholder="请输入操作描述"/>
          </FormItem>
          <FormItem label="操作编码" :label-width=75 prop="ocode">
            <Input v-model="addInfo.ocode" placeholder="请输入操作编码" style="width: 150px" />&nbsp;
            <Tooltip placement="top-start">
              <span class="helpIcon"><Icon type="help" style="color: #fff"></Icon></span>
              <div slot="content">
                <p>格式</p>
                <p>案件：例 0-1-1 以0开头</p>
                <p>用户：例 1-1-1 以1开头</p>
              </div>
            </Tooltip>
          </FormItem>
          <FormItem label="操作URL" :label-width=75 prop="ourl">
            <Input v-model="addInfo.ourl" placeholder="请输入操作URL"/>
          </FormItem>
          <FormItem label="操作组" :label-width=75 prop="typeName">
            <AutoComplete v-model="addInfo.typeName" :data="typeNameList" placeholder="请输入操作组" style="width:150px;"></AutoComplete>
            &nbsp;<Tooltip placement="top-start" content="按操作所属业务系统分组">
              <span class="helpIcon"><Icon type="help" style="color: #fff"></Icon></span>
            </Tooltip>
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
  import {getOperList, saveOperate, operTypenameList, deleteOperate} from '@/service/getData';//一部请求链接
  import Paging from '@/components/common/tools/paging';//分页
  import expandRow from '@/components/userManagement/operation/OperationExpand-row';//分页
  import {process_error} from '@/config/process_request_conf' //请求成功返回的状态
  import { Ocode } from '@/components/common/validateFun';//校验
  export default {
    name: "",
    components: {Paging, expandRow},
    data() {
      return {
        toggleAdd:true,
        addModal: false,
        loading: false,
        searchData: {
          page: {
            totalElements: 0,
            size: 10,
            pageNumber: 1,
            sort: "lastModifyTime,desc"
          },
          oname: '',
          typeName: '',
          ocode: ''
        },
        typeNameList: [],
        addInfo: {
          //createUID: '1545', //登录用户ID
          oname: '',
          odesc: '',
          ocode: '',
          ourl: '',
          typeName: '',
          id: ''
        },
        ruleValidate: {
          oname: [
            {required: true, message: '请输入操作名称', trigger: 'blur'},
            {max: 10, message: '操作名称长度不能大于10个字符', trigger: 'blur'}
          ],
          odesc: [
            {required: true, message: '请输入操作描述', trigger: 'blur'},
            {max: 30, message: '操作描述长度不能大于30个字符', trigger: 'blur'}
          ],
          ocode: [
            {required: true, validator:Ocode, trigger: 'blur'},
            {max: 20, message: '操作编码长度不能大于30个字符', trigger: 'blur'}
          ],
          ourl: [
            {required: true, trigger: 'blur', message: '请输入操作URL'},
          ],
          typeName: [
            {required: true, message: '请输入或选择操作组名称', trigger: 'blur'},
            {trigger: 'change'},
            {max: 10, message: '操作组名称长度不能大于30个字符', trigger: 'blur'}
          ],
        },
        columns: [
          {
            type: 'expand', width: 30,
            render: (h, params) => {
              return h(expandRow, {
                props: {
                  row: params.row
                }
              })
            }
          },
          {title: '序号', type: 'index', width: 60, align: 'center'},
          {title: '操作名称', key: 'oname'},
          {title: '操作组', key: 'typeName'},
          {title: '操作编码', key: 'ocode'},
          {title: '操作时间', key: 'lastModifyTime',sortable: 'custom'},
          {
            title: '操作', width: 130, align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'text',
                    shape: 'circle',
                    icon: 'edit',
                  },
                  attrs:{title:"编辑"},
                  style: {
                    marginRight: '10px',
                    color: '#2d8cf0',
                    width: '23px',
                    height: '23px'
                  },
                  directives: [{
                    name: 'auth',
                    value: -1,
                    expression: '1-1-1-11'
                  }],
                  on: {
                    click: () => {
                      this.eideRowData(params.row)
                    }
                  }
                }),
                h('Button', {
                  props: {
                    type: 'text',
                    shape: 'circle',
                    icon: 'close-circled'
                  },
                  attrs:{title:"删除"},
                  style: {
                    color: '#ED3F14',
                    width: '23px',
                    height: '23px'
                  },
                  directives: [{
                    name: 'auth',
                    value: -1,
                    expression: '1-1-1-10'
                  }],
                  on: {
                    click: () => {
                      this.delRowData(params.row.id)
                    }
                  }
                })
              ]);
            }
          }
        ],
        operationList: []
      }

    },
    methods: {
      //列表请求
      async getListData(sendData) {
        this.loading = true;
        await getOperList(sendData)
          .then(res => {
            this.loading = false;
            this.operationList = res.data.content;
            this.searchData.page.totalElements = res.data.totalElements;
          })
      },
      //新增，编辑保存请求
      async saveAddinfo(sendData) {
        await saveOperate(sendData)
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
        let oname = this.searchData['oname'];
        let typeName = this.searchData['typeName'];
        let ocode = this.searchData['ocode'];
        this.searchData.page.pageNumber = 1;
        if(oname || typeName || ocode){
          this.getListData(this.searchData);
        }else {
          this.$Message.warning('请输入查询内容!')
        }
      },
      //重置查询
      handleResetFn(){
        this.clearSearchInfo();
        this.getListData(this.searchData);
      },
      //清空查询
      clearSearchInfo() {
        this.searchData['oname'] = '';
        this.searchData['typeName'] = '';
        this.searchData['ocode'] = '';
      },
      //操作组请求
      async getOperTypenameList() {
        await operTypenameList()
          .then(res => {
            this.typeNameList = res.data;
          })
      },
      //新增弹窗
      async addOperationFn() {
        this.addInfo = {};
        this.toggleAdd = true;
        this.addModal = true;
        this.clearSearchInfo();
        this.getOperTypenameList()
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
        this.$refs[name].resetFields();
      },
      //列表编辑
      eideRowData(data) {
        this.toggleAdd = false;
        this.addInfo['createUID'] = data.createUID;
        this.addInfo['oname'] = data.oname;
        this.addInfo['odesc'] = data.odesc;
        this.addInfo['ocode'] = data.ocode;
        this.addInfo['ourl'] = data.ourl;
        this.addInfo['typeName'] = data.typeName;
        this.addInfo['id'] = data.id;
        this.clearSearchInfo();
        this.getOperTypenameList();
        this.addModal = true;
      },
      //列表行删除
      async delData(id) {
        this.clearSearchInfo();
        await deleteOperate(id)
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
      async sortClick(column){
      if(column.order != 'normal'){
        this.searchData.page.sort=(column.key+","+column.order);
      }
      this.getListData(this.searchData);
    }
    },
    mounted() {
      this.getListData(this.searchData);
    }
  }
</script>
<style lang="less">
  .operationBox{
    margin-top:20px;
    .ivu-form-inline .ivu-form-item{
      margin-bottom: 0;
    }
    .titleColor{
      color: #2d5ba6;
    }
  }
  .helpIcon{
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #f90;
    text-align: center;
    line-height: 18px
  }
</style>
