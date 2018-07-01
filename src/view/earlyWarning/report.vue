<template>
  <div class="vue-body">
    <Breadcrumb class="router-box">
      <BreadcrumbItem to="index">首页</BreadcrumbItem>
      <BreadcrumbItem to="ComprehensiveEarlyWarning">综合预警</BreadcrumbItem>
      <BreadcrumbItem to="">新增预警</BreadcrumbItem>
      <BreadcrumbItem>全息报告</BreadcrumbItem>
    </Breadcrumb>
    <div class='panel-body'>
      <div style="padding: 0 20px">
        <div class="infoTitle">
          <Icon type="person"></Icon>
          <span>个人信息</span>
        </div>
          <Row :gutter="10">
            <Col span="12">
              <div class="userInfoTable">
                <ul>
                  <li><span class="infoName">身份证号</span><span class="info">612324198910030506</span></li>
                  <li><span class="infoName">姓名</span><span class="info">张立学</span></li>
                  <li><span class="infoName">籍贯</span><span class="info">陕西省西安市某某区某某镇某某派出所</span></li>
                  <li><span class="infoName">住址</span><span class="info">陕西省西安市某某路某某号</span></li>
                  <li><span class="infoName">重点人类型</span><span class="info">涉毒</span></li>
                  <li><span class="infoName">其它特征</span><span class="info">异常停留</span></li>
                  <br>
                </ul>
            </div>
            </Col>
            <Col span="12">
              <div style="width: 100%;height:300px" ref="wordCloudBox"></div>
            </Col>
          </Row>
        <div class="infoTitle">
          <Icon type="earth"></Icon>
          <span>漫游情况</span>
        </div>
        <Row :gutter="10">
          <Col span="8">
            <fieldset class="fieldset">
              <legend class="legend">漫游地信息</legend>
              <div class="fieldsetCentent">
                <Timeline>
                  <TimelineItem>
                    <Icon type="record" slot="dot"></Icon>
                    <p class="time">2018年3月</p>
                    <p class="content"><Icon type="chevron-right" size="12"></Icon>&nbsp;2018年3月13日22:10由西安到昆明，k166，02车02座。</p>
                    <p class="content"><Icon type="chevron-right" size="12"></Icon>&nbsp;2018年3月15日14:50由昆明到西安，东航MU5723，01A。</p>
                    <p class="content"><Icon type="chevron-right" size="12"></Icon>&nbsp;2018年3月15日18:40由宝鸡到西安，T56，01车01座。</p>
                  </TimelineItem>
                  <TimelineItem>
                    <p class="time">2018年2月</p>
                    <p class="content"><Icon type="chevron-right" size="12"></Icon>&nbsp;2018年2月8日19:04由长沙到西安，K1348，02车02座。</p>
                    <p class="content"><Icon type="chevron-right" size="12"></Icon>&nbsp;2018年2月7日19:45由昆明到长沙，K338，02车02座。</p>
                  </TimelineItem>
                </Timeline>
              </div>
            </fieldset>
          </Col>
          <Col span="8">
          <fieldset class="fieldset">
            <legend class="legend">漫游地位置</legend>
              <ChinaMap :height="chartHeight"></ChinaMap>
          </fieldset>
          </Col>
          <Col span="8">
            <fieldset class="fieldset">
              <legend class="legend">漫游地比重</legend>
                <PieChart :height="chartHeight" :chartData="manyouData" :showLegend="showLegend"></PieChart>
            </fieldset>
          </Col>
        </Row>
        <Row :gutter="10">
          <Col span="8">
          <fieldset class="fieldset">
            <legend class="legend">同乘频繁地区</legend>
            <PieChart :height="chartHeight" :showLegend="showLegend" :chartData="areaList"></PieChart>
          </fieldset>
          </Col>
          <Col span="8">
          <fieldset class="fieldset">
            <legend class="legend">同乘人关系</legend>
            <RelationChart></RelationChart>
          </fieldset>
          </Col>
          <Col span="8">
          <fieldset class="fieldset">
            <legend class="legend">同乘人座次分布</legend>
            <div class="fieldsetCentent">
              <Select v-model="people" style="width:200px" size="small">
                <Option v-for="item in selectList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
              <img :src="src" alt="" width="80%" height="100%">
            </div>
          </fieldset>
          </Col>
        </Row>
      </div>
    </div>
  </div>
