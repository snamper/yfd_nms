<template>
    <section ref="sec">
        <div class="dls greyFont">
            <el-row>
                <el-col :span="24"><div class="grid-content bg-purple-dark searchTitleStyle black">搜索条件</div></el-col>
            </el-row>
            <el-row>
                <el-col :span="24"><div class="grid-content bg-purple">
                    <el-col :xs="4" :sm="3" :md="3" :lg="2" :xl="2"><div class="grid-content bg-purple-dark textR inputTitle">选择时间：</div></el-col>
                    <el-col :xs="18" :sm="18" :md="20" :lg="18" :xl="18">
                        <div class="displayInline">
                            <el-date-picker
                            v-model="startTime"
                            size="small"
                            type="datetime"
                            :clearable=false                                        
                            :editable=false                    
                            :picker-options="pickerOptionsS"
                            placeholder="选择开始时间">
                            </el-date-picker><el-date-picker
                            v-model="endTime"
                            size="small"
                            type="datetime"
                            :clearable=false                                        
                            :editable=false                    
                            :picker-options="pickerOptionsE"
                            placeholder="选择结束时间">
                            </el-date-picker>
                        </div>
                    </el-col>
                </div></el-col>
            </el-row>
            <el-row>
                <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12"><div class="grid-content bg-purple-light">
                    <el-col :xs="4" :sm="3" :md="3" :lg="4" :xl="4"><div class="grid-content bg-purple-dark textR inputTitle">订单号码：</div></el-col>
                    <el-col :xs="19" :sm="19" :md="19" :lg="18" :xl="18">
                        <el-input v-model="orderId" size="small"  placeholder="请输入查询的订单号码" :maxlength="30"></el-input>
                    </el-col>
                </div></el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12"><div class="grid-content bg-purple-light">
                    <el-col :xs="4" :sm="3" :md="3" :lg="4" :xl="4"><div class="grid-content bg-purple-dark textR inputTitle">充值号码：</div></el-col>
                    <el-col :xs="19" :sm="19" :md="19" :lg="18" :xl="18">
                        <el-input v-model="phone" size="small"  placeholder="请输入查询的充值号码" :maxlength="11"></el-input>
                    </el-col>
                </div></el-col>
            </el-row>
            <el-row>
                <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12"><div class="grid-content bg-purple-light">
                    <el-col :xs="4" :sm="3" :md="3" :lg="4" :xl="4"><div class="grid-content bg-purple-dark textR inputTitle">操作人姓名：</div></el-col>
                    <el-col :xs="19" :sm="19" :md="19" :lg="18" :xl="18">
                        <el-input v-model="opName" size="small"  placeholder="请输入查询的操作人姓名" :maxlength="11"></el-input>
                    </el-col>
                </div></el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12"><div class="grid-content bg-purple-light">
                    <div class="grid-content bg-purple-light">
                        <el-col :xs="5" :sm="3" :md="6" :lg="4" :xl="4"><div class="grid-content bg-purple-dark textR inputTitle">充值状态：</div></el-col>
                        <el-col :xs="16" :sm="16" :md="14" :lg="16" :xl="16">
                            <el-radio v-model="orderState"  label="1,2,3" >全部</el-radio>
                            <el-radio v-model="orderState"  label="1" >成功</el-radio>
                            <el-radio v-model="orderState"  label="2" >支付中</el-radio>
                            <el-radio v-model="orderState"  label="3" >失败</el-radio>
                        </el-col>
                        <el-col :xs="1" :sm="1" :md="4" :lg="4" :xl="4"></el-col> 
                    </div>
                </div></el-col>
            </el-row>
            <el-row style="text-align:center" class="marginTop">
                <button class="searchBtn" @click="search()">搜索</button>
            </el-row>
        </div> 
        <!-- 查询结果列表 -->
        <div v-if="searchList">
            <div>       
                <div class="listTitleFoot">
                    <el-row>
                        <p><h3>订单列表<span class="fontWeight greyFont">({{total||'0'}})</span></h3></p>                    
                    </el-row>        
                </div>
                <div class="detailsListDiv">
                    <table class="searchTab" style="width:100%;height:100%;">
                        <tr>
                            <td>序号</td>
                            <td>订单号码</td>
                            <td>操作时间</td>
                            <td>充值号码</td>
                            <td>操作人</td>
                            <td>公司名称</td>
                            <td>充值金额（元）</td>
                            <td>操作结果</td>
                        </tr>
                        <tr v-for="(v,i) in searchList" :key="i">
                            <td>{{((currentPage-1)*15+(i+1))}}</td>
                            <td>{{v.sysOrderId||"--"}}</td>
                            <td>{{getDateTime(v.createTime)[6]||"--"}}</td>
                            <td>{{v.phone||"--"}}</td>
                            <td>{{v.userName||"--"}}</br>({{v.userId||'--'}})</td>
                            <td>{{v.departName||"--"}}</td>
                            <td>{{v.faceValue/100}}</td>
                            <td>
                                <span :class="v.state==1?'fcgreen':v.state==2?'fcaqua':v.state==3?'fcred':'--'">{{translate(2,v.state)}}</span>
                            </td>
                        </tr>
                    </table>
                </div>       
            </div>
        </div>  
        <div class="listTitleFoot" v-if="searchList">
            <el-row>
                <el-col :span="12"><div class="grid-content bg-purple">
                    <el-pagination
                    layout="prev, pager, next"
                    :page-size="15"
                    @current-change="search"
                    :current-page.sync="currentPage"                        
                    :total="total">
                    </el-pagination>
                </div></el-col>
                <el-col :span="12">
                </el-col>
            </el-row>
        </div>
    </section>
