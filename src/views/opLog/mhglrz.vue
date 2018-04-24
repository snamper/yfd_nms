<style>
@import "../../assets/css/search.css";
div.listTitleFoot {
  width: 96%;
  height: 28px;
  margin: 10px 18px;
}
div.detailsListDiv tr td {
  text-align: center;
}
</style>
<template>
  <section >
      <div class="dls greyFont">
        <el-row>
            <el-col :span="24"><div class="grid-content bg-purple-dark searchTitleStyle blackFont">搜索条件</div></el-col>
        </el-row>
        <el-row>
             <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12"><div class="grid-content bg-purple-light">
                <el-col :xs="4" :sm="6" :md="6" :lg="4" :xl="4"><div class="grid-content bg-purple-dark textR inputTitle">号包名称：</div></el-col>
                <el-col :xs="20" :sm="12" :md="12" :lg="16" :xl="16">
                     <el-input v-model="packageName" size="small" maxlength=20 placeholder="请输入查询的号包名称"></el-input>
                </el-col>
                <el-col :span="2">
                   
                </el-col> 
            </div></el-col>
            <el-col ors:xs="24" :sm="12" :md="12" :lg="12" :xl="12"><div class="grid-content bg-purple">
                <el-col :xs="4" :sm="6" :md="6" :lg="4" :xl="4"><div class="grid-content bg-purple-dark textR inputTitle">操作时间：</div></el-col>
                <el-col :xs="20" :sm="12" :md="12" :lg="16" :xl="16">
                    <el-date-picker
                    v-model="startTime"
                    size="small"
                    type="datetime"
                    :picker-options="pickerOptionsS"
                    @change="changeTimeS"
                    placeholder="选择开始时间">
                    </el-date-picker>
                    <span>——</span>
                    <el-date-picker
                    v-model="endTime"
                    size="small"
                    type="datetime"
                    :picker-options="pickerOptionsE"
                    @change="changeTimeE"                    
                    placeholder="选择结束时间">
                    </el-date-picker>
                </el-col>
                <el-col :span="2"></el-col> 
            </div></el-col>
        </el-row>
         <el-row class="marginTop">
             <el-col ors:xs="24" :sm="12" :md="12" :lg="12" :xl="12"><div class="grid-content bg-purple-light">
                <el-col :xs="4" :sm="6" :md="6" :lg="4" :xl="4"><div class="grid-content bg-purple-dark textR inputTitle">操作人姓名：</div></el-col>
                <el-col :xs="20" :sm="12" :md="12" :lg="16" :xl="16">
                     <el-input v-model="operator" size="small" maxlength=10 placeholder="请输入查询的操作人姓名"></el-input>
                </el-col>
                <el-col :span="2">
                </el-col> 
            </div></el-col>
            <el-col ors:xs="24" :sm="12" :md="12" :lg="12" :xl="12"><div class="grid-content bg-purple-light">
                <el-col :xs="4" :sm="6" :md="6" :lg="4" :xl="4"><div class="grid-content bg-purple-dark textR inputTitle">手机号码：</div></el-col>
                <el-col :xs="20" :sm="12" :md="12" :lg="16" :xl="16">
                     <el-input v-model="phone" size="small" maxlength=11 placeholder="请输入查询的手机号码"></el-input>
                </el-col>
            </div></el-col>
        </el-row>
        <el-row class="marginTop">
            <el-col ors:xs="24" :sm="12" :md="12" :lg="12" :xl="12"><div class="grid-content bg-purple-light">
                <el-col :xs="4" :sm="6" :md="6" :lg="4" :xl="4"><div class="grid-content bg-purple-dark textR inputTitle">操作类型：</div></el-col>
                <el-col :xs="20" :sm="12" :md="12" :lg="16" :xl="16">
                    <el-radio v-model="optype"  label="1,2,3,4">全部</el-radio> 
                    <el-radio v-model="optype"  label="1">初始化</el-radio>
                    <el-radio v-model="optype"  label="2">上架</el-radio>
                    <el-radio v-model="optype"  label="3">下架</el-radio>
                    <el-radio v-model="optype"  label="4">已卖</el-radio>
                </el-col>
            </div></el-col>
            <el-col ors:xs="24" :sm="12" :md="12" :lg="12" :xl="12"><div class="grid-content bg-purple-light">
                <el-col :xs="4" :sm="6" :md="6" :lg="4" :xl="4"><div class="grid-content bg-purple-dark textR inputTitle">操作结果：</div></el-col>
                <el-col :xs="20" :sm="12" :md="12" :lg="16" :xl="16">
                    <el-radio v-model="radio"  label="1,2">全部</el-radio>
                    <el-radio v-model="radio"  label="1">成功</el-radio>
                    <el-radio v-model="radio"  label="2">失败</el-radio>
                </el-col>
            </div></el-col>
        </el-row>
            <el-row style="text-align:center" class="marginTop">
                <button class="searchBtn" @click="search()">搜索</button>
            </el-row>
        </div>
        <div v-if="off.logList!=0">
            <div class="listTitleFoot"><span>日志列表</span>({{form.page}})<el-button class="fr" type="success" size="small">导出数据</el-button></div>
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
                    <tr v-for="(v,i) of searchResult" :key="i">
                        <td>
                            {{((pa-1)*10+(i+1))}}
                        </td>
                        <td >
                            {{v.productName}}
                        </td>
                        <td >
                            {{new Date(v.modifyTime).toLocaleString()}}
                        </td>
                        <td >
                            {{v.operatorName}}
                        </td>
                        <td>
                            {{v.operatorPhone}}
                        </td>
                        <td >
                            <span v-if="v.productState==1">初始化</span>
                            <span v-if="v.productState==2">上架</span>
                            <span v-if="v.productState==3">下架</span>
                            <span v-if="v.productState==4">已卖</span>
                        </td>
                        <td >
                            <span v-if="v.recordResult==1">成功</span>
                            <span v-if="v.recordResult==2">失败</span>
                        </td>
                        <td>
                            <a class="textDec" href="javascript:void(0)" @click="openDetails(v)">查看详情</a>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="listTitleFoot">
                <el-row>
                    <el-col ors:xs="24" :sm="12" :md="12" :lg="12" :xl="12"><div class="grid-content bg-purple">
                        <el-pagination
                            layout="prev, pager, next"
                            :page-size="10"
                            @current-change="search"
                            :total="form.page">
                        </el-pagination>    
                    </div></el-col>
                </el-row>
            </div>
        </div>
        <log-details v-if="off.logDet" :detailsData="detailsList" :layerType="openLayer"></log-details>
  	</section>
