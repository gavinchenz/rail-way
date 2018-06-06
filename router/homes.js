//引入express模块
const express=require("express");
//定义路由级中间件
const router=express.Router();

router.get("/SecondaryPageRouterData",(req,res)=>{
  var SecondaryPageRouterData=[
    {
        firstGroup:[
            {
                pageName:'数据接入情况',
                pagePath:'Home/DataAccessSituation'
            },
            {
                pageName:'数据特征库',
                pagePath:'Home/DataFeatureLibrary'
            },
            {
                pageName:'数据处理记录',
                pagePath:'Home/DataFeatureLibrary'
            }
        ]
    },
    {
        secondGroup:[
            {
                pageName:'综合研判',
                pagePath:'Home/ComprehensiveStudy'
            },  
            {
                pageName:'单目标分析',
                pagePath:'Home/SingleObjectiveAnalysis'
            },  
            {
                pageName:'多目标分析',
                pagePath:'Home/MultiobjectiveAnalysis'
            },  
            {
                pageName:'涉嫖建模分析',
                pagePath:'Home/WhoringModelingAnalysis'
            },  
            {
                pageName:'涉毒建模分析',
                pagePath:'Home/DrugModelingAnalysis'
            },  
            {
                pageName:'涉恐建模分析',
                pagePath:'Home/TerrorModelingAnalysis'
            },  
            {
                pageName:'侵财建模分析',
                pagePath:'Home/InvadeMoneyModelingAnalysis'
            },  
            {
                pageName:'维稳建模分析',
                pagePath:'Home/MainStabilityModelingAnalysis'
            },  
            {
                pageName:'中间库',
                pagePath:'Home/IntermediateLibrary'
            },  
            {
                pageName:'任务列表',
                pagePath:'Home/TaskList'
            }  
        ]
    },
    {
        thirdGroup:[
            {
                pageName:'综合预警',
                pagePath:'Home/ComprehensiveEarlyWarning'
            },  
            {
                pageName:'预警告警推送',
                pagePath:'Home/WarningPush'
            }               
        ]
    },
    {
        fourthGroup:[
            {
                pageName:'融合数据查询',
                pagePath:'Home/search'
            },  
            {
                pageName:'实名制数据查询',
                pagePath:'Home/RealNameDataQuery'
            },  
            {
                pageName:'实名制数据查询',
                pagePath:'Home/RealNameDataQuery'
            },  
            {
                pageName:'重点人员库',
                pagePath:'Home/KeyStaffBank'
            },  
            {
                pageName:'售处信息维护',
                pagePath:'Home/SaleInfoMaintenance'
            },
            {
                pageName:'窗口信息维护',
                pagePath:'Home/WindowInfoMaintenance'
            },  
            {
                pageName:'全国站点信息',
                pagePath:'Home/NationalSiteInformation'
            }                                                                           
        ]
    },
    {
        fifthGroup:[
            {
                pageName:'模型参数设置',
                pagePath:'Home/ModelParameterSetting'
            },  
            {
                pageName:'账号管理',
                pagePath:'Home/AccountManagement'
            },
            {
                pageName:'部门管理',
                pagePath:'Home/DepartmentManagement'
            },  
            {
                pageName:'权限管理',
                pagePath:'Home/AuthirityManagement'
            },  
            {
                pageName:'权限管理',
                pagePath:'Home/AuthirityManagement'
            },  
            {
                pageName:'数据字典',
                pagePath:'Home/DataDictionary'
            },
            {
                pageName:'系统配置',
                pagePath:'Home/SystemConfiguration'
            },  
            {
                pageName:'案件管理',
                pagePath:'Home/CaseManagement'
            },
            {
                pageName:'执法日志',
                pagePath:'Home/LawEnforcementLog'
            },  
            {
                pageName:'接口推送',
                pagePath:'Home/InterfacePush'
            },  
            {
                pageName:'集群运行',
                pagePath:'Home/ClusterOperation'
            },                      
        ]
    }
];
  res.json(SecondaryPageRouterData);
});

module.exports=router;