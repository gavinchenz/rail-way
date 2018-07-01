<template>
  <div class="vue-body">
    <Breadcrumb class="router-box">
      <BreadcrumbItem to="/index">首页</BreadcrumbItem>
      <BreadcrumbItem to="/ComprehensiveEarlyWarning">综合预警</BreadcrumbItem>
      <BreadcrumbItem>新增预警</BreadcrumbItem>
    </Breadcrumb>
    <div class='panel-body'>
      <Form ref="addWarningForm" :model="addWarningForm" :label-width="100" inline>
            <Card>
            <FormItem label="起始站">
              <Input v-model="addWarningForm.startStation" placeholder="请选择起始站" style="width: 200px"></Input>
            </FormItem>
            <FormItem label="结束站">
              <Input v-model="addWarningForm.endStation" placeholder="请选择结束站" style="width: 200px"></Input>
            </FormItem>
            <br>
            <FormItem label="时间范围">
                <DatePicker type="daterange" :value="addWarningForm.dateTime" split-panels placeholder="时间范围" style="width: 200px"></DatePicker>
            </FormItem>
            <FormItem label="停留时长">
                <TimePicker format="HH:mm" :value="addWarningForm.stopStay" placeholder="停留时长" style="width: 120px"></TimePicker>
            </FormItem>
            <FormItem label="停留次数">
                <InputNumber :max="10" :min="1" v-model="addWarningForm.stopNum"></InputNumber>
            </FormItem>
              <br>
            <FormItem label="售票类型">
                <CheckboxGroup v-model="addWarningForm.ticketType" size="large">
                  <Checkbox label="0">
                    <span>站售</span>
                  </Checkbox>
                  <Checkbox label="1">
                    <span>代售</span>
                  </Checkbox>
                  <Checkbox label="2">
                    <span>网售</span>
                  </Checkbox>
                  <Checkbox label="3">
                    <span>12306订票</span>
                  </Checkbox>
                  <Checkbox label="4">
                    <span>证票核验</span>
                  </Checkbox>
                </CheckboxGroup>
              </FormItem>
              <p style="width: 100%;text-align: left">
                <a @click="isMoreForm = !isMoreForm">设置更多...</a>
              </p>
              <div style="margin-top: 10px" v-if="isMoreForm">
            <FormItem label="人员类型">
              <CheckboxGroup v-model="addWarningForm.peopleType" size="large">
                <Checkbox label="0">
                  <span>普通旅客</span>
                </Checkbox>
                <Checkbox label="1">
                  <span>涉毒</span>
                </Checkbox>
                <Checkbox label="2">
                  <span>涉恐</span>
                </Checkbox>
                <Checkbox label="3">
                  <span>涉票</span>
                </Checkbox>
                <Checkbox label="4">
                  <span>侵财</span>
                </Checkbox>
                <Checkbox label="5">
                  <span>维稳</span>
                </Checkbox>
              </CheckboxGroup>
            </FormItem>
            <br>
            <FormItem label="人员高危类别">
              <Select v-model="addWarningForm.dangerType" style="width:200px">
                <Option v-for="item in dangerTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
            <FormItem label="经济">
              <Select v-model="addWarningForm.economic" style="width:200px">
                <Option v-for="item in economicList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
            <FormItem label="国宝">
              <Select v-model="addWarningForm.NS" style="width:200px">
                <Option v-for="item in NSList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
            <FormItem label="涉毒">
              <Select v-model="addWarningForm.drugRelated" style="width:200px">
                <Option v-for="item in drugRelatedList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
            <br>
            <FormItem label="地点">
              <Input v-model="addWarningForm.place" placeholder="请选择地点" style="width: 200px"></Input>
            </FormItem>
            <FormItem label="时间范围">
              <DatePicker type="daterange" :value="addWarningForm.dateTime1" split-panels placeholder="时间范围" style="width: 200px"></DatePicker>
            </FormItem>
            <br>
            <FormItem label="其他轨迹">
              <CheckboxGroup v-model="addWarningForm.track" size="large">
                <Checkbox label="0">
                  <span>民航离港</span>
                </Checkbox>
                <Checkbox label="1">
                  <span>旅店住宿</span>
                </Checkbox>
                <Checkbox label="2">
                  <span>高速客运</span>
                </Checkbox>
                <Checkbox label="3">
                  <span>网吧上网</span>
                </Checkbox>
              </CheckboxGroup>
            </FormItem>
          </div>
              <p style="text-align: center">
                <Button type="success" @click="fxypFn"><Icon type="load-b"></Icon>&nbsp;分析研判</Button>
                <Button type="primary" @click="addYjFn"><Icon type="plus-round"></Icon>&nbsp;添加预警</Button>
              </p>
            </Card>
      </Form>
      <div style="padding: 5px 0;text-align: right"><Button type="primary" :disabled="disabled"><Icon type="share"></Icon>&nbsp;抽取到详单库</Button></div>
      <Table stripe :columns="columns" :data="tableList" :loading="showLoading"></Table>
    </div>
  </div>
