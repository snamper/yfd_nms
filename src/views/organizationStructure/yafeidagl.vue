
<template>
  <div>
    <div v-if="off.searchStaff">
      <div class="greyFont">
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark m-search-title black">搜索条件</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col
            :xs="24"
            :sm="12"
            :md="12"
            :lg="12"
            :xl="12"
          >
            <div class="grid-content bg-purple-light">
              <el-col
                :xs="5"
                :sm="6"
                :md="6"
                :lg="4"
                :xl="4"
              >
                <div class="grid-content bg-purple-dark f-ta-r inputTitle">联系人：</div>
              </el-col>
              <el-col
                :xs="16"
                :sm="14"
                :md="14"
                :lg="16"
                :xl="16"
              >
                <el-input
                  v-model="name"
                  :maxlength="10"
                  size="small"
                  placeholder="请输入查询的联系人姓名"
                ></el-input>
              </el-col>
              <el-col
                :xs="4"
                :sm="4"
                :md="4"
                :lg="4"
                :xl="4"
              ></el-col>
            </div>
          </el-col>
          <el-col
            :xs="24"
            :sm="12"
            :md="12"
            :lg="12"
            :xl="12"
          >
            <div class="grid-content bg-purple-light">
              <el-col
                :xs="5"
                :sm="6"
                :md="6"
                :lg="4"
                :xl="4"
              >
                <div class="grid-content bg-purple-dark f-ta-r inputTitle">手机号码：</div>
              </el-col>
              <el-col
                :xs="16"
                :sm="14"
                :md="14"
                :lg="16"
                :xl="16"
              >
                <el-input
                  type="tel"
                  v-model="phone"
                  :maxlength="11"
                  size="small"
                  placeholder="请输入查询的手机号码"
                ></el-input>
              </el-col>
              <el-col
                :xs="4"
                :sm="4"
                :md="4"
                :lg="4"
                :xl="4"
              >
              </el-col>
            </div>
          </el-col>
        </el-row>
        <el-row class="marginTop">
          <el-col
            :xs="24"
            :sm="24"
            :md="12"
            :lg="12"
            :xl="12"
          >
            <div class="grid-content bg-purple-light">
              <el-col
                :xs="5"
                :sm="3"
                :md="6"
                :lg="4"
                :xl="4"
              >
                <div class="grid-content bg-purple-dark f-ta-r inputTitle">当前状态：</div>
              </el-col>
              <el-col
                :xs="16"
                :sm="16"
                :md="14"
                :lg="16"
                :xl="16"
              >
                <el-radio
                  v-model="radio"
                  label="1,2,3,4"
                >全部</el-radio>
                <el-radio
                  v-model="radio"
                  label="1"
                >正常</el-radio>
                <el-radio
                  v-model="radio"
                  label="2"
                >黑名单</el-radio>
                <el-radio
                  v-model="radio"
                  label="3,4"
                >注销</el-radio>
              </el-col>
              <el-col
                :xs="1"
                :sm="1"
                :md="4"
                :lg="4"
                :xl="4"
              >

              </el-col>
            </div>
          </el-col>
        </el-row>
        <el-row
          style="text-align:center"
          class="marginTop"
        >
          <button
            class="m-btn-orange m-btn-search"
            @click="search()"
          >搜索</button>
        </el-row>
      </div>
      <el-row>
        <el-col
          style="float:right"
          :xs="4"
          :sm="4"
          :md="4"
          :lg="2"
          :xl="2"
        >
          <div class="grid-content bg-purple-light addStaffDiv"><button
              @click="AddStaffDiv()"
              v-if="user.userRole!=2&&user.userRole!=3"
            > <span v-if="!off.addList"> 添加员工 </span><span v-if="off.addList"> 关闭 </span> </button></div>
        </el-col>
      </el-row>
      <div class="m-addStaff-out">
        <div
          class="m-addStaff"
          v-if="off.addList"
        >
          <div
            v-for="(v,i) in list"
            :key="i"
            style="width:100%"
          >
            <b><span>用户姓名：</span><input
                v-model="list[i].username"
                placeholder="请输入用户姓名"
                :maxlength="10"
                class="u-input"
                type="text"
              ></b>
            <b><span>手机号码：</span><input
                v-model="list[i].phone"
                placeholder="请输入手机号码"
                :maxlength="11"
                class="u-input"
                type="text"
              ></b>
            <b><span>角色：</span>
              <el-select
                size="mini"
                v-model="list[i].value"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in rolelist"
                  :key="item.id"
                  :label="item.roleName"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </b>
            <b><span
                @click="deleteLine(i)"
                class="u-icon-del"
              ></span></b>
          </div>
          <div class="m-addStaff-btn">
            <div class="m-addStaff-btn-in">
              <button @click="AddList()">新增一条</button>
              <button @click="AddStaff()">确定添加</button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="detailsList">
        <div>
          <div class="m-listTitleFoot">
            <el-row>
              <el-col
                style="height:35px;"
                :span="20"
              >
                <div class="grid-content bg-purple">
                  <h3>员工列表<span class="f-fw greyFont"> ({{form.page||'0'}})</span></h3>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="m-details">
            <table
              class="m-searchTab"
              style="width:100%;height:100%;"
            >
              <tr style="font-size:14px">
                <td></td>
                <td>序号</td>
                <td>用户姓名</td>
                <td>手机号码</td>
                <td>创建时间</td>
                <td>角色</td>
                <td>当前状态</td>
                <td>用户数据来源</td>
                <td>最后登录时间</td>
              </tr>
              <tr
                v-for="(v,i) of detailsList"
                :key="i"
                :class="{'greyFont':v.departState==3}"
              >
                <td>
                  <el-checkbox v-model="v.ischecked"></el-checkbox>
                </td>
                <td>
                  {{((pa-1)*15+(i+1))}}
                </td>
                <td>
                  <p style="float:left;margin-left:36%">
                    <span
                      v-for="(v,i) in v.userRole"
                      :key="i"
                    >
                      <img
                        v-if="v==3"
                        src="../../assets/images/icon/admin.svg"
                        class="m-adminIcon"
                      >
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
                  <span
                    v-for="(x,i) in v.userRole.split(',')"
                    :key="i"
                  >
                    {{translateRole(x,rolelist)}} <span v-if="v.userRole.split(',').length-1>i">,</span>
                  </span>
                </td>
                <td>
                  <span :class="v.userState==1?'green':v.userState==2?'red':v.userState==3||v.userState==4?'grey':'--'">{{translateData('userState',v.userState)}}</span>
                </td>
                <td>
                  <span v-if="v.userOrigin==1">手动加入</span>
                  <span v-else-if="v.userOrigin==2">系统同步</span>
                  <span v-else>--</span>
                </td>
                <td>
                  <span v-if="v.lastLoginTime">
                    {{getDateTime(v.lastLoginTime)[6]}}
                  </span>
                  <span v-if="!v.lastLoginTime">
                    --
                  </span>
                </td>
              </tr>
              <tr v-if="detailsList.length==0">
                <td
                  class="f-ta-c"
                  colspan="9"
                >
                  暂无数据
                </td>
              </tr>
              <tr v-if="detailsList.length>0">
                <td
                  colspan="9"
                  class="f-pl-10"
                >
                  <span class="fl">选择 : <a
                      href="javascript:void(0)"
                      @click="doFilter('all')"
                    >全选 </a>-<a
                      href="javascript:void(0)"
                      @click="doFilter('on')"
                    > 取消全选 </a></span>
                </td>
              </tr>
            </table>
            <el-row>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <el-pagination
                    layout="prev, pager, next"
                    :page-size="15"
                    @current-change="search"
                    :current-page.sync="currentPage"
                    :total="form.page"
                  >
                  </el-pagination>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple-light fr operate">操作 :<button
                    v-if="false"
                    @click="doFunction('offLine')"
                  >强制离线</button><button @click="doFunction('addBlack')">加入黑名单</button><button @click="doFunction('cancelBlack')">解除黑名单</button><button @click="doFunction('delete')">删除</button></div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
    <staffDetails
      v-if="off.staffDetails"
      :forms="searchRes"
    ></staffDetails>
  </div>
