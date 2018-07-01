<template>
  <div class="vue-body">
    <Breadcrumb class="router-box">
      <BreadcrumbItem to="index">首页</BreadcrumbItem>
      <BreadcrumbItem>数据接入</BreadcrumbItem>
      <BreadcrumbItem>数据接入情况</BreadcrumbItem>
    </Breadcrumb>
    <div class='panel-body'>
      <Card style="margin-bottom: 20px" dis-hover>
        <p slot="title">
          <Icon type="pie-graph" color="#0580f2" size="18"></Icon>
          <span style="font-size: 16px">实名制数据接入情况</span>
        </p>
        <Row type="flex" justify="space-between" >
          <Col span="5">
            <PieChartSingleData :height="chartHeight" :chartData="totalData"></PieChartSingleData>
          </Col>
          <Col span="5">
          <PieChartMultipleData :height="chartHeight" :chartData="sameDayData" :showLegend="true"></PieChartMultipleData>
          </Col>
          <Col span="14">
          <div style="width: 100%;height:300px" ref="reakNameBox"></div>
          </Col>
        </Row>
      </Card>
      <Card dis-hover>
        <p slot="title">
          <Icon type="pie-graph" color="#0580f2" size="18"></Icon>
          <span style="font-size: 16px">其他行踪数据接入情况</span>
        </p>
        <Row type="flex" justify="space-between" >
          <Col span="5">
            <PieChartSingleData :height="chartHeight"></PieChartSingleData>
          </Col>
          <Col span="5">
          <PieChartMultipleData :height="chartHeight" :showLegend="true"></PieChartMultipleData>
          </Col>
          <Col span="14">
          <div style="width: 100%;height:300px" ref="otherWhereaboutsBox"></div>
          </Col>
        </Row>
      </Card>
    </div>
  </div>
</template>

