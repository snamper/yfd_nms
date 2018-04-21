import {
    SIGN_OUT,
    SET_USERINFO
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
		// removeStore("KA_ECS_ONLINE_TIME");
		window.location.href='/ums/login';
	}
};
