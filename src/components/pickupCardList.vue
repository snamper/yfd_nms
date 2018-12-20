
<template>
  <section>
    <div v-if="newData" class="pu">
      <div class="m-listTitleFoot">
        <p><span>号码详情</span>【<span class="blue">{{dataInfo.info.productName||'--'}} ({{dataInfo.info.total||'--'}}个)</span>】</p>
      </div>
      <div v-for="(v,i) in newData" :key='i' class="m-details">
        <p style="margin:5px 0"><span class="grey">SIM号段 :</span>
        <span> {{newData[i].simName}}({{newData[i].simGroupTotal}})</span></p>
        <div class="m-number-list" style="width:100%;height:100%;">
          <p v-for="(value,i) of newData[i].numbers" :key="i">
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
        </div>
      </div>
      <p class="f-ta-c" v-if="!newData.length">此号包下暂无码号详情</p>
    </div>
    <el-row v-if="newData.length">
      <el-col ors:xs="24" :sm="12" :md="12" :lg="12" :xl="12">
        <div class="grid-content bg-purple" style="padding:10px 16px">
          <el-pagination layout="prev, pager, next" :page-size="30" @current-change="details" :current-page.sync="currentPage"
            :total="dataInfo.total">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
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
    requestgetOrderSplitNumbers
  } from "../config/service.js"
  export default {
    props: {
      newData: Array,
      dataInfo: Object,
      pickCardSwitch: Boolean
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
        this.$parent.off.cardDetails = false;
        this.$parent.off.notCardDetails = true;
        if (this.$parent.off.searchList == true) {
          this.$parent.search();
        }
      },
      getDateTime(v) {
        return getDateTime(v)
      },
      details(p) {
        let vm = this.$parent,
          json = vm.searchJson;
        json.pageNum = p || 1;
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
  .m-number-list{
        border: 1px solid #dbdbdb;
    }
    .m-number-list>p:nth-child(odd){
        background: #fff;
    }
    .m-number-list>p>span{
        display: inline-block;
        width: 16.6667%;
    }
</style>
