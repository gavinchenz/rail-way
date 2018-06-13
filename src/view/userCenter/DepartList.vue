<style lang="less">
  .deparDox {
    .ivu-form-item {
      margin-bottom: 2px;
      margin-top: 10px;
    }
    .ivu-input-wrapper textarea{
      font-size: 6px
    }
    .ivu-modal-content .ivu-form-item{
      margin-bottom: 18px
    }
  }
</style>
<template >
  <div class="deparDox">
    <Row :gutter="10" justify="start" type="flex" style="flex-wrap: nowrap">
      <!--机构树-->
      <Col span="4" >
      <Card >
        <p slot="title">
          <Icon type="network"></Icon>&nbsp;机构
        </p>
        <Tree  style="height: 520px;overflow: auto" :data="treeData" :model="treeDepart" ref="treeDepart" @on-select-change="treeSelect"></Tree>
      </Card>
      </Col>
      <!--机构树-->
      <!--右边子机构管理-->
      <Col span="20">
        <!--子机构搜索-->
        <Row>
          <Col span="20">
          <Form :model="searchInfo"  ref="searchInfo" inline>
            <FormItem :label-width="50" label="名称" prop="dname">
              <Input v-model="searchInfo.dname" placeholder="输入机构名称" style="width: 140px" size="small" clearable/>
            </FormItem>
            <FormItem :label-width="50" label="描述" prop="ddesc">
              <Input v-model="searchInfo.ddesc" placeholder="输入机构描述" style="width: 140px" size="small" clearable/>
            </FormItem>
            <FormItem>
              <Button  type="primary"  icon="ios-search" @click="search" size="small">搜索</Button>
              <Button type="ghost"  icon="refresh"  size="small" @click="reset">重置</Button>
            </FormItem>
          </Form>
          </Col>
        </Row>
        <!--子机构搜索-->
        <!--子机构过滤-->
      <Form>
        <Row >
          <Col span="21">
              <FormItem :label-width="1" >
              <RadioGroup v-model="filter" @on-change="radioSelect"  size="small" type="button">
                <Radio label="0">机构列表</Radio>
                <Radio label="1">已删机构</Radio>
              </RadioGroup>
              <span style=" margin-left: 10px;vertical-align: middle;overflow: hidden">
                当前父级机构：<b>{{addForm.parent.dname}}</b>
              </span>
            </FormItem>
          </Col>
          <Col span="3"  style="text-align: right"> //v-auth="1-1-2-2"
          <Form>
            <FormItem :label-width="10">
              <Button  @click="addModal()" style="margin-right: 10px"  type="success"  icon="plus" title="新增机构信息" >新增</Button>
            </FormItem>
          </Form>
          </Col>
        </Row>

      </Form>
        <!--子机构过滤-->
        <!--子机构列表-->
        <Row>
          <Col span="24">
          <Table  :columns="columns" height="520" :data="DepartmentData" size="small" stripe  @on-sort-change="sortClick"></Table>
          <Paging :pages="searchData.page" @pageChange="pageChangeFn" ></Paging>
          </Col>
        </Row>
        <!--子机构列表-->
      </Col>
      <!--右边子部门管理-->
      <!-- 新增机构信息页面 -->
      <Modal  v-model="addDepart" :mask-closable="false" @on-cancel="handleReset('addForm')">
        <p slot="header">
          <Icon type="network"></Icon>
          <span ref="header">{{header}}</span>
        </p>
        <Form ref="addForm"  :model="addForm" :rules="addValidate"  label-position="right" :label-width="100" >
          <FormItem label="名称" prop="dname">
            <Input v-model="addForm.dname" placeholder="请输入机构名称" style="width: 300px" size="small" />
          </FormItem>
          <FormItem label="父机构" >
            <Input v-model="addForm.parent.dname" :placeholder="addForm.parent.dname" size="small" disabled style="width: 300px"/>
          </FormItem>
          <FormItem label="描述" prop="ddesc">
            <Input v-model="addForm.ddesc" placeholder="请输入描述" style="width: 300px" type="textarea" :autosize="{minRows: 4,maxRows:8}"  size="small"/>
          </FormItem>
          <FormItem label="备注" prop="remark">
            <Input v-model="addForm.remark" style="width: 300px" placeholder="请输入备注" size="small" />
          </FormItem>
        </Form>
        <div slot="footer">
          <Button type="ghost"  @click="handleReset('addForm')">取消</Button>
          <Button type="primary"  @click="handleSubmit('addForm')">提交</Button>
        </div>
      </Modal>
      <!-- 新增机构信息页面 -->
    </Row>
  </div>
