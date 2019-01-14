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
            <el-col :xs="18" :sm="16" :md="20" :lg="18" :xl="8">
              <div class="block">
                <el-date-picker v-model="startTime3" size="small" type="date" :clearable=false :editable=false style="border-radius:4px 0 4px 0" placeholder="选择开始时间">
                </el-date-picker><el-date-picker v-model="endTime" size="small" type="date" :clearable=false :editable=false placeholder="选择结束时间">
                </el-date-picker>
                ( <el-radio v-model="timeType" label="1">创建时间</el-radio>
                <el-radio v-model="timeType" label="2">修改时间</el-radio> )
              </div>
            </el-col>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
            <el-col :xs="4" :sm="4" :md="3" :lg="4" :xl="4">
              <div class="grid-content bg-purple-dark f-ta-r inputTitle">佣金规则：</div>
            </el-col>
            <el-col :xs="18" :sm="16" :md="17" :lg="16" :xl="16">
              <el-select size="small" style="width:100%" v-model="commissionRules" placeholder="请选择查询的佣金规则">
                <el-option v-for="item in cmsRules" :key="item.areaPinYing" :label="item.areaCn" :value="item.areaCn"
                  size="small">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="2"></el-col>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
            <el-col :xs="4" :sm="4" :md="3" :lg="4" :xl="4">
              <div class="grid-content bg-purple-dark f-ta-r inputTitle">佣金年限：</div>
            </el-col>
            <el-col :xs="18" :sm="16" :md="17" :lg="16" :xl="16">
              <el-select size="small" style="width:100%" v-model="commissionTime" placeholder="请选择查询的佣金年限">
                <el-option v-for="item in ruleTime" :key="item.areaPinYing" :label="item.areaCn" :value="item.areaCn"
                  size="small">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="2"></el-col>
          </el-col>
        </el-row>
        <el-row style="text-align:center" class="marginTop">
          <button class="m-btn-orange m-btn-search" @click="search()">搜索</button>
        </el-row>
      </div>
      <div v-if="searchResult">
        <div>
          <div class="m-details">
            <table class="m-searchTab" style="width:100%;height:100%;">
              <tr>
                <td colspan="15">
                  <div class="listHeader">
                    <label style="text-align:left;padding-left:5px;">列表<span class="f-fw greyFont">({{total||0}})</span>
                      【<span class="grey">佣金规则 : </span><span class="green">{{'--'}}</span> <span class="grey">佣金年限 : </span><span class="green">{{'--'}}</span>】
                    </label>
                    <el-row>
                      <el-button size="mini" v-if="searchResult.length>0" @click="downLoad(1)" type="success">下载订单列表</el-button>
                      <el-button style="margin-right:10px" size="mini" v-if="searchResult.length>0" @click="downLoad(2)" type="success">批量下载发货单</el-button>
                    </el-row>
                  </div>
                </td>
              </tr>
              <tr class="f-s-14">
                <td>序号</td>
                <td>操作时间</td>
                <td>电话号码</td>
                <td>号码等级</td>
                <td>品牌</td>
                <td>归属地</td>
                <td>SIM号</td>
                <td>面值( 元 )</td>
                <td>套餐名称</td>
              </tr>
              <tr v-for="(v,i) of searchResult" :key="i"></tr>
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
import {
  disableTimeRange6,
  getTimeFunction,
  errorDeal,
  getDateTime,
  trimFunc,
  createDownload,
  getStore,
} from "../../config/utils";
import { getCommissionRules,downloadCommissionRules } from "../../config/service.js";
import NProgress from 'nprogress';
export default {
  data() {
    return {
      timeType:"1",
      commissionRules:"",
      commissionTime:"",
      cmsRules:"",
      ruleTime:"",
      total:"",
      startTime3:"",
      endTime:"",
      downLoadJson:"",
      searchResult:"",
    };
  },
  created: function() {
    getTimeFunction(this);
  },
  methods: {
    search(index) {
      let vm = this,data = {};
      vm.upindex = 0.1;
      vm.pa = index || 1;
      vm.currentPage = index || 1;
      data = {
        timeType: "",
        startTime: "",
        endTime: "",
        cmsRules:vm.cmsRules,
        ruleTime:vm.ruleTime,
        pageNum: index||1,
        pageSize: 15,
      };
      vm.downLoadJson = data;
      getCommissionRules(vm.downLoadJson)
      .then(res => {
        if(res&&res.data){
          vm.total = data.data.total;
          vm.searchResult = data.data.list;
        } else {
          vm.total = "";
          vm.searchResult = "";
          errorDeal(data);
        }
      }).catch(e =>
        errorDeal(e, () => {
          vm.total = "";
          vm.searchResult = "";
        })
      );
    },
    downLoad(i,v) {
      let vm = this,json;
      if(i==1){
        json = vm.downLoadJson;
        delete json.pageNum;
        delete json.pageSize;
        downloadCommissionRules(json,()=>{return "down" })
      }else if(i==2){
        json = vm.downLoadJson;
        json.pageNum=vm.currentPage;
        json.pageSize=15;
        downloadCommissionRules(json,()=>{return "down" })
      }else if(i==3){
        json={sysOrderId:v};
        downloadCommissionRules(json,()=>{return "down" })
      }
    },
    getDateTime(e) {
      return getDateTime(e);
    },
    trimFunc(v) {
      return trimFunc(v);
    },
  }
};
</script>
<style>
.pickCardOrder .f-ta-c div input {
  border: 0 none;
}

