<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
    import {mapMutations,mapGetters} from 'vuex'//vuex修改和订阅
    import {getCurrentInfo} from './service/getData'//异步获取当前用户信息
    import {setStore} from '@/config/mUtils'//保存及获取单次会话信息
    import {process_error} from '@/config/process_request_conf'//进程及异常处理
    import NoPermission from '@/components/common/tools/noPermission.vue' //无权限查看的模板
    import sysInfo from '@/config/sys_config_info'//系统信息
    export default {
        name: "app",
        data() {
            return {
              authList:[],
              noShow: false
            }
        },
        components:{NoPermission},
        computed: {
            ...mapGetters([
                'isLogin'
            ])
        },
        methods: {
            ...mapMutations([
                'CHANGE_LOGIN_STATUS',
                'SET_USERINFO',
                'SET_AUTH'
            ]),

            // 获取用户信息
            async getCurrentInfoFn() {
              try{
                let res = await getCurrentInfo();
                if(res.statusCode !== 200) return process_error(res);
                  setStore('copyRight',res.data.copyright);
                   this.SET_USERINFO(res.data.user);
                   this.CHANGE_LOGIN_STATUS(true);
                   let ocodeList = res.data.user.ocodeList;
                   if(Array.isArray(ocodeList) && ocodeList.length <= 0){
                     this.noShow = true;
                     return this.$router.push({path:`/404`});
                   }
                   this.SET_AUTH(ocodeList);
                   this.authList = ocodeList;
              }catch(err){ console.log(err)}
            },

            // 输出版权信息和版本信息
            exportCopyRightInfo(){
                console.info(`系统名称：${sysInfo.LOGO_TITLE} \n版本信息：${sysInfo.VERSION} \n版权信息：${sysInfo.FOOTER_COPYRIGHT}`);
            }            
        },
        mounted() {
          this.exportCopyRightInfo();
          this.getCurrentInfoFn()
        }
    };
</script>

<style>
#app{
  width:100%;
  height:100%;
  /* background: url(./assets/images/bg-03.jpg) no-repeat; */
  /*background-size:cover;*/
}
</style>
