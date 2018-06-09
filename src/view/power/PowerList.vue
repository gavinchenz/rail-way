<template>
  <div>
    <PowerSearch :searchInfo="searchData" @search="search" @addPower="addOrUpdData('')"></PowerSearch>
    <br>
    <Table title="权限列表" :columns="columns" :data="tableData" size="small" height="520" stripe @on-sort-change="sortClick"></Table>
    <Paging :pages="searchData.page" @pageChange="pageChange"></Paging>
    <Modal v-model="powerModel" width="700" @on-cancel="closeModal('power')">
      <p slot="header">
        <Icon class="titleColor" v-if="toggleAdd" type="plus-round"></Icon>
        <Icon class="titleColor" v-else type="edit"></Icon>
        <span class="titleColor">{{powerTitle}}</span>
      </p>
      <Form ref="power" :model="power" :rules="rulePower" :label-width="150" class="marginAutoForm">
        <Row>
          <Col span="22">
            <Form-item label="权限名称：" prop="gname">
              <Input v-model="power.gname" :maxlength="30" placeholder="请输入..."/>
            </Form-item>
          </Col>
        </Row>
        <Row>
          <Col span="22">
            <Form-item label="权限描述：" prop="gdesc">
              <Input v-model="power.gdesc" :maxlength="30" placeholder="请输入..."/>
            </Form-item>
          </Col>
        </Row>
        <Row>
          <Col span="22">
            <Form-item label="操作分配：" prop="oidList">
              <div v-for="(item1,key,index) in operList" :key="item1.id">
                <label :for="`checkedALL${item1}`">
                  <input @click="checkedALL(`checkedALL${key}`)" type="checkbox" :id="`checkedALL${key}`" :ref="`checkedALL${key}`"/>
                  {{key}}
                </label>
                <div style="background:#eee;padding: 8px;">
                  <Card :bordered="false">
                    <label :class="{checkBoxStyle:checkBoxStyle}" v-for="(item,index) in item1" :key="item.id" :for="item.id" :name="`checkedALL${key}`">
                      <input hidden  @click="selectFn(`checkedALL${key}`, item.id)" :id="item.id" type="checkbox"  :value="item.name"/>{{item.oname}}
                    </label>
                  </Card>
                </div>
              </div>
            </Form-item>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button type="ghost" @click="closeModal('power')">取消</Button>
        <Button type="primary" @click="savePower('power')" :disabled="!$store.state.auth.has('1-1-1-13')">提交</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import {getOperGroupList, saveOperGroup, operaterByGroupList, viewOperGroup, deleteOperGroup, saveOperGroupInitUse} from '@/service/getData'
  import Paging from '@/components/common/tools/paging'
  import PowerSearch from '@/components/power/power-search'
  import {process_error} from '@/config/process_request_conf' //请求成功返回的状态
  export default {
    name: 'PowerList',
    components: {
      Paging, PowerSearch
    },
    data () {
      const validateOids = (rule, value, callback) => {
        if (this.power.oids.length < 1) {
          return callback(new Error('请分配操作...'));
        }
        callback();
      };
      const validateSwith = (rule, value, callback) => {
        if ('' === value) {
          return callback(new Error('请选择...'));
        }
        callback();
      };
      return {
        toggleAdd:true,
        checkBoxStyle:true,
        power: {
          oids: [],
          initUse: false,
        },
        typeName: [],
        viewOids: [],
        powerTitle: '新增权限',
        powerModel: false,
        tableData: [],
        rulePower: {
          gname: [
            {required: true, message: '请输入权限名称'},
            {type: "string", max: 8, message: "权限名称长度不能大于8个字符"}
          ],
          gdesc: [
            {required: true, message: '请输入权限描述'},
            {type: "string", max:20, message: "权限描述长度不能大于20个字符"}
          ],
          initUse: [
            {message: '请选择...', trigger: 'change', type: 'number', validator: validateSwith}
          ],
          oidList: {message: '请分配操作', required: true, validator: validateOids},
        },
        columns: [
          {title: '序号',type:'index', width: 60, align: 'center'},
          {title: '权限名称', key: 'gname'},
          {title: '权限描述', key: 'gdesc'},
          {title: '默认权限', key: 'initUse', align: 'center',
            render: (h, params) => {
              return h('div', [
                h('i-switch', {
                    props: {
                      type: 'primary',
                      size: 'large',
                      value: params.row.initUse === true, //控制开关的打开或关闭状态，官网文档属性是value
                      disabled: !this.$store.state.auth.has('1-1-1-16')
                    },
                    on: {
                      'on-change': (value) => {//触发事件是on-change,用双引号括起来，
                        this.switch(params.row,value) //params.index是拿到table的行序列，可以取到对应的表格值
                      }
                    }
                  }, [
                    h('span', {
                      slot: 'open',
                      domProps: {
                        innerHTML: '是'
                      }
                    }),
                    h('span', {
                      slot: 'close',
                      domProps: {
                        innerHTML: '否'
                      }
                    })
                  ]
                )
              ]);
            }
          },
          {title: '操作时间', key: 'lastModifyTime', sortable: 'custom'},
          {title: '操作', key: 'action',align: 'center', width: 150,
            render:(h,params)=>{
              return h('div', [
                h('Button', {
                  props: {
                    type: 'text',
                    shape: 'circle',
                    icon: 'edit',
                  },
                  attrs:{title:"编辑"},
                  style: {
                    marginRight: '10px',
                    color: '#2d8cf0',
                    width: '23px',
                    height: '23px'
                  },
                  directives: [{
                    name: 'auth',
                    value: -1,
                    expression: '1-1-1-15'
                  }],
                  on: {
                    click: () => {
                      this.addOrUpdData(params.row);
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
                  directives: [{
                    name: 'auth',
                    value: -1,
                    expression: '1-1-1-14'
                  }],
                  on: {
                    click: () => {
                      this.delData(params.row.id);
                    }
                  }
                })
              ]);
            }
          }
        ],
        parentCheck: [],
        indeterminate: true,
        checkAll: false,
        operList: [],
        spInfoTitle: '',
        insModel: false,
        checkAllGroup: [],
        searchData: {
          operGroup: {
            gname: '',
          },
          page:{
            totalElements: 1,
            size: 20,
            number: 1,
            sort: "lastModifyTime,desc"
          },
        }
      }
    },
    methods: {
      async switch(data, value) {
        await saveOperGroupInitUse(data.id, value)
          .then(res => {
            this.getTableList(this.searchData)
          })
          .catch(err => {
            this.$Message.error(err.message);
          })
      },
      checkedALL(data){
        let _parentId = document.getElementById(data);
        let _id = document.getElementsByName(data);
        let flag = _parentId.checked;
        for (let i = 0; i < _id.length; i++) {
          _id[i].children[0].checked = flag;
          if (flag) {
            this.power.oids.push(_id[i].children[0].id);
            _id[i].classList.add('active')
          } else {
            this.power.oids.splice(this.power.oids.indexOf(_id[i].children[0].id),1);
            _id[i].classList.remove('active')
          }
        }
      },
      selectFn(dom, id){
        let _parentId = document.getElementById(dom);
        let _id = document.getElementsByName(dom);
        let number = 0;
        let _input = document.getElementById(id);
        if (_input.checked) {
          _input.parentNode.classList.add('active');
          this.power.oids.push(id);
        } else {
          _input.parentNode.classList.remove('active');
          this.power.oids.splice(this.power.oids.indexOf(id),1);
        }
        for (let i = 0; i < _id.length; i++) {
          if (_id[i].children[0].checked) {
            number++
          }
          _parentId.checked =
            (_id.length === number)
        }
      },
      savePower(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.saveOperGroup();
          } else {
            this.$Message.warning('请在补充表单字段后再做提交操作！')
          }
        })
      },
      closeModal(name){
        this.powerModel = false;
      },
      async saveOperGroup () {
        let res = await saveOperGroup(this.power, this.power.oids);
        this.powerModel = false;
        this.$Message.success(`${res.message}`);
        this.getTableList(this.searchData)
      },
      async addOrUpdData(row){
        let vieIds = [];
        let allOpers = [];
        let typeName = [];
        this.power.oids = [];
        this.toggleAdd = true;
        let res = await operaterByGroupList();
        this.operList = res.data;
        for (let k in this.operList) {
          let oper = {name: '', ids: []};
          oper.name = k;
          this.operList[k].filter(function (e) {
            oper.ids.push(e.id);
            let inputById = document.getElementById(e.id);
            if (inputById) {
              inputById.checked = false;
              inputById.parentNode.classList.remove('active')
            }
          });
          allOpers.push(oper);
          let _parentId = document.getElementById("checkedALL" + k);
          if(_parentId){
            _parentId.checked = false
          }
        }
        if ('' !== row) {
          let res2 = await viewOperGroup(row.id);
          this.power = res2.data;
          this.toggleAdd = false;
          this.powerTitle = "修改权限:" + row.gname;
          let parentCheck = [];
          for (let i = 0; i < allOpers.length; i++) {
            let number = 0;
            this.power.operateSet.filter(function (e) {
              let parentName = '';
              let inputById = document.getElementById(e.id);
              inputById.checked = true;
              inputById.parentNode.classList.add('active');
              parentName = inputById.parentNode.getAttribute("name");
              let _parentId = document.getElementById(parentName);
              if (vieIds.indexOf(e.id) < 0) {
                vieIds.push(e.id);
              }
              if (e.typeName === allOpers[i].name) {
                allOpers[i].ids.filter(function (f) {
                  if (f === e.id) {
                    number++;
                    if (typeName.indexOf(e.typeName) < 0) {
                      typeName.push(e.typeName);
                    }
                    _parentId.checked = (allOpers[i].ids.length === number)
                  }
                })
              }
              if(_parentId.checked){
                parentCheck.push(_parentId)
              }
            });
          }
          this.typeName = typeName;
          this.parentCheck = parentCheck;
          this.power.oids = vieIds
        } else {
          this.$refs['power'].resetFields();
          this.powerTitle = "新增权限";
          this.power.gname = '';
          this.power.gdesc = '';
        }
        this.powerModel = true
      },
      delData (id) {
        this.$Modal.confirm({
          title: '删除权限',
          content: '<p>您确定要删除这条权限记录吗？</p>',
          onOk: () => {
            this.deleteOperGroup(id);
          }
        });
      },
      //删除
      async deleteOperGroup(id){
        await deleteOperGroup(id)
          .then(res => {
            if (res.statusCode !== 200) return process_error(res);
            this.$Message.success(res.message);
            this.getTableList(this.searchData)
          }).catch(err => {
            this.$Message.error(err.message)
          })
      },
      //搜索
      search(fname){
        this.searchData.fname = fname;
        this.searchData.page.number = 1;
        this.getTableList(this.searchData)
      },
      async getTableList(sendData){
        await getOperGroupList(sendData)
          .then(res => {
            this.tableData= res.data.content;
            this.searchData.page.totalElements = res.data.totalElements;
          })
          .catch(err => {
            console.log(err);
          })
      },
      // 分页及复合搜索处理
      pageChange(page) {
        this.searchData['page']['number'] = page.number;
        this.searchData['page']['size'] = page.size;
        this.getTableList(this.searchData)
      },
      async sortClick(column){
      if(column.order != 'normal'){
        this.searchData.page.sort=(column.key+","+column.order);
      }
      this.getTableList(this.searchData);
    }
    },
    mounted(){
      this.getTableList(this.searchData);
    }
  }
</script>
<style lang="less">
  .checkBoxStyle{
    display: inline-block;
    height: 22px;
    line-height: 22px;
    border-radius: 3px;
    border:1px solid #eee;
    margin: 2px 15px 2px 0;
    padding: 0 8px;
    font-size: 12px;
    vertical-align: middle;
    cursor: pointer;
    overflow: hidden;
  }
  .active{
    color: #fff;
    background: #2d8cf0;
  }


</style>
