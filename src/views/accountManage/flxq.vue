<template>
  <section ref="sec">
    <el-container>
      <el-header class="m-headBar">
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">佣金累计返利金额</div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light fr" style="padding-right:40px">
              <a href="javascript:void(0)" class="blue" @click="back()">返回列表</a>
            </div>
          </el-col>
        </el-row>
      </el-header>
    </el-container>
    <!-- <div class="greyFont">
      <el-row>
        <el-col :span="24"><div class="grid-content bg-purple-dark m-search-title black">搜索条件</div></el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12"><div class="grid-content bg-purple-light">
          <el-col :xs="5" :sm="6" :md="6" :lg="4" :xl="4"><div class="grid-content bg-purple-dark f-ta-r inputTitle">渠道名称：</div></el-col>
          <el-col :xs="16" :sm="14" :md="14" :lg="16" :xl="16">
            <el-input v-model="depName" :maxlength="10" size="small" placeholder="请输入查询的渠道名称"></el-input>
          </el-col>
          <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4"></el-col> 
        </div></el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12"><div class="grid-content bg-purple-light">
          <el-col :xs="5" :sm="6" :md="6" :lg="4" :xl="4"><div class="grid-content bg-purple-dark f-ta-r inputTitle">代理商名称：</div></el-col>
          <el-col :xs="16" :sm="14" :md="14" :lg="16" :xl="16">
            <el-input type="tel" v-model="dealerName" :maxlength="11" size="small" placeholder="请输入查询的代理商名称"></el-input>
          </el-col>
          <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
          </el-col> 
        </div></el-col>
      </el-row>
      <el-row style="text-align:center">
        <button class="m-btn-orange m-btn-search" @click="search(1,1)">搜索</button>
      </el-row>
    </div> -->
    <!-- 查询结果列表 -->
    <el-row style="width:96%;margin-left:2%">
      <el-col :span="12" class="f-ta-l f-pl-10" >
        <div class="grid-content bg-purple">
          <span>佣金详情</span>
          <span class="greyFont">【类目：{{translateData('yjType',$parent.detailRebateType)}}】</span>
        </div>
      </el-col>
      <el-col :span="12" class="f-ta-r" >
        <div class="grid-content bg-purple-light">
          <label v-if="false">
            <span>合计金额 : ￥</span>
            <b class="yellow f-fs16">{{12345}}</b>
          </label>
        </div>
      </el-col>
    </el-row>
    <div class="m-details">
      <table class="m-searchTab" style="width:100%;height:100%;" >
        <tr>
          <td>序号</td>
          <td>代理商名称</td>
          <td>渠道名称</td>
          <td>数量（张）</td>
          <td>返利金额（元）</td>
        </tr>
        <tr v-for="(v,i) in list" :key="i" >
          <td>{{(currentPage-1)*1+(i+1)}}</td>
          <td>{{v.departName||'--'}}</td>
          <td>{{v.dealerName||'--'}}</td>
          <td>{{v.amount||'--'}}</td>
          <td>{{translateData('fenToYuan',v.rebate)}}</td>
        </tr>
      </table>
      <el-pagination
        layout="prev, pager, next"
        :page-size="15"
        @current-change="search(currentPage,2)"
        :current-page.sync="currentPage"
        :total="listTotal">
      </el-pagination> 
    </div>
  </section>
</template>
<script>
import { cmsdetails } from "../../config/service.js";
import { errorDeal,translateData } from "../../config/utils";
export default {
  props:{list:Array,listTotal:Number,listPage:Number},
  data() {
    return {
      depName:"",
      dealerName:"",
      currentPage:0,
    };
  },
  watch:{
    'listPage'(){ 
      this.currentPage = this.listPage;
    }
  },
  methods: {
    search(p,i) {
      let vm=this;
      if(i==2){
        vm.$parent.details(p,'',i)
      }else if(i==1){

      }
    },
    back() {
      let vm = this;
      vm.$parent.off.rebate = false;
    },
    translateData(v,i){
      return translateData(v,i)
    }
  }
};
</script>
