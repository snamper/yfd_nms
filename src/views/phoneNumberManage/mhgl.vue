<template>
  <section ref="sec">
    <div v-if="off.notCardDetails">
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
                <div class="grid-content bg-purple-dark f-ta-r inputTitle">号包名称：</div>
              </el-col>
              <el-col :xs="19" :sm="19" :md="19" :lg="18" :xl="18">
                <el-input v-model="productName" size="small" placeholder="请输入号包名称" :maxlength="15"></el-input>
              </el-col>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
            <div class="grid-content bg-purple-light">
              <el-col :xs="4" :sm="3" :md="3" :lg="4" :xl="4">
                <div class="grid-content bg-purple-dark f-ta-r inputTitle">联系人：</div>
              </el-col>
              <el-col :xs="19" :sm="19" :md="19" :lg="18" :xl="18">
                <el-input v-model="name" size="small" placeholder="请输入查询的联系人姓名" :maxlength="10"></el-input>
              </el-col>
            </div>
          </el-col>
        </el-row>
        <el-row class="marginTop">
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
            <div class="grid-content bg-purple-light">
              <el-col :xs="4" :sm="3" :md="3" :lg="4" :xl="4">
                <div class="grid-content bg-purple-dark f-ta-r inputTitle">号包类型：</div>
              </el-col>
              <el-col :xs="19" :sm="19" :md="19" :lg="18" :xl="18">
                <el-radio v-model="cardType" label="1,2,3">全部</el-radio>
                <el-radio v-model="cardType" label="1">整号段</el-radio>
                <el-radio v-model="cardType" label="2">靓号包</el-radio>
                <el-radio v-model="cardType" label="3">普号包</el-radio>
              </el-col>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
            <div class="grid-content bg-purple-light">
              <el-col :xs="4" :sm="3" :md="3" :lg="4" :xl="4">
                <div class="grid-content bg-purple-dark f-ta-r inputTitle">手机号码：</div>
              </el-col>
              <el-col :xs="19" :sm="19" :md="19" :lg="18" :xl="18">
                <el-input v-model="phone" size="small" placeholder="请输入查询的手机号码" :maxlength="11"></el-input>
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
                <el-radio v-model="nowStatus" label="1,2,3,4,5,6">全部</el-radio>
                <el-radio v-model="nowStatus" label="1">未上架</el-radio>
                <el-radio v-model="nowStatus" label="2">手动上架</el-radio>
                <el-radio v-model="nowStatus" label="3">手动下架</el-radio>
                <el-radio v-model="nowStatus" label="4">系统下架</el-radio>
                <el-radio v-model="nowStatus" label="5">已出售</el-radio>
              </el-col>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <div class="grid-content bg-purple-light">
              <el-col :xs="4" :sm="3" :md="3" :lg="2" :xl="2">
                <div class="grid-content bg-purple-dark f-ta-r inputTitle">运营商：</div>
              </el-col>
              <el-col :xs="19" :sm="19" :md="19" :lg="20" :xl="20">
                <el-radio v-model="radio" label="1,2,3">全部</el-radio>
                <el-radio v-model="radio" label="1">移动</el-radio>
                <el-radio v-model="radio" label="2">联通</el-radio>
                <el-radio v-model="radio" label="3">电信</el-radio>
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
                <el-col :xs="24" :sm="24" :md="24" :lg="22" :xl="20">
                  <el-checkbox text-color="#48576a" style="display:inline;" :indeterminate="isIndeterminate" v-model="checkAll"
                    @change="handleCheckAllChange">全选</el-checkbox>
                  <el-checkbox-group style="display:inline" v-model="checkedCities" @change="handleCheckedCitiesChange">
                    <!-- <el-checkbox class="hidden-xs-and-down" v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>                        -->
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
      <div v-if="searchList">
        <div>
          <div class="m-listTitleFoot">
            <el-row>
              <p>
                <h3>号包列表<span class="f-fw greyFont">({{total||'0'}})</span></h3>
              </p>
            </el-row>
          </div>
          <div class="m-details">
            <table class="m-searchTab" style="width:100%;height:100%;">
              <tr v-if="true">
                <td colspan="13">
                  <el-row>
                    <el-col :span="7" class="f-ta-l f-pl-10">
                      <div class="grid-content bg-purple">
                        <span class="greyFont">最后同步成功时间:</span>
                        <span v-if="syncLastTime==0">--</span>
                        <span v-if="syncLastTime!=0">{{getDateTime(syncLastTime)[6]}}</span>
                      </div>
                    </el-col>
                    <el-col :span="7" class="f-ta-l f-pl-10">
                      <div class="grid-content bg-purple-light">
                        <!-- <span class="greyFont">下次同步成功时间:</span><span>{{"--"}}</span> -->
                        &nbsp;
                      </div>
                    </el-col>
                    <el-col :span="6" class="f-ta-l f-pl-10">
                      <div class="grid-content bg-purple">
                        <!-- <span class="greyFont">同步间隔时间:</span><span></span>
                                            <el-button class="m-small-btn" type="primary" @click="openSet()">设置</el-button> -->
                        &nbsp;
                      </div>
                    </el-col>
                    <el-col :span="4" class="f-ta-r">
                      <div class="grid-content bg-purple-light">
                        <button class="btnSyncNumber" @click="sync()">号段同步</button>
                      </div>
                    </el-col>
                  </el-row>
                </td>
              </tr>
              <tr class="f-s-14 m-table-title">
                <td v-if="nowStatusHidden!=6&&nowStatusHidden!=5"></td>
                <td>序号</td>
                <td>号包名称</td>
                <td>号包类型</td>
                <td>售卖方式</td>
                <td></td>
                <td>号包价格（元）</td>
                <td>归属品牌</td>
                <td>运营商</td>
                <td>修改时间</td>
                <td>操作人</td>
                <td>手机号码</td>
                <td>当前状态</td>
              </tr>
              <tr v-for="(v,i) of searchList">
                <td colspan="13">
                  <table class="m-table1">
                    <tr>
                      <td v-if="nowStatusHidden!=6&&nowStatusHidden!=5">
                        <el-checkbox v-model="v.ischecked"></el-checkbox>
                      </td>
                      <td> {{((pa-1)*15+(i+1))}} </td>
                      <td>
                        <a class="f-td-underline" @click="getDetails(v)">{{v.productName}}
                          <span v-if="v.productType==1">({{v.normalTotal+v.cuteTotal}})</span>
                          <span v-if="v.productType==2">({{v.cuteTotal}})</span>
                          <span v-if="v.productType==3">({{v.normalTotal}})</span>
                        </a>
                      </td>
                      <td>{{translateData(2,v.productType)}}</td>
                      <td>

                        <button v-if="splitButton(v,i,1)==1&&v.productState!=5" class="m-button-split2" @click="splitNumber(v,1,i)">拆包</button>
                        <button v-if="splitButton(v,i,1)==1&&v.productState==5">未拆包</button>
                        <button v-if="splitButton(v,i,2)==2" class="m-button-split1"><span>拆包</span></button>
                      </td>
                      <td>
                        <a v-if="v.productType==2" @click="openList(v,1,i)">
                          <span v-if="off.tableDetails.indexOf(i)>-1&&v.productType==2">收起</span>
                          <span v-else>展开</span>
                        </a>
                      </td>
                      <td class="f-ta-c">
                        <div>
                          <span v-if="!v.strikePrice">{{(v.totalPrice/100).toFixed(2)}}</span>
                          <span v-if="v.strikePrice">{{(v.strikePrice/100).toFixed(2)}}</span>
                        </div>
                      </td>
                      <td>{{translateData(4,v.brand)}}</td>
                      <td>{{translateData(1,v.isp)}}</td>
                      <td>
                        <span v-if="v.modifyTime"> {{getDateTime(v.modifyTime)[8]}}<br>{{getDateTime(v.modifyTime)[5]}}
                        </span>
                        <span v-if="!v.modifyTime"> -- </span>
                      </td>
                      <td> {{v.operatorName}} </td>
                      <td> {{v.operatorPhone||'--'}} </td>
                      <td :class="{red:v.productState==5}"> {{translateData(3,v.productState)}} </td>
                      <td v-show="false"> {{v.productId}} </td>
                    </tr>
                    <tr v-if="off.tableDetails.indexOf(i)>-1&&v.productType==2">
                      <td colspan="3" :rowspan="v.type.length" style="border-right:1px solid #e4e4e4;"></td>
                      <td colspan="10" :rowspan="v.type.length">
                        <table class="m-table2" style="width:100%">
                          <tr v-if="cuteNumberList.length>0" v-for="(v1,i1) in cuteNumberList" style="border-top:1px solid #E6E6E6">
                            <td colspan="11">
                              <table class="m-table3" style="width:100%">
                                <tr class="border">
                                  <!-- <td>
                                                                        <input type="checkbox" v-model="v1.ischecked2">
                                                                    </td> -->
                                  <td>{{v1.ruleDesc}}({{v1.total}})</td>
                                  <td>
                                    <button class="m-button-split2" v-if="v.splitFlag==2&&v1.splitFlag==1&&v1.state!=5"
                                      @click="splitNumber({v:v,v1:v1},2,''+i+i1)">拆包</button>
                                    <button class="m-button-split1" v-if="v.splitFlag==2&&v1.splitFlag==2&&v1.state!=5"><span>拆包</span></button>
                                  </td>
                                  <td></td>
                                  <td>{{(v1.price/100).toFixed(2)}}</td>
                                  <td>--</td>
                                  <td>--</td>
                                  <td>--</td>
                                  <td>--</td>
                                  <td>--</td>
                                  <td>{{translateData(3,v1.state)}}</td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <tr v-if="cuteNumberList.length==0">
                            <td colspan="11">
                              暂无靓号分类详情
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr v-if="searchList.length>0&&nowStatusHidden!=6&&nowStatusHidden!=5">
                <td colspan="13" style="text-align:left" class="f-pl-10">
                  选择 : <a href="javascript:void(0)" @click="doFilter('all')"> 全选 </a> - <a href="javascript:void(0)"
                    @click="doFilter('none')"> 取消全选 </a>
                </td>
              </tr>
              <tr v-if="searchList.length<=0">
                <td colspan="13">
                  暂无数据
                </td>
              </tr>
            </table>
          </div>
          <div class="m-listTitleFoot" v-if="searchList.length>0">
            <el-row>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <el-pagination layout="prev, pager, next" :page-size="15" @current-change="search" :current-page.sync="currentPage"
                    :total="form.page">
                  </el-pagination>
                </div>
              </el-col>
              <el-col :span="12" v-if="nowStatusHidden!=6&&nowStatusHidden!=5">
                <div class="grid-content bg-purple-light fr operate">操作 : <button size="mini" @click="doFounction(1)">上架</button><button
                    size="mini" @click="doFounction(2)">下架</button></div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
    <!-- 号码上架下架同步 -->
    <numberOperation v-if="off.layer1" :layer="layerType1" :operationType="operationType"></numberOperation>
    <!-- 卡详情 -->
    <card-Details v-if="off.cardDetails" :listSwitch="listSwitch" :dataList="searchResData" :dataListLiang="searchLiang"
      :dataListPu="searchPu"></card-Details>
    <layer-confirm v-if="off.layerChangePrice" :layerType="layerType" :logisticsInfo="logistics"></layer-confirm>
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
    getStore,
    checkMobile,
    translateData
  } from "../../config/utils.js";
  import {
    requestMethod,
    requestgetSyncTime,
    requestModify_Price,
    requestUpdateSplit,
    getCuteTypeList,
    updateCuteSplitFlag,
    updateCuteState
  } from "../../config/service.js";
  import numberOperation from "./numberOperationLayer";
  import cardDetails from "../../components/cardDetailsList";
  import layerConfirm from "../../components/layerConfirm";
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
        layerType1: "",
        searchProductListId: '',
        currentPage: 0,
        layerType: "", //弹框类型
        logistics: "",
        _copyData: "",
        syncLastTime: '', //最后一次同步成功时间
        checkAll: true,
        isIndeterminate: false,
        total: "", //号包总数
        listSwitch: {
          "allDetails": "",
          "liang": "",
          "pu": ""
        }, //详情页面开关
        searchResData: {}, //号包详情查询结果
        searchLiang: [], //靓号详情查询结果
        searchPu: [], //谱号详情查询结果
        dataList: '', //号包详情页面
        dataListLiang: {}, //号包详情页面
        dataListPu: {}, //号包详情页面
        productName: "", //号包名称
        cardType: "1,2,3", //号包类型
        nowStatus: "1,2,3,4,5,6", //号包状态
        nowStatusHidden: "", //当前状态开关
        phone: "", //查询的手机号码
        radio: "1,2,3", //运营商
        name: "", //联系人姓名
        pageNumDetails: "", //子页面号包详情
        pageNumLiang: "", //靓号详情
        pageNumPu: "", //普号详情
        pa: '', //页码
        searchDatachangePrice: "", //修改价格
        translateSealPrice: "",
        SJXJData: "",
        operationType: "",
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
        startTime: "",
        endTime: "",
        cname: "",
        productType: "1",
        searchList: "",
        timeType: "a",
        searchData: "",
        dourl: '',
        typeTitle: '', //上架，下架
        isSplit: false, //是否拆分
        i: 1,
        index: '',
        cuteNumberList: '',
        off: {
          layer: false,
          layer1: false,
          layerChangePrice: false,
          notCardDetails: true, //
          cardDetails: false, //卡详情
          setSync: false, //同步时间设置
          sync: false, //手动同步
          searchList: false, //查询结果
          modify: false, //编辑栏
          isCheckAll: true, //是否全选
          changePrice: [],
          tableDetails: [],
          tableDetails2: []
        },
        form: {
          page: 0
        },
      }
    },
    components: {
      numberOperation,
      "card-Details": cardDetails,
      "layer-confirm": layerConfirm
    },
    created: function () {
      let vm = this,
        Info = getStore("YFD_NMS_INFO");
      vm.user = Info;
    },
    methods: {
      search(p) { //查询
        let vm = this;
        // vm.off.tableDetails=[];
        vm.currentPage = p || 1;
        if (this.phone != '') {
          checkMobile(this.phone, function () {
            vm.searchList = "";
            vm.total = "";
            vm.form.page = "";
            return false
          });
        }
        let checked = [],
          data = {},
          url = '/nms/w/number/productSearch';
        vm.pa = p || 1;
        for (let i in vm.checkedCities) {
          checked.push(cityOptions.indexOf(vm.checkedCities[i]) + 1);
        }
        if(vm.checkAll==true){
          checked.unshift(0);
        }
        checked = checked.join(",");
        
        data = {
          "brand": checked,
          "isp": vm.radio,
          "operatorName": vm.name,
          "operatorPhone": vm.phone,
          "productName": vm.productName,
          "productType": vm.cardType,
          "productState": vm.nowStatus,
          "sessionType": 2,
          "pageSize": 15,
          "pageNum": p || 1
        }
        vm.searchData = data;
        requestMethod(data, url)
          .then((data) => {
            if (data.code == 200) {
              vm.searchList = data.data.products;
              vm.total = data.data.total;
              vm.form.page = data.data.total;
              vm._copyData = vm.copyData(data.data.products);
              vm.nowStatusHidden = vm.nowStatus;
              vm.searchList.forEach((item, index) => {
                Object.assign(item, {
                  type: {
                    A: { 1: '7A', 3: 100000, 13: '未上架' },
                    B: { 1: '3B', 3: 6666660, 13: '手动上架' }, 
                    C: { 1: '2B', 3: 678911, 13: '手上架' }
                  }
                })
              })
            } else {
              vm.searchList = "";
              vm.total = "";
              vm.form.page = "";
              errorDeal(data);
            }
          }).then(() => {
            for (let v = 0; v < vm.searchList.length; v++) {
              vm.$set(vm.searchList[v], 'ischecked', false);
              for (let i in vm.searchList[v].type) {
                vm.$set(vm.searchList[v].type[i], 'ischecked2', false);
              }
            }
            vm.off.modify = false;
            this.getSyncTime();
          }).catch(e => errorDeal(e, () => {
            vm.searchList = "";
            vm.total = "";
            vm.form.page = "";
          }));
      },
      translateData(type, v) {
        return translateData(type, v)
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
      getDetails(v) {
        let vm = this,
          data = {},
          url = "";
        data.searchProductId = v.productId;
        vm.searchProductListId = v.productId;
        data.sessionType = "2";
        // let load=Loading.service(options);
        let p1 = new Promise((resolve, reject) => {
          if (v.productType == 1 || v.productType == 2) {
            url = "/nms/w/number/getMngCuteNumbers";
            data.phoneLevel = 2;
            data.pageNum = 1;
            data.pageSize = 60;
            requestMethod(data, url)
              .then((data) => {
                resolve('step');
                this.$set(vm.listSwitch, 'liang', true)
                vm.searchLiang = []
                if (data.data.numbers instanceof Array) {
                  for (var i = 0, len = data.data.numbers.length; i < len; i += 6) {
                    vm.searchLiang.push(data.data.numbers.slice(i, i + 6));
                  }
                  vm.searchLiang.total = data.data.total;
                }
              }).catch((e) => {
                layer.open({
                  content: e.msg || e,
                  skin: 'msg',
                  time: 2,
                  msgSkin: 'error',
                });
              })
          } else {
            vm.searchLiang = [];
            resolve('step');
          }
        });
        let p2 = new Promise((resolve, reject) => {
          if (v.productType == 1 || v.productType == 3) {
            url = "/nms/w/number/getProductNumbers";
            data.phoneLevel = 1;
            data.pageNum = 1;
            data.pageSize = 60;
            requestMethod(data, url)
              .then((data) => {
                resolve('step1');
                this.$set(vm.listSwitch, 'pu', true)
                vm.searchPu = []
                if (data.data.numbers instanceof Array) {
                  for (var i = 0, len = data.data.numbers.length; i < len; i += 6) {
                    vm.searchPu.push(data.data.numbers.slice(i, i + 6));
                  }
                  vm.searchPu.total = data.data.total;
                }
              }).catch((e) => {
                layer.open({
                  content: e.msg || e,
                  skin: 'msg',
                  time: 2,
                  msgSkin: 'error',
                });
              })
          } else {
            vm.searchPu = [];
            resolve('step1');
          }
        });
        requestMethod(data, "/nms/w/number/getProductDetail")
          .then((data) => {
            if (data.code == 200) {
              this.$set(vm.listSwitch, 'allDetails', true)
              vm.searchResData = data.data
            }
          })
          .then(Promise.all([p1, p2]))
          .then((result) => {
            // load.close();
            this.off.notCardDetails = false;
            this.off.cardDetails = true;
          })
          .catch(e => errorDeal(e));
      },
      openSet() { //同步设置
        let vm = this;
        vm.off.layer = true;
        vm.off.setSync = true;
        vm.off.sync = false;
      },
      sync() { //手动同步
        let vm = this;
        vm.off.layer1 = true;
        vm.layerType1 = "numberSectionTB";
      },
      doFilter(s) { //状态过滤操作
        let vm = this;
        if (s == "all") {
          for (let v = 0; v < vm.searchList.length; v++) {
            vm.$set(vm.searchList[v], 'ischecked', true);
          }
          vm.cuteNumberList = [];
          vm.off.tableDetails = [];
        } else if (s == "none") {
          for (let v = 0; v < vm.searchList.length; v++) {
            vm.$set(vm.searchList[v], 'ischecked', false);
          }
        }
      },
      doFounction(val) {
        new Promise((resolve, reject) => {
          let vm = this,
            isInArray = false,
            isSplitInArray = false,
            ruleType = [],
            index = vm.off.tableDetails[0];
          vm.typeTitle = "";
          for (let i in vm.searchList) {
            if (vm.searchList[i].ischecked == true) {
              if (vm.searchList[i].productState == 6 || vm.searchList[i].productState == 5) { //购物车中或已出售
                isInArray = '1';
              } else if (vm.searchList[i].productState == 2 && val == '1') { //手动上架
                isInArray = '3'
              } else {
                isInArray = true;
              }
            }
          }
          for (let v of vm.cuteNumberList) {
            if (v.hasOwnProperty('ischecked2') && v.ischecked2 == true) {
              isSplitInArray = 1;
            }
          }
          if (isInArray === '1') {
            vm.off.modify = 'stop1';
          } else if (isInArray === '3') {
            vm.off.modify = 'stop3';
          } else if (isInArray === false) {
            vm.off.modify = false;
          } else {
            vm.off.modify = true;
          }
          if (isInArray === '1') {
            layer.open({
              content: "不允许操作购物车中和已售出的号包",
              skin: 'msg',
              time: 4,
              msgSkin: 'error',
            });
            return false;
          } else if (isInArray === '3') {
            layer.open({
              content: "已上架的号包不允许重复上架",
              skin: 'msg',
              time: 4,
              msgSkin: 'error',
            });
            return false;
          }
          if (isInArray === false && isSplitInArray === false) {
            layer.open({
              content: "请选择要操作的号包",
              skin: 'msg',
              time: 2,
              msgSkin: 'error',
            });
            return false;
          }
          if (val == '2') {
            vm.operationType = "XJ";
            vm.dourl = "/nms/w/number/pullOffProducts";
            this.typeTitle = "下架";
          } else if (val == '1') {
            vm.dourl = "/nms/w/number/putOnProducts";
            vm.operationType = "SJ";
            this.typeTitle = "上架";
          }
          resolve('success!')
        }).then(() => {
          this.btnYes(val);
        })
      },
      splitNumber(v, x, i) {
        let vm = this;
        if (x == 1) { //大包拆包按钮
          let json = {
            productId: v.productId
          };
          if (v.splitFlag == 1) {
            requestUpdateSplit(json)
              .then((data) => {
                if (data.code == 200) {
                  layer.open({
                    content: '修改成功',
                    skin: 'msg',
                    time: 2,
                    msgSkin: 'success',
                  });
                  vm.search(vm.currentPage);
                }
              }).catch(e => errorDeal(e))
          }
        } else if (x == 2) { //靓号类型包拆分按钮
          vm.off.tableDetails2.push(i);
          let json = {
            sectionId: v.v.sectionId,
            ruleType: v.v1.ruleType
          }
          updateCuteSplitFlag(json)
            .then((data) => {
              layer.open({
                content: '修改成功',
                skin: 'msg',
                time: 2,
                msgSkin: 'success',
              });
            }).
          then(() => {
              getCuteTypeList({
                  productId: v.v.productId
                })
                .then((data) => {
                  vm.cuteNumberList = data.data.products;
                })
            })
            .catch((e) => {
              layer.open({
                content: e.msg,
                skin: 'msg',
                time: 2,
                msgSkin: 'error'
              })
            })
        }
      },
      openList(v, x, i) {
        let vm = this;
        if (vm.off.tableDetails[0] == i) {
          vm.off.tableDetails = [];
          return false
        }
        vm.off.tableDetails = [];
        if (v.productType == 2) {
          getCuteTypeList({
              productId: v.productId
            })
            .then((data) => {
              vm.cuteNumberList = data.data.products;
            })
        }
        vm.off.tableDetails.push(i);
      },
      splitButton(v, i, key) {
        let vm = this;
        if (v.productType == 3 || v.productType == 2) {
          if (v.splitFlag == 1) {
            return 1;
          } else if (v.splitFlag == 2) {
            return 2;
          }
        } else if (v.productType == 1) {
          return false;
        }
      },
      btnYes(i) {
        let vm = this,
          ruleType = [],
          index = vm.off.tableDetails[0],
          json = {
            operateProductIds: []
          };
        vm.off.layer1 = true;
        vm.layerType1 = "numberSJXJ";
        for (let v of vm.searchList) {
          if (v.ischecked == true) {
            json.operateProductIds.push(v.productId);
          }
        }
        for (let v of vm.cuteNumberList) {
          if (v.hasOwnProperty('ischecked2') && v.ischecked2 == true) {
            ruleType.push(v.ruleType);
          }
        }
        if (json.operateProductIds.length > 1) {
          for (let v of vm.searchList) {
            if (v.ischecked == true) {
              json.operateProductIds.push(v.productId);
            }
          }
        } else if (json.operateProductIds.length <= 1 && ruleType.length > 0) {
          ruleType = [];
          for (let v of vm.cuteNumberList) {
            if (v.hasOwnProperty('ischecked2') && v.ischecked2 == true) {
              ruleType.push(v.ruleType);
            }
          }
          json.ruleType = ruleType.join(',');
          json.sectionId = vm.searchList[index].sectionId;
          vm.dourl = "/nms/w/number/updateCuteState";
          if (i == 1) {
            json.operate = 2;
          } else if (i == 2) {
            json.operate = 3;
          }
        }
        vm.SJXJData = json;
      },
      getSyncTime() {
        let vm = this;
        let data = {
          recordType: 3
        };
        requestgetSyncTime(data)
          .then((data) => {
            if (data.code == 200) {
              vm.syncLastTime = data.data.syncLastTime
            } else {
              errorDeal(data)
            }
          }).catch(e => errorDeal(e));
      },
      getDateTime(v) {
        return getDateTime(v);
      },
      copyData(dataSource) {
        var obj = {};
        obj = JSON.parse(JSON.stringify(dataSource));
        return obj
      },
    },
    directives: {
      focus: {
        inserted: function (el) {
          el.focus()
        }
      }
    }
  }
