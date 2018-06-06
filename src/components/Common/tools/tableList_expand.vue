<style scoped>
    .expand-row {
        margin-bottom: 16px;
    }
</style>
<template>
  <div>
    <Row class="expand-row">
      <Col span="16">
            <span class="expand-key">{{title[0]}}：</span>
            <span class="expand-value">{{ row[columnField[0]] }}</span>
      </Col>
      <Col span="8">
            <span class="expand-key">{{title[1]}}：</span>
            <span class="expand-value">{{ row[columnField[1]] }}</span>
      </Col>
    </Row>
  </div>
</template>
<script>
    export default {
        props: {
            title: {
                type: Array,
                default: "数据展示"
            },
            row: Object,
            columnField: Array,
        }
    };
</script>