import store from '../store';
/**
 * http错误处理
 */
export const errorDeal=(res,cb)=>{
    typeof cb==="function"&&cb();
    res.code=="648"||res.code=="671" ? (layer.open({
        content:'登录已过期，请重新登录',
        style:'width:auto;',
        btn:['确定'],
        shadeClose:false,
        yes:function(){
          store.commit("SIGN_OUT");
          layer.closeAll();
        }
    })) : res.hasOwnProperty("msg")?(layer.open({
            content:res.msg||res.statusText||res,
            skin: 'msg',
            time: 4,
            msgSkin:'error',
    })) : layer.open({
            content:"系统异常",
            skin: 'msg',
            time: 4,
            msgSkin:'error',
    });
};
/**
 * iframe 文件下载
 */
export const createDownload=(url,cb)=>{
    debugger;
	var body=document.getElementsByTagName("body")[0],
	ifr=document.getElementById("downLoadForm"),
    form = document.createElement("form"),
    input = document.createElement("input");
    if(!ifr){
    	ifr=document.createElement("iframe");
    	ifr.setAttribute("id","downLoadForm");
    	ifr.setAttribute("name","downLoadForm");
    	ifr.setAttribute("style","display:none");
    }
    ifr.addEventListener("load",function(e){
    	cb();
    	try{
            var res = ifr.contentWindow.document.body.textContent;
            if(res!=''&&res.hasOwnProperty('code')){
               var result=JSON.parse(res);
               if(res.code!=200){
                  errorDeal(res);
               } 
            };	
    	}catch(error){
    		errorDeal(error);
    	}
    });
    
    form.setAttribute("style","display:none");
    form.setAttribute("target","downLoadForm");
    form.setAttribute("enctype","application/x-www-form-urlencoded;charset=utf-8");
    form.setAttribute("method","get");
    form.setAttribute("action",url);

    input.setAttribute("type","hidden");
    body.appendChild(ifr);
    body.appendChild(form);

    form.appendChild(input);
    form.submit();
    form.remove();
};
/**
 * 拼接参数到url
 * @param {*} url 
 * @param {*} param 
 */
export const createURL = (url,param/*链接和参数*/)=>{
    Object.each(param,function(item,key){
        var link = '&' + key + "=" + item;
        myURL.link += link;                
    })
    myURL.link = url + "?" + myURL.link.substr(1);
    return myURL.link.replace(' ','');
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
}

/**
 * 获取localStorage
 */
export const getStore = name => {
	if (!name) return;
	let content=window.localStorage.getItem(name);
	return content?JSON.parse(content):'';
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
	if (!name) return;
	window.localStorage.removeItem(name);
}
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
        c = t.getSeconds(),
        k = [];
    a >= 10 ? a : a = "0" + a, r >= 10 ? r : r = "0" + r, o >= 10 ? o : o = "0" + o, i >= 10 ? i : i = "0" + i, c >= 10 ? c : c = "0" + c, k[0]=n,k[1]=a,k[2]=r,k[3]=n+'-'+a,k[4]=a+'-'+r,k[5]=o+":"+i+":"+c,k[6]=n + "-" + a + "-" + r + " " + o + ":" + i + ":" + c,k[7]=o+":"+i,k[8]=n + "-" + a + "-" + r;
    return k;
}

/**
 * 日期转时间戳
 */
export const getUnixTime= e =>{
	var t;
	if(e){
		e=e.replace(/-/g,'/');
		t=new Date(e);
	}else t= new Date();
	return t.getTime().toString();
}
/**
 * 秒数格式化
 */
export const secondsFormat=(v)=>{
	v=parseInt(v);
    var day,minute,second,hour;
    day=Math.floor(v/(60*60*24));
    hour=Math.floor(v%(60*60*24)/(60*60));
    minute=Math.floor(v%(60*60)/60);
    second=Math.floor(v%60);
    hour<10&&(hour='0'+hour);
    minute<10&&(minute='0'+minute);
    second<10&&(second='0'+second);
    return day!='00' ? day+"天"+hour+":"+minute+":"+second : 
	    hour!='00' ? hour+":"+minute+":"+second : 
	    minute!='00' ? "00:"+minute+":"+second : "00:00:"+second;
}
/**
 * 验证手机号
 */
