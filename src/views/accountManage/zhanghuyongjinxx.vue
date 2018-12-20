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
          <button class="m-btn-orange m-btn-search" @click="search(1,1)">搜索</button>
        </el-row>
      </div>
      <!-- 查询结果列表 -->
      <div v-if="searchList">
        <div class="m-listTitleFoot">
          <el-row>
            <el-col :span="12">
              账户列表<span class="f-fw greyFont">({{total||'0'}})</span>
            </el-col>
            <el-col :span="12">
              <el-button style="margin-left:20px;float:right" type="success" size="mini" @click="download"> 导 出 </el-button>
            </el-col>
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
              <td v-if="off.roleShow">佣金累计返利金额（元）</td>
              <td v-if="off.roleShow">佣金已结算金额（元）</td>
              <td v-if="off.roleShow">佣金未开票金额（元）</td>
            </tr>
            <tr v-for="(v,i) of searchList" :key="i">
              <td>{{(currentPage-1)*15+(i+1)}}</td>
              <td>{{v.departName||'--'}}</td>
              <td>{{v.username||'--'}}</td>
              <td>{{v.phone||'--'}}</td>
              <td>{{v.dealerIdName||'--'}}</td>
              <td><a @click="details(1,v)">{{translateData('fenToYuan',v.balance)}}</a></td>
              <td v-if="off.roleShow"><a @click="details(2,v)">{{translateData('fenToYuan',v.commission)}}</a></td>
              <td v-if="off.roleShow">{{translateData('fenToYuan',v.settled)}}</td>
              <td v-if="off.roleShow">
                <span class="m-wkp" v-if="i!=modifyi">
                  {{translateData('fenToYuan',v.unbilled)}}</span>
                <el-input
                  size="mini" 
                  style="width:50%"
                  v-model="newMoney"
                  v-if="off.modify1&&i==modifyi">
                  <el-button slot="append" @click="modify(2,{departId:v.departId})">确定</el-button>
                </el-input>
                <a v-if="i!=modifyi" @click="modify(1,i,v.unbilled)" class="m-junplink">修改</a>
              </td>
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
                  @current-change="search(currentPage,1)" 
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
    <pcms v-if="off.cms" :list="cmsdata"></pcms>
  </section>
</template>
<script>
  import { getaccountDealer,getaccounts,commission,cmsupdate,cmsDownload } from '../../config/service.js';
  import { errorDeal,translateData,getStore } from '../../config/utils';
  import { mapActions } from 'vuex';
  import balance from './yexq.vue';
  import pcms from './fllb.vue';
  let _refresh = false;//判断当前页是否是重新刷新

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
        cmsdata:"",
        searchJson:"",
        currentPage: 0,
        pageSize:15,
        total: 0,
        modifyi:0.1,
        newMoney:"",
        _info:"",
        off: {
          cms: false,
          list: true,
          modify1:false,
          balance: false,
          roleShow:false
        }
      }
    },
    components: { balance,pcms },
    beforeRouteEnter:function(to, from, next){
      console.log()
      if(from.path=='/'){_refresh=true;}
      else _refresh=false;
      next();
    },
    created:function(){
      let vm=this;
      getaccountDealer({},true)
      .then((data)=>{
        vm.options=data.data.list;
      }).catch(e=>errorDeal(e));
      vm.off.roleShow = getStore("YFD_NMS_INFO").privileges.indexOf('211001')>-1;

      if(vm.$route.query.company && !_refresh){//由其它路由跳转过来执行
        vm.company = vm.$route.query.company;
        vm.search(1,1)
      }

    },
    methods: {
      ...mapActions([
        "setaccountDepId"
        ,"setDepName"
      ]),
      search(p,i) {
        let vm = this;
        if(i==1){
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
        }
        getaccounts(vm.searchJson)
        .then((data) => {
          vm.searchList = data.data.list;
          vm.total = data.data.total;
          vm.currentPage = p || 1;
          vm.off.modify1 = false;
          vm.modifyi = 0.1;
        }).catch(e => errorDeal(e))
      },
      download(){
        let vm=this; 
        cmsDownload(vm.searchJson,()=>{return "down";})
      },
      modify(v,i,d){
        let vm=this;
        if(v==1){
          vm.modifyi=i;
          vm.off.modify1=true;
          vm.newMoney = translateData('fenToYuan',d);
        }else if(v==2){
          let json;
          if(isNaN(parseInt(vm.newMoney))){
            this.$message.error('请输入正确的金额')
            return false;
          }
          json=Object.assign(i,{'unbilled':vm.newMoney*100})
          this.$confirm('修改佣金未开票金额？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            cmsupdate(json)
            .then((res)=>{
              this.$message({
                type: 'success',
                message: '更改成功'
              });  
              vm.search();
            }).catch(e=>errorDeal(e,vm.modifyi=0.1))
          })
          .catch(e => errorDeal(e,vm.modifyi=0.1));
        }
      },
      details(i,v) {
        let vm = this,
          json = {};
          vm._info=v;
        vm.setaccountDepId(v.departId);
        vm.setDepName(v.departName);
        vm.off.cms = false;
        vm.off.list = false;
        vm.off.balance = false;
        if (i === 1) {
          vm.off.balance = true;
        } else if (i === 2) {
          vm.off.cms = true;
        } else {
          return false
        }
      },
      translateData(v,i){
        return translateData(v,i)
      }
    },
    directives: {
      focus: {
        // 指令的定义
        inserted: function (el) {
          el.focus()
        }
      }
    }
  }
</script>
<style scoped>
.m-wkp{
  display: inline-block;
  width: 150px;
}
</style>
