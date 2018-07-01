<template>
  <div class="vue-body">
    <Breadcrumb class="router-box">
      <BreadcrumbItem to="index">首页</BreadcrumbItem>
      <BreadcrumbItem>综合查询</BreadcrumbItem>
      <BreadcrumbItem>列车车次</BreadcrumbItem>
    </Breadcrumb>
    <div class='panel-body'>
      <Form ref="searchForm" :model="searchData.searchForm" :label-width="70" inline>
        <FormItem label="车次">
          <Input v-model="searchData.searchForm.trains" placeholder="请输入车次"></Input>
        </FormItem>
        <FormItem label="起始站">
          <Input v-model="searchData.searchForm.startStation" placeholder="请选择起始站"></Input>
        </FormItem>
        <FormItem label="终点站">
          <Input v-model="searchData.searchForm.endStation" placeholder="请选择终点站"></Input>
        </FormItem>
        <FormItem label="途经站">
          <Input v-model="searchData.searchForm.way" placeholder=""></Input>
        </FormItem>
        <FormItem :label-width="10">
          <Button type="primary">查询</Button>
          <Button type="ghost">重置</Button>
        </FormItem>
      </Form>
      <div style="margin-bottom: 10px">
        <Button type="success" @click="addModalFn"><Icon type="plus-round"></Icon>&nbsp;新增</Button>
        <Button type="primary"><Icon type="forward"></Icon>&nbsp;导入</Button>
        <Button type="info"><Icon type="archive"></Icon>&nbsp;下载模板</Button>
        <Button type="error"><Icon type="close" size="12"></Icon>&nbsp;批量删除</Button>
      </div>
      <Table stripe :columns="columns" :data="tableList" :loading="showLoading" @on-selection-change="checkedTableRow" height="600" size="small" style="margin-bottom: 10px"></Table>
      <Paging :pages="searchData.page" @pageChange="pageChangeFn"></Paging>
      <Modal v-model="addModal" :title="addModalTitle" width="700">
        <p slot="header">
          <Icon :type="iconType"></Icon>
          <span>{{addModalTitle}}</span>
        </p>
        <Form ref="addForm" :model="addForm" :label-width="100">
          <Row>
            <Col span="12">
              <FormItem label="列车车次">
                <Input v-model="addForm.trains" placeholder="请输入车次" :readonly = 'addFromDisabled'></Input>
              </FormItem>
              <FormItem label="起始站">
                <Input v-model="addForm.startStation" placeholder="请输入车次" :readonly = 'addFromDisabled'></Input>
              </FormItem>
              <FormItem label="发车时间">
                <Input v-model="addForm.endStation" placeholder="请输入车次" :readonly = 'addFromDisabled'></Input>
              </FormItem>
              <FormItem label="客运值乘单位">
                <Input v-model="addForm.kyzcdw" placeholder="请输入车次" :readonly = 'addFromDisabled'></Input>
              </FormItem>
              <FormItem label="公安值乘单位">
                <Input v-model="addForm.gazcdw" placeholder="请输入车次" :readonly = 'addFromDisabled'></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="运行时常">
                <TimePicker format="HH:mm" :value="addForm.runtime" style="width: 112px" :readonly = 'addFromDisabled'></TimePicker>
              </FormItem>
              <FormItem label="终点站">
                <Input v-model="addForm.zdz" placeholder="请输入车次" :readonly = 'addFromDisabled'></Input>
              </FormItem>
              <FormItem label="到站时间">
                <Input v-model="addForm.getStationTime" placeholder="请输入车次" :readonly = 'addFromDisabled'></Input>
              </FormItem>
              <FormItem label="联系方式">
                <Input v-model="addForm.phone1" placeholder="请输入车次" :readonly = 'addFromDisabled'></Input>
              </FormItem>
              <FormItem label="联系方式">
                <Input v-model="addForm.phone2" placeholder="请输入车次" :readonly = 'addFromDisabled'></Input>
              </FormItem>
            </Col>
          </Row>
            <Row>
              <Col span="24">
                <FormItem label="备注">
                  <Input v-model="addForm.beizhu" placeholder="请输入车次" :readonly = 'addFromDisabled'></Input>
                </FormItem>
              </Col>
            </Row>
          </Row>
        </Form>
        <div slot="footer">
          <Button type="ghost" @click="closeAddModal">关闭</Button>
          <Button type="primary" @click="saveAddModal" v-if="addFromDisabled === false">确定</Button>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
  import Paging from '@/components/common/tools/paging' //二次封装的分页组件，可以减少页面代码
  export default {
    name: "Trains",
    components: {Paging},
    data() {
      return {
        showLoading:false, //表格是否执行正在加载中，可以在请求前设置true，请求成功后更改为false
        addModal:false, //弹窗是否处于打开状态,增，查，改操作
        addFromDisabled:false, //判断查看打开了弹窗，禁用表单为不可编辑
        columns:[
          {type: 'selection',width: 60,align: 'center'},
          {type: 'index',title:'序号',width: 60,align: 'center'},
          {title:'列车车次',key:'trains',width: 150,align: 'left'},
          {title:'起始站',key:'start',minWidth: 150,align: 'left'},
          {title:'终点站',key:'end',minWidth: 150,align: 'left'},
          {title:'发车时间',key:'startTime',minWidth: 100,align: 'left'},
          {title:'到站时间',key:'endTime',minWidth:100,align: 'left'},
          {title:'运行时间',key:'runTime',minWidth:100,align: 'left'},
          {title:'操作',width:300,align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.mainTainTrainTimes(params.index)
                    }
                  }
                }, '维护列车时刻'),
                h('Button', {
                  props: {
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.viewInfo(params.row)
                    }
                  }
                }, '查看'),
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
                      this.editInfo(params.row)
                    }
                  }
                }, '编辑'),
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
                      this.deleteRow(params.row.id)
                    }
                  }
                }, '删除'),
              ]);
            }
          },
        ], //列头,key按真实数据字段修改
        tableList:[
          {trains:'c5108',start:'孝感东',end:'汉口',startTime:'15:45',endTime:'16:25',runTime:'1小时20分钟'},
          {trains:'c5208',start:'北京',end:'汉口',startTime:'15:45',endTime:'16:25',runTime:'1小时20分钟'},
          {trains:'c5308',start:'上海',end:'汉口',startTime:'15:45',endTime:'16:25',runTime:'1小时20分钟'},
          {trains:'c5408',start:'四川',end:'汉口',startTime:'15:45',endTime:'16:25',runTime:'1小时20分钟'},
          {trains:'c5508',start:'西安',end:'汉口',startTime:'15:45',endTime:'16:25',runTime:'1小时20分钟'},
          {trains:'c5608',start:'孝感东',end:'汉口',startTime:'15:45',endTime:'16:25',runTime:'1小时20分钟'},
          {trains:'c5708',start:'孝感东',end:'汉口',startTime:'15:45',endTime:'16:25',runTime:'1小时20分钟'},
          {trains:'c5808',start:'孝感东',end:'汉口',startTime:'15:45',endTime:'16:25',runTime:'1小时20分钟'},
          {trains:'c5908',start:'孝感东',end:'汉口',startTime:'15:45',endTime:'16:25',runTime:'1小时20分钟'},
          {trains:'c4308',start:'孝感东',end:'汉口',startTime:'15:45',endTime:'16:25',runTime:'1小时20分钟'},
          {trains:'c3308',start:'孝感东',end:'汉口',startTime:'15:45',endTime:'16:25',runTime:'1小时25分钟'},
          {trains:'c2308',start:'孝感东',end:'汉口',startTime:'15:45',endTime:'16:25',runTime:'1小时20分钟'}
        ], //表格数据，默认为空。请求后赋值
        searchData: {  //查询列表的条件,对象直接传给了getData接口，在getData接口文件中需要跟后台传参方式一一对应
          page: {
            totalElements: 12,  //默认为0, 这里的12是demo
            size: 20,
            pageNumber: 1
          },
          searchForm: {
            trains: "",
            startStation:'',
            endStation:'',
            way:''
          },
        },
        addModalTitle:'新增',  //弹窗标题，函数中通过增，查，改点击会做修改
        iconType:'plus-round',  //弹窗标题图表，函数中通过增，查，改点击会做修改
        addForm:{
          trains:'',
          startStation:'',
          endStation:'',
          kyzcdw:'',
          gazcdw:'',
          runtime:'',
          zdz:'',
          getStationTime:'',
          phone1:'',
          phone2:'',
          beizhu:''
        },  //弹窗表单数据,通过函数赋值和清值
      };
    },
    methods:{
      //表格复选框
      checkedTableRow(data){
        console.log(data)  //返回已选行的数据
      },
      //列表分页
      pageChangeFn(page){
        this.searchData['page']['pageNumber']=page.pageNumber;
        this.searchData['page']['size']=page.size;
        //...这里写请求函数  this.XX(this.searchData)
      },
      //新增
      addModalFn(){
        this.addModalTitle = '新增';
        this.addFromDisabled = false;
        this.iconType = 'plus-round';
        this.addModal = true;
        this.clearAddform();
      },
      //维护列车时刻
      mainTainTrainTimes(id){
        //拿取行的id跳转到维护列车时刻页面，通过id请求时刻页面数据
        this.$router.push({path:'/MainTainTrainTimes',query:id})
      },
      //查看
      viewInfo(row){
        this.addModalTitle = '查看';
        this.addFromDisabled = true;
        this.iconType = 'document-text';
        this.addModal = true;
        this.getAddModalRowData(row);//赋值
      },
      //编辑
      editInfo(row){
        this.addModalTitle = '编辑';
        this.addFromDisabled = false;
        this.iconType = 'compose';
        this.addModal = true;
        this.getAddModalRowData(row);//赋值
      },
      //删除
      deleteRow(id){},
      //关闭弹窗
      closeAddModal(){
        this.addModal= false;
        this.clearAddform()
      },
      //弹窗中的确定
      saveAddModal(){
        //这里发送请求...
        this.addModal= false;  //然后关闭弹窗
        this.clearAddform()
      },
      //弹窗表单清空函数
      clearAddform(){
        this.addForm.trains = '';
        this.addForm.startStation = '';
        this.addForm.endStation = '';
        this.addForm.kyzcdw = '';
        this.addForm.gazcdw = '';
        this.addForm.runtime = '';
        this.addForm.zdz = '';
        this.addForm.getStationTime = '';
        this.addForm.phone1 = '';
        this.addForm.phone2 = '';
        this.addForm.beizhu = '';
      },
      //列表查看，编辑表单赋值
      getAddModalRowData(row){
        this.addForm.trains = row.trains;
        this.addForm.startStation = row.start;
        this.addForm.endStation = row.end;
        //this.addForm.kyzcdw = row.trains;  //真实数据中获取
        //this.addForm.gazcdw = row.trains;  //真实数据中获取
        this.addForm.runtime = row.runTime;
        this.addForm.zdz = row.end;
        this.addForm.getStationTime = row.endTime;
        //this.addForm.phone1 = params.trains;  //真实数据中获取
        //this.addForm.phone2 = params.trains;  //真实数据中获取
        //this.addForm.beizhu = params.trains;  //真实数据中获取
      },

    }
  };
</script>

<style scoped>

</style>
