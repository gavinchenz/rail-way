<style scoped>

</style>

<template>
  <div class="editor">
    <div class="vm-panel vm-margin">
      <div class="panel-heading">
        Preview
      </div>
      <div v-html="bindHtml">

      </div>
    </div>
    <VmEditor width="100%" class="vm-margin" @upload="setHtml">
    </VmEditor>
  </div>
</template>

<script>
  import VmEditor from 'vm-editor'
  export default {
    name: 'editor',
    components: {
      VmEditor,
    },
    data: function () {
      return {
        bindHtml: ''
      }
    },
    methods: {
      setHtml: function (data) {
        this.bindHtml = data
      }
    }
  }
</script>

