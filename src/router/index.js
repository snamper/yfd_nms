/**
  *@info 路由模块
* */
import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
const load = (isShow) => {
    //路由加载动画
};
const Login = resolve => {
    load(true);
    require.ensure(["@/views/login"], () => {
        resolve(require("@/views/login"));
        load();
    });
};
const Home = resolve => {
    load(true);
    require.ensure(["@/views/home"], () => {
        resolve(require("@/views/home"));
        load();
    });
};
const Organization = resolve => {
    load(true);
    require.ensure(["@/views/organizationStructure/index"], () => {
        resolve(require("@/views/organizationStructure/index"));
        load();
    });
};
const Logs = resolve => {
    load(true);
    require.ensure(["@/views/operationLog/index"], () => {
        resolve(require("@/views/operationLog/index"));
        load();
    });
};
const BrowseRecords = resolve => {
    load(true);
    require.ensure(["@/views/browsingHistory/index"], () => {
        resolve(require("@/views/browsingHistory/index"));
        load();
    });
};
//架构管理
const Org_yfd = resolve => {
    load(true);
    require.ensure(["@/views/organizationStructure/yafeidagl.vue"], () => {
        resolve(require("@/views/organizationStructure/yafeidagl.vue"));
        load();
    });
};
const Org_dls = resolve => {
    load(true);
    require.ensure(["@/views/organizationStructure/dailishanggl.vue"], () => {
        resolve(require("@/views/organizationStructure/dailishanggl.vue"));
        load();
    });
};
const Org_ygcx = resolve => {
    load(true);
    require.ensure(["@/views/organizationStructure/yuangonggl.vue"], () => {
        resolve(require("@/views/organizationStructure/yuangonggl.vue"));
        load();
    });
};
const Org_powerDeploy = resolve => {
    load(true);
    require.ensure(["@/views/organizationStructure/quanxianpz.vue"], () => {
        resolve(require("@/views/organizationStructure/quanxianpz.vue"));
        load();
    });
};
// 码号管理
const Card_mhgl = resolve => {
    load(true);
    require.ensure(["@/views/phoneNumberManage/numberManagement.vue"], () => {
        resolve(require("@/views/phoneNumberManage/numberManagement.vue"));
        load();
    });
};
const Card_changePrice = resolve => {
    load(true);
    require.ensure(["@/views/phoneNumberManage/modifyPrice.vue"], () => {
        resolve(require("@/views/phoneNumberManage/modifyPrice.vue"));
        load();
    });
};
const cardManage = resolve => {
    load(true);
    require.ensure(["@/views/phoneNumberManage/index.vue"], () => {
        resolve(require("@/views/phoneNumberManage/index.vue"));
        load();
    });
};
const stock = resolve => {
    load(true);
    require.ensure(["@/views/phoneNumberManage/inventoryManagement.vue"], () => {
        resolve(require("@/views/phoneNumberManage/inventoryManagement.vue"));
        load();
    });
};
const cardSource = resolve => {
    load(true);
    require.ensure(["@/views/phoneNumberManage/resourcesQuery.vue"], () => {
        resolve(require("@/views/phoneNumberManage/resourcesQuery.vue"));
        load();
    });
};
const brandConfiguration = resolve => {
    load(true);
    require.ensure(["@/views/phoneNumberManage/brandConfiguration.vue"], () => {
        resolve(require("@/views/phoneNumberManage/brandConfiguration.vue"));
        load();
    });
};
//账号管理
const account = resolve => {
  load(true);
  require.ensure(["@/views/accountManage/"], () => {
      resolve(require("@/views/accountManage/"));
      load();
  });
};
const accountInfo = resolve => {
    load(true);
    require.ensure(["@/views/accountManage/zhanghuyongjinxx.vue"], () => {
        resolve(require("@/views/accountManage/zhanghuyongjinxx.vue"));
        load();
    });
};
const yjManage = resolve => {
  load(true);
  require.ensure(["@/views/accountManage/yongjinshujugl.vue"], () => {
      resolve(require("@/views/accountManage/yongjinshujugl.vue"));
      load();
  });
};
const dataChange = resolve => {
    load(true);
    require.ensure(["@/views/accountManage/shujuxiugaigl.vue"], () => {
        resolve(require("@/views/accountManage/shujuxiugaigl.vue"));
        load();
    });
  };
