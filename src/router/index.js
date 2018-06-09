import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/view/Login'
import Index from '@/view/Index'
import Home from '@/view/Home'

//数据接入
import DataAccessSituation from '@/view/dataAccess/DataAccessSituation'
import DataFeatureLibrary from '@/view/dataAccess/DataFeatureLibrary'
import DataProcessingRecord from '@/view/dataAccess/DataProcessingRecord'

//综合查询
import Search from '@/view/comprehensiveQuery/Search'
import RealNameDataQuery from '@/view/comprehensiveQuery/RealNameDataQuery'
import KeyStaffBank from '@/view/comprehensiveQuery/KeyStaffBank'
import SaleInfoMaintenance from '@/view/comprehensiveQuery/SaleInfoMaintenance'
import WindowInfoMaintenance from '@/view/comprehensiveQuery/WindowInfoMaintenance'
import NationalSiteInformation from '@/view/comprehensiveQuery/NationalSiteInformation'
import QueryResult from '@/view/comprehensiveQuery/QueryResult'
import Upload from '@/view/comprehensiveQuery/Upload'


//建模分析
import ComprehensiveStudy from '@/view/modelingAnalysis/ComprehensiveStudy'
import SingleObjectiveAnalysis from '@/view/modelingAnalysis/SingleObjectiveAnalysis'
import MultiobjectiveAnalysis from '@/view/modelingAnalysis/MultiobjectiveAnalysis'
import WhoringModelingAnalysis from '@/view/modelingAnalysis/WhoringModelingAnalysis'
import DrugModelingAnalysis from '@/view/modelingAnalysis/DrugModelingAnalysis'
import TerrorModelingAnalysis from '@/view/modelingAnalysis/TerrorModelingAnalysis'
import InvadeMoneyModelingAnalysis from '@/view/modelingAnalysis/InvadeMoneyModelingAnalysis'
import MainStabilityModelingAnalysis from '@/view/modelingAnalysis/MainStabilityModelingAnalysis'
import IntermediateLibrary from '@/view/modelingAnalysis/IntermediateLibrary'
import TaskList from '@/view/modelingAnalysis/TaskList'

//综合预警
import ComprehensiveEarlyWarning from '@/view/earlyWarning/ComprehensiveEarlyWarning'
import WarningPush from '@/view/earlyWarning/WarningPush'

