<template>
    <Form ref="batchImportCaseSign" :model="batchImportCaseSign" :label-width="60">
        <FormItem label="类型">
            <RadioGroup v-model="batchImportCaseSign.identifytype" @on-change="radioGroupChange">
                <Radio v-for="(item,index) in numTypeList" :label="item.code" :key="item.code" :value="item.name" :ref="`radioGroup${item.code}`">{{item.name}}</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="号码">
            <Input style="width: 650px" v-model.trim="identifytypeStr" type="textarea" placeholder="Enter something..." :autosize="{minRows: 10,maxRows: 10}"
            @on-blur="batchPushSignToAddCaseObjForm" @keyup.enter.stop.prevent="preventEventFn($event)"></Input>
          <br>
            <span class="warning" v-show="textareaWarning">*&nbsp;&nbsp;1.手动输入有效的电话或手机号码，以换行分割;&emsp;2.可从Excel表格中复制粘帖。 </span>
        </FormItem>
    </Form>
</template>

<script>
import {findCaseDictionByParent} from '@/service/getData'
import {mapState} from 'vuex'
  export default {
      name:"AddSignForm",
      props:{
          numTypeList:Array
      },
      data(){
          return {
              identifytypeStr:'',
              // 临时标识对象
              batchImportCaseSign:{
                "caseid":"",
                "investigateendtime":"",
                "investigatestarttime":"",
                "display": "",
                "id": "",
                "identify": "",
                "identifytype": "0",
                "objectid":"",
                "removenumber": "",
                "identifytypeStr":""
            },
            concatSignArr:[],     // 存放批量新增标识
            textareaWarning:true,// true：批量添加标识校验未通过 false: 校验通过
          }
      },
      computed:{
          ...mapState([
              'case_Obj_SignInfo'
          ])
      },
      methods:{
        // 存储数据类型
        radioGroupChange(code){
            let domNode = this.$refs[`radioGroup${code}`][0];            
            this.batchImportCaseSign['identifytypeStr'] = domNode['value']
        },
        // 批量添加标识去重并存储
        batchPushSignToAddCaseObjForm(){
            let text = this.identifytypeStr;
            let excessArr = [];
            this.concatSignArr = [];
             //处理文本中存在的各种符号
            if (!!text && text.length > 0) {
                while (text.indexOf(' ') != -1) {
                    text = text.replace(' ', '\n');
                }
                while (text.indexOf(",") != -1) {
                    text = text.replace(",", "\n");
                }
                while (text.indexOf('\n\n') != -1) {
                    text = text.replace('\n\n', '\n');
                }
                while (text.indexOf(',,') != -1) {
                    text = text.replace(',,', '\n');
                }
                while (text.indexOf("，") != -1) {
                    text = text.replace("，", "\n");
                }
                while (text.indexOf(".") != -1) {
                    text = text.replace(".", "\n");
                }
                while (text.indexOf("\t") != -1) {
                    text = text.replace("\t", "\n");
                }
                if (text.lastIndexOf("\n") == text.length - 1) {
                    text = text.substring(0, text.lastIndexOf("\n"));
                }
                let textArr = text.split(/\n/);
                if (textArr.length > 50) {
                    return this.$Message.warning( "输入不得超过50个号码！");
                }
                //保存的号码并且对号码进行校验
                for (let i = 0; i < textArr.length; i++) {
                    if (!/^\d{1,50}$/.test(textArr[i].trim())) {
                        this.textareaWarning = true;
                        this.$Message.error(`标识号码中有特殊字符，请去除后再提交`);
                        this.$emit("disabledSaveOrsubmitSign",true);
                        this.concatSignArr = [];  // 校验未通过则重置 该数组为 空!!!
                        return;
                    } else {
                        //用过度数组去重
                        if (!excessArr[textArr[i]]) {
                            excessArr[textArr[i]] = parseInt(textArr[i],10);
                            let obj = {
                                "caseid":this.batchImportCaseSign['caseid'],
                                "investigateendtime":this.batchImportCaseSign['investigateendtime'],
                                "investigatestarttime":this.batchImportCaseSign['investigatestarttime'],
                                "display":this.batchImportCaseSign['display'],
                                "id":"",
                                "identify":excessArr[textArr[i]],
                                "identifytype":this.batchImportCaseSign['identifytype'],
                                "objectid":this.batchImportCaseSign['objectid'],
                                "removenumber": "",
                                "identifytypeStr":this.batchImportCaseSign['identifytypeStr']
                            };
                            this.concatSignArr.push(obj);
                        }
                    }
                }
                console.log("批量添加标识的暂存数组",this.concatSignArr);
                this.textareaWarning = false;  //去掉校验
            }
            this.$emit("disabledSaveOrsubmitSign",false);
            this.$emit('batchPushSignToAddCaseObjForm',this.concatSignArr);
        },

        // 阻止浏览器默认行为和事件冒泡
        preventEventFn(e){
            return;
        },

        // 从对象Card 中添加标识 记得更新 临时标识对象
        updateBatchImportCaseSign(item){
            console.log("点击案件对象传递的数据:",item);
            this.batchImportCaseSign['caseid'] = item.caseid;
            this.batchImportCaseSign['investigateendtime'] = item.investigateendtime;
            this.batchImportCaseSign['investigatestarttime'] = item.investigatestarttime;
            this.batchImportCaseSign['display'] = item.display;
            this.batchImportCaseSign['objectid'] = item.id;
        }
      },

      mounted(){
        // mounted 中接收的是 点击添加对象 按钮传递的数据
        let case_Obj_Info = JSON.parse(sessionStorage.getItem("case_Obj_Info"));
        this.batchImportCaseSign['caseid'] = case_Obj_Info.caseid;
        this.batchImportCaseSign['investigateendtime'] = case_Obj_Info.investigateendtime;
        this.batchImportCaseSign['investigatestarttime'] = case_Obj_Info.investigatestarttime;
        this.batchImportCaseSign['display'] = case_Obj_Info.display;

        this.batchImportCaseSign.identifytype = this.numTypeList[0]['code'];
      }
  }
</script>
<style lang="less" scoped>
    .warning{
        color:red;
    }
</style>
