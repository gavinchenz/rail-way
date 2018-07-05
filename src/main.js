import Vue from 'vue'
import App from './App'

//初始化公共样式
import "./assets/style/common.css"

//引入字体小图标
import "./assets/style/iconfont.css"

//引入jQuery的table导出excel插件
import $ from 'jquery'
import './assets/script/jquery.table2excel.min.js'

// router
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import router from './router'

//引入ivew
import iView from 'iview'
// import '!style-loader!css-loader'
import 'iview/dist/styles/iview.css'
Vue.use(iView)

//引入vue-easytable
import 'vue-easytable/libs/themes-base/index.css'
import {VTable,VPagination} from 'vue-easytable'

Vue.component(VTable.name,VTable);
Vue.component(VPagination.name,VPagination);

//全局引入echarts
import echarts from "echarts"
Vue.prototype.$echarts = echarts

// eventBus
window.eventBus = new Vue();

//vuex
import store from './vuex/store'

//utils
import { tools,exportsObj } from './utils/tools'
Vue.prototype.$tools = tools;
Vue.prototype.$clearObj = exportsObj;

//引入资源请求插件
import axios from "axios";

//使用axios插件
Vue.prototype.$axios=axios;

//token全局默认配置
axios.defaults.headers.common['Authentication-Token'] = store.state.token;

// 添加请求拦截器
axios.interceptors.request.use(config => {
    // 在发送请求之前做些什么
    //判断是否存在token，如果存在将每个页面header都添加token
    if(store.state.token){
        config.headers.common['Authentication-Token'] = store.state.token;
        // config.headers.Authorization = `token ${store.state.token}`;
    }
    return config;
    }, error => {
        // 对请求错误做些什么
        return Promise.reject(error);
});

// http response 拦截器
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                this.$store.commit('del_token');
                router.replace({
                path: '/login',
                query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
            })
        }
    }
    return Promise.reject(error.response.data)
})

import Swiper from 'vue-awesome-swiper'
Vue.use(Swiper)

router.afterEach((to, from) => {
    iView.LoadingBar.finish();
});

Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    axios,
    store,
    components: { App },
    render: (createElement) => {
        return createElement(App);
    }
})


// global directive to check user Auth
// Vue.directive("auth", {
//     bind: function(el, binding) {
//         let prop = binding.expression;
//         let map = store.state.auth;
//         if (!map.has(prop)) {
//             el.parentNode.removeChild(el);
//         }
//     }.bind(this)
// });

// // check auth when change router
// router.beforeEach((to, from, next) => {
//     // 禁用浏览器后退操作
//     window.history.pushState(null,null,document.URL);
//     window.addEventListener('popstate',function(){
//         history.pushState(null,null,document.URL);
//     });

//     iView.LoadingBar.start();

//     if (to.matched.some(record => record.meta.requireAuth)){
//         if (!auth.loggedIn()){
//             next({ path: '/' });
//         } else {
//             next();
//         }
//     }else{
//         next();
//     }
// });

// import {routerMode} from './utils/config.js'

// const router = new Router({
//     mode: routerMode,
//     scrollBehavior: () => ({ // 滚动条滚动的行为，不加这个默认就会记忆原来滚动条的位置
//         y: 0
//     }),
//     routes,
//     strict:process.env.NODE_ENV !== 'production'
// })
