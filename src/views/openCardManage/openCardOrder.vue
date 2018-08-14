<template>
    <section style="width:100%;height:100%" >
        <div v-if="!off.details" class="openCardOrder">
            <div class="dls greyFont">
                <el-row>
                    <el-col :span="24"><div class="grid-content bg-purple-dark searchTitleStyle blackFont">搜索条件</div></el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <div class="grid-content bg-purple-light">
                            <el-col :xs="4" :sm="4" :md="3" :lg="2" :xl="2" class="m-form-radio f-tar">
                                <label><span class="radioYes"><input  type="radio" value="1" v-model="form.searchKind" checked="checked"><span></span></span><span class="text greyFont">订单号码：</span></label>                            
                            </el-col>
                            <el-col :xs="18" :sm="16" :md="9" :lg="8" :xl="8">
                                <el-input v-model="orderId" size="small" maxlength=25 placeholder="请输入查询的订单号码"></el-input>
                            </el-col>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <div class="grid-content bg-purple-light">
                            <el-col :xs="4" :sm="4" :md="3" :lg="2" :xl="2" class="m-form-radio f-tar">
                                <label><span class="radioYes"><input  type="radio" value="2" v-model="form.searchKind" checked="checked"><span></span></span><span class="text greyFont">开卡号码：</span></label>                            
                            </el-col>
                            <el-col :xs="18" :sm="16" :md="9" :lg="8" :xl="8">
                                <el-input v-model="openNum" size="small" maxlength=11 placeholder="请输入查询的开卡号码"></el-input>
                            </el-col> 
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <el-col :xs="4" :sm="4" :md="3" :lg="2" :xl="2" class="m-form-radio f-tar">
                            <label><span class="radioYes"><input type="radio" value="3" v-model="form.searchKind" checked="checked"><span></span></span><span class="text greyFont">操作时间：</span></label>                            
                        </el-col>
                        <el-col :xs="18" :sm="16" :md="20" :lg="18" :xl="8">
                            <div class="block">
                                <el-date-picker
                                v-model="startTime"
                                size="small"
                                type="date"
                                :clearable=false                                        
                                :editable=false                    
                                :picker-options="pickerOptionsS"
                                @change="changeTimeS"
                                style="border-radius:4px 0 4px 0"
                                placeholder="选择开始时间">
                                </el-date-picker><el-date-picker
                                v-model="endTime"
                                size="small"
                                type="date"
                                :clearable=false                                        
                                :editable=false                    
                                :picker-options="pickerOptionsE"
                                @change="changeTimeE"                            
                                placeholder="选择结束时间">
                                </el-date-picker>
                            </div>
                        </el-col>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col ors:xs="24" :sm="24" :md="24" :lg="12" :xl="12"><div class="grid-content bg-purple-light">
                        <el-col :xs="4" :sm="4" :md="3" :lg="4" :xl="4"><div class="grid-content bg-purple-dark textR inputTitle">开卡结果：</div></el-col>
                        <el-col :xs="18" :sm="16" :md="20" :lg="16" :xl="16">
                            <el-radio v-model="openRes"  label="1,2,3">全部</el-radio> 
                            <el-radio v-model="openRes"  label="1">处理中</el-radio>
                            <el-radio v-model="openRes"  label="2">成功</el-radio>
                            <el-radio v-model="openRes"  label="3">失败</el-radio>
                        </el-col>
                    </div></el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-col :xs="4" :sm="4" :md="3" :lg="4" :xl="4"><div class="grid-content bg-purple-dark textR inputTitle">操作人：</div></el-col>
                        <el-col :xs="18" :sm="16" :md="17" :lg="16" :xl="16">
                            <el-input v-model="operator" size="small" maxlength=20 placeholder="请输入查询的操作人姓名"></el-input>
                        </el-col>
                        <el-col :span="2"></el-col> 
                    </el-col>
                </el-row>
                <el-row>
                    <el-col ors:xs="24" :sm="24" :md="24" :lg="12" :xl="12"><div class="grid-content bg-purple-light">
                        <el-col :xs="4" :sm="4" :md="3" :lg="4" :xl="4"><div class="grid-content bg-purple-dark textR inputTitle">开卡方式：</div></el-col>
                        <el-col :xs="18" :sm="16" :md="17" :lg="16" :xl="16">
                            <el-radio v-model="openType"  label="1,2,3">全部</el-radio>
                            <el-radio v-model="openType"  label="1,2">APP</el-radio>
                            <el-radio v-model="openType"  label="3">WEB</el-radio>
                        </el-col>
                    </div></el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <el-col :xs="4" :sm="4" :md="3" :lg="4" :xl="4"><div class="grid-content bg-purple-dark textR inputTitle">商户名称：</div></el-col>
                        <el-col :xs="18" :sm="16" :md="17" :lg="16" :xl="16">
                            <el-input v-model="dealerName" size="small" maxlength=20 placeholder="请输入查询的商户名称"></el-input>
                        </el-col>
                        <el-col :span="2"></el-col> 
                    </el-col>
                </el-row>
                <el-row style="text-align:center" class="marginTop">
                    <button class="searchBtn" @click="search()">搜索</button>
                </el-row>
            </div>
            <div v-if="searchResult">
                <div>
                    <div class="detailsListDiv">
                        <table class="searchTab" style="width:100%;height:100%;">
                            <tr>
                                <td colspan="9">
                                    <div class="listHeader">
                                        <label style="text-align:left;padding-left:20px;">订单列表<span class="fontWeight greyFont">({{form.page||'0'}})</span></label>
                                        <b style="text-align:right;padding-right:20px;"><button v-if="searchResult.length>0" class="btnDownload" @click="downLoad" >导出</button></b>
                                    </div>
                                </td>
                            </tr>
                            <tr class="f-s-14">
                                <td>序号</td>
                                <td>订单号码</td>
                                <td>开卡号码</td>
                                <td>操作人手机号</td>
                                <td>操作人姓名</td>
                                <td>开卡时间</td>
                                <td>开卡结果</td>
                                <td>开卡方式</td>
                                <td>用户姓名</td>
                            </tr>
                            <tr v-for="(v,i) of searchResult" :key="i">
                                <td>{{((pa-1)*10+(i+1))}}</td>
                                <td  @click="details(v)"><a href="javascript:void(0)">{{v.sysOrderId||'--'}}</a> </td>
                                <td>{{v.phone||'--'}}</td>
                                <td>{{v.operatorPhone||'--'}}</td>
                                <td>{{v.operatorName||'--'}}</td>
                                <td>{{getDateTime(v.createTime)[6]}}</td>
                                <td>
                                    <span :class="v.openCardResult==2?'c-green':v.openCardResult==3?'c-red':''">{{translateData(6,v.openCardResult)}}</span>
                                </td>
                                <td>{{translateData(5,v.terminalType)}}</td>
                                <td> {{v.idcardName||'--'}} </td>
                            </tr>
                            <tr v-if="searchResult.length<=0">
                                <td colspan="12">暂无数据</td>
                            </tr>
                        </table>
                    </div>
                    <div class="listTitleFoot" v-if="searchResult.length>0">
                        <el-row>
                            <el-col ors:xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                                <div class="grid-content bg-purple">
                                    <el-pagination
                                        layout="prev, pager, next"
                                        :page-size="10"
                                        @current-change="search"
                                        :current-page.sync="currentPage"                                                        
                                        :total="form.page">
                                    </el-pagination>    
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </div>
        </div>
        <order-details v-if="off.details" :detailsData="productDetails" ></order-details> 
  	</section>
