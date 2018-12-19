import fetch from "./fetch";

export const signOut=(data)=>fetch("/ums/w/user/alogout",data,"POST");//登出
export const requestMethod=(data,url,load)=>fetch(url,data,"POST",load);//请求的通用方法
/*亚飞达管理*/
export const getDepartDetail=(data)=>fetch("/ums/w/user/getDepartDetail",data,"POST")

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
/*获取靓号类型包列表*/
export const getCuteTypeList=(data)=>fetch("/nms/w/number/getCuteTypeProduct",data,"POST")
/*修改靓号包拆包状态*/
export const updateCuteSplitFlag=(data)=>fetch("/nms/w/number/updateCuteSplitFlag",data,"POST")
/*修改靓号类型包上架下架*/
export const updateCuteState=(data)=>fetch("/nms/w/number/updateCuteState",data,"POST")

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

/*获取角色列表*/
export const getRoles=(data)=>fetch("/ums/w/user/getRoles",data,"POST")

/*删除角色*/
export const deleteRole=(data)=>fetch("/ums/w/user/deleteRole",data,"POST")

/*获取角色权限列表*/ 
export const getPrivileges=(data)=>fetch("/ums/w/user/getPrivileges",data,"POST")

/*新增角色权限*/ 
export const addRole=(data)=>fetch("/ums/w/user/addRole",data,"POST")

/*修改角色权限*/ 
export const updateRolePrivilege=(data)=>fetch("/ums/w/user/updateRolePrivilege",data,"POST")

/*渠道列表获取*/
export const getDealerList=(data)=>fetch("/ums/w/user/getDealerBaseInfoList",data,"POST")

/*修改代理商归属渠道*/
export const updateDealerInfo=(data)=>fetch("/ums/w/depart/updateDealerInfo",data,"POST")

/*获取渠道变更历史*/
export const departChangeHistory=(data)=>fetch("/ums/w/depart/getDealerInfoChangeHistory",data,"POST")

/*获取充值订单列表*/
export const getRechargeOrders=(data)=>fetch("/rfs/w/phone/getMngOrders",data,"POST")

/*获取归属渠道列表*/
export const getaccountDealer=(data,load)=>fetch("/ums/w/account/dealer",data,"POST",load)

/*账户列表*/
export const getaccounts=(data,load)=>fetch("/ums/w/account/accounts",data,"POST",load)

/*账户余额明细*/
export const getBalance=(data,load)=>fetch("/ums/w/account/balance-detail",data,"POST",load)

/*佣金累计返利金额详情*/
export const cmsdetails=(data,load)=>fetch("/ums/w/account/cms-detail",data,"POST",load)

/*佣金返利类目*/
export const cmstype=(data,load)=>fetch("/ums/w/account/cms-types",data,"POST",load)

/*佣金excel导出*/
export const cmsDownload=(data,load)=>fetch("/ums/w/account/export",data,"GET",load)

/*佣金excel导出*/
export const upRecords=(data,load)=>fetch("/ums/w/account/upload-records",data,"POST",load)

/*佣金修改记录*/
export const updateRecords=(data,load)=>fetch("/ums/w/account/update-records",data,"POST",load)

/*佣金excel上传*/
export const upExcel=(data,load)=>fetch("/ums/w/account/upload-excel",data,"POST",load)

/*修改佣金未开票金额*/
export const cmsupdate=(data,load)=>fetch("/ums/w/account/cms-update",data,"POST",load)

/*佣金账户余额明细*/
export const getCmsBalance=(data,load)=>fetch("/ums/w/account/cms-balance-detail",data,"POST",load)

/*佣金账户提现明细*/
export const getCmsWithdrawal=(data,load)=>fetch("/ums/w/account/cms-transfer-records",data,"POST",load)

/*佣金账户明细*/
export const commission=(data,load)=>fetch("/ums/w/account/commission",data,"POST",load)

/*佣金账户提现*/
export const transfer=(data,load)=>fetch("/ums/w/account/transfer",data,"POST",load)

/*新增收货地址*/
export const addAddress=(data,load)=>fetch("/ums/w/address/add",data,"POST",load)

/*列表查询*/
export const searchAddress=(data,load)=>fetch("/ums/w/address/addresses",data,"POST",load)

/*新增收货地址*/
export const changeDefault=(data,load)=>fetch("/ums/w/address/change-default",data,"POST",load)

/*删除收货地址*/
export const deleteAddress=(data,load)=>fetch("/ums/w/address/delete",data,"POST",load)

/*更改收货地址*/
export const updateAddress=(data,load)=>fetch("/ums/w/address/mng-update",data,"POST",load)

/*查询用户信息*/
export const searchUser=(data,load)=>fetch("/ums/w/address/user",data,"POST",load)

/*添加代理商*/
export const addDepart=(data,load)=>fetch("/ums/w/depart/add",data,"POST",load)

/*更新代理商*/
export const updateDepart=(data,load)=>fetch("/ums/w/depart/update",data,"POST",load)

/*代理商加盟列表申请*/
export const applicationlist=(data,load)=>fetch("/ums/w/application/list",data,"POST",load)

/*提交代理商信息*/
export const submitAgentInfo=(data,load)=>fetch("/ums/w/application/submit",data,"POST",load)

/*更新代理商信息*/
export const updateAgentInfo=(data,load)=>fetch("/ums/w/application/update",data,"POST",load)

/*审核申请*/
export const applyReview=(data,load)=>fetch("/ums/w/application/review",data,"POST",load)

/*号码资源查询 */
export const numberResource=(data,load)=>fetch("/nms/w/number/resources/query",data,"POST",load)




















