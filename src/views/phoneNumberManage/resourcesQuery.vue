<template>
  <section ref="sec">
    <div class="m-search">
      <div class="greyFont">
        <el-row class="f-mt-10">
          <el-col :xs="24" :sm="24" :md="24" :lg="22" :xl="20" >
            <div class="grid-content bg-purple">
              <el-row v-if="false">
                <el-col :span="24"><div class="grid-content bg-purple-dark m-search-title black">资源查询</div></el-col>
              </el-row>
              <!-- <el-row v-if="false">
                <el-col :xs="4" :sm="3" :md="3" :lg="2" :xl="2" >
                  <div class="grid-content bg-purple-dark f-ta-r inputTitle">上传文件&nbsp;:&nbsp;</div>
                </el-col>
                <el-col class="m-data-picker" :xs="20" :sm="18" :md="18" :lg="18" :xl="18" >
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
                    <el-button style="margin-left: 10px;" size="small" type="primary" @click="submitUpload">查询</el-button>
                  </el-upload>
                </el-col>
              </el-row> -->
              <el-row>
                <el-row>
                  <el-col :span="24"><div class="grid-content bg-purple-dark m-search-title black">查询</div></el-col>
                </el-row>
                <el-row>
                  <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
                    <div class="grid-content bg-purple-light">
                      <el-col :xs="4" :sm="4" :md="6" :lg="4" :xl="4"><div class="grid-content bg-purple-dark f-ta-r inputTitle">手机号码&nbsp;&nbsp;</div></el-col>
                      <el-col :xs="18" :sm="20" :md="12" :lg="16" :xl="16">
                        <el-input v-model="phone" size="small" maxlength=11 placeholder="请输入查询的手机号码"></el-input>
                      </el-col>
                      <el-col :span="2"></el-col> 
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
                    <div class="grid-content bg-purple">
                      <el-button type="success" size="small" @click="search()">查询</el-button>
                    </div>
                  </el-col>
                </el-row>
                <!-- <el-row style="text-align:center" class="marginTop"></el-row> -->
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- 查询结果列表 -->
      <div v-if="searchlist.length" class="m-details">
        <el-row><h3>查询结果</h3></el-row>
        <table class="m-searchTab" style="width:100%;height:100%;">
          <tr>
            <td>序号</td>
            <td>手机号码</td>
            <td>所属号段</td>
            <td>品牌</td>
            <td>归属地</td>
            <td>套餐</td>
            <td>资费</td>
            <td>面值</td>
            <td>入库价</td>
            <td>话分比例</td>
            <td>入库时间</td>
            <td>出库时间</td>
            <td>退卡时间</td>
            <td>代理商名称</td>
            <td>渠道经理</td>
            <td>现归属渠道</td>
            <td>当前状态</td>
            <td>号码类型</td>
            <td>sim号</td>
          </tr>
          <tr v-for="(v,i) of searchlist" :key="i">
            <td>{{(currentPage-1)*15+(i+1)}}</td>
            <td>{{v.phone||'--'}}</td>
            <td>{{v.sectionId||'--'}}</td>
            <td>{{translateData(4,v.brand)}}</td>
            <td>{{v.area||'--'}}</td>
            <td>
              <p style="display:inline-block;
                max-width:160px;
                word-wrap: break-word;
                word-break: break-all;">{{v.packageName||'--'}}</p>
            </td>
            <td>
              <p style="display:inline-block;
                max-width:160px;
                word-wrap: break-word;
                word-break: break-all;">{{v.voice || '--'}}</p>
            </td>
            <td>{{translateData('fenToYuan',v.faceValue)}}元</td>
            <td>{{translateData('fenToYuan',v.inPrice)}}元</td>
            <td>{{v.huafenDesc || '--'}}</td>
            <td>{{getDateTime(v.inTime)[8]}}<br>
            {{getDateTime(v.inTime)[5]}}
            </td>
            <td>{{getDateTime(v.outTime)[8]}}<br>
            {{getDateTime(v.outTime)[5]}}
            </td>
            <td>{{getDateTime(v.returnTime)[8]}}<br>
            {{getDateTime(v.returnTime)[5]}}
            </td>
            <td>
              <a v-if="v.agentName" :href="`#/home/accountManage/info?company=${v.agentName}`">{{v.agentName}}</a>
              <span v-else>--</span>
            </td>
            <td>{{v.dealerManager||'--'}}</td>
            <td>
              <a v-if="v.dealer" :href="`#/home/organization/yfd?dealerName=${v.dealer}`">{{v.dealer}}</a>
              <span v-else>--</span>
            </td>
            <td>{{ v.phoneState==1?'在库':v.phoneState==2?'出库':'--' }}</td>
            <td>{{ v.phoneTypeDesc||'--' }}</td>
            <td><p style="display:inline-block;
                max-width:160px;
                word-wrap: break-word;
                word-break: break-all;">{{ v.sim||'--' }}</p></td>
          </tr>
        </table>
        <el-pagination 
          v-if="searchlist.length!=0"
          layout="prev, pager, next" 
          @current-change="search(currentPage,1)" 
          :page-size="15" 
          :current-page.sync="currentPage"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </section>
</template>
<script>
  import { upRecords,upExcel,numberResource } from '../../config/service.js';
  import { getTimeFunction, getStore, errorDeal, getDateTime,translateData } from '../../config/utils';
  export default {
    data() {
      return {
        searchlist:[],
        total:0,
        currentPage:"",
        startTime:"",
        phone:"",
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
        if(isNaN(vm.phone)||vm.phone.length!=11){
          vm.$message({
            message: '请输入正确的手机号码!',
            type: 'error'
          });
          return false;
        }
        json={
          "pageNum": p||1,
          "pageSize": 15,
          "searchPhone":vm.phone
        };
        numberResource(json)
        .then(res=>{
          vm.searchlist = [res.data];
          vm.total = 1;
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
      submitUpload(file) {
        this.$refs.upload.submit();
      },
      handleChange(file, fileList) {
        this.fileList = fileList.slice(-1);
      },
      translateData(i,v){
        return translateData(i,v)
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

