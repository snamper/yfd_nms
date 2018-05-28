<style>
.el-input--suffix .el-input__inner{padding-right: 10px!important;}
.tac div input{border: 0 none;}
.box{width: 140px;height: 26px;background-color: #808000;clear: both;}
.box span{float: left;display: inline-block;height: 26px;}
.span1{width: 100px;position: relative;background: red}
.span2{width: 40px;position: relative;background: green}
.input{ text-align: center;height: 26px;width:100px;position: absolute;top: 0;left: 0;border: 1px solid #ccc;outline: none}
.button{height: 26px;width: 40px;font: normal 14px/14px "微软雅黑";background: #5daf34;color: #fff;outline: none}
</style>
<template>
    <section >
        <div v-if="!off.details">
            <div class="dls greyFont">
                <el-row>
                    <el-col :span="24"><div class="grid-content bg-purple-dark searchTitleStyle blackFont">搜索条件</div></el-col>
                </el-row>
                <el-row>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <div class="grid-content bg-purple-light">
                            <el-col :xs="4" :sm="6" :md="4" :lg="4" :xl="4" class="m-form-radio f-tar">
                                <label><span class="radioYes"><input  type="radio" value="1" v-model="form.searchKind" checked="checked"><span></span></span><span class="text greyFont">订单号码：</span></label>                            
                            </el-col>
                            <el-col :xs="20" :sm="12" :md="12" :lg="16" :xl="16">
                                <el-input v-model="orderId" size="small" maxlength=25 placeholder="请输入查询的订单号码"></el-input>
                            </el-col>
                            <el-col :span="2"></el-col> 
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col ors:xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <div class="grid-content bg-purple-light">
                            <el-col :xs="4" :sm="6" :md="4" :lg="4" :xl="4" class="m-form-radio f-tar">
                                <label><span class="radioYes"><input  type="radio" value="2" v-model="form.searchKind" checked="checked"><span></span></span><span class="text greyFont">产品名称：</span></label>                            
                            </el-col>
                            <el-col :xs="20" :sm="12" :md="12" :lg="16" :xl="16">
                                <el-input v-model="pname" size="small" maxlength=10 placeholder="请输入查询的产品名称"></el-input>
                            </el-col>
                            <el-col :span="2"></el-col> 
                        </div>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="f-s-16"> 
                        (
                        <el-checkbox-group v-model="cardType" class="displayInline">
                            <el-checkbox label="1">整号段</el-checkbox>
                            <el-checkbox label="2">靓号包</el-checkbox>
                            <el-checkbox label="3">普号包</el-checkbox>
                        </el-checkbox-group>
                        )
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                        <el-col :xs="4" :sm="3" :md="4" :lg="4" :xl="4" class="m-form-radio f-tar">
                            <label><span class="radioYes"><input type="radio" value="3" v-model="form.searchKind" checked="checked"><span></span></span><span class="text greyFont">操作时间：</span></label>                            
                        </el-col>
                        <el-col :xs="18" :sm="20" :md="10" :lg="12" :xl="12">
                            <div class="block">
                                <el-date-picker
                                v-model="startTime"
                                size="mini"
                                type="datetime"
                                :clearable=false                                        
                                :editable=false                    
                                :picker-options="pickerOptionsS"
                                @change="changeTimeS"
                                style="width:170px;"
                                placeholder="选择开始时间">
                                </el-date-picker>—<el-date-picker
                                v-model="endTime"
                                size="mini"
                                type="datetime"
                                :clearable=false                                        
                                :editable=false                    
                                :picker-options="pickerOptionsE"
                                @change="changeTimeE"
                                style="width:170px;"                            
                                placeholder="选择结束时间">
                                </el-date-picker>
                            </div>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" class="f-s-16">
                            ( <el-radio v-model="timeType"  label="1">修改时间</el-radio>
                            <el-radio v-model="timeType"  label="2">创建时间</el-radio> )
                        </el-col>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                        <el-col :xs="4" :sm="3" :md="6" :lg="4" :xl="4"><div class="grid-content bg-purple-dark textR inputTitle">商户名称：</div></el-col>
                        <el-col :xs="20" :sm="12" :md="12" :lg="16" :xl="16">
                            <el-input v-model="dealerName" size="small" maxlength=20 placeholder="请输入查询的商户名称"></el-input>
                        </el-col>
                        <el-col :span="2"></el-col> 
                    </el-col>
                </el-row>
                <el-row>
                    <el-col ors:xs="24" :sm="24" :md="12" :lg="12" :xl="12"><div class="grid-content bg-purple-light">
                        <el-col :xs="4" :sm="3" :md="6" :lg="4" :xl="4"><div class="grid-content bg-purple-dark textR inputTitle">当前状态：</div></el-col>
                        <el-col :xs="20" :sm="12" :md="12" :lg="16" :xl="16">
                            <el-radio v-model="orderState"  label="0">全部</el-radio> 
                            <el-radio v-model="orderState"  label="1">未发货</el-radio>
                            <el-radio v-model="orderState"  label="2">已发货</el-radio>
                            <el-radio v-model="orderState"  label="3">已完成</el-radio>
                        </el-col>
                    </div></el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                        <el-col :xs="4" :sm="3" :md="6" :lg="4" :xl="4"><div class="grid-content bg-purple-dark textR inputTitle">操作人：</div></el-col>
                        <el-col :xs="20" :sm="12" :md="12" :lg="16" :xl="16">
                            <el-input v-model="operator" size="small" maxlength=20 placeholder="请输入查询的操作人姓名"></el-input>
                        </el-col>
                        <el-col :span="2"></el-col> 
                    </el-col>
                </el-row>
                <el-row>
                    <el-col ors:xs="24" :sm="24" :md="12" :lg="12" :xl="12"><div class="grid-content bg-purple-light">
                        <el-col :xs="4" :sm="3" :md="6" :lg="4" :xl="4"><div class="grid-content bg-purple-dark textR inputTitle">支付方式：</div></el-col>
                        <el-col :xs="20" :sm="12" :md="12" :lg="16" :xl="16">
                            <el-radio v-model="payMent"  label="0">全部</el-radio>
                            <el-radio v-model="payMent"  label="2">微信支付</el-radio>
                            <el-radio v-model="payMent"  label="1">支付宝支付</el-radio>
                            <el-radio v-model="payMent"  label="4">线下支付</el-radio>
                        </el-col>
                    </div></el-col>
                </el-row>
                <el-row style="text-align:center" class="marginTop">
                    <button class="searchBtn" @click="search()">搜索</button>
                </el-row>
            </div>
            <div v-if="searchResult">
                <div>
                    <div class="listTitleFoot"><h3>订单列表<span class="fontWeight greyFont">({{form.page||'0'}})</span></h3></div>
                    <div class="detailsListDiv">
                        <table class="searchTab" style="width:100%;height:100%;">
                            <tr class="f-s-14">
                                <td>序号</td>
                                <td>创建时间</td>
                                <td>订单号码</td>
                                <td>商户名称</td>
                                <td>产品包</td>
                                <td>付款金额(元)</td>
                                <td>操作人</td>
                                <td>修改时间</td>
                                <td>物流状态</td>
                                <td>物流单号</td>
                                <td>操作</td>
                            </tr>
                            <tr v-for="(v,i) of searchResult" :key="i">
                                <td>
                                    {{((pa-1)*15+(i+1))}}
                                </td>
                                <td >
                                    {{v.createTime}}
                                </td>
                                <td  @click="details(v)"><a href="javascript:void(0)">{{v.sysOrderId||'--'}}</a> </td>
                                <td>{{v.depName||'--'}}</td>
                                <td>
                                    <span v-for="(x,y) in v.productList" :key="y">
                                        {{x.productName}}<br>
                                    </span>
                                </td>
                                <td>{{v.totalStrikePrice/100+'.00'||'--'}}</td>
                                <!-- <td class="tac" style="width:140px">
                                    <div v-if="!off.changePrice[i+1]">
                                        <span>{{searchResult[i].totalStrikePrice/100+'.00'||'--'}}</span>
                                        <el-button class="small-btn" @click="changePrice(i)">修改</el-button>                                     
                                    </div>
                                    <div class="box" v-if="off.changePrice[i+1]">
                                        <span class="span1">
                                            <input type="text" class="input" v-model="searchResult[i].totalStrikePrice">
                                        </span>
                                        <span class="span2">
                                            <input type="button" value="确定"   class="button" @click="changePriceYes(searchResult[i].totalStrikePrice,i)">
                                        </span>
                                    </div>
                                </td> -->
                                <td>{{v.operatorPhone||'--'}}</td>
                                <td >
                                    <span v-if="v.modifyTime">
                                        {{v.modifyTime}}
                                    </span>
                                    <span v-if="!v.modifyTime">
                                        --
                                    </span>
                                </td>
                                <td >
                                    <!-- {{v.deliveryState||'--'}} -->
                                    <span v-if="v.deliveryState==2&&v.paymentState==2">已发货</span>
                                    <span v-if="v.deliveryState==3&&v.paymentState==2">已收货</span>
                                    <span v-if="v.deliveryState==1&&v.paymentState==2">待发货</span>
                                    <span v-if="v.paymentState==1" class="c-red">未付款</span>
                                </td>
                                <td>
                                    <a @click="searchdelivery(v.deliveryName,v.deliveryOrderId)" href="javascript:void(0)">{{v.deliveryOrderId||'--'}}</a> 
                                </td>
                                <td>
                                    <el-button v-if="v.deliveryState==1&&v.paymentState==2" class="small-btn" style="margin:5px;" @click="deliverGoods(v)">发货</el-button>
                                    <el-button v-if="v.deliveryState==2&&v.paymentState==2" class="small-btn" style="margin:5px;" @click="changeLogisticsInfo(v)">修改单号</el-button>
                                    <el-button v-if="v.deliveryState==2&&v.paymentState==2" class="small-btn" style="margin:5px;" @click="confirm(v)">确认收货</el-button>
                                    <el-button v-if="v.deliveryState==1&&v.paymentState==1" class="small-btn" style="margin:5px;" @click="confirmPayMoney(v)">确认付款</el-button>

                                </td>
                            </tr>
                            <tr v-if="searchResult.length<=0">
                                <td colspan="8">
                                    暂无数据                                                        
                                </td>
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
                                        :total="form.page/10">
                                    </el-pagination>    
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </div>
        </div>
        <order-details v-if="off.details" :detailsData="productDetails"></order-details> 
        <layer-confirm v-if="off.layer" :layerType="layerType" :logisticsInfo="logistics"></layer-confirm>   
  	</section>
</template>
<script>
import { disableTimeRange6,getTimeFunction,errorDeal,getDateTime } from "../../config/utils";
import { disabledDate }from "../../config/utilsTimeSelect";
import {requestProductDetails,requestPickupOrder,requestChangeLogisticsId,requestConfirmTakeGoods} from "../../config/service.js";
import { Loading } from "element-ui";
import orderDetails from "./orderDetails";
import layerConfirm from "../../components/layerConfirm";
export default {
    data() {
        return {
            searchResult:"",
            layerType:'',//弹窗类型
            logistics:{},//物流信息
            productDetails:{},//产品包详情
            pa: 1,//页码
            operatorName: "",//操作人            
            orderId: "",//订单号码
            pname: "",//产品名称
            dealerName:"",//商户名称            
            operator: "",//操作人
            optime:'',//操作时间
            startTime:'',
            endTime:'',
            timeType: "1",
            orderState: "0",//操作类型
            cardType:['1','2','3'],//产品类型
            payMent:"0",
            off: {
                details:false,
                layer:false,
            },
            form: {
                page: 0,
                searchKind:'1',
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
        getTimeFunction(this)

    },
    components: {
        "order-details":orderDetails,
        "layer-confirm":layerConfirm,
    },
    methods: {
        search(index) {//查询
            let vm=this,data={};
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
            }else if(vm.form.searchKind==2){
                if(vm.pname==''){
                    layer.open({
                        content:"请输入要查询的产品名称",
                        skin: 'msg',
                        time: 2,
                        msgSkin:'error',
                    });
                    return false;
                }
            }
            let load=Loading.service(options);
            data={
                "searchType": vm.form.searchKind,
                "sysOrderId": vm.orderId,
                "productName":vm.pname,
                "productType": vm.cardType.join(","),
                "timeType": vm.timeType,
                "startTime": new Date(vm.startTime).getTime(),
                "endTime": new Date(vm.endTime).getTime(),
                "orderState": vm.orderState,
                "depName": vm.dealerName,
                "operatorName":vm.operator,
                "paymentType":vm.payMent,
                "pageNum": index || 1,
                "pageSize": 10,
            }
            requestPickupOrder(data,function(){load.close()})
            .then((data)=>{
                vm.form.page=data.data.total;
                vm.searchResult=data.data.list;
            }).catch(e=>errorDeal(e))
        },
        details(v){
            let vm=this;
            vm.off.details=true;
            vm.productDetails=v;  
            console.log(vm.productDetails);
        },
        confirm(v){
            let vm=this,data={};
            vm.layerType="takeGoods";
            vm.logistics=v;
            vm.off.layer=true;
        },
        deliverGoods(v){
            let vm=this;
            vm.layerType="sendGoods";
            vm.logistics=v;            
            vm.off.layer=true;
        },
        changeLogisticsInfo(v){
            let vm=this;
            vm.layerType="logistics";
            vm.logistics=v;
            vm.off.layer=true;
        },
        confirmPayMoney(v){
            let vm=this;
            vm.layerType="payMent";
            vm.logistics=v;
            vm.off.layer=true;
        },
        searchdelivery(n,v){
            let url="https://www.kuaidi100.com/chaxun?com="+n+"&nu="+v;
            window.open(url)
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
        },getDateTime(e){
            return getDateTime(e)
        }
    }
};
</script>

