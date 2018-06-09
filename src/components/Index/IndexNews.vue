<template>
   <div class="index-news">
    <p class="news-header">
      代办事项
      <span class="header-span-left">WORKING</span>
      <a :href="moreNews" class="header-span-right">查看更多</a>
    </p>
    <div class="news-box">
      <div class="news-list">
          {{working}}
      </div>
      <a class="news-a" :href="goWorking">
        <i class="iconfont icon-arrowright"></i>
      </a> 
    </div>
   </div> 
</template>

<script>
export default {
  name: 'IndexNews',
  data () {
    return {
      moreNews:"Home/Search",
      goWorking:"Home/Search",
      working:"无代办事项"
    }
  },
  methods:{

  }
};
</script>

<style scoped>
.index-news{
  width:80%;
  margin:0 auto;
  height:100px;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  color:#fff;
}
.news-header{
  height:40px;
  line-height: 40px;
  text-align: left;
  font-size:18px;
  font-weight:bold;
}
.news-header .header-span-left{
  font-size:12px;
}
.news-header .header-span-right{
  font-size:12px;
  float: right;
  margin-right:20px;
  color:#A0A9C1;
}
.news-box{
  flex:1;
  width:100%;
  text-align: left;
  text-indent: 10px;
  line-height: 60px;
}
.news-list{
  float:left;
  height:60px;
  width:88%;
  line-height:60px;
  background: rgba(255,255,255,.3);
}
.news-a{
  float: right;
  display:block;
  width:10%;
  height: 60px;
  background:#152F68;
}
.news-a i{
  width:100%;
  height:100%;
  display:inline-block;
  text-indent: -20px;
  color:#fff;
  font-size:25px;
  text-align: center;
  line-height: 60px;
  /* cursor: pointer; */
}
</style>
