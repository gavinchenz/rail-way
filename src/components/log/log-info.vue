<style scoped>
</style>
<template>
  <div>
    <Row class="expand-row">
      <Col span="8">
      <span class="expand-key">模型名称：</span>
      <span class="expand-value">{{ row.modelName }}</span>
      </Col>
      <Col span="8">
      <span class="expand-key">日志描述：</span>
      <span class="expand-value">{{ row.bat1 }}</span>
      </Col>
    </Row>
  </div>
</template>

<script>
  export default {
    props: {
      row: Object
    },
    data () {

      return {

      }
    },
    mounted(){
    },
    methods: {
    }
  };

</script>
