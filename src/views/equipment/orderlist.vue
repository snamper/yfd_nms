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
            <el-col :xs="4" :sm="4" :md="3" :lg="2" :xl="2" class="m-form-radio f-ta-r">
              <label><span class="radioYes"><input type="radio" value="2" v-model="form.searchKind" checked="checked"><span></span></span><span class="text greyFont">生成时间：</span></label>
            </el-col>
            <el-col :xs="18" :sm="16" :md="20" :lg="18" :xl="8">
              <div class="block">
                <el-date-picker v-model="startTime3" size="small" type="date" :clearable=false :editable=false style="border-radius:4px 0 4px 0" placeholder="选择开始时间">
                </el-date-picker><el-date-picker v-model="endTime" size="small" type="date" :clearable=false :editable=false placeholder="选择结束时间">
                </el-date-picker>
              </div>
            </el-col>
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
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
            <el-col :xs="4" :sm="4" :md="3" :lg="4" :xl="4">
              <div class="grid-content bg-purple-dark f-ta-r inputTitle">设备号码：</div>
            </el-col>
            <el-col :xs="18" :sm="16" :md="17" :lg="16" :xl="16">
              <el-input v-model="deviceNo" size="small" maxlength=20 placeholder="请输入查询的设备号码"></el-input>
            </el-col>
            <el-col :span="2"></el-col>
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
        <el-row>
          <el-col ors:xs="24" :sm="24" :md="24" :lg="12" :xl="12">
            <div class="grid-content bg-purple-light">
              <el-col :xs="4" :sm="4" :md="3" :lg="4" :xl="4">
                <div class="grid-content bg-purple-dark f-ta-r inputTitle">订单状态：</div>
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
                    <el-row>
                      <el-button size="mini" v-if="searchResult.length>0" @click="downLoad(1)" type="success">下载订单列表</el-button>
                      <el-button style="margin-right:10px" size="mini" v-if="searchResult.length>0" @click="downLoad(2)" type="success">批量下载发货单</el-button>
                    </el-row>
                  </div>
                </td>
              </tr>
              <tr class="f-s-14">
                <td>序号</td>
                <td>订单号码</td>
                <td>创建时间</td>
                <td v-if="false">设备号</td>
                <td>购买数量</td>
                <td>商户名称</td>
                <td>所属渠道</td>
                <td>操作人</td>
                <td>付款方式</td>
                <td>付款金额(元)</td>
                <td>订单状态</td>
                <td>物流单号</td>
                <td>备注</td>
                <td>已下载发货单</td>
                <td>操作</td>
              </tr>
              <tr v-for="(v,i) of searchResult" :key="i">
                <td>{{((currentPage-1)*15+(i+1))}}</td>
                <td @click="details(v)"><a href="javascript:void(0)">{{v.sysOrderId||'--'}}</a> </td>
                <td>{{getDateTime(v.createTime)[8]}}<br>{{getDateTime(v.createTime)[5]}}</td>
                <td v-if="false">
                  <p v-if="v.isShow&&v.productList.length>0" >
                    <b v-for="(x,y) in v.productList" :key="y">
                      <span class="listSpan">{{x.productName}}</span>
                      <i v-if="v.isShow&&v.productList.length>1&&y==0" @click="getMore(i)" class="iconMore1"></i>
                    </b>
                  </p>
                  <p v-if="!v.isShow&&v.productList.length>0">
                    <span>{{v.productList[0].productName}}</span> <i v-if="v.productList.length>1" @click="getMore(i)" class="iconMore"></i>
                  </p>
                </td>
                <td>{{v.amount}}</td>
                <td>{{v.userName||'--'}}<br>{{v.userPhone}}</td>
                <td>
                  <a :href="v.dealerIdName?'#/home/organization/yfd?dealerName='+v.dealerIdName:'javascript:void(0)'">{{v.dealerIdName||'--'}}</a>
                </td>
                <td>
                  <span v-if="v.agentFlag==1">
                    {{v.agentName||'--'}}<br>
                    {{v.agentPhone}}
                  </span>
                  <span v-if="v.agentFlag==0">
                    {{v.operatorName||'--'}}<br>
                    {{v.operatorPhone}}
                  </span>
                </td>
                <td>
                  <span v-if="v.paymentType==0">--</span>
                  <span v-if="v.paymentType==1">支付宝</span>
                  <span v-if="v.paymentType==2">微信</span>
                  <span v-if="v.paymentType==3">账户支付</span>
                  <span v-if="v.paymentType==4">线下支付</span>
                  <span v-if="v.paymentType==5">支付宝(威富通)</span>
                  <span v-if="v.paymentType==6">微信(威富通)</span>
                </td>
                <td>{{Math.formatFloat(parseFloat(v.price/100),2) }}</td>
                
                <td>
                  <span :class="checkOrderStatus(v).style">
                    {{checkOrderStatus(v).title}}
                  </span>
                </td>
                <td>
                  <a @click="searchdelivery(v.deliveryName,v.deliveryOrderId)" href="javascript:void(0)">
                    {{v.deliveryName}}-
                    {{v.deliveryOrderId}}</a>
                  <a @click="changeLogisticsInfo(v)" v-if="v.deliveryState==2">
                    {{v.deliveryOrderId?'编辑':'填写物流信息'}}
                  </a>
                </td>
                <td>
                  <span>{{v.remark||'--'}}</span>
                  <!-- <a v-if="upindex!=i" @click="modify('remark',v,i)" class="linka">编辑</a>
                  <input class="m-input-modifyRemark" v-if="upindex==i" type="text" v-model="newRemark">
                  <a v-if="upindex==i" @click="modify('remarkYes',v,i)" class="linka">确认</a> -->
                </td>
                <td>{{v.receipt==0?'未下载':v.receipt==1?'已下载':'--'}}</td>
                <td>
                  <el-button 
                    style="padding:2px;font-size:12px" @click="selectDevice(1,v)">选择设备</el-button>
                  <el-button 
                    style="padding:2px;font-size:12px" @click="deliverGoods(v,1)">发货</el-button>
                  <el-button 
                    style="padding:2px;font-size:12px" @click="takeGoods(v)">收货</el-button>
                  <el-button 
                    v-if="false"
                    style="padding:2px;font-size:12px" @click="confirmPayMoney(v)">确认付款</el-button>
                  <el-button 
                    style="padding:2px;font-size:12px" @click="returnGoods(v)">退卡</el-button>
                  <el-button 
                    style="padding:2px;font-size:12px" @click="downLoad(3,v.sysOrderId)">下载发货单</el-button>
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
      <div class="m-dialog-content">
        <el-dialog
          :title='"设备号列表（请选择"+max+"个设备号）"'
          :visible.sync="centerDialogVisible"
          width="50%"
          center>
          <el-checkbox-group 
            v-model="checkedDevice"
            :min="0"
            :max="max">
            <el-checkbox v-for="device in deviceList" :label="device.id" :key="device.deviceNo" border>{{device.deviceNo}}</el-checkbox>
            <el-row>
              <el-col ors:xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                <div class="grid-content bg-purple">
                  <el-pagination layout="prev, pager, next" :page-size="120" @current-change="selectDevice" :current-page.sync="currentPage" :total="total">
                  </el-pagination>
                </div>
              </el-col>
            </el-row>
          </el-checkbox-group>
          <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible=false">取 消</el-button>
            <el-button type="primary" @click="confirmBtn">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
    <order-details v-if="off.details" :detailsList="deviceDetailsList" :detailsData="productDetails"></order-details>
    <layer-confirm v-if="off.layer" :layerType="layerType" :logisticsInfo="logistics"></layer-confirm>
  </section>
