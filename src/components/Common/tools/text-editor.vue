<style scoped>

</style>

<template>
  <div>
    <quill-editor class="ql-editor" ref="myTextEditor" v-model="currentValue" :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                  @ready="onEditorReady($event)"></quill-editor>
  </div>
</template>

<script>
  import { quillEditor } from 'vue-quill-editor'
  export default {
    data() {
      return {
        props: {
          content: String,
          default: function () {
            return ''
          }
        },
        editorOption: {},
      }

    },
    created(){
    },
    components: {
      quillEditor
    },
    methods: {
      onEditorBlur(editor) {
//        console.log('editor blur!', editor)
      },
      onEditorFocus(editor) {
//        console.log('editor focus!', editor)
      },
      onEditorReady(editor) {
//        console.log('editor ready!', editor)
      }
    },
    computed: {
      currentValue: {
        // 动态计算currentValue的值
        get: function () {
          return this.content // 将props中的value赋值给currentValue
        },
        set: function (content) {
          this.$emit('input', content) // 通过$emit触发父组件
        }
      },
    },
  }
</script>

