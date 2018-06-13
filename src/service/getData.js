// create by jh 2017-12-05
import fetch from '@/config/fetch'
// import {fetch} from '@/config/axios-promise'
import { headerConfig } from '@/utils/config'

/**
 *   账号密码登录
 */
export const accountLogin = (username, password, remenber) => {
        return fetch('authenticate', { username, password, remenber }, 'GET')
    }
    /**
     *   获取用户信息
     */
export const getCurrentInfo = () => {
        return fetch('uf/userinfo/getCurrentInfo')
    }
    /**
     *   字典信息
     */
export const getDictGroups = () => {
    return fetch('sysDictGroupsFlat')
}

/**
 *   推送信息
 */
export const getPushMsg = (msgNum) => {
    return fetch('sysMessages/new', { rows: msgNum })
}

/**
 *  退出登录
 */
export const logout = () => {
    return fetch(`${window.location.hostname}/logout`)
}

/**
 *  系统菜单
 */
export const getSystemMenus = () => {
    return fetch('account/menus')
}

/**
 *
 */
export const getSystemNotice = (msgNum) => {
    return fetch('sysNotices', { pageSize: msgNum })
}

/**
 *  首页审核按钮操作
 */
export const appDocApplyOp = (data) => {
    return fetch(`flows/flowApprUsers/${data.urlData}`, {
        flowRunId: data.params.flowRunId,
        bizType: data.params.bizType
    })
}

/**
 *  查询审批列表数据
 */
export const queryApprovalListData = (msgNum) => {
    return fetch('appDocs/appr')
}

/**
 *  首页查询饼图数据
 */
export const queryIndexPieGraph = (msgNum) => {
    return fetch('docWorkCount')
}

/**
 *  首页查柱状图数据
 */
export const queryIndexBarGraph = (msgNum) => {
    return fetch('weekCaseCount')
}

/**
 *  首页代办查看列表数据
 */
export const getIndexAgentInquire = (msgNum) => {
    return fetch('queryTables/task')
}

/**
 * fanhua流程相关请求接口开始
 */

/**
 *  获取所有定义流程集合
 */
export const findFlowList = () => {
    return fetch('uf/flow/flowDefList', { page: 1, size: 100, sort: "createTime,desc" })
}

/**
 *  获取所有使用流程集合
 */
export const flowDefListUse = (sendData) => {
    return fetch('uf/flow/flowDefListUse', {
        page: sendData.page.number,
        size: sendData.page.size,
        sort: sendData.page.sort,
        fname: sendData.fname
    })
}

/**
 *  获取所有流程实体集合
 */
export const flowInsList = (sendData) => {
    return fetch('uf/flow/flowInsList', {
        page: sendData.page.number,
        size: sendData.page.size,
        sort: sendData.page.sort,
        fname: sendData.fname
    })
}

/**
 *  根据流程实体获取所有审批历史集合
 */
export const spHistoryList = (insId) => {
    return fetch('uf/flow/spHistoryList/' + insId)
}

/**
 *  获取流程节点集合
 */
export const findNodeList = (flowId) => {
    return fetch('uf/flow/flowNodeList/' + flowId, {
        page: 1,
        size: 100,
        sort: 'orders'
    })
}

/**
 *  保存流程
 */
export const saveFlowDef = (flowDef) => {
    return fetch('uf/flow/flowDefAddOrUpd', flowDef, 'POST')
}

/**
 *  保存流程节点
 */
export const saveFlowNode = (flowId, flowNode) => {
    return fetch('uf/flow/flowNodeAddOrUpd/' + flowId, flowNode, 'POST')
}

/**
 *  查看流程
 */
export const getFlowDef = (flowId) => {
    return fetch('uf/flow/flowDefView/' + flowId)
}

/**
 *  查看流程节点
 */
export const getFlowNode = (nodeId) => {
    return fetch('uf/flow/flowNodeView/' + nodeId)
}

/**
 *  删除流程
 */
export const delFlowDef = (flowId) => {
    return fetch('uf/flow/flowDefDel/' + flowId, '', 'DELETE')
}

/**
 *  删除流程节点
 */
export const delNode = (nodeId) => {
    return fetch('uf/flow/flowNodeDel/' + nodeId, '', 'DELETE')
}

/**
 *  获取机构列表（级联选择数据）
 */
export const getDept = () => {
    return fetch('uf/flow/departAllByCascader')
}

/**
 *  获取角色列表（穿梭框数据）
 */
export const getRole = () => {
    return fetch('uf/flow/dutyAllByTransfer')
}

/**
 *  获取用户列表（穿梭框数据）
 */
export const getUser = () => {
    return fetch('uf/flow/userAllByTransfer')
}

/**
 *  获取子机构
 */
export const getDeptChildren = (deptId) => {
    return fetch('uf/flow/departByPid/' + deptId)
}

/**
 *  修改流程节点序号
 */
