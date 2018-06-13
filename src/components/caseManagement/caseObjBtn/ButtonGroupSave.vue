<template>
  <div>
    <ButtonGroup>
      <Button type="ghost" size="small" @click="caseObjOptBtn('edit')" >&nbsp;<b>修改</b></Button> //v-auth="0-1-2-2"
      <Button type="ghost" size="small" @click="caseObjOptBtn('del')" >&nbsp;<b>删除</b> </Button>  //v-auth="0-1-2-3"
      <Button type="ghost" size="small" @click="caseObjOptBtn('submit')" >&nbsp;<b>提交</b> </Button>  //v-auth="0-1-2-4"
      <Button type="ghost" size="small" @click="caseObjOptBtn('addSign')" >&nbsp;<b>添加标识</b></Button>  //v-auth="0-1-2-7"
    </ButtonGroup>
  </div>
</template>

<script>
    import {queryObjectByCaseid,caseobjectSubmitObj,caseobjectDeleteCaseobject} from '@/service/getData'

    import {process_error} from '@/config/process_request_conf'
    export default {
      name: "ButtonGroupSave",
      props:{
        id:String,
        caseid:String,        
        saveStatus:Object,
        hideAddBtn:Object
      },
      data(){
        return {
          list:[]
        }
      },
      methods:{
        caseObjOptBtn(sign){
          switch(sign){
            case 'edit':
              this.$router.replace({path:'/editCaseObj',query:{
                sign:'edit',
                objectId:this.id,              
                cissynchrocase:this.hideAddBtn.cissynchrocase,
                cstatuscode: this.hideAddBtn.cstatuscode,
                cdisplay:this.hideAddBtn.cdisplay              
              }});
              break;
            case 'del':
              this.delCaseObjModal(this.saveStatus);
              break;
            case 'submit':              
              this.submitCaseObjModal(this.saveStatus);
              break;
            case 'addSign':
              this.$emit("changeAddMarksSign");
              break;
            default:break;
          }
        },
        delCaseObjModal(data){
            this.$Modal.confirm({
                title: '删除对象',
                content: `<p>确认删除${data.objectname}对象吗？</p>`,
                onOk: async() => {
                  await caseobjectDeleteCaseobject(data.id)
                  .then(res => {
                    if(res.statusCode !== 200) return process_error(res);
                    this.$Message.success(`${res.message}`);
                    let caseid = data.caseid;
                    window.eventBus.$emit('upDataFn')
                  })
                  .catch(err => console.log(err))
                },
                onCancel: () => this.$Message.info('取消删除!')
            });
        },
        submitCaseObjModal(data){
            this.$Modal.confirm({
                title: '提交对象',
                content: `<p>确认提交${data.objectname}对象吗？</p>`,
                onOk: async() => {
                  await caseobjectSubmitObj(data.id)
                  .then(res => {
                    if(res.statusCode !== 200) return process_error(res);
                    this.$Message.success(`${res.message}`);
                    let caseid = data.caseid;
                    window.eventBus.$emit('upDataFn')
                  })
                  .catch(err => console.log(err))
                },
                onCancel: () => this.$Message.info('取消提交!')
            });
        }
      },
      mounted() {},
      // beforeDestroy(){
      //   // 组件销毁前 通过 window.eventBus 来通知 不相关组件触发某个事件
      //   console.log("buttonSave销毁前传递数据:");
      //   window.eventBus.$emit("sendCaseObjInfoFn",this.saveStatus.id);
      // }
    }
</script>

<style scoped>

</style>
