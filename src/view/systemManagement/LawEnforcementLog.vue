<template>
  <div class="vue-body">
    <div class="panel-heading">
      <Breadcrumb>
        <BreadcrumbItem>系统管理</BreadcrumbItem>
        <BreadcrumbItem>执法日志</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="panel-body">
      <Row>
        <Col span="24">
        <Form ref="searchForm" :model="searchForm" :label-width="80" inline>
          <FormItem label="所属部门">
            <Select v-model="searchForm.caseType" style="width:120px" size="small">
              <Option v-for="item in caseTypeList" :value="item.value" :key="item.value">{{item.label}}</Option>
            </Select>
            </Input>
          </FormItem>
          <FormItem label="操作人">
            <Input type="text" v-model="searchForm.name" size="small" placeholder="操作人">
            </Input>
          </FormItem>
          <FormItem :label-width="20">
            <Button type="primary" size="small">查询</Button>
            <Button type="ghost" size="small">重置</Button>
          </FormItem>
        </Form>
        </Col>
      </Row>
      <Table height="700" :columns="columns" :data="data" size="small" style="margin-top: 5px" stripe></Table><br>
      <Page :total="100" show-sizer size="small" :page-size="20" show-total></Page>
      <Modal v-model="showaddModal" width="800">
        <p slot="header">
          <span><Icon :type="addModalttype.icon"></Icon>&nbsp;<span>{{addModalttype.title}}</span></span>
        </p>
        <Form ref="viewModal" :model="viewModal" :label-width="80" >
          <Row type="flex" justify="center">
            <Col span="10">
            <FormItem label="操作人" prop="caseName">
              <Input type="text" v-model="viewModal.caseName" style="width: 200px" placeholder="操作人" />
            </FormItem>
            <FormItem label="所属部门" prop="caseType">
              <Select v-model="viewModal.caseType" style="width:200px">
                <Option v-for="item in caseTypeList" :value="item.value" :key="item.value">{{item.label}}</Option>
              </Select>
            </FormItem>
            <FormItem label="案件名称" prop="investigator">
              <Input v-model="viewModal.investigator" type="text" style="width: 200px" placeholder="案件名称" />
            </FormItem>
            <FormItem label="案件状态" prop="caseStatus">
              <Input v-model="viewModal.caseStatus" type="text" style="width: 200px" placeholder="案件状态" />
            </FormItem>
            <FormItem label="任务名称" prop="taskName">
              <Input v-model="viewModal.taskName" type="text" style="width: 200px" placeholder="任务名称" />
            </FormItem>
            <FormItem label="审批人" prop="approvalName">
              <Input v-model="viewModal.approvalName" type="text" style="width: 200px" placeholder="审批人" />
            </FormItem>
            </Col>
            <Col span="10">
            <FormItem label="操作IP" prop="ip">
              <Input type="text" v-model="viewModal.ip" style="width: 200px" placeholder="操作IP" />
            </FormItem>
            <FormItem label="操作时间" prop="time">
              <DatePicker :value="viewModal.time" type="datetime" placeholder="操作时间" style="width: 200px"></DatePicker>
            </FormItem>
            <FormItem label="案件类型" prop="caseType">
              <Input type="text" v-model="viewModal.caseType" style="width: 200px" placeholder="案件类型" />
            </FormItem>
            <FormItem label="案情简要" prop="note">
              <Input type="text" v-model="viewModal.note" style="width: 200px" placeholder="案情简要" />
            </FormItem>
            <FormItem label="任务类型" prop="taskType">
              <Input type="text" v-model="viewModal.taskType" style="width: 200px" placeholder="任务类型" />
            </FormItem>
            <FormItem label="审批结果" prop="approvalResult">
              <Input type="text" v-model="viewModal.approvalResult" style="width: 200px" placeholder="审批结果" />
            </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="24" offset="2">
            <FormItem label="审批描述" prop="caseBrief">
              <Input v-model="viewModal.approvalNote" type="textarea" style="width:520px" :autosize="{minRows: 2,maxRows: 5}" placeholder="审批描述" />
            </FormItem>
            </Col>
          </Row>
        </Form>
        <div slot="footer">
          <Button type="ghost" @click="closeAddFn">关闭</Button>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
  import lawEnforcementLogApi from '../../api/lawEnforcementLogApi'
  export default {
    name: 'LawEnforcementLog',
    data () {
      return {
        showaddModal:false,
        addModalttype:{
          icon:'plus-round',
          title:'新增'
        },
        caseTypeList:[
          {value: '100',label: '财务部'},
          {value: '101',label: '后勤部'},
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
          //{type: 'selection',width: 60, align: 'center'},
          {type: 'index',title:'序号',width: 60,align: 'center'},
          {title: '操作人',key: 'user'},
          {title: '操作IP',key: 'IP'},
          {title: '所属部门',key: 'caseType'},
          {title: '案件名称',key: 'caseStatus'},
          {title: '任务名称',key: 'investigator'},
          {title: '操作内容',key: 'text'},
          {title: '操作时间',key: 'createdTime'},
          {title: '操作',key: 'action',width:250,align: 'center',
            render: (h, params) => {
              return h('div', [
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
                },'查看')
              ]);
            }
          }
        ],
        data:[],
        viewModal:{
          caseName:'',
          caseType:'',
          investigator:'',
          contacts:'',
          caseNum:'',
          caseStatus:'',
          unit:'',
          phone:'',
          caseBrief:'',
          note:'',
          taskName:'',
          approvalName:'',
          time:'',
          ip:'',
          taskType:'',
          approvalResult:''
        },
      }
    },
    created(){
      lawEnforcementLogApi.getlawEnforcementLogList((data)=> {
        this.data=data;
      });     
    }, 
    methods:{
      //查看
      viewFn(){
        this.addModalttype['icon'] = 'clipboard';
        this.addModalttype['title'] = '查看';
        this.showaddModal = true;
      },
      //新增弹窗关闭
      closeAddFn(){
        this.showaddModal = false;
      }

    }
  }
</script>

<style scoped>
  .case-management{
    height:100%;
  }
</style>