export const checkMobile=(v,f)=>{ 
    if(!(/^1[3|4|5|6|7|8|9][0-9]\d{8}$/.test(v))){ 
        layer.open({
            content:'请输入正确的手机号码',
            skin: 'msg',
            time: 2,
            msgSkin:'error',
        });
        if(typeof(f)=="function"){
            f()(); 
        }
    } 
}
/**
 * 验证七位数号段
 */
export const checkNumberSection=(v,f)=>{
    if(!(/^1[3|4|5|6|7|8|9]\d{5}$/.test(v))){
        layer.open({
            content:'请输入正确的七位数号段',
            skin: 'msg',
            time: 2,
            msgSkin:'error',
        });
        if(typeof(f)=="function"){
            f()(); 
        }
    }
}
/**
 *去除空格
 */
export const trimFunc=(v)=>{
    return v.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}
/**
 * 开卡订单-数据翻译
 */
export const translateData=(type,v,d)=> {
    v=parseInt(v);
    let val;
    switch(type){
        case 1:
            return v==1?'移动':v==2? '联通':v==3? '电信':'--';
        break;
        case 2:
            return v==1?'整号包':v==2? '靓号包':v==3? '普号包':'--';
        break;
        case 3:
            return v==1?'未上架':v==2? '手动上架':v==3? '手动下架' :v==4? '系统下架' :v==5? '已出售' : v==6? '购物车中' : '--';
        break;
        case 4:
            return v==1?'远特':v==2? '蜗牛':v==3? '迪信通' :v==4? '极信' :v==5? '小米' : v==6? '海航' : v==7? '乐语' :v==8? '苏宁互联': v==9?'国美':v==10? '联想':v==11?'蓝猫移动':v==12?'长城':v==13?'中邮':v==14?'鹏博士':v==15?'天音':'--';
        break;
        case 5:
            return v==1?'ios':v==2?'Android':v==3?'Web':'--';
        break;
        case 6:
            return v==1?'处理中':v==2?'成功':v==3?'失败':'--';
        break;
        case 7:
            return v==1?'QQ':v==2?'微信':v==3?'其他':'--';
        break;  
        case 8:
            return v==1?'身份证':'--';
        break
        case 9:
            return v==1?'拍照上传':v==2?'相册上传':'--';
        break
        case 'userState':
            val=["正常","黑名单","手动注销","系统注销"]
            return val[v-1];
        break
        case 'phoneLevel':
           if(!isNaN(v)){
             return v==-1?'普号':v+'级靓号';
           }else{
             return '--';
           }
        case 'fenToYuan':
            if(!isNaN(v)&&v!=0){
              return (v/100).toFixed(2)
            }else if(!isNaN(v)&&v==0){
              return '0';
            }else{
              return '--'
            }
        case 'yjType':
            return v==1?'迪加激活返3元':v==2?'T+2月开来显返款1元':v==3?'连续3个月在网开来显返还1元':v==4?'开通来显返利1元3年期':v==5?'T+2月开来显返0.5元':v==6?'模组套餐返1元、0.5元'
            :v==7?'代理话分':v==8?'合创话分':v==9?'数据费用4%话分':v==10?'远特充20返2元':v==11?'苏宁激活充值奖励':v==12?'苏宁来显奖励':'--';
    }
}

export const translateRole=(y,z)=>{
    for(let i in z){
        if(z[i].id==y){
            return z[i].roleName;
        }
    }
}

export const deepCopy=(p, c)=> {
　　var c = c || {};
　　for (var i in p) {
　　　　if (typeof p[i] === 'object') {
　　　　　　c[i] = (p[i].constructor === Array) ? [] : {};
　　　　　　deepCopy(p[i], c[i]);
　　　　} else {
　　　　　　　c[i] = p[i];
　　　　}
　　}
　　return c;
}