</template>
<script>
import { getDateTime,disableTimeRange } from "../../config/utils";
import {errorDeal} from "../../config/utils";
import logDet from "../../../components/logDetails";
import { requestMethod } from "../../config/service";
export default {
    data() {
        return {
            openLayer:"number",
            detailsList: "",
            startTime: "",
            endTime: "",
            packageName: "",
            operator: "",
            phone: "",
            name: "",
            optype: "1,2,3,4",
            radio: "1,2",
            searchResult: "",
            pa: 1,
            off: {
                logDet: false,
                logList:false,
            },
            form: {
                page: 1
            }, 
            pickerOptionsS: {
            disabledDate(time) {
                let curDate = new Date().getTime();
                let curYear=new Date(curDate).getFullYear();
                let curMonth=new Date(curDate).getMonth()+1;
                let curDay=new Date(curDate).getDate()+1; 
                let nextMonth=curMonth+1;               
                let cur=curYear+"/"+curMonth+"/1";
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
                let curMonth=new Date(curDate).getMonth()+1;
                let curDay=new Date(curDate).getDate()+1; 
                let nextMonth=curMonth+1;               
                let cur=curYear+"/"+curMonth+"/1";
                let next=curYear+"/"+nextMonth+"/1";
                let nextYesterday=new Date(next)-1000*3600*24;
                    cur=new Date(cur).getTime();
                return time.getTime() > nextYesterday || time.getTime() < cur;
            }
            }, 
        };
    },
    created: function() {
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
    beforeDestroy: function() {},
    mounted: function() {},
    computed: {},
    components: {
        "log-details": logDet
    },
    methods: {
        search(index) {//查询
        let vm = this,
            json = {
            startOperateTime:new Date(vm.startTime).getTime(),
            endOperateTime: new Date(vm.endTime).getTime(),
            operatorName: vm.operator,
            operatorPhone: vm.phone,
            productState: vm.optype,
            productName:vm.packageName,
            recordResult: vm.radio,
            pageNum:index||1,
            pageSize:10,
            },
            url = "/ors/w/record/numOperRecordSearch";
            vm.pa = index || 1;
        requestMethod(json, url)
            .then(data => {
            if (data.code == 200) {
                vm.off.logList=data.data.total;
                vm.form.page = data.data.total;
                vm.searchResult = data.data.records;
            } else {
                errorDeal(data);
            }
            })
            .catch(e => errorDeal(e));
        },
        openDetails(v) {//详情
        let vm = this;
        vm.off.logDet = true;
        let data = { searchRecordId: v.recordId, searchRecordTime: v.recordTime };
        requestMethod(data, "/ors/w/record/getNumOperRecordDetail")
            .then(data => {
            if (data.code == 200) {
                vm.detailsList = data.data;
            } else {
                errorDeal(data);
            }
            })
            .catch(e => errorDeal(e));
        },
        changeTimeS(e){
            let vm=this,
            timeRange=disableTimeRange(),
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
            timeRange=disableTimeRange(),
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

