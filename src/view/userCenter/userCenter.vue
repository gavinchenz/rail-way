<template>
  <Row class="vm-table vm-panel">
    <div class="panel-body">
      <div v-if="$store.state.auth.has('1-1-1-1') || $store.state.auth.has('1-1-2-1') || $store.state.auth.has('1-1-3-1') || $store.state.auth.has('1-1-1-9') || $store.state.auth.has('1-1-1-12')">
        <div style="border-bottom: 2px solid #2d8cf0;margin-bottom: 10px;padding-bottom: 5px">
          <Tag type="dot" @click.native="changeView('1')" :color="viewSign==='1'?'blue':''">用户管理</Tag>
          <Tag type="dot" @click.native="changeView('2')" :color="viewSign==='2'?'blue':''">机构管理</Tag>
          <Tag type="dot" @click.native="changeView('3')" :color="viewSign==='3'?'blue':''">职位管理</Tag>
          <Tag type="dot" @click.native="changeView('4')" :color="viewSign==='4'?'blue':''">操作管理</Tag>
          <Tag type="dot" @click.native="changeView('5')" :color="viewSign==='5'?'blue':''">权限管理</Tag>
        </div>
        <section>
          <UserManagement  v-if="$store.state.auth.has('1-1-1-1') && viewSign === '1'"></UserManagement>
          <DepartList v-else-if="$store.state.auth.has('1-1-2-1') && viewSign === '2'"></DepartList>
          <DutyList   v-else-if="$store.state.auth.has('1-1-3-1') && viewSign === '3'"></DutyList>
          <Operation  v-else-if="$store.state.auth.has('1-1-1-9') && viewSign === '4'"></Operation>
          <PowerList  v-else-if="$store.state.auth.has('1-1-1-12') && viewSign === '5'"></PowerList>
          <NoPermission v-else></NoPermission>
        </section>
      </div>
      <NoPermission v-else></NoPermission>
    </div>
    </div>
  </Row>
</template>

<script>
  import UserManagement from '@/pages/userCenter/UserManagement.vue'
  import DepartList from '@/pages/userCenter/DepartList.vue'
  import DutyList from '@/pages/userCenter/DutyList.vue'
  import Operation from '@/pages/userCenter/operation.vue'
  import PowerList from '@/pages/power/PowerList.vue'
  import NoPermission from '@/components/common/tools/noPermission.vue' //无权限查看的模板

  export default {
      name: "userCenter",
      components:{
        UserManagement,DepartList,DutyList,Operation, PowerList,NoPermission
      },
      data(){
        return {
          viewSign:'1',
        }
      },
      methods:{
        changeView(sign){
          switch(sign){
            case '1':this.viewSign = '1';break;
            case '2':this.viewSign = '2';break;
            case '3':this.viewSign = '3';break;
            case '4':this.viewSign = '4';break;
            case '5':this.viewSign = '5';break;
            default: this.viewSign = '1';
          }
        }
      }
    }
</script>

<style scoped>

</style>
