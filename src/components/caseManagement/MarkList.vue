<template>
    <div>
      <card v-for="(item,index) in listData"  class="card cardStyle" :key="index">
        <Checkbox :label="item.id">
          <div v-if="filter === 0 || filter === 3" class="hiddenChecked" style=""></div>
          <a v-if="filter === 1" class="close_icon" @click.prevent="removeCard(index,item.id)"><Icon type="close-circled"></Icon></a>
          <div class="cardMsg">
            <span>
              <Icon type="iphone" class="iconWidth" v-if="item.identifytype ==='1001'"></Icon>
              <Icon type="monitor" class="iconWidth" v-else-if="item.identifytype ==='1003'"></Icon>
              <Icon type="card" class="iconWidth" v-else="item.identifytype ==='1002'"></Icon>
            </span>
            <p><i>{{item.identify}}</i><br>
              <span>类型：{{item.identifytypeStr}}</span><br>
              <span v-if="item.display=== '0'">状态：保存</span>
              <span v-else-if="(item.display === null || item.display === '1') && item.removenumber ==='1'">状态：在控</span>
              <span v-else-if="(item.display === null || item.display === '1') && item.removenumber ==='0'">状态：解除侦控</span>
            </span>
            </p>
          </div>
        </Checkbox>
      </card>
    </div>
</template>
<script>
    export default {
      name: "MarkLifted",
      props:{
        filter: Number,
        listData: Array,
        //isChecked: Boolean,
      },
      //computed:{},
      //data(){
        //return {
          //checked: false
        //}
      //},
      methods:{
        //复选框
        // activeItem(){
        //   this.checked = !this.checked;
        //   this.$emit('activeItem',{checked:this.checked,index:this.index})
        // },
        //删除标识
        removeCard(index,id){
          this.$emit('removeCard',{index:index,id: id})
        }
      }
    }
</script>

<style lang="less">
  .cardStyle .ivu-checkbox{
    position: absolute !important;
    left: 1px !important;
    top: 1px
  }
  .cardStyle .ivu-checkbox-wrapper{
    width: 100% !important;
  }
  .card {
    --bg: #ebf5ff;
    --borderColor: #b2ceeb;
    overflow: hidden;
    width:200px;
    margin-right: 5px;
    margin-bottom: 5px;
    float: left;
    cursor: pointer;
    background: var(--bg);
    border: 1px solid var(--borderColor);
    .hiddenChecked{
      width: 100%;
      height: 20px;
      position: absolute;
      top:0px;
      left:0px;
      z-index: 10;
      background: var(--bg)
    }
    .close_icon {
      position: absolute;
      right: 0;
      top: -5px;
      font-size: 20px;
      color: #7A7A7A;
    }
    .close_icon:hover {
      color: #ed3f14;
    }
    .cardMsg{
      display:flex;
      align-items: center;
      >span{
        text-align: center;
        font-size:45px;
        line-height: 60px;
        margin-right: 10px;
        .iconWidth{
          width: 40px;
        }
      }
      >p{
        font-weight: bold;
        >span{
          color: #898e9c;
          font-weight: normal;
          white-space: nowrap;
        }
      }
    }
    .iconColor{
      color: #2d8cf0;
    }
    .close_icon .iconColor:hover{
      color: #ed3f14;
    }
  }
  .card:hover{
    border: 1px solid #b4c9f3;
  }
</style>