</template>
<script>
  export default {
    name: "AddWarning",
    data() {
      return {
        isMoreForm:false,
        showLoading:false,
        disabled:true,
        dangerTypeList:[
          {value: '1', label: '杀人'},
          {value: '2', label: '放火'},
          {value: '3', label: '故意伤害'},
          {value: '4', label: '诈骗'},
          {value: '5', label: '危害公共安全'},
          {value: '6', label: '盗窃'},
          {value: '7', label: '利用网络犯罪'},
          {value: '8', label: '投放危险物质'},
          {value: '9', label: '涉抢'},
          {value: '10',label: '涉爆'},
        ],
        economicList:[
          {value: '1', label: '走私'},
          {value: '2', label: '金融诈骗'},
          {value: '3', label: '侵犯知识产权'},
          {value: '4', label: '扰乱市场秩序'},
          {value: '5', label: '生产、销售有毒有害食品'},
        ],
        drugRelatedList:[
          {value: '1', label: '走私、贩卖、运输、制造毒品罪'},
          {value: '2', label: '非法持有毒品罪'},
          {value: '3', label: '包庇、窝藏、转移、隐瞒毒品'},
          {value: '4', label: '强迫他人吸毒罪'},
        ],
        NSList:[
          {value: '1', label: '邪教组织'},
          {value: '2', label: '暴力恐怖活动'},
          {value: '3', label: '非法宗教'},
          {value: '4', label: '境外非法组织'},
          {value: '5', label: '境外反动媒体'},
          {value: '6', label: '民族分离'},
          {value: '7', label: '反颠覆领域'},
        ],
        addWarningForm: {
          startStation:'',
          endStation:'',
          ticketType:[],
          stopStay:'',
          stopNum:null,
          dateTime:'',
          peopleType:[],
          dangerType:'',
          economic:'',
          NS:'',
          drugRelated:'',
          track:[],
          place:'',
          dateTime1:''
        },
        columns:[
          {type: 'selection',width: 60,align: 'center'},
          {type: 'index',title:'序号',width: 60,align: 'center'},
          {title:'姓名',key:'name',width: 100,align: 'left'},
          {title:'身份证号',key:'carId',width: 200,align: 'left'},
          {title:'标识',key:'type',width: 150,align: 'left'},
          {title:'出生年月',key:'birth',width: 150,align: 'left'},
          {title:'籍贯',key:'jiguan',minWidth:150,align: 'left'},
          {title:'行踪轨迹',key:'track',minWidth:200,align: 'left'},
          {title:'操作',key:'action',width: 250,align: 'center',
            render: (h, params) => {
              return h('div', [
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
                      this.viewInfo(params.index)
                    }
                  }
                }, '详单查看'),
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.viewReportFn(params)
                    }
                  }
                }, '全息报告'),
              ]);
            }
          }
        ],
        tableList:[]
      }
    },
    methods:{
      //更多表单
      moreFormFn(){
        this.isMoreForm = true;
      },
      //分析研判加载表格
      fxypFn(){
        this.showLoading =true;
        let arr = [
          {name:'测试4',  carId:'612324198910030506',type:'涉毒',birth:'1989年10月03日',jiguan:'陕西省西安市碑林区某某街道',track:'西安到榆林，榆林到西安，西安到北京，北京到西安，西安到青岛'},
          {name:'测试5',  carId:'612324198910030506',type:'涉毒',birth:'1989年10月03日',jiguan:'陕西省西安市碑林区某某街道',track:'西安到榆林，榆林到西安，西安到北京，北京到西安，西安到青岛'},
          {name:'测试7',  carId:'612324198910030506',type:'涉毒',birth:'1989年10月03日',jiguan:'陕西省西安市碑林区某某街道',track:'西安到榆林，榆林到西安，西安到北京，北京到西安，西安到青岛'},
          {name:'测试4',  carId:'612324198910030506',type:'涉毒',birth:'1989年10月03日',jiguan:'陕西省西安市碑林区某某街道',track:'西安到榆林，榆林到西安，西安到北京，北京到西安，西安到青岛'},
          {name:'测试14', carId:'612324198910030506',type:'涉毒',birth:'1989年10月03日',jiguan:'陕西省西安市碑林区某某街道',track:'西安到榆林，榆林到西安，西安到北京，北京到西安，西安到青岛'},
          {name:'测试4',  carId:'612324198910030506',type:'涉毒',birth:'1989年10月03日',jiguan:'陕西省西安市碑林区某某街道',track:'西安到榆林，榆林到西安，西安到北京，北京到西安，西安到青岛'},
          {name:'测试4',  carId:'612324198910030506',type:'涉毒',birth:'1989年10月03日',jiguan:'陕西省西安市碑林区某某街道',track:'西安到榆林，榆林到西安，西安到北京，北京到西安，西安到青岛'},
          {name:'测试4',  carId:'612324198910030506',type:'涉毒',birth:'1989年10月03日',jiguan:'陕西省西安市碑林区某某街道',track:'西安到榆林，榆林到西安，西安到北京，北京到西安，西安到青岛'},
          {name:'测试4',  carId:'612324198910030506',type:'涉毒',birth:'1989年10月03日',jiguan:'陕西省西安市碑林区某某街道',track:'西安到榆林，榆林到西安，西安到北京，北京到西安，西安到青岛'},
          {name:'测试24', carId:'612324198910030506',type:'涉毒',birth:'1989年10月03日',jiguan:'陕西省西安市碑林区某某街道',track:'西安到榆林，榆林到西安，西安到北京，北京到西安，西安到青岛'},
          {name:'测试4',  carId:'612324198910030506',type:'涉毒',birth:'1989年10月03日',jiguan:'陕西省西安市碑林区某某街道',track:'西安到榆林，榆林到西安，西安到北京，北京到西安，西安到青岛'},
          {name:'测试4',  carId:'612324198910030506',type:'涉毒',birth:'1989年10月03日',jiguan:'陕西省西安市碑林区某某街道',track:'西安到榆林，榆林到西安，西安到北京，北京到西安，西安到青岛'},
          {name:'测试4',  carId:'612324198910030506',type:'涉毒',birth:'1989年10月03日',jiguan:'陕西省西安市碑林区某某街道',track:'西安到榆林，榆林到西安，西安到北京，北京到西安，西安到青岛'},
          {name:'测试4',  carId:'612324198910030506',type:'涉毒',birth:'1989年10月03日',jiguan:'陕西省西安市碑林区某某街道',track:'西安到榆林，榆林到西安，西安到北京，北京到西安，西安到青岛'},
          {name:'测试4',  carId:'612324198910030506',type:'涉毒',birth:'1989年10月03日',jiguan:'陕西省西安市碑林区某某街道',track:'西安到榆林，榆林到西安，西安到北京，北京到西安，西安到青岛'}
        ];
        this.tableList = arr;
        this.showLoading =false;
        this.disabled = false;
      },
      //查看详单
      viewInfo(){},
      //全息报告
      viewReportFn(params){
        this.$router.push({path:'/report'})
      },
      //标记人员
      markers(){},
      //添加预警
      addYjFn(){
        this.$router.push({path:'/ComprehensiveEarlyWarning'})
      }
    }
  }
</script>

<style scoped>

</style>
