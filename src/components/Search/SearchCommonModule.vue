<template>
  <a :href="myLink" class="search-common-module">
    <i class="iconfont" :class=[activeClass]></i>
    <p class="tit">
      {{msgList.titMsg}}
      <span class="count-span">{{msgList.countMsg}}</span>
    </p>
  </a>
</template>

<script>
export default {
  props:["msgList"],
  name: 'SearchCommonModule',
  data () {
    return {
      myLink:this.msgList.path,
      activeClass:this.msgList.icon
    }
  },
  methods:{

  }
};
</script>

<style scoped>
.search-common-module{
  width:178px;
  height: 98px;
  border:1px solid;
  border-color:rgba(67,92,164,.7);
  background:rgba(30,70,135,.4);
  display: flex;
  justify-content:flex-start;
  align-items: center;
  color:#fff;
  font-size:16px;
  margin:10px;
}
.iconfont{
  display:block;
  height: 100%;
  width:45%;
  text-align: center;
  line-height:98px;
  font-size:35px;
}
.tit{
  height: 50%;
  height:45px;
  text-align: center;
}
.count-span{
  margin-top:5px;
  display: block;
}
</style>
