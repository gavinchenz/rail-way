<template>
  <div class="common-label-input">
    <label class="common-lable" for="">{{titMsg}}</label>
    <input class="common-input" type="text" v-model.trim="inputMsg">
  </div>
</template>

<script>
export default {
  props:["titMsg"],
  name: 'CommonLabelInput',
  data () {
    return {
      inputMsg:""
    }
  }
}
</script>


<style scoped>
.common-label-input{
  float:left;
  display: inline-block;
  width:30%;
  height:30px;
  font-size:14px;
  color:#fff;
  line-height:30px;
  text-align: center;  
  box-sizing: border-box;
  vertical-align: center;
  margin:15px auto 0;
}
.common-lable,.common-input{
  display: block;
  float: left;
  height:100%;
  border:1px solid #DEDEDE;
}
.common-lable{
  width:25%;
}
.common-input{
  width:60%; 
  margin-left:10px;
  outline:none;
  background: none;
}
</style>
