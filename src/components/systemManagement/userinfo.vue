<style scoped>
  .expand-row{
    margin-bottom: 10px;
  }
</style>
<template>
  <div>
    <Row class="expand-row">
      <Col span="6">
      <span class="expand-key">性别: </span>
      <span class="expand-value">{{ row.sexName }}</span>
      </Col>
      <Col span="6">
      <span class="expand-key">生日: </span>
      <span class="expand-value">{{ row.birthday }}</span>
      </Col>
      <Col span="6">
      <span class="expand-key">入职日期: </span>
      <span class="expand-value">{{ row.hiredate }}</span>
      </Col>
      <Col span="6">
      <span class="expand-key">创建时间: </span>
      <span class="expand-value">{{ row.createTime }}</span>
      </Col>
    </Row>
    <Row>
      <Col span="24">
      <span class="expand-key">备注: </span>
      <span class="expand-value">{{ row.remark }}</span>
      </Col>
    </Row>
  </div>
</template>
<script>
  export default {
    props: {
      row: Object
    }
  };
</script>
