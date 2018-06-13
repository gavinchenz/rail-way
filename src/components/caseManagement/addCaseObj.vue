<template>
    <Form :model="addCaseObjForm" :label-width="100" :rules="ruleValidate">
        <Row>
            <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 5, offset: 2 }">
                <Form-item label="案件编号" prop="cnumber">
                  <span>{{addCaseObjForm.cnumber}}</span>
                </Form-item>
            </Col>
            <Col :xs="{ span: 11, offset: 1 }" :lg="{ span: 5, offset: 2 }">
                <Form-item label="案件名称" prop="cname">
                  <span>{{addCaseObjForm.cname}}</span>
                </Form-item>
            </Col>
        </Row>
        <Row>
            <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 5, offset: 2 }">
                <Form-item label="对象名称" prop="objectname">
                    <Input v-model="addCaseObjForm.objectname" :disabled="isCaseObjDisabled"/>
                </Form-item>
            </Col>
            <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 5, offset: 2 }">
                <Form-item label="侦控开始日期" prop="investigatestarttime">
                    <DatePicker type="date" :value="addCaseObjForm.investigatestarttime" @on-change="changeInvestigatestarttimeFn" style="width: 100%" :disabled="isCaseObjDisabled" format="yyyy-MM-dd" disabled></DatePicker>
                </Form-item>
            </Col>
            <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 5, offset: 2 }">
                <Form-item label="侦控结束日期" prop="investigateendtime">
                    <DatePicker type="date" :value="addCaseObjForm.investigateendtime" @on-change="changeInvestigatestartendFn" style="width: 100%" :disabled="isCaseObjDisabled" format="yyyy-MM-dd" clearable :editable="false"></DatePicker>
                </Form-item>
            </Col>
        </Row>
        <div style="text-align: center;height: 15px;border-bottom: 1px solid #eeeff1" v-if="!addCaseObjForm['signOfEditOrSee']">
            <span class="moreObjInfo" @click="chooseItemSignFn">
                <Icon style="margin-top: -3px" type="arrow-down-b" size="20" v-if="!chooseItemSign"></Icon>
                <Icon style="margin-top: -3px" type="arrow-up-b" size="20" v-else></Icon>
            </span>
        </div>
        <section style="border-bottom: 1px solid #eeeff1" v-if="chooseItemSign || !!addCaseObjForm['signOfEditOrSee']">
            <Row style="padding-top: 10px">
                <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 5, offset: 2 }">
                    <Form-item label="别名">
                        <Input v-model="addCaseObjForm.oalias" :disabled="isCaseObjDisabled"/>
                    </Form-item>
                </Col>
                <Col :xs="{ span: 11, offset: 1 }" :lg="{ span: 5, offset: 2 }">
                    <Form-item label="性别" prop="osexual">
                      <RadioGroup v-model="addCaseObjForm.osexual">
                        <Radio v-for="(item,index) in sexList" :label="item.code" :key="item.code">{{item.name}}</Radio>
                      </RadioGroup>
                    </Form-item>
                </Col>
                <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 5, offset: 2 }">
                    <Form-item label="年龄" prop="oage">
                        <Input v-model.trim="addCaseObjForm.oage" :disabled="isCaseObjDisabled" style="width:100%;"></Input>
                    </Form-item>
                </Col>
            </Row>

            <Row>
                <Col :xs="{ span: 11, offset: 1 }" :lg="{ span: 5, offset: 2 }">
                    <Form-item label="证件类型" prop="odocumenttype">
                        <Select v-model="addCaseObjForm.odocumenttype" :disabled="isCaseObjDisabled">
                            <Option v-for="(item,index) in odocumenttypeList" :value="item.code" :key="item.code">{{item.name}}</Option>
                        </Select>
                    </Form-item>
                </Col>
                <Col :xs="{ span: 11, offset: 1 }" :lg="{ span: 5, offset: 2 }">
                    <Form-item label="证件号码" prop="odocumentnumber">
                        <Input v-model="addCaseObjForm.odocumentnumber" :disabled="isCaseObjDisabled"/>
                    </Form-item>
                </Col>
                <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 5, offset: 2 }">
                    <Form-item label="证件地址" prop="odocumentaddress">
                        <Input v-model="addCaseObjForm.odocumentaddress" :disabled="isCaseObjDisabled"/>
                    </Form-item>
                </Col>
            </Row>

            <Row>
                <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 5, offset: 2 }">
                    <Form-item label="民族">
                        <Select v-model="addCaseObjForm.onative" :disabled="isCaseObjDisabled">
                            <Option v-for="(item,index) in onativeList" :value="item.code" :key="item.code">{{item.name}}</Option>
                        </Select>
                    </Form-item>
                </Col>
                <Col :xs="{ span: 11, offset: 1 }" :lg="{ span: 5, offset: 2 }">
                    <Form-item label="政治面貌" prop="opoliticalstatus">
                        <Select v-model="addCaseObjForm.opoliticalstatus" :disabled="isCaseObjDisabled">
                            <Option v-for="item in opoliticalstatusList" :value="item.code" :key="item.code">{{item.name}}</Option>
                        </Select>
                    </Form-item>
                </Col>
                <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 5, offset: 2 }">
                    <Form-item label="国家地区" prop="ocontryarea">
                        <Input v-model="addCaseObjForm.ocontryarea" :disabled="isCaseObjDisabled"/>
                    </Form-item>
                </Col>
            </Row>

            <Row>
                <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 5, offset: 2 }">
                    <Form-item label="出生日期" prop="obrithday">
                        <DatePicker type="date" :value="addCaseObjForm.obrithday" @on-change="changeObrithday"  placeholder="请选择"
                        style="width:100%" :disabled="isCaseObjDisabled" :editable="false"></DatePicker>
                    </Form-item>
                </Col>
                <Col :xs="{ span: 11, offset: 1 }" :lg="{ span: 5, offset: 2 }">
                    <Form-item label="出生地" prop="ohomeplace">
                        <Input v-model="addCaseObjForm.ohomeplace" :disabled="isCaseObjDisabled"/>
                    </Form-item>
                </Col>
                <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 5, offset: 2 }">
                    <Form-item label="学历" prop="oeducation">
                        <Select v-model="addCaseObjForm.oeducation" :disabled="isCaseObjDisabled">
                            <Option v-for="(item,index) in oeducationList" :value="item.code" :key="item.code">{{item.name}}</Option>
                        </Select>
                    </Form-item>
                </Col>
            </Row>

            <Row>
                <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 5, offset: 2 }">
                    <Form-item label="工作职业" prop="occupation">
                        <Input v-model="addCaseObjForm.occupation" :disabled="isCaseObjDisabled"/>
                    </Form-item>
                </Col>
                <Col :xs="{ span: 11, offset: 1 }" :lg="{ span: 5, offset: 2 }">
                    <Form-item label="公司部门" prop="odepartment">
                        <Input v-model="addCaseObjForm.odepartment" :disabled="isCaseObjDisabled"/>
                    </Form-item>
                </Col>
                <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 5, offset: 2 }">
                    <Form-item label="公司地址" prop="oaddress">
                        <Input v-model="addCaseObjForm.oaddress" :disabled="isCaseObjDisabled"/>
                    </Form-item>
                </Col>
            </Row>

            <Row>
                <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 5, offset: 2 }">
                    <Form-item label="单位电话" prop="ounitnumber">
                        <Input v-model="addCaseObjForm.ounitnumber" :disabled="isCaseObjDisabled"/>
                    </Form-item>
                </Col>
                <Col :xs="{ span: 11, offset: 1 }" :lg="{ span: 5, offset: 2 }">
                    <Form-item label="家庭电话" prop="ohomenumber">
                        <Input v-model="addCaseObjForm.ohomenumber" :disabled="isCaseObjDisabled"/>
                    </Form-item>
                </Col>
                <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 5, offset: 2 }">
                    <Form-item label="移动电话" prop="otelephone">
                        <Input v-model="addCaseObjForm.otelephone" :disabled="isCaseObjDisabled"/>
                    </Form-item>
                </Col>
            </Row>

            <Row>
                <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 5, offset: 2 }">
                    <Form-item label="其他电话" prop="oothernumber">
                        <Input v-model="addCaseObjForm.oothernumber" :disabled="isCaseObjDisabled"/>
                    </Form-item>
                </Col>
                <Col :xs="{ span: 11, offset: 1 }" :lg="{ span: 5, offset: 2 }">
                    <Form-item label="性格特征" prop="ocharacterstyle">
                        <Input v-model="addCaseObjForm.ocharacterstyle" :disabled="isCaseObjDisabled"/>
                    </Form-item>
                </Col>
                <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 5, offset: 2 }">
                    <Form-item label="形体特征" prop="obodystyle">
                        <Input v-model="addCaseObjForm.obodystyle" :disabled="isCaseObjDisabled"/>
                    </Form-item>
                </Col>
            </Row>

            <Row>
                <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 5, offset: 2 }">
                    <Form-item label="声音特征" prop="osoundstyle">
                        <Input v-model="addCaseObjForm.osoundstyle" :disabled="isCaseObjDisabled"/>
                    </Form-item>
                </Col>
                <Col :xs="{ span: 17, offset: 1 }" :lg="{ span: 5, offset: 2 }">
                    <Form-item label="技能" prop="oskill">
                        <Input v-model="addCaseObjForm.oskill" :disabled="isCaseObjDisabled"/>
                    </Form-item>
                </Col>
                <Col :xs="{ span: 17, offset: 1 }" :lg="{ span: 19, offset: 2 }">
                <Form-item label="简介" prop="ointroduction">
                  <Input type="textarea" v-model="addCaseObjForm.ointroduction" :disabled="isCaseObjDisabled"/>
                </Form-item>
                </Col>
            </Row>
        </section>
    </Form>
