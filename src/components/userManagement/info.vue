<template>
  <div>
    <Row  class="expand-row">
      <Col span="24">
      <span class="expand-key">描述 : &nbsp;&nbsp;</span>
      <span class="expand-value">{{ row.ddesc }}</span>
      </Col>
      <Col span="24">
      <span class="expand-key">备注 : &nbsp;&nbsp;</span>
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
