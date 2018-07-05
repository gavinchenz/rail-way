<template>
  <div class="my-search">
    <div class="search-box">
      <div class="search-box-up">
        <h1 class="box-up-h1">
          <i class="iconfont icon-calendar"></i>
          智能搜索
        </h1>
        <search-components></search-components>
      </div>
      <div class="search-box-down">
        <search-common-module v-for="item in searchCommonList" :key="item.titMsg" :msgList="item"></search-common-module>
      </div>
    </div>
  </div>
</template>

<script>
import SearchComponents from "../../components/Search/SearchComponents"
import SearchCommonModule from "../../components/Search/SearchCommonModule"
export default {
  name: 'Search',
  components:{
    SearchComponents,
    SearchCommonModule
  },
  data () {
    return {
     searchCommonList:[//异步获取，方法
        {
          icon:"icon-account",
          titMsg:"目标查询",
          countMsg:"122321",
          path:"/index"
        },
        {
          icon:"icon-electrical",
          titMsg:"智能搜索",
          countMsg:"122321",
          path:"/index"
        },
        {
          icon:"icon-print",
          titMsg:"区域查询",
          countMsg:"122321",
          path:"/index"
        },
        {
          icon:"icon-productfeatures",
          titMsg:"综合定位",
          countMsg:"122321",
          path:"/index"
        },
        {
          icon:"icon-pin",
          titMsg:"专题查询",
          countMsg:"122321",
          path:"/index"
        },
        {
          icon:"icon-office",
          titMsg:"协议查询",
          countMsg:"122321",
          path:"/index"
        },
        {
          icon:"icon-email",
          titMsg:"寄递查询",
          countMsg:"122321",
          path:"/index"
        },
        {
          icon:"icon-iconfontshouji",
          titMsg:"微信查询",
          countMsg:"122321",
          path:"/index"
        },
        {
          icon:"icon-all1",
          titMsg:"号码查询",
          countMsg:"122321",
          path:"/index"
        },
        {
          icon:"icon-signboard",
          titMsg:"基站查询",
          countMsg:"122321",
          path:"/index"
        }
      ]
    }
  }
};
</script>

<style scoped>
.my-search{
  flex:1;
  color:#fff;
  text-align:left;
  text-indent: 10px;
  font-size:14px;
  background: url(../../assets/images/bg-10.png) no-repeat;
  background-size:cover;
}
.search-box{
  width:60%;
  height:100%;
  margin:0 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.search-box-up{
  box-sizing: border-box;
  padding-top:100px;
  width:100%;
  height:30%;
}
.box-up-h1{
  height: 80px;
  line-height:80px;
  text-align: center;
  font-size:50px;
}
.box-up-h1 i{
  display: inline;
  font-size:55px;
}
.search-box-down{
  padding-top:100px;
  flex:1;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content:flex-start;
}
</style>
