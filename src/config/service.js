import fetch from "./fetch";

export const signOut=(data)=>fetch("/ums/w/user/alogout",data,"POST");//登出
export const requestMethod=(data,url,load)=>fetch(url,data,"POST",load);//请求的通用方法
/* 公告消息 */
export const requestConfirmDelNotice=(data)=>fetch("/mns/w/msg/delete",data,"POST")
/* 操作日志 */
export const requestSyncSearch=(data)=>fetch("/ors/w/record/syncSearch",data,"POST");
export const requestgetSyncTime=(data)=>fetch("/ors/w/record/getSyncTime",data,"POST");
/* 提卡订单管理 */ 
export const requestPickupOrder=(data,load)=>fetch("/nms/w/order/search",data,"POST",load)
export const requestProductDetails=(data,load)=>fetch("/nms/w/number/getProductDetail",data,"POST",load)
export const requestChangeLogisticsId=(data)=>fetch("/nms/w/order/modifyDeliveryOrderId",data,"POST")
export const requestConfirmTakeGoods=(data)=>fetch("/nms/w/order/modifyState",data,"POST")
export const requestConfirmPayMent=(data)=>fetch("/nms/w/order/confirmPayment",data,"POST")
export const requestModify_Price=(data)=>fetch("/nms/w/number/modifyCartPrice",data,"POST")


