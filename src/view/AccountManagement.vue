<template>
  <div class="vue-body">
    <div class="panel-heading">
      <Breadcrumb>
        <BreadcrumbItem>系统管理</BreadcrumbItem>
        <BreadcrumbItem>账号管理</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="panel-body">
      <Row>
        <Col span="24">
        <Form ref="formInline" :model="formInline" :label-width="80" inline>
          <FormItem label="部门">
            <Select v-model="formInline.department" style="width:200px" size="small">
              <Option v-for="item in departmentList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem label="账号名称">
            <Input type="text" v-model="formInline.num" size="small" placeholder="请输入账号名称">
            </Input>
          </FormItem>
          <FormItem label="真实姓名">
            <Input type="text" v-model="formInline.name" size="small" placeholder="请输入真实姓名">
            </Input>
          </FormItem>
          <FormItem :label-width="20" >
            <Button type="primary" size="small">查询</Button>
            <Button type="ghost" size="small">重置</Button>
          </FormItem>
        </Form>
        </Col>
      </Row>
      <Row>
        <Col span="24">
        <Button type="success" @click="addFn"><Icon type="plus-round"></Icon>&nbsp;新增</Button>
        <Button type="primary" @click="permissionFn"><Icon type="pin"></Icon>&nbsp;分配权限</Button>
        <Button type="error"><Icon type="close-round"></Icon>&nbsp;批量删除</Button>
        </Col>
      </Row>
      <Table height="700" :columns="columns" :data="data" size="small" style="margin-top: 5px" stripe></Table><br>
      <Page :total="100" show-sizer size="small" :page-size="20" show-total></Page>
      <Modal v-model="showaddModal">
        <p slot="header">
          <span><Icon :type="addModalttype.icon"></Icon>&nbsp;<span>{{addModalttype.title}}</span></span>
        </p>
        <Row  type="flex" justify="center">
          <Col span="15">
            <Form ref="settingForm" :model="addForm" :label-width="80" inline>
              <FormItem label="账号名称" prop="user">
                <Input type="text" v-model="addForm.user" style="width: 200px" placeholder="账号名称" />
              </FormItem>
              <FormItem label="真实姓名" prop="name">
                <Input type="text" v-model="addForm.name" style="width: 200px" placeholder="真实姓名" />
              </FormItem>
              <FormItem label="部门" prop="department">
                <Select v-model="addForm.department" style="width:200px">
                  <Option v-for="item in departmentList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
              <FormItem label="输入密码" prop="passWord">
                <Input type="text" v-model="addForm.password" style="width: 200px" placeholder="输入密码" />
              </FormItem>
              <FormItem label="确认密码" prop="surePassWord">
                <Input type="text" v-model="addForm.surePassWord" style="width: 200px" placeholder="确认密码" />
              </FormItem>
            </Form>
          </Col>
        </Row>
        <div slot="footer">
          <Button type="primary" @click="saveAddFn">保存</Button>
          <Button type="ghost" @click="closeAddFn">取消</Button>
        </div>
      </Modal>
      <Modal v-model="showPermissModal">
        <p slot="header">
          <span><Icon type="pin"></Icon>&nbsp;<span>分配权限</span></span>
        </p>
        <!--<Row  type="flex" justify="center">
          <Col span="15">-->
          <Form ref="permissModal" :model="permissModal" :label-width="80" inline>
            <FormItem label="权限设置" prop="permissListVal">
              <CheckboxGroup v-model="permissModal.permissListVal">
                <Checkbox v-for="(item,i) in permissList" :label="item.val" :key="i">{{item.name}}</Checkbox>
              </CheckboxGroup>
            </FormItem>
          </Form>
       <!--   </Col>
        </Row>-->
        <div slot="footer">
          <Button type="primary" @click="savePermissFn">保存</Button>
          <Button type="ghost" @click="closePermissFn">取消</Button>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
  import accountsApi from '../api/accountsApi';
  import departmentsSelectApi from '../api/departmentsSelectApi';
export default {
  name: 'AccountManagement',
  data () {
    return {
      showaddModal:false,
      showPermissModal:false,
      departmentList: [],
      data:[],
      formInline: {
        num: '',
        department:'001',
        name:''
      },
      columns:[
        {type: 'selection',width: 60, align: 'center'},
        {type: 'index',title:'序号',width: 60,align: 'center'},
        {title: '账号名称',key: 'num'},
        {title: '姓名',key: 'name'},
        {title: '部门',key: 'department'},
        {title: '创建时间',key: 'createTime'},
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
      addModalttype:{
        icon:'plus-round',
        title:'新增'
      },
      addForm:{
        user:'',
        name:'',
        department:'',
        password:'',
        surePassWord:''
      },
      permissList:[
        {name:'系统管理员',val:'100'},
        {name:'信息录入员',val:'101'},
        {name:'基础权限',val:'102'},
        {name:'查询权限',val:'103'}
      ],
      permissModal:{
        permissListVal:[]
      }
    }
  },
  created(){
      accountsApi.getAccountsList((data)=> {
        this.data=data;
      });
      departmentsSelectApi.getDepartmentSelectList((data)=> {
        this.departmentList=data;
      });      
    },
  methods:{
    //新增弹窗
    addFn(){
      this.addModalttype['icon'] = 'plus-round';
      this.addModalttype['title'] = '新增';
      this.showaddModal = true;
    },
    //修改
    editFn(){
      this.addModalttype['icon'] = 'compose';
      this.addModalttype['title'] = '修改';
      this.showaddModal = true;
    },
    //查看
    viewFn(){
      this.addModalttype['icon'] = 'clipboard';
      this.addModalttype['title'] = '查看';
      this.showaddModal = true;
    },
    //删除
    delFn(){},

    //新增弹窗保存按钮
    saveAddFn(){},
    //新增弹窗关闭按钮
    closeAddFn(){
      this.showaddModal = false;
    },

    //分配权限弹窗
    permissionFn(){
      this.showPermissModal = true
    },
    //分配权限保存
    savePermissFn(){},
    //分配权限关闭
    closePermissFn(){
      this.showPermissModal = false
    },
  }
}
</script>

<style scoped>

</style>
