<template>
  <section>
    <div v-if="!off.details" class="pickCardOrder">
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
                <label><span class="radioYes"><input type="radio" value="2" v-model="form.searchKind" checked="checked"><span></span></span><span class="text greyFont">产品名称：</span></label>
              </el-col>
              <el-col :xs="18" :sm="16" :md="9" :lg="8" :xl="8">
                <el-input v-model="pname" size="small" maxlength=10 placeholder="请输入查询的产品名称"></el-input>
              </el-col>
              &nbsp;( <el-checkbox-group v-model="cardType" class="f-display-ib">
                <el-checkbox label="1">整号段</el-checkbox>
                <el-checkbox label="2">靓号包</el-checkbox>
                <el-checkbox label="3">普号包</el-checkbox>
              </el-checkbox-group> )
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
                ( <el-radio v-model="timeType" label="1">创建时间</el-radio>
                <el-radio v-model="timeType" label="2">修改时间</el-radio> )
              </div>
            </el-col>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
            <el-col :xs="4" :sm="4" :md="3" :lg="4" :xl="4">
              <div class="grid-content bg-purple-dark f-ta-r inputTitle">商户名称：</div>
            </el-col>
            <el-col :xs="18" :sm="16" :md="17" :lg="16" :xl="16">
              <el-input v-model="dealerName" size="small" maxlength=20 placeholder="请输入查询的商户名称"></el-input>
            </el-col>
            <el-col :span="2"></el-col>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
            <el-col :xs="4" :sm="4" :md="3" :lg="4" :xl="4">
              <div class="grid-content bg-purple-dark f-ta-r inputTitle">操作人：</div>
            </el-col>
            <el-col :xs="18" :sm="16" :md="17" :lg="16" :xl="16">
              <el-input v-model="operator" size="small" maxlength=20 placeholder="请输入查询的操作人手机号"></el-input>
            </el-col>
            <el-col :span="2"></el-col>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
            <el-col :xs="4" :sm="4" :md="3" :lg="4" :xl="4">
              <div class="grid-content bg-purple-dark f-ta-r inputTitle">用户号码：</div>
            </el-col>
            <el-col :xs="18" :sm="16" :md="17" :lg="16" :xl="16">
              <el-input v-model="userPhone" size="small" maxlength=11 placeholder="请输入查询的用户手机号码"></el-input>
            </el-col>
            <el-col :span="2"></el-col>
          </el-col>
          <el-col ors:xs="24" :sm="24" :md="24" :lg="12" :xl="12">
            <div class="grid-content bg-purple-light">
              <el-col :xs="4" :sm="4" :md="3" :lg="4" :xl="4">
                <div class="grid-content bg-purple-dark f-ta-r inputTitle">当前状态：</div>
              </el-col>
              <el-col :xs="18" :sm="16" :md="20" :lg="16" :xl="16">
                <el-radio v-model="orderState" label="0">全部</el-radio>
                <el-radio v-model="orderState" label="1">未发货</el-radio>
                <el-radio v-model="orderState" label="2">已发货</el-radio>
                <el-radio v-model="orderState" label="3">已完成</el-radio>
              </el-col>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col ors:xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <div class="grid-content bg-purple-light">
              <el-col :xs="4" :sm="4" :md="3" :lg="2" :xl="2">
                <div class="grid-content bg-purple-dark f-ta-r inputTitle">支付方式：</div>
              </el-col>
              <el-col :xs="18" :sm="16" :md="21" :lg="20" :xl="20">
                <el-radio v-model="payMent" label="0">全部</el-radio>
                <el-radio v-model="payMent" label="1">支付宝</el-radio>
                <el-radio v-model="payMent" label="2">微信</el-radio>
                <el-radio v-model="payMent" label="3">账户支付</el-radio>
                <el-radio v-model="payMent" label="4">线下支付</el-radio>
                <el-radio v-model="payMent" label="5">支付宝（威富通）</el-radio>
                <el-radio v-model="payMent" label="6">微信（威富通）</el-radio>
              </el-col>
            </div>
          </el-col>
        </el-row>
        <!-- <el-row> <el-col ors:xs="24" :sm="24" :md="24" :lg="12" :xl="12"><div class="grid-content bg-purple-light"> <el-col :xs="4" :sm="4" :md="3" :lg="4" :xl="4"><div class="grid-content bg-purple-dark f-ta-r inputTitle">售卖方式：</div></el-col> <el-col :xs="18" :sm="16" :md="17" :lg="16" :xl="16"> <el-radio v-model="splitCheck"  label="1,2">全部</el-radio> <el-radio v-model="splitCheck"  label="2">拆包</el-radio> <el-radio v-model="splitCheck"  label="1">不可拆包</el-radio> </el-col> </div></el-col> </el-row> -->
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
                    <label style="text-align:left;padding-left:5px;">订单列表<span class="f-fw greyFont">({{form.page||'0'}})</span></label>
                    <label style="text-align:right;padding-right:20px;"><button v-if="searchResult.length>0" @click="downLoad" class="btnDownload">导出</button></label>
                  </div>
                </td>
              </tr>
              <tr class="f-s-14">
                <td>序号</td>
                <td>订单号码</td>
                <td>创建时间</td>
                <td>商户名称</td>
                <td>所属渠道</td>
                <td>产品包</td>
                <td>付款金额(元)</td>
                <td>提卡人</td>
                <td>售卖方式</td>
                <td>付款方式</td>
                <td>订单状态</td>
                <td>物流单号</td>
                <td>状态变更人</td>
                <td>操作</td>
              </tr>
              <tr v-for="(v,i) of searchResult" :key="i">
                <td>{{((pa-1)*15+(i+1))}}</td>
                <td @click="details(v)"><a href="javascript:void(0)">{{v.sysOrderId||'--'}}</a> </td>
                <td>{{v.createTime.split(' ')[0]}}</td>
                <td>{{v.userName||'--'}}</td>
                <td>
                  <a :href="v.dealerIdName?'#/home/organization/yfd?dealerName='+v.dealerIdName:'javascript:void(0)'">{{v.dealerIdName||'--'}}</a>
                </td>
                <td>
                  <p v-if="v.isShow==true&&v.productList.length>0" class="abcd" v-for="(x,y) in v.productList" :key="y">
                    <span class="listSpan">{{x.productName}}</span>
                    <i v-if="v.isShow&&v.productList.length>1&&y==0" @click="getMore(i)" class="iconMore1"></i>
                  </p>
                  <p v-if="!v.isShow&&v.productList.length>0" class="abcd">
                    <span>{{v.productList[0].productName}}</span> <i v-if="v.productList.length>1" @click="getMore(i)" class="iconMore"></i>
                  </p>
                </td>
                <td>{{Math.formatFloat(parseFloat(v.totalStrikePrice/100),2) }}</td>
                <td>
                  <span>{{v.agentName||'--'}}</span>
                </td>
                <td><span>{{sealType(v.productList)}}</span></td>
                <td>
                  <span v-if="v.paymentType==0">未付款</span>
                  <span v-if="v.paymentType==1">支付宝</span>
                  <span v-if="v.paymentType==2">微信</span>
                  <span v-if="v.paymentType==3">账户支付</span>
                  <span v-if="v.paymentType==4">线下支付</span>
                  <span v-if="v.paymentType==5">支付宝(威富通)</span>
                  <span v-if="v.paymentType==6">微信(威富通)</span>
                </td>
                <td>
                  <span :class="checkOrderStatus(v).style">
                    {{checkOrderStatus(v).title}}
                  </span>
                </td>
                <td>
                  <a @click="searchdelivery(v.deliveryName,v.deliveryOrderId)" href="javascript:void(0)">{{v.deliveryName}}{{v.deliveryOrderId||'--'}}</a>
                </td>
                <td>{{v.operatorName||'--'}}</td>
                <td>
                  <el-button v-if="v.paymentState==2&&v.deliveryState == 1&&v.returnFlag!=1" class="m-small-btn" style="margin:5px;" @click="deliverGoods(v)">发货</el-button>
                  <el-button v-if="v.paymentState==2&&v.deliveryState == 2&&v.orderState == 1&&v.returnFlag!=1" class="m-small-btn" style="margin:5px;" @click="changeLogisticsInfo(v)">修改单号</el-button>
                  <el-button v-if="v.paymentState==2&&v.deliveryState == 2&&v.orderState == 1&&v.returnFlag!=1" class="m-small-btn" style="margin:5px;" @click="confirm(v)">确认收货</el-button>
                  <el-button v-if="v.paymentState == 1&&v.orderState == 1&&v.paymentType==4" class="m-small-btn" style="margin:5px;" @click="confirmPayMoney(v)">确认付款</el-button>
                  <el-button v-if="v.paymentState==2&&v.returnFlag!=1" class="m-small-btn" style="margin:5px;" @click="returnGoods(v)">退卡</el-button>
                </td>
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
    <layer-confirm v-if="off.layer" :layerType="layerType" :logisticsInfo="logistics"></layer-confirm>
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
  cloneObj
} from "../../config/utils";
import { requestPickupOrder } from "../../config/service.js";
import { disabledDate } from "../../config/utilsTimeSelect";
import orderDetails from "./orderDetails";
import layerConfirm from "../../components/layerConfirm";
export default {
  data() {
    return {
      currentPage: 0,
      searchResult: "",
      layerType: "", //弹窗类型
      logistics: {}, //物流信息
      productDetails: {}, //产品包详情
      pa: 1, //页码
      orderId: "", //订单号码
      pname: "", //产品名称
      dealerName: "", //商户名称
      operator: "", //操作人
      optime: "", //操作时间
      timeType: "1", //操作时间类型
      orderState: "0", //操作类型
      cardType: ["1", "2", "3"], //产品类型
      splitCheck: "1,2", //售卖方式
      payMent: "0", //支付方式
      startTime: "",
      endTime: "",
      downLoadJson: "",
      userPhone: "",
      off: {
        details: false,
        layer: false
      },
      form: {
        page: 0,
        searchKind: 3
      }
    };
  },
  created: function() {
    getTimeFunction(this);
  },
  components: {
    "order-details": orderDetails,
    "layer-confirm": layerConfirm
  },
  methods: {
    search(index) {
      let vm = this,
        data = {};
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
        }else{
          data = {
            searchType: vm.form.searchKind,
            sysOrderId: vm.orderId,
            productName: "",
            productType: "",
            timeType: "",
            startTime: "",
            endTime: "",
            orderState: "",
            depName: "",
            operatorPhone: "",
            paymentType: "",
            pageNum: index||1,
            pageSize: 15,
            userPhone: ""
          };
        }
      } else if (vm.form.searchKind == 2) {
        if (vm.pname == "") {
          layer.open({
            content: "请输入要查询的产品名称",
            skin: "msg",
            time: 2,
            msgSkin: "error"
          });
          return false;
        }else{
          data = {
            searchType: vm.form.searchKind,
            productName: vm.pname,
            productType: vm.cardType.join(","),
            sysOrderId: "",
            timeType: "",
            startTime: "",
            endTime: "",
            orderState: "",
            depName: "",
            operatorPhone: "",
            paymentType: "",
            pageNum: index||1,
            pageSize: "15",
            userPhone: ""
          };
        }
      }else{
        data = {
          sysOrderId: "",
          productName: "",
          productType: "",
          searchType: vm.form.searchKind,
          timeType: vm.timeType,
          startTime: new Date(vm.startTime).getTime(),
          endTime: new Date(vm.endTime).getTime(),
          orderState: vm.orderState,
          depName: vm.dealerName,
          operatorPhone: vm.operator,
          paymentType: vm.payMent,
          pageNum: index || 1,
          pageSize: 15,
          userPhone: vm.userPhone
        };
      }
      vm.downLoadJson = cloneObj(data);
      requestPickupOrder(data)
        .then(data => {
          if (data.code == 200) {
            vm.form.page = data.data.total;
            vm.searchResult = data.data.list;
          } else {
            vm.form.page = "";
            vm.searchResult = "";
            errorDeal(data);
          }
        }).catch(e =>
          errorDeal(e, () => {
            vm.form.page = "";
            vm.searchResult = "";
          })
        );
    },
    downLoad() {
      let vm = this,
        parameter = "",
        url = "/nms/w/order/exportPurchase?",
        userInfo = getStore("YFD_NMS_INFO");
      let json = Object.assign(vm.downLoadJson, userInfo);
      delete json.pageNum;
      delete json.pageSize;
      Object.keys(json).map(key => {
        url += key + "=" + json[key] + "&";
      });
      url = url.substring(0, url.length - 1);
      // window.location.href=url;
      url = url.substring(0, url.length - 1);
      var elemIF = document.createElement("iframe");
      elemIF.src = url;
      var ee = elemIF.contentWindow;
      elemIF.style.display = "none";
      document.body.appendChild(elemIF);
    },
    details(v) {
      let vm = this;
      vm.off.details = true;
      vm.productDetails = v;
    },
    confirm(v) {
      let vm = this,
        data = {};
      vm.layerType = "takeGoods";
      vm.logistics = v;
      vm.off.layer = true;
    },
    sealType(v) {
      let vm = this;
      if (v instanceof Array) {
        if (v.length === 1) {
          return v[0].splitFlag == 1
            ? "整包"
            : v[0].splitFlag == 2
              ? "拆包"
              : "--";
        } else if (v.length > 1) {
          return v.every((value, i, v) => {
            return value.splitFlag == 1;
          })
            ? "整包"
            : v.every((value, i, v) => {
                return value.splitFlag == 2;
              })
              ? "拆包"
              : "混合";
        }
      }
    },
    deliverGoods(v) {
      let vm = this;
      vm.layerType = "sendGoods";
      vm.logistics = v;
      vm.off.layer = true;
    },
    changeLogisticsInfo(v) {
      let vm = this;
      vm.layerType = "logistics";
      vm.logistics = v;
      vm.off.layer = true;
    },
    confirmPayMoney(v) {
      let vm = this;
      vm.layerType = "payMent";
      vm.logistics = v;
      vm.off.layer = true;
    },
    returnGoods(v) {
      let vm = this;
      vm.layerType = "returnGoods";
      vm.logistics = v;
      vm.off.layer = true;
    },
    getMore(i) {
      let vm = this;
      this.$set(vm.searchResult[i], "isShow", !vm.searchResult[i].isShow);
    },
    checkOrderStatus(v) {
      var orderState = "";
      if (v.paymentState == 1 && v.orderState == 1) {
        return (orderState = {
          title: "待付款",
          style: "red"
        });
      }
      if (v.paymentState == 1 && v.orderState == 3) {
        return (orderState = {
          title: "手动关闭",
          style: "red"
        });
      }
      if (v.paymentState == 1 && v.orderState == 4) {
        return (orderState = {
          title: "自动关闭",
          style: "red"
        });
      }
      if (v.paymentState == 2 && v.returnFlag == 1) {
        return (orderState = {
          title: "已退卡",
          style: "red"
        });
      }
      if (v.deliveryState == 1) {
        return (orderState = {
          title: "待发货",
          style: "blue"
        });
      }
      if (v.deliveryState == 2) {
        return (orderState = {
          title: "已发货",
          style: "blue"
        });
      }
      if (v.orderState == 2) {
        return (orderState = {
          title: "已完成",
          style: "green"
        });
      }

      // return orderState;
    },
    searchdelivery(n, v) {
      let url = "https://www.kuaidi100.com/chaxun?com=" + n + "&nu=" + v;
      window.open(url);
    },
    getDateTime(e) {
      return getDateTime(e);
    },
    trimFunc(v) {
      return trimFunc(v);
    },
    cloneObj(v) {
      return cloneObj(v);
    }
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

table.m-searchTab tr {
  height: 40px;
}
</style>
