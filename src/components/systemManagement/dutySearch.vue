<style lang="less">
  .dutySearchBox{
    margin-top:20px;
    .ivu-form-inline .ivu-form-item{
      margin-bottom: 0;
    }
    .ivu-input-wrapper textarea{
      font-size: 6px
    }
    .ivu-modal-content .ivu-form-item{
      margin-bottom: 18px
    }
  }
  .helpIcon{
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #f90;
    text-align: center;
    line-height: 18px;
    cursor:pointer;
  }
</style>
<template>
  <div class="dutySearchBox">
    <Form class="searchInfo " ref="searchInfo" :model="searchInfo" inline>
      <Row style="margin-bottom: 6px">
        <Col span="24">
        <FormItem :label-width="80" label="职位级别" prop="dlevel">
          <Select  v-model="searchInfo.dlevel" placeholder="选择职位级别"  style="width: 120px" size="small" clearable>
            <Option v-for="item in levelList" :title="item.title" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem :label-width="50" label="名称" prop="dutyname">
          <Input v-model="searchInfo.dutyname" placeholder="输入职位名称" style="width: 120px" size="small" clearable/>
        </FormItem>
        <FormItem>
          <Button @click="search" type="primary"  icon="ios-search" size="small">搜索</Button>
          <Button type="ghost"  icon="refresh" @click="reset" size="small">重置</Button>
        </FormItem>
        </Col>
      </Row>
      <Row style="margin-bottom: 2px">
        <Col span="22">
        <FormItem >
          <RadioGroup v-model="filter" @on-change="radioSelect" size="small" type="button">
            <Radio label="0">职位列表</Radio>
            <Radio label="1">已删职位</Radio>
          </RadioGroup>
        </FormItem>
        </Col>
        <Col span="2"  style="text-align: right">  //v-auth="1-1-3-2"
        <FormItem :label-width="10">
          <Button @click="addModal()" type="success"  icon="plus" title="新增职位信息" size="small">新增</Button>
        </FormItem>
        </Col>
        <!-- 新增职位信息页面 -->
        <Modal  v-model="addDuty" :mask-closable="false" @on-cancel="handleReset('addForm')">
          <p slot="header">
            <Icon type="android-person-add"></Icon>
            <span ref="header">{{header}}</span>
          </p>
          <Form ref="addForm"  :model="addForm" :rules="addValidate"  label-position="right" :label-width="100" >
            <FormItem label="名称" prop="dutyname" >
              <Input v-model="addForm.dutyname" placeholder="请输入职位名称" style="width: 300px"  size="small" />
            </FormItem>
            <FormItem label="级别" prop="dlevel" >
              <RadioGroup v-model="addForm.dlevel" type="button" size="small">
                <Radio :label="item.value" v-for="item in levelList" :title="item.title" :key="item.value" style="width: 50px;text-align: center" >{{item.label}}</Radio>
              </RadioGroup>&nbsp;
              <Tooltip placement="top" content='数字越低级别越高'>
                <span class="helpIcon"><Icon type="help" style="color: #fff"></Icon></span>
              </Tooltip>
            </FormItem>
            <FormItem label="描述" prop="ddesc" >
              <Input v-model="addForm.ddesc" placeholder="请输入描述" style="width: 300px" type="textarea" :autosize="{minRows: 4,maxRows:8}"   size="small"/>
            </FormItem>
            <FormItem label="备注" prop="remark">
              <Input v-model="addForm.remark" placeholder="请输入备注" style="width: 300px"  size="small" />
            </FormItem>
          </Form>
          <div slot="footer">
            <Button type="ghost"  @click="handleReset('addForm')">取消</Button>
            <Button type="primary"  @click="handleSubmit('addForm')">提交</Button>
          </div>
        </Modal>
        <!-- 新增职位信息页面 -->
      </Row>
    </Form>
  </div>
</template>
<script>
  import {saveDuty} from '@/service/getData';
  export default {
    name: 'DutySearch',
    props: {
      searchInfo: Object
    },
    data () {
      return {
        header: '新增职位信息',
        filter:'0',
        addForm: {
          dutyname: '',
          dlevel: 5,
          ddesc: '',
          remark: '',
          id:''
          },
        levelList: [
          {
            value: 0,
            label: '开发',
            title: '开发级别'
          },
          {
            value: 1,
            label: '1'
          },
          {
            value: 2,
            label: '2'
          },
          {
            value: 3,
            label: '3'
          },
          {
            value: 4,
            label: '4'
          },
          {
            value: 5,
            label: '5'
          }
        ],
        addValidate: {
          dutyname: [
            { required: true, message: '请输入职位名称！', trigger: 'blur' }
        ],
          dlevel: [
            { type:'number',required: true, message: '请选择职位级别！', trigger: 'change' },
        ],
          ddesc: [
            { required: false , trigger: 'blur' },
            { type: 'string', max: 200, message: '描述不能超过200字', trigger: 'blur' }
        ],
          remark: [
            { required: false , trigger: 'blur' },
            { type: 'string', max: 80, message: '备注不能超过80字', trigger: 'blur' }
          ]
      },
        addDuty:false
      }
    },
    methods: {
      addModal(){
        this.header = '新增职位信息';
        this.addForm['id'] ='';
        this.addDuty = true;
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
      handleReset (name) {
        this.addDuty = false;
        this.$refs[name].resetFields();
      },
      async save(data) {
        this.showLoading = true;
        await saveDuty(data)
          .then(res=>{
            this.showLoading = false;
            this.$Message.success(res.message);
            if(res.statusCode === 200) {
              this.$refs['addForm'].resetFields();
              this.addDuty = false;
              this.$emit('getTable', this.filter);
            }
          })
          .catch(err => {
            this.showLoading = false;
            //this.$Message.error(err);
          })
      },
      radioSelect(){
        this.$emit('getTable',this.filter);
      },
      search(){
        this.$emit('search',this.filter);
      },
      reset(){
        this.$refs['searchInfo'].resetFields();
        this.$emit('search',this.filter);
      },
      async updateModalSign(bool,data){
        this.addDuty = bool;
        this.addForm['id'] = data.id;
        this.addForm['dutyname'] = data.dutyname;
        this.addForm['dlevel'] = data.dlevel;
        this.addForm['ddesc'] = data.ddesc;
        this.addForm['remark'] = data.remark;
        this.header='编辑职位信息';
     }
    }
  };
</script>
