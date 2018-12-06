<template>
  <section ref="sec">
    <div class="m-search">
      <div class="greyFont">
        <el-row class="f-mt-10">
          <el-col :xs="24" :sm="24" :md="24" :lg="22" :xl="20" >
            <div class="grid-content bg-purple">
              <el-col :xs="4" :sm="3" :md="3" :lg="2" :xl="2" >
                <div class="grid-content bg-purple-dark f-ta-r inputTitle">上传文件&nbsp;:&nbsp;</div>
              </el-col>
              <el-col class="m-data-picker" :xs="20" :sm="18" :md="18" :lg="18" :xl="18" >
                  <el-date-picker
                    style="border-radius:4px;width:200px;"
                    v-model="startTime"
                    type="month"
                    size="small"
                    placeholder="选择年月"></el-date-picker>
                  <el-upload
                    class="m-upload"
                    ref="upload"
                    name="files"
                    action="ums/w/account/upload-excel"
                    accept=".xlsx,.xls"
                    :data="upInfo"
                    :headers="headerInfo"
                    :on-change="handleChange"
                    :on-success="handleSuccess"
                    :on-error="handleError"
                    :file-list="fileList"
                    :auto-upload="false">
                    <el-button slot="trigger" size="small" type="success">选取文件</el-button>
                    <el-button style="margin-left: 10px;" size="small" type="primary" @click="submitUpload">上传文件</el-button>
                  </el-upload>
                  <el-col>*上传佣金文件前，请选择相应的时间以确保上传文件的准确性</el-col>
              </el-col>
              <el-row v-if="false">
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
                          v-model="startTime2"
                          size="small"
                          type="datetime"
                          :clearable=false                                        
                          :editable=false                    
                          placeholder="选择开始时间">
                          </el-date-picker><el-date-picker
                          v-model="endTime2"
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
      <div v-if="searchlist">
        <div class="m-listTitleFoot">
          <el-row>
            <h3>账户列表<span class="f-fw greyFont">({{total||'0'}})</span></h3>
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
              <td>佣金累计返利金额（元）</td>
              <td>佣金已结算金额（元）</td>
              <td>佣金未开票金额（元）</td>
            </tr>
            <tr v-for="(v,i) of searchList" :key="i">
              <td>{{(currentPage-1)*15+(i+1)}}</td>
              <td>{{v.departName||'--'}}</td>
              <td>{{v.username||'--'}}</td>
              <td>{{v.phone||'--'}}</td>
              <td>{{v.dealerIdName||'--'}}</td>
              <td><a @click="details(1,v)">{{translateData('fenToYuan',v.balance)}}</a></td>
              <td><a @click="details(2,v)">{{translateData('fenToYuan',v.commission)}}</a></td>
              <td>{{translateData('fenToYuan',v.settled)}}</td>
              <td></td>
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
  </section>
</template>
<script>
  import { } from '../../config/service.js';
  import { getTimeFunction,getStore } from '../../config/utils';
  export default {
    data() {
      return {
        searchlist:"",
        startTime:"",
        startTime2:"",
        endTime2:"",
        operator:"",
        headerInfo:{},
        upInfo:{},
        fileList:[]
      }
    },
    created: function() {
      getTimeFunction(this);
      let info = getStore('YFD_NMS_INFO'),vm=this,
      packageName = info.packageName,
      timestamp = info.timestamp,
      token = info.token,
      userId = info.userId;
      Object.assign(vm.headerInfo,{packageName},{timestamp},{token},{userId}); 
      Object.assign(vm.upInfo,{userId:userId});
    },
    methods: {
      search(){
        let vm=this,json;
        json={
          startTime:new Date(vm.startTime).getTime(),
          endTime:new Date(vm.endTime).getTime(),
          operator:vm.operator
        };
      },
      submitUpload() {
        Object.assign(this.upInfo,{startTime:new Date(this.startTime).getTime()});
        this.$refs.upload.submit();
      },
      handleChange(file, fileList) {
        this.fileList = fileList.slice(-1);
      },handleSuccess(){
        this.$message('上传文件成功');
      },handleError(){
        this.$message.error('上传文件失败');
      }
    }
  }
</script>
<style>
  .m-data-picker .el-date-editor:nth-child(1) .el-input__inner {
    border-radius: 4px !important;
  }
  .m-upload{
    display: inline-block;
  }
  .el-upload-list{
    display: inline-block;
    float: left;
  }
  .el-upload-list__item{
    line-height: 2;
  }
</style>

