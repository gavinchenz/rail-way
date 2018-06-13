<template>
  <div>
    <ButtonGroup>
      <Button type="ghost" size="small" @click="aperating" >&nbsp;<b>解除</b></Button> //v-auth="0-1-2-5"
      <Button type="ghost" size="small" @click="removerNum" ><b>撤号</b></Button> //v-auth="0-1-3-1"
      <Button type="ghost" size="small" @click="extension" >&nbsp;<b>延期   </b></Button> //v-auth="0-1-2-6"
      <Button type="ghost" size="small" @click="markChange" >&nbsp;<b>添加标识</b></Button> //v-auth="0-1-2-7"
      <Button type="ghost" size="small" @click="ok" >&nbsp;<b>批量提交</b></Button> //v-auth="0-1-3-5"
    </ButtonGroup>
  </div>
</template>
<script>
  import {queryObjectByCaseid,relieveCaseobject} from '@/service/getData'
  import {process_error} from '@/config/process_request_conf'
    export default {
      name: "ButtonGroupControl",
      props:{
        id:String,
        caseid:String,
        removeobjectinvestigates:String,
        displays:String,
        hideAddBtn:Object
      },
      data(){
        return {
          searchData:{
            caseobjectid: ""
          },
          list:[]
        }
      },
      methods:{

        //解除侦控
        async aperating(){
           this.searchData.caseobjectid = this.id;
           await relieveCaseobject(this.searchData.caseobjectid)
              .then(res => {
                if(res.statusCode !== 200) return process_error(res);
                this.$Message.success(`${res.message}`);
                window.eventBus.$emit('upDataFn')
              })
        },

        //批量撤号
        removerNum(){
          this.$router.push({path:'/SeeMoreControl',
            query: {
              filter:2,
              id:this.id,
              caseid:this.caseid,
              display:this.displays,
              removeobjectinvestigate:this.removeobjectinvestigates,

              cissynchrocase:this.hideAddBtn.cissynchrocase,
              cstatuscode: this.hideAddBtn.cstatuscode,
              cdisplay:this.hideAddBtn.cdisplay
              }
            });
        },

        //延期
        extension(){
            this.$emit('extension')
        },

        //标识变更
        markChange(){
          this.$emit('markChange')
        },

        //批量提交
        ok(){
          this.$router.push({path:'/SeeMoreControl',
            query: {
              filter:1,
              id:this.id,
              caseid:this.caseid,
              display:this.displays,
              removeobjectinvestigate:this.removeobjectinvestigates,

              cissynchrocase:this.hideAddBtn.cissynchrocase,
              cstatuscode: this.hideAddBtn.cstatuscode,
              cdisplay:this.hideAddBtn.cdisplay
            }
          });
        }
      },
      mounted() {}
    }
</script>

<style scoped>

</style>
