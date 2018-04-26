<style>
@import "../../assets/css/search.css";
div.listTitleFoot{width: 96%;height: 28px;margin: 10px 18px;}
div.detailsListDiv tr td{text-align: center;}
</style>
<template>
  <section >
        <div class="dls greyFont">
            <el-row>
                <el-col :span="24"><div class="grid-content bg-purple-dark searchTitleStyle blackFont">搜索条件</div></el-col>
            </el-row>
            <el-row style="height:40px;line-height:40px" >
                <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12"><div class="grid-content bg-purple">
                    <el-col :xs="4" :sm="6" :md="6" :lg="4" :xl="4"><div class="grid-content bg-purple-dark textR inputTitle">操作时间：</div></el-col>
                    <el-col :xs="20" :sm="12" :md="12" :lg="16" :xl="16">
                        <el-date-picker
                        v-model="startTime"
                        size="small"
                        type="datetime"
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
                        :editable=false                    
                        :picker-options="pickerOptionsE"  
                        @change="changeTimeE"                                      
                        placeholder="选择结束时间">
                        </el-date-picker>
                    </el-col>
                    <el-col :span="2"></el-col> 
                </div></el-col>
                <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12"><div class="grid-content bg-purple-light">
                    <el-col :xs="4" :sm="6" :md="6" :lg="4" :xl="4"><div class="grid-content bg-purple-dark textR inputTitle">操作人姓名：</div></el-col>
                    <el-col :xs="20" :sm="12" :md="12" :lg="16" :xl="16">
                        <el-input v-model="operatorName" size="small" :maxlength="6" placeholder="请输入查询的联系人姓名"></el-input>
                    </el-col>
                    <el-col :span="2">
                    
                    </el-col> 
                </div></el-col>
            </el-row>
            <el-row class="marginTop">
                <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12"><div class="grid-content bg-purple-light">
                    <el-col :xs="4" :sm="6" :md="6" :lg="4" :xl="4"><div class="grid-content bg-purple-dark textR inputTitle">操作类型：</div></el-col>
                    <el-col :xs="20" :sm="12" :md="12" :lg="16" :xl="16">
                        <el-radio v-model="syncType"  label="0">全部</el-radio>
                        <el-radio v-model="syncType"  label="1">手动同步</el-radio>
                        <el-radio v-model="syncType"  label="2">自动同步</el-radio>
                    </el-col>
                    <el-col :span="2">
                    
                    </el-col> 
                </div></el-col>
                <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12"><div class="grid-content bg-purple-light">
                    <el-col :xs="4" :sm="6" :md="6" :lg="4" :xl="4"><div class="grid-content bg-purple-dark textR inputTitle">手机号码：</div></el-col>
                    <el-col :xs="20" :sm="12" :md="12" :lg="16" :xl="16">
                        <el-input v-model="operatorPhone" :maxlength="11" size="small" placeholder="请输入查询的手机号码"></el-input>
                    </el-col>
                    <el-col :span="2">
                    
                    </el-col> 
                </div></el-col>
            </el-row>
            <el-row class="marginTop">
                <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12"><div class="grid-content bg-purple-light">
                    <el-col :xs="4" :sm="6" :md="6" :lg="4" :xl="4"><div class="grid-content bg-purple-dark textR inputTitle">同步内容：</div></el-col>
                    <el-col :xs="20" :sm="12" :md="12" :lg="16" :xl="16">
                        <el-radio v-model="recordType"  label="0">全部</el-radio>
                        <el-radio v-model="recordType"  label="3">码号</el-radio>
                        <el-radio v-model="recordType"  label="4">框架</el-radio>
                    </el-col>
                    <el-col :span="2">
                    
                    </el-col> 
                </div></el-col>
                <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12"><div class="grid-content bg-purple-light">
                    <el-col :xs="4" :sm="6" :md="6" :lg="4" :xl="4"><div class="grid-content bg-purple-dark textR inputTitle">操作结果：</div></el-col>
                    <el-col :xs="20" :sm="12" :md="12" :lg="16" :xl="16">
                        <el-radio v-model="recordResult"  label="0">全部</el-radio>
                        <el-radio v-model="recordResult"  label="1">成功</el-radio>
                        <el-radio v-model="recordResult"  label="2">失败</el-radio>
                    </el-col>
                    <el-col :span="2">
                    
                    </el-col> 
                </div></el-col>
            </el-row>
            <el-row style="text-align:center" class="marginTop">
                <button  class="searchBtn" @click="search()">搜索</button>
            </el-row>
        </div>
        <div class="listTitleFoot"><span>日志列表</span><el-button class="fr" type="success" size="small">导出数据</el-button></div>
        <div class="detailsListDiv">
            <table class="searchTab" style="width:100%;height:100%;">
                <tr>
                    <td>序号</td>
                    <td>号包名称</td>
                    <td>操作时间</td>
                    <td>操作人</td>
                    <td>手机号码</td>
                    <td>操作类型</td>
                    <td>操作结果</td>
                    <td>操作</td>
                </tr>
                <tr v-for="(v,i) of ix" :key="i">
                    <td>
                    </td>
                    <td>
                    </td><td>
                    </td><td>
                    </td><td>
                    </td><td>
                    </td><td>
                    </td>
                    <td>
                        <a href="javascript:void(0)" @click="openDetails()">查看详情</a>
                    </td>
                </tr>
            </table>
        </div>
        <div class="listTitleFoot">
            <el-row>
                <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12"><div class="grid-content bg-purple">
                    <el-pagination
                        layout="prev, pager, next"
                        :page-size="10"
                        @current-change="search"
                        :total="form.page">
                    </el-pagination>    
                </div></el-col>
            </el-row>
        </div>
        <log-details v-if="off.logDet"></log-details>
  	</section>
