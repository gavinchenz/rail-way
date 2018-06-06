<template>
  <div class="vue-body">
    <div class="panel-heading">
      <Breadcrumb>
        <BreadcrumbItem>系统管理</BreadcrumbItem>
        <BreadcrumbItem>权限管理</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="panel-body">
      <Row>
        <Col span="24">
          <Form ref="searchForm" :model="searchForm" :label-width="80" inline>
            <FormItem label="部门" prop="department">
              <Select v-model="searchForm.department" style="width:120px" size="small">
                <Option v-for="item in departmentList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
            <FormItem label="账号名称" prop="user">
              <Input type="text" v-model="searchForm.user" style="width: 150px" placeholder="账号名称" size="small"/>
            </FormItem>
            <FormItem label="真实姓名" prop="name">
              <Input type="text" v-model="searchForm.name" style="width: 150px" placeholder="真实姓名" size="small"/>
            </FormItem>
            <FormItem :label-width="20">
              <Button type="primary" size="small">查询</Button>
              <Button type="ghost" size="small">重置</Button>
            </FormItem>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
        <Button type="success" @click="addFn"><Icon type="plus-round"></Icon>&nbsp;新增</Button>
        <Button type="primary"><Icon type="navicon-round"></Icon>&nbsp;分配菜单</Button>
        <Button type="error"><Icon type="close-round"></Icon>&nbsp;删除</Button>
        </Col>
      </Row>
      <Table height="700" :columns="columns" :data="data" size="small" style="margin-top: 5px" stripe></Table><br>
      <Page :total="100" show-sizer size="small" :page-size="20" show-total></Page>
      <Modal v-model="showAddModal">
        <p slot="header">
          <span><Icon :type="addModalttype.icon"></Icon>&nbsp;<span>{{addModalttype.title}}</span></span>
        </p>
        <Form ref="addForm" :model="addForm" :label-width="80" inline>
          <FormItem label="权限名称" prop="permissVal">
            <Input type="text" v-model="addForm.permissVal" style="width: 200px" placeholder="权限名称" />
          </FormItem>
          <FormItem label="权限描述" prop="settingText">
            <Input v-model="addForm.permissText" type="textarea" style="width:400px" :autosize="{minRows: 2,maxRows: 5}" placeholder="权限描述" />
          </FormItem>
        </Form>
        <div slot="footer">
          <Button type="primary" @click="saveAddFn">保存</Button>
          <Button type="ghost" @click="closeAddFn">取消</Button>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
  import authirityApi from '../api/authirityApi';
  import departmentsSelectApi from '../api/departmentsSelectApi';
  export default {
    name: 'AuthirityManagement',
    data () {
      return {
        showAddModal:false,
        addModalttype:{
          icon:'plus-round',
          title:'新增'
        },
        departmentList: [],
        data:[],
        searchForm: {
          department:'',
          user:'',
          name:''
        },
        columns:[
          {type: 'index',title:'序号',width: 60,align: 'center'},
          {title: '权限名称',key: 'department'},
          {title: '创建时间',key: 'createTime'},
          {title: '权限描述',key: 'description'},
          {title: '操作',key: 'action',width:250,align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'warning',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.editFn(params.row);
                    }
                  }
                },'修改'),
                h('Button', {
                  props: {
                    type: 'ghost',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.viewFn(params.row.id);
                    }
                  }
                },'查看'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.delFn(params);
                    }
                  }
                },'删除')
              ]);
            }
          }
        ],
        addForm:{
          permissVal:'',
          permissText:''
        }
      }
    },
    created(){
      authirityApi.getauthiritysList((data)=> {
        this.data=data;
      });
      departmentsSelectApi.getDepartmentSelectList((data)=> {
        this.departmentList=data;
      });      
    },
    methods:{
      //新增
      addFn(){
        this.addModalttype['icon'] = 'plus-round';
        this.addModalttype['title'] = '新增';
        this.showAddModal = true;
      },
      //修改
      editFn(){
        this.addModalttype['icon'] = 'compose';
        this.addModalttype['title'] = '修改';
        this.showAddModal = true;
      },
      //查看
      viewFn(){
        this.addModalttype['icon'] = 'clipboard';
        this.addModalttype['title'] = '查看';
        this.showAddModal = true;
      },
      //删除
      delFn(){},

      //新增保存
      saveAddFn(){},
      //新增弹窗关闭
      closeAddFn(){
        this.showAddModal = false;
      }
    }
  }
</script>

<style scoped>
  .department-management{
    height:100%;
  }
</style>