</template>
<script>
import {
  getTimeFunction,
  errorDeal,
  getDateTime
} from "../../config/utils";
import { 
  getDeviceOrders,
  getDeviceOrderDetails,
  deviceDeliver,
  getStockDevices,
  releaseDevices,
  devicesInvoiceDownload,
  orderListDownload,
  deviceInvoiceDownload,
  deviceReceived,
  deviceReturn 
} from "../../config/service.js";
import layerConfirm from "../../components/layerConfirm";
import orderDetails from "./orderDetails";
import NProgress from 'nprogress';
export default {
  data() {
    return {
      max:3,
      devicePage:1,
      currentPage: 0,
      searchResult: "",
      layerType: "", //弹窗类型
      logistics: {}, //物流信息
      productDetails: {}, //产品包详情
      deviceDetailsList:[],
      orderId: "", //订单号码
      deviceNo: "", //操作人
      orderState: "0", //操作类型
      payMent: "0", //支付方式
      startTime3: "",
      endTime: "",
      userPhone: "",
      searchJson: "",
      upindex:0.1,
      deviceList:"",
      _sysOrderId:"",
      total:200,
      off: {
        details: false,
        layer: false,
        checkEquipment:true,
      },
      form: {
        page: 0,
        searchKind: 2
      },
      centerDialogVisible: false,
      checkedDevice:[],
    };
  },
  created: function() {
    getTimeFunction(this);
  },
  watch:{
    centerDialogVisible(){
      if(!this.centerDialogVisible){
        this.checkedDevice=[]
      }
    }
  },
  components: {
    "order-details": orderDetails,
    "layer-confirm": layerConfirm
  },
  methods: {
    search(index,i) {
      let vm = this,data;
      if(!i){
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
              "deviceNo": "",
              "endTime": "",
              "pageNum": index||1,
              "pageSize": 15,
              "paymentType": "",
              "startTime": "",
              "states": "",
              "sysOrderId": vm.orderId,
              "userPhone": ""
            };
          }
        } else if (vm.form.searchKind == 2) {    
          let _paymentType,_states;
            _paymentType = vm.payMent==0?"":vm.payMent;
            _states = vm.orderState==0?"":vm.orderState;
            data = {
              "deviceNo": vm.deviceNo,
              "endTime": new Date(vm.endTime).getTime(),
              "pageNum": index||1,
              "pageSize": 15,
              "paymentType": _paymentType,
              "startTime": new Date(vm.startTime3).getTime(),
              "states": _states,
              "sysOrderId": vm.orderId,
              "userPhone": vm.userPhone
            };
        }
        vm.searchJson = data;
      }
      getDeviceOrders(vm.searchJson)
        .then(res => {
          if (res&&res.data) {
            vm.currentPage = index || 1;
            vm.form.page = res.data.total;
            vm.searchResult = res.data.list;
          } else {
            vm.form.page = "";
            vm.searchResult = "";
            vm.searchJson="";
            errorDeal(res);
          }
        }).catch(e =>
          errorDeal(e, () => {
            vm.form.page = "";
            vm.searchResult = "";
          })
        );
    },
    details(v) {
      let vm = this;
      getDeviceOrderDetails({"sysOrderId":v.sysOrderId})
      .then(res=>{
        if(res&&res.data){
          vm.deviceDetailsList=res.data;
        }
      }).then(()=>{
        vm.productDetails = v;
        vm.off.details = true;
      }).catch(e=>errorDeal(e))
    },
    
    selectDevice(index,v) {
      let vm = this;
      getStockDevices({"pageNum":index||1,"pageSize":120})
      .then(res=>{
        if(res&&res.data){
          vm.deviceList = res.data.list;
          vm.total = res.data.total;
        }
      }).then(()=>{
        vm.centerDialogVisible=true;   
        if(v){
          vm._sysOrderId=v.sysOrderId;
          vm.max=v.amount;
        }
      }).catch(e=>errorDeal(e))
    },
    confirmBtn(){
      let vm=this,json;
      if(vm.checkedDevice.length!=vm.max){
        vm.$message.error('已选选择设备数量不正确，请重新选择');
        return false;
      }
      json={
        "id": vm.checkedDevice,
        "sysOrderId": vm._sysOrderId
      }
      releaseDevices(json)
      .then(res=>{
        if(res&&res.data){
          vm.$message({
            message:"操作成功",
            type:"success"
          })
          vm._sysOrderId="";
          vm.centerDialogVisible=false;
          vm.search(vm.currentPage,1);
        }
      })
    },
    deliverGoods(v,i){
      let vm = this;
      vm.layerType = "sendDevices";
      vm.logistics = v;
      vm.logistics.isDelivery = 1;
      vm.off.layer = true;
    },
    takeGoods(v) {
      let vm = this,
        data = {
          "sysOrderId": v.sysOrderId,
        };
      this.$confirm('是否确认收货?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deviceReceived(data)
        .then(res=>{
          if(res&&res.code==200){
            this.$message({
              type: 'success',
              message: '操作成功'
            });  
            vm.search(vm.currentPage,1);
          }
        }).catch(e=>errorDeal(e))
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '操作已取消'
        });          
      });
    },
    downLoad(i,v) {
      let vm = this,json;
      if(i==1){
        json = vm.searchJson;
        delete json.pageNum;
        delete json.pageSize;
        orderListDownload(json,()=>{return "down" })
      }else if(i==2){
        json = vm.searchJson;
        json.pageNum=vm.currentPage;
        json.pageSize=15;
        devicesInvoiceDownload(json,()=>{return "down" })
      }else if(i==3){
        json={sysOrderId:v};
        deviceInvoiceDownload(json,()=>{return "down" })
      }
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
      let vm = this,data = {
          "sysOrderId": v.sysOrderId
        };
      this.$confirm('是否确认退货?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deviceReturn(data)
        .then(res=>{
          if(res&&res.code==200){
            this.$message({
              type: 'success',
              message: '操作成功'
            });  
             this.search(this.pa);
          }
        }).catch(e=>errorDeal(e))
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '操作已取消'
        });          
      });
    },
    getMore(i) {
      let vm = this;
      this.$set(vm.searchResult[i], "isShow", !vm.searchResult[i].isShow);
    },
    checkOrderStatus(v) {
      if (v.returnFlag == 1) {
        return {
          title: "已退卡",
          style: "red"
        }
      }else if (v.orderState == 2) {
        return {
          title: "已完成",
          style: "green"
        }
      }else if ( v.orderState == 3) {
        return {
          title: "手动关闭",
          style: "red"
        }
      }else if ( v.orderState == 4) {
        return {
          title: "自动关闭",
          style: "red"
        }
      }else if(v.orderState==1){
        if(v.paymentState == 1&&v.deliveryState==0){
          return {
            title: "待付款",
            style: "blue"
          }
        }else if(v.paymentState == 2&& v.deliveryState == 1){
          return {
            title: "待发货",
            style: "blue"
          }
        }else if(v.paymentState == 2&&v.deliveryState == 2){
           return {
            title: "已发货",
            style: "blue"
          }
        }else{
          return {
            title: "--",
            style: "--"
          }
        }
      }else{
        return {
          title: "--",
          style: "--"
        }
      }
    },
    modify(t,v,i){
      let vm=this;
      vm.off.updateRemark=true;
      vm.upindex=i;
      if(t=='remark'){
        vm.newRemark=v.remark;
      }else if(t=="remarkYes"){
        let json={
          rebateRemark:vm.newRemark,
          sysOrderId:v.sysOrderId
        };
        updateRemark(json)
        .then(res=>{
          if(res&&res.data){
            if(res.code==200){
              vm.$message({
                message:"修改成功",
                type:"success"
              })
            }else{
              vm.$message({
                message:"操作失败",
                type:"error"
              })
            }
            vm.search(vm.currentPage);
          }
        }).catch(e=>errorDeal(e))
      }
    },
    searchdelivery(n, v) {
      if(n&&v){
        let url = "https://www.kuaidi100.com/chaxun?com=" + n + "&nu=" + v;
        window.open(url);
      }
    },
    getDateTime(e) {
      return getDateTime(e);
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
.m-dialog-content .el-dialog__body{
  max-height: 400px;
  overflow:auto;
}
.m-dialog-content .el-checkbox.is-bordered+.el-checkbox.is-bordered{
  margin-left: 0;
}
.m-dialog-content .el-checkbox{
  margin: 10px 10px 0 0;
}
</style>
