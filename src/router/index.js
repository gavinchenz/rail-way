import Vue from 'vue'
import Router from 'vue-router'

import HelloWorld from '@/components/HelloWorld'

import Login from '@/view/Login'
import Index from '@/view/Index'
import Home from '@/view/Home'

import DataAccessSituation from '@/view/DataAccessSituation'
import DataFeatureLibrary from '@/view/DataFeatureLibrary'
import DataProcessingRecord from '@/view/DataProcessingRecord'

import KeyStaffBank from '@/view/KeyStaffBank'
import SaleInfoMaintenance from '@/view/SaleInfoMaintenance'
import WindowInfoMaintenance from '@/view/WindowInfoMaintenance'
import NationalSiteInformation from '@/view/NationalSiteInformation'

import ComprehensiveStudy from '@/view/ComprehensiveStudy'
import ComprehensiveEarlyWarning from '@/view/ComprehensiveEarlyWarning'
import SingleObjectiveAnalysis from '@/view/SingleObjectiveAnalysis'
import MultiobjectiveAnalysis from '@/view/MultiobjectiveAnalysis'
import WhoringModelingAnalysis from '@/view/WhoringModelingAnalysis'
import DrugModelingAnalysis from '@/view/DrugModelingAnalysis'
import TerrorModelingAnalysis from '@/view/TerrorModelingAnalysis'
import InvadeMoneyModelingAnalysis from '@/view/InvadeMoneyModelingAnalysis'
import MainStabilityModelingAnalysis from '@/view/MainStabilityModelingAnalysis'
import IntermediateLibrary from '@/view/IntermediateLibrary'
import TaskList from '@/view/TaskList'
import WarningPush from '@/view/WarningPush'

import Search from '@/view/search'
import RealNameDataQuery from '@/view/RealNameDataQuery'