//系统管理
import ModelParameterSetting from '@/view/systemManagement/ModelParameterSetting'
import AccountManagement from '@/view/systemManagement/AccountManagement'
import DepartmentManagement from '@/view/systemManagement/DepartmentManagement'
import AuthirityManagement from '@/view/systemManagement/AuthirityManagement'
import DataDictionary from '@/view/systemManagement/DataDictionary'
import SystemConfiguration from '@/view/systemManagement/SystemConfiguration'
import CaseManagement from '@/view/systemManagement/CaseManagement'
import LawEnforcementLog from '@/view/systemManagement/LawEnforcementLog'
import InterfacePush from '@/view/systemManagement/InterfacePush'
import ClusterOperation from '@/view/systemManagement/ClusterOperation'


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
            path: '/index',
            name: 'Index',
            // meta: {requireAuth: true},// 添加该字段，表示进入这个路由是需要登录的
            component: resolve => require(["../view/Index"], resolve)
        },
        {
            path: '/Home',
            redirect: '/Home/Search',
            // meta: {requireAuth: true},// 添加该字段，表示进入这个路由是需要登录的
            name: 'Home',
            component: resolve => require(["../view/Home"], resolve),
            children: [{
                    path: 'DataAccessSituation',
                    name: 'DataAccessSituation',
                    component: resolve => require(["../view/dataAccess/DataAccessSituation"], resolve)
                },
                {
                    path: 'search',
                    name: 'Search',
                    component: resolve => require(["../view/comprehensiveQuery/Search"], resolve)
                },
                {
                    path: 'ComprehensiveStudy',
                    name: 'ComprehensiveStudy',
                    component: resolve => require(["../view/modelingAnalysis/ComprehensiveStudy"], resolve)
                },
                {
                    path: 'ComprehensiveEarlyWarning',
                    name: 'ComprehensiveEarlyWarning',
                    component: resolve => require(["../view/earlyWarning/ComprehensiveEarlyWarning"], resolve)
                },
                {
                    path: 'AccountManagement',
                    name: 'AccountManagement',
                    component: resolve => require(["../view/systemManagement/AuthirityManagement"], resolve)
                },
                {
                    path: 'DataFeatureLibrary',
                    name: 'DataFeatureLibrary',
                    component: resolve => require(["../view/dataAccess/DataFeatureLibrary"], resolve)
                },
                {
                    path: 'DataProcessingRecord',
                    name: 'DataProcessingRecord',
                    component: resolve => require(["../view/dataAccess/DataProcessingRecord"], resolve)
                },
                {
                    path: 'KeyStaffBank',
                    name: 'KeyStaffBank',
                    component: resolve => require(["../view/comprehensiveQuery/KeyStaffBank"], resolve)
                },
                {
                    path: 'SaleInfoMaintenance',
                    name: 'SaleInfoMaintenance',
                    component: resolve => require(["../view/comprehensiveQuery/SaleInfoMaintenance"], resolve)
                },
                {
                    path: 'WindowInfoMaintenance',
                    name: 'WindowInfoMaintenance',
                    component: resolve => require(["../view/comprehensiveQuery/WindowInfoMaintenance"], resolve)
                },
                {
                    path: 'NationalSiteInformation',
                    name: 'NationalSiteInformation',
                    component: resolve => require(["../view/comprehensiveQuery/NationalSiteInformation"], resolve)
                },
                {
                    path: 'QueryResult',
                    name: 'QueryResult',
                    component: resolve => require(["../view/comprehensiveQuery/QueryResult"], resolve)
                },
                {
                    path: 'Upload',
                    name: 'Upload',
                    component: resolve => require(["../view/comprehensiveQuery/Upload"], resolve)
                },
                {
                    path: 'SingleObjectiveAnalysis',
                    name: 'SingleObjectiveAnalysis',
                    component: resolve => require(["../view/modelingAnalysis/SingleObjectiveAnalysis"], resolve)
                },
                {
                    path: 'MultiobjectiveAnalysis',
                    name: 'MultiobjectiveAnalysis',
                    component: resolve => require(["../view/modelingAnalysis/MultiobjectiveAnalysis"], resolve)
                },
                {
                    path: 'WhoringModelingAnalysis',
                    name: 'WhoringModelingAnalysis',
                    component: resolve => require(["../view/modelingAnalysis/WhoringModelingAnalysis"], resolve)
                },
                {
                    path: 'DrugModelingAnalysis',
                    name: 'DrugModelingAnalysis',
                    component: resolve => require(["../view/modelingAnalysis/DrugModelingAnalysis"], resolve)
                },
                {
                    path: 'TerrorModelingAnalysis',
                    name: 'TerrorModelingAnalysis',
                    component: resolve => require(["../view/modelingAnalysis/TerrorModelingAnalysis"], resolve)
                },
                {
                    path: 'InvadeMoneyModelingAnalysis',
                    name: 'InvadeMoneyModelingAnalysis',
                    component: resolve => require(["../view/modelingAnalysis/InvadeMoneyModelingAnalysis"], resolve)
                },
                {
                    path: 'MainStabilityModelingAnalysis',
                    name: 'MainStabilityModelingAnalysis',
                    component: resolve => require(["../view/modelingAnalysis/MainStabilityModelingAnalysis"], resolve)
                },
                {
                    path: 'IntermediateLibrary',
                    name: 'IntermediateLibrary',
                    component: resolve => require(["../view/modelingAnalysis/IntermediateLibrary"], resolve)
                },
                {
                    path: 'TaskList',
                    name: 'TaskList',
                    component: resolve => require(["../view/modelingAnalysis/TaskList"], resolve)
                },
                {
                    path: 'WarningPush',
                    name: 'WarningPush',
                    component: resolve => require(["../view/earlyWarning/WarningPush"], resolve)
                },
                {
                    path: 'RealNameDataQuery',
                    name: 'RealNameDataQuery',
                    component: resolve => require(["../view/comprehensiveQuery/RealNameDataQuery"], resolve)
                },
                {
                    path: 'ModelParameterSetting',
                    name: 'ModelParameterSetting',
                    component: resolve => require(["../view/systemManagement/ModelParameterSetting"], resolve)
                },
                {
                    path: 'DepartmentManagement',
                    name: 'DepartmentManagement',
                    component: resolve => require(["../view/systemManagement/DepartmentManagement"], resolve)
                },
                {
                    path: 'AuthirityManagement',
                    name: 'AuthirityManagement',
                    component: resolve => require(["../view/systemManagement/AuthirityManagement"], resolve)
                },
                {
                    path: 'DataDictionary',
                    name: 'DataDictionary',
                    component: resolve => require(["../view/systemManagement/DataDictionary"], resolve)
                },
                {
                    path: 'SystemConfiguration',
                    name: 'SystemConfiguration',
                    component: resolve => require(["../view/systemManagement/SystemConfiguration"], resolve)
                },
                {
                    path: 'CaseManagement',
                    name: 'CaseManagement',
                    component: resolve => require(["../view/systemManagement/CaseManagement"], resolve)
                },
                {
                    path: 'LawEnforcementLog',
                    name: 'LawEnforcementLog',
                    component: resolve => require(["../view/systemManagement/LawEnforcementLog"], resolve)
                },
                {
                    path: 'InterfacePush',
                    name: 'InterfacePush',
                    component: resolve => require(["../view/systemManagement/InterfacePush"], resolve)
                },
                {
                    path: 'ClusterOperation',
                    name: 'ClusterOperation',
                    component: resolve => require(["../view/systemManagement/ClusterOperation"], resolve)
                }
            ]
        }
    ]
})