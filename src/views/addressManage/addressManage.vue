<template>
  <section ref="sec" style="width:100%;height:100%">
    <div class="dls greyFont">
      <el-row>
        <el-col :span="24"><div class="grid-content bg-purple-dark m-search-title black">搜索条件</div></el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12"><div class="grid-content bg-purple-light">
          <el-col :xs="4" :sm="3" :md="3" :lg="4" :xl="4"><div class="grid-content bg-purple-dark f-ta-r inputTitle">代理商名称：</div></el-col>
          <el-col :xs="19" :sm="19" :md="19" :lg="18" :xl="18">
            <!-- <el-select size="small" style="width:100%" clearable v-model="departId" placeholder="请选择查询的代理商名称">
              <el-option v-for="item in options" :key="item.dealerId" :label="item.dealerIdName" :value="item.dealerId"
                size="small">
              </el-option>
            </el-select> -->
            <el-autocomplete
              v-model="departId"
              style="width:100%"
              size="small"
              value-key="username"
              :fetch-suggestions="querySearchAsync"
              placeholder="请选择查询的代理商名称"
              @select="handleSelect"
            ></el-autocomplete>
          </el-col>
        </div></el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12"><div class="grid-content bg-purple-light">
          <el-col :xs="4" :sm="3" :md="3" :lg="4" :xl="4"><div class="grid-content bg-purple-dark f-ta-r inputTitle">电话号码：</div></el-col>
          <el-col :xs="19" :sm="19" :md="19" :lg="18" :xl="18">
            <el-input @input="finputphone" v-model="phone" size="small"  placeholder="请输入查询的11位电话号码" :maxlength="11"></el-input>
          </el-col>
        </div></el-col>
      </el-row>
      <el-row style="text-align:center" class="marginTop">
        <button class="m-btn-orange m-btn-search" @click="search()">搜索</button>
      </el-row>
    </div>
    <div v-if="searchlist">
      <div class="m-listTitleFoot">
        <el-row>
          <h3>
            <span>地址列表</span><span class="f-fw greyFont">({{total||'0'}})</span>
            <button @click="faddAddress()" style="padding:5px;float:right" class="f-bg-green">新增地址</button>
          </h3>                    
        </el-row>        
      </div>
      <div class="m-details">
          <table class="m-searchTab" style="width:100%;height:100%;">
            <tr>
              <td>序号</td>
              <td>收货人姓名</td>
              <td>所在地区</td>
              <td>详细地址</td>
              <td>电话号码</td>
              <td>操作</td>
            </tr>
            <tr v-for="(v,i) of searchlist" :key="i">
                <td>{{((currentPage-1)*15+(i+1))}}</td>
                <td>{{v.username}}</td>
                <td>{{v.province+v.city+v.county}}</td>
                <td>{{v.detailAddress}}</td>
                <td>{{v.phone}}</td>
                <td>
                  <a v-if="v.defaultFlag==1" class="green">默认地址</a>
                  <a v-else @click="operate(1,v.id)" class="blue">设为默认</a>
                  <a style="margin-left:20px;" @click="operate(2,v.id)" class="red">删除</a>
                  <a style="margin-left:20px;" @click="operate(3,v)" class="blue">编辑</a>
                </td>
            </tr>
            <tr v-if="searchlist.length<=0">
              <td style="text-align:center" colspan="6">
                该商户暂时没有收货地址，现在<a @click="dialogFormVisible = true" class="green">添加收货地址</a>                                                  
              </td>
            </tr>
          </table>
      </div>       
      </div>
      <div class="m-dialog" v-if="dialogFormVisible">
        <div class="m-newAddress">
          <p class="m-dialog-title">创建地址<span class="m-icon-close" @click="closedialog()"></span></p>
          <div class="m-dialog-content">
            <span>新增收货地址</span>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
              <el-form-item label="地址信息" prop="addaddress">
                <v-distpicker @selected="onSelected" :province="select.province" :city="select.city" :area="select.area"></v-distpicker>
              </el-form-item>
              <el-form-item label="详细地址" prop="addtextarea">
                <el-input
                  size="small"
                  type="textarea"
                  :rows="2"
                  max-length="50
                  "
                  placeholder="请输入详细地址信息，如道路,门牌号"
                  v-model="ruleForm.addtextarea">
                </el-input>
              </el-form-item>
              <el-form-item label="收货人" prop="addname">
                <el-input size="small" v-model="ruleForm.addname"></el-input>
              </el-form-item>
              <el-form-item label="手机号码" prop="addphone">
                <el-input size="small" :maxlength="11"  v-model="ruleForm.addphone"></el-input>
              </el-form-item>
              <el-form-item label="">
                <el-checkbox v-model="addsetDefault">设置为默认收货地址</el-checkbox>
              </el-form-item>
            </el-form>
            <p style="text-align:center"><button @click="saveForm(1,'ruleForm')" style="padding:5px;" class="f-bg-blue">保存</button></p>
          </div>
        </div>
      </div>
      <layerConfirm v-if="off.layer" :layerType="layerType" :layerData="layerData"></layerConfirm>
  </section>
