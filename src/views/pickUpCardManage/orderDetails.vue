<template>
  <section>
    <div>
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
        </div>
        <div style="margin-top:0" class="headTitle f-s-16">
          <span class="fl">号包详情</span>
        </div>
        <div class="m-box-list f-s-12">
          <el-row :span=24>
            <div  v-for="(v,i) in detailsData.productList" :key="i">
              <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="2"> &nbsp; </el-col>
              <el-col :xs="23" :sm="11" :md="11" :lg="11" :xl="10">
                <p class="f-lh-30">
                  <span class="f-ls-1 grey">号包名称 : </span>
                  <span>{{v.productName||'--'}} ({{v.total||'--'}}个)</span>&nbsp;&nbsp;
                  <span>{{translateData(4,v.brand)}}{{translateData(1,v.isp)}}</span>&nbsp;&nbsp;
                  <span v-if="v.splitFlag==1">不可拆分</span>
                  <span v-if="v.splitFlag==2">可拆分</span>&nbsp;&nbsp;
                  <span class="yellow">￥{{Math.formatFloat(parseFloat(v.discountPrice/100),2)}}元</span>&nbsp;&nbsp;
                  <a class="m-jumplink" @click="details('',v)">查看详情</a>
                </p>
              </el-col>
            </div>
          </el-row>
        </div>
      </div>
      <div class="zhenghaoduan" v-if="false">
        <div v-for="(v,i) in detailsData.productList" :key="i" class="tab-container f-ls-1">
          <table>
            <tr>
              <td>产品名称</td>
              <td colspan="3" class="f-s-18">{{v.productName||'--'}}</td>
            </tr>
            <tr>
              <td>网络</td>
              <td>{{translateData(1,v.isp)}}</td>
              <td>产品类型</td>
              <td>{{translateData(2,v.productType)}}</td>
            </tr>
            <tr>
              <td>品牌</td>
              <td>{{translateData(4,v.brand)}}</td>
              <td>码号数</td>
              <td>{{v.total}}
                <a v-if="!isNaN(v.total)&&v.total!=0" href="javascript:void(0)" class="blue fr f-pl-10" @click="details('',v)">查看列表</a>
              </td>
            </tr>
            <tr>
              <td>归属地</td>
              <td>{{v.area||'--'}}</td>
              <td rowspan="2">价格</td>
              <td rowspan="2">
                <p v-if="v.discountPrice!=v.strikePrice" class="t-td-lt">￥{{Math.formatFloat(parseFloat(v.strikePrice/100),2)}}</p>
                <p class="f-s-18 yellow">￥{{Math.formatFloat(parseFloat(v.discountPrice/100),2)}}</p>
              </td>
            </tr>
            <tr>
              <td>销售方式</td>
              <td>
                <span v-if="v.splitFlag==1">不可拆分</span>
                <span v-if="v.splitFlag==2">可拆分</span>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <card-details v-if="off.numList" :dataInfo="numberTotal" :newData="newSearch"></card-details>
  </section>
</template>
<script>
  import {
    requestMethod,
    requestgetOrderSplitNumbers
  } from '../../config/service';
  import {
    errorDeal,
    translateData
  } from "../../config/utils";
  import {
    Loading
  } from 'element-ui';
  import cardDetails from "../../components/pickupCardList.vue";
  export default {
    props: {
      detailsData: Object
    },
    data() {
      return {
        searchLiang: [],
        searchPu: [],
        newSearch:[],
        off: {
          numList:false
        },
        numberTotal:{
          total:"",
          info:""
        }
      }
    },
    components: {
      "card-details": cardDetails
    },
    methods: {
      details(p, i) {
        let vm = this,
          json = {
            sysOrderId: i.sysOrderId,
            numberId: i.numberId,
            pageNum: p || 1,
            pageSize: 30
          };
        vm.searchJson = json;
        vm.numberTotal.info = i;
        vm.off.numList = true;
        requestgetOrderSplitNumbers(json)
          .then((data) => {
            if (data.code == 200) {
              vm.numberTotal.total = data.data.total;
              vm.newSearch = [];
              let simgroups;
              if(data.data&&data.data.simGroups){
                simgroups = data.data.simGroups;
                for (let x = 0, len = simgroups.length; x<len; x++){
                  vm.newSearch.push({simGroupTotal:"",simName:"",numbers:[]})
                  for (let index = 0, l = simgroups[x].numbers.length; index<l; index+= 6) {
                    vm.newSearch[x].numbers.push(simgroups[x].numbers.slice(index,index+6))
                  }
                  vm.newSearch[x].simGroupTotal=simgroups[x].simGroupTotal;
                  vm.newSearch[x].simName=simgroups[x].simName;
                }
              }
            } else {
              layer.open({
                content: "data.msg",
                skin: 'msg',
                time: 2,
                msgSkin: 'error',
              });
            }
          })
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
  .m-box-list{
     width:98%;
     height: auto;
     margin:0 auto;
     border:1px solid #e0e0e0;
     background:#fff;
     border-radius: 4px;
  }
  .m-box-list div.el-row{
    line-height: 30px;
  }
</style>