<script>
  import {queryDataaccesscount} from  '@/service/getData'
  import PieChartSingleData from '@/components/chartsTools/PieChartSingleData'
  import PieChartMultipleData from '@/components/chartsTools/PieChartMultipleData'
  import {process_error} from '@/config/process_request_conf' //请求成功返回的状态
  export default {
    name: 'DataAccessSituation',
    components: {PieChartSingleData, PieChartMultipleData},
    data() {
      return {
        reakNameData: {
          chart: null,
          title: '',
          data: {
            list: ['2018-04-02', '2018-04-03', '2018-04-04', '2018-04-05', '2018-04-06', '2018-04-07', '2018-04-08'],
            total: [112, 142, 132, 225, 34, 245, 142, 115, 189, 123, 189, 12, 65, 43, 78, 78, 78],
            access: [89, 42, 32, 125, 14, 115, 142, 95, 89, 113, 119, 2, 65, 24, 12, 25, 23]
          }
        },
        otherWhereabouts: {
          chart: null,
          title: '',
        },
        chartHeight: '300px',
        chartWidth: '100%',
        options: {
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
          grid: {
            left: '5%',
            right: '4%',
            bottom: '0',
            top: 50,
            padding: '0 0 10 0',
            containLabel: true,
          },
        },
        totalData:{},//数据总量
        sameDayData:[], //当日数据对比
        day7RealNameList:[] //近七天实名制
      }
    },
    methods: {
      //请求
      async getChart(){
        await queryDataaccesscount().then(res=>{
          if (res.statusCode !== 200) return process_error(res);
          this.totalData = res.data.sjzl[0];
          this.sameDayData = res.data.drsjzb;
          this.day7RealNameList = res.data.qtsmzsj;
          console.log(this.day7RealNameList);
          this.initReakNameChart();
        })
      },
      //实名制数据接入情况近七天柱状图
      initReakNameChart() {
        let xArr = [],validArr = [],totalArr=[],invalidArr=[];
        this.day7RealNameList.forEach((item,i)=>{
          totalArr.push(item.total);
          xArr.push(item.date);
          validArr.push(item.valid);
          invalidArr.push(item.invalid);
        });
        this.options.tooltip.data = ['总数','有效数据','无效数据'];
        this.reakNameData['chart'] = this.$echarts.init(this.$refs.reakNameBox);
        this.reakNameData['chart'].clear();
        let option = {
          title: {
            text: '近七天实名制数据接入量',
            x: '4%',
            y: '0',
            textStyle: {color: '#666', fontSize: 16}
          },

          tooltip: this.options.tooltip,//提示框组件,
          grid: this.options.grid,
          legend: {//图例组件，颜色和名字
            right: 10,
            top: 10,
            itemGap: 16,
            itemWidth: 18,
            itemHeight: 10,
            data: ['有效数据','无效数据'],
            textStyle: {color: '#666'}
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
                rotate: 0
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
                    val = value + '万'
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
              name: '有效数据',
              type: 'bar',
              stack: '总量',
              data: validArr,
              barWidth: '30%',
              barGap: '10%',//柱间距离
              label: {//图形上的文本标签
                normal: {
                  show: true,
                  position: 'insideTop',
                  textStyle: {
                    color: '#22435a',
                  },
                },
              },
              itemStyle: {//图形样式
                normal: {
                  barBorderRadius: [0, 0, 0, 0],
                  color: '#4aa2d6'
                },
              },
            },
            {
              name: '无效数据',
              type: 'bar',
              stack: '总量',
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
                  barBorderRadius: [0, 0, 0, 0],
                  color: '#cc5950'
                },
              },
            },
            {
              name: '总数据量',
              type: 'line',
              stack: '总数据量',
              data: totalArr,
              label: {//图形上的文本标签
                normal: {
                  show: true,
                  position: 'insideTop',
                  offset:[0,-30],
                  textStyle: {
                    color: '#0e19b3'
                  },
                },
              },
              itemStyle: {//图形样式
                normal: {
                  barBorderRadius: 0,
                  color: '#0e19b3'
                },
              }
            }
          ]
        };
        this.reakNameData['chart'].setOption(option);
      },
      //其他行踪数据接入情况近七天柱状图
      initOtherWhereabouts() {
        this.otherWhereabouts['chart'] = this.$echarts.init(this.$refs.otherWhereaboutsBox);
        this.otherWhereabouts['chart'].clear();
        let option = {
          title: {
            text: '近七天实名制数据接入量',
            x: '4%',
            y: '0',
            textStyle: {color: '#666', fontSize: 16}
          },
          tooltip: this.options.tooltip,
          grid: this.options.grid,
          legend: {//图例组件，颜色和名字
            right: 10,
            top: 10,
            itemGap: 16,
            itemWidth: 18,
            itemHeight: 10,
            data: [
              {name: '有效数据'},
              {name: '无效数据'}
            ],
            textStyle: {color: '#666'}
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: true,//坐标轴两边留白
              data: this.reakNameData.data.list,
              axisLabel: { //坐标轴刻度标签的相关设置。
                interval: 0,//设置为 1，表示『隔一个标签显示一个标签』
                margin: 5,
                textStyle: {color: '#666'},
                rotate: 0
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
                    val = value + '万'
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
              name: '有效数据',
              type: 'bar',
              stack: '总量',
              data: this.reakNameData.data.total,
              barWidth: '30%',
              barGap: '10%',//柱间距离
              label: {//图形上的文本标签
                normal: {
                  show: true,
                  position: 'insideTop',
                  textStyle: {
                    color: '#fff'
                  },
                },
              },
              itemStyle: {//图形样式
                normal: {
                  barBorderRadius: [0, 0, 0, 0],
                  color: '#2d87c2'
                },
              },
            },
            {
              name: '无效数据',
              type: 'bar',
              stack: '总量',
              data: this.reakNameData.data.access,
              barWidth: '20%',
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
                  color: '#cc5950'
                },
              },
            }
          ]
        };
        this.otherWhereabouts['chart'].setOption(option);
      }
    },
    mounted() {
      this.getChart();
      this.initOtherWhereabouts();
      window.addEventListener('resize', () => {
        this.reakNameData['chart'].resize();
        this.otherWhereabouts['chart'].resize();
      })
    }
  };
</script>

<style scoped>
</style>
