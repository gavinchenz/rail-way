<template>
  <div class="vue-body"> 
    <Breadcrumb class="router-box" separator="/">
    <BreadcrumbItem to="/index">首页</BreadcrumbItem>
    <BreadcrumbItem to="/SystemManagement?condition=5">系统管理</BreadcrumbItem>  
    <BreadcrumbItem to="/caseManageList">案件列表</BreadcrumbItem>
  </Breadcrumb>
  <div class="panel-heading">  
    <Row class="vm-table vm-panel">
      <section v-if="authList>=0">
        <div class="panel-body">
          <CaseSearch :filter="filter" @filter="filterData" @resat="resatFn" @search="searchFn" :searchInfo="searchData" @addCase="addCaseFn" @loopCase="loopCaseFn" @synchronizeNewCase="synchronizeNewCaseFn"></CaseSearch>

          <Table title="案件列表" :row-class-name="rowClassName" :loading="showLoading" :columns="columns" :data="caseData" @on-sort-change="sortColumnFn"  :stripe="showStripe" size="small" ></Table>

          <Paging :pages="searchData.page" @pageChange="pageChangeFn"></Paging>

          <!-- 同步案件模态窗 -->
          <Modal
            v-model="synchronizeCase"
            title="案件同步"
            :closable="false"
            :mask-closable="false">
            <p v-if="isAllOrMuch === 1">
              <Icon type="information-circled" size="24"></Icon>
              <span class="adjustHeigt">是否进行新增案件的同步？</span>
            </p>
            <p v-else>
              <Icon type="information-circled" size="24"></Icon>
              <span class="adjustHeigt">是否进行所有案件的同步？</span>
            </p>
            <p slot="footer">
              <Button type="primary" :loading="loading" @click="synchronizeCaseFn">确认</Button>
              <Button type="primary" :disabled="limitOneRequest !== 0" @click="cancelSynchronizeCaseFn">取消</Button>
            </p>
          </Modal>

          <!-- 同步案件展示窗口 -->
          <Modal
            v-model="caseDisplay"
            title="同步案件结果">
            <p v-if="Array.isArray(caseDisplayList) && caseDisplayList.length !==0">
              <Tag color="blue" v-for="(item,index) in caseDisplayList" :key="index">{{item}}</Tag>
            </p>
            <p v-else>暂无案件同步信息！</p>
            <div slot="footer">
              <Button type="primary" :loading="loading" @click="confirm">确认</Button>
            </div>
          </Modal>

        </div>
      </section>

      <NoPermission v-else />
    </Row>
  </div>
</div>
</template>

