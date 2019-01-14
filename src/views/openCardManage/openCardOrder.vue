<template>
<section style="width:100%;height:100%">
  <div v-if="!off.details" class="openCardOrder">
    <div class="dls greyFont">
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark m-search-title black">搜索条件</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <div class="grid-content bg-purple-light">
            <el-col :xs="4" :sm="4" :md="3" :lg="2" :xl="2" class="m-form-radio f-ta-r">
              <label><span class="radioYes"><input type="radio" value="1" v-model="form.searchKind" checked="checked"><span></span></span><span class="text greyFont">订单号码：</span></label>
            </el-col>
            <el-col :xs="18" :sm="16" :md="9" :lg="8" :xl="8">
              <el-input v-model="orderId" size="small" maxlength=25 placeholder="请输入查询的订单号码"></el-input>
            </el-col>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <div class="grid-content bg-purple-light">
            <el-col :xs="4" :sm="4" :md="3" :lg="2" :xl="2" class="m-form-radio f-ta-r">
              <label><span class="radioYes"><input type="radio" value="2" v-model="form.searchKind" checked="checked"><span></span></span><span class="text greyFont">开卡号码：</span></label>
            </el-col>
            <el-col :xs="18" :sm="16" :md="9" :lg="8" :xl="8">
              <el-input v-model="openNum" size="small" maxlength=11 placeholder="请输入查询的开卡号码"></el-input>
            </el-col>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-col :xs="4" :sm="4" :md="3" :lg="2" :xl="2" class="m-form-radio f-ta-r">
            <label><span class="radioYes"><input type="radio" value="3" v-model="form.searchKind" checked="checked"><span></span></span><span class="text greyFont">操作时间：</span></label>
          </el-col>
          <el-col :xs="18" :sm="16" :md="20" :lg="18" :xl="8">
            <div class="block">
              <el-date-picker v-model="startTime" size="small" type="date" :clearable=false :editable=false style="border-radius:4px 0 4px 0" placeholder="选择开始时间">
              </el-date-picker><el-date-picker v-model="endTime" size="small" type="date" :clearable=false :editable=false placeholder="选择结束时间">
              </el-date-picker>
            </div>
          </el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col ors:xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <div class="grid-content bg-purple-light">
            <el-col :xs="4" :sm="4" :md="3" :lg="4" :xl="4">
              <div class="grid-content bg-purple-dark f-ta-r inputTitle">开卡结果：</div>
            </el-col>
            <el-col :xs="18" :sm="16" :md="20" :lg="16" :xl="16">
              <el-radio v-model="openRes" label="1,2,3">全部</el-radio>
              <el-radio v-model="openRes" label="1">处理中</el-radio>
              <el-radio v-model="openRes" label="2">成功</el-radio>
              <el-radio v-model="openRes" label="3">失败</el-radio>
            </el-col>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <el-col :xs="4" :sm="4" :md="3" :lg="4" :xl="4">
            <div class="grid-content bg-purple-dark f-ta-r inputTitle">操作人：</div>
          </el-col>
          <el-col :xs="18" :sm="16" :md="17" :lg="16" :xl="16">
            <el-input v-model="operator" size="small" maxlength=20 placeholder="请输入查询的操作人姓名"></el-input>
          </el-col>
          <el-col :span="2"></el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col ors:xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <div class="grid-content bg-purple-light">
            <el-col :xs="4" :sm="4" :md="3" :lg="4" :xl="4">
              <div class="grid-content bg-purple-dark f-ta-r inputTitle">开卡方式：</div>
            </el-col>
            <el-col :xs="18" :sm="16" :md="17" :lg="16" :xl="16">
              <el-radio v-model="openType" label="1,2,3">全部</el-radio>
              <el-radio v-model="openType" label="1,2">APP</el-radio>
              <el-radio v-model="openType" label="3">WEB</el-radio>
            </el-col>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <el-col :xs="4" :sm="4" :md="3" :lg="4" :xl="4">
            <div class="grid-content bg-purple-dark f-ta-r inputTitle">商户名称：</div>
          </el-col>
          <el-col :xs="18" :sm="16" :md="17" :lg="16" :xl="16">
            <el-input v-model="dealerName" size="small" maxlength=20 placeholder="请输入查询的商户名称"></el-input>
          </el-col>
          <el-col :span="2"></el-col>
        </el-col>
      </el-row>
      <el-row class="marginTop">
          <el-col :span="24">
            <div class="grid-content bg-purple-light">
              <el-col :xs="4" :sm="3" :md="3" :lg="2" :xl="2">
                <div class="grid-content bg-purple-dark f-ta-r inputTitle">品牌：</div>
              </el-col>
              <el-col :xs="20" :sm="21" :md="21" :lg="22" :xl="22">
                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                  <el-checkbox text-color="#48576a" style="display:inline;margin-right:15px" :indeterminate="isIndeterminate" v-model="checkAll"
                    @change="handleCheckAllChange">全选</el-checkbox>
                  <el-checkbox-group style="display:inline" v-model="checkBrands" @change="handleCheckedCitiesChange">
                    <el-checkbox v-for="brand in brands" :label="brand.id" :key="brand.id">{{brand.brand}}</el-checkbox>
                  </el-checkbox-group>
                </el-col>
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
          <table class="m-searchTab" style="width:100%;height:100%;">
            <tr>
              <td colspan="9">
                <div class="listHeader">
                  <label style="text-align:left;padding-left:20px;">订单列表<span class="f-fw greyFont">({{form.page||'0'}})</span></label>
                  <b style="text-align:right;padding-right:20px;"><button v-if="searchResult.length>0" class="btnDownload" @click="downLoad">导出</button></b>
                </div>
              </td>
            </tr>
            <tr class="f-s-14">
              <td>序号</td>
              <td>订单号码</td>
              <td>开卡号码</td>
              <td>操作人手机号</td>
              <td>操作人姓名</td>
              <td>开卡时间</td>
              <td>开卡结果</td>
              <td>开卡方式</td>
              <td>用户姓名</td>
            </tr>
            <tr v-for="(v,i) of searchResult" :key="i">
              <td>{{((pa-1)*15+(i+1))}}</td>
              <td @click="details(v)"><a href="javascript:void(0)">{{v.sysOrderId||'--'}}</a> </td>
              <td>{{v.phone||'--'}}</td>
              <td>{{v.operatorPhone||'--'}}</td>
              <td>{{v.operatorName||'--'}}</td>
              <td>{{getDateTime(v.createTime)[6]}}</td>
              <td>
                <span :class="v.openCardResult==2?'green':v.openCardResult==3?'red':''">{{translateData(6,v.openCardResult)}}</span>
              </td>
              <td>{{translateData(5,v.terminalType)}}</td>
              <td> {{v.idcardName||'--'}} </td>
            </tr>
            <tr v-if="searchResult.length<=0">
              <td colspan="12">暂无数据</td>
            </tr>
          </table>
        </div>
        <div class="m-listTitleFoot" v-if="searchResult.length>0">
          <el-row>
            <el-col ors:xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <div class="grid-content bg-purple">
                <el-pagination layout="prev, pager, next" :page-size="15" @current-change="search" :current-page.sync="currentPage" :total="form.page">
                </el-pagination>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
  <order-details v-if="off.details" :detailsData="productDetails"></order-details>
