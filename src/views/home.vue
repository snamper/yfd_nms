<style>
@import "../assets/css/home.css";
span.iconFoldOpen {
  display: inline-block;
  width: 18px;
  height: 18px;
  background: url("../assets/images/icon/more_unfold.svg") no-repeat;
  background-position: center center;
  background-size: contain;
}

span.iconFoldClose {
  display: inline-block;
  width: 18px;
  height: 18px;
  background: url("../assets/images/icon/more.svg") no-repeat;
  background-position: center center;
  background-size: contain;
}
</style>
<template>
  <div class="f-scroll-lt" id="home" :class={active:off.headMenu} ref="psec">
    <header class="g-head">
      <table cellspacing="0">
        <tbody>
          <tr>
            <td class="f-fw f-s-16">
              <a class="m-navside-show" @click="headMenu"><i class="u-icon-menu"></i></a>
              <span v-if="crumb[0].name" class="f-inline-block m-crumb">
                <a class="black">{{crumb[0].name}}</a>
                <i v-if="crumb[1].name" class="el-icon-arrow-right"></i>
                <a v-if="!crumb[1].href">{{crumb[1].name}}</a>
                <router-link class="blue" v-if="crumb[1].href" :to="crumb[1].href">{{crumb[1].name}}</router-link>
                <span v-if="crumb[2].name">
                  <i class="el-icon-arrow-right"></i>
                  <a class="blue">{{crumb[2].name}}</a>
                </span>
              </span>
            </td>
            <td class="f-ta-r">
              <div class="m-info-user"><i></i><span style="color:black">{{user.username}}</span></div>
              <div class="m-menu-user">
                <a @click="userMenu"><i class="u-icon-menu2"></i></a>
                <ul class="m-user-dropdown f-ta-c" :class="{active:off.userMenu}">
                  <li>
                    <a class="user clr">
                      <div class="logo fl"></div>
                      <div class="info f-ta-l">
                        <div class="author" style="color:black">{{user.username}}</div>
                      </div>
                    </a>
                  </li>
                  <li><a @click="clickSignOut">退出</a></li>
                </ul>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </header>
    <aside class="g-side">
      <nav class="g-side-nav">
        <header class="g-side-head"><img src="../assets/images/logo.png" alt="titleLogo"><br>
          <span>虚商联盟运营平台</span>
        </header>
        <ul v-if="isShow" class="g-side-ul">
          <li :class="{active:crumb[0].name=='架构管理'}">
            <b></b>
            <router-link to="/home/organization">
              <div>
                <i class="u-icon-jiagou"></i>
                <span>架构管理</span>
                <span :class="crumb[0].name=='架构管理'?'iconFoldOpen':'iconFoldClose'"></span>
              </div>
            </router-link>
            <ul class="g-side-subul nav2">
              <li>
                <router-link to="/home/organization/yfd"><b></b>亚飞达管理</router-link>
              </li>
              <li>
                <router-link to="/home/organization/agent"><b></b>代理商管理</router-link>
              </li>
              <li>
                <router-link to="/home/organization/staff"><b></b>员工管理</router-link>
              </li>
              <li>
                <router-link to="/home/organization/powerDeploy"><b></b>权限配置</router-link>
              </li>
            </ul>
          </li>
        </ul>
        <ul class="g-side-ul">
          <li :class="{active:crumb[0].name=='码号管理'}">
            <b></b>
            <router-link to="/home/card">
              <div>
                <i class="u-icon-mahao"></i>
                <span>码号管理</span>
                <span :class="crumb[0].name=='码号管理'?'iconFoldOpen':'iconFoldClose'"></span>
              </div>
            </router-link>
            <ul class="g-side-subul nav2">
              <li>
                <router-link to="/home/card/cardManage"><b></b>码号管理</router-link>
              </li>
              <li>
                <router-link to="/home/card/modifyPrice"><b></b>购物车价格修改</router-link>
              </li>
              <li>
                <router-link to="/home/card/stock"><b></b>库存管理</router-link>
              </li>
              <li>
                <router-link to="/home/card/cardSource"><b></b>号码资源查询</router-link>
              </li>
            </ul>
          </li>
        </ul>
        <ul class="g-side-ul">
          <li :class="{active:crumb[0].name=='账户/佣金管理'}">
            <b></b>
            <router-link to="/home/accountManage">
              <div>
                <i class="u-icon-zhanghu"></i>
                <span>账户/佣金管理</span>
                <span :class="crumb[0].name=='账户管理'?'iconFoldOpen':'iconFoldClose'"></span>
              </div>
            </router-link>
            <ul class="g-side-subul nav2">
              <li>
                <router-link to="/home/accountManage/info"><b></b>账户/佣金信息</router-link>
              </li>
              <li>
                <router-link to="/home/accountManage/commission"><b></b>佣金数据管理</router-link>
              </li>
              <li>
                <router-link to="/home/accountManage/change"><b></b>数据修改管理</router-link>
              </li>
            </ul>
          </li>
        </ul>
        <ul v-if="isShow" class="g-side-ul">
          <li :class="{active:crumb[0].name=='操作日志'}">
            <b></b>
            <router-link to="/home/operationLog">
              <div>
                <i class="u-icon-rizhi"></i>
                <span>操作日志</span>
                <span :class="crumb[0].name=='操作日志'?'iconFoldOpen':'iconFoldClose'"></span>
              </div>
            </router-link>
            <ul class="g-side-subul nav2">
              <li>
                <router-link to="/home/operationLog/cardmanage"><b></b>码号管理日志</router-link>
              </li>
              <li>
                <router-link to="/home/operationLog/synclog"><b></b>同步日志</router-link>
              </li>
              <li>
                <router-link to="/home/operationLog/loginlog"><b></b>登录日志</router-link>
              </li>
            </ul>
          </li>
        </ul>
        <!-- <ul class="g-side-ul">
				<li :class="{active:crumb[0].name=='浏览记录'}">
					<b></b>
					<router-link to="/home/browsingHistory">
						<div>
							<i class="u-icon-jilu"></i>
							<span>浏览记录</span>
						</div>
					</router-link>
					<ul class="g-side-subul nav2">
						<li><router-link to="/home/browsingHistory/yfd"><b></b>亚飞达管理</router-link></li>
						<li><router-link to="/home/browsingHistory/agent"><b></b>代理商管理</router-link></li>
						<li><router-link to="/home/browsingHistory/staff"><b></b>员工管理</router-link></li>
					</ul>
				</li>
			</ul> -->
        <ul v-if="isShow" class="g-side-ul">
          <li :class="{active:crumb[0].name=='公告管理'}">
            <b></b>
            <router-link to="/home/notice">
              <div>
                <i class="u-icon-gonggao"></i>
                <span>公告管理</span>
                <span :class="crumb[0].name=='公告管理'?'iconFoldOpen':'iconFoldClose'"></span>
              </div>
            </router-link>
          </li>
        </ul>
        <ul class="g-side-ul">
          <li :class="{active:crumb[0].name=='提卡管理'}">
            <b></b>
            <router-link to="/home/pickCard">
              <div>
                <i class="u-icon-tika"></i>
                <span>提卡管理</span>
                <span :class="crumb[0].name=='提卡管理'?'iconFoldOpen':'iconFoldClose'"></span>
              </div>
            </router-link>
            <ul class="g-side-subul nav2">
              <li><router-link to="/home/pickCard/orderlist"><b></b>订单管理</router-link></li>
              <li><router-link to="/home/pickCard/cmsRules"><b></b>佣金规则查询</router-link></li>
            </ul>
          </li>
        </ul>
        <ul class="g-side-ul">
          <li :class="{active:crumb[0].name=='开卡管理'}">
            <b></b>
            <router-link to="/home/openCard">
              <div>
                <i class="u-icon-kaika"></i>
                <span>开卡管理</span>
                <span :class="crumb[0].name=='开卡管理'?'iconFoldOpen':'iconFoldClose'"></span>
              </div>
            </router-link>
            <ul class="g-side-subul nav2">
              <li><router-link to="/home/openCard/orderlist"><b></b>订单管理</router-link></li>
              <li><router-link to="/home/openCard/operaterId"><b></b>工号管理</router-link></li>
            </ul>
          </li>
        </ul>
        <ul class="g-side-ul">
          <li :class="{active:crumb[0].name=='充值订单管理'}">
            <b></b>
            <router-link to="/home/recharge">
              <div>
                <i class="u-icon-chongzhi"></i>
                <span>充值订单管理</span>
                <span :class="crumb[0].name=='充值订单管理'?'iconFoldOpen':'iconFoldClose'"></span>
              </div>
            </router-link>
          </li>
        </ul>
        <ul class="g-side-ul">
          <li :class="{active:crumb[0].name=='收货地址管理'}">
            <b></b>
            <router-link to="/home/address">
              <div>
                <i class="u-icon-address"></i>
                <span>收货地址管理</span>
                <span :class="crumb[0].name=='收货地址管理'?'iconFoldOpen':'iconFoldClose'"></span>
              </div>
            </router-link>
          </li>
        </ul>
        <ul class="g-side-ul">
          <li :class="{active:crumb[0].name=='代理商申请管理'}">
            <b></b>
            <router-link to="/home/agentApply">
              <div>
                <i class="u-icon-shenqing"></i>
                <span>代理商申请管理</span>
                <span :class="crumb[0].name=='代理商申请管理'?'iconFoldOpen':'iconFoldClose'"></span>
              </div>
            </router-link>
          </li>
        </ul>
      </nav>
    </aside>
    <section class="g-main" id="main">
      <transition appear name="fadeInUp">
        <router-view></router-view>
      </transition>
    </section>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
