<template>
  <div>
    <div v-if="off.searchStaff">
      <div class="yfd f-s-16">
        <el-container>
          <el-header class="m-headBar">
            <el-row>
              <el-col :xs="18" :sm="18" :md="18" :lg="10" :xl="10">
                <div class="grid-content bg-purple">公司名称&nbsp;:&nbsp;<span class="blue">{{company}}</span></div>
              </el-col>
              <el-col :xs="6" :sm="4" :md="4" :lg="6" :xl="6" class="hidden-md-and-down">
                <div class="grid-content bg-purple-light greyFont">联系人&nbsp;&nbsp;:&nbsp;&nbsp;<span class="black">{{managerName}}</span></div>
              </el-col>
              <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6" class="hidden-md-and-down">
                <div class="grid-content bg-purple greyFont">手机号码&nbsp;&nbsp;:&nbsp;&nbsp;<span class="black">{{managerPhone}}</span></div>
              </el-col>
              <el-col :xs="6" :sm="6" :md="6" :lg="2" :xl="2">
                <div class="grid-content bg-purple-light fr"><a class="blue" href="javascript:void(0)" @click="goBack()">返回列表</a></div>
              </el-col>
            </el-row>
          </el-header>
        </el-container>
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark m-search-title">搜索条件</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <div class="grid-content bg-purple-light greyFont">
              <el-col :xs="5" :sm="3" :md="4" :lg="4" :xl="4" :span="4">
                <div class="grid-content bg-purple-dark f-ta-r inputTitle">联系人：</div>
              </el-col>
              <el-col :xs="19" :sm="20" :md="18" :lg="18" :xl="18" :span="20">
                <el-input v-model="name" size="small" placeholder="请输入查询的联系人姓名"></el-input>
              </el-col>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <div class="grid-content bg-purple-light greyFont">
              <el-col :xs="5" :sm="3" :md="4" :lg="4" :xl="4" :span="4">
                <div class="grid-content bg-purple-dark f-ta-r inputTitle">手机号码：</div>
              </el-col>
              <el-col :xs="19" :sm="20" :md="18" :lg="18" :xl="18" :span="20">
                <el-input v-model="phone" size="small" placeholder="请输入查询的手机号码"></el-input>
              </el-col>
            </div>
          </el-col>
        </el-row>
        <el-row class="marginTop">
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <div class="grid-content bg-purple-light greyFont">
              <el-col :xs="5" :sm="3" :md="4" :lg="4" :xl="4" :span="4">
                <div class="grid-content bg-purple-dark f-ta-r inputTitle">当前状态：</div>
              </el-col>
              <el-col :xs="19" :sm="21" :md="20" :lg="20" :xl="20" :span="20">
                <el-radio v-model="radio" label="1,2,3,4">全部</el-radio>
                <el-radio v-model="radio" label="1">正常</el-radio>
                <!-- <el-radio v-model="radio"  label="3" >离线</el-radio> -->
                <el-radio v-model="radio" label="2">黑名单</el-radio>
                <el-radio v-model="radio" label="3,4">注销</el-radio>
              </el-col>
              <el-col :span="2"></el-col>
            </div>
          </el-col>
        </el-row>
        <el-row style="text-align:center" class="marginTop">
          <button class="m-btn-orange m-btn-search" type="danger" @click="search()">搜索</button>
        </el-row>
      </div>
      <el-row>
        <el-col style="float:right" :xs="4" :sm="4" :md="4" :lg="2" :xl="2">
          <div class="grid-content bg-purple-light addStaffDiv"><button @click="AddStaffDiv()" v-if="user.userRole!=2&&user.userRole!=3">
              <span v-if="!off.addList"> 添加员工</span><span v-if="off.addList">隐藏</span> </button></div>
        </el-col>
      </el-row>
      <div class="m-addStaff-out">
        <div class="m-addStaff" v-if="off.addList">
          <div v-for="(v,i) in list" :key="i" style="width:100%">
            <b><span>用户姓名：</span><input v-model="list[i].username" placeholder="请输入用户姓名" :maxlength="10" class="u-input" type="text"></b>
            <b><span>手机号码：</span><input v-model="list[i].phone" placeholder="请输入手机号码" :maxlength="11" class="u-input" type="text"></b>
            <b><span>角色：</span>
              <el-select size="mini" v-model="list[i].value" placeholder="请选择">
                <el-option v-for="item in rolelist" :key="item.id" :label="item.roleName" :value="item.id">
                </el-option>
              </el-select>
            </b>
            <b><span @click="deleteLine(i)" class="u-icon-del"></span></b>
          </div>
          <div class="m-addStaff-btn">
            <div class="m-addStaff-btn-in">
              <button @click="AddList()">新增一条</button>
              <button @click="AddStaff()">确定添加</button>
            </div>
          </div>
        </div>
      </div>
      <!-- 代理商员工查询结果 -->
      <div class="m-listTitleFoot">
        <el-row>
          <h3>员工列表<span class="f-fw greyFont">({{lists.length||'0'}})</span></h3>
        </el-row>
      </div>
      <div class="m-details">
        <table class="m-searchTab" style="width:100%;height:100%;">
          <tr>
            <td></td>
            <td>序号</td>
            <td>用户姓名</td>
            <td>手机号码</td>
            <td>创建时间</td>
            <td>角色</td>
            <td>当前状态</td>
            <td>最后登录时间</td>
            <td>来源</td>
            <td>操作</td>
          </tr>
          <tr v-for="(v,i) of lists" :key="i">
            <td>
              <el-checkbox v-model="v.ischecked"></el-checkbox>
            </td>
            <td>
              {{((pa-1)*10+(i+1))}}
            </td>
            <td>
              <p style="float:left;margin-left:36%">
                <span v-for="(v,i) in v.userRole" :key="i">
                  <img v-if="v==3" src="../../assets/images/icon/admin.svg" class="m-adminIcon">
                </span>
                {{v.username}}
              </p>
            </td>
            <td>
              <a @click="getStaffDetails(v)">{{v.phone}}</a>
            </td>
            <td>
              <span v-if="v.createTime">
                {{getDateTime(v.createTime)[6]}}
              </span>
              <span v-if="!v.createTime">
                --
              </span>
            </td>
            <td>
              <span v-for="(v,i) in v.userRole.split(',')" :key="i">
                {{translateRole(v,rolelist)}}
              </span>
            </td>
            <td>
              <span :class="v.userState==1?'green':v.userState==2?'red':v.userState==3||v.userState==4?'grey':'--'">{{translateData('userState',v.userState)}}</span>
            </td>
            <td>
              <span v-if="v.lastLoginTime">
                {{getDateTime(v.lastLoginTime)[6]}}
              </span>
              <span v-if="!v.lastLoginTime">
                --
              </span>
            </td>
            <td>
              {{v.userOrigin==1?'手动添加':v.userOrigin==2?'系统同步':'--'}}
            </td>
            <td>
              <button @click="setContact(v.userId)" class="m-btn-small m-btn-green">设为联系人</button>
            </td>
          </tr>
          <tr v-if="lists.length==0">
            <td class="f-ta-c" colspan="10">
              暂无数据
            </td>
          </tr>
          <tr v-if="lists.length>0">
            <td colspan="10" class="f-pl-10">
              <span class="fl">选择 : <a href="javascript:void(0)" @click="doFilter('all')">全选 </a>-<a href="javascript:void(0)" @click="doFilter('on')"> 取消全选 </a></span>
            </td>
          </tr>
        </table>
      </div>
      <div class="m-listTitleFoot" v-if="lists.length>0">
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-pagination layout="prev, pager, next" :page-size="10" @current-change="search" :current-page.sync="currentPage" :total="form.page">
              </el-pagination>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light fr operate">操作 :<button v-if="false" @click="doFunction('offLine')">强制离线</button><button @click="doFunction('addBlack')">加入黑名单</button><button @click="doFunction('cancelBlack')">解除黑名单</button><button @click="doFunction('delete')">删除</button></div>
          </el-col>
        </el-row>
      </div>
      <!-- 代理商员工操作模块 -->
      <!-- <div v-if="off.modify" class="modifyStaffStateDiv">
            <div class="borderTopModifyStaffState"></div>
            <div class="m-listTitleFoot" style="height:20px;">
                <p style="text-align:right;font-size:14px" class="redFont" >将已选择内容批量{{typeTitle}}</p>
            </div>
            <div class="m-listTitleFoot">
                <el-input class="tar" v-model="reason" size="small" maxlength=20 placeholder="请输入原因，字数限制20个字符，必填"></el-input>
            </div> 
            <div class="m-listTitleFoot">
                <p style="float:right">
                    <button class="buttonModifyYes"  @click="btnYes()">确定</button>
                </p>
            </div>
        </div> -->
    </div>
    <!-- 代理商员工个人详情和编辑模块 -->
    <dlsStaff v-if="off.staffDetails" :forms="searchRes"></dlsStaff>
    <layerConfrim v-if="off.layer" :layer="layerType" :operationType="operationType"></layerConfrim>
  </div>
