<template>
  <section ref="sec">
    <div v-if="!off.rebate">
      <el-container>
        <el-header class="m-headBar">
          <el-row>
            <el-col :span="12">
              <div class="grid-content bg-purple">佣金累计返利金额</div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light fr" style="padding-right:40px">
                <a href="javascript:void(0)" class="blue" @click="back()">返回列表</a>
              </div>
            </el-col>
          </el-row>
        </el-header>
      </el-container>
      <div class="greyFont">
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark m-search-title black">搜索条件</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" >
            <div class="grid-content bg-purple">
              <el-col :xs="4" :sm="3" :md="3" :lg="4" :xl="4" >
                <div class="grid-content bg-purple-dark f-ta-r inputTitle">按月份&nbsp;:&nbsp;</div>
              </el-col>
              <el-col :xs="20" :sm="18" :md="18" :lg="18" :xl="18" >
                <div class="f-display-ib m-date-picker">
                  <el-date-picker
                    style="border-radius:4px;width:200px"
                    v-model="startTime"
                    type="month"
                    size="small"
                    placeholder="选择年"
                  >
                  </el-date-picker>
                  <el-button
                    size="small"
                    type="warning"
                    @click="search"
                  >搜索</el-button>
                </div>
              </el-col>
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- 查询结果列表 -->
      <div v-if="searchList">
        <el-row style="width:96%;margin-left:2%">
          <el-col :span="12" class="f-ta-l f-pl-10" >
            <div class="grid-content bg-purple">
              <span>佣金详情</span>
              <span class="grey">【公司名称：<b class="blue">{{account_depName}}</b>】</span>
            </div>
          </el-col>
          <el-col :span="12" class="f-ta-r" >
            <div  class="grid-content bg-purple-light">
              <label v-if="false">
                <span>合计金额 : ￥</span>
                <b class="yellow f-fs16">{{12345}}</b>
              </label>
              <el-button style="margin-left:20px" type="success" size="mini" @click="download"> 导 出 </el-button>
            </div>
          </el-col>
        </el-row>
        <div class="m-details">
          <table class="m-searchTab" style="width:100%;height:100%;" >
            <tr>
              <td>序号</td>
              <td>月份</td>
              <td>类目</td>
              <td>本月佣金累计返利（元）</td>
            </tr>
            <tr v-for="(v,i) in searchList" :key="i" >
              <td>{{i+1}}</td>
              <td>{{getDateTime(startTime)[3]}}</td>
              <td>{{translateData('yjType',v.type)}}</td>
              <td>
                <a class="link" @click="details(1,v.type,1)">{{translateData('fenToYuan',v.rebate)}}</a>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <Rebate v-if="off.rebate" :list="detailslist" :listTotal="detailstotal" :listPage="detailspage"></Rebate>
  </section>
</template>
<script>
import { getTimeFunction, translateData, getDateTime, errorDeal, createDownload,getStore } from "../../config/utils";
import { cmsdetails,cmstype,cmsDownload } from "../../config/service.js";
import { mapState } from "vuex";
import Rebate from './cmsrebate';
export default {
  data() {
    return {
      searchList: false,
      startTime: "",
      detailslist:"",
      detailstotal:"",
      detailspage:0,
      detailRebateType:"",
      searchJson:"",
      detailJson:"",
      off:{
        rebate:false
      }
    };
  },
  created: function() {
    getTimeFunction(this);
  },
  components:{
    Rebate
  },
  computed: {
    ...mapState(["account_depId","account_depName"]),
  },
  methods: {
    search(p) {
      let vm = this,json;
      json={ departId: vm.account_depId, startTime: vm.startTime }
      vm.searchJson = json;
      cmsdetails(vm.searchJson)
        .then(res => {
          vm.searchList = res.data.list;
        })
        .catch(e => errorDeal(e));
    },details(p,v,i){
      let vm=this,json;
      if(i==1){
        json={departId: vm.account_depId, startTime: vm.startTime,type:v,pageNum:1,pageSize:15};
        vm.detailJson = json;
        vm.detailRebateType = v;
      }else if(i==2){
        Object.assign(vm.detailJson,{pageNum:p});
      }
      cmstype(vm.detailJson)
      .then(res=>{
        vm.detailslist = res.data.list;
        vm.detailstotal = res.data.total;
        vm.detailspage = p;
        vm.off.rebate = true;
      })
    },
    download(){
      let vm=this; 
      cmsDownload(vm.searchJson,()=>{return "down";})
    },
    back() {
      let vm = this;
      vm.$parent.off.cms = false;
      vm.$parent.off.list = true;
      vm.$parent.off.balance = false;
    },
    getDateTime(v) {
      return getDateTime(v);
    },
    translateData(v, i) {
      return translateData(v, i);
    }
  }
};
</script>
<style>
.m-date-picker .el-date-editor:nth-child(1) .el-input__inner {
  border-radius: 4px !important;
}
</style>
