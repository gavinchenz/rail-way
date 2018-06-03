<template>
  <div class="key-login">
    <div class="key-img"></div>
    <input class="key-btn" type="button" value="登录" @click="getKeyId()"/>
  </div>
</template>

<script>
export default {
  name: 'KeyLogin',
  data () {
    return {
    }
  },
  methods:{
    getKeyId:function(){
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.key-login{
  position: relative;
  width:85%;
  height:240px;
  margin:0 auto;
}
.key-img{
  width: 100px;
  height: 100px;
  border-radius: 50%;  
  border: 6px solid rgb(0, 123, 255);
  background: url(../../assets/images/udisk.png) no-repeat center;
  flex-shrink: 0;
  position: absolute;
  left:18px;
  top:60px;
  z-index:999;
}
.key-btn{
  float:right;
  width:53%;
  border:none;
  border-radius:  0 8px 8px 0; 
  height: 38px; 
  line-height:38px; 
  font-size:16px; 
  color:#fff;
  outline:none;
  background: #007BFF;
  cursor: pointer;
  letter-spacing: 15px;
  margin-top:95px;
  z-index:0;
  text-align: center;
  text-indent:15px; 
}
</style>
