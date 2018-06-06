<style scoped>
.vm-msg-push ul li .subject .message {margin-top: 0px;}
.ivu-badge-count{background: #ff7b79;border:none;box-shadow:none;line-height: 20px;}
</style>
<template>
  <Dropdown :placement="placement" class="vm-msg-push">
    <Badge :count="totals" class="vm-badge">
      <Icon type="android-notifications-none" style="color:#fff;font-size: 24px;"></Icon>
    </Badge>
    <Dropdown-menu slot="list">
      <Dropdown-item>消息列表</Dropdown-item>
      <Dropdown-item divided v-for="item in data" :key="item.id">
        <div class="subject">
              <span class="title">
                <span class="time">{{ item.sendTime }}</span>
              </span>
          <p class="message">{{ item.msgContent }}</p>
        </div>
      </Dropdown-item>
      <Dropdown-item divided><a @click="moreMessage">更多</a></Dropdown-item>
    </Dropdown-menu>
  </Dropdown>
</template>

<script>
  export default {
    name: 'VmMsgPush',
    props: {
      placement: {
        type: String,
        default: 'bottom-end'
      },
      data: Array
    },
    data () {
      return {}
    },
    methods: {
      moreMessage(){
        // this.$router.push({path:'/home/messageList'})
      }
    },
    computed: {
      totals() {
        let data = this.data;
        let total = 0;
        if (null !== data && typeof(data) !== 'undefined') {total = data.length}
        return total
      }
    }
  }
</script>