</template>

<script>
  import {getAllDepart,departTree,saveDepart,recoverDepart,delDepart} from '@/service/getData'
  import Paging from '@/components/common/tools/paging'
  import {process_error} from '@/config/process_request_conf'
  import DepartInfo from '@/components/userManagement/info'
  export default {
    name: "departmentList",
    components:{Paging},
    showLoading: false,
    data() {
      return {
        searchInfo: {
          dname: '',
          ddesc: ''
        },
        treeDepart:'',
        filter:'0',
        addDepart:false,
        header:'新增部门信息',
        addForm: {
          parent:{
            id:'',
            dname:''
          },
          dname: '',
          ddesc: '',
          remark: '',
          id:''
        },
        columns: [
          {
            type: 'expand',
            width: 30,
            render: (h, params) => {
              return h(DepartInfo, {
                props: {
                  row: params.row,
                }
              })
            }
          },
          {title: '序号', type: 'index', width: 60,align: 'center'},
          {title: '名称', key: 'dname',align: 'left'},
          {title: '级别', key: 'dlevel',align: 'left'},
          {title: '父机构', key: 'parentDname',align: 'left'},
          {title: '操作时间', key: 'lastModifyTime',align: 'left', sortable: 'custom'},
          {title: '操作', key: 'name',width: 180,align: 'center',
            render:(h,params)=>{
              if(!params.row.del){
                return h('div',[
                  h('Button', {
                    props: {
                      type: 'text',
                      shape:'circle',
                      icon:'edit',
                    },
                    attrs:{title:"编辑"},
                   /* directives: [{
                      name: 'auth',
                      value: -1,
                      expression: '1-1-2-2'
                    }],*/
                    style: {
                      marginRight: '10px',
                      color:'#2d8cf0',
                      width:'23px',
                      height:'23px'
                    },
                    on: {
                      click: () => {
                        this.editData(params.row);
                      }
                    }
                  }),
                  h('Poptip', {
                    props: {
                      title:'您确定删除机构< '+params.row.dname+' >吗？',
                      confirm: true,
                      okText:'删除',
                      transfer: true
                    },
                    /*directives: [{
                      name: 'auth',
                      value: -1,
                      expression: '1-1-2-3'
                    }],*/
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      'on-ok' : () => {
                        this.delData(params.row.id)
                      }
                    }
                  }, [
                    h('Button',{
                      props: {
                        type: 'text',
                        shape:'circle',
                        icon:'close-circled'
                      },
                      attrs:{title:"删除"},
                      style:{
                        color:'#ED3F14',
                        width:'23px',
                        height:'23px'
                      }
                    })
                  ])
                ]);
              }else{
                return h('div',[
                  h('Poptip', {
                    props: {
                      title:'您确定恢复机构< '+params.row.dname+' >吗？',
                      confirm: true,
                      okText:'恢复',
                      transfer: true
                    },
                    /*directives: [{
                      name: 'auth',
                      value: -1,
                      expression: '1-1-2-4'
                    }],*/
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      'on-ok': () => {
                        this.recoverData(params.row.id);
                      }
                    }
                  }, [
                    h('Button',{
                      props: {
                        type: 'text',
                        shape:'circle',
                        icon:'reply'
                      },
                      attrs:{title:"恢复"},
                      style:{
                        color:'#ff9900',
                        width:'23px',
                        height:'23px'
                      }
                    })
                  ])
                ]);
              }
            }
          },
        ],
        addValidate: {
          dname: [
            { required: true, message: '请输入机构名称！', trigger: 'blur',max: 100 }
          ],
          ddesc: [
            { required: false , trigger: 'blur' },
            { type: 'string', max: 120, message: '描述不能超过200字', trigger: 'blur' }
          ],
          remark: [
            { required: false , trigger: 'blur' },
            { type: 'string', max: 100, message: '备注不能超过80字', trigger: 'blur' }
          ]
        },
        DepartmentData: [],
        treeData:[],
        searchData:{
          page:{
            totalElements: 0,
            size: 10,
            pageNumber:1,
            sort: "lastModifyTime,desc"
          },
          del: 0,
          id:""
        },
      }
    },
    methods:{
      //列表请求
      async getDataList(sendData){
        this.showLoading = true;
        this.searchData.del = this.filter;
        await getAllDepart(sendData,this.addForm.parent.id,this.searchInfo)
          .then(res=>{
            this.showLoading = false;
            if(res.statusCode !== 200) return process_error(res);
            if(res.data.content.length === 0){
              this.searchData['page']['totalElements'] = 0;
              this.searchData['page']['pageNumber'] = 1;
              this.searchData['page']['size'] = 10;
            }
            this.DepartmentData = res.data.content;
            this.searchData.page.totalElements = res.data.totalElements;
          })
      },
      //部门树
      async getDepartTree(){
        await departTree()
          .then(res=>{
            if(res.statusCode !== 200) return process_error(res);
            this.treeData = res.data;
            this.treeData[0].expand = true;
            this.treeData[0].selected = true;
            this.treeData[0].checkted = true;
            this.addForm.parent.id =  this.treeData[0].id;
            this.addForm.parent.dname = this.treeData[0].title;
          })
      },
      //分页
      // 分页及复合搜索处理
      pageChangeFn(page) {
        this.searchData['page']['pageNumber'] = page.pageNumber;
        this.searchData['page']['size'] = page.size;
        this.getDataList(this.searchData)
      },
      search(){
        this.searchData.page.pageNumber = 1;
        this.getDataList(this.searchData);
      },
      treeSelect(){
        let domNode = this.$refs.treeDepart;
        if(!!domNode && domNode.getSelectedNodes().length !== 0){
          this.searchData.id = this.addForm.parent.id = this.$refs.treeDepart.getSelectedNodes()[0].id;
          this.addForm.parent.dname = this.$refs.treeDepart.getSelectedNodes()[0].title;
        };
        this.getDataList(this.searchData);
      },
      radioSelect(){
        this.getDataList(this.searchData);
      },
      addModal(){
        this.treeSelect();
        this.header = '新增机构信息';
        this.addForm.id ='';
        this.addDepart = true;
      },
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.save(this.addForm);
          }else{
            this.$Message.error('校验失败!');
          }
        })
      },
      sortFun(arr){
        for(let i = 0;i < arr.length; i++){
            arr[i].expand=true;
          if(arr[i].id == this.addForm.parent.id ){
            arr[i].selected=true;
            arr[i].checked = true;
            return;
          }else{
            if(arr[i].children){
                this.sortFun(arr[i].children);
            }
          }
        }
      },
      handleReset (name) {
        this.addDepart = false;
        this.$refs[name].resetFields();
      },
     async save(data) {
      this.showLoading = true;
      await saveDepart(data)
        .then(res=>{
            if(res.statusCode !== 200) return process_error(res);
            this.showLoading = false;
            this.$Message.success(res.message);
            this.$refs['addForm'].resetFields();
            this.addDepart=false;
            departTree().then(response => {
              this.treeData = response.data;
              this.treeData[0].expand = true;
              this.sortFun(this.treeData);
              this.getDataList(this.searchData);
            })
        })
        .catch(err => {
          this.showLoading = false;
        })
    },
      reset(){
        this.$refs['searchInfo'].resetFields();
        this.getDataList(this.searchData);
      },
      async updateModalSign(data){
        this.addDepart = true;
        this.addForm['id'] = data.id;
        this.addForm['dname'] = data.dname;
        this.addForm.parent.id = data.parentid;
        this.addForm.parent.dname = data.parentDname;
        this.addForm['ddesc'] = data.ddesc;
        this.addForm['remark'] = data.remark;
        this.header='编辑机构信息';
      },
      //编辑
      editData(row){
         this.updateModalSign(row);
      },
      //删除
      async delData(id){
        this.showLoading = true;
        await delDepart(id)
          .then(res => {
            this.showLoading = false;
            this.$Message.success(res.message);
            if(res.statusCode === 200){
              this.getDepartTree();
              this.getDataList(this.searchData);
            }
          })
          .catch(err => {
            this.showLoading = false;
          })
      },
      async recoverData(id){
        this.showLoading = true;
        await recoverDepart(id)
          .then(res => {
            this.showLoading = false;
            this.$Message.success(res.message);
            if(res.statusCode === 200){
              this.getDepartTree();
              this.getDataList(this.searchData);
            }
          })
          .catch(err => {
            this.showLoading = false;
            //this.$Message.error(err);
          })
      },
      async sortClick(column){
        if(column.order != 'normal'){
          this.searchData.page.sort=(column.key+","+column.order);
        }
        this.getDataList(this.searchData);
      }
    },
    mounted(){
      this.getDepartTree();
      this.getDataList(this.searchData);
    }
  }
</script>

<style scoped>

</style>

