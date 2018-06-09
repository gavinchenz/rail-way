<template>
  <div class="task-list">
    <h1>{{msg}}</h1>
  </div>
</template>

<script>
export default {
  name: 'TaskList',
  data () {
    return {
      msg:"任务列表 TaskList"
    }
  }
}
</script>

<style scoped>
.task-list{
  flex:1;
}
</style>
