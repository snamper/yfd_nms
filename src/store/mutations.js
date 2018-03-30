import {
    SIGN_OUT,
    SET_USERINFO
} from './mutation-types.js';

import {setStore, getStore, removeStore, secondsFormat} from '../config/utils';

export default {
	//设置用户信息
	[SET_USERINFO](state,res){
		state.userInfo=res;
		setStore("KA_ECS_USER",res);
	},
	//登出
	[SIGN_OUT](state){
		state.userInfo={};
		removeStore("KA_ECS_USER");
		removeStore("KA_ECS_ONLINE_TIME");
		window.location.href='/nbs/login';
	}
};