export const updNodeOrders = (type, deptId) => {
    return fetch('uf/flow/updNodeOrders/' + type + "/" + deptId, '', 'POST')
}

/**
 * fanhua流程相关请求接口结束
 */


/**
 * zlm用户接口begin
 */

/**
 *  查询所有用户（分页）
 */
export const userAll = (sendData) => {
    return fetch('uf/userinfo/queryUserinfo', {
        page: sendData.page.pageNumber,
        size: sendData.page.size,
        sort: sendData.page.sort,
        username: sendData.username,
        fullname: sendData.fullname,
        [`depart.id`]: sendData.depart.id,
        [`duty.id`]: sendData.duty.id,
        policeNum: sendData.policeNum,
        able: sendData.able,
        del: sendData.del
    })
}

/**
 * 级联查询机构
 */
export const departAllByCascader = () => {
        return fetch('uf/flow/departAllByCascader')
    }
    /**
     * 级联查询子机构
     */
export const departByPid = (id) => {
    return fetch('uf/flow/departByPid/' + id)
}

/**
 *  用户保存
 */
export const saveUser = (sendData) => {
    return fetch('uf/userinfo/save', sendData, 'POST')
}

/**
 *  用户删除
 */
export const delUser = (id) => {
    return fetch('uf/userinfo/delete/' + id, '', 'DELETE')
}

/**
 * 恢复已删除用户
 */
export const recoverUser = (id) => {
    return fetch('uf/userinfo/recover/' + id, '', 'GET')
}

/**
 *  更改用户状态（启用/禁用）
 */
export const ableSwitch = (id) => {
    return fetch('uf/userinfo/ableSwitch/' + id)
}

/**
 * 获得所有权限组（不分页）
 */
export const operGroupAllList = () => {
        return fetch('uf/operate/operGroupAllList')
    }
    /**
     * zlm用户接口end
     */

/**
 * zlm职位接口begin
 */
/**
 *  查询所有职位(分页)
 */
export const dutyAll = (sendData) => {
    return fetch('uf/duty/allDuty', {
        page: sendData.page.pageNumber,
        size: sendData.page.size,
        sort: sendData.page.sort,
        del: sendData.del,
        dlevel: sendData.dlevel,
        dutyname: sendData.dutyname
    })
}

/**
 *  查询所有职位
 */
export const getAllDuty = () => {
    return fetch('out/ufi/dutyAll')
}

/**
 *  保存/更新职位信息
 */
export const saveDuty = (sendData) => {
        return fetch('uf/duty/save', sendData, 'POST')
    }
    /**
     *  删除职位信息
     */
export const delDuty = (id) => {
        return fetch('uf/duty/delete/' + id)
    }
    /**
     *  恢复职位信息
     */
export const recoverDuty = (id) => {
        return fetch('uf/duty/recover/' + id)
    }
    /**
     * zlm职位接口end
     */

/**
 * zlm机构接口begin
 */
/**
 *  机构列表查询接口（分页）
 */
export const getAllDepart = (sendData, pid, searchInfo) => {
    return fetch('uf/depart/getAllDepart', {
        page: sendData.page.pageNumber,
        size: sendData.page.size,
        sort: sendData.page.sort,
        dname: searchInfo.dname,
        ddesc: searchInfo.ddesc,
        [`parent.id`]: pid,
        del: sendData.del
    })
};

/**
 *  机构树
 */
export const departTree = () => {
    return fetch('out/ufi/departTree', {})
};

/**
 *  保存/更新机构信息
 */
export const saveDepart = (sendData, pid) => {
    return fetch('uf/depart/save', sendData, 'POST')
}

/**
 *  删除机构信息
 */
export const delDepart = (id) => {
        return fetch('uf/depart/delete/' + id)
    }
    /**
     *  恢复机构信息
     */
export const recoverDepart = (id) => {
        return fetch('uf/depart/recover/' + id)
    }
    /**
     * zlm机构接口end
     */

/**
 *  获取操作列表
 */
export const getOperList = (sendData) => {
    return fetch('uf/operate/operaterList', {
        page: sendData.page.pageNumber,
        size: sendData.page.size,
        sort: sendData.page.sort,
        oname: sendData.oname,
        typeName: sendData.typeName,
        ocode: sendData.ocode,
    })
}

/**
 *  新增、修改操作
 */
export const saveOperate = (sendData) => {
        return fetch(`uf/operate/saveOperate`, sendData, 'POST')
    }
    /**
     *  删除操作
     */
export const deleteOperate = (id) => {
    return fetch(`uf/operate/deleteOperate/${id}`, '', 'DELETE')
}

/**
 *  获取权限列表
 */
export const getOperGroupList = (sendData) => {
    return fetch('uf/operate/operGroupList', {
        page: sendData.page.number,
        size: sendData.page.size,
        sort: sendData.page.sort,
        gname: sendData.operGroup.gname
    })
}

/**
 *  新增、修改权限
 */
