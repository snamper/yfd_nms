/**
  *@info 路由模块
  *@author: thinkmix
  *@date 2018-3-15
* */
import Vue from "vue";
import Router from "vue-router";
require("../assets/js/base64.min.js");
Vue.use(Router);
const load=(isShow)=>{
  //路由加载动画
};
const Home = resolve => {
  load(true);
  require.ensure(["@/views/home"], () => {
    resolve(require("@/views/home"));
    load();
  });
};
const Search = resolve => {
  load(true);
  require.ensure(["@/views/search/search"], () => {
    resolve(require("@/views/search/search"));
    load();
  });
};
const Org = resolve => {
    load(true);
    require.ensure(["@/views/org/index"], () => {
      resolve(require("@/views/org/index"));
      load();
    });
  };
  const Card = resolve => {
    load(true);
    require.ensure(["@/views/card/index"], () => {
      resolve(require("@/views/card/index"));
      load();
    });
  };
  const OpeLog = resolve => {
    load(true);
    require.ensure(["@/views/opLog/index"], () => {
      resolve(require("@/views/opLog/index"));
      load();
    });
  };
  const Brhistory = resolve => {
    load(true);
    require.ensure(["@/views/brHistory/index"], () => {
      resolve(require("@/views/brHistory/index"));
      load();
    });
  };
  //架构管理
  const Org_Yfd = resolve => {
    load(true);
    require.ensure(["@/views/org/yfd.vue"], () => {
      resolve(require("@/views/org/yfd.vue"));
      load();
    });
  };
  const Org_Dls = resolve => {
    load(true);
    require.ensure(["@/views/org/dls.vue"], () => {
      resolve(require("@/views/org/dls.vue"));
      load();
    });
  };
  const Org_Dls_Staff = resolve => {
    load(true);
    require.ensure(["../../components/dlsStaffDetails.vue"], () => {
      resolve(require("../../components/dlsStaffDetails.vue"));
      load();
    });
  };
  const Org_Ygcx = resolve => {
    load(true);
    require.ensure(["@/views/org/ygcx.vue"], () => {
      resolve(require("@/views/org/ygcx.vue"));
      load();
    });
  };
// 码号管理
const Card_Mhgl = resolve => {
    load(true);
    require.ensure(["@/views/card/mhgl.vue"], () => {
      resolve(require("@/views/card/mhgl.vue"));
      load();
    });
  };
  //操作日志
  const OpeLog_mhglrz = resolve => {
    load(true);
    require.ensure(["@/views/opLog/mhglrz.vue"], () => {
      resolve(require("@/views/opLog/mhglrz.vue"));
      load();
    });
  };
  const OpeLog_tbrz = resolve => {
    load(true);
    require.ensure(["@/views/opLog/tbrz.vue"], () => {
      resolve(require("@/views/opLog/tbrz.vue"));
      load();
    });
  };
  const OpeLog_dlrz = resolve => {
    load(true);
    require.ensure(["@/views/opLog/dlrz.vue"], () => {
      resolve(require("@/views/opLog/dlrz.vue"));
      load();
    });
  };
const router=new Router({
  routes: [
    {
        path:"/home",
        redirect:"home/organization",
        component:Home,
        children:[{
            path:"organization",
            redirect:"organization/yfd",
            name:"organization",
            component:Org,
            children:[{
                path:"yfd",
                name:"yfd",
                component:Org_Yfd,
                children:[{
                    path:":type",
                    component:Org_Dls_Staff,
                }]
            },{
                path:"agent",
                name:"agent",
                component:Org_Dls
            },{
                path:"staff",
                name:"staff",
                component:Org_Ygcx
            }
        ]
        }
        ,{
            path:"card",
            name:"card",
            component:Card_Mhgl,
        }
        ,{
            path:"operationLog",
            redirect:"operationLog/cardmanage",
            name:"operationLog",
            component:OpeLog,
            children:[{
                path:"cardmanage",
                name:"cardmanage",
                component:OpeLog_mhglrz
            },{
                path:"synclog",
                name:"synclog",
                component:OpeLog_tbrz
            },{
                path:"loginlog",
                name:"loginlog",
                component:OpeLog_dlrz
            }]
        }
        ,{
            path:"browsingHistory",
            name:"browsingHistory",
            component:Brhistory,
        }]

    }
  ]
});


router.beforeEach((to, from, next) => {
    if(to.query&&to.query.auth){
        let t=to.query.auth;
            t=BASE64.decode(t);
            delete t.departName;
        localStorage.setItem("KA_ECS_USER",t);
    }else{
        let token = localStorage.getItem("KA_ECS_USER");
        if (!token){
            window.location.href="/nbs/login"
        }
    }
    next();
});
export default router;


