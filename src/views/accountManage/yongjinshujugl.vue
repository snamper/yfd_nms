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
              <el-row>
                <el-col class="m-data-picker" :xs="20" :sm="18" :md="18" :lg="18" :xl="18" >
                    <el-date-picker
                      style="border-radius:4px;width:200px;"
                      v-model="startTime"
                      type="month"
                      size="small"
                      placeholder="选择年月"></el-date-picker>
                    <el-upload
                      action="customer"
                      class="m-upload"
                      ref="upload"
                      name="files"
                      accept=".xlsx,.xls"
                      :data="upInfo"
                      :file-list="fileList"
                      :headers="headerInfo"
                      :on-change="handleChange"
                      :http-request="handleUpload"
                      :auto-upload="false">
                      <el-button slot="trigger" size="small" type="success">选取文件</el-button>
                      <el-button style="margin-left: 10px;" size="small" type="primary" @click="submitUpload">上传文件</el-button>
                    </el-upload>
                    <el-col>*上传佣金文件前，请选择相应的时间以确保上传文件的准确性</el-col>
                </el-col>
              </el-row>
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
      <div v-if="searchlist" class="m-details">
        <el-row>
          <h3>上传记录<span class="f-fw greyFont">({{total||'0'}})</span></h3>
        </el-row>
        <table class="m-searchTab" style="width:100%;height:100%;">
          <tr>
            <td>序号</td>
            <td>上传时间</td>
            <td>操作人</td>
            <td>操作人手机号码</td>
            <td>文件名</td>
          </tr>
          <tr v-for="(v,i) of searchlist" :key="i">
            <td>{{(currentPage-1)*15+(i+1)}}</td>
            <td>{{getDateTime(v.createTime)[6]}}</td>
            <td>{{v.username}}</td>
            <td>{{v.phone}}</td>
            <td>{{v.fileName}}</td>
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
  import { upRecords,upExcel } from '../../config/service.js';
  import { getTimeFunction,getStore, errorDeal,getDateTime } from '../../config/utils';
  export default {
    data() {
      return {
        searchlist:"",
        total:"",
        currentPage:"",
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
      search(p){
        let vm=this,json;
        json={
          "endTime": new Date(vm.endTime2).getTime(),
          "pageNum": p||1,
          "pageSize": 15,
          "startTime": new Date(vm.startTime2).getTime(),
          "username": vm.operator
        };
        upRecords(json)
        .then(res=>{
          vm.searchlist = res.data.list;
          vm.total = res.data.total;
          vm.currentPage = p || 1;
        }).catch(e=>errorDeal(e))
      },
      handleUpload(p){
        let vm=this,json;
        json = {
          'file':p.file,'fileName':p.file.name,'startTime':new Date(this.startTime).getTime()
        }
        upExcel(json,()=>{return "upload"})
        .then(function(res){
          vm.$refs.upload.clearFiles();
          if(res&&res.code==200){
            vm.$message({
              message: '上传成功!',
              type: 'success'
            });
          }else{
            vm.$message({
              message: '上传失败!',
              type: 'error'
            });
          }
        }).catch(e=>errorDeal(e))
      },
      // beforeUpload(file){
      //   let vm=this,json;
      //   let info = getStore('YFD_NMS_INFO');
      //   json = {
      //     'file':file,'userId':info.userId,'startTime':new Date(this.startTime).getTime()
      //   }
      //   upExcel(json,()=>{return "upload"})
      //   .then(function(res){
      //     this.$refs.upload.clearFiles();
      //     if(res&&res.code==200){
      //       this.$message('上传文件成功');
      //     }else{
      //       this.$message.error('上传文件失败');
      //     }
      //   })
      // },
      submitUpload(file) {
        this.$refs.upload.submit();
      },
      handleChange(file, fileList) {
        this.fileList = fileList.slice(-1);
      },
      getDateTime(t){
        return getDateTime(t)
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