</template>
<script>
  import {
      findCaseDictionByParent,
      caseobjectCheckCaseobejct
    } from '@/service/getData'
import {process_error} from '@/config/process_request_conf'
  export default {
    name: 'AddCaseObj',
    props:{
        addCaseObjForm:Object,
        isCaseObjDisabled:Boolean
    },
    data() {
        const stringRuler = (ruler, val, cb) => {
            if (ruler.required) {
                if (val === ''){
                    return cb(new Error('请输入' + ruler.name));
                }else if(!/^[^ ]+$/.test(val)){
                    return cb(new Error('请输入正确的' + ruler.name));
                }else{
                    return cb()
                }
            }
            cb();
        };
        const validateData = (ruler, val, cb) => {
            if (ruler.required) {
                if (val === '' || !val) return cb(new Error('请选择' + ruler.name));
            } else {
                if (val === '' || !val) return cb();
            }

            if (!!this.addCaseObjForm.investigatestarttime && !!this.addCaseObjForm.investigateendtime) {
                if (!((new Date(this.addCaseObjForm.investigateendtime).getTime() / 1000 - new Date(this.addCaseObjForm.investigatestarttime).getTime() / 1000) > 0)) {
                    cb(new Error('结束时间应晚于起始时间'));
                }
            }
            cb()
        };
        const stringRulerValidate = (ruler, val, cb) => {
            if (ruler.required) {
                if (val === ''){
                    return cb(new Error('请输入' + ruler.name))
                }else if(!/^[^ ]+$/.test(val)) {
                    return cb(new Error('请输入正确的' + ruler.name))
                }else{
                    let judegeIptData = {name:ruler.name,fieldName:ruler.fieldName,caseid:this.addCaseObjForm['caseid'],fieldvalue:val};
                    if(val === this.tempValidateField['objectname']) return cb();
                    this.judgeInput(judegeIptData,cb);
                }
            } else {
                if (val === ''){
                    return cb()
                }else if (!/^[^ ]+$/.test(val)) {
                    return cb(new Error('请输入正确的' + ruler.name))
                }else{return cb() }
            }
        };
        const validateNumber = (rule, value, cb) => {
            if(!!value){
                let val_length = value.length;
                switch(rule.max){
                    case 3:
                        if(!/^\d{1,3}$/.test(value)){
                            return cb(new Error('请输入不超过4位的数字'));
                        }else{return cb()}
                    break;
                    case 20:
                        if(!/^\d{1,20}$/.test(value)){
                            return cb(new Error('请输入不超过' + rule.max + '位的数字号码'));
                        }else{return cb()}
                    break;
                    default:break;
                }
            }
            cb()
        };

        const validateMobile = (rule, value, cb) => {
            if(!!value){
                if(!/^\d{1,20}$/.test(value)){
                    return cb(new Error('请输入不超过' + rule.max + '位的数字号码'));
                }else{return cb()}
            }
            cb()
        };
        const validateIDcard = (ruler,val,cb) =>{
            if(!!val){
                if(val.length <= 20){
                    if(!/^[A-Za-z0-9]+$/.test(val)){
                        return cb(new Error(`请输入20位以内的${ruler.name},由字母或数字组成`));
                    }else{return cb()}
                }else{
                    return cb(new Error('请输入20位以内的' + ruler.name));
                }
            }
            cb()
        };

      return {
        tempValidateField:{
            objectname:"", // 对象名称
        },
        showLoading:true,
        chooseItemSign:false,
        onativeList:[], // 民族列表
        oeducationList:[], //学历
        odocumenttypeList:[], //证件类型
        opoliticalstatusList:[],//政治面貌
        sexList:[], // 性别

        ruleValidate: {
            objectname: [{ required: true, name: '对象名称',fieldName:'objectname',validator:stringRulerValidate,max: 30, trigger: 'blur' }],
            oalias: [{ required: true, validator: stringRuler, name: '别名',fieldName:'oalias',max:15, trigger: 'blur' }],
            investigatestarttime:[{ required: true,validator: validateData, name: '侦控起始时间', trigger: 'change' }],
            investigateendtime:[{ required: true,validator: validateData, name: '侦控结束时间', trigger: 'change' }],
            oage:[{ required: false, name: '年龄',fieldName:'oage',validator:validateNumber,max: 3, trigger: 'blur' }],
            odocumentnumber: [{ required: false, validator: validateIDcard, name: '证号号码',fieldName:'idcard',max: 18, trigger: 'blur' }],
            odocumentaddress:[{required:false,type:'string',message:'请输入30个字符以内的证件地址',max: 30,trigger:'blur'}],
            ocontryarea:[{required:false,type:'string',message:'地区请限制在10个字符以内',max: 10,trigger:'blur'}],
            ohomeplace:[{required:false,type:'string',message:'出生地请限制在10个字符以内',max: 10,trigger:'blur'}],
            occupation:[{required:false,type:'string',message:'工作职业请限制在10个字符以内',max: 10,trigger:'blur'}],
            odepartment:[{required:false,type:'string',message:'公司部门请限制在10个字符以内',max: 10,trigger:'blur'}],
            oaddress:[{required:false,type:'string',message:'公司地址请限制在20个字符以内',max: 20,trigger:'blur'}],
            ocharacterstyle:[{required:false,type:'string',message:'性格特征请限制在10个字符以内',max: 10,trigger:'blur'}],
            obodystyle:[{required:false,type:'string',message:'形体特征请限制在50个字符以内',max: 50,trigger:'blur'}],
            osoundstyle:[{required:false,type:'string',message:'声音特征请限制在50个字符以内',max: 50,trigger:'blur'}],
            ointroduction:[{required:false,type:'string',message:'简介请限制在300个字符以内',max: 300,trigger:'blur'}],

            ohomenumber:[{required:false,type:'string',max:20,validator:validateNumber,trigger:'blur',name:"家庭电话"}],
            ounitnumber:[{required:false,type:'string',max:20,validator:validateNumber,trigger:'blur',name:"单位电话"}],

            otelephone:[{required:false,type:'string',max:20,validator:validateMobile,trigger:'blur',name:"移动电话"}],
            oothernumber:[{required:false,type:'string',max:20,validator:validateMobile,trigger:'blur',name:"其他电话"}],
        },
      }
    },
    methods: {
       // 校验 input 字段
       judgeInput(data,cb){
            let judgeArr = ['objectname'];
            let sendData = {
                caseid:data['caseid'],
                objectname:data['fieldvalue']
            };
            let _key = data['fieldName'];
            judgeArr.forEach(v => {
                if(v === _key){
                    caseobjectCheckCaseobejct(sendData).then(res => {
                        if(res.statusCode !== 200) return process_error(res);
                        if(res.data === "1"){
                            return cb(new Error(`${data['name']}已存在请重新输入`));
                        }else{ return cb() }
                    },err => console.log(err))
                }
            })
        },

        chooseItemSignFn(){
            this.chooseItemSign = !this.chooseItemSign;
        },

        // 更改侦控时间 更新sessionSorage 中 初始化的 案件对象信息 case_Obj_Info
        changeInvestigatestarttimeFn(val){
            this.addCaseObjForm.investigatestarttime = val;
            sessionStorage.setItem("case_Obj_Info",JSON.stringify(this.addCaseObjForm));
        },
        changeInvestigatestartendFn(val){
            this.addCaseObjForm.investigateendtime = val;
            sessionStorage.setItem("case_Obj_Info",JSON.stringify(this.addCaseObjForm));
        },

        // 更改出生日期 更新sessionSorage 中 初始化的 案件对象信息 case_Obj_Info
        changeObrithday(val){
            this.addCaseObjForm.obrithday = val;
            sessionStorage.setItem("case_Obj_Info",JSON.stringify(this.addCaseObjForm));
        },

        // 作用: 编辑或查看案件信息时,数据(addCaseInfo)异步加载,子组件(caseInfo.vue)获取不到  cname 而 引发 案件名称修改时，校验不通过
        updatateObjectname(data){
            this.tempValidateField['objectname'] = data.objectname;
            console.log("子组件更新后的对象:",this.tempValidateField['objectname']);
        },
        async getSelectOption(){
            let [
                nationRes,
                politicalOutlookRes,
                educationRes,
                certificateTypeRes,
                sexRes
            ] = await Promise.all([
                findCaseDictionByParent('nation'),
                findCaseDictionByParent('politicalOutlook'),
                findCaseDictionByParent('education'),
                findCaseDictionByParent('certificateType'),
                findCaseDictionByParent('sex')
            ]);
            this.onativeList = nationRes.data;
            this.opoliticalstatusList = politicalOutlookRes.data;
            this.oeducationList = educationRes.data;
            this.odocumenttypeList = certificateTypeRes.data;
            this.sexList = sexRes.data;
        }
    },
    mounted() {
        let caseObjInfo = JSON.parse(sessionStorage.getItem("case_Obj_Info"))
        this.tempValidateField['objectname'] = caseObjInfo['objectname'];
        this.getSelectOption();
        if(this.$route.query.sign === 'edit'){
            this.chooseItemSignFn();
        }
    }
  }
</script>

<style lang="less" scoped>
 .ivu-select-dropdown{
      top:0px !important;
  }
  .moreObjInfo{
    display: inline-block;
    width: 100px;
    height: 14px;
    overflow: hidden;
    transition: 0.3s;
    border: 1px solid #dcdddf;
    border-radius: 5px 5px 0 0;
    border-bottom: 1px solid #ffffff;
    text-align: center;
  }
  .moreObjInfo:hover{
    color: #2b85e4;
    cursor: pointer;
    background: #fff;
  }

</style>
