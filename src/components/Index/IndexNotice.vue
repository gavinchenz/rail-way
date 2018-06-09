<template>
  <div class="index-notice">
    <div class="notice-box">
      <ul class="notice-list">
        <p class="notice-header">
          公告提醒
          <a :href="moreNotice" class="header-span-right">查看更多</a>
        </p>
        <li class="list-li"  v-for="(notice,index) in noticeList" :key="notice"><a href="">{{notice}}</a></li>
      </ul>
      <ul class="news-list">
        <p class="notice-header">
          通知提醒
          <a :href="moreNotice" class="header-span-right">查看更多</a>
        </p>
        <li class="list-li"  v-for="(news,index) in newsList" :key="news"><a href="">{{news}}</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexNotice',
  data () {
    return {
        moreNotice:"Home/Search",
        noticeList:["公告1","公告2","公告3","公告4","公告5","公告6","公告7","公告8","公告9","公告10","公告11","公告12","公告13"],
        newsList:["通知1","通知2","通知3","通知4","通知5","通知6","通知7","通知8","通知9","通知10","通知11","通知12","通知13"]
    }
  },
  methods:{

  }
};
</script>

<style scoped>
.index-notice{
  width:80%;
  margin:15px auto 0;
  height:350px;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
}
.notice-header{
  height:40px;
  line-height: 40px;
  text-align: left;
  font-size:18px;
  font-weight:bold;
  color:#fff;
}
.notice-header .header-span-right{
  font-size:12px;
  float: right;
  margin-right:20px;
  color:#A0A9C1;
}
.notice-box{
  box-sizing: border-box;
  flex:1;
  display: flex;justify-content: flex-start;
  padding-top:15px;
}
.notice-list,.news-list{
  width:50%;
  height:90%;
  overflow-y: hidden;
}
.notice-list{
  margin-right:60px;
}
.list-p{
  height: 30px;
  line-height: 30px;
  font-size:14px;
  color:#fff;
  text-align: left;
}
.list-li{
  height:20px;
  line-height: 20px;
  font-size:12px;
  color:#fff;
  text-align: left;
  text-indent: 10px;
  background:rgba(255,255,255,.3);
}
.list-li a{
  height:20px;
  font-size:12px;
  color:#fff;
  text-align: left;
  text-indent: 10px;
}
</style>
