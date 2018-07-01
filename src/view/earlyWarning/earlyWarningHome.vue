<template>
  <div class="vue-body">
    <Breadcrumb class="router-box">
      <BreadcrumbItem to="/index">首页</BreadcrumbItem>
      <BreadcrumbItem to="">比对预警</BreadcrumbItem>
    </Breadcrumb>
    <div class='panel-body'>
      <div class="layoutBox">
        <div class="layoutItem">
          <Card class="chartCard" style="height: 255px">
            <div class="chartTitle">西安</div>
            <PieChart :height="chartHeight" :chartData="list1"></PieChart>
          </Card>
          <Card class="chartCard"  style="height: 255px">
            <div class="chartTitle">安康</div>
            <PieChart :height="chartHeight" :chartData="list2"></PieChart>
          </Card>
          <Card class="chartCard"  style="height: 255px">
            <div class="chartTitle">延安</div>
            <PieChart :height="chartHeight" :chartData="list3"></PieChart>
          </Card>
        </div>
        <div class="layoutItem1">
          <Card style="height: auto">
            <div>
              <div class="barBox" ref="bar1" style="margin-bottom: 50px"></div>
            </div>
<!--             <Form :model="searchData" ref="searchForm" class="header-from">
              <FormItem class="form-item">
                <Row :gutter="24">
                  <Col span="1" class="col-label">省/市/区</Col>
                  <Col span="8">
                    <Cascader :data="areaData" v-model="searchData.ssq" change-on-select></Cascader>
                  </Col>
                  <Col span="2" class="col-label">类别</Col>
                  <Col span="6">
                    <Select v-model="searchData.lb" clearable>
                      <Option value="涉毒">涉毒</Option>
                      <Option value="涉票">涉票</Option>
                      <Option value="盗窃">盗窃</Option>
                      <Option value="涉恐">涉恐</Option>
                    </Select>  
                  </Col>      
                </Row>
              </FormItem>
            </Form>  --> 
            <div>
              <div class="barBox" style="height: 400px" ref="bar2"></div>
            </div>
          </Card>
        </div>
        <div class="layoutItem">
          <Card class="chartCard"  style="height: 255px">
            <div class="chartTitle">类别</div>
            <PieChart :height="chartHeight" :chartData="list5"></PieChart>
          </Card>          
          <Card class="chartCard"  style="height: 255px">
            <div class="chartTitle">籍贯</div>
            <PieChart :height="chartHeight" :chartData="list4"></PieChart>
          </Card>
          <Card class="chartCard"  style="height: 255px">
            <div class="bar3Box" ref="bar3"></div>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import PieChart from '@/components/chartsTools/PieChart' //饼图
  import NationalCityList from '../../assets/script/nationalCityList';//省市区三级联动表单
  export default {
    name: "EarlyWarningHome",
    components: {PieChart},
    data(){
      return{
        areaData:NationalCityList,
        searchData: {//查询条件
          ssq:[],
          lb: []
        },
        bar1Chart:null,
        bar2Chart:null,
        bar3Chart:null,
        chartHeight: '200px',
        list1:[
          {datatype:'咸阳',value:10},
          {datatype:'西安北',value:20},
          {datatype:'西安',value:50},
        ],
        list2:[
          {datatype:'旬阳',value:20},
          {datatype:'安康',value:40}
        ],
        list3:[
          {datatype:'延安',value:100},
          {datatype:'神木',value:20},
        ],
        list4:[
          {datatype:'陕西省',value:100},
          {datatype:'重庆市',value:20},
          {datatype:'新疆',value:50},
        ],
        list5:[
          {datatype:'涉毒',value:100},
          {datatype:'涉恐',value:20},
          {datatype:'盗窃',value:10},
          {datatype:'涉票',value:50},
        ],
        resourcesData: [1241,4231,4313], //局管
        resourcesXData:['西安','安康','延安'], //局管
        importPeopleList: [ {
          "name" : null,
          "text" : 0.0,
          "value" : 0,
          "date" : "2017-04-20",
          "datatype" : null,
          "total" : 1129338,
          "valid" : 1119338,
          "invalid" : 10000
        }, {
          "name" : null,
          "text" : 0.0,
          "value" : 0,
          "date" : "2017-04-19",
          "datatype" : null,
          "total" : 207374,
          "valid" : 207374,
          "invalid" : 5000
        }, {
          "name" : null,
          "text" : 0.0,
          "value" : 0,
          "date" : "2017-04-18",
          "datatype" : null,
          "total" : 205090,
          "valid" : 205090,
          "invalid" : 15000
        }, {
          "name" : null,
          "text" : 0.0,
          "value" : 123123,
          "date" : "2017-04-17",
          "datatype" : null,
          "total" : 209587,
          "valid" : 209587,
          "invalid" : 10200
        }, {
          "name" : null,
          "text" : 0.0,
          "value" : 0,
          "date" : "2017-04-16",
          "datatype" : null,
          "total" : 235392,
          "valid" : 235392,
          "invalid" : 2600
        }, {
          "name" : null,
          "text" : 0.0,
          "value" : 0,
          "date" : "2017-04-15",
          "datatype" : null,
          "total" : 227491,
          "valid" : 227491,
          "invalid" : 500
        }, {
          "name" : null,
          "text" : 0.0,
          "value" : 0,
          "date" : "2017-04-14",
          "datatype" : null,
          "total" : 250642,
          "valid" : 250642,
          "invalid" : 520
        } ]

      }
    },
    methods:{
      initBar1chart(){
        this.bar1Chart = this.$echarts.init(this.$refs.bar1);
        this.bar1Chart.clear();
        let option = 
          {
            // backgroundColor:'rgba(0,0,0,.1)',
            title: {
              text: '局管趋势',
              x: '4%',
              y: '0',
              textStyle: {color: '#666', fontSize: 16}
            },
            tooltip:{
              trigger:'axis',
              axisPointer:{
                type:'line',
                lineStyle:{
                  color:'#ff66ee',
                  width:1,
                  type:'solid'
                }
              }
            },
            toolbox:{//右上角工具条
              show:true,
              feature:{
                mark:{show:true},
                // dataView:{show:true,readOnly:true},//数据视图
                magicType:{show:true,type:['line','bar']},//折现与柱状的切换
                restore:{show:true},//重置
                saveAsImage:{show:true}//保存为图片
              }
            },
            legend:{
              data:['西安','安康','延安']
            },
            grid:{
              left:'3%',
              right:'4%',
              bottom:'3%',
              containLabel:true
            },
            xAxis:{
              type:'category',
              data:['2017-04-20','2017-04-19','2017-04-18','2017-04-17','2017-04-16','2017-04-15','2017-04-14'],
              // axisLabel:{
              //   rotate:30,
              //   interval:0
              // }
            },
            yAxis:{
              type:'value',
              axisLine: {//坐标轴轴线相关设置
                lineStyle: {color: '#666'}
              }
            },
            series:[
              {
                name:'西安',
                type:'bar',
                stack:'总量',
                label:{
                  normal:{
                    show:true,
                    position:'insideRight',
                    textBorderWidth:0,
                    color:'#000'                 
                  }
                },
                data:[120,320,230,148,234,529,110],
                color:"rgba(0, 102, 153,1)"
              },
              {
                name:'安康',
                type:'bar',
                stack:'总量',
                label:{
                  normal:{
                    show:true,
                    position:'insideRight',
                    textBorderWidth:0,
                    color:'#000'                      
                  }
                },
                data:[230,120,320,231,342,156,112],
                color:"rgba(50, 180, 147,1)"
              },
              {
                name:'延安',
                type:'bar',
                stack:'总量',
                label:{
                  normal:{
                    show:true,
                    position:'insideRight',
                    textBorderWidth:0,
                    color:'#000'                   
                  }
                },
                data:[150,80,210,310,299,423,711],
                color:"rgba(152, 156, 255,1)"
              }
            ]
          };
        this.bar1Chart.setOption(option);
      },
      initBar2Chart() {
        let xArr = [],validArr = [],totalArr=[],invalidArr=[];
        this.importPeopleList.forEach((item,i)=>{
          totalArr.push(item.total);
          xArr.push(item.date);
          validArr.push(item.valid);
          invalidArr.push(item.invalid);
        });
        this.bar2Chart = this.$echarts.init(this.$refs.bar2);
        this.bar2Chart.clear();      
        let option = {
          title: {
            text: '重点人预警',
            x: '4%',
            y: '0',
            textStyle: {color: '#666', fontSize: 16}
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
              label: {
                backgroundColor: '#6a7985'
              }
            },
            textStyle: {
              color: '#fff',
              fontStyle: 'normal',
              fontFamily: '微软雅黑',
              fontSize: 12,
            }
          },
          toolbox:{//右上角工具条
            show:true,
            feature:{
              mark:{show:true},
              // dataView:{show:true,readOnly:true},//数据视图
              magicType:{show:true,type:['line','bar']},//折现与柱状的切换
              restore:{show:true},//重置
              saveAsImage:{show:true}//保存为图片
              // brush:{
              //   type:[
              //     'rect','polygon','lineX','lineY','keep','clear'
              //   ]
              // }
            }
          },          
          grid: {
            borderWidth: 0,
            top: 50,
            bottom: 55,
            left:60
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: true,//坐标轴两边留白
              data: xArr,
              axisLabel: { //坐标轴刻度标签的相关设置。
                interval: 0,//设置为 1，表示『隔一个标签显示一个标签』
                margin: 5,
                textStyle: {color: '#666'},
                rotate: 40
              },
              axisTick: {//坐标轴刻度相关设置。
                show: false,
              },
              axisLine: {//坐标轴轴线相关设置
                lineStyle: {color: '#666'}
              },
              splitLine: { //坐标轴在 grid 区域中的分隔线。
                show: false,
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              splitNumber: 5,
              axisLabel: {
                textStyle: {
                  color: '#666',
                  fontStyle: 'normal',
                  fontFamily: '微软雅黑',
                  fontSize: 12,
                },
                formatter: function (value, index) {
                  let val;
                  if (index === 0) {
                    val = value
                  } else {
                    val = value
                  }
                  return val
                }
              },
              axisLine: {
                lineStyle: {color: '#32346c'}
              },
              axisTick: {show: true},
              splitLine: {
                show: true,
                lineStyle: {
                  color: ['#32346c'],
                  opacity: 0.4
                }
              }
            }
          ],
          series: [
            {
              name: '近七天到站/发站人数',
              type: 'bar',
              data: invalidArr,
              barWidth: '30%',
              barGap: '10%',//柱间距离
              label: {//图形上的文本标签
                normal: {
                  show: true,
                  position: 'top',
                  textStyle: {
                    color: '#cc5950'
                  },
                },
              },
              itemStyle: {//图形样式
                normal: {
                  barBorderRadius: [5, 5, 0, 0],
                  color: '#2a67cc'
                },
              },
            }
          ]
        };
        this.bar2Chart.setOption(option);
      },
      initBar3Chart() {
        let xArr = [],validArr = [],totalArr=[],invalidArr=[];
        this.importPeopleList.forEach((item,i)=>{
          totalArr.push(item.total);
          xArr.push(item.date);
          validArr.push(item.valid);
          invalidArr.push(item.invalid);
        });
        this.bar3Chart = this.$echarts.init(this.$refs.bar3);
        this.bar3Chart.clear();      
        let option = {
          // backgroundColor:'rgba(0,0,0,.1)',
          title: {
            text: '比对情况与核查',
            x: '0',
            y: '0',
            textStyle: {color: '#666', fontSize: 16}
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
            type: 'shadow',
              label:{
                show:true
              }
            },
            textStyle: {
              color: '#fff',
              fontStyle: 'normal',
              fontFamily: '微软雅黑',
              fontSize: 12,
            }
          },
          toolbox:{//右上角工具条
            show:true,
            feature:{
              mark:{show:true},
              // dataView:{show:true,readOnly:true},//数据视图
              magicType:{show:true,type:['line','bar']},//折现与柱状的切换
              restore:{show:true},//重置
              saveAsImage:{show:true}//保存为图片
            },
            itemSize:14//图标大小
          },
          legend:{
            left:'150',//图例与视图左边的距离
            orient:'vertical',//图例文本对齐方式：horizontal | vertical
            data:['重点人员','核查人员']
          },
          grid: {
            left:'3%',
            right:'4%',
            bottom:'3%',
            containLabel:true
          },
          xAxis: {
            type:'category',
            data:['2017-04-20','2017-04-19','2017-04-18','2017-04-17','2017-04-16','2017-04-15','2017-04-14'],
          },
          yAxis: {
            type:'log',
            data:['重点人员','核查人员']
          },
          series: [
            {
              name:'重点人员',
              type:'bar',
              data:[10000,12345,10342,9928,8734,11212,13245],
              label:{
                normal:{
                  show:false,
                  position:'insideRight',
                  color:'#000',
                  textBorderWidth:0
                }
              },              
              color:"rgba(0, 102, 153,1)"                 
            },
            {
              name:'核查人员',
              type:'bar',
              data:[8000,9112,7934,6788,7002,9111,10142],
              label:{
                normal:{
                  show:false,
                  position:'insideLeft',
                  color:'#000',
                  textBorderWidth:0                  
                }
              },              
              color:"rgba(50, 180, 147,1)",
              barGap:'0%'//柱子间间距设置
            }
          ]
        };
        this.bar3Chart.setOption(option);
      },
    },
    mounted(){
      this.$nextTick(()=>{
        this.initBar1chart();
        this.initBar2Chart();
        this.initBar3Chart();
         window.addEventListener('resize', ()=> {
           this.bar1Chart.resize();
           this.bar2Chart.resize();
           this.bar3Chart.resize();
         })
      });
      this.getSearchData()
    }
  };
</script>

<style scoped>
  .layoutBox {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
  }

  .layoutBox .layoutItem {
    flex-grow: 0;
    flex-shrink: 0;
    width: 400px;
  }

  .layoutBox .layoutItem1 {
    width: 100%;
    flex-grow: 1;
    flex-shrink: 1;
    padding: 0 10px;
  }
  .chartCard{
    margin-bottom: 10px;
  }
  .chartTitle{
    font-size: 16px;
    font-weight: bold;
    color: #0A2753;
    border-bottom: 1px solid #e9eaec;
  }
  .barBox{
    width: 90%;
    margin: 0 auto;
    height: 300px;
  }
  .bar3Box{
    width: 100%;
    height:220px ;
  }
</style>
