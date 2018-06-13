<template>
    <v-table class="tHeight"
        :height="240"
        :columns="columns"
        :table-data="tableData"
        row-hover-color="#eee"
        row-click-done="#edf7ff"
        :cell-edit-done="cellEditDone"
        @on-custom-comp="customCompFunc"
    ></v-table>
</template>
<script>
 import Vue from 'vue'
  export default {
    name: 'CaseSignList',
    props: {
        columns: Array,
        tableData:Array
    },
    computed:{
        caseSignListTotal(){
            return this.tableData.length;
        }
    },
    data () {
      return {}
    },
    methods: {
        customCompFunc(params){
            if(params.type === 'delete'){
                this.$delete(this.tableData,params.index);
            }
            this.$emit('concatTableData',params.index);
        },
        cellEditDone(newValue,oldValue,rowIndex,rowData,field){
            switch(field){
                case 'identify':
                    if(!/^\d{1,50}$/.test(newValue)){
                        this.$Message.error(`请输入50位数字以内的侦控号码!`);
                        newValue = "";
                    };
                    break;
                case 'identifytype':break;
            }
            this.tableData[rowIndex][field] = newValue;
            this.$emit('updateSinglePushArr',rowIndex,newValue);
        }
    },
  }
 //  custom component
  Vue.component('table-operation',{
      template:`<span>
        <a href="" @click.stop.prevent="deleteRow(rowData,index)">删除</a>
        </span>`,
      props:{
          rowData:{
              type:Object
          },
          field:{
              type:String
          },
          index:{
              type:Number
          }
      },
      methods:{
          deleteRow(){
              let params = {type:'delete',index:this.index,rowData:this.rowData};
              this.$emit('on-custom-comp',params);
          }
      }
  })
</script>
<style lang="less">
    .cell-ecit-color{
        color:#2db7f5;
        font-weight:bold;
    }
  .tHeight{
    height: 240px !important;
    .v-table-header-row td{
      background-color: #f8f8f9;
    }
    table tr td{
      height: inherit !important;
      border-bottom: none !important;
    }
    .v-table-body{
      overflow-x: hidden !important;
    }
  }
</style>
