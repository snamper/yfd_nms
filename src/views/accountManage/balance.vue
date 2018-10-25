<template>
  <section ref="sec">
    <div class="m-details-page">
      <p class="m-head-title">
        <label>账户余额</label>
        <label><a @click="back()">返回列表</a></label>
      </p>
    </div>
    <div class="dls greyFont">
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark searchTitleStyle black">搜索条件</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <div class="grid-content bg-purple">
            <el-col :xs="4" :sm="3" :md="3" :lg="4" :xl="4">
              <div class="grid-content bg-purple-dark textR inputTitle">选择时间：</div>
            </el-col>
            <el-col :xs="20" :sm="18" :md="18" :lg="18" :xl="18">
              <div class="displayInline">
                <el-date-picker v-model="startTime" size="small" type="datetime" :clearable=false :editable=false
                  :picker-options="pickerOptionsS" placeholder="选择开始时间">
                </el-date-picker><el-date-picker v-model="endTime" size="small" type="datetime" :clearable=false :editable=false
                  :picker-options="pickerOptionsE" placeholder="选择结束时间">
                </el-date-picker>
              </div>
            </el-col>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <div class="grid-content bg-purple-light">
            <el-col :xs="4" :sm="3" :md="3" :lg="4" :xl="4">
              <div class="grid-content bg-purple-dark textR inputTitle">操作人：</div>
            </el-col>
            <el-col :xs="19" :sm="19" :md="16" :lg="18" :xl="18">
              <el-input v-model="opId" size="small" placeholder="请输入查询的操作人姓名" :maxlength="30"></el-input>
            </el-col>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <div class="grid-content bg-purple-light">
            <el-col :xs="4" :sm="3" :md="3" :lg="2" :xl="2">
              <div class="grid-content bg-purple-dark textR inputTitle">操作类型：</div>
            </el-col>
            <el-col :xs="19" :sm="19" :md="19" :lg="18" :xl="18">
              <el-checkbox v-model="checkListAll" @change="BtnCheckAllCardType">全部</el-checkbox>
              <el-checkbox-group v-model="opType" class="displayInline">
                <el-checkbox label="1">充值</el-checkbox>
                <el-checkbox label="2">开卡</el-checkbox>
                <el-checkbox label="3">提卡</el-checkbox>
                <el-checkbox label="4">代充</el-checkbox>
                <el-checkbox label="5">话分佣金转入</el-checkbox>
                <el-checkbox label="6">话分佣金转出</el-checkbox>
                <el-checkbox label="7">激励佣金转入</el-checkbox>
                <el-checkbox label="8">激励佣金转出</el-checkbox>
              </el-checkbox-group>
            </el-col>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <div class="grid-content bg-purple-light">
            <div class="grid-content bg-purple-light">
              <el-col :xs="4" :sm="3" :md="3" :lg="2" :xl="2">
                <div class="grid-content bg-purple-dark textR inputTitle">充值状态：</div>
              </el-col>
              <el-col :xs="16" :sm="16" :md="14" :lg="16" :xl="16">
                <el-radio v-model="orderState" label="1,2">全部</el-radio>
                <el-radio v-model="orderState" label="1">成功</el-radio>
                <el-radio v-model="orderState" label="2">失败</el-radio>
              </el-col>
              <el-col :xs="1" :sm="1" :md="4" :lg="4" :xl="4"></el-col>
            </div>
          </div>
        </el-col>
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
            <p>
              <h3>订单列表<span class="fontWeight greyFont">({{total||'0'}})</span></h3>
            </p>
          </el-row>
        </div>
        <div class="detailsListDiv">
          <table class="searchTab" style="width:100%;height:100%;">
            <tr>
              <td>序号</td>
              <td>订单号码</td>
              <td>操作时间</td>
              <td>商户名称</td>
              <td>操作人姓名</td>
              <td>操作类型</td>
              <td>账户余额（元）</td>
              <td>操作金额（元）</td>
              <td>开卡/代充号码</td>
              <td>操作结果</td>
            </tr>
            <tr v-for="(v,i) in searchList" :key="i">
              <td>{{(currentPage-1)*15+(i+1)}}</td>
              <td>{{v.sysOrderId||'--'}}</td>
              <td>{{getDateTime(v.createTime)[6]}}</td>
              <td>{{v.departName||'--'}}</td>
              <td>{{v.userName||'--'}}</td>
              <td>{{translate(4,v.operateType)}}</td>
              <td>{{translateData('fenToYuan',v.balance)}}</td>
              <td>{{translateData('fenToYuan',v.cost)}}</td>
              <td>{{v.phone}}</td>
              <td :class="v.state==1?'fcgreen':v.state==2?'fcred':'--'">{{v.state==1?'成功':v.state==2?'失败':'--'}}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <div class="listTitleFoot" v-if="searchList">
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-pagination layout="prev, pager, next" :page-size="15" @current-change="search" :current-page.sync="currentPage"
              :total="total">
            </el-pagination>
          </div>
        </el-col>
        <el-col :span="12">
        </el-col>
      </el-row>
    </div>
  </section>
