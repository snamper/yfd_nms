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
                  <el-col>
                    <div class="grid-content bg-purple-light">
                      <el-col :xs="4" :sm="4" :md="4" :lg="2" :xl="2" class="m-form-radio f-ta-r">
                        <label><span class="radioYes"><input type="radio" value="1" v-model="form.searchKind" checked="checked"><span></span></span><span class="text greyFont">排序方式：</span></label>
                      </el-col>
                      <el-col :xs="20" :sm="20" :md="20" :lg="22" :xl="20">
                        <el-radio v-model="cardType" label="1,2">全部</el-radio>
                        <el-radio v-model="cardType" label="1">SIM号</el-radio>
                        <el-radio v-model="cardType" label="2">号码</el-radio>
                      </el-col>
                    </div>
                  </el-col>
                </el-row>
                <el-row :span="24">
                  <el-col>
                    <div class="grid-content bg-purple-light">
                      <el-col :xs="4" :sm="4" :md="4" :lg="2" :xl="2" class="m-form-radio f-ta-r">
                        <label><span class="radioYes"><input type="radio" value="2" v-model="form.searchKind" checked="checked"><span></span></span><span class="text greyFont">在售品牌：</span></label>
                      </el-col>
                      <el-col :xs="20" :sm="20" :md="20" :lg="22" :xl="20">
                        <el-checkbox text-color="#48576a" style="display:inline;" :indeterminate="isIndeterminate" v-model="checkAll"
                          @change="handleCheckAllChange">全选</el-checkbox>
                        <el-checkbox-group style="display:inline" v-model="checkedCities" @change="handleCheckedCitiesChange">
                          <el-checkbox v-for="city in cities1" :label="city" :key="city">{{city}}</el-checkbox>
                          <el-checkbox v-for="city in cities2" :label="city" :key="city">{{city}}</el-checkbox>
                          <el-checkbox v-for="city in cities3" :label="city" :key="city">{{city}}</el-checkbox>
                          <el-checkbox v-for="city in cities4" :label="city" :key="city">{{city}}</el-checkbox>
                          <el-checkbox v-for="city in cities5" :label="city" :key="city">{{city}}</el-checkbox>
                          <el-checkbox v-for="city in cities6" :label="city" :key="city">{{city}}</el-checkbox>
                          <el-checkbox v-for="city in cities7" :label="city" :key="city">{{city}}</el-checkbox>
                          <el-checkbox v-for="city in cities8" :label="city" :key="city">{{city}}</el-checkbox>
                          <el-checkbox v-for="city in cities9" :label="city" :key="city">{{city}}</el-checkbox>
                          <el-checkbox v-for="city in cities10" :label="city" :key="city">{{city}}</el-checkbox>
                          <el-checkbox v-for="city in cities11" :label="city" :key="city">{{city}}</el-checkbox>
                          <el-checkbox v-for="city in cities12" :label="city" :key="city">{{city}}</el-checkbox>
                          <el-checkbox v-for="city in cities13" :label="city" :key="city">{{city}}</el-checkbox>
                          <el-checkbox v-for="city in cities14" :label="city" :key="city">{{city}}</el-checkbox>
                          <el-checkbox v-for="city in cities15" :label="city" :key="city">{{city}}</el-checkbox>
                        </el-checkbox-group>
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
  const cityOptions = ['远特', '蜗牛', '迪信通', '极信', '小米', '海航', '乐语', '苏宁互联', '国美', '联想', '蓝猫移动', '长城', '中邮','鹏博士','天音'],
    cityOptions1 = ['远特'],
    cityOptions2 = ['蜗牛'],
    cityOptions3 = ['迪信通'],
    cityOptions4 = ['极信'],
    cityOptions5 = ['小米'],
    cityOptions6 = ['海航'],
    cityOptions7 = ['乐语'],
    cityOptions8 = ['苏宁互联'],
    cityOptions9 = ['国美'],
    cityOptions10 = ['联想'],
    cityOptions11 = ['蓝猫移动'],
    cityOptions12 = ['长城'],
    cityOptions13 = ['中邮'],
    cityOptions14 = ['鹏博士'],
    cityOptions15 = ['天音'];
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
        },
        cardType:"1,2",
        checkAll:true,
        checkedCities: ['远特', '蜗牛', '迪信通', '极信', '小米', '海航', '乐语', '苏宁互联', '国美', '联想', '蓝猫移动', '长城', '中邮','鹏博士','天音'], //虚商品牌
        cities: cityOptions, //选中的虚商
        cities1: cityOptions1,
        cities2: cityOptions2,
        cities3: cityOptions3,
        cities4: cityOptions4,
        cities5: cityOptions5,
        cities6: cityOptions6,
        cities7: cityOptions7,
        cities8: cityOptions8,
        cities9: cityOptions9,
        cities10: cityOptions10,
        cities11: cityOptions11,
        cities12: cityOptions12,
        cities13: cityOptions13,
        cities14: cityOptions14,
        cities15: cityOptions15,
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
          searchType:vm.searchKind,
          cardType:vm.cardType,
          brand:vm.checkedCities
        };
        console.log(json);
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
      handleCheckAllChange(val) {
        this.checkedCities = val ? cityOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
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

