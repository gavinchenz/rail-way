import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: "history",
    routes: [{
            path: '/',
            redirect: '/login', //指定默认路由（重定向）
        },
        {
            path: '/login',
            name: 'Login',
            // 添加该字段，表示进入这个路由是需要登录的
            // meta: {requireAuth: false},
            // 页面级组件懒加载，等同于component: Login，下同
            component: resolve => require(["../view/Login"], resolve)
        },
        {
            path: '/from',
            name: 'From',
            // 添加该字段，表示进入这个路由是需要登录的
            // meta: {requireAuth: false},
            // 页面级组件懒加载，等同于component: Login，下同
            component: resolve => require(["../view/comprehensiveQuery/From"], resolve)
        },
        {
            path: '/index',
            name: 'Index',
            // meta: {requireAuth: true},// 添加该字段，表示进入这个路由是需要登录的
            component: resolve => require(["../view/Index"], resolve)
        },
        {
            path: '/DataAccess',
            name: 'DataAccess',
            // meta: {requireAuth: true},// 添加该字段，表示进入这个路由是需要登录的
            component: resolve => require(["../view/DataAccess"], resolve)
        },
        {
            path: '/ComprehensiveQuery',
            name: 'ComprehensiveQuery',
            // meta: {requireAuth: true},// 添加该字段，表示进入这个路由是需要登录的
            component: resolve => require(["../view/ComprehensiveQuery"], resolve)
        },
        {
            path: '/ModelingAnalysis',
            name: 'ModelingAnalysis',
            // meta: {requireAuth: true},// 添加该字段，表示进入这个路由是需要登录的
            component: resolve => require(["../view/ModelingAnalysis"], resolve)
        },
        {
            path: '/EarlyWarning',
            name: 'EarlyWarning',
            // meta: {requireAuth: true},// 添加该字段，表示进入这个路由是需要登录的
            component: resolve => require(["../view/EarlyWarning"], resolve)
        },
        {
            path: '/SystemManagement',
            name: 'SystemManagement',
            // meta: {requireAuth: true},// 添加该字段，表示进入这个路由是需要登录的
            component: resolve => require(["../view/SystemManagement"], resolve)
        }
    ]
})