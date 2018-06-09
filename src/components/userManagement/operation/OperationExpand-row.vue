<template>
  <div>
    <Row>
      <Col span="12">
        <b class="expand-key">操作URL: </b>
        <span class="expand-value">&nbsp;{{ row.ourl }}</span>
      </Col>
      <Col span="12">
        <b class="expand-key">操作描述: </b>
        <span class="expand-value">&nbsp;{{ row.odesc }}</span>
      </Col>
    </Row>
  </div>
</template>

<script>
    export default {
        props: {
          row: Object
        }
    }
</script>

<style scoped>
.expand-key{
  font-weight: ;
}
</style>
