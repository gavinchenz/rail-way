<template>
  <div class="vue-body">
    <Breadcrumb class="router-box">
        <BreadcrumbItem to="index">首页</BreadcrumbItem>
        <BreadcrumbItem to="/SystemManagement?condition=5">系统管理</BreadcrumbItem>
        <BreadcrumbItem>账号管理</BreadcrumbItem>
    </Breadcrumb>
    <div class='panel-body'>
      <UserSearch :filters="filter"
      :searchInfo="searchData"
      :dutylist="dutylist"
      :departList="departList"
      @radioSelect="radioSelect"
      @addUserinfo="addUserinfo"
      @addUpload="addUpload"
      @selectData="selectData"
      @loadData="loadData"
      @search="search"
      @resat="resat"
      ref="searchInfo"></UserSearch>
    <Table :row-class-name="rowClassName" height="520"
    :loading="showLoading"
    :columns="columns"
    :data="userData"
    @on-sort-change="sortClick"
    :stripe="showStripe"
    size="small"></Table>
    <Paging :pages="searchData.page" @pageChange="pageChangeFn"></Paging>
    <!--新增用户页面-->
    <Modal v-model="openFlag" :title="openTitle" @on-visible-change="winChange" width="750px">
      <p slot="header">
        <Icon type="android-person-add"></Icon>
        <span ref="header">{{openTitle}}</span>
      </p>
      <div>
        <Form :model="saveData" ref="formCustom" :rules="ruleValidate" label-position="right" :label-width="100">
          <Row>
            <Col span="12">
            <FormItem label="账号" prop="username">
              <Input type="text" v-model="saveData.username" :disabled="editName === false" placeholder="账号"  style="width:200px" size="small"> </Input>
            </FormItem>
            </Col>
            <Col span='12'>
            <FormItem label="部门" prop="depart">
              <Cascader :data="addDepartList" size="small" :placeholder="departValue" v-model="departValueArr" :load-data="loadData" @on-change="departFun" change-on-select style="width:240px" clearable></Cascader>
            </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
            <FormItem label="真实姓名" prop="fullname">
              <Input type="text" v-model="saveData.fullname" placeholder="真实姓名" style="width:200px" size="small" :disabled="editName === false"> </Input>
            </FormItem>
            </Col>
            <Col span='12'>
            <FormItem label="职位" prop="duty">
              <Select size="small" :placeholder="dutyValue" v-model="saveData.duty.id" style="width:240px" @on-change="dutyFun" filterable clearable>
                <Option v-for="item in dutylist" :value="item.id" :key="item.id">{{item.dutyname}} </Option>
              </Select>
            </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
            <FormItem  label="身份证号" prop="cardId">
              <Input size="small" type="text" v-model="saveData.cardId" placeholder="身份证号" style="width:200px"> </Input>
            </FormItem>
            </Col>
            <Col span="12">
            <FormItem label="警号" prop="policeNum">
              <Input type="text" v-model="saveData.policeNum" placeholder="警号" style="width:240px" size="small"> </Input>
            </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
            <FormItem  label="密码" prop="password">
              <Input size="small" type="password" v-model="saveData.password"   :placeholder="regPwd" style="width:200px"> </Input>&nbsp;
              <Tooltip v-if="saveData.id == ''" placement="top" content='默认密码：123456'>
                <span class="helpIcon"><Icon type="help" style="color: #fff"></Icon></span>
              </Tooltip>
            </FormItem>
            </Col>
            <Col span="12">
            <FormItem label="key" prop="key">
              <Input type="text" v-model="saveData.key" placeholder="key" style="width:240px" size="small"> </Input>
            </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
            <FormItem label="入职日期" prop="hiredate">
              <DatePicker size="small" type="date"  :value="saveData.hiredate" @on-change="hiredateFn" placeholder="请选择入职日期" style="width: 200px" format="yyyy-MM-dd"></DatePicker>
            </FormItem>
            </Col>
            <Col span="12">
            <FormItem label="性别">
              <RadioGroup v-model="saveData.sex" size="small">
                <Radio label="true" style="margin-left:50px">
                  <Icon type="male"></Icon>
                  <span>男</span>
                </Radio>
                <Radio label="false" style="margin-left:10px">
                  <Icon type="female"></Icon>
                  <span>女</span>
                </Radio>
                </Radio>
              </RadioGroup>
            </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
            <FormItem label="用户级别" prop="ulevel">
              <RadioGroup v-model="saveData.ulevel" type="button" size="small" v-if="saveData.ulevel !== '0'">
                <Radio label="1" style="width: 40px;text-align: center" ></Radio>
                <Radio label="2" style="width: 40px;text-align: center" ></Radio>
                <Radio label="3" style="width: 40px;text-align: center" ></Radio>
                <Radio label="4" style="width: 40px;text-align: center" ></Radio>
                <Radio label="5" style="width: 40px;text-align: center" ></Radio>
              </RadioGroup>
              <span v-else>开发级别</span>
              <Tooltip v-if="saveData.ulevel !== '0'" placement="top" content='数字越低级别越高'>
                <span class="helpIcon"><Icon type="help" style="color: #fff"></Icon></span>
              </Tooltip>
            </FormItem>
            </Col>
            <Col span="12">
            <FormItem label="生日" prop="birthday">
              <DatePicker size="small" :value="saveData.birthday" type="date" @on-change="birthdayFn" placeholder="请选择生日" style="width: 240px" format="yyyy-MM-dd"></DatePicker>
            </FormItem>
            </Col>
          </Row>
          <Row>
             <Col span="12">
                <FormItem label="权限组" prop="operGroup">
                  <Select :disabled="saveData.id === 1032" size="small" v-model="saveData.operGroup.id" style="width:200px"  filterable clearable>
                    <Option v-for="item in operGroupList" :value="item.id" :key="item.id">{{item.gname}} </Option>
                  </Select>
                </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="备注">
                <Input type="textarea" v-model="saveData.remark" placeholder="备注" style="width:240px" :autosize="{minRows: 2,maxRows:4}"> </Input>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
      <div slot="footer">
        <Button type="ghost" @click="closeUser('formCustom')">取消</Button>
        <Button type="primary" @click="submitUser('formCustom')">提交</Button>
      </div>
    </Modal>
    <!--新增用户页面end-->
    <!--上传用户信息begin-->
    <Modal v-model="uploadModal"  :loading="showLoading" >
      <p slot="header">
        <Icon type="ios-upload"></Icon>
        <span ref="header">上传用户信息</span>
      </p>
      <div>
          <Row  style="vertical-align: middle">  //v-auth="1-1-1-8"
            <Col span="5"style="text-align: center;margin-top:10px"><span>模板</span></Col>
            <Col span="19">
              <a href="api/uf/userinfo/download"><Button style="background: #1c2438;color: #fff;margin-bottom:10px" icon="ios-cloud-download">下载模板</Button></a>
            </Col>
          </Row>
          <Row>
            <Col span="24">
            <p style="font-size: 16px;font-weight: 600;width:100%;" align="left">
              <Alert type="warning"><span style="color:red;"><Icon type="ios-lightbulb-outline"></Icon></span>&emsp;上传前请仔细检查模板内容，若格式或者内容不符合标准，上传会失败！
              </Alert>
            </p>
            </Col>
          </Row>
          <Row>
            <Col span="5" style="text-align: center;margin-top:10px"><span>文件</span></Col>
            <Col span="19">
              <Upload
                :show-upload-list="false"
                ref="upload"
                :format="['xlsx','xlsm','xls']"
                :max-size="2048"
                action="api/uf/userinfo/usersImport"
                :before-upload="handleUpload"
                :on-success="handleSuccess"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize">
                <Tooltip content="请选择要上传的用户信息文件">
                <Button type="primary" icon="ios-cloud-upload-outline" :disabled="!$store.state.auth.has('1-1-1-7')">上传文件</Button>
                  <!--<span v-if="file !== null">{{file.name}}</span>-->
                </Tooltip>
              </Upload>
            </Col>
          </Row>
      </div>
      <div slot="footer">
        <Button type="primary" @click="" :loading="loadingStatus" v-if="file !== null">{{ loadingStatus ? '上传...' : '上传' }}</Button>
        <Button type="ghost"    title="清空所选文件" @click="clear">清空</Button>  //v-auth="1-1-1-7"
      </div>
    </Modal>
    </div>
    <!--上传用户信息end-->
  </div>
