<template>
  <div class="search-components">
    <select class="search-select" v-model="selected">
      <option  value="">手机号码</option>
      <option>身份证</option>
      <option>车次</option>
      <option>票号</option>
    </select>
    <input type="text" class="search-input" v-model="searchMsg" placeholder="可输入您要查找的相关信息"/>
    <button class="search-btn"><i class="iconfont icon-search"></i></button>
  </div>
</template>

<script>
export default {
  name: 'SearchComponents',
  data () {
    return {
      selected:"",
      searchMsg:""
    }
  },
  methods:{

  }
}
</script>

<style scoped>
.search-components{
  width:96%;
  height: 50px;
  background: #fff;
  margin:25px auto 0;
  border-radius: 3px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.search-select{
  width:99px;
  height:80%;
  border:none;
  outline:none;
  text-indent: 10px;
  border-right:1px solid #e0e0e0;
  cursor: pointer;  
}
.search-input{
  flex:1;
  border:none;
  outline:none;
  text-indent: 20px;
  color:#000;
}
.search-btn{
  display:block;
  width:70px;
  height:100%;
  border:none;
  outline:none; 
  background:#0A2753; 
  border-radius: 0 3px 3px 0;
  color:#fff;
  font-size:25px;
  cursor: pointer;
}
.search-btn i{
  font-size:35px;
  font-weight:bold;
}
</style>
