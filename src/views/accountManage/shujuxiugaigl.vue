<template>
  <section ref="sec">
    <div class="m-search">
      <div class="greyFont">
        <el-row class="f-mt-10">
          <el-col :xs="24" :sm="24" :md="24" :lg="22" :xl="20" >
            <div class="grid-content bg-purple">
              <el-row>
                <el-row>
                  <el-col :span="24"><div class="grid-content bg-purple-dark m-search-title black">搜索条件</div></el-col>
                </el-row>
                <el-row>
                  <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
                    <div class="grid-content bg-purple">
                      <el-col :xs="4" :sm="4" :md="6" :lg="4" :xl="4"><div class="grid-content bg-purple-dark f-ta-r inputTitle">选择时间：</div></el-col>
                      <el-col :xs="18" :sm="20" :md="12" :lg="16" :xl="16">
                        <div class="block">
                          <el-date-picker
                          v-model="startTime"
                          size="small"
                          type="datetime"
                          :clearable=false                                        
                          :editable=false                    
                          placeholder="选择开始时间">
                          </el-date-picker><el-date-picker
                          v-model="endTime"
                          size="small"
                          type="datetime"
                          :clearable=false                                        
                          :editable=false                    
                          placeholder="选择结束时间">
                          </el-date-picker>
                        </div>
                      </el-col>
                      <el-col :span="2"></el-col> 
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
                    <div class="grid-content bg-purple-light">
                      <el-col :xs="4" :sm="4" :md="6" :lg="4" :xl="4"><div class="grid-content bg-purple-dark f-ta-r inputTitle">操作人姓名：</div></el-col>
                      <el-col :xs="18" :sm="20" :md="12" :lg="16" :xl="16">
                        <el-input v-model="operator" size="small" maxlength=20 placeholder="请输入查询的操作人姓名"></el-input>
                      </el-col>
                      <el-col :span="2"></el-col> 
                    </div>
                  </el-col>
                </el-row>
                <el-row style="text-align:center" class="marginTop">
                  <button class="m-btn-orange m-btn-search" @click="search()">搜索</button>
                </el-row>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- 查询结果列表 -->
      <div v-if="searchlist" class="m-details">
        <el-row>
          <h3>修改记录<span class="f-fw greyFont">({{total||'0'}})</span></h3>
        </el-row>
        <table class="m-searchTab" style="width:100%;height:100%;">
          <tr>
            <td>序号</td>
            <td>修改时间</td>
            <td>操作人</td>
            <td>操作人手机号码</td>
            <td>公司名称</td>
            <td>未开票修改金额(元)</td>
            <td>未开票修改后金额(元)</td>
          </tr>
          <tr v-for="(v,i) of searchlist" :key="i">
            <td>{{(currentPage-1)*15+(i+1)}}</td>
            <td>{{getDateTime(v.createTime)[6]}}</td>
            <td>{{v.operatorName}}</td>
            <td>{{v.operatorPhone}}</td>
            <td>{{v.departName}}</td>
            <td>{{translateData('fenToYuan',v.afterUnbill-v.beforeUnbill)}}</td>
            <td>{{translateData('fenToYuan',v.afterUnbill)}}</td>
          </tr>
        </table>
        <el-pagination 
          v-if="searchlist.length!=0"
          layout="prev, pager, next" 
          :page-size="15" 
          @current-change="search(currentPage,1)" 
          :current-page.sync="currentPage"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </section>
</template>
<script>
  import { updateRecords } from '../../config/service.js';
  import { getTimeFunction,errorDeal,getDateTime,translateData } from '../../config/utils';
  export default {
    data() {
      return {
        total:"",
        endTime:"",
        operator:"",
        startTime:"",
        searchlist:"",
        currentPage:"",
      }
    },
    created: function() {
      getTimeFunction(this);
    },
    methods: {
      search(p){
        let vm=this,json;
        json={
          "pageSize": 15,
          "pageNum": p||1,
          "username": vm.operator,
          "endTime": new Date(vm.endTime2).getTime(),
          "startTime": new Date(vm.startTime2).getTime(),
        };
        updateRecords(json)
        .then(res=>{
          vm.searchlist = res.data.list;
          vm.total = res.data.total;
          vm.currentPage = p || 1;
        }).catch(e=>errorDeal(e))
      },
      getDateTime(t){
        return getDateTime(t)
      },translateData(v,i){
        return translateData(v,i)
      }
    }
  }
</script>
<style>

</style>

