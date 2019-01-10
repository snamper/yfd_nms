<template>
  <section id="detailsView" class="greyFont">
    <div>
      <table v-if="layerType=='notice'">
        <thead>
          <tr>
            <td>
              <p></p>
            </td>
          </tr>
          <tr>
            <th>
              确认要删除此公告消息？
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="tdBtn">
            <span @click="close()">取消</span>
            <span @click="btnYes('notice')">确认</span>
          </tr>
        </tbody>
      </table>
      <table v-if="layerType=='takeGoods'">
        <thead>
          <tr>
            <td>
              <p></p>
            </td>
          </tr>
          <tr>
            <th>
              商户已收货<br>
              是否确认收货?
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="tdBtn">
            <span @click="close()">取消</span>
            <span @click="btnYes('takeGoods',logisticsInfo)">确认</span>
          </tr>
        </tbody>
      </table>
      <table v-if="layerType=='sendGoods'">
        <thead>
          <tr>
            <th>
              填写物流单号
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <el-select allow-create filterable style="display:block" v-model="logisticsCompany" placeholder="请选择"
                size="small">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <td>
              <el-input :maxlength="30" v-model="logisticsOrderId" placeholder="请输入物流单号" size="small"></el-input>
            </td>
          </tr>
          <tr class="tdBtn">
            <span @click="close()">取消</span>
            <span @click="btnYes('sendGoods',logisticsInfo)">确认</span>
          </tr>
        </tbody>
      </table>
      <table v-if="layerType=='returnGoods'">
        <thead>
          <tr>
            <th colspan="2">
              <img style="width:50px;height:50px" src="../assets/images/questionMark.png" alt="">
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="2">
              <h3>是否确认退卡</h3>
            </td>
          </tr>
          <tr class="tdBtn">
            <td colspan="2" style="padding:0;width:100%">
              <span @click="close()">取消</span><span @click="btnYes('returnGoodsYes',logisticsInfo)">确认</span>
            </td>
          </tr>
        </tbody>
      </table>
      <table v-if="layerType=='logistics'">
        <thead>
          <tr>
            <th>
              修改物流单号
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <el-select allow-create filterable style="display:block" v-model="logisticsCompany2" placeholder="请选择"
                size="small">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <td>
              <el-input v-model="orderId" :maxlength="20" placeholder="请输入物流单号" size="small"></el-input>
            </td>
          </tr>
          <tr class="tdBtn">
            <span @click="close()">取消</span>
            <span @click="btnYes('logistics',logisticsInfo)">确认</span>
          </tr>
        </tbody>
      </table>
      <table v-if="layerType=='payMent'" style="width:300px;">
        <thead>
          <tr>
            <th>
              确认付款
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <el-input maxlength=15 v-model="payMoney" placeholder="请输入付款金额，以元为单位" size="small"></el-input>
            </td>
          </tr>
          <tr>
            <td>
              <el-input maxlength=30 v-model="oddNumbers" placeholder="请输入支付流水号" size="small"></el-input>
            </td>
          </tr>
          <tr>
            <td>
              <el-select allow-create filterable style="display:block" v-model="logisticsCompany2" placeholder="请选择"
                size="small">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <td>
              <el-input maxlength=30 v-model="orderId" placeholder="请输入物流单号" size="small"></el-input>
            </td>
          </tr>
          <tr class="f-s-12">
            <td style="padding-top:0px;color:red">
              *注：付款金额必填，物流公司及单号为选填<br>
            </td>
          </tr>
          <tr class="tdBtn">
            <span @click="close()">取消</span>
            <span @click="btnYes('payMent',logisticsInfo)">确认</span>
          </tr>
        </tbody>
      </table>
      <table v-if="layerType=='confirmModifyPrice'">
        <thead>
          <tr>
            <td>
              <p class="IconQuestion_mark"></p>
            </td>
          </tr>
          <tr>
            <td>
              <p>是否确认修改</p>
              <p>号包'{{info.productName}}'的价格？</p>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr class="tdBtn">
            <span @click="close('1')">取消</span>
            <span @click="btnYes('changeCartMoney',info)">确认</span>
          </tr>
        </tbody>
      </table>
      <table v-if="layerType=='modifyPrice'" class="changeCartsPrice">
        <tbody>
          <tr>
            <td>修改价格</td>
          </tr>
          <tr>
            <td>{{info.productName}} ( {{info.amount}}个 )</td>
          </tr>
          <tr>
            <td><span class="greyFont">号包价格 : </span>{{info.strikePrice/100}}元</td>
          </tr>
          <tr>
            <td><input v-model="newPrice" class="price" placeholder="请输入修改价格,单位:元"></td>
          </tr>
          <tr class="tdBtn">
            <span @click="close('1')">取消</span>
            <span @click="btnYes('changePriceYes')">确认</span>
          </tr>
        </tbody>
      </table>
      <table v-if="layerType=='deletePower'">
        <tbody>
          <tr style="height:140px;">
            <td>
              <span class="f-fs14">删除角色可能会导致数据出现错误</span><br>
              <p style="height:5px"></p>
              <span class="f-s-18 red">是否删除？</span>
            </td>
          </tr>
          <tr class="tdBtn">
            <span @click="close()">取消</span>
            <span @click="btnYes('deletePower')">确认</span>
          </tr>
        </tbody>
      </table>
      <table v-if="layerType=='modifyPower'">
        <tbody>
          <tr style="height:140px;">
            <td>
              <span class="f-fs14">修改角色可能会导致数据出现错误</span><br>
              <p style="height:5px"></p>
              <span class="f-s-18 red">是否修改？</span>
            </td>
          </tr>
          <tr class="tdBtn">
            <span @click="close()">取消</span>
            <span @click="btnYes('modifyPower')">确认</span>
          </tr>
        </tbody>
      </table>
      <table v-if="layerType=='modifyDepart'">
        <tbody>
          <tr style="height:140px;">
            <td>
              <span class="f-fs14">修改归属渠道可能会导致数据出现错误</span><br>
              <p style="height:5px"></p>
              <span class="f-s-18 red">是否修改？</span>
            </td>
          </tr>
          <tr class="tdBtn">
            <span @click="close()">取消</span>
            <span @click="btnYes('modifyDepart')">确认</span>
          </tr>
        </tbody>
      </table>
      <table v-if="layerType=='commissionWithdrawal'">
        <tbody>
          <tr style="height:140px;">
            <td>
              <span class="f-fs14">是否提取{{layerData.src==1?'话分佣金':'激励'}}至{{layerData.accountType==1?'账户':'支付宝'}}</span><br>
            </td>
          </tr>
          <tr class="tdBtn">
            <span @click="close()">取消</span>
            <span @click="btnYes('Withdrawal',layerData)">确认</span>
          </tr>
        </tbody>
      </table>
      <table v-if="layerType=='deleteAddress'">
        <tbody>
          <tr style="height:140px;">
            <td>
              <span class="f-fs14">是否删除该收货地址</span><br>
            </td>
          </tr>
          <tr class="tdBtn">
            <span @click="close()">取消</span>
            <span @click="btnYes('deleteAddress',layerData)">确认</span>
          </tr>
        </tbody>
      </table>
      <table v-if="layerType=='commissionRules'">
        <thead>
          <tr>
            <th>
              设置佣金规则
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              佣金规则 : 
              <el-select allow-create filterable style="width:70%" v-model="cmsRules" placeholder="请选择"
                size="small">
                <el-option v-for="item in commission_rules.type" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <td>
              佣金年限 : 
              <el-select allow-create filterable style="width:70%" v-model="cmsTime" placeholder="请选择"
                size="small">
                <el-option v-for="item in commission_rules.time" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </td>
          </tr>
          <tr class="tdBtn">
            <span @click="close()">取消</span>
            <span @click="btnYes('logistics',logisticsInfo)">确认</span>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
