<style scoped>
    .listTitleFoot{width: 96%;margin: 10px 18px;}
</style>
<template>
<section>
  <div v-if="off.notDlsDetails">
    <!-- 查询模块 -->
    <div class="dls greyFont">
        <el-row>
            <el-col :span="24"><div class="grid-content bg-purple-dark searchTitleStyle black">搜索条件</div></el-col>
        </el-row>
        <el-row>
            <el-col :span="24"><div class="grid-content bg-purple">
                <el-col :xs="4" :sm="3" :md="3" :lg="2" :xl="2"><div class="grid-content bg-purple-dark textR inputTitle">选择时间：</div></el-col>
                <el-col :xs="20" :sm="14" :md="14" :lg="9" :xl="10">
                    <el-date-picker
                    v-model="startTime"
                    size="small"
                    type="datetime"
                    :clearable=false                                        
                    :editable=false                    
                    :picker-options="pickerOptionsS"
                    @change="changeTimeS"
                    placeholder="选择开始时间">
                    </el-date-picker>
                    <span>——</span>
                    <el-date-picker
                    v-model="endTime"
                    size="small"
                    type="datetime"
                    :clearable=false                                        
                    :editable=false                    
                    :picker-options="pickerOptionsE"
                    @change="changeTimeE"
                    placeholder="选择结束时间">
                    </el-date-picker>
                </el-col>
                <el-col :xs="20" :sm="7" :md="7" :lg="10" :xl="12" style="font-size:18px">
                    ( <el-radio v-model="timeType"  label="2">修改时间</el-radio>
                    <el-radio v-model="timeType"  label="1">创建时间</el-radio> )
                </el-col> 
            </div></el-col>
        </el-row>
        <el-row class="marginTop">
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12"><div class="grid-content bg-purple">
                <el-col :xs="4" :sm="6" :md="6" :lg="4" :xl="4"><div class="grid-content bg-purple-dark textR inputTitle">公司名称：</div></el-col>
                <el-col :xs="20" :sm="12" :md="12" :lg="16" :xl="16">
                     <el-input v-model="cname" :maxlength="30" size="small" placeholder="请输入查询的公司名称"></el-input>
                </el-col>
                <el-col :xs="24" :sm="6" :md="6" :lg="4" :xl="4">
                </el-col> 
            </div></el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12"><div class="grid-content bg-purple-light">
                <el-col :xs="4" :sm="5" :md="5" :lg="4" :xl="4"><div class="grid-content bg-purple-dark textR inputTitle">联系人：</div></el-col>
                <el-col :xs="20" :sm="12" :md="12" :lg="16" :xl="16">
                     <el-input v-model="name"  :maxlength="20" size="small" placeholder="请输入查询的联系人姓名"></el-input>
                </el-col>
                <el-col :xs="24" :sm="7" :md="7" :lg="4" :xl="4">
                   
                </el-col> 
            </div></el-col>
        </el-row>
        <el-row class="marginTop">
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12"><div class="grid-content bg-purple-light">
                <el-col :xs="4" :sm="5" :md="5" :lg="4" :xl="4"><div class="grid-content bg-purple-dark textR inputTitle">当前状态：</div></el-col>
                <el-col :xs="20" :sm="16" :md="12" :lg="16" :xl="16">
                    <el-radio v-model="radio"  label="1,3">全部</el-radio>
                    <el-radio v-model="radio"  label="1">正常</el-radio>
                    <el-radio v-model="radio"  label="3">注销</el-radio>
                    <!-- <el-radio v-model="radio"  label="2">注销</el-radio> -->
                </el-col>
                <el-col :xs="24" :sm="2" :md="7" :lg="4" :xl="4">
                   
                </el-col> 
            </div></el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12"><div class="grid-content bg-purple-light">
                <el-col :xs="4" :sm="5" :md="5" :lg="4" :xl="4"><div class="grid-content bg-purple-dark textR inputTitle">联系人号码：</div></el-col>
                <el-col :xs="20" :sm="12" :md="12" :lg="16" :xl="16">
                     <el-input v-model="phone" :maxlength="11" size="small"  placeholder="请输入联系人号码"></el-input>
                </el-col>
                <el-col :xs="24" :sm="7" :md="7" :lg="4" :xl="4">
                </el-col> 
            </div></el-col>
        </el-row>
        <el-row style="text-align:center" class="marginTop">
            <button  class="searchBtn" @click="search()">搜索</button>
        </el-row>
    </div>  
    
    <!-- 查询结果模块 -->
    <div v-if="searchList">
        <div v-if="searchList.length>0" >
            <div class="listTitleFoot">
                <p class="fs16">代理商列表<span v-if="total"> ({{total}})</span></p>
            </div>
            <div class="detailsListDiv">
                <table class="searchTab" style="width:100%;height:100%;">
                    <tr>
                        <td colspan="8">
                            <el-row>
                                <el-col :span="7" class="tal pl20"><div class="grid-content bg-purple">
                                    <span class="greyFont">最后同步成功时间:</span><span>{{ getDateTime(syncLastTime)[6]||"--" }}</span>
                                </div></el-col>
                                <el-col :span="7" class="tal pl20"><div class="grid-content bg-purple-light">
                                    <span class="greyFont">下次同步成功时间:</span>
                                    <span v-if="syncLastTime==0">--</span>
                                    <span v-if="syncLastTime!=0">{{getDateTime(syncLastTime)[6]}}</span>
                                </div></el-col>
                                <el-col :span="6" class="tal pl20"><div class="grid-content bg-purple">
                                    <span class="greyFont">同步间隔时间:</span><span></span>
                                    <el-button class="small-btn" type="primary" @click="openSet()">设置</el-button>
                                </div></el-col>
                                <el-col :span="4" class="tar"><div class="grid-content bg-purple-light">
                                    <el-button class="small-btn" type="success" @click="sync()">手动同步</el-button>
                                </div></el-col>
                            </el-row>
                        </td>
                    </tr>
                    <tr>
                        <td>序号</td>
                        <td>修改时间</td>
                        <td>公司名称</td>
                        <td>联系人</td>
                        <td>手机号码</td>
                        <td>部门状态</td>
                        <td>创建时间</td>
                        <td>员工详情</td>
                    </tr>
                    <tr v-for="(v,i) of searchList" :key="i" :class="{'greyFont':v.departState==3}">
                        <td >
                        {{((pa-1)*15+(i+1))}}
                        </td>
                        <td >
                        {{new Date(v.modifyTime).toLocaleString()}}
                        </td>
                        <td >
                        {{v.departName}}
                        </td>
                        <td >
                        {{v.managerName}}
                        </td>
                        <td >
                        {{v.phone}}
                        </td>
                        <td >
                        <span v-if="v.departState==1">
                                正常
                        </span>
                        <span v-if="v.departState==3">
                                黑名单
                        </span>
                        </td>
                        <td >
                        {{new Date(v.createTime).toLocaleString()}}
                        </td>
                        <td >
                        <a class="textDec" href="javascript:void(0)" @click="getDetails(v)">查看详情</a>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="listTitleFoot">
                <el-row>
                    <el-col :span="12"><div class="grid-content bg-purple">
                        <el-pagination
                        layout="prev, pager, next"
                        :page-size="15"
                        @current-change="search"
                        :current-page.sync="currentPage"                        
                        :total="form.page">
                        </el-pagination>
                    </div></el-col>
                    <el-col :span="12">
                        <!-- <div class="grid-content bg-purple-light fr">操作:<el-button size="mini" @click="doFunction('offLine')">强制离线</el-button><el-button size="mini" @click="doFunction('addBlack')">加入黑名单</el-button><el-button size="mini" @click="doFunction('cancelBlack')">解除黑名单</el-button><el-button size="mini" @click="doFunction('delete')">删除</el-button></div> -->
                    </el-col>
                </el-row>
            </div>
        </div> 
        <div v-if="searchList.length==0" class="searchResultInfoNone">
          查询结果为空!
        </div> 
    </div>
    
    </div>
    <!-- 弹框组件 -->
    <common-layer v-if="off.layer"></common-layer>
    <!-- 查看员工详情组件 -->
    <dls-Details v-if="off.dlsDetails" :lists="detailsList"></dls-Details>   
