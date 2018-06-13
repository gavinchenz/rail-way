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
  }  
</style>
<template>
  <div>
    <Row class-name="row" style="padding-top:16px;font-size:13px;">
      <Col span="4" align="right" class="colorCase case-title">
      案件名称：</Col>
      <Col span="4" class="case-info">
      &nbsp;&nbsp;{{addCaseObjForm.cname}}</Col>
      <Col span="4" align="right" class="colorCase case-title">
      案件编号：</Col>
      <Col span="4" class="case-info">
      &nbsp;&nbsp;{{addCaseObjForm.cnumber}}</Col>
    </Row>
    <Row class-name="row" style="padding-top:16px;font-size:13px;">
      <Col span="4" align="right" class="colorCase case-title">
      对象名称：</Col>
      <Col span="4" class="case-info">
      &nbsp;&nbsp;{{addCaseObjForm.objectname}}</Col>
      <Col span="4" align="right" class="colorCase case-title">
      侦控开始时间：</Col>
      <Col span="4" class="case-info">
      &nbsp;&nbsp;{{addCaseObjForm.investigatestarttime}}&nbsp;</Col>
      <Col span="4" align="right" class="colorCase case-title">
      侦控结束时间：</Col>
      <Col span="4" class="case-info">      
      &nbsp;&nbsp;{{addCaseObjForm.investigateendtime}}&nbsp;</Col>
    </Row>

    <Row class-name="row" style="padding-top:16px;font-size:13px;">
      <Col span="4" align="right" class="colorCase case-title">
      别名：</Col>
      <Col span="4" class="case-info">
      &nbsp;&nbsp;{{addCaseObjForm.oalias}}&nbsp;</Col>
      <Col span="4" align="right" class="colorCase case-title">
      性别：</Col>
      <Col span="4" class="case-info">
      &nbsp;&nbsp;{{addCaseObjForm.osexualStr}}&nbsp;</Col>
      <Col span="4" align="right" class="colorCase case-title">
      年龄：</Col>
      <Col span="4" class="case-info">
      &nbsp;&nbsp;{{addCaseObjForm.oage}}&nbsp;</Col>
    </Row>
    <Row class-name="row" style="padding-top:16px;font-size:13px;">
      <Col span="4" align="right" class="colorCase case-title">
      证件类型：</Col>
      <Col span="4" class="case-info">
      &nbsp;&nbsp;{{addCaseObjForm.odocumenttypeStr}}&nbsp;</Col>
      <Col span="4" align="right" class="colorCase case-title">
      证件号码：</Col>
      <Col span="4" class="case-info">
      &nbsp;&nbsp;{{addCaseObjForm.odocumentnumber}}&nbsp;</Col>
      <Col span="4" align="right" class="colorCase case-title">
      证件地址：</Col>
      <Col span="4" class="case-info">
      &nbsp;&nbsp;{{addCaseObjForm.odocumentaddress}}&nbsp;</Col>
    </Row>
    <Row class-name="row" style="padding-top:16px;font-size:13px;">
      <Col span="4" align="right" class="colorCase case-title">
      民族：</Col>
      <Col span="4" class="case-info">
      &nbsp;&nbsp;{{addCaseObjForm.onativeStr}}&nbsp;</Col>
      <Col span="4" align="right" class="colorCase case-title">
      政治面貌：</Col>
      <Col span="4" class="case-info">
      &nbsp;&nbsp;{{addCaseObjForm.opoliticalstatusStr}}&nbsp;</Col>
      <Col span="4" align="right" class="colorCase case-title">
      国家地区：</Col>
      <Col span="4" class="case-info">
      &nbsp;&nbsp;{{addCaseObjForm.ocontryarea}}&nbsp;</Col>
    </Row>
    <Row class-name="row" style="padding-top:16px;font-size:13px;">
      <Col span="4" align="right" class="colorCase case-title">
      出生日期：</Col>
      <Col span="4" class="case-info">
      &nbsp;&nbsp;{{addCaseObjForm.obrithday}}&nbsp;</Col>
      <Col span="4" align="right" class="colorCase case-title">
      出生地：</Col>
      <Col span="4" class="case-info">
      &nbsp;&nbsp;{{addCaseObjForm.ohomeplace}}&nbsp;</Col>
      <Col span="4" align="right" class="colorCase case-title">
      学历：</Col>
      <Col span="4" class="case-info">
      &nbsp;&nbsp;{{addCaseObjForm.oeducationStr}}&nbsp;</Col>
    </Row>
    <Row class-name="row" style="padding-top:16px;font-size:13px;">
      <Col span="4" align="right" class="colorCase case-title">
      工作职业：</Col>
      <Col span="4" class="case-info">
      &nbsp;&nbsp;{{addCaseObjForm.occupation}}&nbsp;</Col>
      <Col span="4" align="right" class="colorCase case-title">
      公司部门：</Col>
      <Col span="4" class="case-info">
      &nbsp;&nbsp;{{addCaseObjForm.odepartment}}&nbsp;</Col>
      <Col span="4" align="right" class="colorCase case-title">
      公司地址：</Col>
      <Col span="4" class="case-info">
      &nbsp;&nbsp;{{addCaseObjForm.oaddress}}&nbsp;</Col>
    </Row>
    <Row class-name="row" style="padding-top:16px;font-size:13px;">
      <Col span="4" align="right" class="colorCase case-title">
      单位电话：</Col>
      <Col span="4" class="case-info">
      &nbsp;&nbsp;{{addCaseObjForm.ounitnumber}}&nbsp;</Col>
      <Col span="4" align="right" class="colorCase case-title">
      家庭电话：</Col>
      <Col span="4" class="case-info">
      &nbsp;&nbsp;{{addCaseObjForm.ohomenumber}}&nbsp;</Col>
      <Col span="4" align="right" class="colorCase case-title">
      移动电话：</Col>
      <Col span="4" class="case-info">
      &nbsp;&nbsp;{{addCaseObjForm.otelephone}}&nbsp;</Col>
    </Row>
    <Row class-name="row" style="padding-top:16px;font-size:13px;">
      <Col span="4" align="right" class="colorCase case-title">
      其他电话：</Col>
      <Col span="4" class="case-info">
      &nbsp;&nbsp;{{addCaseObjForm.oothernumber}}&nbsp;</Col>
      <Col span="4" align="right" class="colorCase case-title">
      性格特征：</Col>
      <Col span="4" class="case-info">
      &nbsp;&nbsp;{{addCaseObjForm.ocharacterstyle}}&nbsp;</Col>
      <Col span="4" align="right" class="colorCase case-title">
      形体特征：</Col>
      <Col span="4" class="case-info">
      &nbsp;&nbsp;{{addCaseObjForm.obodystyle}}&nbsp;</Col>
    </Row>
    <Row class-name="row" style="padding-top:16px;font-size:13px;">
      <Col span="4" align="right" class="colorCase case-title">
      形体特征：</Col>
      <Col span="4" class="case-info">
      &nbsp;&nbsp;{{addCaseObjForm.obodystyle}}&nbsp;</Col>
      <Col span="4" align="right" class="colorCase case-title">
      声音特征：</Col>
      <Col span="4" class="case-info">
      &nbsp;&nbsp;{{addCaseObjForm.osoundstyle}}&nbsp;</Col>
      <Col span="4" align="right" class="colorCase case-title">
      技能：</Col>
      <Col span="4" class="case-info">
      &nbsp;&nbsp;{{addCaseObjForm.oskill}}&nbsp;</Col>
    </Row>
    <Row class-name="row" style="padding-top:16px;font-size:13px;">
      <Col span="4" align="right" class="colorCase" style="font-size: 13px;color: #020202;">
      简介：</Col>
      <Col span="18" align="left" style="font-size: 12px;">
      <span>&nbsp;&nbsp;{{addCaseObjForm.ointroduction}}</span>
      </Col>
    </Row>

  </div>
</template>
<script>
  export default {
    name: 'addCaseObjForm',
    props: {
      addCaseObjForm: Object
    },
    data() {
      return {}
    },
    methods: {
      // don't delete
      updatateObjectname(data) { },
    },
  }
</script>
