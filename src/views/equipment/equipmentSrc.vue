<template>
  <section>
    <div class="pickCardOrder">
      <div class="dls greyFont">
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark m-search-title black">搜索条件</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-col :xs="4" :sm="4" :md="3" :lg="2" :xl="2" class="m-form-radio f-ta-r">
              <label><span class="text greyFont">操作时间：</span></label>
            </el-col>
            <el-col :xs="16" :sm="8" :md="6" :lg="4" :xl="4">
              <el-radio v-model="isTime" label="0">全部时间</el-radio>
              <el-radio v-model="isTime" label="1">时间区间</el-radio>
            </el-col>
            <el-col :xs="24" :sm="24" :md="15" :lg="18" :xl="16">
              <el-col :xs="4" :sm="4" :md="0" :lg="0" :xl="0">&nbsp;</el-col>
              <el-col :xs="20" :sm="20" :md="24" :lg="24" :xl="24">
                <el-date-picker v-model="startTime3" size="small" type="date" :clearable=false :editable=false style="width:140px;border-radius:4px 0 4px 0" placeholder="选择开始时间">
                </el-date-picker><el-date-picker v-model="endTime" size="small" type="date" :clearable=false :editable=false style="width:140px;" placeholder="选择结束时间">
                </el-date-picker>
                （
                  <el-radio v-model="timeType" label="1">入库时间</el-radio>
                  <el-radio v-model="timeType" label="2">出库时间</el-radio>
                  <el-radio v-model="timeType" label="3">发货时间</el-radio>
                ）
              </el-col>
            </el-col>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
            <el-col :xs="4" :sm="4" :md="3" :lg="4" :xl="4">
              <div class="grid-content bg-purple-dark f-ta-r inputTitle">读写卡设备号：</div>
            </el-col>
            <el-col :xs="18" :sm="16" :md="17" :lg="16" :xl="16">
              <el-input v-model="deviceNo" size="small" placeholder="请输入读写卡设备号"></el-input>
            </el-col>
            <el-col :span="2"></el-col>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
            <el-col :xs="4" :sm="4" :md="3" :lg="4" :xl="4">
              <div class="grid-content bg-purple-dark f-ta-r inputTitle">号段：</div>
            </el-col>
            <el-col :xs="18" :sm="16" :md="17" :lg="16" :xl="16">
              <el-input v-model="numberSection" size="small" maxlength=8 placeholder="请输入查询的8位号段"></el-input>
            </el-col>
            <el-col :span="2"></el-col>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
            <el-col :xs="4" :sm="4" :md="3" :lg="4" :xl="4">
              <div class="grid-content bg-purple-dark f-ta-r inputTitle">代理商名称：</div>
            </el-col>
            <el-col :xs="18" :sm="16" :md="17" :lg="16" :xl="16">
              <el-input v-model="agentName" size="small" placeholder="请输入查询的代理商名称"></el-input>
            </el-col>
            <el-col :span="2"></el-col>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
            <div class="grid-content bg-purple-light">
              <el-col :xs="8" :sm="8" :md="6" :lg="4" :xl="4">
                <div class="grid-content bg-purple-dark f-ta-r inputTitle">当前状态：</div>
              </el-col>
              <el-col :xs="16" :sm="16" :md="18" :lg="20" :xl="20">
                <el-radio v-model="currentStatus" label="0">全部</el-radio>
                <el-radio v-model="currentStatus" label="1">在库</el-radio>
                <el-radio v-model="currentStatus" label="2">出库</el-radio>
              </el-col>
            </div>
          </el-col>
        </el-row>
        <el-row style="text-align:center" class="marginTop">
          <button class="m-btn-orange m-btn-search" @click="search()">搜索</button>
        </el-row>
      </div>
      <div v-if="searchResult">
        <div>
          <div class="m-details">
            <p class="m-searchlist-title"><span>订单列表</span><span>
              <el-button size="mini" style="padding:5px !important;margin-right:10px" @click="downLoad()" type="success">导出</el-button></span></p>
            <table class="m-searchTab" style="width:100%;height:100%;margin-top:10px;">
              <tr class="f-s-14">
                <td>序号</td>
                <td>读写卡设备号</td>
                <td>授权牌编码</td>
                <td>千号段</td>
                <td>ICCID起始</td>
                <td>ICCID结束</td>
                <td>当前状态</td>
                <td>入库时间</td>
                <td>出库时间</td>
                <td>发货时间</td>
                <td>代理商名称</td>
                <td>业务员</td>
              </tr>
              <tr v-for="(v,i) of searchResult" :key="i">
                <td>{{(currentPage-1)*15+(i+1)}}</td>
                <td>{{v.deviceNo||'--'}}</td>
                <td>{{v.anthNo||'--'}}</td>
                <td>{{v.sectionId||'--'}}</td>
                <td>{{v.iccidStart||'--'}}</td>
                <td>{{v.iccidEnd||'--'}}</td>
                <td>{{v.status==0?'在库':v.status==1?'出库':'--'}}</td>
                <td>{{getDateTime(v.storeTime)[2]}}</td>
                <td>{{getDateTime(v.outTime)[2]}}</td>
                <td>{{getDateTime(v.deliverTime)[2]}}</td>
                <td>{{v.agentName||'--'}}<span v-if="v.agentId">({{v.agentId}})</span></td>
                <td>{{'--'}}</td>
              </tr>
              <tr v-if="searchResult.length<=0">
                <td style="text-align:center" colspan="14">
                  暂无数据
                </td>
              </tr>
            </table>
          </div>
          <div class="m-listTitleFoot" v-if="searchResult.length>0">
            <el-row>
              <el-col ors:xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                <div class="grid-content bg-purple">
                  <el-pagination layout="prev, pager, next" :page-size="15" @current-change="search" :current-page.sync="currentPage" :total="total">
                  </el-pagination>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { getTimeFunction, errorDeal, getDateTime } from "../../config/utils";
import { getDeviceResource,deviceListDownload } from "../../config/service.js";
import NProgress from 'nprogress';
export default {
  data() {
    return {
      searchResult:"",
      isTime:"0",
      startTime3:"",
      endTime:"",
      timeType:"1",
      deviceNo:"",
      numberSection:"",
      agentName:"",
      currentStatus:"0",
      currentPage:"",
      total:"",
      searchJson:""
    };
  },
  created: function() {
    getTimeFunction(this);
  },
  methods: {
    search(index) {
      let vm = this,json,_status,_startTime,_endTime;
          _status = vm.currentStatus==0?"":vm.currentStatus;
          _endTime = vm.isTime==0?"":new Date(vm.endTime).getTime();
          _startTime = vm.isTime==0?"":new Date(vm.startTime3).getTime();
      json={
        "agentName": vm.agentName,
        "deviceNo": vm.deviceNo,
        "endTime": _endTime,
        "pageNum": index||1,
        "pageSize": 15,
        "sectionId": vm.numberSection,
        "startTime": _startTime,
        "status": _status,
        "timeType": vm.timeType
      };
      vm.searchJson=json;
      getDeviceResource(json)
      .then(res=>{
        if(res&&res.data){
          vm.searchResult=res.data.list;
          vm.total=100;
          // vm.total=res.data.total;
          vm.currentPage=index||1;
        }
      }).catch(e=>errorDeal(e))
    },
    downLoad(i,v) {
      let vm = this,json;
      deviceListDownload(vm.searchJson,()=>{ return 'down'})

    },
    getDateTime(e) {
      return getDateTime(e);
    },
  }
};
</script>
