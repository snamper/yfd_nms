<template>
  <section class="m-withDrawal">
    <div v-if="false" class="m-search">
      <div class="greyFont">
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark m-search-title black">搜索条件</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
            <div class="grid-content bg-purple-light">
              <el-col :xs="4" :sm="3" :md="3" :lg="4" :xl="4">
                <div class="grid-content bg-purple-dark f-ta-r inputTitle">商户ID：</div>
              </el-col>
              <el-col :xs="19" :sm="19" :md="19" :lg="18" :xl="18">
                <el-input v-model="depId" size="small" placeholder="请输入查询的商户ID" :maxlength="10"></el-input>
              </el-col>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
            <div class="grid-content bg-purple-light">
              <el-col :xs="4" :sm="3" :md="3" :lg="4" :xl="4">
                <div class="grid-content bg-purple-dark f-ta-r inputTitle">联系人ID：</div>
              </el-col>
              <el-col :xs="19" :sm="19" :md="19" :lg="18" :xl="18">
                <el-input v-model="userId" size="small" placeholder="请输入查询的联系人ID" :maxlength="11"></el-input>
              </el-col>
            </div>
          </el-col>
        </el-row>
        <el-row style="text-align:center" class="marginTop">
          <button class="m-btn-orange m-btn-search" @click="search()">搜索</button>
        </el-row>
      </div>
      <div v-if="searchlist" class="m-search-list">
        <div class="m-listTitleFoot">
          <el-row><h3>搜索结果</h3></el-row>
        </div>
        <div class="m-details">
          <table class="m-searchTab" style="width:100%;height:100%;">
            <tr>
              <td>商户名称</td>
              <td colspan="3"></td>
              <td>归属渠道</td>
              <td colspan="3"></td>
            </tr>
            <tr>
              <td>商户ID</td>
              <td colspan="3"></td>
              <td>账户余额</td>
              <td colspan="3"></td>
            </tr>
            <tr>
              <td>联系人姓名</td>
              <td colspan="3"></td>
              <td>佣金账户累计提现</td>
              <td colspan="3"></td>
            </tr>
            <tr>
              <td>联系人ID</td>
              <td colspan="3"></td>
              <td>佣金账户可提现</td>
              <td colspan="3"></td>
            </tr>
          </table>
        </div>
        <el-row style="text-align:center;margin-top:20px;">
          <button class="m-btn-green" @click="withdrawal()">提现</button>
        </el-row>
      </div>
    </div>
    <div class="m-details">
      <div class="m-details-page">
        <p class="m-head-title">
          <label><a>佣金账户提现</a></label>
          <label><a @click="back()">返回列表</a></label>
        </p>
      </div>
      <div class="m-withDrawalCon">
        <div class="m-withDrawalAccount">
          <label class="greyFont">提现账户：</label>
          <div :class="{'active':off.huafen}" @click="chooseType(1)">
            <p>话分佣金</p>
            <p><span class="f-s-12 greyFont">可提现金额 </span><span class="blue f-s-20">{{list.cspWithdraw/100}}元</span></p>
            <span></span>
            <a></a>
          </div>
          <div :class="{'active':off.kaika}" @click="chooseType(2)">
            <p>开卡激励</p>
            <p><span class="f-s-12 greyFont">可提现金额 </span><span class="blue f-s-20">{{list.ictWithdraw/100}}元</span></p>
            <span></span>
            <a></a>
          </div>
        </div>
        <div class="m-withDrawalMoney">
          <p><span class="greyFont">提现金额：</span>
            <input type="text" v-model="withdrawalMoney" placeholder="请输入提现金额">
            <a class="blue f-s-12" style="cursor: pointer" @click="allWithDrawal">全部提现</a>
          </p>
        </div>
        <div class="m-collectionAccount">
          <label class="greyFont">到账账户：</label>
          <div class="m-accountname">
            <p>
              <el-radio v-if="list.account" v-model="radio" label="1">业务账户:{{list.account}}</el-radio>
            </p>
            <p>
              <el-radio v-if="false" v-model="radio" label="2">支付宝账号:{{list.aliAccount}}</el-radio>
            </p>
          </div>
        </div>
        <p><button @click="collection()">提交</button></p>
      </div>
    </div>
    <layerConfirm v-if="off.layer" :layerType="layerType" :layerData="layerData"></layerConfirm>
  </section>