</template>
<script>
import { requestMethod, updateDepart } from "../../config/service";
import {
  getDateTime,
  getUnixTime,
  errorDeal,
  getStore,
  checkMobile,
  translateData,
  translateRole
} from "../../config/utils";
import staffDetails from "../../components/staffDetails.vue";
import layerConfrim from "./layerConfirmDls";
import { mapState } from "vuex";
export default {
  name: "dlsDetails",
  props: {
    lists: Array
  },
  data() {
    return {
      btnDisabled: false,
      currentPage: 0, //当前页
      typeTitle: "", //操作内容
      forms: "",
      searchRes: "",
      companyName: "", //..
      managerName: "", //..
      managerPhone: "", //..
      name: "",
      phone: "",
      radio: "1,2,3,4",
      checked: true,
      checked2: true,
      doUrl: "",
      addUsersData: "", //添加员工信息
      searchType: 0, //
      searchDepartId: "", //部门Id
      doAble: "0",
      searchStaffInfo: "", //员工信息
      searchDetailsYfdData: "",
      layerType: "", //弹框
      operationType: "",
      operationJson: "",
      isuserOrigin:"",
      form: {
        page: 0
      },
      list: [
        {
          username: "",
          phone: "",
          role: []
        }
      ],
      off: {
        addList: false,
        searchStaff: true,
        staffDetails: false,
        modify: false,
        layer: false,
        sync: false,
        userAdd: false
      },
      options: "",
      value: ""
    };
  },
  components: {
    dlsStaff: staffDetails,
    layerConfrim: layerConfrim
  },
  created: function() {
    let vm = this,
      Info = getStore("YFD_NMS_INFO");
    vm.user = Info;
    vm.searchType = vm.$parent.searchDetailsType;
    vm.searchDepartId = vm.$parent.searchDepartId;
    vm.pa = 1;
    vm.form.page = vm.lists.length / 10;
    vm.company = vm.$parent.companyName;
    vm.managerPhone = vm.$parent.managerPhone;
    vm.managerName = vm.$parent.managerName;
  },
  computed: {
    ...mapState(["rolelist", "rolelist1"])
  },
  methods: {
    search(p) {
      //查询
      let vm = this;
      if (this.phone != "") {
        checkMobile(this.phone, function() {
          return false;
        });
      }
      let data = {},
        url = "/ums/w/user/getDepartDetail";
      data = {
        searchDepartId: vm.$parent.searchDepartId,
        userState: vm.radio,
        username: vm.name,
        phone: vm.phone,
        pageNum: p || 1,
        pageSize: "10"
      };
      requestMethod(data, url)
        .then(data => {
          if (data.code == 200) {
            if (data.data.users.length > 0) {
              vm.$parent.off.notDlsDetails = false;
              vm.$parent.off.dlsDetails = true;
              vm.$parent.detailsList = data.data.users;
              vm.$parent.headUserName = data.data.users[0].username;
              vm.$parent.headPhone = data.data.users[0].phone;
            } else {
              vm.$parent.off.notDlsDetails = false;
              vm.$parent.off.dlsDetails = true;
              vm.$parent.detailsList = [];
              vm.$parent.detailsList.username = "";
              vm.$parent.detailsList.phone = "";
            }
          } else {
            errorDeal(data);
          }
        })
        .then(() => {
          for (let v = 0; v < vm.$parent.detailsList.length; v++) {
            vm.$set(vm.$parent.detailsList[v], "ischecked", false);
          }
          vm.off.modify = false;
        })
        .catch(e => errorDeal(e));
    },
    getStaffDetails(p) {
      //员工详情
      let data = {},
        url = "/ums/w/user/getUserDetail",
        vm = this;
      vm.searchStaffInfo = p;
      vm.isuserOrigin = p.userOrigin;
      data = {
        searchUserId: p.userId,
        sessionType: "2"
      };
      vm.searchDetailsYfdData = data;
      requestMethod(data, url)
        .then(data => {
          vm.off.searchStaff = false;
          vm.off.staffDetails = true;
          vm.searchRes = data.data;
          if (data.code == 200) {
          }
        })
        .catch(e => errorDeal(e));
    },
    setContact(v) {
      let vm = this,
        json = {
          departId: vm.$parent.searchDepartId,
          departUserId: v
        };
      updateDepart(json)
        .then(data => {
          if (data.code == 200) {
            layer.open({
              content: "修改部门联系人成功",
              skin: "msg",
              time: 2,
              msgSkin: "success"
            });
          }
        })
        .catch(e => errorDeal(e));
    },
    AddStaffDiv() {
      //添加员工模块开关
      if (this.$parent.departState == "3" || this.$parent.departState == "4") {
        layer.open({
          content: "注销状态的部门不允许添加新员工",
          skin: "msg",
          time: 2,
          msgSkin: "error"
        });
        return false;
      }
      this.off.addList = !this.off.addList;
    },
    AddStaff() {
      //添加员工按钮
      let vm = this,
        data = { newUsers: [] };
      for (let i = 0; i < this.list.length; i++) {
        if (
          this.list[i].username != "" &&
          this.list[i].phone != "" &&
          this.list[i].value != ""
        ) {
          checkMobile(this.list[i].phone, () => {
            return false;
          });
          this.list[i].userRole = this.list[i].value;
          this.list[i].departId = vm.searchDepartId;
          this.list[i].userHierachy = 2;
          data.newUsers.push(this.list[i]);
        } else {
          layer.open({
            content: "请填写完整的员工信息",
            skin: "msg",
            time: 2,
            msgSkin: "error"
          });
          return false;
        }
      }
      this.off.layer = true;
      this.addUsersData = data;
      vm.layerType = "add";
    },
    doFunction(val) {
      let vm = this,
        url = "",
        che = "";
      vm.off.modify = false;
      for (let v in vm.lists) {
        if (vm.lists[v].ischecked == true) {
          if (vm.lists[v].userRole == 3 && val == "delete") {
            layer.open({
              content: "不允许删除店长",
              skin: "msg",
              time: 2,
              msgSkin: "error"
            });
            vm.off.modify = false;
            return false;
          }
          che += vm.lists[v].username + ",";
          vm.off.modify = true;
        }
      }
      che = che.substring(0, che.length - 1);
      if (vm.off.modify == false) {
        layer.open({
          content: "请选择要操作的用户",
          skin: "msg",
          time: 2,
          msgSkin: "error"
        });
        return false;
      }
      if (val == "offLine") {
        vm.doUrl = "/ums/w/user/kickoutUsers";
        vm.typeTitle = `强制离线(${che})`;
      } else if (val == "addBlack") {
        vm.doUrl = "/ums/w/user/blacklistUsers";
        vm.typeTitle = `加入黑名单(${che})`;
        vm.operationType = "HMD";
      } else if (val == "cancelBlack") {
        vm.doUrl = "/ums/w/user/unblacklistUsers";
        vm.typeTitle = `解除黑名单(${che})`;
        vm.operationType = "JC";
      } else if (val == "delete") {
        vm.doUrl = "/ums/w/user/delUsers";
        vm.typeTitle = `删除(${che})`;
        vm.operationType = "SC";
      }
      vm.btnYes();
    },
    doFilter(s) {
      //状态过滤操作
      if (s == "all") {
        for (let v = 0; v < this.lists.length; v++) {
          this.$set(this.lists[v], "ischecked", true);
        }
      } else if (s == "on") {
        for (let v = 0; v < this.lists.length; v++) {
          this.$set(this.lists[v], "ischecked", false);
        }
      }
    },
    getAuthCode() {
      const TIME_COUNT = 120;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.show = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.btnDisabled = true;
            this.count--;
          } else {
            this.btnDisabled = false;
            this.show = true;
            this.count = "点击获取验证码";
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
      let data = {},
        url = "/ums/w/user/getAuthCode",
        vm = this;
      data = {
        phone: vm.user.phone
      };
      requestMethod(data, url)
        .then(data => {
          if (data.code == 200) {
            layer.open({
              content: "验证码发送成功",
              skin: "msg",
              time: 2,
              msgSkin: "success"
            });
          } else {
            layer.open({
              content: data.msg,
              skin: "msg",
              time: 2,
              msgSkin: "error"
            });
          }
        })
        .catch(e => errorDeal(e));
    },
    btnYes() {
      let data = {
          operateUserIds: []
        },
        vm = this;
      for (let v in vm.lists) {
        if (vm.lists[v].ischecked == true) {
          data.operateUserIds.push(vm.lists[v].userId);
        }
      }
      vm.off.layer = true;
      vm.layerType = "operation";
      vm.operationJson = data;
    },
    AddList() {
      //添加员工状态操作
      this.list.push({
        username: "",
        phone: "",
        role: []
      });
    },
    deleteLine(v) {
      let vm = this;
      if (vm.list.length <= 1) {
        return false;
      }
      vm.list.splice(v, 1);
    },
    goBack() {
      //返回上级
      let vm = this;
      vm.$parent.off.dlsDetails = false;
      vm.$parent.off.notDlsDetails = true;
      this.$parent.search(vm.$parent.pa);
    },
    getDateTime(v) {
      return getDateTime(v);
    },

    translateData(v, i) {
      return translateData(v, i);
    },
    translateRole(v, i) {
      return translateRole(v, i);
    }
  }
};
</script>
<style scoped>
.m-addStaff-out {
  width: 100%;
}

