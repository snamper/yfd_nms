import fetch from "./fetch";

export const signOut=(data)=>fetch("km_centre_ecs/user/loginout",data,"POST");//登出
export const requestMethod=(data,url)=>fetch(url,data,"POST");//请求的通用方法