</template>
<script>
import { Loading } from "element-ui";
import { requestMethod } from "../../config/service.js";
import { mapState, mapMutations, mapActions } from "vuex";
import {
  getDateTime,
  getUnixTime,
  errorDeal,
  getStore,
  checkMobile,
  translateData,
  translateRole
} from "../../config/utils.js";
import staffDetails from "../../components/staffDetails.vue";
export default {
  data() {
    return {
      user: "", //用户信息
      currentPage: 0, //当前页面
      detailsList: "",
      name: "",
      phone: "",
      radio: "1,2,3,4",
      pa: "",
      searchDetailsYfdData: "", //查询人
      searchRes: "",
      list: [{ username: "", phone: "", role: [] }], //添加员工
      topDepartmentId: "", //顶级部门Id
      btnDisabled: false,
      layerType: "",
      operationType: "",
      typeTitle: "",
      operationJson: "",
      doUrl: "",
      isuserOrigin: "",
      off: {
        showSearch: "",
        searchList: false,
        staffDetails: false,
        searchStaff: true,
        addList: false,
        layer: false,
        modify: false
      },
      form: {
        page: 1
      },
      options: "",
      value: ""
    };
  },
  components: {
    staffDetails: staffDetails,
  },
  created: function() {
    let vm = this,
      Info = getStore("YFD_NMS_INFO");
    vm.user = Info;
    let depid = window.localStorage.getItem("departId");
    vm.topDepartmentId = depid;
    let departName = vm.$route.query.dealerName;
    if (departName) {
      vm.name = departName;
    } else {
      return false;
    }
    let f1 = new Promise((resolve, reject) => {
      let data = {},
        url = "/ums/w/user/getDepartDetail",
        vm = this;
      vm.pa = 1;
      vm.currentPage = 1;
      this.$router.push({ name: "yfd", params: { type: "yfdList" } });
      if (vm.phone != "") {
        checkMobile(vm.phone, function() {
          vm.off.searchList = false;
          vm.form.page = "";
          vm.detailsList = "";
          return false;
        });
      }
      data = {
        searchDepartId: "1803160000",
        username: vm.name,
        phone: vm.phone,
        userState: vm.radio,
        pageSize: 15,
        pageNum: 1
      };
      requestMethod(data, url)
        .then(data => {
          resolve("success!");
          if (data.code == 200) {
            vm.off.searchList = true;
            vm.form.page = data.data.total;
            vm.detailsList = data.data.users;
            return true;
          } else {
            vm.off.searchList = false;
            vm.form.page = "";
            vm.detailsList = "";
            this.$message.error(data.msg)
          }
        })
        .then(() => {
          for (let v = 0; v < vm.detailsList.length; v++) {
            vm.$set(vm.detailsList[v], "ischecked", false);
          }
        })
        .catch(e =>
          errorDeal(e, () => {
            vm.off.searchList = false;
            vm.form.page = "";
            vm.detailsList = "";
          })
        );
    });
    f1.then(() => {
      vm.getStaffDetails(vm.detailsList[0]);
    });
  },
  computed: {
    ...mapState(["rolelist", "rolelist1"])
  },
  methods: {
    AddList() {
      //添加员工
      this.list.push({ username: "", phone: "", role: [] });
    },
    AddStaffDiv() {
      //添加员工模块开关
      this.off.addList = !this.off.addList;
    },
    deleteLine(v) {
      //添加员工删除行
      let vm = this;
      if (vm.list.length <= 1) {
        return false;
      }
      vm.list.splice(v, 1);
    },
    AddStaff() {
      //添加员工按钮
      let data = { newUsers: [] },
        vm = this;
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
          this.list[i].departId = vm.topDepartmentId;
          this.list[i].userHierachy = 1;
          data.newUsers.push(this.list[i]);
        } else {
          this.$message.error("请填写完整的员工信息");
          return false;
        }
      }
      this.$confirm("确定要添加新员工？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          requestMethod(data, "/ums/w/user/addUsers")
            .then(res => {
              if (res && res.code == 200) {
                this.$message({
                  type: "success",
                  message: "添加成功"
                });
                (this.list = []),
                  (this.off.addList = false),
                  this.list.push({
                    username: "",
                    phone: "",
                    role: [],
                    departName: "好亚飞达"
                  });
                if (vm.off.searchList == true) {
                  this.search();
                }
              }
            })
            .catch(res => {
              this.$message.error(res.msg || res.statusText || res);
            });
        }).catch(()=>{
          
        });
      // this.off.layer=true;
      // this.off.sync=true;
      // this.layerType='operationStaff';
      // this.addUsersData=data;
    },
    search(p) {
      //查询
      let data = {},
        url = "/ums/w/user/getDepartDetail",
        vm = this;
      vm.pa = p || 1;
      vm.currentPage = p || 1;
      this.$router.push({ name: "yfd", params: { type: "yfdList" } });
      if (vm.phone != "") {
        checkMobile(vm.phone, function() {
          vm.off.searchList = false;
          vm.form.page = "";
          vm.detailsList = "";
          return false;
        });
      }
      data = {
        searchDepartId: "1803160000",
        username: vm.name,
        phone: vm.phone,
        userState: vm.radio,
        pageSize: 15,
        pageNum: p || 1
      };
      requestMethod(data, url)
        .then(data => {
          if (data.code == 200) {
            vm.off.searchList = true;
            vm.form.page = data.data.total;
            vm.detailsList = data.data.users;
            return true;
          } else {
            vm.off.searchList = false;
            vm.form.page = "";
            vm.detailsList = "";
            this.$message.error(data.msg);
          }
        })
        .then(() => {
          for (let v = 0; v < vm.detailsList.length; v++) {
            vm.$set(vm.detailsList[v], "ischecked", false);
          }
        })
        .catch(e =>
          errorDeal(e, () => {
            vm.off.searchList = false;
            vm.form.page = "";
            vm.detailsList = "";
          })
        );
    },
    getStaffDetails(p) {
      let data = {},
        url = "/ums/w/user/getUserDetail",
        vm = this;
      data = { searchUserId: p.userId, sessionType: "2" };
      vm.searchDetailsYfdData = data;
      vm.isuserOrigin = p.userOrigin;
      requestMethod(data, url)
        .then(data => {
          if (data.code == 200) {
            vm.off.searchStaff = false;
            vm.off.staffDetails = true;
            vm.searchRes = data.data;
          } else {
            errorDeal(data);
          }
        })
        .catch(e => errorDeal(e));
    },
    doFilter(s) {
      //状态过滤操作
      if (s == "all") {
        for (let v = 0; v < this.detailsList.length; v++) {
          this.$set(this.detailsList[v], "ischecked", true);
        }
      } else if (s == "on") {
        for (let v = 0; v < this.detailsList.length; v++) {
          this.$set(this.detailsList[v], "ischecked", false);
        }
      }
    },
    doFunction(val) {
      let vm = this,data = { operateUserIds: [] },url = "",che = "";
      vm.off.modify = false;
      for (let v in vm.detailsList) {
        if (vm.detailsList[v].ischecked == true) {
          data.operateUserIds.push(vm.detailsList[v].userId);
          che += vm.detailsList[v].username + ",";
          vm.off.modify = true;
        }
      }
      che = che.substring(0, che.length - 1);
      if (vm.off.modify == false) {
        this.$message.error("请选择要操作的用户");
        return false;
      }

      if (val == "offLine") {
        vm.doUrl = "/ums/w/user/kickoutUsers";
        vm.typeTitle = `强制离线(${che})`;
      } else if (val == "addBlack") {
        vm.doUrl = "/ums/w/user/blacklistUsers";
        vm.typeTitle = `加入黑名单(${che})`;
      } else if (val == "cancelBlack") {
        vm.doUrl = "/ums/w/user/unblacklistUsers";
        vm.typeTitle = `解除黑名单(${che})`;
      } else if (val == "delete") {
        vm.doUrl = "/ums/w/user/delUsers";
        vm.typeTitle = `删除(${che})`;
      }
      vm.operationJson = data;
      this.$confirm(vm.typeTitle+'?', "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          requestMethod(data, vm.doUrl)
            .then(res => {
              if (res && res.code == 200) {
                this.$message({
                  type: "success",
                  message: "操作成功"
                });
                this.search();
              }
            })
            .catch(res => {
              this.$message.error(res.msg || res.statusText || res);
            });
        })
    },
    btnYes() {
      let vm = this;
      vm.off.layer = true;
      vm.layerType = "addStaff";
      let data = { operateUserIds: [] };
      for (let v in vm.detailsList) {
        if (vm.detailsList[v].ischecked == true) {
          data.operateUserIds.push(vm.detailsList[v].userId);
        }
      }
    },
    translateData(v, i) {
      return translateData(v, i);
    },
    translateRole(v, i) {
      return translateRole(v, i);
    },
    getDateTime(v) {
      return getDateTime(v);
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
  padding: 2px 10px;
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
    width: 35%;
  }
}
@media screen and (min-width: 1200px) and (max-width: 1400px) {
  .m-addStaff b input {
    width: 65%;
  }
  .m-addStaff b:nth-child(1) {
    width: 25%;
  }
  .m-addStaff b:nth-child(2) {
    width: 25%;
  }
  .m-addStaff b:nth-child(3) {
    width: 45%;
  }
}
@media screen and (min-width: 600px) and (max-width: 1200px) {
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
    width: 95%;
  }
}
div.addStaffDiv button {
  border-radius: 4px;
  padding: 3px 10px;
  background: #00aa01;
  border: 1px solid #00aa01;
  outline: none;
  color: #fff;
}
div.operate button {
  padding: 4px 10px;
  margin-left: 10px;
  border-radius: 4px;
  outline: none;
  color: #000;
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
  border-radius: 4px;
  padding: 5px 20px;
  background: #00aa01;
  border: 1px solid #00aa01;
  outline: none;
  color: #fff;
}
div.modifyStaffStateDiv .buttonModifyYes:active {
  box-shadow: 0 0 5px green;
}
div.addStaffDiv button {
  border-radius: 4px;
  padding: 3px 6px;
  background: #00aa01;
  border: 1px solid #00aa01;
  outline: none;
  color: #fff;
}
</style>

