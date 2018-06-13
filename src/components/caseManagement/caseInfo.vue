<template>
    <div class="adjustWidth">
        <h4 class="title-lv1">#案件信息</h4>
        <Form ref="addCaseInfo" :model="addCaseInfo"  label-position="right" :rules="ruleValidate" :label-width="100">

        <Row>
            <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 5, offset: 2 }">
                <FormItem label="案件编号" prop="cnumber">
                    <Input  type="text" v-model="addCaseInfo.cnumber" placeholder="案件编号" :disabled="isDisabled"></Input>
                </FormItem>
            </Col>
            <Col :xs="{ span: 11, offset: 1 }" :lg="{ span: 5, offset: 2 }">
                <FormItem label="案件名称" prop="cname">
                    <Input  type="text" v-model="addCaseInfo.cname" placeholder="案件名称" :disabled="isDisabled"></Input>
                </FormItem>
            </Col>
        </Row>

        <Row>
            <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 5, offset: 2 }">
                <FormItem label="案件级别" prop="clevelcode">
                <Select @on-change="chooseClevel" v-model="addCaseInfo.clevelcode" placeholder="案件级别" :disabled="isDisabled" label-in-value>
                    <Option v-for="(item,index) in caseLevelList" :value="item.code" :label="item.name" :key="`${index}`">{{item.name}}</Option>
                </Select>
                </FormItem>
            </Col>
            <Col :xs="{ span: 11, offset: 1 }" :lg="{ span: 5, offset: 2 }">
                <FormItem label="案件类型" prop="ctypecode">
                    <Select v-model="addCaseInfo.ctypecode" @on-change="chooseCtype" placeholder="案件类型" :disabled="isDisabled" label-in-value>
                    <Option v-for="(item,index) in ccategoryList" :key="`${index}`" :label="item.name" :value="item.code">{{item.name}}</Option>
                    </Select>
                </FormItem>
            </Col>
            <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 5, offset: 2 }">
                <FormItem label="案件类别" prop="ccategorycode">
                    <Select v-model="addCaseInfo.ccategorycode" @on-change="chooseCcategory" placeholder="案件类别"  :disabled="isDisabled" label-in-value>
                    <Option v-for="(item,index) in caseCategoriesList" :key="`${index}`" :value="item.code" :label="item.name">{{item.name}}</Option>
                    </Select>
                </FormItem>
            </Col>
        </Row>

        <Row>
            <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 5, offset: 2 }">
                    <FormItem label="审批表编号" prop="cappovalnumber">
                    <Input  type="text" v-model="addCaseInfo.cappovalnumber" placeholder="审批表编号" :disabled="isDisabled"></Input>
                    </FormItem>
            </Col>
            <Col :xs="{ span: 11, offset: 1 }" :lg="{ span: 5, offset: 2 }">
                <FormItem label="受理编号" prop="cacceptancenumber">
                    <Input  type="text" v-model="addCaseInfo.cacceptancenumber" placeholder="受理编号" :disabled="isDisabled"></Input>
                </FormItem>
            </Col>
            <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 5, offset: 2 }">
                <FormItem label="受理时间" prop="cacceptancedate">
                    <DatePicker type="datetime" :value="addCaseInfo.cacceptancedate" @on-change="addCaseInfo.cacceptancedate=$event"
                    format="yyyy-MM-dd HH:mm:ss" placeholder="受理时间"
                    style="width:100%" :disabled="isDisabled" :editable="false"></DatePicker>
                </FormItem>
            </Col>
        </Row>

        <Row>
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 5, offset: 2 }">
            <FormItem label="交案类别" prop="cturncasecategorycode">
                <Select v-model="addCaseInfo.cturncasecategorycode" @on-change="chooseCturncasecategory" placeholder="案件类别" :disabled="isDisabled" label-in-value>
                <Option :value="item.code" v-for="(item,index) in handCaseCategoryList" :key="`${index}`">{{item.name}}</Option>
                </Select>
            </FormItem>
          </Col>
            <Col :xs="{ span: 11, offset: 1 }" :lg="{ span: 5, offset: 2 }">
                <FormItem label="交办单位" prop="cturncaseunit">
                <Input  type="text" v-model="addCaseInfo.cturncaseunit" placeholder="交办单位":disabled="isDisabled"></Input>
                </FormItem>
            </Col>
            <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 5, offset: 2 }">
                <FormItem label="交案联系人" prop="cturncaseman">
                    <Input  type="text" v-model="addCaseInfo.cturncaseman" placeholder="交案联系人":disabled="isDisabled"></Input>
                </FormItem>
            </Col>
        </Row>

        <Row>
            <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 5, offset: 2 }">
                <FormItem label="交案联系号码" prop="cturncasenumber">
                    <Input  type="text" v-model="addCaseInfo.cturncasenumber" placeholder="交案联系号码" :disabled="isDisabled"></Input>
                </FormItem>
            </Col>
          <Col :xs="{ span: 11, offset: 1 }" :lg="{ span: 5, offset: 2 }">
            <FormItem label="侦控开始时间" prop="cinvestigatestarttime">
                <DatePicker type="date" :value="addCaseInfo.cinvestigatestarttime" @on-change="addCaseInfo.cinvestigatestarttime=$event"  placeholder="侦控开始时间"
                style="width:100%" :disabled="isDisabled" :editable="false"></DatePicker>
            </FormItem>
          </Col>
            <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 5, offset: 2 }">
                <FormItem label="侦控结束时间" prop="cinvestigateendtime">
                    <DatePicker type="date" :value="addCaseInfo.cinvestigateendtime" @on-change="addCaseInfo.cinvestigateendtime=$event"  placeholder="侦控结束时间"
                    style="width:100%":disabled="isDisabled" :editable="false"></DatePicker>
                </FormItem>
            </Col>
        </Row>

        <Row>
            <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 5, offset: 2 }">
                <FormItem label="登记人" prop="cregisterman">
                    <Input  type="text" v-model="addCaseInfo.cregisterman" placeholder="登记人":disabled="isDisabled"></Input>
                </FormItem>
            </Col>
            <Col :xs="{ span: 11, offset: 1 }" :lg="{ span: 5, offset: 2 }">
                <FormItem label="登记部门" prop="cregistedepartment">
                    <Input  type="text" v-model="addCaseInfo.cregistedepartment" placeholder="登记部门":disabled="isDisabled"></Input>
                </FormItem>
            </Col>
            <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 5, offset: 2 }">
            <FormItem label="登记时间" prop="cregistedate">
              <DatePicker type="datetime" :value="addCaseInfo.cregistedate" @on-change="addCaseInfo.cregistedate=$event"
                          format="yyyy-MM-dd HH:mm:ss" placeholder="登记时间"
                          style="width:100%":disabled="isDisabled" :editable="false"></DatePicker>
            </FormItem>
            </Col>
        </Row>

        <Row>
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 5, offset: 2 }">
            <FormItem label="侦控目的" prop="cinvestigatepurpose">
              <Input  type="text" v-model="addCaseInfo.cinvestigatepurpose" placeholder="侦控目的":disabled="isDisabled"></Input>
            </FormItem>
          </Col>
            <Col :xs="{ span: 11, offset: 1 }" :lg="{ span: 5, offset: 2 }">
                <FormItem label="案件采取手段" prop="cusemethod">
                    <Input  type="text" v-model="addCaseInfo.cusemethod" placeholder="案件采取手段":disabled="isDisabled"></Input>
                </FormItem>
            </Col>
            <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 5, offset: 2 }">
                <FormItem label="中央事权" prop="czyqs">
                    <Input  type="text" v-model="addCaseInfo.czyqs" placeholder="中央事权":disabled="isDisabled"></Input>
                </FormItem>
            </Col>
        </Row>

        <Row>
          <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 5, offset: 2 }">
                <FormItem label="案件性质明细" prop="cpropertydetail">
                    <Input  type="text" v-model="addCaseInfo.cpropertydetail" placeholder="案件性质明细":disabled="isDisabled"></Input>
                </FormItem>
          </Col>
            <Col :xs="{ span: 11, offset: 1 }" :lg="{ span: 5, offset: 2 }">
                <FormItem label="协助类别" prop="cassistcategorycode">
                    <Select v-model="addCaseInfo.cassistcategorycode" @on-change="chooseCassistcategory" placeholder="协助类别" :disabled="isDisabled" label-in-value>
                    <Option :value="item.code" v-for="(item,index) in assistCategoryList" :key="`${index}`">{{item.name}}</Option>
                    </Select>
                </FormItem>
            </Col>
            <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 5, offset: 2 }">
                <FormItem label="异地受理编号" prop="cremoteacceptancenumber">
                  <Input  type="text" v-model="addCaseInfo.cremoteacceptancenumber" placeholder="异地受理编号":disabled="isDisabled"></Input>
                </FormItem>
            </Col>
        </Row>

        <Row class-name="adjustBottom">
            <Col :xs="{ span: 17, offset: 1 }" :lg="{ span: 12, offset: 2 }">
                <FormItem label="侦办人" prop="userStr">
                    <Input disabled v-model="addCaseInfo.userStr" placeholder="请选择侦办人" >
                    <span @click="TreeModalFn" slot="append" :disabled="isDisabled">
                        <Icon type="gear-b" title="请选择侦办人" size="18" style="line-height:100%;"></Icon>
                    </span>
                    </Input>
                </FormItem>
            </Col>

            <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 5, offset: 2 }">
                <FormItem label="承办人（承办人）">
                        <Select v-model="addCaseInfo.cundertakeUser" v-if="!isDisabled" placeholder="请选择承办人" @on-change="radioConfirmOk" :disabled="isDisabled" clearable ref="cundertakeUserOptions">
                        <Option v-for="(item,index) in userTempDataArr" :value="item.userid" :userid="item.userid" :title="item.title" :key="index" :parentid="item.parentid" :ref="`radio${item.userid}`">{{item.title}}</Option>
                    </Select>
                    <Input disabled v-model="addCaseInfo.cundertakeUserStr" placeholder="请选择承办人" v-if="isDisabled"></Input>
                </FormItem>
            </Col>
        </Row>

        <Row v-if="Array.isArray(userTempDataArr) && userTempDataArr.length !== 0" class-name="marginBottom">
            <Col :xs='{offset:1}' :lg="{offset:2}">
                <div v-if="signOfshowUser === 0">
                  <Tag closable v-for="(item,index) in userTempDataArr" :key="index" @on-close="deleteUserByIndex(index)" :disabled="isDisabled">{{`${item.title}(${item.parentTitle})`}}</Tag>
                </div>
                <div v-else>
                  <Tag v-for="(item,index) in userTempDataArr" :key="index" @on-close="deleteUserByIndex(index)" >{{`${item.title}(${item.parentTitle})`}}</Tag>
                </div>
            </Col>
        </Row>

        <Row style="margin-top: 20px">
            <Col span="16" offset="2">
                <FormItem label="案件性质" prop="cproperty">
                    <Input  type="text" v-model="addCaseInfo.cproperty" placeholder="案件性质" :disabled="isDisabled"></Input>
                </FormItem>
            </Col>
        </Row>

        <Row>
            <Col span="16" offset="2">
                <FormItem label="基本案情" prop="csituation">
                    <Input  type="text" v-model="addCaseInfo.csituation" placeholder="基本案情" :disabled="isDisabled"></Input>
                </FormItem>
            </Col>
        </Row>

        <Row>
            <Col span="16" offset="2">
                <FormItem label="立案决定书/逮捕证/通缉令文号" prop="cbook">
                    <Input  type="textarea" v-model="addCaseInfo.cbook" :autosize="{minRows:2,maxRows:5}" placeholder="立案决定书/逮捕证/通缉令文号"
                    :disabled="isDisabled"></Input>
                </FormItem>
            </Col>
        </Row>

        <Row>
            <Col span="16" offset="2">
                <FormItem label="已经采取的侦查措施情况及采取技术侦查措施的必要性说明" prop="cexplain">
                    <Input  type="textarea" v-model="addCaseInfo.cexplain" :autosize="{minRows:2,maxRows:5}" :disabled="isDisabled"></Input>
                </FormItem>
            </Col>
        </Row>

        <Row>
            <Col span="16" offset="2">
                <FormItem label="采取技术侦查措施的目的和要求" prop="cpurpose">
                    <Input  type="textarea" v-model="addCaseInfo.cpurpose" :autosize="{minRows:2,maxRows:5}" :disabled="isDisabled"></Input>
                </FormItem>
            </Col>
        </Row>

        <Row>
            <Col span="16" offset="2">
                <FormItem label="备注" prop="cremarks">
                    <Input  type="textarea" v-model="addCaseInfo.cremarks" :autosize="{minRows:2,maxRows:5}" :disabled="isDisabled"></Input>
                </FormItem>
            </Col>
        </Row>

        <Row type="flex" justify="center" align="middle">
            <Col span="4">
                <FormItem>
                    <!--
                        案件信息状态分析:
                        ***手动录入:cissynchrocase:1
                        首次新增案件信息:
                            显示： 保存| 提交  - 操作成功显示  - 添加对象按钮 并隐藏 保存按钮 显示编辑按钮
                            点击编辑 - 显示保存按钮 、隐藏编辑安妮

                        已存在案件信息:
                            在办: cstatuscode = "0"
                                保存: cdisplay = "0"
                                    编辑、添加对象、提交
                                提交: cdisplay = "1"
                                    仅能查看
                            结案: cstatuscode = "1"
                                    仅能查看

                        ***同步:cissynchrocase:0
                            在办: cstatuscode = "0"
                            结案: cstatuscode = "1"
                    -->
                    <!-- 案件处于 提交状态 -->
                    <span v-if="addCaseInfo.cdisplay === '1' && addCaseInfo.cstatuscode === '0'"></span>
                    <!-- 案件处于 新增/保存 状态  -->
                    <span v-else-if="addCaseInfo.cstatuscode === '0'">
                        <Button type="success" v-if="isShowEditBtn && addCaseInfo.cdisplay ==='0'" @click="editCaseInfo" >编辑</Button> //v-auth="0-1-1-1"
                        <Button type="success" v-if="!isShowEditBtn && addCaseInfo.cdisplay ==='0'" @click="saveCaseInfo('addCaseInfo')" >保存</Button> //v-auth="0-1-1-1"
                        <Button type="success" v-if="addCaseInfo.cdisplay ==='0'" @click="submitCaseInfo('addCaseInfo')" >提交</Button> //v-auth="0-1-1-1"
                        <Button type="primary" @click="cancelAddCaseObjInfo" v-if="!isShowEditBtn && addCaseInfo.cdisplay ==='0'" >取消</Button> //v-auth="0-1-1-1"
                    </span>
                    <!-- 案件处于 结案状态 -->
                    <span v-else></span>
                </FormItem>
            </Col>
        </Row>

        </Form>

        <!--侦办人 tree-->
        <Modal v-model="userTreeModal" title="选择侦办人" @on-ok="confirmOk('user')" @on-cancel="confirmCancel('user')">
          <div>
            <Tree :data="cunderAnduserTreeData" ref="tree" @on-check-change="getCheckedNodesFn"
            show-checkbox multiple></Tree>
          </div>
        </Modal>

    </div>