</template>
<script>
import { getTimeFunction, errorDeal, translateData, getDateTime } from "../../config/utils";
import { getRechargeOrders } from "../../config/service.js";
export default{
	data(){
		return{
            searchList:false
            ,total:0
            ,orderState:"1,2,3"
            ,orderId:""
            ,phone:""
            ,startTime:""
            ,endTime:""
            ,total:""
            ,currentPage:"",
            opName:"",
            pickerOptionsS: {
                disabledDate(time) {
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
        }
    },
	components:{
       
    },
    created:function(){
        getTimeFunction(this);
    },
	methods:{
        search(p){
            let vm=this,
            data={
                "pageSize": 15,
                "pageNum": p||1,
                "sysOrderId":vm.orderId,
                "startTime":new Date(vm.startTime).getTime(),
                "endTime":new Date(vm.endTime).getTime(),
                "state":vm.orderState,
                "rechargePhone":vm.phone,
                "userName":vm.opName
            };
            getRechargeOrders(data)
            .then((data)=>{
                vm.searchList=data.data.list;
                vm.total=data.data.total;
                vm.currentPage=p||1;
            }).catch(e=>errorDeal(e))
        },translateData(v,i){
            return translateData(v,i)
        },translate(type,v){
            switch(type){
                case 1:
                    return v==1?"支付宝":v==2?"微信":v==3?"账户":v==4?"线下支付":v==5?"支付宝第三方":v==6?"微信第三方":"--";
                    break;
                case 2:
                    return v==1?"成功":v==2?"支付中":v==3?"失败":"--";
                    break;
                case 3:
                    return v==1?"IOS":v==2?"Android":v==3?"WEB":"--";
                    break;
            }
        },getDateTime(v){
            return getDateTime(v)
        }
    }
}
</script>
<style scoped>
    .displayInline .el-date-editor.el-input, .el-date-editor.el-input__inner{width: 182px;}
    .displayInline .el-date-editor:nth-child(1) .el-input__inner{border-radius: 4px 0 0 4px}
    .displayInline .el-date-editor:nth-child(2) .el-input__inner{border-radius: 0 4px 4px 0}
</style>

