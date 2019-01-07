// import store from '../store';
import Vue from 'vue';
import { Message } from 'element-ui';
/**
 * http错误处理
 */
export const errorDeal=(error)=>{
    let errorText=error;
    if(error.response){
        if(error.response.status==404){
            errorText='找不到服务器';
        }
    }else if(error.request){
        errorText=error.request;
    }else if(error.message){
        errorText=error.message;
    }else if(error.msg){
        errorText=error.msg;
    }

    if(error.code==671){
        Vue.prototype.$msgbox({
            message:'登录已过期，请重新登录',
            title:'登录异常',
            type:'error',
            showClose:true,
            confirmButtonText: '确定',
            beforeClose: (action, instance, done) => {
                if(action=='confirm'){
                    windowJump('/nms/login')
                }
            }
        });
    }else{
        Message({
          message: errorText,
          type: 'error',
          duration: 3 * 1000
        });
    } 
};
export const windowJump=(url)=>{
    window.location.href=url;
}
/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
	if (!name) return;
	if (typeof content !== 'string') {
		content = JSON.stringify(content);
	}
	window.localStorage.setItem(name, content);
};

/**
 * 获取localStorage
 */
export const getStore = name => {
	if (!name) return;
	let content=window.localStorage.getItem(name);
	return content?JSON.parse(content):'';
};

/**
 * 删除localStorage
 */
export const removeStore = name => {
	if (!name) return;
	window.localStorage.removeItem(name);
};
/**
 * 时间戳格式化
 */
export const getDateTime= e =>{
    var t;
    if(!e||e=='null'||e=='0')return ['--','--','--','--','--','--','--'];
    t = new Date(parseInt(e));
    var n = t.getFullYear(),
        a = t.getMonth()+1,
        r = t.getDate(),
        o = t.getHours(),
        i = t.getMinutes(),
        c = t.getSeconds();
    return n + "-" + a + "-" + r + " " + o + ":" + i + ":" + c;
};
/**
 * 品牌翻译
 */
export const translateBrand=(value)=>{
    let str='';
    switch(parseInt(value)){
        case 1:
            str='远特';
            break;
        case 2:
            str='蜗牛';
            break;
        case 3:
            str='迪信通';
            break;
        case 4:
            str='极信';
            break;
        case 5:
            str='小米';
            break;
        case 6:
            str='海航';
            break;
        case 7:
            str='乐语';
            break;
        case 8:
            str='苏宁互联';
            break;
        case 9:
            str='国美';
            break;
        case 10:
            str='联想';
            break;
        case 11:
            str='蓝猫移动';
            break;
        case 12:
            str='长城';
            break;
        default:
            str='未知';
            break;
    }
    return str;
};
/*格式化手机号样式*/
export const phoneFormat=(value)=>{
    if(!value)return '--';
    value=parseInt(value).toString();
    let len=value.length,w=value.split('');
    w.splice(3,0,' ');
    w.splice(8,0,' ');
    w=w.join('');
    return w;
};