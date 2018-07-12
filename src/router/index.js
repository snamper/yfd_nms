/**
  *@info 路由模块
  *@author: thinkmix
  *@date 2018-3-15
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
const Org = resolve => {
    load(true);
    require.ensure(["@/views/organizationalStructure/index"], () => {
        resolve(require("@/views/organizationalStructure/index"));
        load();
    });
};
const Card = resolve => {
    load(true);
    require.ensure(["@/views/phoneNumberManage/index"], () => {
        resolve(require("@/views/phoneNumberManage/index"));
        load();
    });
};
const OpeLog = resolve => {
    load(true);
    require.ensure(["@/views/operationLog/index"], () => {
        resolve(require("@/views/operationLog/index"));
        load();
    });
};
const Brhistory = resolve => {
    load(true);
    require.ensure(["@/views/browsingHistory/index"], () => {
        resolve(require("@/views/browsingHistory/index"));
        load();
    });
};
//架构管理
const Org_Yfd = resolve => {
    load(true);
    require.ensure(["@/views/organizationalStructure/yfd.vue"], () => {
        resolve(require("@/views/organizationalStructure/yfd.vue"));
        load();
    });
};
const Org_Dls = resolve => {
    load(true);
    require.ensure(["@/views/organizationalStructure/dls.vue"], () => {
        resolve(require("@/views/organizationalStructure/dls.vue"));
        load();
    });
};
const Org_Ygcx = resolve => {
    load(true);
    require.ensure(["@/views/organizationalStructure/ygcx.vue"], () => {
        resolve(require("@/views/organizationalStructure/ygcx.vue"));
        load();
    });
};
// 码号管理
const Card_Mhgl = resolve => {
    load(true);
    require.ensure(["@/views/phoneNumberManage/mhgl.vue"], () => {
        resolve(require("@/views/phoneNumberManage/mhgl.vue"));
        load();
    });
};
//操作日志
const OpeLog_mhglrz = resolve => {
    load(true);
    require.ensure(["@/views/operationLog/mhglrz.vue"], () => {
        resolve(require("@/views/operationLog/mhglrz.vue"));
        load();
    });
};
const OpeLog_tbrz = resolve => {
    load(true);
    require.ensure(["@/views/operationLog/tbrz.vue"], () => {
        resolve(require("@/views/operationLog/tbrz.vue"));
        load();
    });
};
const OpeLog_dlrz = resolve => {
    load(true);
    require.ensure(["@/views/operationLog/dlrz.vue"], () => {
        resolve(require("@/views/operationLog/dlrz.vue"));
        load();
    });
};
//公告管理
const Notice_noticePage = resolve => {
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
        {
            path: "/login",
            component: Login,
        },
        {
            path: "/home",
            redirect: "home/organization",
            component: Home,
            children: [{
                path: "organization",
                redirect: "organization/yfd",
                name: "organization",
                component: Org,
                children: [{
                    path: "yfd",
                    name: "yfd",
                    component: Org_Yfd
                }, {
                    path: "agent",
                    name: "agent",
                    component: Org_Dls,
                }, {
                    path: "staff",
                    name: "staff",
                    component: Org_Ygcx,
                }
                ]
            }
                , {
                path: "card",
                name: "card",
                component: Card_Mhgl,
            }
                , {
                path: "operationLog",
                redirect: "operationLog/cardmanage",
                name: "operationLog",
                component: OpeLog,
                children: [{
                    path: "cardmanage",
                    name: "cardmanage",
                    component: OpeLog_mhglrz
                }, {
                    path: "synclog",
                    name: "synclog",
                    component: OpeLog_tbrz
                }, {
                    path: "loginlog",
                    name: "loginlog",
                    component: OpeLog_dlrz
                }]
            }
                , {
                path: "browsingHistory",
                name: "browsingHistory",
                component: Brhistory,
            }
                , {
                path: "notice",
                name: "notice",
                component: Notice_noticePage,
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


