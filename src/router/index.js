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
    require.ensure(["@/views/organizationalStructure/index"], () => {
        resolve(require("@/views/organizationalStructure/index"));
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
    require.ensure(["@/views/organizationalStructure/yfd.vue"], () => {
        resolve(require("@/views/organizationalStructure/yfd.vue"));
        load();
    });
};
const Org_dls = resolve => {
    load(true);
    require.ensure(["@/views/organizationalStructure/dls.vue"], () => {
        resolve(require("@/views/organizationalStructure/dls.vue"));
        load();
    });
};
const Org_ygcx = resolve => {
    load(true);
    require.ensure(["@/views/organizationalStructure/ygcx.vue"], () => {
        resolve(require("@/views/organizationalStructure/ygcx.vue"));
        load();
    });
};
const Org_powerDeploy = resolve => {
    load(true);
    require.ensure(["@/views/organizationalStructure/powerDeploy.vue"], () => {
        resolve(require("@/views/organizationalStructure/powerDeploy.vue"));
        load();
    });
};
// 码号管理
const Card_mhgl = resolve => {
    load(true);
    require.ensure(["@/views/phoneNumberManage/mhgl.vue"], () => {
        resolve(require("@/views/phoneNumberManage/mhgl.vue"));
        load();
    });
};
const Card_changePrice = resolve => {
    load(true);
    require.ensure(["@/views/phoneNumberManage/changePrice.vue"], () => {
        resolve(require("@/views/phoneNumberManage/changePrice.vue"));
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
    require.ensure(["@/views/phoneNumberManage/stock.vue"], () => {
        resolve(require("@/views/phoneNumberManage/stock.vue"));
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
const pickCardOrder = resolve => {
    load(true);
    require.ensure(["@/views/pickUpCardManage/pickCardOrder.vue"], () => {
        resolve(require("@/views/pickUpCardManage/pickCardOrder.vue"));
        load();
    });
};
//开卡订单管理
const openCardOrder = resolve => {
    load(true);
    require.ensure(["@/views/openCardManage/openCardOrder.vue"], () => {
        resolve(require("@/views/openCardManage/openCardOrder.vue"));
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
                    component: Org_yfd
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
                }
                ]
            }
                , {
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
                }]
            }
                , {
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
            }
                , {
                path: "browsingHistory",
                name: "browsingHistory",
                component: BrowseRecords,
            }
                , {
                path: "notice",
                name: "notice",
                component: Notice,
            }, {
                path: "pickCard",
                name: "pickCard",
                component: pickCardOrder,
            }, {
                path: "openCard",
                name: "openCard",
                component: openCardOrder,
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