<script>
  import { requestConfirmDelNotice,
   requestConfirmTakeGoods, 
   requestChangeLogisticsId, 
   requestConfirmPayMent, 
   requestModify_Price, 
   requestReturnGoods, 
   deleteRole, 
   updateRolePrivilege, 
   updateDealerInfo, 
   requestMethod,
   transfer,
   commission,
   deleteAddress } from "../config/service.js";
  import { errorDeal, getStore, trimFunc } from '../config/utils';
  import { mapState } from 'vuex';
  export default {
    props: {
      layerType: String,
      isSure: Boolean,
      logisticsInfo: Object,
      info: Object,
      changpowerData: Object,
      layerData:Object
    },
    data() {
      return {
        options: [{ value: '圆通', label: '圆通' }, { value: '韵达', label: '韵达' }, { value: '申通', label: '申通' }, { value: '中通', label: '中通' }, { value: '顺丰', label: '顺丰' }, { value: 'EMS', label: 'EMS' }, { value: '天天', label: '天天' }, { value: '汇通', label: '汇通' }, { value: '全峰', label: '全峰' }, { value: '邮政', label: '邮政' }, { value: '速尔', label: '速尔' }],
        logisticsCompany: '',
        logisticsOrderId: '',
        logisticsCompany1: '',
        logisticsOrderId1: '',
        logisticsCompany2: '',
        orderId: '', //订单Id
        payMoney: '', //付款金额
        oddNumbers: '', //流水单号
        orderdeliveryName: '',
        newPrice: "",
        cmsRules: "",
        cmsTime:""
        // layerType:"",
      }
    },
    computed:{
      ...mapState([
        "account_depId",
        "commission_rules"
      ])
    },
    methods: {
      btnYes(e, v) {
        let vm = this;
        if (e == 'notice') { //删除公告
          vm.cancelNotice(vm.$parent.cancelInfo);
        } else if (e == "takeGoods") { //确认收货
          vm.collectGoods(v);
        } else if (e == "sendGoods") { //发货
          vm.sendGoods(v);
        } else if (e == "returnGoods") { //退货
          vm.layerType = "returnGoodsConfirm";
        } else if (e == "returnGoodsYes") {
          vm.returnGoods(v);
        } else if (e == "logistics") { //修改单号
          vm.changeLogisticsId(v);
        } else if (e == "payMent") { //付款
          vm.payMent(v);
        } else if (e == "changeCartMoney") {
          vm.changePrice(v)
        } else if (e == "changePriceYes") {
          if (trimFunc(vm.newPrice) && !isNaN(vm.newPrice)) {
            vm.layerType = 'confirmModifyPrice';
          } else {
            layer.open({
              content: "请输入正确的产品价格,以元为单位",
              skin: "msg",
              time: 2,
              msgSkin: "error"
            })
          }
        } else if (e == "deletePower") {
          vm.deletePower(v)
        } else if (e == "modifyPower") {
          vm.modifyPower(v)
        } else if (e == "modifyDepart") {
          vm.modifyDepart(v)
        } else if (e == "Withdrawal") {
          vm.withdrawal(v)
        } else if(e == "deleteAddress"){
          vm.deleteAddress(v)
        }
      },
      close(i) {
        var vm = this;
        if (i == 1) {
          vm.$parent.off.layerChangePrice = false;
        }
        vm.$parent.off.layer = false;
      },
      cancelNotice(v) {
        let vm = this;
        requestConfirmDelNotice(v)
          .then((data) => {
            if (data.code == 200) {
              layer.open({
                content: "删除公告消息成功",
                skin: "msg",
                time: 2,
                msgSkin: "success"
              })
            } else {
              layer.open({
                content: data.msg,
                skin: "msg",
                time: 2,
                msgSkin: "error"
              })
            }
            this.$parent.search(this.$parent.pa);
            this.$parent.off.layer = false;
          }).catch(e => errorDeal(e));
      },
      collectGoods(v) {
        let vm = this;
        let data = {
          "sysOrderId": v.sysOrderId,
          "deliveryOrderId": v.deliveryOrderId,
          "deliveryName": v.deliveryName
        }
        requestConfirmTakeGoods(data)
          .then((data) => {
            this.$parent.search(this.$parent.pa);
            this.$parent.off.layer = false;
            if (data.code == 200) {
              layer.open({
                content: "操作成功",
                skin: "msg",
                time: 2,
                msgSkin: "success"
              })
            }
          }).catch(e => errorDeal(e));
      },
      sendGoods(v) {
        let vm = this,
          data = {
            "sysOrderId": v.sysOrderId,
            "deliveryOrderId": vm.logisticsOrderId,
            "deliveryName": vm.logisticsCompany,
          };
        requestChangeLogisticsId(data)
          .then((data) => {
            this.$parent.search(vm.$parent.pa);
            this.$parent.off.layer = false;
            if (data.code == 200) {
              layer.open({
                content: "操作成功",
                skin: "msg",
                time: 2,
                msgSkin: "success"
              })
            }
          }).catch(e => errorDeal(e));
      },
      returnGoods(v) {
        let vm = this;
        let data = {
          "sysOrderId": v.sysOrderId,
          "returnDeliveryId": vm.logisticsOrderId1,
          "returnDeliveryName": vm.logisticsCompany1
        }
        requestReturnGoods(data)
        .then((data) => {
          this.$parent.search(vm.$parent.pa);
          this.$parent.off.layer = false;
          if (data.code == 200) {
            layer.open({
              content: "操作成功",
              skin: "msg",
              time: 2,
              msgSkin: "success"
            })
          }
        }).catch(e => errorDeal(e));
      },
      changeLogisticsId(v) {
        let data, vm = this;
        if (vm.orderId == "" || vm.logisticsCompany2 == "") {
          layer.open({
            content: "请填写完整的物流信息",
            skin: "msg",
            time: 2,
            msgSkin: "error"
          })
          return false;
        } else {
          data = {
            "sysOrderId": v.sysOrderId,
            "deliveryOrderId": vm.orderId,
            "deliveryName": vm.logisticsCompany2
          }
        }
        requestChangeLogisticsId(data)
          .then((data) => {
            this.$parent.search(vm.$parent.pa);
            this.$parent.off.layer = false;
            if (data.code == 200) {
              layer.open({
                content: "操作成功",
                skin: "msg",
                time: 2,
                msgSkin: "success"
              })
            }
          }).catch(e => errorDeal(e));
      },
      payMent(v) {
        let vm = this,
          regular = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/;
        if (!regular.test(vm.payMoney)) {
          layer.open({
            content: "请输入正确的金额，以元为单位，例如1.00",
            skin: 'msg',
            time: 2,
            msgSkin: 'error',
          });
          return false;
        }
        if (vm.payMoney == '') {
          layer.open({
            content: "请输入要付款的金额",
            skin: 'msg',
            time: 2,
            msgSkin: 'error',
          });
          return false;
        }
        let data = {
          "sysOrderId": v.sysOrderId,
          "deliveryOrderId": vm.orderId,
          "deliveryName": vm.logisticsCompany2,
          "strikePrice": vm.payMoney * 100,
          "paymentSerialNumber": vm.oddNumbers,
        }
        requestConfirmPayMent(data)
          .then((data) => {
            this.$parent.search(vm.$parent.pa);
            this.$parent.off.layer = false;
            if (data.code == 200) {
              layer.open({
                content: "操作成功",
                skin: "msg",
                time: 2,
                msgSkin: "success"
              })
            }
          }).catch(e => errorDeal(e, function () {
            vm.$parent.off.layer = false;
          }));
      },
      changePrice(v) {
        let vm = this,
          data = {
            "buyerId": v.buyerId,
            "productId": v.productId,
            "id": v.id,
            "strikePrice": vm.newPrice * 100
          };
        requestModify_Price(data)
          .then((data) => {
            for (let i in vm.$parent.off.changePrice) {
              vm.$set(vm.$parent.off.changePrice, i, false)
            }
            if (data.code == 200) {
              layer.open({
                content: "修改价格成功",
                skin: "msg",
                time: 2,
                msgSkin: "success"
              })
            }
            this.$parent.off.layer = false;
            this.$parent.search(vm.$parent.pa);
          }).catch(e => errorDeal(e, function () {
            vm.$parent.off.layer = false;
          }));
      },
      deletePower() {
        let vm = this.$parent,
          json = {
            id: vm.roleId
          };
        deleteRole(json)
          .then((data) => {
            if (data.code == 200) {
              layer.open({
                content: "删除角色成功",
                skin: "msg",
                time: 2,
                msgSkin: "success"
              })
            }
            vm.off.layer = false;
            vm.layerType = '';
            vm.fgetRole();
          }).catch(e => errorDeal(e))
      },
      modifyPower() {
        let vm = this;
        updateRolePrivilege(vm.changpowerData)
          .then((data) => {
            if (data.code == 200) {
              layer.open({
                content: "修改角色权限成功",
                skin: "msg",
                time: 2,
                msgSkin: "success"
              })
            }
            vm.$parent.$parent.fgetRole();
            vm.$parent.close();
          }).catch(e => errorDeal(e))
      },
      modifyDepart() {
        let vm = this;
        updateDealerInfo(vm.$parent.changeDepartInfo)
          .then((data) => {
            if (data.code == 200) {
              layer.open({
                content: "修改归属渠道成功",
                skin: "msg",
                time: 2,
                msgSkin: "success"
              })
              let json = {
                "startTime": new Date(vm.$parent.$parent.startTime).getTime(),
                "endTime": new Date(vm.$parent.$parent.endTime).getTime(),
                "searchType": '1',
                "departName": '',
                "managerName": '',
                "departState": '1,2,3,4',
                "phone": vm.$parent.lists.phone,
                "pageSize": 15,
                "pageNum": 1
              },
              url = '/ums/w/user/departSearch';
              requestMethod(json, url)
                .then((data) => {
                  if (data.code == 200) {
                    vm.$parent.$parent.companyDetails = data.data.departs[0];
                  }
                }).catch(e => errorDeal(e));
            }
            vm.$parent.change = false;
            vm.$parent.off.layer = false;
          }).catch(e => errorDeal(e, vm.$parent.off.layer = false))
      },
      withdrawal(v){
        let vm=this,json={
          "type":v.src,
          "channel":v.accountType,
          "departId":vm.account_depId,
          "account":v.accountType==1?v.account:v.aliAccount,
          "amount":v.money
        };
        transfer(json)
        .then((data)=>{
          if(data.code==200){
            layer.open({
              content: "操作成功",
              skin: "msg",
              time: 2,
              msgSkin: "success"
            })
          }
          let info = getStore("YFD_NMS_INFO");
          vm.$parent.off.layer = false;
          vm.$parent.off.withdrawal = true;
          commission({departId:vm.account_depId})
          .then((data)=>{
            vm.$parent.list=data.data;
            vm.$parent.withdrawalMoney="";
          }).catch(e=>errorDeal(e))
        }).catch(e=>errorDeal(e))
      },
      deleteAddress(v){
        let vm=this;
        deleteAddress(v)
        .then((data)=>{
          if(data.code==200){
            layer.open({
              content: '删除成功',
              skin: 'msg',
              time: 2,
              msgSkin: 'success',
            });
          }
          vm.$parent.off.layer=false;
          vm.$parent.layerType=false;
          vm.$parent.layerData=false;
          vm.$parent.search();
        }).catch(e=>errorDeal(e))
      },
      trimFunc(v) {
        return trimFunc(v)
      }
    }
  }
