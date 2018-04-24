import service from '../../config/utils/service';
export default {
	/**
	* 获取验证码
	*/
	getIdentifyCode(params,selfLoad){
		return service('/yfd-ums/w/user/getAuthCode',params,selfLoad);
	},
	/**
	* 业务平台登录
	*/
	actionLogin(params,selfLoad){
		return service('/yfd-ums/w/user/login',params,selfLoad);
	},
	/**
	* 管理平台登录
	*/
	actionMagLogin(params,selfLoad){
		return service('/yfd-ums/w/user/alogin',params,selfLoad);
	}
};