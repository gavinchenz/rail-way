<template>
  <div :style="style" ref="chartBox"></div>
</template>
<script>
    export default {
      name: "pieChartSingData",
      props:{
        chartData:{
          type:Object,
          default:()=>{
            return {}
          }
        },
        height:{
          type:String,
          default:'300px'
        },
        width:{
          type:String,
          default:'100%'
        }
      },
      data(){
        return {
          chart:null,
          style:{
            height: this.height,
            width:this.width
          },
          itemStyle:{
            normal: {
              color: { // 完成的圆环的颜色
                colorStops: [{
                  offset: 0,
                  color: '#00cefc', // 0% 处的颜色
                  // color:this.$tools.randomColor()  //随机色
                }, {
                  offset: 1,
                  color: '#367bec', // 100% 处的颜色
                  // color:this.$tools.randomColor() //随机色
                }]
              }
            }
          },
          name: '暂无数据',
          text: '0',
          value: 0,
          color:'#024991',
          dataList:[],
        }
      },
      watch:{
        chartData:'getData'
      },
      methods:{
        initChart(){
          this.chart = this.$echarts.init(this.$refs.chartBox);
          this.chart.clear();
          let option = {
            title: [{
              text: this.name,
              x: 'center',
              y: '42%',
              textStyle: {
                fontWeight: 'bold',
                color: '#666',
                fontSize: '18'
              }
            },
            {
              text: this.text,
              x: 'center',
              y: '50%',
              textStyle: {
                fontWeight: 'bold',
                color: '#024991',
                fontSize: '20'
              }
            }
            ],
            color: ['rgba(176, 212, 251, 1)'],
            series: [{
              name: 'Line 1',
              type: 'pie',
              clockWise: true,
              radius: ['50%', '66%'],
              itemStyle: {
                normal: {
                  label: {
                    show: false
                  },
                  labelLine: {
                    show: false
                  }
                }
              },
              hoverAnimation: false,
              data:this.dataList
            }]
          };
          this.chart.setOption(option);
          window.addEventListener('resize',()=> {
            this.chart.resize();
          })
        },
        //数据处理
        getData(){
          if(Object.keys(this.chartData).length>0){
            this.name = this.chartData.name;
            this.text = this.chartData.text;
            this.value = this.chartData.value;
            this.dataList = [{
              value: this.value,
              name: this.name,
              itemStyle: this.itemStyle
            }];
          }else {
              this.dataList = [{
                name:'无数据',
                value: 0,
                itemStyle:{
                  normal: {
                    color: '#e2e2e2'
                  }
                },
              }]
          }
          this.initChart()
        }
      },
      beforeDestroy(){
        if(this.clear){
          this.chart.clear();
        }
      },
      created(){
          this.$nextTick(()=>{
           this.getData()
          })
      }
    };
</script>

<style scoped>
</style>
