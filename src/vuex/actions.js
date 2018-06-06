//  create by jh 2017-12-05
import {
    SET_DICT_GROUPS,
} from './mutation-type.js'

import {getDictGroups} from '@/service/getData'

export default {  
    // 一些异步操作放置在 action 中处理 
    async getDictGroups({commit,state}){
        try{
            let res = await getDictGroups();
            commit(SET_DICT_GROUPS, res);        
        }catch(err){
            console.log(err);
        }
    }      
}