</template>

<script>
import { getDept, getDeptChildren, getAllDuty, delUser, recoverUser, saveUser, userAll, ableSwitch, operGroupAllList} from '../../service/getData';//一部请求链接
import UserSearch from '../../components/systemManagement/userSearch';//用户的查询
import Paging from '../../components/common/tools/paging';//分页
import { idCard } from '../../components/common/validateFun';//校验
import UserInfo from '../../components/systemManagement/userinfo'
import {process_error} from '../../config/process_request_conf' //请求成功返回的状态
export default {
  name: "AccountManagement",
  components: { Paging, UserSearch },
  data() {
    const validCheckSelect = (rule, value, callback) => {
      let v = '';
      if (this.validCheckSelectFlag) {
        if ('depart' === rule.type) {
          v = this.saveData.depart.dname;
        } else if ('duty' === rule.type) {
          v = this.saveData.duty.dutyname
        }else if ('operGroup' === rule.type) {
          v = this.saveData.operGroup.id
        }
        if (v === '') {
          callback(new Error(rule.message));
        } else {
          callback();
        }
      }
    };

    return {
      showLoading: true,
      showStripe: true,
      openFlag: false,
      uploadModal: false,
      editName:true,
      filter: '0',
      departValue: '请选择',
      departValueArr: [],
      dutyValue: '请选择',
      validCheckSelectFlag: false,//针对下拉校验的开关
      openTitle: '新增用户信息',
      regPwd:'请输入用户登录密码',
      file: null,
      loadingStatus: false,
      filename:'',
      columns: [
        {
          type: 'expand',
          width: 30,
          render: (h, params) => {
            return h(UserInfo, {
              props: {
                row: params.row,
              }
            })
          }
        },
        { title: '序号', type: 'index', width: 60, align: 'center' },
        { title: '账号', key: 'username', width: 120},
        { title: '真实姓名', key: 'fullname', width: 120 },
        { title: '身份证号', key: 'cardId', width: 170 },
        { title: '警号', key: 'policeNum', width: 140, sortable: 'custom' },
        { title: '职位', key: 'dutyName', width: 140 },
        { title: '权限', key: 'operGroupName', width: 170 },
        { title: '部门', key: 'departName'},
        { title: '级别', key: 'ulevelName', width: 80 },
        { title: '状态', key: 'able',width: 90, align: 'center', sortable: 'custom',
          render: (h, params) => {
            return h('div', [
              h('i-switch', { //数据库1是已处理，0是未处理
                props: {
                  type: 'primary',
                  size: 'large',
                  value: params.row.able === true, //控制开关的打开或关闭状态，官网文档属性是value
                  //disabled: params.row.username === 'admin' ||  !this.$store.state.auth.has('1-1-1-4')
                  disabled:false
                },
                on: {
                  'on-change': (value) => {//触发事件是on-change,用双引号括起来，
                    //参数value是回调值，并没有使用到
                    this.switch(params.row) //params.index是拿到table的行序列，可以取到对应的表格值
                  }
                }
              }, [
                  h('span', {
                    slot: 'open',
                    domProps: {
                      innerHTML: '启用'
                    }
                  }),
                  h('span', {
                    slot: 'close',
                    domProps: {
                      innerHTML: '禁用'
                    }
                  })
                ]
              )
            ]);
          }
        },
        { title: '操作时间', width: 160, key: 'lastModifyTime', sortable: 'custom' },
        {
          title: '操作', width: 160, key: 'action', align: 'center',
          render: (h, params) => {
            if (!params.row.del) {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'text',
                    shape: 'circle',
                    icon: 'edit'
                  },
                  attrs:{title:"编辑"},
                /*  directives: [{
                    name: 'auth',
                    value: -1,
                    expression: '1-1-1-2'
                  }],*/
                  style: {
                    marginRight: '10px',
                    color: '#2d8cf0',
                    width: '23px',
                    height: '23px'
                  },
                  on: {
                    click: () => {
                      this.editData(params.row);
                    }
                  }
                }),
                h('Button', {
                  props: {
                    type: 'text',
                    shape: 'circle',
                    icon: 'close-circled'
                  },
                  attrs:{title:"删除"},
                  style: {
                    color: '#ED3F14',
                    width: '23px',
                    height: '23px'
                  },
                 /* directives: [{
                    name: 'auth',
                    value: -1,
                    expression: '1-1-1-3'
                  }],*/
                  on: {
                    click: () => {
                      this.delData(params);
                    }
                  }
                })
              ]);
            } else {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'text',
                    shape: 'circle',
                    icon: 'reply'
                  },
                  /*directives: [{
                    name: 'auth',
                    value: -1,
                    expression: '1-1-1-5'
                  }],*/
                  attrs:{title:"恢复"},
                  style: {
                    color: '#ff9900',
                    width: '23px',
                    height: '23px'
                  },
                  on: {
                    click: () => {
                      this.recoverData(params);
                    }
                  }
                })
              ]);
            }
          }
        }
      ],
      searchData: {
        page: {
          totalElements: 1,
          size: 10,
          pageNumber: 1,
          sort: "lastModifyTime,desc"
        },
        able: '' ,
        del: '',
        username:'',
        fullname: '',
        depart:{
          id:''
        },
        duty:{
          id:''
        },
        policeNum: ''
      },
      dutylist: [],//职位下拉数组
      departList: [],//查询 部门下拉数组
      addDepartList: [],//新增 部门下拉数组
      operGroupList:[],//权限组 下拉数组
      userData: [],//用户列表中的数据
      saveData: { //保存的数据格式
        id:'',
        depart: {
          id: 0,
          dname: '',
        },
        duty: {
          id: '',
          dutyname: '',
        },
        operGroup: {
          id: '',
          gname: ''
        },
        username: '',
        password: '',
        fullname: '',
        sex: 'true',
        cardId: '',
        key: '',
        policeNum: '',
        ulevel: '',
        birthday: '',
        hiredate: '',
        remark: ''
      },
      ruleValidate: {//校验
        //用户名
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { type: 'string', max: 100, message: '用户名太长', trigger: 'blur' }
        ],
        //密码
        password: [
          { type: 'string', max: 80, message: '密码太长', trigger: 'blur' }
        ],
        ulevel: [
          { required: true, message: '用户级别必选', trigger: 'blur' }
        ],
        //真实姓名
        fullname: [
          { required: true, message: '真实姓名不能为空', trigger: 'blur' },
          { type: 'string', max: 50, message: '真实姓名太长', trigger: 'blur' }
        ],
        //身份证号码
        cardId: [
          { required: true, trigger: 'blur', validator: idCard }
        ],
        depart: [
          { required: true, message: '请选择部门', trigger: 'change', validator: validCheckSelect, type: 'depart' },
        ],
        operGroup:[
          { required: true, message: '请选择权限组', trigger: 'change', validator: validCheckSelect, type: 'operGroup' },
        ],
        duty: [
          { required: true, message: '请选择职位', trigger: 'change', validator: validCheckSelect, type: 'duty', times: '0' },
        ]
      }

    }
  },
  methods: {
    //分页查询全部用户
    async getTableList(sendData) {
      this.showLoading = true;
      await userAll(sendData)
        .then(res => {
          this.showLoading = false;
          this.userData = res.data.content;
          this.searchData.page.totalElements = res.data.totalElements;
        })
        .catch(err => {
          this.showLoading = false;
        })
    },
    // 分页及复合搜索处理
    pageChangeFn(page) {
      this.searchData['page']['pageNumber'] = page.pageNumber;
      this.showLoading = true;
      this.searchData['page']['size'] = page.size;
      this.switchTable(this.filter);
    },
    async switch(data) {
      await ableSwitch(data.id)
        .then(res => {
          this.showLoading = false;
          this.$Message.success(res.message);
          this.radioSelect(this.filter);
        })
        .catch(err => {
          this.showLoading = false;
          this.$Message.error(err);
        })
    },
    //职位下拉
    async selectData() {
      try {
        let data = await getAllDuty();
        this.dutylist = data.data;
        let v = await getDept();
        this.departList = eval(JSON.stringify(v.data).replace(/"children":null,/g,"").replace(/,"loading":null/g,""));
      } catch (err) {
        throw new Error();
      }
    },
    //权限组下拉
    async selectOptGroupData() {
      try {
        let res = await operGroupAllList();
        this.operGroupList = res.data;
      } catch (err) {
        throw new Error();
      }
    },
    //部门级联 子数据的异步加载
    async  loadData(item, callback) {
      item.loading = true;
      await getDeptChildren(item.value)
        .then(res => {
          item.loading = false;
          item.children = eval(JSON.stringify(res.data).replace(/"children":null,/g, "").replace(/,"loading":null/g, ''));
          item.loading = false;
          callback();
        }
        );
    },
    //新增 提交
    async saveUser(sendData) {
      await saveUser(sendData)
        .then(res => {
          if (res.statusCode !== 200) return process_error(res);
          this.$Message.success(res.message);
          this.resat();
          this.openFlag = false;
          this.radioSelect(this.filter);
        })
        .catch(err => {
          this.showLoading = false;
        })
    },
    //入职日期
    hiredateFn(date){
      this.saveData.hiredate = date;
    },
    //生日日期
    birthdayFn(date){
      this.saveData.birthday = date;
    },
    //表格 删除
    async delUser(id) {
      await delUser(id)
        .then(res => {
          this.radioSelect('0');
        })
        .catch(err => {
          this.showLoading = false;
          console.log(err);
        })
    },
    //删除 相关的询问提示
    delData(param) {
      this.$Modal.confirm({
        title: '删除',
        content: '确认删除？',
        okText: '确认',
        cancelText: '取消',
        closable: true,
        onOk: () => {
          this.delUser(param.row.id);
        },
      });
    },
    rowClassName(row) {
      return 'demo-table-info-row';
    },
    //表格 编辑
    async editData(row) {
      let v = await getDept();
      this.editName = false;
      this.addDepartList = eval(JSON.stringify(v.data).replace(/"children":null,/g,"").replace(/,"loading":null/g,""));
      this.openFlag = true;
      this.openTitle = "编辑用户信息";
      this.regPwd = "不填写则不会修改原密码";
      this.saveData.password = '';
      this.saveData.id = row.id;
      this.saveData.username = row.username;
      this.saveData.fullname = row.fullname;
      this.saveData.sex = (row.sex ? 'true':'false');
      this.saveData.cardId = row.cardId;
      this.saveData.key = row.key;
      this.saveData.operGroup.id = (row.operGroupId == null ? '':row.operGroupId );
      this.saveData.policeNum = row.policeNum;
      this.saveData.ulevel = `${row.ulevel}`;
      this.saveData.birthday = row.birthday;
      this.saveData.hiredate = row.hiredate;
      this.saveData.remark = row.remark;
      this.saveData.duty.dutyname = row.dutyName;
      this.saveData.duty.id = (row.dutyId == null ? '':row.dutyId );
      this.saveData.depart.dname = row.departName;
      this.saveData.depart.id = (row.departId == null ? '':row.departId );
      this.departValue = row.departName;
      this.dutyValue = row.dutyName;
    },
    //表格 恢复
    async recoverUser(param) {
      await recoverUser(param.row.id)
        .then(res => {
          this.radioSelect('0');
        })
        .catch(err => {
          this.showLoading = false;
          console.log(err);
        })
    },
    //恢复相关的询问提示
    recoverData(param) {
      this.$Modal.confirm({
        title: '恢复',
        content: '确认恢复？',
        okText: '确认',
        cancelText: '取消',
        closable: true,
        onOk: () => {
          this.recoverUser(param);
        },
      });
    },

    //查询项 查询
    search(departId) {
      this.searchData.depart.id = departId;
      this.searchData.page.pageNumber = 1;
      this.radioSelect(this.filter);
    },
    //查询项 重置
    resat() {
      this.searchData = {
        page: {
          totalElements: 1,
          size: 10,
          pageNumber: 1,
          sort: "lastModifyTime,desc"
        },
        able: '',
        del:'',
        username:'',
        fullname: '',
        depart:{id:''},
        duty:{id:''},
        policeNum: '',
      };
      this.radioSelect(this.filter);
    },
    //标签选取刷新
    radioSelect(v) {
      this.$refs['searchInfo'].setFilter(v);
      this.filter = v
      this.searchData.page.pageNumber = 1;
      this.searchData.page.size = 10;
      this.switchTable(v);
    },
    //数据切换
    switchTable(v) {
      switch (v) {
        case '0'://全部
          this.searchData.del = false;
          this.searchData.able = '';
          break;
        case '1'://禁用
          this.searchData.del = false;
          this.searchData.able = false;
         // this.getDisableList(this.searchData);
          break;
        case '2'://启用
          this.searchData.del = false;
          this.searchData.able = true;
          //this.getAbleList(this.searchData);
          break;
        case '3'://已经删除
          this.searchData.del = true;
          this.searchData.able = '';
          //this.getDelList(this.searchData);
          break;
      }
          this.getTableList(this.searchData);
    },
    //新增
    async addUserinfo() {
      let v = await getDept();
      this.editName = true;
      this.addDepartList = eval(JSON.stringify(v.data).replace(/"children":null,/g,"").replace(/,"loading":null/g,""));
      this.departValueArr = [];
      this.departValue = '请选择';
      this.dutyValue = '请选择';
      let data = {
        id:'',
        depart: {
          id: 0,
          dname: '',
        },
        duty: {
          id: '',
          dutyname: '',
        },
        operGroup: {
          id: '',
          gname: ''
        },
        username: '',
        password: '123456',
        fullname: '',
        sex: 'true',
        cardId: '',
        key: '',
        policeNum: '',
        ulevel: '5',
        birthday: '',
        hiredate: '',
        remark: ''
      }
      this.saveData = data;
      this.validCheckSelectFlag = false;
      this.openFlag = true;
      this.openTitle = "新增用户信息";
      this.regPwd="请输入用户登录密码";
    },
    //提交
    submitUser(name) {
      this.validCheckSelectFlag = true;
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.saveUser(this.saveData);
        } else {
          this.$Message.error('校验失败!');
        }
      })
    },
    //关闭
    closeUser(name) {
      this.openFlag = false;
      this.$refs[name].resetFields();
    },
    addUpload(){
      this.uploadModal = true;
    },
    //窗口的状态改变触发
    async winChange(status) {
      //清空校验
      if (status === false) {
        this.departValue = '请选择';
        this.dutyValue = '请选择';
        this.departValueArr = [];
        this.$refs['formCustom'].resetFields();
      }
    },
    // 部门下拉选项 对选中的值进行赋值
    departFun(value, selectedData) {
      if (0 < value.length) {
        let obj = selectedData.pop();
        this.saveData.depart.id = obj.value;
        this.saveData.depart.dname = obj.label;
      }
    },
    //职位下拉选项
    dutyFun(o) {
      if (this.openFlag) {
        let name = this.getDutyObjById(o);
        this.saveData.duty.dutyname = name;
      }
    },
    //循环遍历 通过id获得对应的名称
    getDutyObjById(o) {
      let name = "";
      if (o != "") {
        this.dutylist.filter(function(e) {
          if (o === e.id) {
            name = e.dutyname;
          }
        })
      }
      return name;
    },
    //上传文件前
    handleUpload (file) {
      this.file = file;
      return false;
    },
    clear(){
      this.$refs.upload.clearFiles();
      this.file.name ='';
    },
    handleSuccess (res, file) {
      file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
      file.name = '7eb99afb9d5f317c912f08b5212fd69a';
    },
    handleFormatError (file) {
      alert("format");
      this.$Message.warning({
        title: '文件格式错误',
        desc: '文件[ ' + file.name + ']格式错误,请选择xlsx格式'
      });
    },
    handleMaxSize (file) {
      alert("maxsize")
      this.$Message.warning({
        title: 'Exceeding file size limit',
        desc: 'File  ' + file.name + ' is too large, no more than 2M.'
      });
    },
    async sortClick(column){
      if(column.order != 'normal'){
        this.searchData.page.sort=(column.key+","+column.order);
      }
      this.getTableList(this.searchData);
    }
  },
  mounted() {
    console.log(this.saveData.ulevel)
     this.getTableList(this.searchData);
     this.selectData();
     this.selectOptGroupData();
  }
};
</script>

<style lang="less" scoped>
.searchInfo {
  text-align: left;
}
.helpIcon{
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #f90;
    text-align: center;
    line-height: 18px
  }
.router-box{
  border-bottom: 1px solid #eeeff1;
}
</style>
