<style>
/* div.listTitleFoot {
  width: 96%;
  margin: 10px 18px;
}
div.detailsListDiv tr td {
  text-align: center;
} */
</style>
<template>
  <section >
      <div class="dls greyFont">
        <el-row>
            <el-col :span="24"><div class="grid-content bg-purple-dark searchTitleStyle blackFont">搜索条件</div></el-col>
        </el-row>
        <el-row style="height:40px;line-height:40px" >
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12"><div class="grid-content bg-purple">
                <el-col :xs="4" :sm="4" :md="6" :lg="4" :xl="4"><div class="grid-content bg-purple-dark textR inputTitle">操作时间：</div></el-col>
                <el-col :xs="18" :sm="18" :md="12" :lg="16" :xl="16">
                    <div class="block">
                        <el-date-picker
                        v-model="startTime"
                        size="small"
                        type="datetime"
                        :clearable=false                                        
                        :editable=false                    
                        :picker-options="pickerOptionsS"
                        @change="changeTimeS"
                        placeholder="选择开始时间">
                        </el-date-picker>—<el-date-picker
                        v-model="endTime"
                        size="small"
                        type="datetime"
                        :clearable=false                                        
                        :editable=false                    
                        :picker-options="pickerOptionsE"
                        @change="changeTimeE"
                        placeholder="选择结束时间">
                        </el-date-picker>
                    </div>
                </el-col>
                <el-col :span="2"></el-col> 
            </div></el-col>
             <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12"><div class="grid-content bg-purple-light">
                <el-col :xs="4" :sm="4" :md="6" :lg="4" :xl="4"><div class="grid-content bg-purple-dark textR inputTitle">操作人姓名：</div></el-col>
                <el-col :xs="18" :sm="18" :md="12" :lg="16" :xl="16">
                     <el-input v-model="operator" size="small" placeholder="请输入查询的联系人姓名"></el-input>
                </el-col>
                <el-col :span="2">
                   
                </el-col> 
            </div></el-col>
        </el-row>
         <el-row class="marginTop">
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12"><div class="grid-content bg-purple-light">
                <el-col :xs="4" :sm="4" :md="6" :lg="4" :xl="4"><div class="grid-content bg-purple-dark textR inputTitle">手机号码：</div></el-col>
                <el-col :xs="18" :sm="18" :md="12" :lg="16" :xl="16">
                     <el-input :maxlength="11" v-model="phone" size="small" placeholder="请输入查询的手机号码"></el-input>
                </el-col>
                <el-col :span="2">
                   
                </el-col> 
            </div></el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12"><div class="grid-content bg-purple-light">
                <el-col :xs="4" :sm="4" :md="6" :lg="4" :xl="4"><div class="grid-content bg-purple-dark textR inputTitle">操作类型：</div></el-col>
                <el-col :xs="18" :sm="18" :md="12" :lg="16" :xl="16">
                    <el-radio v-model="optype"  label="1,2">全部</el-radio>
                    <el-radio v-model="optype"  label="1">登录</el-radio>
                    <el-radio v-model="optype"  label="2">登出</el-radio>
                </el-col>
                <el-col :span="2">
                    
                </el-col> 
            </div></el-col>
        </el-row>
        <el-row class="marginTop">
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12"><div class="grid-content bg-purple-light">
                <el-col :xs="4" :sm="4" :md="6" :lg="4" :xl="4"><div class="grid-content bg-purple-dark textR inputTitle">登录方式：</div></el-col>
                <el-col :xs="18" :sm="18" :md="12" :lg="16" :xl="16">
                    <el-radio v-model="opcontent"  label="1,2">全部</el-radio>
                    <el-radio v-model="opcontent"  label="1">PC</el-radio>
                    <el-radio v-model="opcontent"  label="2">App</el-radio>
                </el-col>
                <el-col :span="2">
                   
                </el-col> 
            </div></el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12"><div class="grid-content bg-purple-light">
                <el-col :xs="4" :sm="4" :md="6" :lg="4" :xl="4"><div class="grid-content bg-purple-dark textR inputTitle">操作结果：</div></el-col>
                <el-col :xs="18" :sm="18" :md="12" :lg="16" :xl="16">
                    <el-radio v-model="radio"  label="1,2">全部</el-radio>
                    <el-radio v-model="radio"  label="1">成功</el-radio>
                    <el-radio v-model="radio"  label="2">失败</el-radio>
                </el-col>
                <el-col :span="2">
                   
                </el-col> 
            </div></el-col>
        </el-row>
        <el-row style="text-align:center" class="marginTop">
            <button class="searchBtn" @click="search()">搜索</button>
        </el-row>
      </div>
    <div v-if="searchList">
        <div class="listTitleFoot"><h3>日志列表<span class="fontWeight greyFont">({{form.page||'0'}})</span><!--<el-button class="fr" type="success" size="small">导出数据</el-button>--></h3></div>                
        <div class="detailsListDiv">
            <table class="searchTab" style="width:100%;height:100%;">
                <tr class="f-s-14">
                    <td>序号</td>
                    <td>操作时间</td>
                    <td>操作人</td>
                    <td>手机号码</td>
                    <td>公司名称</td>
                    <td>操作类型</td>
                    <td>登录方式</td>
                    <td>操作结果</td>
                    <td>当前状态</td>
                    <td>操作</td>
                </tr>
                <tr v-for="(v,i) of searchList" :key="i">
                    <td>
                        {{((pa-1)*15+(i+1))}}
                    </td>
                    <td >
                        {{getDateTime(v.recordTime)[6]}}
                    </td>
                    <td >
                        {{v.operatorName}}
                    </td>
                    <td >
                        {{v.phone}}
                    </td>
                    <td >
                        {{v.departName||"--"}}
                    </td>
                    <td >
                        <span v-if="v.recordType==1">登录</span>
                        <span v-if="v.recordType==2">登出</span>
                    </td>
                    <td >
                        <span v-if="v.sessionPlatform==1">PC</span>
                        <span v-if="v.sessionPlatform==2">APP</span>
                    </td>
                    <td >
                        <span v-if="v.recordResult==1">成功</span>
                        <span v-if="v.recordResult==2">失败</span>
                    </td>
                    <td >
                        <span>--</span>
                    </td>
                    <td>
                        <a class="textDec" href="javascript:void(0)" @click="openDetails(v)">查看详情</a>
                    </td>
                </tr>
                <tr v-if="searchList.length<=0">
                    <td colspan="10">
                        暂无数据                                                        
                    </td>
                </tr>
            </table>
        </div>
        <div class="listTitleFoot" v-if="searchList.length>0">
            <el-row>
                <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12"><div class="grid-content bg-purple">
                    <el-pagination
                        layout="prev, pager, next"
                        :page-size="15"
                        @current-change="search"
                        :total="form.page">
                    </el-pagination>    
                </div></el-col>
            </el-row>
        </div>
        </div>
        <log-details v-if="off.logDet" :layerType="openLayer" :detailsData="detailsList"></log-details>
  	</section>