import ModelParameterSetting from '@/view/ModelParameterSetting'
import AccountManagement from '@/view/AccountManagement'
import DepartmentManagement from '@/view/DepartmentManagement'
import AuthirityManagement from '@/view/AuthirityManagement'
import DataDictionary from '@/view/DataDictionary'
import SystemConfiguration from '@/view/SystemConfiguration'
import CaseManagement from '@/view/CaseManagement'
import LawEnforcementLog from '@/view/LawEnforcementLog'
import InterfacePush from '@/view/InterfacePush'
import ClusterOperation from '@/view/ClusterOperation'



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
            meta: {requireAuth: false},
            // 页面级组件懒加载，等同于component: Login，下同
            component: resolve => require(["../view/Login"], resolve)
        },
        {
            path: '/index',
            name: 'Index',
            meta: {requireAuth: true},// 添加该字段，表示进入这个路由是需要登录的
            component: resolve => require(["../view/Index"], resolve)
        },
        {
            path: '/Home',
            redirect: '/Home/Search',
            meta: {requireAuth: true},// 添加该字段，表示进入这个路由是需要登录的
            name: 'Home',
            component: resolve => require(["../view/Home"], resolve),
            children: [{
                    path: 'DataAccessSituation',
                    name: 'DataAccessSituation',
                    component: resolve => require(["../view/DataAccessSituation"], resolve)
                },
                {
                    path: 'search',
                    name: 'Search',
                    component: resolve => require(["../view/Search"], resolve)
                },
                {
                    path: 'ComprehensiveStudy',
                    name: 'ComprehensiveStudy',
                    component: resolve => require(["../view/ComprehensiveStudy"], resolve)
                },
                {
                    path: 'ComprehensiveEarlyWarning',
                    name: 'ComprehensiveEarlyWarning',
                    component: resolve => require(["../view/ComprehensiveEarlyWarning"], resolve)
                },
                {
                    path: 'AccountManagement',
                    name: 'AccountManagement',
                    component: resolve => require(["../view/AccountManagement"], resolve)
                },
                {
                    path: 'DataFeatureLibrary',
                    name: 'DataFeatureLibrary',
                    component: resolve => require(["../view/DataFeatureLibrary"], resolve)
                },
                {
                    path: 'DataProcessingRecord',
                    name: 'DataProcessingRecord',
                    component: resolve => require(["../view/DataProcessingRecord"], resolve)
                },
                {
                    path: 'KeyStaffBank',
                    name: 'KeyStaffBank',
                    component: resolve => require(["../view/KeyStaffBank"], resolve)
                },
                {
                    path: 'SaleInfoMaintenance',
                    name: 'SaleInfoMaintenance',
                    component: resolve => require(["../view/SaleInfoMaintenance"], resolve)
                },
                {
                    path: 'WindowInfoMaintenance',
                    name: 'WindowInfoMaintenance',
                    component: resolve => require(["../view/WindowInfoMaintenance"], resolve)
                },
                {
                    path: 'NationalSiteInformation',
                    name: 'NationalSiteInformation',
                    component: resolve => require(["../view/NationalSiteInformation"], resolve)
                },
                {
                    path: 'SingleObjectiveAnalysis',
                    name: 'SingleObjectiveAnalysis',
                    component: resolve => require(["../view/SingleObjectiveAnalysis"], resolve)
                },
                {
                    path: 'MultiobjectiveAnalysis',
                    name: 'MultiobjectiveAnalysis',
                    component: resolve => require(["../view/MultiobjectiveAnalysis"], resolve)
                },
                {
                    path: 'WhoringModelingAnalysis',
                    name: 'WhoringModelingAnalysis',
                    component: resolve => require(["../view/WhoringModelingAnalysis"], resolve)
                },
                {
                    path: 'DrugModelingAnalysis',
                    name: 'DrugModelingAnalysis',
                    component: resolve => require(["../view/DrugModelingAnalysis"], resolve)
                },
                {
                    path: 'TerrorModelingAnalysis',
                    name: 'TerrorModelingAnalysis',
                    component: resolve => require(["../view/TerrorModelingAnalysis"], resolve)
                },
                {
                    path: 'InvadeMoneyModelingAnalysis',
                    name: 'InvadeMoneyModelingAnalysis',
                    component: resolve => require(["../view/InvadeMoneyModelingAnalysis"], resolve)
                },
                {
                    path: 'MainStabilityModelingAnalysis',
                    name: 'MainStabilityModelingAnalysis',
                    component: resolve => require(["../view/MainStabilityModelingAnalysis"], resolve)
                },
                {
                    path: 'IntermediateLibrary',
                    name: 'IntermediateLibrary',
                    component: resolve => require(["../view/IntermediateLibrary"], resolve)
                },
                {
                    path: 'TaskList',
                    name: 'TaskList',
                    component: resolve => require(["../view/TaskList"], resolve)
                },
                {
                    path: 'WarningPush',
                    name: 'WarningPush',
                    component: resolve => require(["../view/WarningPush"], resolve)
                },
                {
                    path: 'RealNameDataQuery',
                    name: 'RealNameDataQuery',
                    component: resolve => require(["../view/RealNameDataQuery"], resolve)
                },
                {
                    path: 'ModelParameterSetting',
                    name: 'ModelParameterSetting',
                    component: resolve => require(["../view/ModelParameterSetting"], resolve)
                },
                {
                    path: 'DepartmentManagement',
                    name: 'DepartmentManagement',
                    component: resolve => require(["../view/DepartmentManagement"], resolve)
                },
                {
                    path: 'AuthirityManagement',
                    name: 'AuthirityManagement',
                    component: resolve => require(["../view/AuthirityManagement"], resolve)
                },
                {
                    path: 'DataDictionary',
                    name: 'DataDictionary',
                    component: resolve => require(["../view/DataDictionary"], resolve)
                },
                {
                    path: 'SystemConfiguration',
                    name: 'SystemConfiguration',
                    component: resolve => require(["../view/SystemConfiguration"], resolve)
                },
                {
                    path: 'CaseManagement',
                    name: 'CaseManagement',
                    component: resolve => require(["../view/CaseManagement"], resolve)
                },
                {
                    path: 'LawEnforcementLog',
                    name: 'LawEnforcementLog',
                    component: resolve => require(["../view/LawEnforcementLog"], resolve)
                },
                {
                    path: 'InterfacePush',
                    name: 'InterfacePush',
                    component: resolve => require(["../view/InterfacePush"], resolve)
                },
                {
                    path: 'ClusterOperation',
                    name: 'ClusterOperation',
                    component: resolve => require(["../view/ClusterOperation"], resolve)
                }
            ]
        }
    ]
})