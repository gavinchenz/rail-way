<template>
  <div class="search-components">
    <input type="text" class="search-input" v-model="searchMsg" placeholder="多个查询条件请用空格隔开"/>
    <button class="search-btn" @click="changeRouter(0)"><i class="iconfont icon-search"></i></button>
    <button class="search-btn" @click="changeRouter(1)"><i class="iconfont icon-up"></i></button>
  </div>
</template>

<script>
  var searchStr="123"
export default {
  name: 'SearchComponents',
  data () {
    return {
      searchMsg:""
    }
  },
  methods:{
    changeRouter(index){
      const msg=this.searchMsg
      console.log(msg)
      if(index==0){
        this.$router.push({name:'QueryResult',params:{msg}})
      }else{
        this.$router.push({path:'/Upload'})
      }
    }  
  }
};
</script>

<style scoped>
.search-components{
  width:96%;
  height: 50px;
  margin:25px auto 0;
  border-radius: 3px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.search-select{
  width:99px;
  height:50px;
  border:none;
  outline:none;
  text-indent: 10px;
  border-right:1px solid #e0e0e0;
  cursor: pointer;  
  font-weight: bold;
  font-size:14px;
  line-height: 50px;

}
.search-input{
  flex:1;
  border:none;
  outline:none;
  text-indent: 20px;
  color:#000;
  font-size:16px;
  line-height: 50px;
}
.search-btn{
  display:block;
  width:70px;
  height:100%;
  border:none;
  outline:none; 
  background:#0A2753; 
  border-radius:3px;
  color:#fff;
  font-size:25px;
  cursor: pointer;
  margin-left: 5px;
}
.search-btn i{
  font-size:35px;
  font-weight:bold;
}

</style>
