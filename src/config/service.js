import fetch from "./fetch";

export const signOut=(data)=>fetch("/ums/w/user/alogout",data,"POST");//登出
export const requestMethod=(data,url)=>fetch(url,data,"POST");//请求的通用方法
export const requestMethod2=(data,url,load)=>fetch(url,data,"POST",load);//请求的通用方法
/* 操作日志相关接口 */
export const requestSyncSearch=(data)=>fetch("/ors/w/record/syncSearch",data,"POST");
export const requestgetSyncTime=(data)=>fetch("/ors/w/record/getSyncTime",data,"POST");