</template>
<script>
import {disableTimeRange6,errorDeal,getDateTime,trimFunc,getTimeFunction,translateData,getStore } from "../../config/utils";
import {requestOpenCardOrder,requestOpenCardDetails} from "../../config/service.js";
import orderDetails from "./orderDetails";
import Base64 from '../../config/utils/base64.js';
export default {
    data() {
        return {
            currentPage:0,
            searchResult:"",
            productDetails:{},//产品包详情
            pa: 1,//页码
            endTime:'',
            startTime:'',//时间
            dealerName:"",//商户名称            
            orderId: "",//订单号码
            openNum: "",//开卡号码
            operator: "",//操作人
            openRes: "1,2,3",//开卡结果
            openType:"1,2,3",//开卡方式
            searchJson:{},
            off: {
                details:false,
                layer:false,
            },
            form: {
                page: 0,
                searchKind:3,
            }, 
            pickerOptionsS: {
                disabledDate(time){
                    let curDate= new Date().getTime();
                    let curYear=new Date(curDate).getFullYear();
                    let curMonth=new Date(curDate).getMonth()+1,
                        minMonth=curMonth-5,
                        minYear=curYear;
                        if(minMonth<0){
                            minMonth+=12;
                            minYear=curYear-1;
                        }
                    let curDay=new Date(curDate).getDate()+1; 
                    let nextMonth=curMonth+1;               
                    let cur=minYear+"/"+minMonth+"/1";
                    let next=curYear+"/"+nextMonth+"/1";
                    let nextYesterday=new Date(next)-1000*3600*24;
                        cur=new Date(cur).getTime();
                    return time.getTime() > nextYesterday || time.getTime() < cur;
                }
            },
            pickerOptionsE: {
                disabledDate(time) {
                    let curDate = new Date().getTime();
                    let curYear=new Date(curDate).getFullYear();
                    let curMonth=new Date(curDate).getMonth()+1,
                        minMonth=curMonth-5,
                        minYear=curYear;
                        if(minMonth<0){
                            minMonth+=12;
                            minYear=curYear-1;
                        }
                    let curDay=new Date(curDate).getDate()+1; 
                    let nextMonth=curMonth+1;               
                    let cur=minYear+"/"+minMonth+"/1";
                    let next=curYear+"/"+nextMonth+"/1";
                    let nextYesterday=new Date(next)-1000*3600*24;
                        cur=new Date(cur).getTime();
                    return time.getTime() > nextYesterday || time.getTime() < cur;
                }
            },
        };
    },
    created: function() {
        getTimeFunction(this);
    },
    components: {
        "order-details":orderDetails
    },
    methods: {
        search(index) {//查询
            let vm=this, data={};
            vm.searchResult="";       
            vm.currentPage=index||1;
            vm.pa=index||1;
            if(vm.form.searchKind==1){
                if(vm.orderId==''){
                    layer.open({
                        content:"请输入要查询的订单号码",
                        skin: 'msg',
                        time: 2,
                        msgSkin:'error',
                    });
                    return false;
                }
                data={
                    "sysOrderId":trimFunc(vm.orderId),
                     "pageNum": index || 1,
                    "pageSize": 10
                }
            }else if(vm.form.searchKind==2){
                if(vm.openNum==''){
                    layer.open({
                        content:"请输入要查询的产品名称",
                        skin: 'msg',
                        time: 2,
                        msgSkin:'error',
                    });
                    return false;
                }
                data={
                    "openCardPhone":trimFunc(vm.openNum),
                    "pageNum": index || 1,
                    "pageSize": 10
                }
            }else if(vm.form.searchKind==3){
                data={
                    "startTime": new Date(vm.startTime).getTime(),
                    "endTime": new Date(vm.endTime).getTime(),
                    "openCardResult": vm.openRes,
                    "terminalType":vm.openType,
                    "operatorName": trimFunc(vm.operator),
                    "dealerName": trimFunc(vm.dealerName),
                    "pageNum": index || 1,
                    "pageSize": 10,
                }
            } 
            vm.searchJson=data;
            requestOpenCardOrder(data)
            .then((data)=>{
                if(data.code==200){
                    vm.form.page=data.data.total;
                    vm.searchResult=data.data.orders;
                }else{
                    vm.form.page="";vm.searchResult="";
                    errorDeal(data);
                }
            }).catch(e=>errorDeal(e,()=>{vm.form.page="";vm.searchResult="";}))
        },downLoad(){
            let vm=this,
                parameter="",
                url = "/nms/w/openReadyCard/exportOpenCard?",
                userInfo=getStore('YFD_NMS_INFO');
            let json = Object.assign(vm.searchJson,userInfo);
                delete json.pageNum;
                delete json.pageSize;
                console.log(json);
                Object.keys(json).map((key)=>{
                    url+=key+'='+json[key]+'&';    
                })
                url = url.substring(0, url.length-1);
                window.location.href=url;
        },details(v){
            let vm=this;
            vm.off.details=true;
            requestOpenCardDetails({"sysOrderId":v.sysOrderId})
            .then((data)=>{
                vm.productDetails=data.data;
            }).catch(e=>errorDeal(e))
        },
        changeTimeS(e){
            let vm=this,
            timeRange=disableTimeRange6(),
            timeRangeS=timeRange.next,
            timeRangeE=timeRange.nextYesterday,
            timeCheck=new Date(e).getTime();
            if(timeCheck<timeRangeS){
                vm.startTime=timeRangeS;
            }
            if(timeCheck>timeRangeE){
                vm.startTime=timeRangeE;
            }   
            let dt=new Date(e);
            getTimeFunction(this,[dt,1])        
        },changeTimeE(e){
            let vm=this,
            timeRange=disableTimeRange6(),
            timeRangeS=timeRange.next,
            timeRangeE=timeRange.nextYesterday,
            timeCheck=new Date(e).getTime();
            if(timeCheck<timeRangeS){
                vm.endTime=timeRangeS;
            }
            if(timeCheck>timeRangeE){
                vm.endTime=timeRangeE;
            }  
            getTimeFunction(this,[e,2])                      
        },
        getDateTime(e){
            return getDateTime(e)
        },trimFunc(v){
            return trimFunc(v);
        },translateData(v,i){
            return translateData(v,i)
        }
    }
};
</script>
<style>
    @import url('../../assets/css/resetTimePickStyle.css');
    .openCardOrder .input{ text-align: center;height: 26px;width:100px;position: absolute;top: 0;left: 0;border: 1px solid #ccc;outline: none}
    .openCardOrder .button{height: 26px;width: 40px;font: normal 14px/14px "微软雅黑";background: #5daf34;color: #fff;outline: none}
    .openCardOrder .el-date-editor.el-input, .el-date-editor.el-input__inner{width: 150px;}
    .listHeader{display: flex}
    .listHeader label{flex: 1;line-height: 40px}
    .btnDownload{margin-top: 9px;outline:none;border-radius: 4px;background-color: #00AA01;border: 1px solid #00AA01;padding: 4px 10px;margin-right: 10px;color: #fff}
</style>