export const disableTimeRange=()=>{
    let curDate = new Date().getTime();
    let curYear=new Date(curDate).getFullYear();
    let curMonth=new Date(curDate).getMonth()+1;
    let nextMonth=curMonth+1;               
    let cur=curYear+"/"+curMonth+"/1",
        getCurTime=new Date(cur).getTime();
    let next=curYear+"/"+nextMonth+"/1";
    let nextYesterday=new Date(next)-1000*3600*24;
    return {"next":getCurTime,"nextYesterday":nextYesterday}
}
export const disableTimeRange6=()=>{
    let curDate = new Date().getTime();
    let curYear=new Date(curDate).getFullYear();
    let curMonth=new Date(curDate).getMonth()+1,
        minMonth=curMonth-5,
        minYear=curYear;
        if(minMonth<0){
            minMonth+=12;
            minYear=curYear-1;
        }
    let nextMonth=curMonth+1;               
    let cur=minYear+"/"+minMonth+"/1",
        getCurTime=new Date(cur).getTime();
    let next=curYear+"/"+nextMonth+"/1";
    let nextYesterday=new Date(next)-1000*3600*24;
    return {"next":getCurTime,"nextYesterday":nextYesterday}
}

export const getTimeFunction=(t,d)=>{
    let vm=t,curMonth,curYear,timeStamp='';
    let curDate = (new Date()).getTime();
    if(typeof(d)=="undefined"){
        curYear=new Date(curDate).getFullYear();
        curMonth=new Date(curDate).getMonth()+1;
        let curDay=new Date(curDate).getDate();
        let cur=curYear+"/"+curMonth+"/1";
        let Next=curYear+"/"+curMonth+"/"+curDay;
            Next=new Date(Next).getTime()+60*60*24*1000; 
        vm.endTime=new Date(Next).getTime()-1000;
        vm.endTime2=new Date(Next).getTime()-1000;
        vm.startTime=new Date(cur).getTime();
        vm.startTime2=new Date(cur).getTime();
    }else if(d[1]=='1'){
        curMonth = new Date(d[0]).getMonth()+1;
        curYear=new Date(d[0]).getFullYear();  
        timeStamp= getDateTime(vm.endTime)[6];
        timeStamp=timeStamp.split('-');
        timeStamp.splice(0,2,curYear,curMonth);
        let ce=timeStamp.join('-');
        vm.endTime=new Date(ce).getTime();
        vm.startTime=new Date(d[0]).getTime();
    }else if(d[1]=='2'){
        curMonth = new Date(d[0]).getMonth()+1;
        curYear=new Date(d[0]).getFullYear();
        timeStamp= getDateTime(vm.startTime)[6];
        timeStamp=timeStamp.split('-');
        timeStamp.splice(0,2,curYear,curMonth);
        let cs=timeStamp.join('-');
        vm.startTime=new Date(cs).getTime();
        vm.endTime=new Date(d[0]).getTime();
    }
}
export const initTime=(t,d)=>{
    let vm=t, curDate = (new Date()).getTime(),    
    curYear=new Date(curDate).getFullYear(),
    curMonth=new Date(curDate).getMonth()+1,
    curDay=new Date(curDate).getDate()+1,
    cur=curYear+"/"+curMonth+"/1",
    Next=curYear+"/"+curMonth+"/"+curDay;
    let startTime=new Date(cur).getTime();
    let endTime=new Date(Next).getTime()-1000;
    vm.optime=[startTime,endTime];
}
/**
 * 对象深拷贝
 */
export const cloneObj =  (obj) => { 
    if(obj === null) return null 
    if(typeof obj !== 'object') return obj;
    if(obj.constructor===Date) return new Date(obj); 
    if(obj.constructor === RegExp) return new RegExp(obj);
    var newObj = new obj.constructor ();  //保持继承链
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {   //不遍历其原型链上的属性
            var val = obj[key];
            newObj[key] = typeof val === 'object' ? arguments.callee(val) : val; // 使用arguments.callee解除与函数名的耦合
        }
    }  
    return newObj;  
}; 
/*解决浮点计算精度丢失的问题*/
Math.formatFloat = function (f, digit) {
    var m = Math.pow(10, digit);
    return Math.round(f * m, 10) / m;
}


