import {
    CHANGE_LOGIN_STATUS,
    SET_USERINFO,
    SET_DICT_GROUPS,
    SET_AUTH,
    CLEAR_AUTH,
    SAVE_CASE_OBJ_SIGN,
    SAVE_INVESTIGATE_TREE
} from './mutation-type.js'

import {setStore, getStore} from '../config/mUtils'

export default {

    [CHANGE_LOGIN_STATUS](state,bool){
        sessionStorage.setItem('isLogin', bool);
        state.isLogin = bool;        
    },

    [SET_USERINFO](state,data){
        setStore('userInfo', data);
        state.userInfo = data;        
    },

    [SET_DICT_GROUPS](state,data){       
        if (!!data) {
            setStore('dictGroups',data);
            for (let i = 0; i < data.length; i++) {
                let key = data[i].groupName;
                let val = data[i].dicts;
                state.dictGroups.set(key, val);
            }
        }        
    },

    [SET_AUTH](state,data){
        setStore('auth',data);
        for (let i = 0; i < data.length; i++) {
            let key = data[i];
            let val = '';
            state.auth.set(key, val);
        }        
    },

    [CLEAR_AUTH](state){
        state.auth.forEach((val, key, map) =>{
            map.delete(key)
        });
    },
    [SAVE_CASE_OBJ_SIGN](state,data){
        setStore('save_case_Info', data);
        state.save_case_Info = data;         
    },
    [SAVE_INVESTIGATE_TREE](state,data){
        if (!!data.length) {
            setStore('investiateTreeData',data);
            for (let i = 0; i < data.length; i++) {
                let key = data[i].title;
                let val = data[i].children;
                state.dictGroups.set(key, val);
            }
        }         
    }
}