
<template>
  <section>
    <div class="m-details">
      <div class="headTitle f-s-16" style="padding:5px;height:auto">
          <p><span>
          {{$parent.off.simList?'SIM号段详情':$parent.off.numList?'号码详情':'--'}} : 
          {{$parent.listname}}
          </span></p>
      </div>
      <div v-if="$parent.off.simList" class="m-sim-list">
        <p><span v-for="(v,i) in simlist.simGroups" :key='i'> {{v.simName}}({{v.simGroupTotal}})</span></p>
        <div v-if="false" class="m-number-list" style="width:100%;height:100%;">
          <p v-for="(value,i) of simList[i].numbers" :key="i">
            <span style="text-align:left" class="m-number" v-for="(v,i) of value" :key="i">
              <el-popover placement="bottom-start" title="资费介绍" width="300" trigger="hover">
                <p style="word-wrap: break-word;white-space:normal; width:180px;font-size:12px;color:grey">{{v.remark||'--'}}</p>
                <el-button slot="reference">
                  <p class="m-number-desc">
                    <label>{{v.phone}}</label><br> 
                    <span>SIM号:{{v.sim}}</span><br>
                    <span>资费:{{v.voice||'--'}}</span>
                    <span>面额:{{v.faceValue/100}}</span>
                  </p>
                </el-button>
              </el-popover>
            </span>
          </p>
          <p class="f-ta-c" v-if="!simList.simGroups.length">此号包下暂无码号详情</p>
        </div>
      </div>
      <div v-if="$parent.off.numList" class="m-number-list" style="width:100%;height:100%;">
        <p ><span v-for="(v,i) of numlist.numbers" :key="i" class="f-s-12">
            手机号 : <span>{{v.phone}}</span><br>
            sim号 : <span>{{v.sim}}</span><br>
          </span></p>
        <p class="f-ta-c greyFont f-s-14" v-if="!numlist.numbers">
          <span style="padding:10px 0;">此号包下无号码详情</span></p>
        <el-col ors:xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <div class="grid-content bg-purple" style="padding:10px 16px">
            <el-pagination layout="prev, pager, next" 
              :page-size="60" @current-change="details" :current-page.sync="currentPage" :total="numlist.total">
            </el-pagination>
          </div>
        </el-col>
      </div>
    </div>
  </section>
</template>
<script>
  import {
    getDateTime,
    getUnixTime,
    errorDeal,
    translateData
  } from "../config/utils.js";
  import {
    getPickCardNum
  } from "../config/service.js"
  export default {
    props: {
      numlist: Object,
      simlist: Object,
    },
    data() {
      return {
        currentPage: 0,
        pageNumDetails: "", //号包详情
        pageNumLiang: "", //靓号详情
        pageNumPu: "", //普号详情
        off: {
          layer: false,
          dlsDetails: false,
          notDlsDetails: true,
        },
        form: {
          page: 0
        },
      }
    },
    methods: {
      goBack() {
        let vm=this.$parent;
        vm.off.cardDetails = false;
        vm.off.notCardDetails = true;
        if (vm.off.searchList == true) {
          vm.search();
        }
      },
      getDateTime(v) {
        return getDateTime(v)
      },
      details(p) {
        let vm = this.$parent,
        json = vm.searchJson;
        json.pageNum = p || 1;
        getPickCardNum(json)
          .then(res=>{
            if(res&&res.data){
              vm.numdata = res.data;
              // vm.off.numList=true;
              // vm.off.simlist=false;
            }else{
              errorDeal(res)
            }
          }).catch(e=>errorDeal(e))
      },
      translateData(type, v) {
        return translateData(type, v)
      }
    }
  }
</script>
<style scoped>
  table.numberInfo td:nth-child(odd) {
    width: 200px;
    text-align: right
  }
  table.numberInfo td:nth-child(even) {
    text-align: left;
    padding-left: 20px;
  }
  .headTitle {
    height: 50px;
    padding: 10px 20px
  }
  .m-number>span {
    display: inline-block;
    width: 100%;
  }
  .m-number-desc {
    width: 70%;
    min-width: 140px;
    margin: 0 auto;
    text-align: left
  }
  .m-number-desc span {
    display: inline-block;
    font-size: 12px;
    color: #9c9c9c
  }
  .m-number-list,.m-sim-list{
    border: 1px solid #dbdbdb;
  }
  .m-number-list>p:nth-child(odd),.m-sim-list>p:nth-child(odd){
    background: #fff;
  }
  .m-number-list>p>span{
    display: inline-block;
    width: 16.6667%;
    padding:10px;
    text-align: left;
    border: 1px solid #eee;
  }
  /* .m-number-list>p>span:nth-child(odd){
    background: 
  } */
  .m-sim-list>p>span{
    display: inline-block;
    width: 33.33333%;
    padding: 10px;
    text-align: left;
    border: 1px solid #eee;
  }
</style>
