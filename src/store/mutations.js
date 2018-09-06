import {
    SIGN_OUT,
    SET_USERINFO,
    GET_ROLE
} from './mutation-types.js';

import {setStore, getStore, removeStore, secondsFormat} from '../config/utils';

export default {
	//设置用户信息
	[SET_USERINFO](state,res){
		state.userInfo=res;
		setStore("YFD_NMS_INFO",res);
    },
    
	//登出
	[SIGN_OUT](state){
		state.userInfo={};
        removeStore("YFD_NMS_INFO");
        removeStore("departId");
		window.location.href='#/login';
    },
    //权限列表
    [GET_ROLE](state,res){
        state.rolelist1 = [].concat(res.data.roles);
        state.rolelist = Object.assign({},res.data.roles); 
    }
};
