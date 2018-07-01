<template>
  <div :style="style" ref="chartBox"></div>
</template>
<script>
  export default {
    name: "pieChartMultipleData",//多数局环形图，统计各自占比
    props:{
      chartData:{
        type:Array,
        default:()=>{
          return []
        }
      },
      height:{
        type:String,
        default:'300px'
      },
      width:{
        type:String,
        default:'100%'
      },
      showLegend:{
        type:Boolean,
        default: false
      },
    },
    data(){
      return {
        chart:null,
        style:{
          height: this.height,
          width:this.width
        },
        name:'暂无数据',
        dataListArr:[],
        colorList:['#66c5d7', '#11c88c', '#989cff', '#ffa55d', '#9c7de1', '#5d9eff', '#ffdb5d', '#ee82ed', '#8fca5f', '#b995f5']
      }
    },
    watch:{
      chartData:'getData'
    },
    methods:{
      initChart(){
        this.chart = this.$echarts.init(this.$refs.chartBox);
        this.chart.clear();
        if(this.chartData.length>0){
          this.dataListArr.forEach((item, index)=>{
            item.itemStyle = {
              normal: {
                //color: this.$tools.randomColor()  //随机色
                color: this.colorList[index] //已定义颜色
              }
            };
          });
        }
        let option = {
          tooltip: {
            trigger: 'item'
          },
          title: {
            text: this.name,
            x:'center',
            y:'50%',
            textBaseline: 'middle',
            textStyle: {
              fontWeight: 'bold',
              color: '#666',
              fontSize: '18'
            }
          },
          legend: {
            show: this.chartData.length > 0 ? this.showLegend : false,
            itemGap: 12,
            type: 'scroll',
            bottom: 0
          },
          series: [{
            hoverAnimation: false, //设置饼图默认的展开样式
            radius: ['50%', '66%'],
            name: '',
            type: 'pie',
            selectedMode: 'single',
            selectedOffset: 0, //选中是扇区偏移量
            clockwise: true,
            startAngle: 90,
            label: {
              normal: {
                show: false,
                position:'',
                textStyle:{
                  fontWeight:'bold',
                  fontSize:14
                }
              }
            },
            labelLine: {
              normal: {
                show: false,
                length:5,
                length2:0
              }
            },
            itemStyle: {
              normal: {
                borderWidth: this.dataListArr.length <= 1 ? 0 : 3,
                borderColor: '#ffffff',
              },
              emphasis: {
                borderWidth: 0,
                shadowBlur: 5,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.2)'
              }
            },
            data: this.dataListArr
          }]
        };
        this.chart.setOption(option, true);
        window.addEventListener('resize',()=> {
          this.chart.resize();
        })
      },
      //数据处理
      getData(){
        if(this.chartData.length>0){
          this.dataListArr = [];
          this.chartData.forEach(item=>{
            let obj = {};
            obj.value = item.value;
            obj.name = item.datatype;
            this.dataListArr.push(obj);
            this.name = this.chartData[0].name;
          });
        }else {
            this.dataListArr = [];
            this.dataListArr.push({value:0,name:this.name,itemStyle:{normal:{color:'#e2e2e2'}}})
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
  }
</script>

<style scoped>

</style>
