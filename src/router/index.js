import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: "history",
    routes: [{
            path: '*',
            redirect: '/login', //指定默认路由（重定向）
        },
        {
            path: '/login',
            name: 'Login',
            // 添加该字段，表示进入这个路由是需要登录的
            // meta: {requireAuth: false},
            // 页面级组件懒加载，等同于component: Login，下同
            component: (resolve) => require(["../view/Login"], resolve)
        },
        {
            path: '/from',
            name: 'From',
            // 添加该字段，表示进入这个路由是需要登录的
            // meta: {requireAuth: false},
            // 页面级组件懒加载，等同于component: Login，下同
            component: (resolve) => require(["../view/comprehensiveQuery/From"], resolve)
        },
        {
            path: '/index',
            name: 'Index',
            // meta: {requireAuth: true},// 添加该字段，表示进入这个路由是需要登录的
            component: (resolve) => require(["../view/Index"], resolve)
        },
        {
            path: '/DataAccess',
            name: 'DataAccess',
            // meta: {requireAuth: true},// 添加该字段，表示进入这个路由是需要登录的
            component: (resolve) => require(["../view/DataAccess"], resolve),
            redirect: '/DataAccessSituation', //指定默认路由（重定向）
            children:[
                {
                    path:'/DataAccessSituation',
                    name:'DataAccessSituation',
                    component: (resolve) => require(["../view/dataAccess/DataAccessSituation"], resolve)
                },
                {
                    path:'/DataFeatureLibrary',
                    name:'DataFeatureLibrary',
                    component: (resolve) => require(["../view/dataAccess/DataFeatureLibrary"], resolve)
                },
                {
                    path:'/DataProcessingRecord',
                    name:'DataProcessingRecord',
                    component: (resolve) => require(["../view/dataAccess/DataProcessingRecord"], resolve)
                }
            ]
        },
        {
            path: '/ComprehensiveQuery',
            name: 'ComprehensiveQuery',
            // meta: {requireAuth: true},// 添加该字段，表示进入这个路由是需要登录的
            component: (resolve) => require(["../view/ComprehensiveQuery"], resolve),
            redirect: '/Search', //指定默认路由（重定向）
            children:[
                {
                    path:'/Search',
                    name:'Search',
                    component: (resolve) => require(["../view/comprehensiveQuery/Search"], resolve)
                },
                {
                    path:'/RealNameDataQuery',
                    name:'RealNameDataQuery',
                    component: (resolve) => require(["../view/comprehensiveQuery/RealNameDataQuery"], resolve)
                },
                {
                    path:'/KeyStaffBank',
                    name:'KeyStaffBank',
                    component: (resolve) => require(["../view/comprehensiveQuery/KeyStaffBank"], resolve)
                },
                {
                    path:'/SaleInfoMaintenance',
                    name:'SaleInfoMaintenance',
                    component: (resolve) => require(["../view/comprehensiveQuery/SaleInfoMaintenance"], resolve)
                },
                {
                    path:'/WindowInfoMaintenance',
                    name:'WindowInfoMaintenance',
                    component: (resolve) => require(["../view/comprehensiveQuery/WindowInfoMaintenance"], resolve)
                },
                {
                  path:'/Trains',
                  name:'Trains',
                  component: (resolve) => require(["../view/comprehensiveQuery/Trains"], resolve)
                },
                {
                  path:'/MainTainTrainTimes',
                  name:'MainTainTrainTimes',
                  component: (resolve) => require(["../components/comprehensiveQuery/MainTainTrainTimes"], resolve)
                },
                {
                    path:'/NationalSiteInformation',
                    name:'NationalSiteInformation',
                    component: (resolve) => require(["../view/comprehensiveQuery/NationalSiteInformation"], resolve)
                },
                {
                    path:'/QueryResult',
                    name:'QueryResult',
                    component: (resolve) => require(["../view/comprehensiveQuery/QueryResult"], resolve)
                },
                {
                    path:'/PoliceStation',
                    name:'PoliceStation',
                    component: (resolve) => require(["../view/comprehensiveQuery/PoliceStation"], resolve)
                },
                {
                    path:'/CleanConfig',
                    name:'CleanConfig',
                    component: (resolve) => require(["../view/comprehensiveQuery/CleanConfig"], resolve)
                },
                {
                    path:'/Upload',
                    name:'Upload',
                    component: (resolve) => require(["../view/comprehensiveQuery/Upload"], resolve)
                },
                {
                  path:'/SeatRank',
                  name:'SeatRank',
                  component: (resolve) => require(["../view/comprehensiveQuery/SeatRank"], resolve)
                }
            ]
        },
        {
            path: '/ModelingAnalysis',
            name: 'ModelingAnalysis',
            // meta: {requireAuth: true},// 添加该字段，表示进入这个路由是需要登录的
            component: (resolve) => require(["../view/ModelingAnalysis"], resolve),
            redirect: '/ComprehensiveStudy', //指定默认路由（重定向）
            children:[
                {
                    path:'/ComprehensiveStudy',
                    name:'ComprehensiveStudy',
                    component: (resolve) => require(["../view/modelingAnalysis/ComprehensiveStudy"], resolve)
                },
                {
                    path:'/SingleObjectiveAnalysis',
                    name:'SingleObjectiveAnalysis',
                    component: (resolve) => require(["../view/modelingAnalysis/SingleObjectiveAnalysis"], resolve)
                },
                {
                    path:'/MultiobjectiveAnalysis',
                    name:'MultiobjectiveAnalysis',
                    component: (resolve) => require(["../view/modelingAnalysis/MultiobjectiveAnalysis"], resolve)
                },
                {
                    path:'/TicketRelatedModelingAnalysis',
                    name:'TicketRelatedModelingAnalysis',
                    component: (resolve) => require(["../view/modelingAnalysis/TicketRelatedModelingAnalysis"], resolve)
                },
                {
                    path:'/TerrorModelingAnalysis',
                    name:'TerrorModelingAnalysis',
                    component: (resolve) => require(["../view/modelingAnalysis/TerrorModelingAnalysis"], resolve)
                },
                {
                    path:'/InvadeMoneyModelingAnalysis',
                    name:'InvadeMoneyModelingAnalysis',
                    component: (resolve) => require(["../view/modelingAnalysis/InvadeMoneyModelingAnalysis"], resolve)
                },
                {
                    path:'/MainStabilityModelingAnalysis',
                    name:'MainStabilityModelingAnalysis',
                    component: (resolve) => require(["../view/modelingAnalysis/MainStabilityModelingAnalysis"], resolve)
                },
                {
                    path:'/IntermediateLibrary',
                    name:'IntermediateLibrary',
                    component: (resolve) => require(["../view/modelingAnalysis/IntermediateLibrary"], resolve)
                },
                {
                    path:'/TaskList',
                    name:'TaskList',
                    component: (resolve) => require(["../view/modelingAnalysis/TaskList"], resolve)
                },
                {
                    path:'/CustomAnalysis',
                    name:'CustomAnalysis',
                    component: (resolve) => require(["../view/modelingAnalysis/CustomAnalysis"], resolve)
                },
                {
                    path:'/DrugModelingAnalysis',
                    name:'DrugModelingAnalysis',
                    component: (resolve) => require(["../view/modelingAnalysis/DrugModelingAnalysis"], resolve)
                },
                {
                    path:'/TaskDetail',
                    name:'TaskDetail',
                    component: (resolve) => require(["../view/modelingAnalysis/TaskDetail"], resolve)
                }
            ]
        },
        {
            path: '/EarlyWarning',
            name: 'EarlyWarning',
            // meta: {requireAuth: true},// 添加该字段，表示进入这个路由是需要登录的
            component: resolve => require(["../view/EarlyWarning"], resolve),
            redirect:'/earlyWarningHome',
            children:[
              {
                path:'/earlyWarningHome',
                name: 'EarlyWarningHome',
                component: resolve => require(["../view/earlyWarning/earlyWarningHome"],resolve),
              },
              {
                path:'/ComprehensiveEarlyWarning',
                name: 'ComprehensiveEarlyWarning',
                component: resolve => require(["../view/earlyWarning/ComprehensiveEarlyWarning"],resolve),
              },
              {
                path:'/WarningPush',
                name: 'WarningPush',
                component: resolve => require(["../view/earlyWarning/WarningPush"],resolve)
              },
              {
                path:'/addWarning',
                name: 'AddWarning',
                component: resolve => require(["../view/earlyWarning/addWarning"],resolve)
              },
              {
                path:'/report',
                name: 'report',
                component: resolve => require(["../view/earlyWarning/report"],resolve)
              }
              ]
        },
        {
            path: '/SystemManagement',
            name: 'SystemManagement',
            // meta: {requireAuth: true},// 添加该字段，表示进入这个路由是需要登录的
            component: (resolve) => require(["../view/SystemManagement"], resolve),
            redirect: '/AccountManagement', //指定默认路由（重定向）
            children:[
                {
                    path:'/AccountManagement',
                    name:'AccountManagement',
                    component: (resolve) => require(["../view/systemManagement/AccountManagement"], resolve)
                },
                {
                    path:'/DepartmentManagement',
                    name:'DepartmentManagement',
                    component: (resolve) => require(["../view/systemManagement/DepartmentManagement"], resolve)
                },
                {
                    path:'/AuthirityManagement',
                    name:'AuthirityManagement',
                    component: (resolve) => require(["../view/systemManagement/AuthirityManagement"], resolve)
                },
                {
                    path:'/DataDictionary',
                    name:'DataDictionary',
                    component: (resolve) => require(["../view/systemManagement/DataDictionary"], resolve)
                },
                {
                    path:'/SystemConfiguration',
                    name:'SystemConfiguration',
                    component: (resolve) => require(["../view/systemManagement/SystemConfiguration"], resolve)
                },
                {
                    path:'/CaseManagement',
                    name:'CaseManagement',
                    component: (resolve) => require(["../view/systemManagement/CaseManagement"], resolve)
                },
                {
                    path:'/LawEnforcementLog',
                    name:'LawEnforcementLog',
                    component: (resolve) => require(["../view/systemManagement/LawEnforcementLog"], resolve)
                },
                {
                    path:'/InterfacePush',
                    name:'InterfacePush',
                    component: (resolve) => require(["../view/systemManagement/InterfacePush"], resolve)
                },
                {
                    path:'/ModelParameterSetting',
                    name:'ModelParameterSetting',
                    component: (resolve) => require(["../view/systemManagement/ModelParameterSetting"], resolve)
                },
                {
                    path:'/ClusterOperation',
                    name:'ClusterOperation',
                    component: (resolve) => require(["../view/systemManagement/ClusterOperation"], resolve)
                }
            ]
        }
    ]
})

