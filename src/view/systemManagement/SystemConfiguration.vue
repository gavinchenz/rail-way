<template>
  <div class="vue-body">
    <Breadcrumb class="router-box">
        <BreadcrumbItem to="index">首页</BreadcrumbItem>
        <BreadcrumbItem to="/SystemManagement?condition=5">系统管理</BreadcrumbItem>
        <BreadcrumbItem>系统配置</BreadcrumbItem>
    </Breadcrumb>  
    <div class="panel-body">
      <Row>
        <Col span="24">
        <Form ref="searchForm" :model="formInline" :label-width="80" inline>
          <FormItem label="配置名称">
            <Input type="text" v-model="searchForm.dictionary" size="small" placeholder="配置名称">
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
      <Modal v-model="showaddModal">
        <p slot="header">
          <span><Icon :type="addModalttype.icon"></Icon>&nbsp;<span>{{addModalttype.title}}</span></span>
        </p>
        <Row>
          <Col span="15">
          <Form ref="settingForm" :model="addForm" :label-width="80" inline>
            <FormItem label="配置名称" prop="user">
              <Input type="text" v-model="addForm.user" style="width: 200px" placeholder="配置名称" />
            </FormItem>

            <FormItem label="配置类型" prop="name">
              <Select v-model="addForm.name" style="width:200px">
                <Option v-for="item in settingTpyeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
            <FormItem label="配置说明" prop="settingText">
              <Input v-model="addForm.permissText" type="textarea" style="width:400px" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入其他说明" />
            </FormItem>
          </Form>
          </Col>
        </Row>
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
  // import systemConfigurationApi from '../../api/systemConfigurationApi'
  export default {
    name: 'SystemConfiguration',
    data () {
      return {
        showaddModal:false,
        showSetting:false,
        addModalttype:{
          icon:'plus-round',
          title:'新增'
        },
        searchForm:{
          department:''
        },
        formInline: {
          department:''
        },
        columns:[
          {type: 'selection',width: 60, align: 'center'},
          {type: 'index',title:'序号',width: 60,align: 'center'},
          {title: '配置名称',key: 'department'},
          {title: '配置类型',key: 'createTime'},
          {title: '配置说明',key: 'description'},
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
        addForm:{
          user:'',
          name:'',
          permissText:''
        },
        settingTpyeList:[
          {value: '100',label: '基础配置'},
          {value: '101',label: '连续配置'},
        ],
        settingForm:{
          name:'',
          type:'1',
        }
      }
    },
    created(){
      systemConfigurationApi.getSystemConfigurationList((data)=> {
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
      //表格行配置操作
      settingFn(){
        this.showSetting = true
      },
      //表格行配置操作保存
      saveSettingFn(){},
      //表格行配置操作取消
      closeSettingFn(){
        this.showSetting = false
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
.router-box{
  border-bottom: 1px solid #eeeff1;
}
  
</style>