</template>

<script type='text/ecmascript-6'>
import VDistpicker from "v-distpicker";
import {
  addAddress,
  searchAddress,
  changeDefault,
  deleteAddress,
  updateAddress,
  searchUser
} from "../../config/service.js";
import layerConfirm from "../../components/layerConfirm";
import { errorDeal } from "../../config/utils.js";
export default {
  data() {
    var validateAddress = (rule, value, callback) => {
      if (this.addaddress == false) {
        callback(new Error("请选择省市区"));
      } else {
        callback();
      }
    };
    var validatePhone = (rule, value, callback) => {
      var testPhone = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
      if (!testPhone.test(this.ruleForm.addphone)) {
        callback(new Error("手机号码不合法"));
      } else {
        callback();
      }
    };
    return {
      dialogFormVisible: false,
      searchlist: "",
      pageSize: 15,
      departId: "",
      phone: "",
      currentPage: 0,
      timeout: null,
      receiverUserId: "",
      layerType: "",
      layerData: "",
      formType: 1,
      addsetDefault: false,
      setDefault: 0,
      restaurants: [],
      searchJson: "",
      select: "",
      // address1: false,
      off: { layer: false },
      addprovince: "",
      addcity: "",
      addarea: "",
      ruleForm: {
        addtextarea: "",
        addname: "",
        addphone: "",
        addaddress: ""
      },
      rules: {
        addaddress: [
          { required: true, validator: validateAddress, trigger: "blur" }
        ],
        addtextarea: [
          { required: true, message: "请输入详细地址", trigger: "blur" }
        ],
        addname: [
          { required: true, message: "请输入收货人姓名", trigger: "blur" }
        ],
        addphone: [
          { required: true, message: "请输入收货人电话号码", trigger: "blur" },
          { validator: validatePhone, trigger: "blur" }
        ]
      }
    };
  },
  components: { VDistpicker, layerConfirm },
  watch: {
    addsetDefault() {
      let vm = this;
      vm.addsetDefault == true
        ? (vm.setDefault = 1)
        : vm.addsetDefault == false
          ? (vm.setDefault = 0)
          : `javascript:void(0)`;
    }
  },
  methods: {
    search(p) {
      if (this.departId == "" && this.phone == "") {
        layer.open({
          content: "请入要查询的商户信息",
          skin: "msg",
          time: 2,
          msgSkin: "error"
        });
        this.searchlist = "";
        return false;
      }
      if (this.receiverUserId == "") {
        layer.open({
          content: "代理商名称或手机号码输入有误",
          skin: "msg",
          time: 2,
          msgSkin: "error"
        });
        this.searchlist = "";
        return false;
      }
      let vm = this,
        json = {
          receiverUserId: vm.receiverUserId,
          pageSize: vm.pageSize,
          pageNum: p || 1
        };
      vm.searchJson = json;
      searchAddress(vm.searchJson)
        .then(data => {
          vm.searchlist = data.data.list;
          vm.total = data.data.total;
          vm.currentPage = p || 1;
        })
        .catch(e => errorDeal(e));
    },
    operate(v, i) {
      let vm = this;
      if (v == 1) {
        let json = { id: i };
        changeDefault(json)
          .then(data => {
            if (data.code == 200) {
              layer.open({
                content: "修改默认收货地址成功",
                skin: "msg",
                time: 2,
                msgSkin: "success"
              });
            }
            vm.search();
          })
          .catch(e => errorDeal(e));
      } else if (v == 2) {
        vm.off.layer = true;
        vm.layerType = "deleteAddress";
        vm.layerData = { id: i };
      } else if (v == 3) {
        vm.dialogFormVisible = true;
        vm.ruleForm.addphone = i.phone;
        vm.ruleForm.addname = i.username;
        vm.ruleForm.addtextarea = i.detailAddress;
        vm.searchJsonId = i.id;
        vm.formType = 2;
        if (i.defaultFlag == 1) {
          vm.addsetDefault = true;
        } else {
          vm.addsetDefault = false;
        }
        vm.select = Object.assign(
          {},
          { province: i.province, city: i.city, area: i.county }
        );
        vm.addprovince = i.province;
        vm.addarea = i.county;
        vm.addcity = i.city;
      } else {
        return false;
      }
    },
    saveForm(v, i) {
      if (this.addprovince == "" || this.addcity == "" || this.addarea == "") {
        this.addaddress = false;
      } else {
        this.addaddress = true;
      }
      this.$nextTick(()=>{
        console.log(this.$refs[i])
        this.$refs[i].validate(valid => {
          if (valid) {
            console.log("submit!");
            let vm = this;
            let json = {
              receiverUserId: vm.receiverUserId,
              province: vm.addprovince,
              city: vm.addcity,
              county: vm.addarea,
              detailAddress: vm.ruleForm.addtextarea,
              phone: vm.ruleForm.addphone,
              username: vm.ruleForm.addname,
              defaultFlag: vm.setDefault,
              street: ""
            };
            if (vm.formType == 1) {
              addAddress(json)
                .then(data => {
                  if (data.code == 200) {
                    layer.open({
                      content: "添加成功",
                      skin: "msg",
                      time: 2,
                      msgSkin: "success"
                    });
                  }
                  vm.search();
                  vm.resetForm();
                  vm.dialogFormVisible = false;
                })
                .catch(e => errorDeal(e, (vm.dialogFormVisible = false)));
            } else if (vm.formType == 2) {
              delete json.receiverUserId;
              json.id = vm.searchJsonId;
              updateAddress(json)
                .then(data => {
                  if (data.code == 200) {
                    layer.open({
                      content: "修改成功",
                      skin: "msg",
                      time: 2,
                      msgSkin: "success"
                    });
                  }
                  vm.search();
                  vm.resetForm();
                  vm.dialogFormVisible = false;
                })
                .catch(e => errorDeal(e, (vm.dialogFormVisible = false)));
            }
          } else {
            console.log("error submit!");
            return false;
          }
        })
      })
    },
    faddAddress() {
      let vm = this;
      vm.dialogFormVisible = true;
      vm.formType = 1;
    },
    onSelected(data) {
      let vm = this;
      vm.addprovince = data.province.value;
      vm.addcity = data.city.value;
      vm.addarea = data.area.value;
    },
    resetForm() {
      let vm = this;
      vm.addprovince = "";
      vm.addcity = "";
      vm.addarea = "";
      vm.ruleForm = {};
      vm.select = {};
    },
    closedialog() {
      let vm = this;
      vm.dialogFormVisible = false;
      vm.resetForm();
    },
    finputphone() {
      let vm = this;
      vm.receiverUserId = "";
      if (vm.phone.length == 11) {
        let vm = this,
          json = { phone: vm.phone, username: vm.departId };
        searchUser(json, () => {}).then(data => {
          if (data.data.list.length == 0) {
            layer.open({
              content: "未查询到相关用户信息",
              skin: "msg",
              time: 2,
              msgSkin: "error"
            });
            return false;
          }
          vm.receiverUserId = data.data.list[0].userId;
        });
      }
    },
    querySearchAsync(queryString, cb) {
      let vm = this,
        json = { phone: vm.phone, username: vm.departId },
        restaurants,
        results;
      searchUser(json, () => {})
        .then(data => {
          vm.restaurants = data.data.list;
          restaurants = vm.restaurants;
          results = queryString
            ? restaurants.filter(vm.createStateFilter(queryString))
            : restaurants;
          cb(results);
        })
        .catch(e => errorDeal(e));
    },
    createStateFilter(queryString) {
      return state => {
        return (
          state.username.toLowerCase().indexOf(queryString.toLowerCase()) > -1
        );
      };
    },
    handleSelect(item) {
      let vm = this;
      vm.receiverUserId = item.userId;
    }
  }
};
</script>

<style type='text/css'>
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
  height: 500px;
  background: #fff;
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
</style>
