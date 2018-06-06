import {Message} from 'iview';
export const arrDistinct = function(addArrays) { 
    var i,
        j,
        len = addArrays.length;
    for (i = 0; i < len; i++) {
        addArrays[i]['removenumber'] = '1';
        for (j = i + 1; j < len; j++) {
            if (addArrays[i].identify === addArrays[j].identify && addArrays[i].identifytype === addArrays[j].identifytype) {
                Message.warning(`正在去除重复的标识号码!`);
                addArrays.splice(j, 1);
                len--;
                j--;
            }
        }
    }
    return addArrays;
}               
// 提交时数组去重 并 添加一些 标识信息   (此处待优化!!!)        
export const arrDistinctSubmit = function(addArrays,objectId="",display="1") { 
    var i,
        j,
        len = addArrays.length;
    for (i = 0; i < len; i++) {
        // 移除后台不需要的 key
        if(!!addArrays[i].index || addArrays[i].action === "") {
            delete addArrays[i].index;
            delete addArrays[i].action;
        }
        /**
         *  @ 首次新增对象提交标识: 
         *      display = 1  |  objectId (id) 不存在  | removenumber = 1
         *  @ 从案件对象中提交标识
         *      display = 1  |  objectId (id) 存在    | removenumber = 1
         */
        addArrays[i]['id'] = objectId;
        addArrays[i]['objectid'] = objectId;
        addArrays[i]['display'] = display;
        addArrays[i]['removenumber'] = "1";
        for (j = i + 1; j < len; j++) {
            if (addArrays[i].identify === addArrays[j].identify && addArrays[i].identifytype === addArrays[j].identifytype) {
                Message.warning(`正在去除重复的标识号码!`);
                addArrays.splice(j, 1);
                len--;
                j--;
            }
        }
    }
    return addArrays;
}