import { getStore, errorDeal } from "../config/utils";
import { signOut } from "../config/service";
export default {
  data() {
    return {
      user: {
        username: "admin"
      },
      off: {
        headMenu: true, //导航栏开关
        window: 0, //浏览器窗口宽度
        userMenu: 0 //用户菜单开关
      },
      userInfo: {
        isadmin: ""
      },
      isShow: false,
      crumb: [
        {
          name: ""
        },
        {
          name: ""
        },
        {
          name: ""
        }
      ] //面包屑
    };
  },
  created: function() {
    let vm = this,
      Info = getStore("YFD_NMS_INFO");
    vm.user = Info;
    let r = Info.userRole.split(",");
    r.some(function(value, index, r) {
      return value == 6 || value == 7;
    })
      ? ((vm.isShow = false), (window.location.href = "#/home/card/cardManage"))
      : (vm.isShow = true);
  },
  watch: {
    $route: "routeChange"
  },
  mounted: function() {
    this.init();
  },
  methods: {
    ...mapState(["rolelist"]),
    ...mapMutations(["SIGN_OUT", "SET_USERINFO", "GET_ROLE"]),
    async init() {
      //页面初始化
      const vm = this;
      vm.routeChange(); //头部面包屑导航
      window.onresize = () => vm.debounce(300, vm.windowChange());
      let userInfo = getStore("YFD_NMS_INFO");
      vm.userInfo = userInfo;
      vm.SET_USERINFO(userInfo);
      document.attachEvent
        ? doucument.body.attachEvent("onclick", function(event) {
            vm.off.userMenu = false;
            window.event.cacenlBubble = false;
          })
        : document.body.addEventListener(
            "click",
            function(event) {
              vm.off.userMenu = false;
              event.stopPropagation();
            },
            false
          );
    },
    headMenu: function() {
      //侧边导航show or hide
      this.off.headMenu
        ? (this.off.headMenu = false)
        : (this.off.headMenu = true);
    },
    routeChange: function() {
      //路由变化
      this.windowChange();
      var path = this.$route.path,
        crumb = [
          {
            name: ""
          },
          {
            name: ""
          },
          {
            name: ""
          }
        ],
        mainDom = document.getElementById("main");
      if (path.indexOf("/home/organization") > -1) {
        crumb[0] = {
          name: "架构管理",
          href: "/home/organization"
        };
        if (path.indexOf("home/organization/yfd") > -1) {
          crumb[1] = {
            name: "亚飞达管理",
            href: "yfd"
          };
        } else if (path.indexOf("home/organization/agent") > -1) {
          crumb[1] = {
            name: "代理商管理",
            href: "agent"
          };
        } else if (path.indexOf("home/organization/staff") > -1) {
          crumb[1] = {
            name: "员工管理",
            href: "staff"
          };
        } else if (path.indexOf("home/organization/powerDeploy") > -1) {
          crumb[1] = {
            name: "权限配置",
            href: "powerDeploy"
          };
        }
      }
      if (path.indexOf("/home/card") > -1) {
        crumb[0] = {
          name: "码号管理",
          href: "/home/card"
        };
        if (path.indexOf("/home/card/cardManage") > -1) {
          crumb[1] = {
            name: "码号管理",
            href: "/home/card/cardManage"
          };
        }else if (path.indexOf("/home/card/modifyPrice") > -1) {
          crumb[1] = {
            name: "购物车价格修改",
            href: "/home/card/modifyPrice"
          };
        }else if (path.indexOf("/home/card/stock") > -1) {
          crumb[1] = {
            name: "库存管理",
            href: "/home/card/stock"
          };
        }
      }
      if (path.indexOf("/home/accountManage") > -1) {
        crumb[0] = {
          name: "账户/佣金管理",
          href: "/home/accountManage"
        };
        if (path.indexOf("/home/accountManage/info") > -1) {
          crumb[1] = {
            name: "账户/佣金管理",
            href: "/home/accountManage/info"
          };
        }else if (path.indexOf("/home/accountManage/commission") > -1) {
          crumb[1] = {
            name: "佣金数据管理",
            href: "/home/accountManage/commission"
          };
        }else if (path.indexOf("/home/accountManage/change") > -1) {
          crumb[1] = {
            name: "数据修改管理",
            href: "/home/accountManage/change"
          };
        }
      }
      if (path.indexOf("/home/operationLog") > -1) {
        crumb[0] = {
          name: "操作日志",
          href: "/home/operationLog"
        };
        if (path.indexOf("home/operationLog/cardmanage") > -1) {
          crumb[1] = {
            name: "码号管理日志",
            href: "cardmanage"
          };
        } else if (path.indexOf("home/operationLog/synclog") > -1) {
          crumb[1] = {
            name: "同步日志",
            href: "synclog"
          };
        } else if (path.indexOf("home/operationLog/loginlog") > -1) {
          crumb[1] = {
            name: "登录日志",
            href: "loginlog"
          };
        }
      }
      if (path.indexOf("/home/browsingHistory") > -1) {
        crumb[0] = {
          name: "浏览记录",
          href: "/home/browsingHistory"
        };
      }
      if (path.indexOf("/home/notice") > -1) {
        crumb[0] = {
          name: "公告管理",
          href: "/home/notice"
        };
      }
      if (path.indexOf("/home/pickCard") > -1) {
        crumb[0] = {
          name: "提卡管理",
          href: "/home/pickCard"
        };
      }
      if (path.indexOf("/home/openCard") > -1) {
        crumb[0] = {
          name: "开卡管理",
          href: "/home/openCard"
        };
        if(path.indexOf("/home/openCard/orderlist")>-1){
          crumb[1] = {
            name: "订单管理",
            href: "/home/openCard/orderlist"
          }
        }else if(path.indexOf("/home/openCard/operaterId")>-1){
          crumb[1] = {
            name: "工号修改",
            href: "/home/openCard/operaterId"
          }
        }
      }
      if (path.indexOf("/home/recharge") > -1) {
        crumb[0] = {
          name: "充值订单管理",
          href: "/home/recharge"
        };
      }
      if (path.indexOf("/home/address") > -1) {
        crumb[0] = {
          name: "收货地址管理",
          href: "/home/address"
        };
      }
      if (path.indexOf("/home/agentApply") > -1) {
        crumb[0] = {
          name: "代理商申请管理",
          href: "/home/agentApply"
        };
      }
      this.crumb = crumb;
      mainDom.style.overflowY = "hidden";
      var timer = setTimeout(() => (mainDom.style.overflowY = ""), 500);
    },
    userMenu: function(e) {
      //用户菜单show or hide
      this.off.userMenu
        ? (this.off.userMenu = false)
        : (this.off.userMenu = true);
      e.stopPropagation();
    },
    windowChange: function() {
      //窗口改变
      const vm = this;
      let w = window.innerWidth;
      let href = window.location.href;

      if (href.indexOf("dashboard") > -1 || w <= 960) {
        vm.off.headMenu = false;
      }
      vm.off.window = w;
    },
    debounce: function(time, action) {
      //节流函数
      let last;
      return function() {
        let ctx = this,
          args = arguments;
        clearTimeout(last);
        last = setTimeout(function() {
          action.apply(ctx, args);
        }, time);
      };
    },
    clickSignOut: function() {
      var vm = this;
      signOut()
        .then(function(res) {
          vm.SIGN_OUT();
        })
        .catch(e => errorDeal(e));
    }
  }
};
</script>
