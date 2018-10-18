/**
  *@info 入口文件
  *@author: thinkmix
  *@date 2018-03-15
* */
import Vue from 'vue';
import store from './store';
import router from './router';
import ElementUI from 'element-ui';
import App from './App.vue';
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css';
import './config/globalOptions.js'

Vue.use(ElementUI);
require("./assets/css/style.css");
require("./assets/css/common.css");
require("./assets/css/layer.css");
require("./assets/css/elementCustom.css");
require("./assets/js/layer.js");
require("./config/service.js");

new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App },
});
