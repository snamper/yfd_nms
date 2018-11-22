<template>
  <section>
    <div v-if="off.notDlsDetails" class="dls">
      <div class="dls greyFont">
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark m-search-title black">搜索条件</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple">
              <el-col :xs="4" :sm="3" :md="3" :lg="2" :xl="2">
                <div class="grid-content bg-purple-dark f-ta-r inputTitle">选择时间：</div>
              </el-col>
              <el-col :xs="18" :sm="18" :md="20" :lg="18" :xl="18">
                <div class="f-display-ib">
                  <el-date-picker v-model="startTime" size="small" type="datetime" :clearable=false :editable=false :picker-options="pickerOptionsS" placeholder="选择开始时间">
                  </el-date-picker><el-date-picker v-model="endTime" size="small" type="datetime" :clearable=false :editable=false :picker-options="pickerOptionsE" placeholder="选择结束时间">
                  </el-date-picker>
                </div>
                &nbsp;&nbsp;( <el-radio v-model="timeType" label="1">修改时间</el-radio>
                <el-radio v-model="timeType" label="2">创建时间</el-radio> )
              </el-col>
            </div>
          </el-col>
        </el-row>
        <el-row class="marginTop">
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <div class="grid-content bg-purple-light">
              <el-col :xs="4" :sm="6" :md="6" :lg="4" :xl="4">
                <div class="grid-content bg-purple-dark f-ta-r inputTitle">联系人：</div>
              </el-col>
              <el-col :xs="18" :sm="16" :md="16" :lg="16" :xl="16">
                <el-input v-model="name" :maxlength="20" size="small" placeholder="请输入查询的联系人姓名"></el-input>
              </el-col>
              <el-col :xs="0" :sm="2" :md="2" :lg="4" :xl="4">
              </el-col>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <div class="grid-content bg-purple-light">
              <el-col :xs="4" :sm="6" :md="6" :lg="4" :xl="4">
                <div class="grid-content bg-purple-dark f-ta-r inputTitle">联系人号码：</div>
              </el-col>
              <el-col :xs="18" :sm="16" :md="16" :lg="16" :xl="16">
                <el-input v-model="phone" :maxlength="11" size="small" placeholder="请输入联系人号码"></el-input>
              </el-col>
              <el-col :xs="24" :sm="7" :md="7" :lg="4" :xl="4">
              </el-col>
            </div>
          </el-col>
        </el-row>
        <el-row class="marginTop">
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <div class="grid-content bg-purple">
              <el-col :xs="4" :sm="6" :md="6" :lg="4" :xl="4">
                <div class="grid-content bg-purple-dark f-ta-r inputTitle">公司名称：</div>
              </el-col>
              <el-col :xs="18" :sm="16" :md="16" :lg="16" :xl="16">
                <el-input v-model="cname" :maxlength="30" size="small" placeholder="请输入查询的公司名称"></el-input>
              </el-col>
              <el-col :xs="24" :sm="6" :md="6" :lg="4" :xl="4">
              </el-col>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <div class="grid-content bg-purple-light">
              <el-col :xs="4" :sm="6" :md="6" :lg="4" :xl="4">
                <div class="grid-content bg-purple-dark f-ta-r inputTitle">当前状态：</div>
              </el-col>
              <el-col :xs="18" :sm="16" :md="16" :lg="16" :xl="16">
                <el-radio v-model="radio" label="1,2,3,4">全部</el-radio>
                <el-radio v-model="radio" label="1">正常</el-radio>
                <el-radio v-model="radio" label="2">黑名单</el-radio>
                <el-radio v-model="radio" label="3,4">注销</el-radio>
                <!-- <el-radio v-model="radio"  label="2">注销</el-radio> -->
              </el-col>
              <el-col :xs="24" :sm="2" :md="7" :lg="4" :xl="4"></el-col>
            </div>
          </el-col>
        </el-row>
        <el-row style="text-align:center" class="marginTop">
          <button class="m-btn-orange m-btn-search" @click="search(1,1)">搜索</button>
        </el-row>
      </div>
      <el-row>
        <el-col style="float:right" :xs="4" :sm="4" :md="4" :lg="2" :xl="2">
          <div class="m-add"><button @click="addAgent">添加代理商</button></div>
        </el-col>
      </el-row>
      <div v-if="searchList">
        <div class="m-listTitleFoot">
          <h3>代理商列表<span class="f-fw greyFont">({{total||'0'}})</span></h3>
        </div>
        <div class="m-details">
          <table class="m-searchTab" style="width:100%;height:100%;">
            <tr>
              <td colspan="11">
                <el-row>
                  <el-col :span="7" class="f-ta-l f-pl-10">
                    <div class="grid-content bg-purple">
                      <span class="greyFont">最后同步成功时间 ：</span><span>{{ getDateTime(syncLastTime)[6]||"--" }}</span>
                    </div>
                  </el-col>
                  <el-col :span="7" class="f-ta-l f-pl-10">
                    <div class="grid-content bg-purple-light">
                      <span class="greyFont">下次同步成功时间 ：</span><span>{{getDateTime(nextSyncTime)[6]||'--'}}</span>
                    </div>
                  </el-col>
                  <el-col :span="6" class="f-ta-l f-pl-10">
                    <div class="grid-content bg-purple">
                      <span class="greyFont">同步间隔时间 ：<label v-if="timeCell">{{timeCell}}小时</label>
                        <label v-else>--</label>
                      </span>
                      <button class="setBtn" @click="openSet()">设置</button>
                    </div>
                  </el-col>
                  <el-col :span="4" class="f-ta-r">
                    <div class="grid-content bg-purple-light">
                      <button class="syncBtn" type="success" @click="sync()">手动同步</button>
                    </div>
                  </el-col>
                </el-row>
              </td>
            </tr>
            <tr class="f-s-14">
              <td>序号</td>
              <td>公司名称</td>
              <td>修改时间</td>
              <td>联系人</td>
              <td>手机号码</td>
              <td>部门状态</td>
              <td>所属渠道</td>
              <td>创建时间</td>
              <td>客户地址</td>
              <td>来源</td>
              <td>员工详情</td>
            </tr>
            <tr v-if="searchList.length>0" v-for="(v,i) of searchList" :key="i" :class="{'greyFont':v.departState==3}">
              <td>
                {{((currentPage-1)*15+(i+1))}}
              </td>
              <td>
                <a href="javascript:void(0)" @click="getCompanyDetails(v)">{{v.departName}}</a>
              </td>
              <td>
                <span v-if="v.modifyTime">
                  {{getDateTime(v.modifyTime)[6]}}
                </span>
                <span v-if="!v.modifyTime">
                  --
                </span>
              </td>
              <td>
                {{v.managerName}}
              </td>
              <td>
                {{v.phone}}
              </td>
              <td>
                <span :class="v.departState==1?'green':v.departState==2?'red':v.departState==3||v.departState==4?'grey':'--'">{{translateData('userState',v.departState)}}</span>
              </td>
              <td>
                <a :href="v.dealerIdName?'#/home/organization/yfd?dealerName='+v.dealerIdName:'javascript:void(0)'">{{v.dealerIdName}}</a>
              </td>
              <td>
                <span v-if="v.createTime">
                  {{getDateTime(v.createTime)[6]}}
                </span>
                <span v-if="!v.createTime">
                  --
                </span>
              </td>
              <td>{{v.address||'--'}}</td>
              <td>{{v.userOrigin==1?'手动添加':v.userOrigin==2?'系统同步':'--'}}</td>
              <td>
                <a href="javascript:void(0)" @click="getDetails(v)">查看详情</a>
              </td>
            </tr>
            <tr v-if="searchList.length==0">
              <td class="f-ta-c" colspan="11">
                暂无数据
              </td>
            </tr>
          </table>
        </div>
        <div class="m-listTitleFoot" v-if="searchList.length!=0">
          <el-row>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-pagination layout="prev, pager, next" :page-size="15" @current-change="search(currentPage,1)" :current-page.sync="currentPage" :total="form.page">
                </el-pagination>
              </div>
            </el-col>
            <el-col v-if="false" :span="12">
              <div class="grid-content bg-purple-light fr">操作:<el-button size="mini" @click="doFunction('offLine')">强制离线</el-button><el-button size="mini" @click="doFunction('addBlack')">加入黑名单</el-button><el-button size="mini" @click="doFunction('cancelBlack')">解除黑名单</el-button><el-button size="mini" @click="doFunction('delete')">删除</el-button></div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <layerSync v-if="off.layer"></layerSync>
    <dlsDetails v-if="off.dlsDetails" :lists="detailsList"></dlsDetails>
    <companyDetails v-if="off.companyDetails" :lists="companyDetails"></companyDetails>
    <div class="m-dialog" v-if="off.dialog">
      <div class="m-newAddress">
        <p class="m-dialog-title">创建代理商<span class="m-icon-close" @click="closedialog()"></span></p>
        <div class="m-dialog-content">
          <el-form :model="addForm" :rules="rules" ref="addForm" label-width="80px">
            <el-form-item label="归属渠道" prop="addDepId">
              <el-select   style="width:400px;" size="mini" v-model="addForm.addDepId" placeholder="请选择归属渠道">
                <el-option
                v-for="item in depart"
                :key="item.value"
                :label="item.label"
                :value="`${item.dealerIdName}`+`【${item.dealerId}】`">
                </el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="部门ID" prop="addDepId">
              <el-input size="small" v-model="addForm.addDepId"></el-input>
            </el-form-item> -->
            <el-form-item label="部门名称" prop="addDepName">
              <el-input size="small" v-model="addForm.addDepName"></el-input>
            </el-form-item>
            <el-form-item label="联系人" prop="addDepContacts">
              <el-input size="small" v-model="addForm.addDepContacts"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="addDepPhone">
              <el-input size="small" maxlength="11" v-model="addForm.addDepPhone"></el-input>
            </el-form-item>
            <el-form-item label="收货地址" prop="addaddress">
              <v-distpicker @selected="onSelected" :province="select1.province" :city="select1.city" :area="select1.area"></v-distpicker>
            </el-form-item>
            <el-form-item label="收货街道" prop="addaddressStr">
              <el-input size="small" v-model="addForm.addaddressStr"></el-input>
            </el-form-item>
            <el-form-item label="详细地址" prop="detailAddress">
              <el-input size="small" v-model="addForm.detailAddress"></el-input>
            </el-form-item>
            <!-- <el-form-item label="售卡地址" prop="addSealRegion">
              <el-input size="small" v-model="addForm.addSealRegion"></el-input>
            </el-form-item> -->
            <el-form-item label="售卡地址" prop="addaddress">
              <v-distpicker @selected="onSelected1" :province="select.province" :city="select.city" :area="select.area"></v-distpicker>
            </el-form-item>
            <el-form-item label="售卡区域" prop="addsealArea">
              <el-input size="small" v-model="addForm.addsealArea"></el-input>
            </el-form-item>
            <el-form-item label="门店地址" prop="addFront">
              <el-input size="small" :maxlength="11" v-model="addForm.addFront"></el-input>
            </el-form-item>
          </el-form>
          <p style="text-align:center"><button @click="saveForm(1,'addForm')" style="padding:5px;" class="f-bg-blue">保存</button></p>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { getDateTime, getUnixTime, errorDeal, disableTimeRange6, checkMobile, getTimeFunction, translateData } from "../../config/utils";