//操作日志
const Logs_mhglrz = resolve => {
    load(true);
    require.ensure(["@/views/operationLog/mhglrz.vue"], () => {
        resolve(require("@/views/operationLog/mhglrz.vue"));
        load();
    });
};
const Logs_tbrz = resolve => {
    load(true);
    require.ensure(["@/views/operationLog/tbrz.vue"], () => {
        resolve(require("@/views/operationLog/tbrz.vue"));
        load();
    });
};
const Logs_dlrz = resolve => {
    load(true);
    require.ensure(["@/views/operationLog/dlrz.vue"], () => {
        resolve(require("@/views/operationLog/dlrz.vue"));
        load();
    });
};
//公告管理
const Notice = resolve => {
    load(true);
    require.ensure(["@/views/noticeManage/notice.vue"], () => {
        resolve(require("@/views/noticeManage/notice.vue"));
        load();
    });
};
//提卡订单管理
const pickCard = resolve => {
    load(true);
    require.ensure(["@/views/openCardManage"], () => {
        resolve(require("@/views/openCardManage"));
        load();
    });
};
const pickCardOrder = resolve => {
    load(true);
    require.ensure(["@/views/pickUpCardManage/pickCardOrder.vue"], () => {
        resolve(require("@/views/pickUpCardManage/pickCardOrder.vue"));
        load();
    });
};
const cmsRules = resolve => {
    load(true);
    require.ensure(["@/views/pickUpCardManage/cmsRules.vue"], () => {
        resolve(require("@/views/pickUpCardManage/cmsRules.vue"));
        load();
    });
};
//开卡订单管理
const openCard = resolve => {
    load(true);
    require.ensure(["@/views/openCardManage"], () => {
        resolve(require("@/views/openCardManage"));
        load();
    });
};
const openCardOrder = resolve => {
    load(true);
    require.ensure(["@/views/openCardManage/openCardOrder.vue"], () => {
        resolve(require("@/views/openCardManage/openCardOrder.vue"));
        load();
    });
};
const openCardOpId = resolve => {
    load(true);
    require.ensure(["@/views/openCardManage/openCardOpId.vue"], () => {
        resolve(require("@/views/openCardManage/openCardOpId.vue"));
        load();
    });
};
//设备管理
const equipment = resolve => {
    load(true);
    require.ensure(["@/views/equipment"], () => {
        resolve(require("@/views/equipment"));
        load();
    });
};
const equipmentList = resolve => {
    load(true);
    require.ensure(["@/views/equipment/orderlist.vue"], () => {
        resolve(require("@/views/equipment/orderlist.vue"));
        load();
    });
};
const equipmentSrc = resolve => {
    load(true);
    require.ensure(["@/views/equipment/equipmentSrc.vue"], () => {
        resolve(require("@/views/equipment/equipmentSrc.vue"));
        load();
    });
};
//充值订单管理
const rechargeOrder = resolve => {
    load(true);
    require.ensure(["@/views/rechargeOrder/rechargeOrder.vue"], () => {
        resolve(require("@/views/rechargeOrder/rechargeOrder.vue"));
        load();
    });
};
//收货地址管理
const address = resolve => {
    load(true);
    require.ensure(["@/views/addressManage/addressManage.vue"], () => {
        resolve(require("@/views/addressManage/addressManage.vue"));
        load();
    });
};
//代理商申请管理
const agentApply = resolve => {
    load(true);
    require.ensure(["@/views/agentApply/agentApply.vue"], () => {
        resolve(require("@/views/agentApply/agentApply.vue"));
        load();
    });
};
const router = new Router({
    routes: [
        {path: "/login",component: Login},
        {
            path: "/home",
            redirect: "home/organization",
            component: Home,
            children: [{
                path: "organization",
                redirect: "organization/yfd",
                name: "organization",
                component: Organization,
                children: [{
                    path: "yfd",
                    name: "yfd",
                    component: Org_yfd,
                }, {
                    path: "agent",
                    name: "agent",
                    component: Org_dls,
                }, {
                    path: "staff",
                    name: "staff",
                    component: Org_ygcx,
                }, {
                    path:"powerDeploy",
                    name:"powerDeploy",
                    component: Org_powerDeploy,
                }]
            },{
                path: "card",
                name: "card",
                redirect:"card/cardManage",
                component:cardManage,
                children:[{
                    path:"cardManage",
                    name:"cardManage",
                    component:Card_mhgl
                },{
                    path:"modifyPrice",
                    name:"modifyPrice",
                    component:Card_changePrice
                },{
                    path:"stock",
                    name:"stock",
                    component:stock
                },{
                    path:"cardSource",
                    name:"cardSource",
                    component:cardSource
                },{
                    path:"setBrand",
                    name:"brandConfiguration",
                    component:brandConfiguration
                }]
            },{
                path:"accountManage",
                name:"accountManage",
                redirect:"accountManage/info",
                component:account,
                children:[{
                  path:"info",
                  component:accountInfo,
                },{
                  path:"commission",
                  component:yjManage,
                },{
                    path:"change",
                    component:dataChange,
                  }]
            },{
                path: "operationLog",
                redirect: "operationLog/cardmanage",
                name: "operationLog",
                component: Logs,
                children: [{
                    path: "cardmanage",
                    name: "cardmanage",
                    component: Logs_mhglrz
                }, {
                    path: "synclog",
                    name: "synclog",
                    component: Logs_tbrz
                }, {
                    path: "loginlog",
                    name: "loginlog",
                    component: Logs_dlrz
                }]
            }, {
                path: "browsingHistory",
                name: "browsingHistory",
                component: BrowseRecords,
            }, {
                path: "notice",
                name: "notice",
                component: Notice,
            }, {
                path: "pickCard",
                redirect: "pickCard/orderlist",
                name:"pickCard",
                component: pickCard,
                children:[{
                    path:"orderlist",
                    name:"pickCardOrder",
                    component:pickCardOrder
                },{
                    path:"cmsRules",
                    name:"cmsRules",
                    component:cmsRules
                }]
            }, {
                path: "openCard",
                redirect: "openCard/orderlist",
                name: "openCard",
                component:openCard,
                children:[{
                    path:"orderlist",
                    name:"openCardOrder",
                    component:openCardOrder
                },{
                    path:"operaterId",
                    name:"operaterId",
                    component:openCardOpId
                }]
            }, {
                path: "recharge",
                name: "recharge",
                component: rechargeOrder,
            },{
                path: "address",
                name: "address",
                component: address
            },{
                path: "agentApply",
                name: "agentApply",
                component: agentApply
            },{
                path:"equipment",
                redirect:"equipment/orderlist",
                name:"equipment",
                component:equipment,
                children:[{
                    path:'orderlist',
                    name:'',
                    component:equipmentList
                },{
                    path:'equipmentSrc',
                    name:'',
                    component:equipmentSrc
                }]
            }]
        }
    ]
});

router.beforeEach((to, from, next) => {
    var token = localStorage.getItem("YFD_NMS_INFO");
    if (!token && to.path !== "/login" || to.path == "/") {
        next({ path: "/login" });
        return false;
    }
    next();
});
export default router;


