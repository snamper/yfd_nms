/**
  *@info 路由模块
  *@author: thinkmix
  *@date 2018-3-15
* */
import Vue from "vue";
import Router from "vue-router";
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

const router=new Router({
  routes: [
    {
        path:"/home",
        component:Home,
        children:[{
            path:"search",
            name:"search",
            component:Search,
        }]

    }
  ]
});


router.beforeEach((to, from, next) => {
    var token = localStorage.getItem("KA_ECS_USER");
    // if (!token&&to.path!=="/login"||to.path=="/"){
    //     next({path:"/login"});
    //     return false;
    // }
     next();
});
export default router;


