<style scoped lang="less">
    .expand-row {
        margin-bottom: 16px;
    }
</style>
<template>
  <div>
    <Row class="expand-row">
      <Col span="6">
            <span class="expand-key">{{title[0]}}：</span>
            <span class="expand-value">{{ row[columnField[0]] }}</span>
      </Col>
      <Col span="6">
            <span class="expand-key">{{title[1]}}：</span>
            <span class="expand-value">{{ row[columnField[1]] }}</span>
      </Col>
      <Col span="6">
            <span class="expand-key">{{title[2]}}：</span>
            <span class="expand-value">{{ row[columnField[2]] }}</span>
      </Col>
      <Col span="6">
            <span class="expand-key">{{title[3]}}：</span>
            <span class="expand-value">{{ row[columnField[3]] }}</span>
      </Col>
    </Row>
    <Row class="expand-row">
      <Col span="6">
            <span class="expand-key">{{title[4]}}：</span>
            <span class="expand-value">{{ row[columnField[4]] }}</span>
      </Col>
      <Col span="6">
            <span class="expand-key">{{title[5]}}：</span>
            <span class="expand-value">{{ row[columnField[5]] }}</span>
      </Col>
      <Col span="6">
            <span class="expand-value">{{ title[7] }}:</span>
            <span class="expand-key">{{ row[columnField[7]] }}</span>
      </Col>
    </Row>
      <!--
     <Row class="expand-row">
      <Col span="24">           
            <span class="expand-key">{{`${title[6]}(${row[columnField[7]]}个)`}}：</span>
            <Tag v-for="(item,index) in row[columnField[6]]" :key="index" type="border">{{item}}</Tag>            
      </Col>
      </Row>
    -->          
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