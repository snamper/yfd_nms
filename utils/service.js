import Vue from 'vue';
import axios from 'axios';
import { errorDeal,getStore,windowJump } from './utils';

axios.defaults.timeout=10000;
axios.defaults.headers.post['Content-Type']='application/json';
// axios.defaults.baseURL='http://127.0.0.1:3000/';

axios.interceptors.request.use(
	config=>{
		return config;
	},
	error=>{
		return Promise.reject(error);
	}
);

axios.interceptors.response.use(
	res=>res,
	error=>{
		return Promise.reject(error);
	}
);
/**
 *@describe http请求
 *@url {String} 接口地址
 *@params {Object} 对应接口参数
 *@selfLoad {Object} 自定义加载
 *@selfLoad.text {String} 自定义加载文字
 *@selfLoad.open {Function} 自定义加载开启
 *@selfLoad.close {Function} 自定义加载关闭
 **/
export default function service (url, params,selfLoad){
	var loading={};
	if(selfLoad&&selfLoad.open){
		selfLoad.open();
		loading.close=selfLoad.close;
	}else{
		loading = Vue.prototype.$loading({
			lock: false,
			text: selfLoad&&selfLoad.text||'Loading',
			background: 'rgba(0, 0, 0, 0)'
		});
	}
	if(url.indexOf('login')==-1&&url.indexOf('getAuthCode')==-1){
		let userInfo=getStore('YFD_NMS_INFO');
		Object.assign(userInfo,params);
		params=userInfo;
		if(!userInfo){
			windowJump('/nbs/login');
			return false;
		}
	}
	return new Promise((resolve, reject)=>{
		axios.post(url, params)
		.then(res => {
			loading.close();
			
			if(res.data.code==200){
				resolve(res.data);
			}else{
				errorDeal(res.data);
			}
		})
		.catch(error=>{
			loading.close();
			errorDeal(error);
			reject(error);
		});
	});
}