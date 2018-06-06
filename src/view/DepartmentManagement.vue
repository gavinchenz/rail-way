<template>
  <div class="vue-body">
    <div class="panel-heading">
      <Breadcrumb>
        <BreadcrumbItem>系统管理</BreadcrumbItem>
        <BreadcrumbItem>部门管理</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="panel-body">
      <Row>
        <Col span="24">
        <Form ref="formInline" :model="formInline" :label-width="80" inline>
          <FormItem label="部门名称">
            <Input type="text" v-model="formInline.department" size="small" placeholder="请输入部门名称">
            </Input>
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
        <Button type="primary"><Icon type="document"></Icon>&nbsp;部门查看</Button>
        <Button type="error"><Icon type="close-round"></Icon>&nbsp;批量删除</Button>
        </Col>
      </Row>
      <Table height="700" :columns="columns" :data="data" size="small" style="margin-top: 5px" stripe></Table><br>
      <Page :total="100" show-sizer size="small" :page-size="20" show-total></Page>
      <Modal v-model="showaddModal">
        <p slot="header">
          <span><Icon :type="addModalttype.icon"></Icon>&nbsp;<span>{{addModalttype.title}}</span></span>
        </p>
        <Row>
          <Col span="15">
          <Form ref="settingForm" :model="addForm" :label-width="80" inline>
            <FormItem label="部门名称" prop="department">
              <Input type="text" v-model="addForm.department" style="width: 200px" placeholder="部门名称" />
            </FormItem>
            <FormItem label="叶子节点" prop="name">
              <RadioGroup v-model="addForm.childNode">
                <Radio label="1">是</Radio>
                <Radio label="2">否</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="父节点" prop="department">
              <RadioGroup v-model="addForm.parentNode">
                <Radio label="1">是</Radio>
                <Radio label="2">否</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="部门描述" prop="settingText">
              <Input v-model="addForm.text" type="textarea" style="width:400px" :autosize="{minRows: 2,maxRows: 5}" placeholder="部门描述" />
            </FormItem>
          </Form>
          </Col>
        </Row>
        <div slot="footer">
          <Button type="primary" @click="saveAddFn">保存</Button>
          <Button type="ghost" @click="closeAddFn">取消</Button>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
  import departmentApi from '../api/departmentApi';
export default {
  name: 'DepartmentManagement',
  data () {
    return {
      showaddModal:false,
      addModalttype:{
        icon:'plus-round',
        title:'新增'
      },
      formInline: {
        department:''
      },
      columns:[
        {type: 'selection',width: 60, align: 'center'},
        {type: 'index',title:'序号',width: 60,align: 'center'},
        {title: '部门名称',key: 'department'},
        {title: '创建时间',key: 'createTime'},
        {title: '描述',key: 'description'},
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
      data:[],
      addForm:{
        department:'',
        childNode:'',
        parentNode:'',
        text:''
      }
    }
  },
  created(){
      departmentApi.getDepartmentList((data)=> {
        this.data=data;
      });     
    },  
  methods:{
    //新增
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
    //删除
    delFn(){},

    //新增保存
    saveAddFn(){},
    //新增弹窗关闭
    closeAddFn(){
      this.showaddModal = false;
    }
  }
}
</script>

<style scoped>
.department-management{
  height:100%;
}
</style>