</script>
<style scoped>
  #detailsView {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: table;
    z-index: 997;
    text-align: center;
  }

  #detailsView>div {
    display: table-cell;
    vertical-align: middle;
  }

  #detailsView table {
    box-shadow: 0 0 50px grey;
    margin: auto;
    width: 270px;
    border-radius: 4px;
    background-color: #fff;
    border-collapse: collapse;
    table-layout: fixed;
    word-wrap: break-word;
    word-break: break-word;
    white-space: normal;
  }

  #detailsView table td {
    padding: 10px 10px;
  }

  #detailsView table th {
    padding: 10px 0;
    border-radius: 4px 4px 0 0;
    color: #545454;
    font-size: 16px;
  }

  #detailsView table td>.fl {
    width: 1rem;
    text-align: right;
  }

  #detailsView table td>.fright {
    margin-left: 1.05rem;
    text-align: left;
  }

  .lay-mask {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: -1;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  .tdBtn span {
    display: inline-block;
    width: 50%;
    height: 50px;
    padding: 20px;
    box-sizing: border-box;
    cursor: pointer
  }

  .tdBtn span:nth-child(1) {
    border-top: 1px solid #ccc;
    border-right: 1px solid #ccc;
    color: #C6343B
  }

  .tdBtn span:nth-child(2) {
    border-top: 1px solid #ccc;
    color: #43AAD4
  }

  .tdBtn2 {
    cursor: pointer
  }

  .tdBtn2 span {
    display: inline-block;
    width: 100%;
    box-sizing: border-box;
    border-top: 1px solid #ccc;
    padding-top: 10px;
  }

  tbody tr {
    height: 36px;
  }

  thead tr:nth-child(1) td p {
    padding-top: 10px;
  }

  thead tr:nth-child(1) td p {
    height: 40px;
    background: url(../assets/images/icon/exclamation-circle.svg) no-repeat;
    background-size: contain;
    background-position: center center;
  }

  thead tr:nth-child(1) td p.IconQuestion_mark {
    height: 40px;
    background: url(../assets/images/icon/question.svg) no-repeat;
    background-size: contain;
    background-position: center center;
  }

  input.price {
    width: 100%;
    height: 30px;
    border: 1px solid grey;
    border-radius: 4px;
    padding-left: 10px
  }

  table.changeCartsPrice tr:not(:first-child) {
    text-align: left
  }

  table.changeCartsPrice tr.tdBtn {
    text-align: center
  }
</style>
