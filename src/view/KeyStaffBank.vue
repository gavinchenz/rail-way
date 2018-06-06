<template>
  <div class="key-staff-bank">
    <form class="search-box" action="">
      <common-label-input :titMsg="item.tit" v-for="item in searchList" :key="item.tit"></common-label-input>
     
    </form>
  </div>
</template>

<script>
  import CommonLabelInput from "../components/Common/CommonLabelInput";
  export default {
    name: 'KeyStaffBank',
    components:{
      CommonLabelInput
    },
    data () {
      return {
        searchList:[
        {
          tit:"姓名",
        },
        {
          tit:"身份证号",
        },
        {
          tit:"车牌号",
        },
        {
          tit:"籍贯",
        },
        {
          tit:"住址",
        },
        ]
      }
    }
  }
</script>

<style scoped>
.key-staff-bank{
  flex:1;
}
.search-box{
  width:100%;
  box-sizing: border-box;
}
</style>
