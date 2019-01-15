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
              <el-row>
                <el-row>
                  <el-col :span="24"><div class="grid-content bg-purple-dark m-search-title black">查询</div></el-col>
                </el-row>
                <el-row :span="24">
                  <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
                    <div class="grid-content bg-purple-light">
                      <el-col :xs="4" :sm="4" :md="6" :lg="4" :xl="4" class="m-form-radio f-ta-r">
                        <label><span class="radioYes"><input type="radio" value="1" v-model="form.searchKind" checked="checked"><span></span></span><span class="text greyFont">手机号码：</span></label>
                      </el-col>
                      <el-col :xs="18" :sm="16" :md="18" :lg="16" :xl="16">
                        <el-input v-model="phoneNum" size="small" maxlength=25 placeholder="请输入查询的手机号码"></el-input>
                      </el-col>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="20" :md="12" :lg="12" :xl="12">
                    <div class="grid-content bg-purple-light">
                      <el-col :xs="4" :sm="4" :md="6" :lg="4" :xl="4" class="m-form-radio f-ta-r">
                        <label><span class="radioYes"><input type="radio" value="2" v-model="form.searchKind" checked="checked"><span></span></span><span class="text greyFont">SIM号码：</span></label>
                      </el-col>
                      <el-col :xs="18" :sm="16" :md="18" :lg="16" :xl="16">
                        <el-input v-model="simNum" size="small" maxlength=25 placeholder="请输入查询的SIM号码"></el-input>
                      </el-col>
                    </div>
                  </el-col>
                </el-row>
                <el-row style="text-align:center" class="marginTop">
                  <el-button type="success" size="small" @click="search()">搜索</el-button>
                </el-row>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- 查询结果列表 -->
      <div v-if="searchlist.length" class="m-details">
        <p class="m-searchlist-title"><span>查询结果</span><span>
              <el-button size="mini" style="padding:5px !important;margin-right:10px" @click="downLoad()" type="success">导出</el-button></span></p>
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
            <td>SIM号码</td>
          </tr>
          <tr v-for="(v,i) of searchlist" :key="i">
            <td>{{(currentPage-1)*15+(i+1)}}</td>
            <td>{{v.phone||'--'}}</td>
            <td>{{v.sectionId||'--'}}</td>
            <td>{{translateData(4,v.brand)}}</td>
            <td>{{v.area||'--'}}</td>
            <td>{{v.packageName||'--'}}</td>
            <td>{{v.voice || '--'}}</td>
            <td>{{v.faceValue}}元</td>
            <td>{{v.inPrice}}元</td>
            <td>{{v.huafenDesc || '--'}}</td>
            <td>{{getDateTime(v.inTime)[6]}}</td>
            <td>{{getDateTime(v.outTime)[6]}}</td>
            <td>{{getDateTime(v.returnTime)[6]}}</td>
            <td>
              <a v-if="v.agentName" :href="`#/home/accountManage/info?company=${v.agentName}`">{{v.agentName}}</a>
              <span v-else>--</span>
            </td>
            <td>{{v.dealerManager||'--'}}</td>
            <td>
              <a v-if="v.dealer" :href="`#/home/organization/yfd?dealerName=${v.dealer}`">{{v.dealer}}</a>
              <span v-else>--</span>
            </td>
            <td>{{ v.agentNamePath }}</td>
            <td>{{ v.phoneTypeDesc }}</td>
            <td>{{ v.sim }}</td>
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
        total:0,
        simNum:"",
        upInfo:{},
        fileList:[],
        phoneNum:"",
        startTime:"",
        headerInfo:{},
        searchlist:[],
        currentPage:"",
        form:{
          searchKind:1
        }
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
        if(isNaN(vm.phoneNum)||vm.phoneNum.length!=11){
          vm.$message({
            message: '请输入正确的手机号码!',
            type: 'error'
          });
          return false;
        }
        json={
          "pageNum": p||1,
          "pageSize": 15,
          "searchPhone":vm.phoneNum
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