</template>
<script>
  import {
      findCaseDictionByParent,
      saveOrUpdateCase,
      caseobjectSaveOrUpObjectandNum,
      caseinfoCheckCaseinfo,
      caseinfoDepartUser
      } from '@/service/getData'
  import {process_error} from '@/config/process_request_conf'
  import {mapMutations} from 'vuex'

  export default {
    name: "CaseInfo",
    props:{
        addCaseInfo:Object
    },
    computed:{
        userTempDataArr(){
            return this.userTempData
        }
    },
    data() {
      const validateNumber = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('不能为空,只能为数字'));
        }else if(value.length>30){
            callback(new Error('最多输入30个数字'));
        }else {
          if(!Number.isInteger(+value)) {
            callback(new Error('只能为数字'));
          }else {
            callback();
          }
        }
      };
      const validateStarTime = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择侦控开始时间'));
        }else {
          let endTime = this.addCaseInfo.cinvestigateendtime;
          let starTime = this.addCaseInfo.cinvestigatestarttime;
          if(endTime){
            if (!((new Date(starTime).getTime() / 1000 - new Date(endTime).getTime() / 1000) < 0)) {
              callback(new Error('开始时间应小于结束时间'));
            }else {
              callback();
            }
          }
        }
      };
      const validateEndTime = (rule, value, callback) => {
        let endTime = this.addCaseInfo.cinvestigateendtime;
        let starTime = this.addCaseInfo.cinvestigatestarttime;
        if (value === '') {
          callback(new Error('请选择侦控结束时间'));
        }else {
          if(starTime){
            if (!((new Date(endTime).getTime() / 1000 - new Date(starTime).getTime() / 1000) > 0)) {
              callback(new Error('结束时间应大于开始时间'));
            }else {
              callback();
            }
          }
        }
      };
      const validateTime = (ruler, val, cb) => {
            if (ruler.required) {
                if (val === '' || !val) return cb(new Error('请选择' + ruler.name));
            } else {
                if (val === '' || !val) return cb();
            }

            if (!!this.addCaseInfo.cacceptancedate) {
                if (((new Date(this.addCaseInfo.cacceptancedate).getTime() / 1000 - new Date().getTime() / 1000) > 0)) {
                    cb(new Error('受理时间应在系统当前时间之前!'));
                }
            }
            if (!!this.addCaseInfo.cregistedate) {
                if (((new Date(this.addCaseInfo.cregistedate).getTime() / 1000 - new Date().getTime() / 1000) > 0)) {
                    cb(new Error('登记时间应在系统当前时间之前!'));
                }
            }
            cb()
      };
      const stringRuler = function(ruler, val, cb) {
            val = typeof(val) === 'string' ? val.trim() : val;
            if (ruler.required) {
                if (val === '') return cb(new Error('请输入' + ruler.name));
            } else {
                if (val === '') return cb();
            }
            if (!/^[^ ]+$/.test(val)) {
                return cb(new Error('请输入正确的' + ruler.name))
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
                let judegeIptData = {name:ruler.name,fieldName:ruler.fieldName,fieldvalue:val};
                switch(ruler.fieldName){
                    case 'cnumber':
                        if(val === this.tempValidateField['cnumber']) return cb();
                        break;
                    case 'cname':
                        if(val === this.tempValidateField['cname']) return cb();
                        break;
                }
                this.judgeInput(judegeIptData,cb)
            }
        } else {
            if (val === ''){
              return cb()
            }else if (!/^[^ ]+$/.test(val)) {
              return cb(new Error('请输入正确的' + ruler.name))
            }else{return cb() }
        }
      };
      const validatephone = (ruler, value, cb) => {
            if (ruler.required) {
                if (value === ''){
                    return cb(new Error('请输入' + ruler.name));
                }else if(!/^\d{1,20}$/.test(value)){
                    return cb(new Error('请输入正确的交案联系电话'));
                }else{ return cb()}
            }else if(!!vaue && !/^\d{1,20}$/.test(value)){
                return cb(new Error('请输入正确的交案联系电话'));
            }else{ return cb()}
        };
      return {
        tempValidateField:{
            cname:"", // 案件名称
            cnumber:"" // 案件编号
        },
        editableBool:false, //时间不可输入
        isDisabled:false,
        isShowEditBtn:false,
        caseCategoriesList:[],//案件类别
        ccategoryList:[], //案件类型
        caseLevelList:[], //案件级别
        handCaseCategoryList:[],//交案类别
        assistCategoryList:[],//交案类别
        numTypeList:[], // 数据类型
        // 弹窗 (侦办人) tree
        userTreeModal:false,
        chooseUserItemTemp:[], // 临时侦办人暂存数组
        // 弹窗 (承办人) tree
        cundertakeUserTreeModal:false,
        // 侦办人 | 承办人 tree data
        cunderAnduserTreeData:[],
        cunderAnduser:"", // 承办人id
        signOfshowUser:0, // 0:展示待 close 的tag 1：展示 no close 的 tag
        userTempData:[], // 存放侦办人数组
        ruleValidate:{
          cnumber:[
            {required:true,max:30,type:'string',name:'案件编号',fieldName:'cnumber',validator:stringRulerValidate,trigger:'blur'}
          ],
          ccategorycode:[
            {required:true,type:'string',message:'请选择案件类别',trigger:'change'}
          ],
          cappovalnumber:[
            {required:true,validator:stringRuler,trigger:'blur',name:"审批表编号"},
            {max:30,message:'最多输入30个数字',trigger:'change'}
          ],
          userStr:[
            {required:true,type:'string',message:'侦办人不能为空',trigger:'change'}
          ],
          cinvestigatestarttime:[
            {required:true,validator:validateStarTime,trigger:'change'}
          ],
          cproperty:[
            {required:true,type:'string',message:'案件性质不能为空',trigger:'blur'}
          ],
          cacceptancenumber:[
            {required:true,type:'string',validator:stringRuler,trigger:'blur',name:"受理编号"},
            {max:30,message:'最多输入30个数字',trigger:'change'}
          ],
          cacceptancedate:[
            {required:true,type:'date',name:"受理时间",validator:validateTime,trigger:'change'}
          ],
          cturncasecategorycode:[
            {required:true,type:'string',message:'请选择交案类别',trigger:'change'}
          ],
          cturncaseman:[
            {required:true,type:'string',message:'交案联系人不能为空',trigger:'blur'}
          ],
          cregistedepartment:[
            {required:true,type:'string',message:'登记部门不能为空',trigger:'blur'}
          ],
          csituation:[
            {required:true,type:'string',message:'基本案件不能为空',trigger:'blur'}
          ],
          cname:[
            {required:true,type:'string',name: '案件名称',fieldName:'cname',validator:stringRulerValidate,trigger:'blur'}
          ],
          ctypecode:[
            {required:true,type:'string',message:'请选择案件类型',trigger:'change'}
          ],
          clevelcode:[
            {required:true,type:'string',message:'请选择案件级别',trigger:'change'}
          ],
          cinvestigateendtime:[
            {required:true,validator:validateEndTime,trigger:'change'}
          ],
          cturncaseunit:[
            {required:true,type:'string',message:'交办单位不能为空',trigger:'blur'}
          ],
          cturncasenumber:[
            {required:true,type:'string',validator:validatephone,name:"交案联系号码",trigger:'blur'}
          ],
          cregisterman:[
            {required:true,type:'string',message:'登记人不能为空',trigger:'blur'}
          ],
          cregistedate:[
            {required:true,type:'date',name:"登记日期",validator:validateTime,trigger:'change'}
          ],

          cbook:[{required:false,type:'string',message:'请限制在100个字符以内',max: 100,trigger:'blur'}],
          cpurpose:[{required:false,type:'string',message:'请限制在300个字符以内',max: 300,trigger:'blur'}],
          cexplain:[{required:false,type:'string',message:'请限制在300个字符以内',max: 300,trigger:'blur'}],
          cremarks:[{required:false,type:'string',message:'备注请限制在300个字符以内',max: 300,trigger:'blur'}],
        }
      }
    },
    methods:{
      ...mapMutations([
        'SAVE_CASE_OBJ_SIGN','SAVE_INVESTIGATE_TREE'
      ]),

     // 组织 select 下拉列表字段
     chooseClevel(obj){
        this.addCaseInfo.clevelcode = obj.value;
        this.addCaseInfo.clevel = obj.label;
     },
     chooseCtype(obj){
        this.addCaseInfo.ctypecode = obj.value;
        this.addCaseInfo.ctype = obj.label;
     },
     chooseCcategory(obj){
        this.addCaseInfo.ccategorycode = obj.value;
        this.addCaseInfo.ccategory = obj.label;
     },
     chooseCturncasecategory(obj){
        this.addCaseInfo.cturncasecategorycode = obj.value;
        this.addCaseInfo.cturncasecategory = obj.label;
     },
     chooseCassistcategory(obj){
        this.addCaseInfo.cassistcategorycode = obj.value;
        this.addCaseInfo.cassistcategory = obj.label;
     },

     // 校验 input 字段
      judgeInput(data,cb){
        let judgeArr = ['cname','cnumber'];
        let sendData = {
            fieldname:data['fieldName'],
            fieldvalue:data['fieldvalue']
        };
        let _key = data['fieldName'];
        judgeArr.forEach(v => {
        if(v === _key){
            caseinfoCheckCaseinfo(sendData).then(res => {
                if(res.statusCode !== 200) return process_error(res);
                if(res.data === "1"){
                    return cb(new Error(`${data['name']}已存在请重新输入`));
                }else{ return cb() }
            },err => console.log(err))
        }
        })
     },

    // 下拉列表数据
      async selectData(){
        let [
            numTypeListData,
            caseCategoriesData,
            caseTypeData,
            caseLevelData,
            handCaseCategory,
            assistCategoryData
        ] = await Promise.all([
            findCaseDictionByParent('numType'),
            findCaseDictionByParent('caseCategories'),
            findCaseDictionByParent('caseType'),
            findCaseDictionByParent('caseLevel'),
            findCaseDictionByParent('handCaseCategory'),
            findCaseDictionByParent('assistCategory')
        ]);
        this.caseCategoriesList = caseCategoriesData.data;
        this.ccategoryList = caseTypeData.data;
        this.caseLevelList = caseLevelData.data;
        this.handCaseCategoryList = handCaseCategory.data;
        this.assistCategoryList = assistCategoryData.data;
        this.numTypeList = numTypeListData.data;
        sessionStorage.setItem("case_Obj_sign_numType",JSON.stringify(this.numTypeList));
      },

    // 提交案件信息
     submitCaseInfo(name){
        this.$refs[name].validate((valid)=>{
          if(valid){
            this.addCaseInfo.cdisplay = 1;
            this.save_submit_caseInfoFn();
          } else {
            this.$Message.error('提交错误')
          }
        })
      },

    //   保存案件信息
     saveCaseInfo(name){
       this.$refs[name].validate((valid)=>{
           if(valid){
             this.addCaseInfo.cdisplay = '0';
             this.save_submit_caseInfoFn();
             this.isShowEditBtn = true;
           }else {
             this.$Message.error('保存错误')
           }
       })
      },

    //   公共 保存 和 提交 函数
      async save_submit_caseInfoFn(){
        await saveOrUpdateCase(this.addCaseInfo)
            .then(res => {
                if(res.statusCode !== 200) return process_error(res);
                Object.assign(this.addCaseInfo,res.data);  //保存、提交后会生成 caseId
                console.log("提交案件后this.addCaseInfo:",this.addCaseInfo);
                this.SAVE_CASE_OBJ_SIGN(res.data);
                this.signOfshowUser = 1;
                this.$Message.success(`${res.message}`);
                this.tempValidateField['cnumber'] = res.data.cnumber;
                this.tempValidateField['cname'] = res.data.cname;
                this.$emit("getCaseId",res.data);
                this.isDisabled = true;
            })
            .catch(err => console.log(err))
      },

      editCaseInfo(){
          this.isShowEditBtn = false;
          this.isDisabled = false;
          this.signOfshowUser = 0;
      },
      enabledOperateBtn(){
          this.isDisabled = true;
          this.isShowEditBtn = true;
      },
      cancelAddCaseObjInfo(){
          this.$router.push({path:'/caseManageList'});
      },
     // tree start
     // 点击按钮触发 请求侦办人、承办人 tree data  原因: 为了 重置 tree
     async TreeModalFn(){
         if(!this.isDisabled){
            this.userTreeModal = true;
            await caseinfoDepartUser()
            .then(res => {
                if(res.statusCode !== 200) return process_error(res);
                this.cunderAnduserTreeData = res.data;
                this.SAVE_INVESTIGATE_TREE(res.data);
            })
            .catch(err => console.log(err));
         }
     },

     getCheckedNodesFn(){
         this.chooseUserItemTemp = this.$refs.tree.getCheckedNodes();
         console.log("选中的节点:",this.chooseUserItemTemp);
     },

     //  sign : 存在(侦办人)  | 不存在(承办人)
     confirmOk(sign){
            this.addCaseInfo['cundertakeUser'] = "";
            this.userTempData = []; // 保存选择侦办人  临时数组
            this.chooseUserItemTemp.forEach(v => {
                if(v.isDepart !== true){    // 去除选中的部门节点
                    let obj = {
                        "caseid":this.addCaseInfo['caseid'],
                        "departmentid":v.parentid,
                        "id":"",
                        "userid":v.id,
                        "title":v.title,
                        "parentTitle":v.parentTitle,
                        "parentid":v.parentid
                    };
                    this.userTempData.push(obj);  // 此处不可将数据直接 push 给要提交的数组
                }
            });
            this.addCaseInfo['casemansList'] = this.userTempData;
            this.addCaseInfo['userStr'] = "";
            this.userTempData.forEach(v => {
                this.addCaseInfo['userStr'] += `${v.title}(${v.parentTitle}),`;
            })
            //  去除最后一位 的 ","
            let len = this.addCaseInfo['userStr'].length;
            this.addCaseInfo['userStr'] = this.addCaseInfo['userStr'].substring(0,len-1);
      },
     // 取消侦办人的选择
     confirmCancel(sign){},
     // 删除 tag
     deleteUserByIndex(index){
        this.addCaseInfo['casemansList'] = this.userTempData.splice(index,1);
        console.log("删除某个侦办人后 this.addCaseInfo['casemansList']:",this.addCaseInfo['casemansList']);
        // 移除 input 框中的内容
        let arr = this.addCaseInfo['userStr'].split(',');
        arr.splice(index,1);
        this.addCaseInfo['userStr'] = arr.join()
     },

    // 选择 承办人
    radioConfirmOk(){
        if(!!this.$refs[`radio${this.addCaseInfo.cundertakeUser}`]){
            let domNode = this.$refs[`radio${this.addCaseInfo.cundertakeUser}`][0];
            this.addCaseInfo['cundertakeDept'] = domNode.$attrs.parentid; // 承办人部门id
            this.addCaseInfo['cundertakeUser'] = domNode.$attrs.userid; // 承办人id
            this.addCaseInfo['cundertakeUserStr'] = domNode.$attrs.title; // 承办人
        }else{
            this.addCaseInfo['cundertakeDept'] = "";
            this.addCaseInfo['cundertakeUser'] = "";
            this.addCaseInfo['cundertakeUserStr'] = "";
        }
    },
    //  tree end

    // 作用: 编辑或查看案件信息时,数据(addCaseInfo)异步加载,子组件(caseInfo.vue)获取不到  cname 而 引发 案件名称修改时，校验不通过
    updatateCname(data){
        this.tempValidateField['cnumber'] = data.cnumber;
        this.tempValidateField['cname'] = data.cname;
        // 仅能查看侦办人
        this.signOfshowUser = 1;
        this.userTempData = [];
        // 此处不可使用异步操作
        for(let v of data.casemansList){
            let obj = {
                "caseid":v.caseid,
                "departmentid":v.departmentid,
                "id":v.id,
                "userid":v.userid,
                "title":v.username,
                "parentTitle":v.departmentname,
                "parentid":v.departmentid
            }
            this.userTempData.push(obj);
        }
        this.addCaseInfo['cundertakeUser'] = data.cundertakeUser;
        this.addCaseInfo['cundertakeDept'] = data.cundertakeDept;
    },
    },
    mounted(){
      this.selectData();
    }
  }
</script>

<style lang="less" scoped>
  .adjustWidth{
    .title-lv1{
        margin-right: 20px;
        display: inline-block;
    }
    .ivu-modal-footer .ivu-btn{
        display: none;
    }
    .ivu-tooltip{
      width: 100%;
      .ivu-tooltip-rel{
        width:100% !important;
     }
    }
    .ivu-tag-border{border-color:#4776c8;}
  }
  .adjustBottom{
      .ivu-form-item{
        margin-bottom:0px;
      }
  }
  .marginBottom{margin-bottom:10px;}
</style>
