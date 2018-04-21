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
        <el-row style="height:40px;line-height:40px" >
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12"><div class="grid-content bg-purple">
                <el-col :xs="4" :sm="6" :md="6" :lg="4" :xl="4"><div class="grid-content bg-purple-dark textR inputTitle">操作时间：</div></el-col>
                <el-col :xs="20" :sm="12" :md="12" :lg="16" :xl="16">
                    <el-date-picker
                    v-model="startTime"
                    size="small"
                    type="datetime"
                    :picker-options="pickerOptionsS"
                    placeholder="选择开始时间">
                    </el-date-picker>
                    <span>——</span>
                    <el-date-picker
                    v-model="endTime"
                    size="small"
                    type="datetime"
                    :picker-options="pickerOptionsE"
                    placeholder="选择结束时间">
                    </el-date-picker>
                </el-col>
                <el-col :span="2"></el-col> 
            </div></el-col>
             <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12"><div class="grid-content bg-purple-light">
                <el-col :xs="4" :sm="6" :md="6" :lg="4" :xl="4"><div class="grid-content bg-purple-dark textR inputTitle">操作人姓名：</div></el-col>
                <el-col :xs="20" :sm="12" :md="12" :lg="16" :xl="16">
                     <el-input v-model="operator" size="small" placeholder="请输入查询的联系人姓名"></el-input>
                </el-col>
                <el-col :span="2">
                   
                </el-col> 
            </div></el-col>
        </el-row>
         <el-row class="marginTop">
             <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12"><div class="grid-content bg-purple-light">
                <el-col :xs="4" :sm="6" :md="6" :lg="4" :xl="4"><div class="grid-content bg-purple-dark textR inputTitle">操作类型：</div></el-col>
                <el-col :xs="20" :sm="12" :md="12" :lg="16" :xl="16">
                    <el-radio v-model="optype"  label="1,2">全部</el-radio>
                    <el-radio v-model="optype"  label="1">登录</el-radio>
                    <el-radio v-model="optype"  label="2">登出</el-radio>
                </el-col>
                <el-col :span="2">
                   
                </el-col> 
            </div></el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12"><div class="grid-content bg-purple-light">
                <el-col :xs="4" :sm="6" :md="6" :lg="4" :xl="4"><div class="grid-content bg-purple-dark textR inputTitle">手机号码：</div></el-col>
                <el-col :xs="20" :sm="12" :md="12" :lg="16" :xl="16">
                     <el-input v-model="phone" size="small" placeholder="请输入查询的手机号码"></el-input>
                </el-col>
                <el-col :span="2">
                   
                </el-col> 
            </div></el-col>
        </el-row>
        <el-row class="marginTop">
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12"><div class="grid-content bg-purple-light">
                <el-col :xs="4" :sm="6" :md="6" :lg="4" :xl="4"><div class="grid-content bg-purple-dark textR inputTitle">登录方式：</div></el-col>
                <el-col :xs="20" :sm="12" :md="12" :lg="16" :xl="16">
                    <el-radio v-model="opcontent"  label="1,2">全部</el-radio>
                    <el-radio v-model="opcontent"  label="1">PC</el-radio>
                    <el-radio v-model="opcontent"  label="2">App</el-radio>
                </el-col>
                <el-col :span="2">
                   
                </el-col> 
            </div></el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12"><div class="grid-content bg-purple-light">
                <el-col :xs="4" :sm="6" :md="6" :lg="4" :xl="4"><div class="grid-content bg-purple-dark textR inputTitle">操作结果：</div></el-col>
                <el-col :xs="20" :sm="12" :md="12" :lg="16" :xl="16">
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
    <div v-if="form.page>0">
        <div class="listTitleFoot"><span>登录日志列表({{form.page}})</span><el-button class="fr" type="success" size="small">导出数据</el-button></div>
        <div class="detailsListDiv">
            <table class="searchTab" style="width:100%;height:100%;">
                <tr>
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
                        {{((pa-1)*10+(i+1))}}
                    </td>
                    <td >
                        {{new Date(v.recordTime).toLocaleString()}}
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
                        <a href="javascript:void(0)" @click="openDetails(v)">查看详情</a>
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
        </div>
        <log-details v-if="off.logDet" :layerType="openLayer" :detailsData="detailsList"></log-details>
  	</section>
</template>
<script>
import { getDateTime } from "../../config/utils";
import logDet from "../../../components/logDetails";
import { requestMethod } from "../../config/service";
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
  computed: {},
  components: {
    "log-details": logDet
  },
  methods: {
    search(t) {
        let vm = this;
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
          pageSize: 10
        };
        requestMethod(json,"/yfd-ors/w/record/loginRecordSearch")
        .then(data => {
          if (data.code == 200) {
            vm.form.page=data.data.total;
            vm.searchList = data.data.records;
          } else {
            errorDeal(data);
          }
        })
        .catch(e => errorDeal(e));
    },
    openDetails(v) {
      let vm = this;
      vm.off.logDet = true;
      let data = { searchRecordId: v.recordId, searchRecordTime: v.recordTime };
      requestMethod(data,"/yfd-ors/w/record/getLoginRecordDetail")
        .then(data => {
          if (data.code == 200) {
            vm.detailsList = data.data;
          } else {
            errorDeal(data);
          }
        })
        .catch(e => errorDeal(e));
    }
  }
};
</script>