.m-addStaff {
  margin: 0 auto;
  border: 1px solid #c0c4cc;
  min-height: 100px;
  padding: 10px;
  background: white;
  border-radius: 4px;
  width: 98%;
}

.m-addStaff b {
  height: 30px;
  display: inline-block;
}

.m-addStaff b span {
  display: inline-block;
  width: 65px;
  text-align: justify;
  text-align-last: justify;
}

.m-addStaff b span.u-icon-del {
  width: 20px;
}

.m-addStaff b input {
  border: 1px solid #e8e8e8;
  height: 30px;
  border-radius: 4px;
  width: 80%;
  padding-left: 2%;
}

.m-addStaff-btn button {
  width: 70px;
  height: 25px;
  border-radius: 4px;
  outline: none;
  color: #fff;
  font-size: 14px;
}

.m-addStaff-btn button:nth-child(1) {
  background: #00aa01;
  border: 1px solid #00aa01;
}

.m-addStaff-btn button:nth-child(2) {
  background: #193163;
  border: 1px solid #193163;
}

.m-addStaff-btn button:active {
  box-shadow: 0 0 5px grey;
}

.m-addStaff-btn-in {
  text-align: center;
  margin-top: 15px;
}

@media screen and (min-width: 1400px) {
  .m-addStaff b:nth-child(1) {
    width: 30%;
  }

  .m-addStaff b:nth-child(2) {
    width: 30%;
  }

  .m-addStaff b:nth-child(3) {
    width: 30%;
  }
}

