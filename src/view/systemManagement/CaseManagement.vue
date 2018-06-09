<template>
  <div class="vue-body">
    <div class="panel-heading">
      <Breadcrumb>
        <BreadcrumbItem>系统管理</BreadcrumbItem>
        <BreadcrumbItem>案件管理</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="panel-body">
      <Row>
        <Col span="24">
        <Form ref="searchForm" :model="searchForm" :label-width="80" inline>
          <FormItem label="案件类型">
            <Select v-model="searchForm.caseType" style="width:120px" size="small">
              <Option v-for="item in caseTypeList" :value="item.value" :key="item.value">{{item.label}}</Option>
            </Select>
            </Input>
          </FormItem>
          <FormItem label="案件名称">
            <Input type="text" v-model="searchForm.name" size="small" placeholder="案件名称">
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
        <Button type="error"><Icon type="close-round"></Icon>&nbsp;批量删除</Button>
        </Col>
      </Row>
      <Table height="700" :columns="columns" :data="data" size="small" style="margin-top: 5px" stripe></Table><br>
      <Page :total="100" show-sizer size="small" :page-size="20" show-total></Page>
      <Modal v-model="showaddModal" width="800">
        <p slot="header">
          <span><Icon :type="addModalttype.icon"></Icon>&nbsp;<span>{{addModalttype.title}}</span></span>
        </p>
          <Form ref="addForm" :model="addForm" :label-width="80" >
            <Row type="flex" justify="center">
              <Col span="10">
                <FormItem label="案件名称" prop="caseName">
                  <Input type="text" v-model="addForm.caseName" style="width: 200px" placeholder="案件名称" />
                </FormItem>
                <FormItem label="案件类型" prop="caseType">
                  <Select v-model="addForm.caseType" style="width:200px">
                    <Option v-for="item in caseTypeList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </FormItem>
                <FormItem label="侦办人" prop="investigator">
                  <Input v-model="addForm.investigator" type="text" style="width: 200px" placeholder="侦办人" />
                </FormItem>
                <FormItem label="联系人" prop="contacts">
                  <Input v-model="addForm.contacts" type="text" style="width: 200px" placeholder="联系人" />
                </FormItem>
              </Col>
              <Col span="10">
                <FormItem label="案件编号" prop="caseNum">
                  <Input type="text" v-model="addForm.caseNum" style="width: 200px" placeholder="案件编号" />
                </FormItem>
                <FormItem label="案件状态" prop="caseStatus">
                  <Select v-model="addForm.caseStatus" style="width:200px">
                    <Option v-for="item in caseStatusList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </FormItem>
                <FormItem label="侦办单位" prop="unit">
                  <Input type="text" v-model="addForm.unit" style="width: 200px" placeholder="侦办单位" />
                </FormItem>
                <FormItem label="联系电话" prop="phone">
                  <Input type="text" v-model="addForm.phone" style="width: 200px" placeholder="联系电话" />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="24" offset="2">
                <FormItem label="案情简要" prop="caseBrief">
                  <Input v-model="addForm.caseBrief" type="textarea" style="width:520px" :autosize="{minRows: 2,maxRows: 5}" placeholder="案情简要" />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="24" offset="2">
              <FormItem label="备注" prop="caseBrief">
                <Input v-model="addForm.note" type="textarea" style="width:520px" :autosize="{minRows: 2,maxRows: 5}" placeholder="备注" />
              </FormItem>
              </Col>
            </Row>
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
  import caseManagementApi from '../../api/caseManagementApi'
export default {
  name: 'CaseManagement',
  data () {
    return {
      showaddModal:false,
      addModalttype:{
        icon:'plus-round',
        title:'新增'
      },
      caseTypeList:[
        {value: '100',label: '盗窃'},
        {value: '101',label: '反恐'},
      ],
      caseStatusList:[
        {value: '100',label: '处理中'},
        {value: '101',label: '结案'},
      ],
      searchForm:{
        caseType:'',
        name:''
      },
      columns:[
        {type: 'selection',width: 60, align: 'center'},
        {type: 'index',title:'序号',width: 60,align: 'center'},
        {title: '案件名称',key: 'caseName'},
        {title: '案件编号',key: 'caseNum'},
        {title: '案件类型',key: 'caseType'},
        {title: '案件状态',key: 'caseStatus',
          render: (h, params) => {
            const row = params.row;
            const color = row.caseStatus === '结案' ? '#19be6b' : row.caseStatus === "执行失败" ? '#f86861' : '#2d8cf0';
            const text = row.caseStatus === '结案' ? '结案' : row.caseStatus === "执行失败" ? '执行失败' : row.caseStatus + "...";
            return h('tag', {
              props:{
                color: color
              },
            }, text);
          }
        },
        {title: '侦办人',key: 'investigator'},
        {title: '创建时间',key: 'createdTime'},
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
      data:[],
      addForm:{
        caseName:'',
        caseType:'',
        investigator:'',
        contacts:'',
        caseNum:'',
        caseStatus:'',
        unit:'',
        phone:'',
        caseBrief:'',
        note:''
      },
    }
  },
  created(){
    caseManagementApi.getCaseManagementList((data)=> {
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
    //查看
    viewFn(){
      this.addModalttype['icon'] = 'clipboard';
      this.addModalttype['title'] = '查看';
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

</style>