<script>
  import {
    caseinfoQueryCaseInfo,
    findCaseDictionByParent,
    caseobjectFinishCaseInfo,
    caseinfoDeleteCaseInfo,
    caseSynchronization
  } from '@/service/getData'
  import CaseSearch from '@/components/caseManagement/search'
  import {getStore} from '@/config/mUtils'
  import TableExpand from '@/components/common/tools/table_expand'
  import NoPermission from '@/components/common/tools/noPermission' //无权限查看的模板
  import Paging from '@/components/common/tools/paging'

  import {process_error} from '@/config/process_request_conf'

  export default {
    name: 'CaseManageList',
    components:{ CaseSearch,Paging,NoPermission },
    data() {
      return {
        columns:[
          //  扩展表头信息
          {
            type: 'expand',
            width: 50,
            render: (h, params) => {
              return h(TableExpand, {
                props: {
                  row: params.row,
                  columnField: ['cturncaseunit','cundertakeDeptName','ccategory','cassistcategory','cturncasecategory','clevel','caseObjectNames','caseObjectSize'],
                  title: ["交办单位","承办部门","案件类别","协助类别","交案类别","案件级别","案件对象","案件对象个数"]
                }
              })
            }
          },
          {title: '序号',type:'index', width: 60, align: 'center'},
          {title: '案件名称', key: 'cname',align: 'center',sortable:'custom'},
          {title: '案件类型', key: 'ctype',align: 'center',sortable:'custom'},
          {title: '受理时间', key: 'cacceptancedate',width: 160,align: 'center',sortable:'custom'},
          {title: '案件状态', key: 'cstatus',align: 'center',sortable:'custom'},
          {title: '是否同步', key: 'cissynchrocaseStr',align: 'center',sortable:'custom',
            render: (h, params) => {
              let state = parseInt(params.row.cissynchrocase, 10);
              let style = state === 0 ? "#495060" : "#fea32d";
              let btn = h('div', [
                h('Button', {
                  props: {
                    size: 'small',
                    type: 'primary',
                  },
                  style: {
                    backgroundColor:style,
                    borderColor:style,
                    width: '80px',
                    cursor:'default'
                  },
                }, params.row.cissynchrocaseStr),
              ]);
              return btn;
            }
          },
          {title: '是否提交', key: 'cdisplayStr',align: 'center',sortable:'custom'},
          {title: '操作', key: 'action',width: 180,align: 'center',
            render: (h, params) => {
              let whichField = params.row.cstatuscode === '0' && params.row.cissynchrocase === '1' ?  '管理' : "详情";
              let btnStyle = params.row.cstatuscode === '0' && params.row.cissynchrocase === '1' ?  "ghost" : "primary";
              return h('div', [
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px',
                    float:"left",
                    display: params.row.cstatuscode === '0' && params.row.cissynchrocase === '1' && params.row.cdisplay === "1" ? "block" : "none"
                  },
                  directives: [{
                    name: 'auth',
                    value: -1,
                    expression: '0-1-1-3'
                  }],
                  on: {
                    click: () => {
                      this.closingCase(params.row.id)
                    }
                  }
                }, '结案'),

                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px',
                    float:"left",
                    display: params.row.cdisplay === '0' && params.row.cissynchrocase === '1' ? "block" : "none"
                  },
                  directives: [{
                    name: 'auth',
                    value: -1,
                    expression: '0-1-1-2'
                  }],
                  on: {
                    click: () => {
                      this.deleteCase(params.row.id)
                    }
                  }
                }, '删除'),

                h('Button', {
                  props: {
                    type: btnStyle,
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px',
                    float:'left'
                  },
                  // directives: [{
                  //     name: 'auth',
                  //     value: -1,
                  //     expression: '0-1-1-3'
                  // }],
                  on: {
                    click: () => {
                      this.setCase(params.row,'disabled')
                    }
                  }
                }, whichField),

                h('Button', {
                  props: {
                    type: btnStyle,
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px',
                    float:'right',
                    display:params.row.cissynchrocase === '0' ? 'block' : 'none'
                  },
                  on: {
                    click: () => {
                      this.synchronizeSingleCaseFn(params.row)
                    }
                  }
                },'同步')
              ]);
            }
          }
        ],
        showLoading:true,
        showStripe:true,
        searchData:{
          issynchroCase:'', //过滤
          cissynchrocase:'',
          page:{
            totalElements: 0,
            size: 10,
            pageNumber:1,
            sort:"lastModifyTime,desc"
          },
          caseName:'',
          objName:'',
          identify:'',
          ctypecode:'',
          cstatuscode:'',
          caseLevelcode:"", // 案件级别
          ccategorycode:"", // 案件类别
          cturncasecategorycode:"", // 交案类别
          cassistcategorycode:"" // 协助类别
        },
        caseData:[],  //表格数据
        filter:'2',
        // 同步案件
        synchronizeCase:false, // 同步案件
        isAllOrMuch:1, // 0:所有 1：多条
        caseIdList:[],
        loading:false,
        limitOneRequest:0, //0:可进行同步 1：禁止同步
        caseDisplay:false,
        caseDisplayList:[]
      }
    },
    computed:{
      authList:() => JSON.parse(getStore('auth'))
    },
    methods: {
      async getTableList(sendData){
        this.showLoading = true;
        await caseinfoQueryCaseInfo(sendData)
          .then(res => {
            this.showLoading = false;
            if(res.statusCode !== 200) return process_error(res);
            this.caseData= res.data.content;
            if(res.data.content.length === 0){
              this.searchData['page']['totalElements'] = 0;
              this.searchData['page']['pageNumber'] = 1;
              this.searchData['page']['size'] = 10;
              return;
            }
            this.searchData.page.totalElements = res.data.totalElements;
            this.caseData.forEach((v) => {
              v.cdisplayStr = v.cdisplay === "0" ? "保存" : "提交";
            });
          })
          .catch(err => console.log(err))
      },

      // 删除案件
      deleteCase(id){
        this.$Modal.confirm({
          title: '删除案件',
          content: '<p>确认删除案件吗？</p>',
          onOk: async() => {
            await caseinfoDeleteCaseInfo(id)
              .then(res => {
                if(res.statusCode !== 200) return process_error(res);
                this.$Message.success(`${res.message}`);
                this.getTableList(this.searchData);
              })
              .catch(err => console.log(err))
          },
          onCancel: () => this.$Message.info('取消删除!')
        });
      },

      // 分页及复合搜索处理
      pageChangeFn(page) {
        this.searchData['page']['pageNumber'] = page.pageNumber;
        this.searchData['page']['size'] = page.size;
        this.showLoading = true;
        this.getTableList(this.searchData)
      },

      // 排序
      sortColumnFn(data) {
        if(data.order === "normal"){
          this.searchData.page['sort'] = "lastModifyTime,desc";
        }else {
          switch (data.key){
            case 'cundertakeDeptName':
              this.searchData.page['sort'] = `cundertakeDept,${data.order}`;//部门名称
              break;
            case 'cissynchrocaseStr':
              this.searchData.page['sort'] = `cissynchrocase,${data.order}`;//是否同步
              break;
            case 'cdisplayStr':
              this.searchData.page['sort'] = `cdisplay,${data.order}`;//是否提交
              break;
            default:this.searchData.page['sort'] = `${data.key},${data.order}`;
          }
        }
        this.getTableList(this.searchData);
      },

      //结案
      closingCase(id) {
        this.$Modal.confirm({
          title: '结束案件',
          content: '<p>确认结束案件吗？</p>',
          onOk: async() => {
            await caseobjectFinishCaseInfo(id)
              .then(res => {
                if(res.statusCode !== 200) return process_error(res);
                this.$Message.success(`${res.message}`);
                this.getTableList(this.searchData);
              })
              .catch(err => console.log(err))
          },
          onCancel: () => this.$Message.info('取消提交!')
        });
      },

      //案件管理
      setCase(row,sign) {
        row.cdisplay = row.cissynchrocase === '0' ?  '1' : row.cdisplay;
        sessionStorage.setItem("case_Obj_Info",JSON.stringify(row));

        this.searchData['page']['pageNumber'] = 1;
        this.searchData['page']['size'] = 10;
        this.searchData['page']['sort'] = "lastModifyTime,desc";
        sessionStorage.setItem("searchData",JSON.stringify(this.searchData));

        /**注释原因:
         *    同步案件和手动录入案件均可根据条件添加 对象信息
         *    后续测试 ok 即可删除
         */
        //        手动输入案件(结案)   ||  同步案件
        // if(row.cstatuscode === '1' || row.cissynchrocase === '0'){
        //   this.$router.push({path:'/caseDetail',query:{
        //     caseid:row.id,
        //     cissynchrocase:row.cissynchrocase,
        //     cstatuscode:row.cstatuscode,
        //     cdisplay:row.cdisplay
        //   }});
        // }else{
        //   // 跳转案件管理界面
        //   this.$router.push({path:'/addCase',query:{
        //     caseid:row.id,
        //     isDisabled:true,
        //     cissynchrocase:row.cissynchrocase,
        //     cstatuscode:row.cstatuscode,
        //     cdisplay:row.cdisplay
        //   }});
        // }

        this.$router.push({path:'/addCase',query:{
            caseid:row.id,
            isDisabled:true,
            cissynchrocase:row.cissynchrocase,
            cstatuscode:row.cstatuscode,
            cdisplay:row.cdisplay
          }});
      },

      // 单条案件同步
      synchronizeSingleCaseFn(row,type="other"){
        this.$Modal.confirm({
          title: '案件同步',
          content: '<p>是否进行单条案件同步？</p>',
          onOk: () => {
            let sendData = {type:type, caseId:row.id};
            caseSynchronization(sendData).then(res => {
              if(res.statusCode !== 200) return process_error(res);
              this.$Message.success(`${res.message}`);
              this.searchData['page']['pageNumber'] = 1;
              this.searchData['page']['size'] = 10;
              this.searchData['page']['sort'] = "lastModifyTime,desc";
              this.getTableList(this.searchData);
            },err => console.log(err))
          }
        });
      },

      // 同步新的案件
      synchronizeNewCaseFn(sign){
        this.isAllOrMuch = sign;
        this.synchronizeCase = true;
      },
      synchronizeCaseFn(){
        this.loading = true;
        if(this.limitOneRequest === 1) return;
        let type = this.isAllOrMuch === 1 ? "new" : "all";
        let caseId = this.caseIdList.length !== 0 ? this.caseIdList.toString() : "";
        this.limitOneRequest = 1;
        caseSynchronization({type, caseId}).then(res => {
          this.limitOneRequest = 0;
          this.loading = false;
          if(res.statusCode !== 200) return process_error(res);
          this.synchronizeCase = false;
          this.caseDisplayList = res.data.textMessage;
          setTimeout(() => this.caseDisplay = true, 10);
        },err => console.log(err))
      },
      cancelSynchronizeCaseFn(){
        this.isAllOrMuch = 1;
        this.synchronizeCase = false;
      },

      confirm(){
        this.caseDisplay = false;
        this.searchData['page']['pageNumber'] = 1;
        this.searchData['page']['size'] = 10;
        this.searchData['page']['sort'] = "lastModifyTime,desc";
        this.getTableList(this.searchData);
      },

      rowClassName(row) {
        return 'demo-table-info-row';
      },

      //过滤案件信息
      async filterData(filter) {
        this.showLoading = true;
        this.filter = filter;
        switch (filter){
          case '1' :
            this.searchData['issynchroCase'] = 1;//手动案件
            break;
          case '0' :
            this.searchData['issynchroCase'] = 0;//同步案件
            break;
          case '2' :
            this.searchData['issynchroCase'] = '';//全部案件
            break;
        }
        this.searchData['page']['pageNumber'] = 1;
        this.searchData['page']['size'] = 10;
        this.searchData['page']['sort'] = "lastModifyTime,desc";
        this.getTableList(this.searchData);
      },
      addCaseFn(){
        this.$router.push({path:'/addCase'});
      },
      //同步案件
      loopCaseFn(){
        this.searchData['issynchroCase'] = '';
        this.getTableList(this.searchData);
      },
      //搜索
      searchFn(){
        let isNull = Object.keys(this.searchData).some(v => {
          if(v !== 'page') return !!this.searchData[v];
        })
        // true:搜索条件不为空 | false : 查询条件为空
        if(isNull === true){
          this.searchData['page']['pageNumber'] = 1;
          this.searchData['page']['size'] = 10;
          this.searchData['page']['sort'] = "lastModifyTime,desc";
          this.getTableList(this.searchData);
        }else{
          this.$Message.info('请输入查询条件')
        }
      },
      //重置
      resatFn(){
        this.$clearObj.clearSimpleObj(this.searchData);
        this.getTableList(this.searchData)
      },

      // 初始化查询
      initGetTableList(){
        // 从案件管理页面返回则携带查询条件去查询
        let searchData = sessionStorage.getItem('searchData');
        if(!!searchData){
          Object.assign(this.searchData,JSON.parse(searchData));
          switch(this.searchData.issynchroCase){
            case 0:this.filter = '0';break; // 同步
            case 1:this.filter = '1';break; // 手动录入
            default:this.filter = '2';break // 全部
          }
        }
        this.getTableList(this.searchData);
      }
    },
    mounted() {
      let authList = JSON.parse(getStore('auth')) || [];
      if(authList.indexOf('0-1') < 0) return;
      this.initGetTableList()
    }
  }
</script>

<style lang="less" scoped>
  .ivu-btn-blue{
    color: #2b85e4;
  }
  .adjustHeigt{display:inline-block;height:24px;line-height: 24px;}
</style>