</template>

<script>
    import 'echarts-wordcloud'
    import ChinaMap from '@/components/chartsTools/ChinaMap' //中国地图
    import PieChartMultipleData from '@/components/chartsTools/PieChartMultipleData' //多数据环形图
    import PieChart from '@/components/chartsTools/PieChart' //饼图
    import RelationChart from '@/components/chartsTools/RelationChart' //人员关系图

    export default {
        name: "",
        components:{ChinaMap,PieChartMultipleData,PieChart,RelationChart},
        data(){
          return{
            wordCloudChart:null,
            wordCloudList:[
              {name:'张立学',value:'111'},
              {name:'成都3次',value:'66'},
              {name:'32岁',value:'666'},
              {name:'无目的乘车3次',value:'234'},
              {name:'陕西某市某县某街道',value:'234'},
              {name:'同行人5人',value:'324'},
              {name:'昆明2次',value:'122'},
            ],
            chartHeight:'300px',
            showLegend:true,
            manyouData: [
              {datatype:"北京",value:200},
              {datatype:"上海",value:100}
              ],
            areaList:[
              {datatype:"西安",value:5},
              {datatype:"渭南",value:12},
              {datatype:"三门峡",value:8},
              {datatype:"神木",value:6},
              {datatype:"北京",value:2},
            ],
            people:'2',
            selectList:[
              {value: '1',label: 'k261-2018.1.16'},
              {value: '2',label: 'k1555-2018.2.5'},
            ],
            src: require("../../assets/images/demo.png")
          }
        },
        methods:{
          initWordCloudChart(){
            this.wordCloudChart = this.$echarts.init(this.$refs.wordCloudBox);
            this.wordCloudChart.clear();
            let option = {
              title: {
                text: '',
                //link: 'https://www.baidu.com/s?wd=' + encodeURIComponent('ECharts'),
                x: 'center',
                textStyle: {
                  fontSize: 23
                }
              },
              backgroundColor: '#F7F7F7',
              tooltip: {
                show: true
              },
             /* toolbox: {
                feature: {
                  saveAsImage: {
                    iconStyle: {
                      normal: {
                        color: '#FFFFFF'
                      }
                    }
                  }
                }
              },*/
              series: [{
                name: '',
                type: 'wordCloud',
                //size: ['9%', '99%'],
                sizeRange: [6, 66],
                //textRotation: [0, 45, 90, -45],
                rotationRange: [-45, 90],
                //shape: 'circle',
                textPadding: 0,
                autoSize: {
                  enable: true,
                  minSize: 6
                },
                textStyle: {
                  normal: {
                    color: function() {
                      return 'rgb(' + [
                        Math.round(Math.random() * 160),
                        Math.round(Math.random() * 160),
                        Math.round(Math.random() * 160)
                      ].join(',') + ')';
                    }
                  },
                  emphasis: {
                    shadowBlur: 10,
                    shadowColor: '#333'
                  }
                },
                data: []
              }]
            };
            option.series[0].data = this.wordCloudList;
            this.wordCloudChart.setOption(option);
            window.addEventListener('resize', () => {
              this.wordCloudChart.resize();
            })
          }
        },
        mounted(){
          this.$nextTick(()=>{
            this.initWordCloudChart()
          })
        }
    }
</script>

<style scoped>
  .infoTitle{
    border-bottom: 1px solid #e9eaec;
    font-size: 16px;
    height: 30px;
    margin: 10px 0;
    font-weight: bold;
  }
  .userInfoTable{
    margin: 0;
    background: #F7F7F7;
    height: 300px;
    padding: 20px;
  }
  .userInfoTable ul{text-align: center;}
  .userInfoTable ul li{display: inline-block;font-size: 0;}
  .userInfoTable .infoName{
    font-size: 16px;
    display: inline-block;
    font-weight: bold;
    width: 80px;
    text-align: right;
    vertical-align: top;
  }
  .userInfoTable .info{
    font-size: 16px;
    display: inline-block;
    text-align: left;
    font-weight: normal;
    width: 300px;
    padding-left: 10px;
    color: #5a5a5a;
    vertical-align: top;
    word-break: break-all;
  }
  .fieldsetCentent{padding:20px;height: 300px;overflow-x:auto}
  .time{font-weight: bold;font-size: 14px}
  .content{padding-left: 5px;font-size: 14px}
</style>