import { requestMethod, requestgetSyncTime, requestgetSyncInfo, requestsetSyncTime, addDepart } from "../../config/service.js";
import VDistpicker from "v-distpicker";
import companyDetails from "./companyDetails";
import layerSync from "./layerSyncDls";
import dlsDetails from "./dlsDetails";
import { mapState,mapActions } from 'vuex';
import { debug } from 'util';
export default {
  name: "dls",
  data() {
    return {
      syncLastTime: "", //最后一次同步成功时间
      nextSyncTime: "", //下次同步成功时间
      currentPage: 0, //当前页
      timeCell: "", //时间间隔
      headPhone: "",
      total: "",
      startTime: "",
      endTime: "",
      cname: "",
      phone: "",
      name: "",
      radio: "1,2,3,4",
      timeType: "1",
      detailsList: [],
      companyName: "", //..
      managerName: "", //..
      managerPhone: "", //..
      searchDetailsType: "", //查看员工详情
      departState: "", //部门状态
      companyDetails: "",
      select: "",
      select1: "",
      searchList: "",
      searchJson:"",
      addForm: {
        addDepId: "",
        addDepName: "",
        addDepContacts:"",
        addDepPhone:"",
        addaddressStr:"",
        detailAddress:"",
        addsealArea:"",
        addFront:"",
        soldProvince:"",
        soldCity:"",
        soldCounty:"",
        province:"",
        city:"",
        county:""
      },
      rules: {
        addDepName: [ { required: true, message: "部门名称为必填内容", trigger: "blur" } ],
        addDepContacts: [ { required: true, message: "部门联系人为必填内容", trigger: "blur" } ],
        addDepPhone: [ { required: true, message: "部门联系人电话为必填内容", trigger: "blur" } ],
        detailAddress: [ { required: true, message: "收货人详细地址为必填内容", trigger: "blur" } ],
      },
      off: {
        layer: false,
        dlsDetails: false,
        notDlsDetails: true,
        companyDetails: false,
        dialog: false
      },
      form: {
        page: 0
      },
      pickerOptionsS: {
        disabledDate(time) {
          // let curDate = new Date().getTime();
          // let curYear = new Date(curDate).getFullYear();
          // let curMonth = new Date(curDate).getMonth() + 1,
          //   minMonth = curMonth - 5,
          //   minYear = curYear;
          // if (minMonth < 0) {
          //   minMonth += 12;
          //   minYear = curYear - 1;
          // }
          // let curDay = new Date(curDate).getDate() + 1;
          // let nextMonth = curMonth + 1;
          // let cur = minYear + "/" + minMonth + "/1";
          // let next = curYear + "/" + nextMonth + "/1";
          // let nextYesterday = new Date(next) - 1000 * 3600 * 24;
          // cur = new Date(cur).getTime();
          // return time.getTime() > nextYesterday || time.getTime() < cur;
        }
      },
      pickerOptionsE: {
        disabledDate(time) {
          // let curDate = new Date().getTime();
          // let curYear = new Date(curDate).getFullYear();
          // let curMonth = new Date(curDate).getMonth() + 1,
          //   minMonth = curMonth - 5,
          //   minYear = curYear;
          // if (minMonth < 0) {
          //   minMonth += 12;
          //   minYear = curYear - 1;
          // }
          // let curDay = new Date(curDate).getDate() + 1;
          // let nextMonth = curMonth + 1;
          // let cur = minYear + "/" + minMonth + "/1";
          // let next = curYear + "/" + nextMonth + "/1";
          // let nextYesterday = new Date(next) - 1000 * 3600 * 24;
          // cur = new Date(cur).getTime();
          // return time.getTime() > nextYesterday || time.getTime() < cur;
        }
      },
    };
  },
  components: { layerSync, dlsDetails, companyDetails, VDistpicker },
  created: function() {
    getTimeFunction(this);
    this.init();
  },
  computed: {
    ...mapState([
      "depart"
    ])
  },
  methods: {
    ...mapActions([
      "getDepart"
    ]),
    async init(){
        let vm=this;
        vm.getDepart();
    },
    addAgent() {
      let vm = this;
      vm.off.dialog = true;
    },
    search(p,v) {
      let vm = this,data;
      if(v==1){
        if (new Date(vm.startTime).getTime() > new Date(vm.endTime).getTime()) {
          layer.open({
            content: "开始时间必须小于结束时间",
            skin: "msg",
            time: 2,
            msgSkin: "error"
          });
          vm.searchList = "";
          return false;
        }
        if (vm.phone != "") {
          checkMobile(vm.phone, function() {
            vm.total = "";
            vm.searchList = "";
            vm.form.page = "";
            return false;
          });
        }
        data = {
          startTime: new Date(vm.startTime).getTime() || "",
          endTime: new Date(vm.endTime).getTime() || "",
          searchType: vm.timeType,
          departName: vm.cname,
          managerName: vm.name,
          departState: vm.radio,
          phone: vm.phone,
          pageSize: 15,
          pageNum: p || 1
        };
        vm.url = "/ums/w/user/departSearch";
        vm.currentPage = p || 1;
        vm.searchJson=data;
      }
      requestMethod(vm.searchJson, vm.url)
      .then(data => {
        if (data.code == 200) {
          vm.total = data.data.total; //查询总数
          vm.searchList = data.data.departs; //查询内容
          vm.form.page = data.data.total;
          vm.getSyncTime();
          vm.getSyncInfo();
        } else {
          vm.total = "";
          vm.searchList = "";
          vm.form.page = "";
          errorDeal(data);
        }
      }).catch(e =>
        errorDeal(e, () => {
          vm.total = "";
          vm.searchList = "";
          vm.form.page = "";
        })
      );
    },
    saveForm(v, i) {
      this.$refs[i].validate(valid => {
        if (valid) {
          let vm = this,depid,depName,json;
          if(vm.addForm.addDepId){
            depid=vm.addForm.addDepId.split('【')[1].split('】')[0]
            depName=vm.addForm.addDepId.split('【')[0]
          }else{
            depid=""
          }
          json = {
            "city":  vm.addForm.city,
            "county": vm.addForm.county,
            "dealerId": depid,
            "dealerName" : depName,
            "departName": vm.addForm.addDepName,
            "detailAddress": vm.addForm.detailAddress,
            "phone": vm.addForm.addDepPhone,
            "province": vm.addForm.province,
            "region": vm.addForm.addsealArea,
            "soldCity": vm.addForm.soldCity,
            "soldCounty": vm.addForm.soldCounty,
            "soldProvince": vm.addForm.soldProvince,
            "storefront": vm.addForm.addFront,
            "street": vm.addForm.addaddressStr,
            "username": vm.addForm.addDepContacts,
          };
          debugger;
          addDepart(json)
          .then(data => {
            if (data.code == 200) {
              layer.open({
                content: "添加成功",
                skin: "msg",
                time: 2,
                msgSkin: "success"
              });
            }
            if(vm.searchList){
              vm.search(1,0);
            }
            vm.resetForm();
            vm.off.dialog = false;
          }).catch(e => errorDeal(e, (vm.off.dialog = false,vm.resetForm())));
        }else{
          return false;
        }
      });
    },
    getCompanyDetails(v) {
      let vm = this;
      vm.off.notDlsDetails = false;
      vm.off.companyDetails = true;
      vm.companyDetails = v;
    },
    getDetails(v) {
      //查看详情
      let vm = this,
        data = {},
        url = "/ums/w/user/getDepartDetail";
      vm.searchDetailsType = 1;
      vm.searchDepartId = v.departId;
      data = {
        searchDepartId: v.departId,
        userState: "1,2,3,4",
        username: "",
        phone: "",
        pageNum: "1",
        pageSize: "10"
      };
      vm.companyName = v.departName;
      vm.managerName = v.managerName;
      vm.managerPhone = v.phone;
      vm.departState = v.departState;
      requestMethod(data, url)
        .then(data => {
          if (data.code == 200) {
            if (data.data.users.length > 0) {
              vm.off.notDlsDetails = false;
              vm.off.dlsDetails = true;
              vm.detailsList = data.data.users;
              vm.headUserName = data.data.users[0].username;
              vm.headPhone = data.data.users[0].phone;
            } else {
              vm.off.notDlsDetails = false;
              vm.off.dlsDetails = true;
              vm.detailsList = [];
              vm.detailsList.username = "";
              vm.detailsList.phone = "";
            }
          } else {
            errorDeal(data);
          }
        })
        .then(() => {
          for (let v = 0; v < vm.detailsList.length; v++) {
            vm.$set(vm.detailsList[v], "ischecked", false);
          }
        })
        .catch(e => errorDeal(e));
    },
    openSet() {
      let vm = this;
      vm.off.layer = true;
      vm.off.sync = false;
      vm.off.setSync = true;
    },
    sync() {
      let vm = this;
      vm.off.layer = true;
      vm.off.sync = true;
      vm.off.setSync = false;
    },
    getSyncTime() {
      let vm = this,
        data = { recordType: "3" };
      requestgetSyncTime(data)
        .then(data => {
          if (data.code == 200) {
            vm.syncLastTime = data.data.syncLastTime;
          } else {
            errorDeal(data);
          }
        })
        .catch(e => errorDeal(e));
    },
    getSyncInfo() {
      let vm = this;
      let data = {};
      requestgetSyncInfo(data)
        .then(data => {
          vm.nextSyncTime = data.data.nextSyncTime;
          vm.timeCell = data.data.syncInterval;
        })
        .catch(e => errorDeal(e));
    },
    onSelected1(data) {
      let vm = this;
      vm.addForm.soldProvince = data.province.value;
      vm.addForm.soldCity = data.city.value;
      vm.addForm.soldCounty = data.area.value;
      
    },onSelected(data) {
      let vm = this;
      vm.addForm.province = data.province.value;
      vm.addForm.city = data.city.value;
      vm.addForm.county = data.area.value;
    },
    closedialog() {
      let vm = this;
      vm.addForm={};
      vm.off.dialog = false;
    },
    resetForm(){
      let vm=this;
      vm.addForm={};
    },
    getDateTime(v) {
      return getDateTime(v);
    },
    resetTimer() {
      this.btnDisabled = false;
      this.show = true;
      this.count = "获取验证码";
      clearInterval(this.timer);
      this.timer = null;
    },
    translateData(v, i) {
      return translateData(v, i);
    }
  }
};
</script>
<style>
.dls .setBtn {
  margin-left: 20px;
  background: #2a7ce0;
  color: #fff;
  padding: 2px 8px;
  border: 1px solid #2a7ce0;
  border-radius: 4px;
  outline: none;
}
.dls .syncBtn {
  margin-right: 10px;
  background: #00aa01;
  color: #fff;
  padding: 3px 6px;
  border: 1px solid #2baf08;
  border-radius: 4px;
  outline: none;
}
.m-add button {
  background: #00aa01;
  padding: 5px;
}
.m-dialog {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}
.m-newAddress {
  border: 10px solid #b4b4b4;
  width: 700px;
  /* height: 450px; */
  background: #fff;
  position: fixed;
}
.m-newAddress .m-dialog-title {
  background: #e0e0e0;
  margin-bottom: 15px;
  padding: 10px;
}
.m-newAddress .m-dialog-content {
  padding: 20px;
}
.m-newAddress .m-dialog-content > span {
  display: inline-block;
  height: 50px;
}
.m-newAddress .m-dialog-content > p {
  margin-bottom: 10px;
}
.m-icon-close {
  cursor: pointer;
  float: right;
  display: inline-block;
  width: 18px;
  height: 18px;
  background: url("../../assets/images/icon_close.png") no-repeat center;
  background-size: contain;
}
.distpicker-address-wrapper select {
  padding: 0;
  font-size: 14px;
  border-radius: 4px;
  height: 30px;
}
.el-form-item {
  margin-bottom: 20px;
}
</style>

