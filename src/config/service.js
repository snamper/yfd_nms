import fetch from "./fetch";

export const signOut=(data)=>fetch("km_centre_ecs/user/loginout",data,"POST");//登出
