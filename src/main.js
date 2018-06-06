import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import Swiper from 'vue-awesome-swiper'
import echarts from "echarts"
import axios from "./axios"
import Vuex from 'vuex'
import iView from 'iview'

//引入ivew样式表
import 'iview/dist/styles/iview.css'

//初始化公共样式
import "./assets/style/common.css"
//引入字体小图标
import "./assets/style/iconfont.css"
import { render } from 'iview';
// import store from "./vuex/store"

Vue.use(iView)
Vue.use(Swiper)
Vue.use(Vuex)

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts


new Vue({
    el: '#app',
    router,
    axios,
    components: { App },
    render: (createElement) => {
        return createElement(App);
    }
})