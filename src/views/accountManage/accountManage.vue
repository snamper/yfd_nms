<template>
  <section ref="sec">
    <div class="m-search" v-if="off.list">
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
                <div class="grid-content bg-purple-dark f-ta-r inputTitle">联系人：</div>
              </el-col>
              <el-col :xs="19" :sm="19" :md="19" :lg="18" :xl="18">
                <el-input v-model="name" size="small" placeholder="请输入查询的联系人姓名" :maxlength="10"></el-input>
              </el-col>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
            <div class="grid-content bg-purple-light">
              <el-col :xs="4" :sm="3" :md="3" :lg="4" :xl="4">
                <div class="grid-content bg-purple-dark f-ta-r inputTitle">联系人号码：</div>
              </el-col>
              <el-col :xs="19" :sm="19" :md="19" :lg="18" :xl="18">
                <el-input v-model="phone" size="small" placeholder="请输入联系人号码" :maxlength="11"></el-input>
              </el-col>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
            <div class="grid-content bg-purple-light">
              <el-col :xs="4" :sm="3" :md="3" :lg="4" :xl="4">
                <div class="grid-content bg-purple-dark f-ta-r inputTitle">公司名称：</div>
              </el-col>
              <el-col :xs="19" :sm="19" :md="19" :lg="18" :xl="18">
                <el-input v-model="company" size="small" placeholder="请输入查询的公司名称" :maxlength="15"></el-input>
              </el-col>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
            <div class="grid-content bg-purple-light">
              <el-col :xs="4" :sm="3" :md="3" :lg="4" :xl="4">
                <div class="grid-content bg-purple-dark f-ta-r inputTitle">归属渠道：</div>
              </el-col>
              <el-col :xs="19" :sm="19" :md="19" :lg="18" :xl="18">
                <el-select size="small" style="width:100%" clearable v-model="departId" placeholder="请选择查询的归属渠道">
                  <el-option v-for="item in options" :key="item.dealerId" :label="item.dealerIdName" :value="item.dealerId"
                    size="small">
                  </el-option>
                </el-select>
              </el-col>
            </div>
          </el-col>
        </el-row>
        <el-row style="text-align:center" class="marginTop">
          <button class="m-btn-orange m-btn-search" @click="search()">搜索</button>
        </el-row>
      </div>
      <!-- 查询结果列表 -->
      <div v-if="searchList">
        <div class="m-listTitleFoot">
          <el-row>
            <p>
              <h3>账户列表<span class="f-fw greyFont">({{total||'0'}})</span></h3>
            </p>
          </el-row>
        </div>
        <div class="m-details">
          <table class="m-searchTab" style="width:100%;height:100%;">
            <tr>
              <td>序号</td>
              <td>公司名称</td>
              <td>联系人</td>
              <td>手机号码</td>
              <td>归属渠道</td>
              <td>账户余额（元）</td>
              <td>佣金账户余额（元）</td>
              <td>佣金账户累计提现（元）</td>
              <td>操作</td>
            </tr>
            <tr v-for="(v,i) of searchList">
              <td>{{(currentPage-1)*15+(i+1)}}</td>
              <td>{{v.departName||'--'}}</td>
              <td>{{v.username||'--'}}</td>
              <td>{{v.phone||'--'}}</td>
              <td>{{v.dealerIdName||'--'}}</td>
              <td><a @click="details(1,v)">{{translateData('fenToYuan',v.balance)}}</a></td>
              <td><a @click="details(2,v)">{{translateData('fenToYuan',v.commissionBalance)}}</a></td>
              <td><a @click="details(3,v)">{{translateData('fenToYuan',v.withdrawTotal)}}</a></td>
              <td><a @click="withdrawal(v.departId)" class="m-junplink">提现</a></td>
            </tr>
          </table>
        </div>
        <div class="m-listTitleFoot" v-if="searchList.length!=0">
          <el-row>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-pagination 
                  layout="prev, pager, next" 
                  :page-size="15" 
                  @current-change="search" 
                  :current-page.sync="currentPage"
                  :total="total">
                </el-pagination>
              </div>
            </el-col>
            <el-col :span="12">
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <balance v-if="off.balance" :list="detailsinfo"></balance>
    <commissionpage v-if="off.commission" :list="detailsinfo"></commissionpage>
    <commissionWithdrawal v-if="off.commissionWithdrawal" :list="detailsinfo"></commissionWithdrawal>
    <withdrawalpage v-if="off.withdrawal" :list="detailsinfo"></withdrawalpage>
  </section>
</template>
<script>
  import balance from './balance.vue';
  import commissionpage from './commission.vue';
  import commissionWithdrawal from './commissionWithdrawal.vue';
  import withdrawalpage from './withdrawal.vue';
  import { getaccountDealer,getaccounts,commission } from '../../config/service.js';
  import { errorDeal,translateData,getStore } from '../../config/utils';
  import { mapState, mapMutations, mapActions } from 'vuex';
  export default {
    data() {
      return {
        name: "",
        phone: "",
        company: "",
        departId: "",
        searchList: "",
        options: "",
        detailsinfo:"",
        searchJson:"",
        currentPage: 0,
        pageSize:15,
        total: 0,
        off: {
          list: true,
          balance: false,
          commission: false,
          commissionWithdrawal: false,
          withdrawal:false
        }
      }
    },
    components: {
      balance,
      commissionpage,
      commissionWithdrawal,
      withdrawalpage
    },
    created:function(){
      let vm=this;
      getaccountDealer({},true)
      .then((data)=>{
        vm.options=data.data.list;
      }).catch(e=>errorDeal(e))
    },
    methods: {
      ...mapActions([
        "setaccountDepId"
      ]),
      search(p) {
        let vm = this;
          if (vm.phone!=""&&!(/^1[3456789]\d{9}$/.test(vm.phone))) {
            layer.open({
              content: '请输入正确的手机号码',
              skin: 'msg',
              time: 2,
              msgSkin: 'error',
            });
            return false;
          }
          let json = {
            "userName": vm.name,
            "departName": vm.company,
            "userPhone": vm.phone,
            "dealerId": vm.departId,
            "pageSize":vm.pageSize,
            "pageNum": p||1
          };
          vm.searchJson=json;
        getaccounts(vm.searchJson)
          .then((data) => {
            vm.searchList = data.data.list;
            vm.total = data.data.total;
            vm.currentPage = p || 1;
          }).catch(e => errorDeal(e))
      },
      withdrawal(v) {
        let vm = this;
        vm.off.list = false;
        vm.off.balance = false;
        vm.off.commission = false;
        vm.off.commissionWithdrawal = false;
        vm.off.withdrawal = true;
        vm.setaccountDepId(v);
        commission({departId:v})
        .then((data)=>{
          vm.detailsinfo=data.data;
        }).catch(e=>errorDeal(e))
      },
      details(i,v) {
        let vm = this,
          json = {};
          vm._info=v;
        vm.setaccountDepId(v.departId);
        vm.off.list = false;
        vm.off.balance = false;
        vm.off.commission = false;
        vm.off.commissionWithdrawal = false;
        if (i === 1) {
          vm.off.balance = true;
        } else if (i === 2) {
          vm.off.commission = true;
        } else if (i === 3) {
          vm.off.commissionWithdrawal = true;
        } else {
          return false
        }
      },
      translateData(v,i){
        return translateData(v,i)
      }
    }
  }
</script>
<style scoped>

</style>