</script>
<style scoped>
  input {
    border: 0 none;
  }

  .box {
    width: 140px;
    height: 26px;
    background-color: #808000;
    clear: both;
  }

  .box span {
    display: inline-block;
    height: 26px;
  }

  .span1 {
    width: 100px;
    position: relative;
    background: red
  }

  .span2 {
    width: 40px;
    position: relative;
    background: green
  }

  .input {
    text-align: center;
    height: 26px;
    width: 100px;
    position: absolute;
    top: 0;
    left: 0;
    border: 1px solid #ccc;
    outline: none
  }

  .button {
    height: 26px;
    width: 40px;
    font: normal 14px/14px "微软雅黑";
    background: #5daf34;
    color: #fff;
    outline: none
  }

  .m-button-split {
    outline: none;
    border: 1px solid #7a7a7a;
    background: #a8a8a8;
    color: #fff;
    border-radius: 3px;
    padding: 2px 10px;
    cursor: pointer
  }

  .m-button-split2 {
    outline: none;
    border: 1px solid #008800;
    border-radius: 3px;
    padding: 1px 5px;
    cursor: pointer;
    background: #008800
  }

  .m-button-split:active {
    box-shadow: 0 0 5px grey
  }

  .m-button-split1 {
    outline: none;
    border: 1px solid #00AA01;
    color: #00AA01;
    border-radius: 3px;
    padding: 1px 8px;
    background-color: #fff;
    padding: 1px 4px;
  }

  .m-button-split1>span::after {
    content: '√';
    font-size: 12px;
  }

  ;

  .m-button-split3 {
    outline: none;
    border: 1px solid #4fc7ff;
    color: #4fc7ff;
    border-radius: 3px;
    padding: 1px 8px;
    background-color: #fff;
    padding: 1px 4px;
  }

  .m-button-split3>span::after {
    content: '√';
    font-size: 12px;
  }

  ;

  .buttonModifyYes {
    border-radius: 4px;
    padding: 5px 20px;
    background: #00AA01;
    border: 1px solid #00AA01;
    outline: none;
    color: #fff;
  }

  .buttonModifyYes:active {
    box-shadow: 0 0 5px green
  }

  div.operate button {
    padding: 4px 10px;
    margin-left: 10px;
    border-radius: 4px;
    color: #000;
  }

  div.operate button:active {
    box-shadow: 0 0 5px grey
  }

  .btnSyncNumber {
    outline: none;
    border-radius: 4px;
    background-color: #00AA01;
    border: 1px solid #00AA01;
    padding: 3px 6px;
    margin-right: 10px;
    color: #fff
  }

  div.borderTopModifyStaffState {
    margin-left: 1%;
    width: 98%;
    border-top: 2px solid #cacaca
  }

  .m-searchTab {
    border: none;
    border-spacing: 0
  }

  .m-searchTab tr:nth-child(odd) {
    background: transparent
  }

  .m-searchTab>tr:nth-child(even) {
    background: #FFF
  }

  .m-searchTab .m-table2 {
    border-spacing: 0
  }

  .m-searchTab>tr:nth-child(odd) .m-table3 {
    border-spacing: 0
  }

  .m-searchTab>tr:nth-child(odd) .m-table3>tr:nth-child(odd) {
    background: #FFF
  }

  .m-searchTab>tr:nth-child(odd) .m-table3>tr:nth-child(even) {
    background: transparent
  }

  .m-searchTab>tr:nth-child(even) .m-table3>tr:nth-child(odd) {
    background: #F1F2F3
  }

  .m-searchTab>tr:nth-child(even) .m-table3>tr:nth-child(even) {
    background: transparent
  }

  .m-searchTab .m-table-title td {
    width: 7.14286%
  }

  .m-searchTab .m-table-title td:nth-child(1) {
    width: 2%
  }

  .m-searchTab .m-table1 {
    width: 100%;
    padding: 0;
    margin: 0;
    border-spacing: 0
  }

  .m-searchTab .m-table1>tr:nth-child(2)>td {
    border-top: 1px solid #E4E4E4
  }

  .m-searchTab .m-table1>tr:nth-child(2)>td {
    border-bottom: 1px solid #E4E4E4
  }

  .m-searchTab .m-table1>tr>td {
    width: 7.14286%
  }

  .m-searchTab .m-table1>tr>td:nth-child(1) {
    width: 2%
  }

  .m-searchTab .m-table3 {
    border-spacing: 0
  }

  .m-searchTab .m-table3>tr>td {
    width: 10%
  }
</style>
