<style>
</style>
<template>
  <div>
    <DutySearch  :searchInfo="searchData" ref="searchForm" @getTable="getTable" @search="search"></DutySearch>
    <Table :row-class-name="rowClassName" height="520" :loading="showLoading" :columns="columns" :data="dutyData"  :stripe="showStripe" size="small"  @on-sort-change="sortClick"></Table>
    <Paging :pages="searchData.page" @pageChange="pageChangeFn"></Paging>
  </div>
</template>

<script>
  import {dutyAll,delDuty,recoverDuty} from '@/service/getData'
  import DutySearch from '@/components/userManagement/dutySearch'
  import Paging from '@/components/common/tools/paging'
  import DutyInfo from '@/components/userManagement/info'
  export default {
    name: "DutyList",
    components:{Paging,DutySearch},
    data(){
      return{
        showLoading:true,
        showStripe:true,
        filter:'0',
        columns: [
          {
            type: 'expand',
            width: 30,
            render: (h, params) => {
              return h(DutyInfo, {
                props: {
                  row: params.row,
                }
              })
            }
          },
          {title: '序号',type:'index', width: 60, align: 'center'},
          {title: '名称', key: 'dutyname',width: 200},
          {title: '级别', key: 'dlevel',width: 80,sortable: 'custom'},
          {title: '描述', key: 'ddesc',ellipsis:'true'},
          {title: '创建时间', key: 'createTime',width: 280,sortable:'custom'},
          {title: '操作时间', key: 'lastModifyTime',width: 280,sortable:'custom'},
          {title: '操作', key: 'action',align: 'center',width: 260,
            render:(h,params)=>{
              if(!params.row.del){
                return h('div',[
                  h('Button', {
                    props: {
                      type: 'text',
                      shape:'circle',
                      icon:'edit',
                    },
                    attrs:{title:"编辑"},
                    style: {
                      marginRight: '10px',
                      color:'#2d8cf0',
                      width:'23px',
                      height:'23px'
                    },
                    directives: [{
                      name: 'auth',
                      value: -1,
                      expression: '1-1-3-2'
                    }],
                    on: {
                      click: () => {
                        this.editData(params.row);
                      }
                    }
                  }),
                  h('Poptip', {
                    props: {
                      title:'您确定删除职位< '+params.row.dutyname+' >吗？',
                      confirm: true,
                      okText:'删除',
                      transfer: true
                    },
                    directives: [{
                      name: 'auth',
                      value: -1,
                      expression: '1-1-3-3'
                    }],
                    on: {
                     'on-ok' : () => {
                        this.delData(params.row.id)
                      }
                    }
                  }, [
                    h('Button',{
                      props: {
                        type: 'text',
                        shape:'circle',
                        icon:'close-circled'
                      },
                      attrs:{title:"删除"},
                      style:{
                        color:'#ED3F14',
                        width:'23px',
                        height:'23px'
                      }
                    })
                  ])
                ]);
              }else{
                return h('div',[
                  h('Poptip', {
                    props: {
                      title:'您确定恢复职位< '+params.row.dutyname+' >吗？',
                      confirm: true,
                      okText:'恢复',
                      transfer: true
                    },
                    directives: [{
                      name: 'auth',
                      value: -1,
                      expression: '1-1-3-4'
                    }],
                    on: {
                      'on-ok': () => {
                        this.recoverData(params.row.id);
                      }
                    }
                  }, [
                    h('Button',{
                      props: {
                        type: 'text',
                        shape:'circle',
                        icon:'reply'
                      },
                      attrs:{title:"恢复"},
                      style:{
                        color:'#ff9900',
                        width:'23px',
                        height:'23px'
                      }
                    })
                  ])
                ]);
              }
            }
          }
        ],
        searchInfo:{
          dutyname :'',
          dlevel:''
        },
        searchData:{
          page:{
            totalElements: 1,
            size: 10,
            pageNumber:1,
            sort:"lastModifyTime,desc"
          },
          del: '0',
          dlevel:'',
          dutyname:''
        },
        dutyData:[]
      }
    },
    methods:{
      async getTableList(sendData){
        this.showLoading = true;
        await dutyAll(sendData)
          .then(res => {
            this.showLoading = false;
            this.dutyData= res.data.content;
            this.searchData.page.totalElements = res.data.totalElements;
          })
          .catch(err => {
            this.showLoading = false;
            console.log(err);
          })
      },
      getTable(del){
        this.searchData.del=del;
        this.filter = del;
        this.getTableList(this.searchData);
      },
      // 分页及复合搜索处理
      pageChangeFn(page) {
        this.searchData['page']['pageNumber'] = page.pageNumber;
        this.showLoading = true;
        this.searchData['page']['size'] = page.size;
        this.getTableList(this.searchData)
      },
      rowClassName(row) {
        return 'demo-table-info-row';
      },
      search (del) {
        this.searchData.del = del;
        this.searchData.dlevel =this.$refs.searchForm.searchInfo.dlevel;
        this.searchData.dutyname =this.$refs.searchForm.searchInfo.dutyname;
        this.searchData.page.number = 1;
        this.getTableList(this.searchData);
      },
      //编辑
     editData(data){
        this.$refs.searchForm.updateModalSign(true,data);
      },
      //查看
      viewData(){},
      //删除
      async delData(id){
        this.showLoading = true;
        await delDuty(id)
          .then(res => {
            this.showLoading = false;
            this.$Message.success(res.message);
            if(res.statusCode === 200) {
              this.getTable(this.filter);
            }
          })
          .catch(err => {
            this.showLoading = false;
            //this.$Message.error(err);
          })
      },
      async recoverData(id){
        this.showLoading = true;
        await recoverDuty(id)
          .then(res => {
            this.showLoading = false;
            this.$Message.success(res.message);
            if(res.statusCode === 200) {
              this.getTable(this.filter);
            }
          })
          .catch(err => {
            this.showLoading = false;
            //this.$Message.error(err);
          })
      },
      async sortClick(column){
        if(column.order != 'normal'){
          this.searchData.page.sort=(column.key+","+column.order);
        }
        this.getTableList(this.searchData);
      }
     },
    mounted() {
      this.getTableList(this.searchData);
    }
  }
</script>


