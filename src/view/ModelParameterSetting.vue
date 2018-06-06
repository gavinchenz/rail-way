<template>
  <div class="vue-body">
    <div class="panel-heading">
      <Breadcrumb>
        <BreadcrumbItem>系统管理</BreadcrumbItem>
        <BreadcrumbItem>模型参数设置</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="panel-body">
      <Row>
        <Col span="24">
        <Form ref="formInline" :model="formInline" :label-width="80" inline>
          <FormItem label="配置名称" prop="name">
            <Input type="text" v-model="formInline.name" size="small" placeholder="Username">
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
          <Button type="success" @click="addSettingFn"><Icon type="plus-round"></Icon>&nbsp;新增</Button>
          <Button type="error"><Icon type="close-round"></Icon>&nbsp;批量删除</Button>
        </Col>
      </Row>
        <Table height="700" :columns="columns" :data="data" size="small" style="margin-top: 5px" stripe></Table><br>
        <Page :total="100" show-sizer size="small" :page-size="20" show-total></Page>
      <Modal v-model="showaddModal">
        <p slot="header">
          <span><Icon :type="addModalttype.icon"></Icon>&nbsp;<span>{{addModalttype.title}}</span></span>
        </p>
          <Form ref="settingForm" :model="addForm" :label-width="80" inline>
            <FormItem label="配置名称" prop="name">
              <Input type="text" v-model="addForm.name" style="width: 200px" placeholder="配置名称">
              </Input>
            </FormItem>
            <FormItem label="配置类型" prop="type">
              <Select v-model="addForm.type" style="width:200px">
                <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
            <FormItem label="配置说明" prop="settingText">
              <Input v-model="addForm.settingText" type="textarea" style="width:400px" :autosize="{minRows: 2,maxRows: 5}" placeholder="配置说明" />
            </FormItem>
          </Form>
        <div slot="footer">
          <Button type="primary" @click="saveAddFn">保存</Button>
          <Button type="ghost" @click="closeAddFn">取消</Button>
        </div>
      </Modal>
      <Modal v-model="showSetting" title="配置">
        <Form ref="settingForm" :model="settingForm" :label-width="80" inline>
          <FormItem label="配置名称" prop="name">
            <Input type="text" v-model="settingForm.name" style="width: 200px" placeholder="配置名称" />
          </FormItem>
          <FormItem label="连续配置" prop="type">
            <RadioGroup v-model="settingForm.type">
              <Radio label="1">1小时</Radio>
              <Radio label="2">2小时</Radio>
              <Radio label="3">3小时</Radio>
              <Radio label="4">4小时</Radio>
            </RadioGroup>
          </FormItem>
        </Form>
        <div slot="footer">
          <Button type="primary" @click="saveSettingFn">保存</Button>
          <Button type="ghost" @click="closeSettingFn">取消</Button>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
  import modelParameterApi from '../api/modelParameterApi';
export default {
  name: 'ModelParameterSetting',
  data () {
    return {
      showaddModal:false,
      showSetting:false,
      addModalttype:{
        icon:'plus-round',
        title:'新增'
      },
      formInline: {
        name: ''
      },
      columns:[
        {type: 'selection',width: 60, align: 'center'},
        {type: 'index',title:'序号',width: 60,align: 'center'},
        {title: '配置名称',key: 'name',width:300},
        {title: '配置类型',key: 'settingType',width:300},
        {title: '配置说明',key: 'instryctions'},
        {title: '操作',key: 'action',width:250,
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
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.settingFn(params);
                  }
                }
              },'配置'),
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
      typeList:[
        {value: '100',label: '基础配置'},
        {value: '101',label: '连续配置'},
      ],
      addForm:{
        name:'',
        type:'',
        settingText:''
      },
      settingForm:{
        name:'',
        type:'1',
      }
    }
  },
  created(){
      modelParameterApi.getmodelParameterList((data)=> {
        this.data=data;
      });     
  },
  methods:{
    // 新增操作
    addSettingFn(){
      this.addModalttype['icon'] = 'plus-round';
      this.addModalttype['title'] = '新增';
      this.showaddModal = true
    },
    // 新增配置保存
    saveAddFn(){},
    //新增配置取消
    closeAddFn(){
      this.showaddModal = false
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

    //表格行配置操作
    settingFn(){
      this.showSetting = true
    },
    //表格行配置弹窗保存
    saveSettingFn(){},
    //表格行配置弹窗关闭
    closeSettingFn(){
      this.showSetting = false
    }
  }
}
</script>

<style scoped>
.model-parameter-setting{
  height:100%;
}
</style>
