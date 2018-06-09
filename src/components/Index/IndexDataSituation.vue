<template>
   <div class="index-data-situation">
    <p class="data-situation-p">数据情况</p>
    <div class="data-situation-box" id="myChart">
      
    </div>
   </div> 
</template>

<script>
export default {
  name: 'IndexDataSituation',
  data () {
    return {
      moreNews:"Home/Search",
      goWorking:"Home/Search",
      working:"无代办事项"
    }
  },
  mounted(){
    this.drawLine();
  },
  methods: {
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'),)
        // 绘制图表
        myChart.setOption({
            //设置标题
            title: { text: '数据接入情况' ,color:"rgba(255, 255, 255,1)"},
            //设置文字颜色
            textStyle: {
                color: 'rgba(255, 255, 255,1)'
            },
            tooltip: {},
            legend:{
              data:["接入情况"]
            },
            xAxis: {
                data: ["数据1","数据2","数据3","数据4","数据5","数据6"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 89, 10, 45],
                //设置柱状图颜色
                color:"rgba(255, 255, 255,1)"
            }]
        });
    }
  }
}
</script>

<style scoped>
.index-data-situation{
  width:80%;
  margin:0 auto;
  flex:1;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  color:#fff;
}
.data-situation-p{
  height:40px;
  line-height: 40px;
  text-align: left;
  font-size:18px;
  font-weight:bold;
}
.data-situation-box{
  flex:1;
  width:100%;
  text-align: left;
  text-indent: 10px;
  line-height: 60px;
  border:1px solid #fff;
  margin-bottom: 15px;
}
</style>
