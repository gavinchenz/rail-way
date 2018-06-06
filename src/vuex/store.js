import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex);

// 应用初始状态
const state = {
    isLogin: false,
    sex: [],
    uri: "http://192.168.1.148:8000",
    // wsuri: "ws://192.168.1.148:8000",
    userInfo: {},
    departGroups:[],
    dictGroups:new Map(),
    auth: new Map(),
    save_case_Info:{},
    investigate:new Map()
};
// 创建 store 实例
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations
})

/**
 *  使用方法:本vuex将 action 和 getter 分离至 action.js 和 getter.js中
 *  this.$store.commit('changeLoginStatus',true)
 *  this.$store.dispatch('addSex',data)
 * */