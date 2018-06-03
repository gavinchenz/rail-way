<template>
  <a :href="myLink" class="common-module">
    <i class="iconfont" :class=[activeClass]></i>
    <p class="common-p">{{list.content}}</p>
  </a>
</template>

<script>
export default {
  props:["list"],
  name: 'IndexCommonModule',
  data () {
    return {
      activeClass:this.list.icon,
      myLink:this.list.mylink
    }
  },
  methods:{

  }
}
</script>

<style scoped>
.common-module {
  box-sizing: border-box;
  width:10%;
  height:10%;
  margin:20px;
  border:2px solid #6F95DE;
  box-shadow:0 0 6px 5px #4065A0;
  border-radius: 8px;
  padding-top:10px;
  color:#fff;
}
.common-module  .iconfont{
  display: block;
  height: 30px;
  font-size:30px;
}
.common-p{
  height: 25px;
  line-height: 25px;
  font-size:14px;
  margin-top:5px;
}
</style>
