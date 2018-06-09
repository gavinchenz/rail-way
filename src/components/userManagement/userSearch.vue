<style lang="less">
  .userSearchBox{
      margin-top:20px;
      .ivu-form-inline .ivu-form-item{
        margin-bottom: 0;
      }
      .searchInfo .ivu-cascader-rel .ivu-input-wrapper{
        width:230px
      }
  }
</style>
<template>
  <div class="userSearchBox">
  <Form  :model="searchInfo" inline>
    <Row class="searchInfo">
      <Col span="24">
      <FormItem :label-width="40" label="部门" >
        <Cascader  :data="departList" v-model="departValue" :load-data="loadData" size="small" @on-change="departFun" change-on-select></Cascader>
      </FormItem>
      <FormItem :label-width="40" label="职位">
        <Select v-model="searchInfo.duty.id" placeholder="选择职位" style="width: 110px;margin-bottom:7px" size="small" filterable clearable>
          <Option v-for="item in dutylist" :value="item.id" :key="item.id">{{item.dutyname}}</Option>
        </Select>
      </FormItem>
      <FormItem :label-width="40" label="账号">
        <Input v-model="searchInfo.username" placeholder="查询账号" style="width: 120px;margin-bottom:7px" size="small" clearable />
      </FormItem>
      <FormItem :label-width="40" label="姓名">
        <Input v-model="searchInfo.fullname" placeholder="查询姓名" style="width: 100px;margin-bottom:7px" size="small" clearable />
      </FormItem>
      <FormItem :label-width="40" label="警号">
        <Input v-model="searchInfo.policeNum" placeholder="查询警号" style="width: 100px;margin-bottom:7px" size="small" clearable />
      </FormItem>
      <FormItem>
        <Button @click="search" style="margin-bottom:8px" type="primary" icon="ios-search" size="small">搜索</Button>
        <Button type="ghost" @click="resat" style="margin-bottom:8px" size="small" icon="refresh"> 重置</Button>
      </FormItem>
      </Col>
    </Row>
    <Row style="margin-bottom: 2px">
      <Col span="12">
      <FormItem>
        <RadioGroup v-model="filter" @on-change="radioSelect" size="small" type="button">
          <Radio label="0">全部</Radio>
          <Radio label="1">禁用用户</Radio>
          <Radio label="2">启用用户</Radio>
          <Radio label="3">已删用户</Radio>
        </RadioGroup>
      </FormItem>
      </Col>
      <!--<Col span="16">-->
      <!--<FormItem :label-width="10">-->
        <!--<Button size="small" @click="exportUser" style="background: #495060;color: #fafafa" title="导出用户信息" icon="ios-cloud-download" :disabled="!$store.state.auth.has('1-1-1-6')">导出</Button>-->
      <!--</FormItem>-->
      <!--</Col>-->
      <Col span="12" style="text-align: right">
      <FormItem :label-width="10">
        <Button size="small"  @click="addUserinfo" type="success" icon="plus" title="新增用户信息" :disabled="!$store.state.auth.has('1-1-1-2')">新增</Button>
        <Button size="small" @click="exportUser" style="background: #495060;color: #fafafa" title="导出用户信息" icon="ios-cloud-download" :disabled="!$store.state.auth.has('1-1-1-6')">导出</Button>
        <!--<Button  @click="addUpload" type="primary"  icon="ios-upload" title="下载模板,批量上传用户信息" size="small" :disabled="!$store.state.auth.has('1-1-1-7')">上传</Button>-->
      </FormItem>
      </Col>
    </Row>
  </Form>
  </div>
</template>
<script>
import { getDept, getDeptChildren, getAllDuty } from '@/service/getData';
export default {
  name: 'UserSearch',
  props: {
    searchInfo: Object,
    departList: Array,
    dutylist: Array,
  },
  components: {},
  data() {
    return {
      filter: '0',//单选默认的值
      departId: '',//部门id
      departValue: [],//框内的值
    }
  },
  methods: {
    //初始化下拉
    async selectData() {
      this.$emit('selectData');
    },

    //异步加载
    async  loadData(item, callback) {
      this.$emit('loadData', item, callback);
    },
    //刷新对应的表格
    radioSelect() {
      this.$emit('radioSelect', this.filter)
    },
    //查询
    search() {
      this.$emit('search', this.departId);
    },
    //部门下拉
    departFun(value, selectedData) {
      if (0 < value.length) {
        let obj = selectedData.pop();
        this.departId = obj.value;
      }
      this.departValue = value;
    },
    //重置
    resat() {
      this.departValue = [];
      this.$emit('resat');
    },
    //新增
    addUserinfo() {
      this.$emit('addUserinfo');
    },
    //上传
    addUpload() {
      this.$emit('addUpload');
    },
    //导出
    exportUser() {
      location.href='api/uf/userinfo/usersExport';
    },
    //对选项重新赋值
    setFilter(b) {
      this.filter = b;
    }

  },
  created() {
    this.selectData();
  },
}
</script>