.pickCardOrder .box {
  width: 140px;
  height: 26px;
  background-color: #808000;
  clear: both;
}

.pickCardOrder .box span {
  display: inline-block;
  height: 26px;
}

.pickCardOrder .span1 {
  width: 100px;
  position: relative;
  background: red;
}

.pickCardOrder .span2 {
  width: 40px;
  position: relative;
  background: green;
}

.pickCardOrder .input {
  text-align: center;
  height: 26px;
  width: 100px;
  position: absolute;
  top: 0;
  left: 0;
  border: 1px solid #ccc;
  outline: none;
}

.pickCardOrder .button {
  height: 26px;
  width: 40px;
  font: normal 14px/14px "微软雅黑";
  background: #5daf34;
  color: #fff;
  outline: none;
}

.pickCardOrder .m-searchTab tr td:nth-child(1) {
  width: 60px;
  padding-left: 15px;
}

.pickCardOrder .iconMore {
  margin-bottom: 1px;
  display: inline-block;
  width: 0.14rem;
  height: 0.14rem;
  background: url("../../assets/images/more.png") no-repeat center;
  background-size: contain;
  vertical-align: middle;
  cursor: pointer;
}

.pickCardOrder .iconMore1 {
  -moz-transform: rotate(90deg);
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
  margin-bottom: 1px;
  display: inline-block;
  width: 0.14rem;
  height: 0.14rem;
  background: url("../../assets/images/more.png") no-repeat center;
  background-size: contain;
  vertical-align: middle;
  cursor: pointer;
}

.pickCardOrder .listSpan {
  display: inline-block;
  margin-top: 2px;
}

.pickCardOrder .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 150px;
}

.listHeader {
  display: flex;
}

.listHeader label:nth-child(1) {
  flex: 2;
  line-height: 40px;
}
.listHeader label:nth-child(2) {
  flex: 1;
  line-height: 40px;
}
.listHeader label:nth-child(3) {
  flex: 1;
  line-height: 40px;
}

.btnDownload {
  margin-top: 9px;
  outline: none;
  border-radius: 4px;
  background-color: #00aa01;
  border: 1px solid #00aa01;
  padding: 4px 10px;
  margin-right: 10px;
  color: #fff;
}

table.m-searchTab tr {
  height: 40px;
}
.m-input-modifyRemark{
  max-width:80px;
  border-radius:4px;
  border: 1px solid #eee;
}
</style>