</template>
<script>
  import { getCmsWithdrawal, commission }  from '../../config/service.js';
  import { errorDeal,getStore } from '../../config/utils.js';
  import { mapState } from 'vuex';
  import layerConfirm from '../../components/layerConfirm.vue';
  export default {
    props:['list'],
    data() {
      return {
        radio: "1",
        withdrawalMoney: "",
        layerType: "",
        layerData:{},
        depId:"",
        userId:"",
        searchlist:"",
        off: {
          huafen: false,
          kaika: true,
          layer: false,
          details:false
        }
      }
    },
    components: {
      layerConfirm
    },
    methods: {
      search(){
        let vm=this;
        vm.searchlist=true;
      },
      // withdrawal(){
      //   let vm = this;
      //   let info = getStore("YFD_NMS_INFO");
      //   vm.off.details = true;
      //   commission()
      //   .then((data)=>{
      //     vm.withdrawalData=data.data;
      //   }).catch(e=>errorDeal(e))
      // },
      chooseType(v) {
        let vm = this;
        vm.off.huafen = false;
        vm.off.kaika = false;
        if (v == 1) {
          vm.off.huafen = true;
        } else if (v == 2) {
          vm.off.kaika = true;
        }
      },
      allWithDrawal() {
        let vm = this;
        if (vm.off.huafen) {
          vm.withdrawalMoney = parseInt(vm.list.cspWithdraw)/100;
        } else if (vm.off.kaika) {
          vm.withdrawalMoney = parseInt(vm.list.ictWithdraw)/100;
        } else {
          return false;
        }
      },
      collection() {
        let vm = this,num=/^\d+(\.\d{1,2})?$/;
        if (!num.test(vm.withdrawalMoney)) {
          layer.open({
            content: '请输入正确的提款金额',
            skin: 'msg',
            time: 2,
            msgSkin: 'error',
          });
          return false;
        }
        if (vm.off.huafen) {
          vm.$set(vm.layerData,'src',1) 
          if(vm.withdrawalMoney*100>vm.list.cspWithdraw){
            layer.open({
              content: '提款金额不能大于余额',
              skin: 'msg',
              time: 2,
              msgSkin: 'error',
            });
            return false;
          }
        } else if (vm.off.kaika) {
          vm.$set(vm.layerData,'src',2)
          if(vm.withdrawalMoney*100>vm.list.ictWithdraw){
            layer.open({
              content: '提款金额不能大于余额',
              skin: 'msg', 
              time: 2,
              msgSkin: 'error',
            });
            return false;
          }
        } else {
          return false
        }
        if(vm.radio==""){
          layer.open({
              content: '请选择到账账户',
              skin: 'msg', 
              time: 2,
              msgSkin: 'error',
            });
            return false;
        }else{
          if(vm.radio==1){
            vm.$set(vm.layerData,'accountType',1)
            vm.$set(vm.layerData,'account',vm.list.account)          
          }else if(vm.radio==2){
            vm.$set(vm.layerData,'accountType',2)
            vm.$set(vm.layerData,'account',vm.list.aliAccount)          
          }
        }
        vm.$set(vm.layerData,'money',vm.withdrawalMoney*100);
        vm.layerType = "commissionWithdrawal";
        vm.off.layer = true;
      },
      back() {
        let vm = this.$parent;
        vm.off.list = true;
        vm.off.withdrawal = false;
        vm.search(vm.currentPage);
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
    flex: 1
  }

  .m-head-title label:nth-child(1) {
    text-align: left;
    padding-left: 1%
  }

  .m-head-title label:nth-child(1) a {
    line-height: 45px;
    font-size: 16px
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
  .m-searchTab tr:not(:last-child){
    border-bottom: 1px solid #d1d1d1;
  }
  .m-searchTab tr td:nth-child(odd){
    background: #E9E9E9;
    width: 15%;
    padding-right: 10px;
    text-align: right;
  }
  .m-searchTab tr td:nth-child(even){
    background: #fff;
    width: 35%;
  }
  .m-withDrawalCon {
    position: relative;
    width: 600px;
    height: 600px;
    top: 50px;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }

  .m-withDrawalCon>p {
    text-align: center;
  }

  .m-withDrawalCon>p>button {
    width: 130px;
    height: 35px;
    background: #00A901;
    border: 1px solid #00A901;
    outline: none;
    color: #FFF
  }

  .m-withDrawalCon>p>button:active {
    box-shadow: 0 0 5px #00A901
  }

  .m-withDrawalAccount {
    height: 100px;
    position: relative;
  }

  .m-withDrawalAccount>label {
    position: absolute;
    display: inline-block;
    height: 70px;
  }

  .m-withDrawalAccount>div {
    cursor: pointer;
    position: relative;
    left: 70px;
    display: inline-block;
    height: 70px;
    border: 1px solid #ccc;
    background: #fff;
    margin-right: 10px;
  }

  .m-withDrawalAccount>div.active {
    border: 1px solid #EB7A00
  }

  .m-withDrawalAccount>div.active>span {
    position: absolute;
    right: 0;
    bottom: 0;
    content: "";
    color: #fff;
    display: inline-block;
    width: 0;
    height: 0;
    border: 15px solid #EB7A00;
    border-top: 15px solid transparent;
    border-left: 15px solid transparent;
  }

  .m-withDrawalAccount>div.active>a {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 15px;
    height: 15px;
    background: url('../../assets/images/yes.png') no-repeat center;
    background-size: cover;
  }

  .m-withDrawalAccount>div>p {
    padding: 5px 30px 5px 10px;
  }

  .m-withDrawalMoney {
    height: 50px;
  }

  .m-withDrawalMoney p input {
    height: 35px;
    width: 240px;
    padding-left: 15px;
    border: 1px solid #ccc;
    outline: none
  }

  .m-collectionAccount {
    display: flex
  }

  .m-collectionAccount label {
    width: 70px;
  }

  .m-collectionAccount .m-accountname p {
    height: 30px;
  }
</style>
