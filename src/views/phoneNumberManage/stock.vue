<template>
  <section ref="sec">
    <div v-if="!off.numberDetails">
      <!-- 查询模块 -->
      <div class="dls greyFont">
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark m-search-title black">搜索条件</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
            <div class="grid-content bg-purple-light">
              <el-col :xs="4" :sm="3" :md="3" :lg="4" :xl="4">
                <div class="grid-content bg-purple-dark f-ta-r inputTitle">号段：</div>
              </el-col>
              <el-col :xs="19" :sm="19" :md="19" :lg="18" :xl="18">
                <el-input v-model="productName" size="small" placeholder="请输入查询的七位号段" :maxlength="7"></el-input>
              </el-col>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
            <div class="grid-content bg-purple-light">
              <el-col :xs="4" :sm="3" :md="3" :lg="4" :xl="4">
                <div class="grid-content bg-purple-dark f-ta-r inputTitle">归属地：</div>
              </el-col>
              <el-col :xs="19" :sm="19" :md="19" :lg="18" :xl="18">
                <el-select size="small" style="width:100%" v-model="value" placeholder="请选择">
                  <el-option v-for="item in options" :key="item.areaPinYing" :label="item.areaCn" :value="item.areaCn"
                    size="small">
                  </el-option>
                </el-select>
              </el-col>
            </div>
          </el-col>
        </el-row>
        <el-row class="marginTop">
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
            <div class="grid-content bg-purple-light">
              <el-col :xs="4" :sm="3" :md="3" :lg="4" :xl="4">
                <div class="grid-content bg-purple-dark f-ta-r inputTitle">面值：</div>
              </el-col>
              <el-col :xs="19" :sm="19" :md="19" :lg="18" :xl="18">
                <el-radio v-model="cardType" label="0,1000,2000,3000,5000,10000">全部</el-radio>
                <el-radio v-model="cardType" label="0">0</el-radio>
                <el-radio v-model="cardType" label="1000">10</el-radio>
                <el-radio v-model="cardType" label="2000">20</el-radio>
                <el-radio v-model="cardType" label="3000">30</el-radio>
                <el-radio v-model="cardType" label="5000">50</el-radio>
                <el-radio v-model="cardType" label="10000">100</el-radio>
              </el-col>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
            <div class="grid-content bg-purple-light">
              <el-col :xs="4" :sm="3" :md="3" :lg="4" :xl="4">
                <div class="grid-content bg-purple-dark f-ta-r inputTitle">套餐：</div>
              </el-col>
              <el-col :xs="19" :sm="19" :md="19" :lg="18" :xl="18">
                <el-input v-model="setMenu" size="small" placeholder="请输入查询的套餐名称" :maxlength="30"></el-input>
              </el-col>
            </div>
          </el-col>
        </el-row>
        <el-row class="marginTop">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <div class="grid-content bg-purple-light">
              <el-col :xs="4" :sm="3" :md="3" :lg="2" :xl="2">
                <div class="grid-content bg-purple-dark f-ta-r inputTitle">当前状态：</div>
              </el-col>
              <el-col :xs="19" :sm="19" :md="19" :lg="20" :xl="20">
                <el-radio v-model="productStatus" label="1,2,3,4">全部</el-radio>
                <el-radio v-model="productStatus" label="1">未上架</el-radio>
                <el-radio v-model="productStatus" label="2">手动上架</el-radio>
                <el-radio v-model="productStatus" label="3">手动下架</el-radio>
                <el-radio v-model="productStatus" label="4">系统下架</el-radio>
              </el-col>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <div class="grid-content bg-purple-light">
              <el-col :xs="4" :sm="3" :md="3" :lg="2" :xl="2">
                <div class="grid-content bg-purple-dark f-ta-r inputTitle">运营商：</div>
              </el-col>
              <el-col :xs="19" :sm="19" :md="19" :lg="20" :xl="20">
                <el-radio v-model="isp" label="1,2,3">全部</el-radio>
                <el-radio v-model="isp" label="1">移动</el-radio>
                <el-radio v-model="isp" label="2">联通</el-radio>
                <el-radio v-model="isp" label="3">电信</el-radio>
              </el-col>
            </div>
          </el-col>
        </el-row>
        <el-row class="marginTop">
          <el-col :span="24">
            <div class="grid-content bg-purple-light">
              <el-col :xs="4" :sm="3" :md="3" :lg="2" :xl="2">
                <div class="grid-content bg-purple-dark f-ta-r inputTitle">品牌：</div>
              </el-col>
              <el-col :xs="19" :sm="21" :md="21" :lg="20" :xl="18">
                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="20">
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
                  </el-checkbox-group>
                </el-col>
              </el-col>
            </div>
          </el-col>
        </el-row>
        <el-row style="text-align:center" class="marginTop">
          <button class="m-btn-orange m-btn-search" @click="search()">搜索</button>
        </el-row>
      </div>
      <!-- 查询结果列表 -->
      <div v-if="searchList" class="m-searchlist-container">
        <p class="m-searchlist-title"><span>号段列表</span><span><button @click="download">导出</button></span></p>
        <table class="m-searchlist-table">
          <tr>
            <td>序号</td>
            <td>号段</td>
            <td>归属地</td>
            <td>归属品牌</td>
            <td>运营商</td>
            <td>当前状态</td>
            <td>面值</td>
            <td>套餐</td>
            <td>总数（个）</td>
            <td>靓号数（个）</td>
            <td>带4比例</td>
            <td>操作</td>
          </tr>
          <tr v-for="(v,i) in datalist">
            <td colspan="12">
              <table style="width:100%" class="m-searchlist-table2">
                <tr>
                  <td>{{((currentPage-1)*15+(i+1))}}</td>
                  <td><a href="javascript:void(0)" style="text-decoration:underline;color:#66A1DF" @click="getSectionDetails(v)">{{v.sectionId}}</a></td>
                  <td>{{v.area}}</td>
                  <td>{{translateData(4,v.brand)}}</td>
                  <td>{{translateData(1,v.isp)}}</td>
                  <td style="border-right:1px solid #E4E4E4">{{translateData(3,v.productState)}}</td>
                  <td>--</td>
                  <td>--</td>
                  <td>{{v.productTotal}}</td>
                  <td>{{v.cuteTotal}}</td>
                  <td>{{v.ratio}}</td>
                  <td><a href="javascript:void(0)" @click="open(i)">
                      <span style="color:#66A1DF;text-decoration:underline" v-if="off.tableDetails.indexOf(i)>-1">收起</span>
                      <span style="color:#66A1DF;text-decoration:underline" v-if="off.tableDetails.indexOf(i)==-1">展开</span>
                    </a></td>
                </tr>
                <tr v-if="off.tableDetails.indexOf(i)>-1">
                  <td colspan="6" :rowspan="v.faceValueMap.length" style="border-right:1px solid #e4e4e4"></td>
                  <td colspan="6" :rowspan="v.faceValueMap.length">
                    <table class="m-searchlist-table3" style="width:100%">
                      <tr v-for="(v1,i1) in v.faceValueMap" style="border-top:1px solid #E6E6E6">
                        <td colspan="5">
                          <table class="m-searchlist-table3" v-for="(v2,i2) in v1" style="width:100%">
                            <tr class="border" v-for="(v3,i2) in v2">
                              <td>{{i1/100}}</td>
                              <td>{{i2}}</td>
                              <td>{{v3.productTotal}}</td>
                              <td>{{v3.cuteTotal}}</td>
                              <td>{{v3.ratio}}</td>
                              <td></td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr v-if="off.tableDetails.indexOf(i)>-1&&v.hasOwnProperty('faceValueMap')&&JSON.stringify(v.faceValueMap)=='{}'">
                  <td colspan="6" style="border-right:1px solid #e4e4e4"></td>
                  <td colspan="6">
                    <table class="m-searchlist-table3" style="width:100%">
                      <tr>
                        <td>该号包下暂无详情数据</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr v-if="datalist.length==0">
            <td colspan="12">
              暂无数据
            </td>
          </tr>
        </table>
        <div class="m-listTitleFoot" v-if="datalist.length>0">
          <el-row>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-pagination layout="prev, pager, next" :page-size="15" @current-change="search" :current-page.sync="currentPage"
                  :total="maxpage">
                </el-pagination>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <stock-details :faceValueDetails="faceValueDetails" :thousandDetails="thousandDetails" v-if="off.numberDetails"></stock-details>
  </section>
