import {getStore,errorDeal} from '../config/utils.js';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({ showSpinner: false });

export default async(url = '', data = {}, type = 'GET', load, method = 'fetch') => {
    let headerId;
    if(!load){
        var layerIndex=layer.open({type: 2,shadeClose:false});
	}
    type = type.toUpperCase();
    
	const closeLoadLayout=()=>{
        typeof load==='function' ? load() : layer.close(layerIndex);
    };
	
    //--------------------------------------------------------------------
    let userInfo=getStore("YFD_NMS_INFO");
    if(userInfo){
        Object.assign(userInfo,data);
        headerId=userInfo.userId;
        data=userInfo;
    }else{
        errorDeal({'code':648},closeLoadLayout);
        headerId='';
        return false;
    }
//--------------------------------------------------------------------
	if (type == 'GET') {
		let dataStr = ''; //数据拼接字符串
		Object.keys(data).forEach(key => {
			dataStr += key + '=' + data[key] + '&';
		});

		if (dataStr !== '') {
			dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
			url = url + '?' + dataStr;
		}
	}
	if (window.fetch && method == 'fetch') {//FETCH
		let requestConfig = {
			credentials: 'include',
			method: type,
			headers: {
				'Content-Type': 'application/json',
                'mhscAuth':'3,0,'+headerId,
			},
			mode: "cors",
			cache: "force-cache"
		};

		if (type == 'POST') {
			Object.defineProperty(requestConfig, 'body', {
				value: JSON.stringify(data)
			});
        }
        return new Promise((resolve,reject)=>{
            if(url!="/nms/w/number/getArea"){
                NProgress.start();
            }
            fetch(url, requestConfig)
            .then(response => {
                NProgress.done();
                closeLoadLayout();
                if(response.status=="200"){
                    return response.json();
                }else {
                    return response.status;
                }
            }).then(data=>{
                if(data.hasOwnProperty('code')&&data.code==200){
                    resolve(data);
                }else if(data.hasOwnProperty('code')&&data.code!=200){
                    reject(data);
                }else{
                    reject({code:data});
                }
            }).catch(error=>errorDeal(error));
        })
	} else {//XHR对象
		return new Promise((resolve, reject) => {
			let requestObj;
			if (window.XMLHttpRequest) {
				requestObj = new XMLHttpRequest();
			} else {
				requestObj = new ActiveXObject;
			}

			let sendData = '';
			if (type == 'POST') {
				sendData = JSON.stringify(data);
			}

			requestObj.open(type, url, true);
			requestObj.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			requestObj.setRequestHeader("mhscAuth","3,0,"+headerId);
			requestObj.send(sendData);

			requestObj.onreadystatechange = () => {
				if (requestObj.readyState == 4) {
					if (requestObj.status == 200) {
						let response = requestObj.response;
						if (typeof response !== 'object') {
							response = JSON.parse(response);
						}
						closeLoadLayout();
				        if(typeof response==='string'){
				            errorDeal('数据解析失败');
				        }else if(response.code=="200"){
				        	resolve(response);
				        }else{
				        	errorDeal(response);
				        }
					} else {
						reject(requestObj);
					}
				}
			};
		});
	}
}