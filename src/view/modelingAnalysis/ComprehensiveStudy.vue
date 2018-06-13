<template>
   <div class="vue-body">
    <Breadcrumb class="router-box">
        <BreadcrumbItem to="index">首页</BreadcrumbItem>
        <BreadcrumbItem to="/ModelingAnalysis?condition=3">建模分析</BreadcrumbItem>
        <BreadcrumbItem>综合研判</BreadcrumbItem>
    </Breadcrumb>
    <Form :model="formItem1" class="header-from">
        <FormItem class="form-item">
            <Row :gutter="12">
                <Col span="2" class="col-label">起始站1</Col>
                <Col span="4">
                    <Input v-model="formItem1.startStation1" placeholder="请输入起始站" clearable></Input>
                </Col>
                <Col span="2" class="col-label">结束站1</Col>
                <Col span="4">
                    <Input v-model="formItem1.endStation1" placeholder="请输入结束站" clearable></Input>
                </Col>
                <Col span="2" class="col-label">起始站2</Col>
                <Col span="4">
                    <Input v-model="formItem1.startStation2" placeholder="请输入起始站" clearable></Input>
                </Col>
                <Col span="2" class="col-label">结束站2</Col>
                <Col span="4">
                    <Input v-model="formItem1.endStation2" placeholder="请输入结束站" clearable></Input>
                </Col>
            </Row>
        </FormItem>
        <FormItem class="form-item">
            <Row :gutter="16">
                <Col span="2" class="col-label">售票类型</Col>
                <Col span="10" class="col-checkbox">
                    <CheckboxGroup v-model="formItem1.ticketType">
                        <Checkbox label="全部">全部</Checkbox>
                        <Checkbox label="站售">站售</Checkbox>
                        <Checkbox label="网售">网售</Checkbox>
                        <Checkbox label="代售">代售</Checkbox>
                        <Checkbox label="证票核验">证票核验</Checkbox>
                        <Checkbox label="12306订票">12306订票</Checkbox>
                    </CheckboxGroup>                
                </Col>
            </Row>
        </FormItem> 
        <FormItem class="form-item">
            <Row :gutter="24">
                <Col span="2" class="col-label">停留时长</Col>
                <Col span="4">
                    <Input v-model="formItem1.lengthOfStay" placeholder="请输入..." clearable></Input>
                </Col>
                <Col span="2" class="col-label">停留次数</Col>
                <Col span="4">
                    <Input v-model="formItem1.numberOfStops" placeholder="请输入数字" clearable></Input>
                </Col>
                <Col span="2" class="col-label">开始时间</Col>
                <Col span="4">
                    <DatePicker type="date" placeholder="选择日期" v-model="formItem1.startDate"></DatePicker>
                </Col>
                <Col span="2" class="col-label">结束时间</Col>
                <Col span="4">
                    <DatePicker type="date" placeholder="选择日期" v-model="formItem1.endDate"></DatePicker>
                </Col>
            </Row>
        </FormItem>
    </Form>
    <Form :model="formItem1" class="header-from">
        <FormItem class="form-item">
            <Row :gutter="16">
                <Col span="2" class="col-label">人员类型</Col>
                <Col span="10" class="col-checkbox">
                    <CheckboxGroup v-model="formItem1.personType">
                        <Checkbox label="全部">全部</Checkbox>
                        <Checkbox label="普通旅客">普通旅客</Checkbox>
                        <Checkbox label="涉毒">涉毒</Checkbox>
                        <Checkbox label="涉恐">涉恐</Checkbox>
                        <Checkbox label="涉票">涉票</Checkbox>
                        <Checkbox label="侵财">侵财</Checkbox>
                        <Checkbox label="维稳">维稳</Checkbox>
                    </CheckboxGroup>                
                </Col>
            </Row>
        </FormItem> 
        <FormItem class="form-item">
            <Row :gutter="24">
                <Col span="2" class="col-select" style='margin-left: 10px'>人员高危类型</Col>
                <Col span="1" class="col-select">刑事</Col>
                <Col span="4" class="col-select">
                  <Select v-model="formItem1.criminalSelect" clearable>
                    <Option value="杀人">杀人</Option>
                    <Option value="放火">放火</Option>
                    <Option value="涉抢">涉抢</Option>
                    <Option value="涉爆">涉爆</Option>
                    <Option value="涉恶">涉恶</Option>
                    <Option value="故意伤害">故意伤害</Option>
                    <Option value="强奸">强奸</Option>
                    <Option value="抢劫">抢劫</Option>
                    <Option value="绑架">绑架</Option>
                    <Option value="投放危险物质">投放危险物质</Option>
                    <Option value="利用网络犯罪">利用网络犯罪</Option>
                    <Option value="针对网络犯罪">针对网络犯罪</Option>
                    <Option value="诈骗">诈骗</Option>
                    <Option value="危害公共安全">危害公共安全</Option>
                    <Option value="非法拘禁">非法拘禁</Option>
                    <Option value="盗窃">盗窃</Option>
                    <Option value="其他">其他</Option>
                  </Select>             
                </Col>
                <Col span="1" class="col-select">经济</Col>
                <Col span="4" class="col-select">
                  <Select v-model="formItem1.economicsSelect" clearable>
                    <Option value="生产、销售伪劣商品">生产、销售伪劣商品</Option>
                    <Option value="走私">走私</Option>
                    <Option value="金融诈骗">金融诈骗</Option>
                    <Option value="侵犯知识产权">侵犯知识产权</Option>
                    <Option value="扰乱市场秩序">扰乱市场秩序</Option>
                    <Option value="生产、销售假药">生产、销售假药</Option>
                    <Option value="生产、销售有毒有害食品">生产、销售有毒有害食品</Option>
                    <Option value="其他">其他</Option>
                  </Select>             
                </Col>
                <Col span="1" class="col-select">国保</Col>
                <Col span="4" class="col-select">
                  <Select v-model="formItem1.nationalLnsuranceSelect" clearable>
                    <Option value="邪教组织">邪教组织</Option>
                    <Option value="暴力恐怖活动">暴力恐怖活动</Option>
                    <Option value="非法宗教">非法宗教</Option>
                    <Option value="境外非法组织">境外非法组织</Option>
                    <Option value="境外反动媒体">境外反动媒体</Option>
                    <Option value="民族分离">民族分离</Option>
                    <Option value="反颠覆领域">反颠覆领域</Option>
                    <Option value="其他">其他</Option>
                  </Select>             
                </Col> 
                <Col span="1" class="col-select">涉毒</Col>
                <Col span="4" class="col-select">
                  <Select v-model="formItem1.drugRelatedSelect" clearable>
                    <Option value="走私、贩卖、运输、制造毒品罪">走私、贩卖、运输、制造毒品罪</Option>
                    <Option value="非法持有毒品罪">非法持有毒品罪</Option>
                    <Option value="包庇、窝藏、转移、隐瞒毒品">包庇、窝藏、转移、隐瞒毒品</Option>
                    <Option value="强迫他人吸毒罪">强迫他人吸毒罪</Option>
                    <Option value="其他">其他</Option>
                  </Select>             
                </Col>                                               
            </Row>
        </FormItem> 
        <FormItem class="form-item">
            <Row :gutter="16">
                <Col span="2" class="col-label">其他轨迹</Col>
                <Col span="10" class="col-checkbox">
                    <CheckboxGroup v-model="formItem1.otherTrajectorieType">
                        <Checkbox label="全部">全部</Checkbox>
                        <Checkbox label="民航离港">民航离港</Checkbox>
                        <Checkbox label="旅店住宿">旅店住宿</Checkbox>
                        <Checkbox label="高速客运">高速客运</Checkbox>
                        <Checkbox label="网吧上网">网吧上网</Checkbox>
                    </CheckboxGroup>                
                </Col>
            </Row>
        </FormItem>  
        <FormItem class="form-item">
            <Row :gutter="24">
                <Col span="2" class="col-label">地点</Col>
                <Col span="4">
                    <Input v-model="formItem1.place" placeholder="请输入地点" clearable></Input>
                </Col>
                <Col span="2" class="col-label">开始时间</Col>
                <Col span="4">
                    <DatePicker type="date" placeholder="选择日期" v-model="formItem1.beginDate"></DatePicker>
                </Col>
                <Col span="2" class="col-label">结束时间</Col>
                <Col span="4">
                    <DatePicker type="date" placeholder="选择日期" v-model="formItem1.finishDate"></DatePicker>
                </Col>
                <Col span="4" class="col-label col-btn">
                    <Button type="primary" icon="ios-search" @click="getAnalysis" >分析研判</Button>
                </Col>
                <Col span="4" class="col-label col-btn">
                    <Button type="primary" icon="android-share" @click="addEarlyWarning" >增加预警</Button>
                </Col>                                                
            </Row>
        </FormItem>          
    </Form>       
    <div class="table-box">
      <div class="btn-box">
        <Button class="commom-btn" type="info" icon="clipboard">导出</Button>
      </div>
      <Table class="table-content" border :columns="columns" :data="data"></Table>
      <Page class="table-page" :total="100" show-sizer></Page>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ComprehensiveStudy',
    components:{

    },
    data () {
      return {
        formItem1: {
          startStation1: '',
          endStation1: '',      
          startStation2: '',
          endStation2: '',        
          ticketType: ['全部'],
          lengthOfStay: '', 
          numberOfStops: '', 
          startDate: '', 
          endDate: '',
          personType:['全部'],
          criminalSelect:"",
          economicsSelect:"",
          nationalLnsuranceSelect:"",
          drugRelatedSelect:"",
          otherTrajectorieType: ['全部'],
          place:'',
          beginDate:'',
          finishDate:''
        },
        columns:[
          {
              title: '姓名',
              key: 'name',
              sortable: true
          }, 
          {
              title: '身份证号',
              key: 'idNumber',
              sortable: true
          }, 
          {
              title: '标识',
              key: 'identifier',
              sortable: true
          }, 
          {
              title: '出生年月',
              key: 'birth',
              sortable: true
          }, 
          {
              title: '籍贯',
              key: 'nativePlace',
              sortable: true
          }, 
          {
              title: '行踪轨迹',
              key: 'track',
              sortable: true
          }, 
          {
              title: '操作',
              key: 'operation',
          }
        ],
        data: [
          {
            name: 'John Brown',
            idNumber: 61010112122232343418,
            identifier: 1,
            birth: '2016-10-03',
            nativePlace: '西安',
            track: '',
            operation: ''
          }
        ]
      }
    },
    methods:{
      //分析研判
      getAnalysis(){
       console.log(this.formItem.startStation1);
      },
      //增加预警
      addEarlyWarning(){
       console.log(this.formItem.place);
      }
    }
  };
</script>

<style scoped >
.col-btn{
  width: 120px;
}
.btn-box{
  text-align:right;
}
  .commom-btn{
    margin-right:30px;
  }
.li-box{
  float:left;
}
</style>