</template>
<script>
  import 'element-ui/lib/theme-chalk/display.css';
  import {
    Loading
  } from 'element-ui';
  import {
    getDateTime,
    errorDeal,
    translateData,
    getStore
  } from "../../config/utils.js";
  import {
    getNumberStorage,
    getCityList,
    getNumberStorageThousand
  } from "../../config/service.js";
  import stockDetails from './stockDetails.vue';
  const cityOptions = ['远特', '蜗牛', '迪信通', '极信', '小米', '海航', '乐语', '苏宁互联', '国美', '联想', '蓝猫移动', '长城', '中邮'],
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
    cityOptions13 = ['中邮'];
  export default {
    data() {
      return {
        currentPage: 0,
        maxpage: 0,
        checkAll: true,
        isIndeterminate: false,
        searchList: "",
        productName: "", //号包名称
        cardType: "0,1000,2000,3000,5000,10000", //卡面值
        productStatus: "1,2,3,4", //号包状态
        setMenu: "", //查询的套餐名称
        isp: "1,2,3", //运营商
        faceValueDetails: "",
        thousandDetails: "",
        downloadData: "",
        searchDetails: {},
        datalist: "",
        checkedCities: ['远特', '蜗牛', '迪信通', '极信', '小米', '海航', '乐语', '苏宁互联', '国美', '联想', '蓝猫移动', '长城', '中邮'], //虚商品牌
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
        /*地区选择*/
        options: [{
          areaCn: "安庆",
          areaPinying: "anqing"
        }, {
          areaCn: "鞍山",
          areaPinying: "anshan"
        }],
        value: '全部', //归属地
        off: {
          numberDetails: false,
          tableDetails: [],
        }
      }
    },
    created: function (v) {
      let vm = this;
      getCityList()
        .then((data) => {
          vm.options = data.data.list;
          vm.options.unshift({
            areaCn: "全部",
            areaPinying: "quanbu"
          })
        })
    },
    components: {
      stockDetails
    },
    methods: {
      search(page) {
        let vm = this,
          checked = [];
        vm.off.tableDetails = [];
        for (let i in vm.checkedCities) {
          checked.push(cityOptions.indexOf(vm.checkedCities[i]) + 1);
        }
        checked = checked.join(",");
        let cvalue = '';
        if (vm.value != '全部') {
          cvalue = vm.value
        }
        let json = {
          "area": cvalue,
          "brand": checked,
          "faceValue": vm.cardType,
          "isp": vm.isp,
          "packageDesc": vm.setMenu,
          "pageNum": page || 1,
          "pageSize": 15,
          "productState": vm.productStatus,
          "sectionId": vm.productName
        };
        vm.downloadData = json;
        getNumberStorage(json)
          .then((data) => {
            vm.searchList = true;
            vm.datalist = data.data.entities;
            vm.currentPage = page || 1;
            vm.maxpage = data.data.total;
          }).catch((e) => {
            errorDeal(e)
          })
      },
      download() {
        let vm = this,
          parameter = "",
          url = "/nms/w/number/exportStorage?",
          userInfo = getStore('YFD_NMS_INFO');
        let json = Object.assign(vm.downloadData, userInfo);
        delete json.pageNum;
        delete json.pageSize;
        Object.keys(json).map((key) => {
          url += key + '=' + json[key] + '&';
        })
        url = url.substring(0, url.length - 1);
        url = url.substring(0, url.length - 1);
        var elemIF = document.createElement("iframe");
        elemIF.src = url;
        var ee = elemIF.contentWindow;
        elemIF.style.display = "none";
        document.body.appendChild(elemIF);
      },
      getSectionDetails(v) {
        let vm = this;
        vm.faceValueDetails = v;
        Object.assign(vm.searchDetails, vm.downloadData, {
          sectionId: v.sectionId
        })
        getNumberStorageThousand(vm.searchDetails)
          .then((data) => {
            vm.off.numberDetails = true;
            vm.thousandDetails = data.data.thousandSectionMap;
          }).catch(e => errorDeal(e))
      },
      open(v) {
        let vm = this;
        if (vm.off.tableDetails.indexOf(v) == -1) {
          vm.off.tableDetails.push(v);
        } else {
          let i = vm.off.tableDetails.indexOf(v);
          vm.off.tableDetails.splice(i, 1);
        }
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
      getDateTime(v) {
        return getDateTime(v);
      },
      translateData(v, i) {
        return translateData(v, i)
      }
    }
  }
</script>
<style scoped>
  @import "../../assets/css/stock.css";
</style>
