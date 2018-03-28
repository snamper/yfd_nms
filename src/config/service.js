import fetch from "./fetch";

export const signOut=(data)=>fetch("/yfd-ums/w/user/alogout",data,"POST");//登出
export const requestMethod=(data,url)=>fetch(url,data,"POST");//请求的通用方法
export const requestMethod2=(data,url,load)=>fetch(url,data,"POST",load);//请求的通用方法
