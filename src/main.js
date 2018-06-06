import Vue from 'vue'
import App from './App'

//初始化公共样式
import "./assets/style/common.css"

//引入字体小图标
import "./assets/style/iconfont.css"

// router
import Router from 'vue-router'
Vue.use(Router)

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

import router from './router'

import $ from 'jquery'

import axios from "./axios"

import Swiper from 'vue-awesome-swiper'
Vue.use(Swiper)

// global directive to check user Auth
Vue.directive("auth", {
    bind: function(el, binding) {
        let prop = binding.expression;
        let map = store.state.auth;
        if (!map.has(prop)) {
            el.parentNode.removeChild(el);
        }
    }.bind(this)
});

// check auth when change router
router.beforeEach((to, from, next) => {
    // 禁用浏览器后退操作
    window.history.pushState(null,null,document.URL);
    window.addEventListener('popstate',function(){
        history.pushState(null,null,document.URL);
    });

    iView.LoadingBar.start();

    if (to.matched.some(record => record.meta.requireAuth)){
        if (!auth.loggedIn()){
            next({ path: '/' });
        } else {
            next();
        }
    }else{
        next();
    }
});

// import {routerMode} from './utils/config.js'

// const router = new Router({
//     mode: routerMode,
//     scrollBehavior: () => ({ // 滚动条滚动的行为，不加这个默认就会记忆原来滚动条的位置
//         y: 0
//     }),
//     routes,
//     strict:process.env.NODE_ENV !== 'production'
// })

router.afterEach((to, from) => {
    iView.LoadingBar.finish();
});

Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    axios,
    components: { App },
    render: (createElement) => {
        return createElement(App);
    }
})

