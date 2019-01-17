<template>
<section>
  <div class="allDetails">
    <div class="headTitle f-s-16">
      <span class="fl">订单详情</span><span><a href="javascript:void(0)" class="fr blue" @click="goBack()">返回列表</a></span>
    </div>
    <div class="m-box-list f-s-12">
      <el-row :span=24>
        <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="2"> &nbsp; </el-col>
        <el-col :xs="23" :sm="11" :md="11" :lg="11" :xl="10">
          <p class="f-lh-30"><span class="f-ls-1">订单号码&nbsp;：&nbsp;&nbsp;</span><span>{{detailsData.sysOrderId||'--'}}</span></p>
        </el-col>
        <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="2"> &nbsp; </el-col>
        <el-col :xs="23" :sm="11" :md="11" :lg="11" :xl="10">
          <p class="f-lh-30"><span class="f-ls-1">生成时间&nbsp;：&nbsp;&nbsp;</span><span>{{detailsData.createTime||'--'}}</span></p>
        </el-col>
      </el-row>
      <el-row :span="24">
        <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="2"> &nbsp; </el-col>
        <el-col :xs="23" :sm="11" :md="11" :lg="11" :xl="10">
          <p class="f-lh-30"><span class="f-ls-1">支付金额&nbsp;：&nbsp;&nbsp;</span><span>{{(detailsData.totalStrikePrice/100).toFixed(2)||'--'}}元</span></p>
        </el-col>
        <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="2"> &nbsp; </el-col>
        <el-col :xs="23" :sm="11" :md="11" :lg="11" :xl="10">
          <p class="f-lh-30"><span class="f-ls-1">修改时间&nbsp;：&nbsp;&nbsp;</span><span>{{detailsData.modifyTime||'--'}}</span></p>
        </el-col>
      </el-row>
      <el-row :span=24>
        <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="2"> &nbsp; </el-col>
        <el-col :xs="23" :sm="11" :md="11" :lg="11" :xl="10">
          <p class="f-lh-30"><span class="f-ls-1">下单备注&nbsp;：&nbsp;&nbsp;</span><span>{{detailsData.remark||'--'}}</span></p>
        </el-col>
        <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="2"> &nbsp; </el-col>
        <el-col :xs="23" :sm="11" :md="11" :lg="11" :xl="10">
          <p class="f-lh-30"><span class="f-ls-1">收货地址&nbsp;：&nbsp;&nbsp;</span><span>{{detailsData.address||'--'}}</span></p>
        </el-col>
      </el-row>
      <el-row :span=24>
        <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="2"> &nbsp; </el-col>
        <el-col :xs="23" :sm="11" :md="11" :lg="11" :xl="10">
          <p class="f-lh-30"><span class="f-ls-1">售卖方式&nbsp;：&nbsp;&nbsp;</span><span>{{sealType(detailsData.productList)}}</span></p>
        </el-col>
        <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="2"> &nbsp; </el-col>
        <el-col :xs="23" :sm="11" :md="11" :lg="11" :xl="10">
          <p class="f-lh-30"><span class="f-ls-1">状态变更人&nbsp;：&nbsp;&nbsp;</span><span>{{detailsData.operatorName||'--'}}</span></p>
        </el-col>
      </el-row>
    </div>
    
  </div>
</section>
</template>

<script>
import {
  requestMethod,
  getPickCardSim,
  getPickCardNum
} from '../../config/service';
import {
  errorDeal,
  translateData
} from "../../config/utils";
export default {
  props: {
    detailsData: Object
  },
  data() {
    return {
      searchLiang: [],
      searchPu: [],
      newSearch: [],
      numdata: [],
      simdata: {},
      listname: "",
      off: {
        numList: false,
        simList: false,
        detailslist: false
      },
      numberTotal: {
        total: "",
        info: ""
      }
    }
  },
  methods: {
    details(p, v, i) {
      let vm = this,
        json;
      vm.off.simList = false;
      vm.off.numList = false;
      if (p == 1) {
        vm.listname = i.productName + '(' + i.total + ')个';
        if (v === 'sim') {
          json = {
            "numberId": i.numberId,
            "sysOrderId": i.sysOrderId,
          };
          vm.searchJson = json;
        } else if (v === 'num') {
          json = {
            "sysOrderId": i.sysOrderId,
            "numberId": i.numberId,
          };
          vm.searchJson = json;
        }
      }
      if (v === 'sim') {
        vm.off.simList = true;
        getPickCardSim(vm.searchJson)
          .then(res => {
            if (res && res.data) {
              vm.simdata = res.data;
            } else {
              errorDeal(res)
            }
          }).catch(e => errorDeal(e))
      } else if (v === 'num') {
        vm.off.numList = true;
        getPickCardNum(vm.searchJson)
          .then(res => {
            if (res && res.data) {
              vm.numdata = res.data.groups;
            } else {
              errorDeal(res)
            }
          }).catch(e => errorDeal(e))
      }
      vm.off.detailslist = true;
      vm.numberTotal.info = i;
    },
    sealType(v) {
      let vm = this;
      if (v instanceof Array) {
        if (v.length === 1) {
          return v[0].splitFlag == 1 ?
            "整包" : v[0].splitFlag == 2 ? "拆包" : "--";
        } else if (v.length > 1) {
          return v.every((value, i, v) => {
            return value.splitFlag == 1;
          }) ? "整包" : v.every((value, i, v) => {
            return value.splitFlag == 2;
          }) ? "拆包" : "混合";
        }
      }
    },
    goBack() {
      let vm = this;
      vm.$parent.off.details = false;
    },
    translateData(v, i) {
      return translateData(v, i)
    }
  }
}
</script>

<style scoped>
.headTitle {
  width: 96%;
  height: 28px;
  margin: 30px 30px 0px 30px;
}

.tab-container {
  width: 96%;
  margin: 10px 30px 20px 30px;
}

.zhenghaoduan table {
  border-collapse: collapse;
  width: 100%
}

.zhenghaoduan table tr td {
  border: 1px solid #d1d1d1;
  width: 25%
}

.zhenghaoduan table tr td:nth-child(even) {
  background: #ffffff;
  padding-left: 20px
}

.zhenghaoduan table tr td:nth-child(odd) {
  text-align: right;
  padding: 10px;
  width: 20%;
  color: grey
}

.m-box-list {
  width: 98%;
  height: auto;
  margin: 0 auto;
  border: 1px solid #e0e0e0;
  background: #fff;
  border-radius: 4px;
}

.m-box-list div.el-row {
  line-height: 30px;
}
</style>
