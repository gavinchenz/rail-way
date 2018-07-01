<template>
  <div :style="style" ref="chartBox"></div>
</template>
<script>
  export default {
    name: "pieChart",//多数局环形图，统计各自占比
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
        options:{
          showLegend: false,
        },
        name:'暂无数据',
        dataListArr:[],
        colorList:['#4480bc', '#32b493', '#989cff', '#e08e50', '#9c7de1', '#5d9eff', '#ffdb5d', '#a4648c', '#629e65', '#b995f5']
      }
    },
    methods:{
      initChart(){
        this.chart = this.$echarts.init(this.$refs.chartBox);
        this.chart.clear();
        if(!!this.chartData){
          this.dataListArr.forEach((item, index)=>{
            item.itemStyle = {
              normal: {
                //color: this.$tools.randomColor()  //随机色
                color: this.colorList[index] //已定义颜色
              }
            }
          });
        }
        let option = {
          tooltip: {
            trigger: 'item'
          },
          title: {
            show:false,
            text: '123',
            x:'center',
            y:'5%',
            textStyle: {color: '#666'}
          },
          legend: {
            show: this.options.showLegend,
            itemGap: 12,
            left: '10%',
            top:'5%',
            orient:'vertical'
          },
          series: [{
            radius: '70%',
            name: '',
            type: 'pie',
            labelLine: {
              normal: {
                show: true,
                length:5,
                length2:5
              }
            },
            itemStyle: {
              normal: {
                borderWidth: this.chartData.length <= 1 ? 0 : 3,
                borderColor: 'rgba(0,0,0,0)',
              },
              emphasis: {
                shadowBlur: 10,
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
      //获取父组件的数据进行格式化
      getData(){
        if(this.chartData.length > 0){
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