</template>
<script>
  import {getTimeFunction,errorDeal,translateData,getDateTime} from "../../config/utils";
  import {getBalance} from "../../config/service.js";
  export default {
    props: {list:Object},
    data() {
      return {
        searchList: false,
        total: 0,
        currentPage: "",
        startTime: "",
        endTime: "",
        opId: "",
        opType: ["1", "2", "3", "4", "5", "6","7","8"],
        orderState: "1,2",
        checkListAll:true,
        pageSize:15,
        pickerOptionsS: {
          disabledDate(time) {
            let curDate = new Date().getTime();
            let curYear = new Date(curDate).getFullYear();
            let curMonth = new Date(curDate).getMonth() + 1,
              minMonth = curMonth - 5,
              minYear = curYear;
            if (minMonth < 0) {
              minMonth += 12;
              minYear = curYear - 1;
            }
            let curDay = new Date(curDate).getDate() + 1;
            let nextMonth = curMonth + 1;
            let cur = minYear + "/" + minMonth + "/1";
            let next = curYear + "/" + nextMonth + "/1";
            let nextYesterday = new Date(next) - 1000 * 3600 * 24;
            cur = new Date(cur).getTime();
            return time.getTime() > nextYesterday || time.getTime() < cur;
          }
        },
        pickerOptionsE: {
          disabledDate(time) {
            let curDate = new Date().getTime();
            let curYear = new Date(curDate).getFullYear();
            let curMonth = new Date(curDate).getMonth() + 1,
              minMonth = curMonth - 5,
              minYear = curYear;
            if (minMonth < 0) {
              minMonth += 12;
              minYear = curYear - 1;
            }
            let curDay = new Date(curDate).getDate() + 1;
            let nextMonth = curMonth + 1;
            let cur = minYear + "/" + minMonth + "/1";
            let next = curYear + "/" + nextMonth + "/1";
            let nextYesterday = new Date(next) - 1000 * 3600 * 24;
            cur = new Date(cur).getTime();
            return time.getTime() > nextYesterday || time.getTime() < cur;
          }
        },
      }
    },
    created: function () {
      getTimeFunction(this);
    },
    watch:{
      opType() {
        if (this.opType.length == 8) {
          this.checkListAll = true;
        } else {
          this.checkListAll = false;
        }
      }
    },
    methods: {
      search(p) {
        if(this.opType.length==0){
          layer.open({
            content: '请选择查询的操作类型',
            skin: 'msg',
            time: 2,
            msgSkin: 'error',
          });
          return false;
        }
        let vm = this,
          data = {
            "startTime": new Date(vm.startTime).getTime(),
            "endTime": new Date(vm.endTime).getTime(),
            "userName": vm.opId,
            "operateType": vm.opType.join(','),
            "state": vm.orderState,
            "pageNum": p||1,
            "pageSize": vm.pageSize
          };
        getBalance(data)
          .then((data) => {
            vm.searchList = data.data.list;
            vm.total = data.data.total;
            vm.currentPage = p || 1;
          }).catch(e => errorDeal(e))
      },
      back() {
        let vm = this;
        vm.$parent.off.list = true;
        vm.$parent.off.balance = false;
        vm.$parent.off.commission = false;
        vm.$parent.off.commissionWithdrawal = false;
      },
      BtnCheckAllCardType() {
        if (this.checkListAll == true) {
          this.opType = ["1", "2", "3", "4", "5", "6","7","8"]
        } else {
          this.opType = []
        }
      },
      getDateTime(v){
        return getDateTime(v)
      },
      translateData(v, i) {
        return translateData(v, i)
      },
      translate(type, v) {
        switch (type) {
          case 1:
            return v == 1 ? "支付宝" : v == 2 ? "微信" : v == 3 ? "账户" : v == 4 ? "线下支付" : v == 5 ? "支付宝第三方" : v == 6 ?
              "微信第三方" : "--";
            break;
          case 2:
            return v == 1 ? "支付中" : v == 2 ? "成功" : v == 3 ? "失败" : "--";
            break;
          case 3:
            return v == 1 ? "IOS" : v == 2 ? "Android" : v == 3 ? "WEB" : "--";
            break;
          case 4:
            let list = ['充值','开卡','提卡','代充','话分佣金转入','话分佣金转出','激励佣金转入','激励佣金转出']
            return list[v-1];
            break;
          case 5:
            return v==1?'成功':v==2?'失败':'--';
            break;
          default:
            break;  
          }
      }
    }
  }
</script>
<style scoped>
  .m-head-title {
    height: 45px;
    border-bottom: 1px solid #ccc;
    width: 98%;
    margin-left: 1%;
    display: flex
  }

  .m-head-title label {
    flex: 1;
    line-height: 45px;
  }

  .m-head-title label:nth-child(2) {
    text-align: right;
    margin-right: 1%;
   
  }

  .m-head-title label:nth-child(2) a {
    line-height: 45px;
    color: #43AAD4;
    cursor: pointer;
  }
</style>