</template>
<script>
import { getDateTime,disableTimeRange6} from "../../config/utils";
import logDet from "../../../components/logDetails";
import {requestSyncSearch} from "../../config/service";
import { errorDeal } from '../../../../kameng_ecs_merge/ka_ecs/src/config/utils';
export default {
    data() {
    return {
        pa:1,
        startTime: "",
        endTime: "",
        operatorPhone:"",
        syncType:"0",
        recordType:"0",
        recordResult:"0",
        ix:[{color:'red',age:18,sex:'girl'},{color:'red',age:18,sex:'girl'},{color:'red',age:18,sex:'girl'},{color:'red',age:18,sex:'girl'}],                  
        off: {
            showSearch: "",
            logDet:false
        },
        form:{
            page:1
        },
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
    };
},
  created: function() {
    let vm = this;
    vm.off.showSearch = vm.$route.name;
    let curDate = (new Date()).getTime();
    let curMonth=new Date(curDate).getMonth()+1;
    let curYear=new Date(curDate).getFullYear();
    let curDay=new Date(curDate).getDate()+1;
    let cur=curYear+"/"+curMonth+"/1";
    let Next=curYear+"/"+curMonth+"/"+curDay;
    vm.startTime=new Date(cur).getTime();
    vm.endTime=new Date(Next).getTime()-1000;
  },
  beforeDestroy: function() {},
  mounted: function() {},
  computed: {

  },
  components: {
      "log-details":logDet
  },
  methods: {
    search() {
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
        let json={"startOperateTime": new Date(vm.startTime).getTime(),
            "endOperateTime": new Date(vm.endTime).getTime(),
            "operatorName": vm.operatorName,
            "operatorPhone":vm.operatorPhone,
            "pageNum": vm.pageNum,
            "pageSize": vm.pageSize,
            "syncType": vm.syncType,
            "recordType": vm.recordType,
            "recordResult": vm.recordResult,}
        requestSyncSearch(json)
        .then((data)=>{
            if(data.code==200){
                vm.form.page=data.data.total
            }else{
                errorDeal(data)
            }
        }).catch(e=>errorDeal(e))
    },
    openDetails(){
        let vm=this;
        vm.off.logDet=true;
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
    }
  }
};
</script>

