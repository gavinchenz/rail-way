<style lang="less" scoped>
    .row {
        padding: 4px;
        margin: 0px;
        background: rgb(241, 250, 255);
        margin: 0px 20px 0px 20px;
    }
    
    .main-title {
        font-size: 15px;
        font-weight: 600;
    }
    
    .rowLineHeight {
        line-height: 30px;
        padding-left: 9px;
        margin: 0px 20px 0px 20px;
    }
    
    .colorCase {
        color: #777
    }
    
    .vm-panel .panel-body {
        font-size: 13px;
    }
    
    .case-title {
        font-size: 13px;
        color: #020202;
    }
    .case-info{
      font-size:12px/19px;
      .ivu-tag-border{border-color:#4776c8;}
    }
</style>
<template>
  <div>
    <Row class-name="row" style="padding-top:16px;font-size:13px;">
      <Col span="4" align="right" class="colorCase case-title">
      案件编号：</Col>
      <Col span="4" class="case-info">
      &nbsp;&nbsp;{{caseInfo.cnumber}}</Col>
      <Col span="4" align="right" class="colorCase case-title">
      案件名称：</Col>
      <Col span="4" class="case-info">
      &nbsp;&nbsp;{{caseInfo.cname}}</Col>             
    </Row>

    <Row class-name="row" style="padding-top:16px;font-size:13px;">
      <Col span="4" align="right" class="colorCase case-title">
      案件类别：</Col>
      <Col span="4" class="case-info">
      &nbsp;&nbsp;{{caseInfo.ccategory}}</Col>
      <Col span="4" align="right" class="colorCase case-title">
      案件类型：</Col>
      <Col span="4" class="case-info">
      &nbsp;&nbsp;{{caseInfo.ctype}}</Col>
      <Col span="4" align="right" class="colorCase case-title">
      案件级别：</Col>
      <Col span="4" class="case-info">
      &nbsp;&nbsp;{{caseInfo.clevel}}</Col>
    </Row>

    <Row class-name="row" style="padding-top:16px;font-size:13px;">
      <Col span="4" align="right" class="colorCase case-title">
      审批表编号：</Col>
      <Col span="4" class="case-info">
      &nbsp;&nbsp;{{caseInfo.cappovalnumber}}&nbsp;</Col>
      <Col span="4" align="right" class="colorCase case-title">
      受理编号：</Col>
      <Col span="4" class="case-info">
      &nbsp;&nbsp;{{caseInfo.cacceptancenumber}}&nbsp;</Col>
      <Col span="4" align="right" class="colorCase case-title">
      受理时间：</Col>
      <Col span="4" class="case-info">
      &nbsp;&nbsp;{{caseInfo.cacceptancedate}}&nbsp;</Col>
    </Row> 

    <Row class-name="row" style="padding-top:16px;font-size:13px;">
      <Col span="4" align="right" class="colorCase case-title">
      交案类别：</Col>
      <Col span="4" class="case-info">
      &nbsp;&nbsp;{{caseInfo.cturncasecategory}}&nbsp;</Col>
      <Col span="4" align="right" class="colorCase case-title">
      交办单位：</Col>
      <Col span="4" class="case-info">
      &nbsp;&nbsp;{{caseInfo.cturncaseunit}}&nbsp;</Col>
      <Col span="4" align="right" class="colorCase case-title">
      交案联系人：</Col>
      <Col span="4" class="case-info">
      &nbsp;&nbsp;{{caseInfo.cturncaseman}}&nbsp;</Col>      
    </Row>

    <Row class-name="row" style="padding-top:16px;font-size:13px;">
      <Col span="4" align="right" class="colorCase case-title">
      交案联系号码：</Col>
      <Col span="4" class="case-info">
      &nbsp;&nbsp;{{caseInfo.cturncasenumber}}&nbsp;</Col>
      <Col span="4" align="right" class="colorCase case-title">
      侦控开始时间：</Col>
      <Col span="4" class="case-info">
      &nbsp;&nbsp;{{caseInfo.cinvestigatestarttime}}&nbsp;</Col>
      <Col span="4" align="right" class="colorCase case-title">
      侦控结束时间：</Col>
      <Col span="4" class="case-info">
      &nbsp;&nbsp;{{caseInfo.cinvestigateendtime}}&nbsp;</Col>
    </Row> 

    <Row class-name="row" style="padding-top:16px;font-size:13px;">
      <Col span="4" align="right" class="colorCase case-title">
      登记人：</Col>
      <Col span="4" class="case-info">
      &nbsp;&nbsp;{{caseInfo.cregisterman}}&nbsp;</Col>
      <Col span="4" align="right" class="colorCase case-title">
      登记部门：</Col>
      <Col span="4" class="case-info">
      &nbsp;&nbsp;{{caseInfo.cregistedepartment}}&nbsp;</Col>      
      <Col span="4" align="right" class="colorCase case-title">
      登记时间：</Col>
      <Col span="4" class="case-info">
      &nbsp;&nbsp;{{caseInfo.cregistedate}}&nbsp;</Col>      
    </Row>    

    <Row class-name="row" style="padding-top:16px;font-size:13px;">
      <Col span="4" align="right" class="colorCase case-title">
      侦控目的：</Col>
      <Col span="4" class="case-info">
      &nbsp;&nbsp;{{caseInfo.cinvestigatepurpose}}&nbsp;</Col>
      <Col span="4" align="right" class="colorCase case-title">
      案件采取手段：</Col>
      <Col span="4" class="case-info">
      &nbsp;&nbsp;{{caseInfo.cusemethod}}&nbsp;</Col>
      <Col span="4" align="right" class="colorCase case-title">
      中央事权：</Col>
      <Col span="4" class="case-info">
      &nbsp;&nbsp;{{caseInfo.czyqs}}&nbsp;</Col>
    </Row>               

    <Row class-name="row" style="padding-top:16px;font-size:13px;">
      <Col span="4" align="right" class="colorCase case-title">
      案件性质明细：</Col>
      <Col span="4" class="case-info">
      &nbsp;&nbsp;{{caseInfo.cpropertydetail}}&nbsp;</Col>
      <Col span="4" align="right" class="colorCase case-title">
      协助类别：</Col>
      <Col span="4" class="case-info">
      &nbsp;&nbsp;{{caseInfo.cassistcategory}}&nbsp;</Col>
      <Col span="4" align="right" class="colorCase case-title">
      异地受理编号：</Col>
      <Col span="4" class="case-info">
      &nbsp;&nbsp;{{caseInfo.cremoteacceptancenumber}}&nbsp;</Col>      
    </Row>

    <Row class-name="row" style="padding-top:16px;font-size:13px;">
      <Col span="4" align="right" class="colorCase case-title">
      侦办人：</Col>
      <Col span="12" class="case-info">
      <!--&nbsp;&nbsp;{{caseInfo.userStr}}&nbsp;-->
      <Tag v-for="(item,index) in casemansListArr" :key="index" type="border">
        <span v-if="!!item.title && !!item.parentTitle">{{`${item.title}(${item.parentTitle})`}}</span>
        <span v-else>{{`${item.username}(${item.departmentname})`}}</span>
        </Tag>      
      </Col>      
      <Col span="4" align="right" class="colorCase case-title">
      承办人：</Col>
      <Col span="4" class="case-info">
      &nbsp;&nbsp;{{caseInfo.cundertakeUserStr}}&nbsp;</Col>
    </Row>

    <Row class-name="row" style="padding-top:16px;font-size:13px;">
      <Col span="4" align="right" class="colorCase case-title">
      案件性质：</Col>
      <Col span="20" class="case-info">
      &nbsp;&nbsp;{{caseInfo.cproperty}}&nbsp;</Col>
    </Row>  

    <Row class-name="row" style="padding-top:16px;font-size:13px;">
      <Col span="4" align="right" class="colorCase case-title">
      基本案情：</Col>
      <Col span="20" class="case-info">
      &nbsp;&nbsp;{{caseInfo.csituation}}&nbsp;</Col>
    </Row>

    <Row class-name="row" style="padding-top:16px;font-size:13px;">
      <Col span="4" align="right" class="colorCase case-title">
      立案决定书/逮捕证/通缉令文号：</Col>
      <Col span="20" class="case-info">
      &nbsp;&nbsp;{{caseInfo.cbook}}&nbsp;</Col>
    </Row>       

    <Row class-name="row" style="padding-top:16px;font-size:13px;">
      <Col span="4" align="right" class="colorCase case-title">
      已经采取的侦查措施情况及采取技术侦查措施的必要性说明：</Col>
      <Col span="20" class="case-info">
      &nbsp;&nbsp;{{caseInfo.cexplain}}&nbsp;</Col>      
    </Row>
    <Row class-name="row" style="padding-top:16px;font-size:13px;">
      <Col span="4" align="right" class="colorCase case-title">
      采取技术侦查措施的目的和要求：</Col>
      <Col span="20" class="case-info">
      &nbsp;&nbsp;{{caseInfo.cpurpose}}&nbsp;</Col>
    </Row> 

    <Row class-name="row title" style="padding-bottom:16px;font-size:13px;">
      <Col span="4" align="right" class="colorCase" style="font-size: 13px;color: #020202;">
      备注：</Col>
      <Col span="20" align="left" style="font-size: 12px;color: #2;">
      <span>&nbsp;&nbsp;{{caseInfo.cremarks}}</span>
      </Col>
    </Row>

  </div>
</template>
<script>
  import {findCaseDictionByParent } from '@/service/getData'  
    export default {
        name: 'CaseInfo',
        props: {
            caseInfo: Object
        },
        computed:{
          casemansListArr(){
            return this.caseInfo.casemansList
          }
        },
        data() {
            return {
              numTypeList:[],              
            }
        },
        methods: {
              enabledOperateBtn(){},
              updatateCname(){},          
            // 下拉列表数据
              async selectData(){
                let numTypeListData = await findCaseDictionByParent('numType');
                this.numTypeList = numTypeListData.data;
                sessionStorage.setItem("case_Obj_sign_numType",JSON.stringify(this.numTypeList));
              },          
         },
         created(){
           this.selectData();
         }
    }
</script>