@media screen and (min-width: 1000px) and (max-width: 1400px) {
  .m-addStaff b input {
    width: 65%;
  }

  .m-addStaff b:nth-child(1) {
    width: 30%;
  }

  .m-addStaff b:nth-child(2) {
    width: 30%;
  }

  .m-addStaff b:nth-child(3) {
    width: 35%;
  }
}

@media screen and (min-width: 600px) and (max-width: 1000px) {
  .m-addStaff b input {
    width: 65%;
  }

  .m-addStaff b:nth-child(1) {
    width: 45%;
  }

  .m-addStaff b:nth-child(2) {
    width: 45%;
  }

  .m-addStaff b:nth-child(3) {
    margin-top: 10px;
    width: 90%;
  }
}

@media screen and (max-width: 600px) {
  .m-addStaff b:not(:first-child) {
    margin-top: 10px;
  }

  .m-addStaff b:nth-child(1) {
    width: 100%;
  }

  .m-addStaff b:nth-child(2) {
    width: 100%;
  }

  .m-addStaff b:nth-child(3) {
    width: 90%;
  }
}

.addList {
  border: 1px solid #c0c4cc;
  min-height: 100px;
  padding: 10px;
  background: white;
  border-radius: 4px;
}

div.operate button {
  padding: 4px 10px;
  margin-left: 10px;
  border-radius: 4px;
  color: #000;
  outline: none;
}

div.operate button:active {
  box-shadow: 0 0 5px grey;
}

div.borderTopModifyStaffState {
  margin-left: 1%;
  width: 98%;
  border-top: 2px solid rgb(202, 202, 202);
}

div.modifyStaffStateDiv .buttonModifyYes {
  border-radius: 8px;
  padding: 8px 30px;
  background: #00aa01;
  border: 1px solid #00aa01;
  outline: none;
  color: #fff;
}

div.modifyStaffStateDiv .buttonModifyYes:active {
  box-shadow: 0 0 5px green;
}

div.addStaffDiv button {
  border-radius: 6px;
  padding: 3px 10px;
  background: #00aa01;
  border: 1px solid #00aa01;
  outline: none;
  color: #fff;
}
</style>
