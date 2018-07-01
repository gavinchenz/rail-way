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
};
</script>

<style scoped>
.common-module {
  box-sizing: border-box;
  width:12%;
  height:33%;
  margin:20px;
  border:2px solid #6F95DE;
  padding-top:5px;
  background: rgba(13, 25, 74, 0.7); 
  color:#fff;
  box-shadow:0 0 3px 4px #4065A0;
  border-radius: 8px;
  text-align: center;
}
.common-module  .iconfont{
  display: inline-block;
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
