import fetch from "./fetch";

export const signOut=(data)=>fetch("/ums/w/user/alogout",data,"POST");//登出
export const requestMethod=(data,url,load)=>fetch(url,data,"POST",load);//请求的通用方法
/* 公告消息 */
export const requestConfirmDelNotice=(data)=>fetch("/mns/w/msg/delete",data,"POST")
/* 操作日志 */
export const requestSyncLogSearch=(data,load)=>fetch("/ors/w/record/syncSearch",data,"POST",load);
export const requestLoginLogSearch=(data,load)=>fetch("/ors/w/record/loginRecordSearch",data,"POST",load);
export const requestCardLogSearch=(data,load)=>fetch("/ors/w/record/numOperRecordSearch",data,"POST",load);
export const requestgetSyncTime=(data,load)=>fetch("/uus/w/record/getSyncTime",data,"POST",load);
export const requestgetSyncInfo=(data,load)=>fetch("/uus/w/setting/getInfo",data,"POST",load);
export const requestsetSyncTime=(data,load)=>fetch("/uus/w/setting/add",data,"POST",load);
/* 提卡订单管理 */ 
export const requestPickupOrder=(data,load)=>fetch("/nms/w/order/search",data,"POST",load)
export const requestProductDetails=(data,load)=>fetch("/nms/w/number/getProductDetail",data,"POST",load)
export const requestChangeLogisticsId=(data)=>fetch("/nms/w/order/modifyDeliveryOrderId",data,"POST")
export const requestConfirmTakeGoods=(data)=>fetch("/nms/w/order/modifyState",data,"POST")
export const requestConfirmPayMent=(data)=>fetch("/nms/w/order/confirmPayment",data,"POST")
export const requestModify_Price=(data)=>fetch("/nms/w/number/modifyCartPrice",data,"POST")
export const requestgetOrderSplitNumbers=(data)=>fetch("/nms/w/order/getOrderSplitNumbers",data,"POST")
/*提卡订单管理退款操作*/
export const requestReturnGoods=(data)=>fetch("/nms/w/order/returnOrder",data,"POST")

/*开卡订单管理*/
export const requestOpenCardOrder=(data)=>fetch("/nms/w/openReadyCard/getMngOpenCardOrders",data,"POST")
export const requestOpenCardDetails=(data)=>fetch("/nms/w/openReadyCard/getMngOpenCardOrderDetail",data,"POST")

/*码号管理*/
export const requestGetCarts=(data)=>fetch("/nms/w/number/getCarts",data,"POST")
export const requestGetCartDetail=(data)=>fetch("/nms/w/number/getCartDetail",data,"POST")
/*已上架普号包拆分*/
export const requestUpdateSplit=(data)=>fetch("/nms/w/number/updateSplitFlag",data,"POST")
/*码号库存管理查询*/
export const getNumberStorage=(data)=>fetch("/nms/w/number/searchStorage",data,"POST")
/*千字段号码概况*/
export const getNumberStorageThousand=(data)=>fetch("/nms/w/number/storageSectionDetail",data,"POST")
/*各面值号码详情*/
export const getNumberStorageFaceDtails=(data)=>fetch("/nms/w/number/storageFaceValueDetail",data,"POST")
/*千字段号码详情*/
export const getNumberStorageDetails=(data)=>fetch("/nms/w/number/storageThousandSectionDetail",data,"POST")

/*获取城市列表*/
export const getCityList=(data)=>fetch("/nms/w/number/getArea",data,"POST")




