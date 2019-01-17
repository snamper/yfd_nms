<template>
    <div>
        <div class="yfd f-s-16">
            <el-container>
                <el-header class="m-headBar">
                    <el-row>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">部门名称&nbsp;:&nbsp;<a class="blue" href="javascript:void(0)">{{lists.departName}}</a></div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple-light fr " style="padding-right:40px"><a href="javascript:void(0)" class="blue" @click="goBack()">返回列表</a></div>
                        </el-col>
                    </el-row>
                </el-header>
            </el-container>
        </div>
        <div class="m-listTitleFoot" style="margin:0 38px;">
            <el-row>
                <el-col :span="20">
                    <div class="grid-content bg-purple">
                        <h3>公司详情</h3>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div style="width:95%;margin-left:30px" class="m-company-detail f-s-14">
            <table>
                <tr>
                    <td>创建时间 : </td>
                    <td>{{getDateTime(lists.createTime)[6]}}</td>
                </tr>
                <tr>
                    <td>部门名称 : </td>
                    <td>{{lists.departName}}({{lists.departId}})</td>
                </tr>
                <tr>
                    <td>部门状态 : </td>
                    <td>{{translateData('userState',lists.departState)}}</td>
                </tr>
                <tr>
                    <td>联系人姓名 : </td>
                    <td>{{lists.managerName||'--'}}</td>
                </tr>
                <tr>
                    <td>部门信息修改时间 : </td>
                    <td>{{getDateTime(lists.modifyTime)[6]}}</td>
                </tr>
                <tr>
                    <td>部门联系人手机号码 : </td>
                    <td>{{lists.phone||'--'}}</td>
                </tr>
                <tr>
                    <td>归属渠道 : </td>
                    <td v-if="!change">{{lists.dealerIdName||'--'}}
                        <a href="javascript:void(0)" @click="details">查看渠道变更记录</a>
                        <button v-if="lists.userOrigin!=2" class="m-btn-green m-btn-small" @click="fchange(lists)">修改渠道</button>
                    </td>
                    <td v-if="change">
                        <p style="height:100%;position:relative">
                            <el-select style="width:400px;" size="mini" v-model="newDealers" placeholder="请选择修改的渠道">
                                <el-option v-for="item in options" 
                                    :key="item.dealerId"
                                    :label="item.dealerIdName"
                                    :value="`${item.dealerId},${item.dealerIdName}`">
                                    <span style="float: left">{{ item.dealerIdName }}</span>
                                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.phone }}</span>
                                </el-option>
                            </el-select>
                            <button class="m-btn-green m-btn-group" @click="fdetermine">确定</button>
                        </p>
                    </td>
                </tr>
                <tr>
                    <td>客户门店地址 : </td>
                    <td>{{lists.storefront||'--'}}</td>
                </tr>
                <tr>
                    <td>最后与客户沟通时间 : </td>
                    <td>{{getDateTime(lists.lastTime)[6]||'--'}}</td>
                </tr>
                <tr>
                    <td>售卡区域 : </td>
                    <td>{{lists.soldProvince||'--'}}，{{lists.soldCity||'--'}}，{{lists.soldCounty||'--'}}</td>
                </tr>
                <tr>
                    <td>售卡地址 : </td>
                    <td>{{lists.address||'--'}}</td>
                </tr>
            </table>
        </div>
        <div v-if="departChangelist" class="departChange">
            <div class="m-departChange-con">
                <p>渠道修改详情<span class="icon-close" @click="closeDetails"></span></p>
                <ul>
                    <li v-for="(v,i) of departChange" :key="i" v-if="departChange.length">
                        <span>{{getDateTime(v.createTime)[8]}}</span>&nbsp;&nbsp;<span style="font-size:12px;color:grey">{{getDateTime(v.createTime)[5]}}</span>
                        &nbsp;&nbsp;<span>{{v.dealerIdName}}{{v.dealerId}}</span>
                    </li>
                    <li v-if="!departChange.length">
                        暂无渠道变更记录
                    </li>
                </ul>
            </div>
        </div>
        <div v-if="lists.userOrigin!=2" style="margin-top:8px" class="modifyStaffInfo">
            <el-row v-if="off.modify">
                <el-col style="text-align:center" :span="24">
                    <div class="grid-content bg-purple"><button class="m-btn-green m-btn" @click="alter">修改</button></div>
                </el-col>
            </el-row>
            <el-row v-if="!off.modify">
                <el-col style="text-align:center" :span="24">
                    <div class="grid-content bg-purple"><button class="m-btn-red m-btn" style="margin-right:10px;">取消</button><button class="m-btn-green m-btn">确定</button></div>
                </el-col>
            </el-row>
        </div>
        <div class="m-dialog" v-if="off.dialog">
            <div class="m-newAddress">
                <p class="m-dialog-title">修改代理商<span class="m-icon-close" @click="closedialog()"></span></p>
                <div class="m-dialog-content">
                    <el-form :model="addForm" :rules="rules" ref="addForm" label-width="80px">
                        <el-form-item v-if="false" label="归属渠道" prop="addDepId">
                            <el-select style="width:400px;" size="mini" v-model="addForm.addDepId" placeholder="请选择修改的渠道">
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="`${item.dealerIdName}`+`【${item.dealerId}】`">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="部门名称" prop="addDepName">
                            <el-input size="small" v-model="addForm.addDepName"></el-input>
                        </el-form-item>
                        <el-form-item label="售卡区域" prop="addaddress">
                            <v-distpicker :disabled="off.alterAddress" @selected="onSelected" :province="select.province" :city="select.city" :area="select.area"></v-distpicker>
                        </el-form-item>
                        <el-form-item v-if="false" label="售卡地址" prop="addSealRegion">
                            <el-input size="small" v-model="addForm.addSealRegion"></el-input>
                        </el-form-item>
                        <el-form-item label="门店地址" prop="addFront">
                            <el-input size="small" :maxlength="11" v-model="addForm.addFront"></el-input>
                        </el-form-item>
                    </el-form>
                    <p style="text-align:center"><button @click="saveForm('addForm')" style="padding:5px;" class="f-bg-blue">保存</button></p>
                </div>
            </div>
        </div>
        <layerConfirm v-if="off.layer" :layerType="layerType"></layerConfirm>
    </div>