</section>
</template>
<script>
const options={text:'正在加载'}
import { Loading } from 'element-ui';
import { getDateTime,getUnixTime,errorDeal,disableTimeRange6 } from "../../config/utils";
import {requestMethod,requestMethod2,requestgetSyncTime} from "../../config/service.js"; 
import search from "../../../components/search";
import layers from "../../../components/layer";
import dlsDetails from "../../../components/dlsDetails";
export default{
    name:'dls',
    data (){
        return {
            syncLastTime:'',//最后一次同步成功时间
            currentPage:0,//当前页
            hesdUserName:"",
            headPhone:"",
            total:"",
            startTime: "",
            endTime: "",
            cname: "",
            phone: "",
            name: "",
            radio: "1,3",
            timeType:"1",
            detailsList:[],
            pa:1,
            companyName:"",//..
            managerName:"",//..
            managerPhone:"",//..
            searchDetailsType:"",//查看员工详情
            off:{
                dlsList:false,
                layer:false,
                dlsDetails:false,
                notDlsDetails:true
            },
            form:{
                page:0
            }
            ,searchList:''
            ,details:{},
            pickerOptionsS: {
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
        "common-search":search,
        "common-layer":layers,
        "dls-Details":dlsDetails
    },
    created:function(){
        let vm=this;
        let curDate = (new Date()).getTime();
        let curMonth=new Date(curDate).getMonth()+1;
        let curYear=new Date(curDate).getFullYear();
        let curDay=new Date(curDate).getDate()+1;
        let cur=curYear+"/"+curMonth+"/1";
        let Next=curYear+"/"+curMonth+"/"+curDay;
        vm.startTime=new Date(cur).getTime();
        vm.endTime=new Date(Next).getTime()-1000;
    },
    methods:{
        openSet(){//设置
            let vm=this;
            vm.off.layer=true;
            vm.off.setSync=true;
            vm.off.sync=false;
        },
        sync(){//手动同步
            let vm=this;
            vm.off.layer=true;
            vm.off.setSync=false;
            vm.off.sync=true;
        },search(p){//查询
            let vm=this,
            sy=new Date(vm.startTime).getFullYear(),
            sm=new Date(vm.startTime).getMonth(),
            ey=new Date(vm.endTime).getFullYear(),
            em=new Date(vm.endTime).getMonth();
            if(sy!=ey||sm!=em){
                layer.open({
                    content:'开始和结束日期不能跨月',
                    skin: 'msg',
                    time: 2,
                    msgSkin:'error',
                });
                return false;
            }
            if(new Date(vm.startTime).getTime()>new Date(vm.endTime).getTime()){
                layer.open({
                    content:'开始时间必须小于结束时间',
                    skin: 'msg',
                    time: 2,
                    msgSkin:'error',
                });
                return false;
            }
            let load=Loading.service(options),data={},url='/ums/w/user/departSearch';
            vm.pa=p||1;
            vm.currentPage=p||1;
            data={
                "startTime":new Date(vm.startTime).getTime()||''
                ,"endTime":new Date(vm.endTime).getTime()||''
                ,"searchType":vm.timeType
                ,"departName":vm.cname
                ,"managerName":vm.name
                ,"departState":vm.radio
                ,"phone":vm.phone
                ,"pageSize":15
                ,"pageNum":p||1}
                this.getSyncTime();
            requestMethod(data,url)
            .then((data)=>{
                load.close()
                if(data.code==200){
                    vm.total=data.data.total;//查询总数
                    vm.searchList=data.data.departs;//查询内容
                    vm.form.page=data.data.total
                }else{
                    errorDeal(data);
                }
            }).then(()=>{

            }).catch(e=>errorDeal(e));
        }
        ,getDetails(v){//查看详情
            let vm=this,data={},url='/ums/w/user/getDepartDetail',load=Loading.service(options);
            vm.searchDetailsType=1;
            vm.searchDepartId=v.departId;
            data={'searchDepartId':v.departId,userState:"1,2",username:"",phone:"",pageNum:"1",pageSize:"10"};
            vm.companyName=v.departName;
            vm.managerName=v.managerName;
            vm.managerPhone=v.phone;
            requestMethod(data,url)
            .then((data)=>{
                load.close();
                if(data.code==200){
                    if(data.data.users.length>0){
                        vm.off.notDlsDetails=false;
                        vm.off.dlsDetails=true;
                        vm.detailsList=data.data.users;
                        vm.headUserName=data.data.users[0].username;
                        vm.headPhone=data.data.users[0].phone;
                    }else{
                        vm.off.notDlsDetails=false;
                        vm.off.dlsDetails=true;
                        vm.detailsList=[];
                        vm.detailsList.username='';
                        vm.detailsList.phone='';
                    }
                }else{
                    errorDeal(data);
                }
            }).catch(e=>errorDeal(e));
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
        },
        getSyncTime(){
            let vm=this;
           let data={recordType:3};
           requestgetSyncTime(data)
            .then((data)=>{
                if(data.code==200){
                    vm.syncLastTime=data.data.syncLastTime
                }else{
                    errorDeal(data)
                }
            }).catch(e=>errorDeal(e)); 
        },
        getDateTime:function(v){
            return getDateTime(v);
        }
    }
}
</script>

