<template>
  <div class="vue-body">
    <Breadcrumb class="router-box">
      <BreadcrumbItem to="Trains">列车车次</BreadcrumbItem>
      <BreadcrumbItem>维护列车时刻</BreadcrumbItem>
    </Breadcrumb>
    <div class='panel-body'>
      <Form ref="searchForm" :model="searchData.searchForm" :label-width="70" inline>
        <FormItem label="途经站">
          <Input v-model="searchData.searchForm.way" placeholder=""></Input>
        </FormItem>
        <FormItem :label-width="10">
          <Button type="primary">查询</Button>
          <Button type="ghost">重置</Button>
        </FormItem>
      </Form>
      <div style="margin-bottom: 10px">
        <Button type="success"><Icon type="plus-round"></Icon>&nbsp;新增</Button>
        <Button type="primary"><Icon type="forward"></Icon>&nbsp;导入</Button>
        <Button type="info"><Icon type="archive"></Icon>&nbsp;下载模板</Button>
        <Button type="error"><Icon type="close" size="12"></Icon>&nbsp;批量删除</Button>
        <Button type="ghost" @click="goBackFn" style="float: right">返回</Button>
      </div>
      <Table stripe :columns="columns" :data="tableList" :loading="showLoading" height="600" size="small" style="margin-bottom: 10px"></Table>
      <Paging :pages="searchData.page" @pageChange="pageChangeFn"></Paging>

    </div>
  </div>
</template>

<script>
  import Paging from '@/components/common/tools/paging' //二次封装的分页组件，可以减少页面代码
  export default {
    name: "MainTainTrainTimes",
    components: {Paging},
    data() {
      return {
        showLoading:false,//表格是否执行正在加载中，可以在请求前设置true，请求成功后更改为false
        columns:[
          {type: 'selection',width: 60,align: 'center'},
          {type: 'index',title:'序号',width: 60,align: 'center'},
          {title:'列车车次',key:'trains',width: 150,align: 'left'},
          {title:'站名',key:'start',minWidth: 150,align: 'left'},
          {title:'到时',key:'end',minWidth: 150,align: 'left'},
          {title:'发时',key:'startTime',minWidth: 100,align: 'left'},
          {title:'停留',key:'endTime',minWidth:100,align: 'left'},
          {title:'里程数',key:'runTime',minWidth:100,align: 'left'},
          {title:'操作',width:300,align: 'center',
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
                      this.editRow(params.index)
                    }
                  }
                }, '修改'),
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
                      this.deleteRow(params)
                    }
                  }
                }, '删除'),
              ]);
            }
          },
        ],//列头，key按真实数据字段修改
        tableList:[
          {trains:'c5308',start:'孝感东',end:'16:35',startTime:'14:00',endTime:'---',runTime:'0'},
          {trains:'c5308',start:'天河机场',end:'11:15',startTime:'14:00',endTime:'5分钟',runTime:'0'},
          {trains:'c1312',start:'孝感东',end:'12:15',startTime:'12:20',endTime:'3分钟',runTime:'0'},
          {trains:'A9308',start:'孝感东',end:'16:15',startTime:'11:15',endTime:'10分钟',runTime:'0'},
          {trains:'c53',  start:'孝感东',end:'06:05',startTime:'14:30',endTime:'15分钟',runTime:'0'},
          {trains:'c5301',start:'孝感东',end:'16:45',startTime:'13:00',endTime:'5分钟',runTime:'0'},
        ],//表格数据，默认为空。请求后赋值
        searchData: { //查询列表的条件,对象直接传给了getData接口，在getData接口文件中需要跟后台传参方式一一对应
          page: {
            totalElements: 6,
            size: 20,
            pageNumber: 1
          },
          id:'',
          searchForm: {
            way:''
          },
        }
      };
    },
    methods:{
      //维护列车时刻
      mainTainTrainTimes(){},
      //修改
      editRow(){},
      //删除
      deleteRow(){},
      //分页
      pageChangeFn(page){
        this.searchData['page']['pageNumber']=page.pageNumber;
        this.searchData['page']['size']=page.size;
        //...这里写请求函数  this.XX(this.searchData)
      },
      //返回到列车车次
      goBackFn(){
        this.$router.push({path:'/Trains'})
      }
    },
    mounted(){
      //拿到从前一个页面传递的列表行的ID。(id这个字段根据后台给的字段修改).通过id及searchData发送请求
      this.searchData.id = this.$route.query.id;
    }
  };
</script>

<style scoped>

</style>