</template>
<script>
import { requestMethod, getDepart, departChangeHistory, updateDepart } from "../../config/service.js";
import { getDateTime, getStore, errorDeal, translateData } from "../../config/utils";
import { mapState, mapMutations, mapActions } from "vuex";
import layerConfirm from "../../components/layerConfirm";
import VDistpicker from "v-distpicker";
export default {
  props: ["lists"],
  data() {
    return {
      departChangelist: false,
      departChange: "",
      change: false,
      layerType: "",
      value1: "",
      newDealers:"",
      options: [{ dealerId: "代理商ID", dealerIdName: "代理商名称" }],
      changeDepartInfo: {},
      select: {},
      off: {
        layer: false,
        modify: true,
        dialog: false,
        alterAddress:false
      },
      addForm: {
        addDepId: "",
        addDepName: "",
        addSealRegion: "",
        addFront: "",
        soldProvince: "",
        soldCity: "",
        soldCounty: ""
      },rules: {
        addDepName: [ { required: true, message: "部门名称为必填内容", trigger: "blur" } ]
      },
    };
  },
  components: {
    layerConfirm,
    VDistpicker
  },
  computed: {
    ...mapState(["depart"]),
  },
  created: function() {
    let vm = this;
    vm.user = getStore("YFD_NMS_INFO");
    vm.topId = getStore("departId");
    vm.init();
  },
  methods: {
    ...mapActions(["getDepart"]),
    async init() {
      let vm = this;
      vm.getDepart()
      .then(() => {
        vm.options = vm.depart;
      }).catch(e=>errorDeal(e));
    },
    alter() {
      let vm = this,lists=vm.lists;
      vm.off.dialog=true;
      vm.addForm.addDepName = lists.departName;
      vm.addForm.addDepId = lists.departId;
      vm.addForm.addFront = lists.storefront;
      vm.addForm.addSealRegion = lists.address;
      vm.select.province=lists.soldProvince;
      vm.select = Object.assign({},{ province: lists.soldProvince, city: lists.soldCity, area: lists.soldCounty });
    },
    saveForm(i){
        this.$refs[i].validate(valid => {
            let vm=this,json;
            json={
            "departId": vm.addForm.addDepId,
            "region": vm.addForm.addSealRegion,
            "storefront": vm.addForm.addFront,
            "soldCity": vm.addForm.soldCity,
            "soldCounty": vm.addForm.soldCounty,
            "soldProvince": vm.addForm.soldProvince}
            updateDepart(json)
            .then((data)=>{
                if(data.code==200){
                    layer.open({
                    content: "修改部门信息成功",
                    skin: "msg",
                    time: 2,
                    msgSkin: "success"
                    });
                    vm.off.dialog=false;
                }
                let json = {
                    "startTime": new Date(vm.$parent.startTime).getTime(),
                    "endTime": new Date(vm.$parent.endTime).getTime(),
                    "searchType": '1',
                    "departName": '',
                    "managerName": '',
                    "departState": '1,2,3,4',
                    "phone": vm.lists.phone,
                    "pageSize": 15,
                    "pageNum": 1
                },
                url = '/ums/w/user/departSearch';
                requestMethod(json, url)
                .then((data) => {
                if (data.code == 200) {
                    vm.lists = data.data.departs[0];
                } 
                }).catch(e => errorDeal(e));
            }).catch(e=>errorDeal(e))
        })
    },
    details() {
      let vm = this;
      departChangeHistory({ departId: vm.lists.departId })
        .then(data => {
          if (data.code == 200) {
            vm.departChange = data.data.list;
          }
        })
        .catch(e => errorDeal(e));
      vm.departChangelist = true;
    },
    fchange(v) {
      let vm = this;
      vm.change = true;
      vm.newDealers = v.dealerIdName;
    },
    fdetermine() {
      let vm = this;
      vm.off.layer = true;
      vm.layerType = "modifyDepart";
      vm.changeDepartInfo = {
        departId: vm.lists.departId,
        dealerId: vm.newDealers.split(',')[0],
        dealerIdName: vm.newDealers.split(',')[1]
      };
    },
    onSelected(data) {
      let vm = this;
      vm.addForm.soldProvince = data.province.value;
      vm.addForm.soldCity = data.city.value;
      vm.addForm.soldCounty = data.area.value;
    },
    closedialog() {
      let vm = this;
      vm.addForm = {};
      vm.off.dialog = false;
    },
    resetForm() {
      let vm = this;
      vm.addForm = {};
    },
    goBack() {
      let vm = this;
      vm.$parent.off.companyDetails = false;
      vm.$parent.off.notDlsDetails = true;
      vm.$parent.search(1,2);
    },
    closeDetails() {
      let vm = this;
      vm.departChangelist = false;
    },
    getDateTime(v) {
      return getDateTime(v);
    },
    translateData(v, i) {
      return translateData(v, i);
    }
  }
};
</script>
<style scoped>
.m-listTitleFoot {
  width: 96%;
  margin: 10px 38px;
}
.m-listTitleFoot label {
  display: block;
  width: 50%;
}
.m-company-detail table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #e4e4e4;
}
.m-company-detail table tr {
  height: 50px;
}
.m-company-detail table tr:nth-child(even) {
  background: #fff;
}
.m-company-detail table tr {
  border-top: 1px solid #e4e4e4;
}
.m-company-detail table tr td:nth-child(1) {
  width: 200px;
  text-align: right;
  padding-right: 20px;
}
.departChange {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.departChange .m-departChange-con {
  width: 400px;
  height: 200px;
  padding: 20px;
  border-radius: 6px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background: #fff;
  box-shadow: 0 0 30px grey;
}
.departChange ul {
  width: 100%;
  height: 100%;
  overflow: auto;
}
.departChange ul::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}
.departChange ul::-webkit-scrollbar-thumb {
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
}
.departChange ul li {
  height: 35px;
  line-height: 35px;
}
.departChange p {
  height: 20px;
  line-height: 20px;
  text-align: center;
  position: absolute;
  top: 5px;
  left: 130px;
}
.departChange p span {
  display: inline-block;
  width: 10px;
  height: 10px;
  cursor: pointer;
  position: absolute;
  top: 5px;
  right: -175px;
  background: url("../../assets/images/icon_close.png") no-repeat right;
  background-size: 10px;
}
.m-btn-group {
  position: absolute;
  height: 28px;
  left: 395px;
  border-radius: 0 4px 4px 0;
}
</style>