</section>
</template>

<script>
import {
  disableTimeRange6,
  errorDeal,
  getDateTime,
  trimFunc,
  getTimeFunction,
  translateData,
  getStore,
} from "../../config/utils";
import {
  requestOpenCardOrder,
  requestOpenCardDetails,
  exportOpenCard
} from "../../config/service.js";
import orderDetails from "./orderDetails";
import Base64 from "../../config/utils/base64.js";
const brands=[{brand:"远特",id:1},{brand:"苏宁互联",id:8},{brand:"国美",id:9}];
const allChecked=[1,8,9];
export default {
  data() {
    return {
      currentPage: 0,
      searchResult: "",
      productDetails: {}, //产品包详情
      pa: 1, //页码
      endTime: "",
      startTime: "", //时间
      dealerName: "", //商户名称
      orderId: "", //订单号码
      openNum: "", //开卡号码
      operator: "", //操作人
      openRes: "1,2,3", //开卡结果
      openType: "1,2,3", //开卡方式
      searchJson: {},
      checkAll:true,
      isIndeterminate: false,
      off: {
        details: false,
        layer: false
      },
      form: {
        page: 0,
        searchKind: 3
      },
      checkBrands:[1,8,9], 
      brands: brands, 
      allChecked:allChecked
    };
  },
  created: function () {
    getTimeFunction(this);
  },
  components: {
    "order-details": orderDetails
  },
  methods: {
    search(index) {
      //查询
      let vm = this,
        data = {};
      vm.searchResult = "";
      vm.currentPage = index || 1;
      vm.pa = index || 1;
      if (vm.form.searchKind == 1) {
        if (vm.orderId == "") {
          layer.open({
            content: "请输入要查询的订单号码",
            skin: "msg",
            time: 2,
            msgSkin: "error"
          });
          return false;
        }
        data = {
          sysOrderId: trimFunc(vm.orderId),
          pageNum: index || 1,
          pageSize: 15
        };
      } else if (vm.form.searchKind == 2) {
        if (vm.openNum == "") {
          layer.open({
            content: "请输入要查询的产品名称",
            skin: "msg",
            time: 2,
            msgSkin: "error"
          });
          return false;
        }
        data = {
          openCardPhone: trimFunc(vm.openNum),
          pageNum: index || 1,
          pageSize: 15
        };
      } else if (vm.form.searchKind == 3) {
        data = {
          startTime: new Date(vm.startTime).getTime(),
          endTime: new Date(vm.endTime).getTime(),
          openCardResult: vm.openRes,
          terminalType: vm.openType,
          operatorName: trimFunc(vm.operator),
          dealerName: trimFunc(vm.dealerName),
          brand:vm.checkBrands.join(','),
          pageNum: index || 1,
          pageSize: 15
        };
      }
      vm.searchJson = data;
      requestOpenCardOrder(data)
        .then(data => {
          if (data.code == 200) {
            vm.form.page = data.data.total;
            vm.searchResult = data.data.orders;
          } else {
            vm.form.page = "";
            vm.searchResult = "";
            errorDeal(data);
          }
        })
        .catch(e =>
          errorDeal(e, () => {
            vm.form.page = "";
            vm.searchResult = "";
          })
        );
    },
    downLoad() {
      let vm = this,
        userInfo = getStore("YFD_NMS_INFO"),
        json = Object.assign(vm.searchJson, userInfo);
      delete json.pageNum;
      delete json.pageSize;
      exportOpenCard(json, () => {
        return 'down'
      })
    },
    details(v) {
      let vm = this;
      vm.off.details = true;
      requestOpenCardDetails({
        sysOrderId: v.sysOrderId
      })
      .then(data => {
        vm.productDetails = data.data;
      })
      .catch(e => errorDeal(e));
    },
    handleCheckAllChange(val) {
      this.checkBrands = val ? this.allChecked : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.brands.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.brands.length;
    },
    getDateTime(e) {
      return getDateTime(e);
    },
    trimFunc(v) {
      return trimFunc(v);
    },
    translateData(v, i) {
      return translateData(v, i);
    }
  }
};
</script>

<style>
.openCardOrder .input {
  text-align: center;
  height: 26px;
  width: 100px;
  position: absolute;
  top: 0;
  left: 0;
  border: 1px solid #ccc;
  outline: none;
}

.openCardOrder .button {
  height: 26px;
  width: 40px;
  font: normal 14px/14px "微软雅黑";
  background: #5daf34;
  color: #fff;
  outline: none;
}

.openCardOrder .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 150px;
}

.listHeader {
  display: flex;
}

.listHeader label {
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
</style>