export const saveOperGroup = (sendData, oids) => {
    return fetch('uf/operate/saveOperGroup', sendData, 'POST')
}

/**
 * 获取操作组集合
 */
export const operaterByGroupList = () => {
    return fetch('uf/operate/operaterByGroupList')
}

/**
 * 获取操作组名称集合
 */
export const operTypenameList = () => {
    return fetch('uf/operate/operTypenameList')
}

/**
 * 获取日志列表集合
 */
export const logList = (sendData) => {
    return fetch('uf/logmonitor/logList', {
        page: sendData.page.number,
        size: sendData.page.size,
        sort: sendData.page.sort,
        userName: sendData.log.userName,
        goal: sendData.log.goal,
        ip: sendData.log.ip,
        sysName: sendData.log.sysName,
        start: sendData.log.beginDate,
        end: sendData.log.endDate,
        caseName: sendData.log.caseName,
    })
}

/**
 * 查看权限
 */
export const viewOperGroup = (id) => {
    return fetch('uf/operate/viewOperGroup', { id: id })
}

/**
 * 删除权限
 */
export const deleteOperGroup = (id) => {
    return fetch('uf/operate/deleteOperGroup/' + id, '', 'DELETE')
}

/**
 * 修改权限默认状态
 */
export const saveOperGroupInitUse = (id) => {
        return fetch(`uf/operate/saveOperGroupInitUse?id=${id}`, {}, 'POST')
    }
    /**
     * 修改用户密码
     */
export const updatePwd = (sendData) => {
    return fetch(`uf/userinfo/updatePwd?oldPwd=${sendData.oldPwd}&newPwd=${sendData.newPwd}&confirmPwd=${sendData.confirmPwd}`, {}, 'POST')
}

/**
 * 重点人员-获取list
 */
export const getPersonnelList = (sendData) => {
  return fetch('/uf/personnel/queryPersonnel', {
    page: sendData.page.pageNumber,
    size: sendData.page.size,
    sort: sendData.page.sort,
    xm: sendData.xm,
    sfzh: sendData.sfzh,
    cph: sendData.cph,
    jg: sendData.jg,
    jtzz: sendData.jtzz,
  })
}
/**
 * 重点人员保存
 */
export const savePersonnel = (sendData) => {
  return fetch('uf/personnel/save', sendData, 'POST')
}
/**
 * 重点人员删除
 */
export const deletePersonnel = (id) => {
  return fetch('/uf/personnel/deletePersonnel/{id}', '', 'DELETE')
}


/**
 *   字典保存和修改
 */
export const saveDictGroups = (sendData) => {
  return fetch('cm/CaseDiction/saveCaseDiction', sendData, "POST")
}

/**
 *   字典删除
 */
export const deleteDictGroups = (sendData) => {
  return fetch('cm/CaseDiction/delete', sendData, "POST")
}
/**
 *   字典信息
 */
// export const getDictGroups = (sendData) => {
//   return fetch('cm/CaseDiction/queryCaseDiction', {
//     page: sendData.page.pageNumber,
//     size: sendData.page.size,
//     sort: sendData.page.sort,
//     code: sendData.code,
//     name: sendData.name,
//     parentCode: sendData.parentCode
//   })
// }


// create by zenghao
/**
 *  案件信息管理
 */
export const caseinfoQueryCaseInfo = (sendData) => {
  return fetch('cm/caseinfo/queryCaseInfo', {
    cissynchrocase: sendData.cissynchrocase,
    page: sendData.page.pageNumber,
    size: sendData.page.size,
    sort: sendData.page.sort,
    issynchroCase: sendData.issynchroCase,
    caseName: sendData.caseName,
    objName: sendData.objName,
    identify: sendData.identify,
    ctypecode: sendData.ctypecode,
    cstatus: sendData.cstatuscode,
    caseLevelcode:sendData.caseLevelcode,
    ccategorycode:sendData.ccategorycode,
    cturncasecategorycode:sendData.cturncasecategorycode,
    cassistcategorycode:sendData.cassistcategorycode
  })
}
/**
 *  获取新增案件中下拉框数据
 */
export const findCaseDictionByParent = (data) => {
  return fetch('cm/CaseDiction/findCaseDictionByParent', {
    parentCode: data
  },'GET')
}
/**
 *  手动结案
 */
export const caseobjectFinishCaseInfo = (id) => {
  return fetch(`cm/caseinfo/finishCaseInfo/${id}`,{
    "caseid":id
  },'POST')
}
/**
 *  删除单独案件
 */
export const caseinfoDeleteCaseInfo = (id) => {
  return fetch(`cm/caseinfo/deleteCaseInfo/${id}`,{},'DELETE')
}
/**
 *  同步案件
 */
export const caseSynchronization = (sendData) => {
  return fetch("cm/caseSynchronization/caseAcess",{
    "type":sendData.type,
    "caseid":sendData.caseId
  })
}