</template>
<script>
import { getDateTime,disableTimeRange6,checkMobile,getTimeFunction} from "../../config/utils";
import logDet from "../../components/logDetails";
import { requestLoginLogSearch,requestMethod } from "../../config/service";
import {errorDeal} from "../../config/utils";
export default {
  data() {
    return {
        pa:1,
        openLayer:"login",
        startTime: "",
        endTime: "",
        operator: "",
        phone: "",
        radio: "1,2", //操作结果
        optype: "1,2", //操作类型
        opcontent: "1,2", //登录平台
        timeType: "a",
        searchList: "",
        detailsList:"",
        off: {
            showSearch: "",
            logDet: false
        },
        form:{
            page:0
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
    getTimeFunction(this);
  },
  beforeDestroy: function() {},
  mounted: function() {},
  computed: {},
  components: {
    "log-details": logDet
  },
  methods: {
    search(t) {
        let vm=this;
        if(this.phone!=''){
            checkMobile(this.phone,function(){vm.form.page="";vm.searchList = "";return false});
        }
        let sy=new Date(vm.startTime).getFullYear(),
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
        vm.pa=t||1;
        let json = {
          startRecordTime: new Date(vm.startTime).getTime(),
          endRecordTime: new Date(vm.endTime).getTime(),
          operatorName: vm.operator,
          phone: vm.phone,
          recordResult: vm.radio,
          recordType: vm.optype,
          sessionPlatform: vm.opcontent,
          pageNum: t || 1,
          pageSize: 15
        };
        requestLoginLogSearch(json)
        .then(data => {
          if (data.code == 200) {
            vm.form.page=data.data.total;
            vm.searchList = data.data.records;
          } else {
            vm.form.page="";vm.searchList = "";
            errorDeal(data);
          }
        }).catch(e => errorDeal(e,()=>{vm.form.page="";vm.searchList = "";}));
    },
    openDetails(v) {
      let vm = this;
      let data = { searchRecordId: v.recordId, searchRecordTime: v.recordTime };
      requestMethod(data,"/ors/w/record/getLoginRecordDetail")
        .then(data => {
          if (data.code == 200) {
            vm.off.logDet = true;              
            vm.detailsList = data.data;
          } else {
            errorDeal(data);
          }
        })
        .catch(e => errorDeal(e));
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
            getTimeFunction(this,[e,1])         
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
        },getDateTime(v){
            return getDateTime(v)
        }
  }
};
</script>

