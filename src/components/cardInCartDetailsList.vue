<style scoped>
  table.numberInfo td:nth-child(odd) {
    width: 200px;
    text-align: right
  }

  table.numberInfo td:nth-child(even) {
    text-align: left;
    padding-left: 20px;
  }

  div.headTitle {
    height: 50px;
    padding: 10px 20px;
  }
</style>
<template>
  <section>
    <div class="allDetails">
      <div class="headTitle f-s-16">
        <span class="fl">订单详情</span><span><a href="javascript:void(0)" class="fr blue" @click="goBack()">返回列表</a></span>
      </div>
    </div>
    <div class="liang" v-if="listSwitch.liang">
      <div class="m-listTitleFoot">
        <h3><span>靓号详情</span><span class="greyFont"> ({{dataListLiang.total||'0'}})</span></h3>
      </div>
      <div class="m-details">
        <table class="m-searchTab" style="width:100%;height:100%;">
          <tr v-for="(v,i) of dataListLiang" :key="i">
            <td v-for="(v,i) of dataListLiang[i]" :key="i">{{v.phone}}</td>
          </tr>
          <tr v-if="!dataListLiang.length">
            <td class="f-ta-c greyFont f-s-14">此号包下暂无靓号详情</td>
          </tr>
        </table>
      </div>
    </div>
    <el-row style="padding-left:16px;" v-if="dataListLiang.length">
      <el-col ors:xs="24" :sm="12" :md="12" :lg="12" :xl="12">
        <div class="grid-content bg-purple">
          <el-pagination layout="prev, pager, next" :page-size="60" @current-change="searchNumberListCute"
            :current-page.sync="currentPage1" :total="dataListLiang.total">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
    <div class="pu" v-if="listSwitch.pu">
      <div class="m-listTitleFoot">
        <h3><span>普号详情</span><span class="greyFont"> ({{dataListPu.total||'0'}})</span></h3>
      </div>
      <div class="m-details">
        <table class="m-searchTab" style="width:100%;height:100%;">
          <tr v-for="(v,i) of dataListPu" :key="i">
            <td v-for="(v,i) of dataListPu[i]" :key="i">{{v.phone}}</td>
          </tr>
          <tr v-if="!dataListPu.length">
            <td class="f-ta-c greyFont f-s-14">此号包下暂无普号详情</td>
          </tr>
        </table>
      </div>
      <el-row style="padding-left:16px;" v-if="dataListPu.length">
        <el-col ors:xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <div class="grid-content bg-purple">
            <el-pagination layout="prev, pager, next" :page-size="60" @current-change="searchNumberList"
              :current-page.sync="currentPage" :total="dataListPu.total">
            </el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
  </section>
</template>
<script>
  import {
    getDateTime,
    errorDeal,
    translateData
  } from "../config/utils.js";
  import {
    requestMethod
  } from "../config/service.js"
  export default {
    props: {
      dataListLiang: Array,
      dataListPu: Array,
      listSwitch: Object,
      pickCardSwitch: Boolean
    },
    data() {
      return {
        currentPage: 0,
        currentPage1: 0,
        pageNumDetails: "", //号包详情
        pageNumLiang: "", //靓号详情
        pageNumPu: "", //普号详情
        off: {
          layer: false
        },
        form: {
          page: 0
        },
      }
    },
    methods: {
      goBack() {
        let vm = this.$parent;
        vm.off.searchList = true;
        vm.off.layer = false;
        vm.off.cardlistDetails = false;
      },
      searchNumberList(v) {
        let vm = this,
          url = "/nms/w/number/getProductNumbers",
          data = {};
        data.searchProductId = vm.$parent.searchProductListId;
        data.sessionType = "2";
        data.phoneLevel = 1;
        data.pageNum = v || 1;
        data.pageSize = 60;
        requestMethod(data, url)
          .then((data) => {
            this.$set(vm.$parent.listSwitch, 'pu', true)
            vm.$parent.searchPu = []
            for (var i = 0, len = data.data.numbers.length; i < len; i += 6) {
              vm.$parent.searchPu.push(data.data.numbers.slice(i, i + 6));
            }
            vm.$parent.searchPu.total = data.data.total;
          }).catch(e => errorDeal(e))
      },
      searchNumberListCute(v) {
        let vm = this,
          url = "/nms/w/number/getMngCuteNumbers",
          data = {};
        data.searchProductId = vm.$parent.searchProductListId;
        data.sessionType = "1";
        data.phoneLevel = 1;
        data.pageNum = v || 1;
        data.pageSize = 60;
        requestMethod(data, url)
          .then((data) => {
            this.$set(vm.$parent.listSwitch, 'liang', true)
            vm.$parent.searchLiang = []
            for (var i = 0, len = data.data.numbers.length; i < len; i += 6) {
              vm.$parent.searchLiang.push(data.data.numbers.slice(i, i + 6));
            }
            vm.$parent.searchLiang.total = data.data.total;
          }).catch(e => errorDeal(e))
      },
      translateData(type, v) {
        return translateData(type, v)
      },
      getDateTime(v) {
        return getDateTime(v)
      }
    }
  }
</script>
