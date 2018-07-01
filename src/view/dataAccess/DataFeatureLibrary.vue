<template>
  <div class="vue-body">
    <Breadcrumb class="router-box">
      <BreadcrumbItem to="index">首页</BreadcrumbItem>
      <BreadcrumbItem>数据接入</BreadcrumbItem>
      <BreadcrumbItem>数据特征专题库</BreadcrumbItem>
    </Breadcrumb>
    <div class='panel-body'>
      <Row :gutter="10">
        <Col span="12">
          <Row :gutter="5">
            <Col span="24">
            <Card dis-hover>
              <p slot="title">
                <Icon type="pie-graph" color="#0580f2" size="18"></Icon>
                <span style="font-size: 18px">特征库数据情况</span>
              </p>
              <Row type="flex" justify="space-around">
                <Col span="8">
                <PieChartSingleData :height="chartHeight" :chartData="totalData"></PieChartSingleData>
                </Col>
                <Col span="8">
                <PieChartMultipleData :height="chartHeight" :chartData="sameDayData" :showLegend="true"></PieChartMultipleData>
                </Col>
                <Col span="8">
                <PieChartSingleData :height="chartHeight"></PieChartSingleData>
                </Col>
              </Row>
            </Card>
            </Col>
          </Row>
          <br>
          <Row>
            <Col span="24">
            <Card dis-hover>
              <p slot="title">
                <Icon type="pie-graph" color="#0580f2" size="18"></Icon>
                <span style="font-size: 18px">重点人乘车情况</span>
              </p>
              <Row type="flex" justify="space-around">
                <Col span="8">
                <PieChartSingleData :height="chartHeight"></PieChartSingleData>
                </Col>
                <Col span="8">
                <PieChartMultipleData :height="chartHeight" :showLegend="true"></PieChartMultipleData>
                </Col>
                <Col span="8">
                <PieChartMultipleData :height="chartHeight" :showLegend="true"></PieChartMultipleData>
                </Col>
              </Row>
            </Card>
            </Col>
          </Row>
        </Col>
        <Col span="12">
          <Card dis-hover>
            <p slot="title">
              <Icon type="pie-graph" color="#0580f2" size="18"></Icon>
              <span style="font-size: 18px">特征库数据情况</span>
            </p>
            <div style="display: flex;flex-direction: row;flex-wrap: wrap">
              <PieChartSingleData class="float" :height="chartHeightRight" :width="rightChartWidth"></PieChartSingleData>
              <PieChartSingleData class="float" :height="chartHeightRight" :width="rightChartWidth"></PieChartSingleData>
              <PieChartSingleData class="float" :height="chartHeightRight" :width="rightChartWidth"></PieChartSingleData>
              <PieChartSingleData class="float" :height="chartHeightRight" :width="rightChartWidth"></PieChartSingleData>
              <PieChartSingleData class="float" :height="chartHeightRight" :width="rightChartWidth"></PieChartSingleData>
              <PieChartSingleData class="float" :height="chartHeightRight" :width="rightChartWidth"></PieChartSingleData>
              <PieChartSingleData class="float" :height="chartHeightRight" :width="rightChartWidth"></PieChartSingleData>
              <PieChartSingleData class="float" :height="chartHeightRight" :width="rightChartWidth"></PieChartSingleData>
              <PieChartSingleData class="float" :height="chartHeightRight" :width="rightChartWidth"></PieChartSingleData>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
  import {queryDatasubject} from  '@/service/getData'
  import PieChartSingleData from '@/components/chartsTools/PieChartSingleData'
  import PieChartMultipleData from '@/components/chartsTools/PieChartMultipleData'

  export default {
    name: 'DataFeatureLibrary',
    components: {PieChartSingleData, PieChartMultipleData},
    /*data() {
      return {
        chartHeight:'300px',
        chartHeightRight:'235px',
        rightChartWidth:'33.33%'
      }
    }*/
    data() {
      return {
        otherWhereabouts: {
          chart: null,
          title: '',
        },
        chartHeight:'300px',
        chartHeightRight:'235px',
        rightChartWidth:'33.33%',
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
        sameDayData:[] //各类型重点人
      }
    },
    methods: {
      //请求
      async getChart() {
        await queryDatasubject().then(res => {
          if (res.statusCode !== 200) return process_error(res);
          this.totalData = res.data.zdrzl[0];
          this.sameDayData = res.data.glzdrsl;
        })
      }
    },
    mounted() {
      this.getChart();
      window.addEventListener('resize', () => {
        this.reakNameData['chart'].resize();
        this.otherWhereabouts['chart'].resize();
      })
    }
  };
</script>

<style scoped>
  .data-feature-library {
    flex: 1;
  }
  .float{
    float: left;
  }

</style>
